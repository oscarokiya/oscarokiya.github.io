// @/services/devtoApi.ts

export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  tag_list: string[];
  reading_time_minutes: number;
  url: string;
  cover_image?: string;
  social_image?: string;
  collection_id?: number;
  public_reactions_count: number;
  user: {
    name: string;
    username: string;
    profile_image_90: string;
  };
}

// DevToMyArticle interface is removed as it's no longer used.

export interface DevToArticleDetail extends DevToArticle {
  body_html: string;
  body_markdown: string;
}

export interface DevToSeries {
  id: number;
  name: string;
  description: string;
  articles: DevToArticle[];
}

const DEV_TO_API_BASE = 'https://dev.to/api';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  duration: number;
}

class DevToCache {
  private static getKey(endpoint: string): string {
    return `devto_cache_${endpoint}`;
  }

  static get<T>(endpoint: string): T | null {
    try {
      const cached = localStorage.getItem(this.getKey(endpoint));
      if (!cached) return null;

      const entry: CacheEntry<T> = JSON.parse(cached);
      const now = Date.now();
      
      if (now - entry.timestamp > entry.duration) {
        localStorage.removeItem(this.getKey(endpoint));
        return null;
      }

      return entry.data;
    } catch {
      return null;
    }
  }

  static set<T>(endpoint: string, data: T, duration: number = CACHE_DURATION): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        duration
      };
      localStorage.setItem(this.getKey(endpoint), JSON.stringify(entry));
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  }
}

export const devToApi = {
  // getMyArticles and getLatestMyArticles are removed.

  async getArticles(username: string, page: number = 1, per_page: number = 30, cacheDuration?: number): Promise<DevToArticle[]> {
    const cacheKey = `articles_${username}_${page}_${per_page}`;
    const cached = DevToCache.get<DevToArticle[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(
        `${DEV_TO_API_BASE}/articles?username=${username}&page=${page}&per_page=${per_page}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.statusText}`);
      }
      
      const articles = await response.json();
      DevToCache.set(cacheKey, articles, cacheDuration || CACHE_DURATION);
      return articles;
    } catch (error) {
      console.error('Error fetching dev.to articles:', error);
      return [];
    }
  },

  async getLatestArticles(username: string, limit: number = 3, cacheDuration?: number): Promise<DevToArticle[]> {
    const articles = await this.getArticles(username, 1, limit, cacheDuration);
    return articles.slice(0, limit);
  },

  async getArticleById(id: number, cacheDuration?: number): Promise<DevToArticleDetail | null> {
    const cacheKey = `article_${id}`;
    const cached = DevToCache.get<DevToArticleDetail>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(`${DEV_TO_API_BASE}/articles/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch article: ${response.statusText}`);
      }
      
      const article = await response.json();
      DevToCache.set(cacheKey, article, cacheDuration || CACHE_DURATION);
      return article;
    } catch (error) {
    console.error('Error fetching dev.to article:', error);
      return null;
    }
  },

  async getAllArticles(username: string, cacheDuration?: number): Promise<DevToArticle[]> {
    const cacheKey = `all_articles_${username}`;
    const cached = DevToCache.get<DevToArticle[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    let allArticles: DevToArticle[] = [];
    let page = 1;
    
    try {
      while (true) {
        const articles = await this.getArticles(username, page, 30, 0); // Don't cache individual pages when fetching all
        if (articles.length === 0) break;
        allArticles = [...allArticles, ...articles];
        if (articles.length < 30) break;
        page++;
      }
      
      DevToCache.set(cacheKey, allArticles, cacheDuration || CACHE_DURATION);
      return allArticles;
    } catch (error) {
      console.error('Error fetching all dev.to articles:', error);
      return [];
    }
  },

  async getSeries(username: string, cacheDuration?: number): Promise<DevToSeries[]> {
    const cacheKey = `series_${username}`;
    const cached = DevToCache.get<DevToSeries[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const allArticles = await this.getAllArticles(username, cacheDuration);
      const seriesMap = new Map<number, DevToArticle[]>();
      
      // Group articles by collection_id
      allArticles.forEach(article => {
        if (article.collection_id) {
          if (!seriesMap.has(article.collection_id)) {
            seriesMap.set(article.collection_id, []);
          }
          seriesMap.get(article.collection_id)!.push(article);
        }
      });

      // Convert to series format
      const series: DevToSeries[] = Array.from(seriesMap.entries()).map(([id, articles]) => {
        const sortedArticles = articles.sort((a, b) => 
          new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
        );
        
        return {
          id,
          name: this.extractSeriesName(sortedArticles[0].title) || `Series ${id}`,
          description: sortedArticles[0].description,
          articles: sortedArticles
        };
      });

      // Sort by article count (most articles first)
      series.sort((a, b) => b.articles.length - a.articles.length);
      
      DevToCache.set(cacheKey, series, cacheDuration || CACHE_DURATION);
      return series;
    } catch (error) {
      console.error('Error fetching dev.to series:', error);
      return [];
    }
  },

  extractSeriesName(title: string): string | null {
    // Try to extract series name from common patterns
    const patterns = [
      /^(.+?):\s*/, // "Series Name: Article Title"
      /^(.+?)\s*-\s*/, // "Series Name - Article Title"
      /^(.+?)\s*\|\s*/, // "Series Name | Article Title"
      /^(.+?)\s*\(\d+\)/, // "Series Name (1)"
    ];

    for (const pattern of patterns) {
      const match = title.match(pattern);
      if (match && match[1].length < 50) { // Reasonable series name length
        return match[1].trim();
      }
    }
    
    return null;
  }
};