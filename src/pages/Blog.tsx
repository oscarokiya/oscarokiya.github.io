import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/Navigation";
import { ArticleDetail } from "@/components/ArticleDetail";
import { FeaturedSeries } from "@/components/FeaturedSeries";
import { SeriesView } from "@/components/SeriesView";
import { Calendar, Clock, Search, ArrowRight, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { devToApi, DevToArticle, DevToSeries, DevToArticleDetail } from "@/services/devtoApi";

// Import the Tooltip components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [seriesSearchTerm, setSeriesSearchTerm] = useState(""); // New state for series search
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [series, setSeries] = useState<DevToSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayedArticles, setDisplayedArticles] = useState<DevToArticle[]>([]);
  const [allArticlesLoaded, setAllArticlesLoaded] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<DevToArticleDetail | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<DevToSeries | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const DEV_TO_USERNAME = 'oscarrobertstar';
  const ARTICLES_PER_PAGE = 6;

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [initialArticles, seriesData] = await Promise.all([
        devToApi.getArticles(DEV_TO_USERNAME, 1, 30),
        devToApi.getSeries(DEV_TO_USERNAME)
      ]);
      setArticles(initialArticles);
      setSeries(seriesData);
      setDisplayedArticles(initialArticles.slice(0, ARTICLES_PER_PAGE));
      setLoading(false);
    };
    fetchData();
  }, []);

  // Effect to handle URL query parameters without Next.js router
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('articleId');
    const tab = urlParams.get('tab');
    const seriesId = urlParams.get('series');

    if (articleId) {
      const fetchDetailedArticle = async () => {
        const id = parseInt(articleId);
        const detailedArticle = await devToApi.getArticleById(id);
        setSelectedArticle(detailedArticle);
      };
      fetchDetailedArticle();
    }
    
    if (tab) {
      setActiveTab(tab);
    }
    
    if (seriesId && series.length > 0) {
      const targetSeries = series.find(s => s.id === parseInt(seriesId));
      if (targetSeries) {
        setSelectedSeries(targetSeries);
      }
    }
  }, [series]); // Rerun when series data is available

  const handleArticleClick = async (id: number) => {
    const detailedArticle = await devToApi.getArticleById(id);
    setSelectedArticle(detailedArticle);
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const currentDisplayed = displayedArticles.length;
    const nextBatch = articles.slice(currentDisplayed, currentDisplayed + ARTICLES_PER_PAGE);
    
    if (nextBatch.length > 0) {
      setDisplayedArticles(prev => [...prev, ...nextBatch]);
    } else if (articles.length >= 30 && !allArticlesLoaded) {
      const nextPage = Math.floor(articles.length / 30) + 1;
      const newArticles = await devToApi.getArticles(DEV_TO_USERNAME, nextPage, 30);
      
      if (newArticles.length === 0) {
        setAllArticlesLoaded(true);
      } else {
        const updatedArticles = [...articles, ...newArticles];
        setArticles(updatedArticles);
        setDisplayedArticles(prev => [...prev, ...newArticles.slice(0, ARTICLES_PER_PAGE)]);
      }
    } else {
      setAllArticlesLoaded(true);
    }
    setLoadingMore(false);
  };

  const filteredArticles = displayedArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tag_list.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredSeries = series.filter(seriesItem => 
    seriesItem.name.toLowerCase().includes(seriesSearchTerm.toLowerCase()) ||
    seriesItem.articles.some(article => 
      article.title.toLowerCase().includes(seriesSearchTerm.toLowerCase()) ||
      article.tag_list.some(tag => tag.toLowerCase().includes(seriesSearchTerm.toLowerCase()))
    )
  );


  const featuredPost = articles.length > 0 ? articles[0] : null;
  const regularPosts = searchTerm ? filteredArticles : displayedArticles.slice(1);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderArticleCard = (article: DevToArticle) => (
    <Card key={article.id} className="h-full flex flex-col group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
      {/* Conditionally render the cover image */}
      {article.cover_image && (
        <div className="w-full h-48 overflow-hidden rounded-t-lg relative">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
        </div>
      )}
      {/* Wrap CardHeader in Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
                {article.title}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(article.published_at)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.reading_time_minutes} min read
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-primary/70" />
                  {article.public_reactions_count}
                </div>
              </div>
            </CardHeader>
          </TooltipTrigger>
          <TooltipContent>
            <p>{article.title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CardContent className="flex-grow flex flex-col pt-0">
        <p className="text-muted-foreground mb-4 flex-grow line-clamp-3 leading-relaxed">
          {article.description}
        </p>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {Array.isArray(article.tag_list) && article.tag_list.length > 0 &&
              article.tag_list.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
                  {tag}
                </Badge>
              ))}
            {article.tag_list.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-muted/50 text-muted-foreground">
                +{article.tag_list.length - 3}
              </Badge>
            )}
          </div>
          <Button 
            variant="outline" 
            className="w-full group/button hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            onClick={() => handleArticleClick(article.id)}
          >
            Read Article
            <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-12 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section with Gradient */}
          <div className="text-center mb-4 relative">
            <div className="absolute inset-0 bg-gradient-subtle opacity-50 rounded-3xl"></div>
            <div className="relative z-10 py-16 px-8">
              <h1 className="text-5xl md:text-6xl font-tech font-bold mb-6 gradient-text">
                Tech With Okiya
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Notes on cloud infrastructure, system design and DevOps, drawn from real projects
              </p>
              <div className="mt-8 flex justify-center">
                <div className="w-24 h-1 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-card/50 backdrop-blur-sm border border-primary/20">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All Posts
              </TabsTrigger>
              <TabsTrigger 
                value="series"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Series
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-12">
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-card/80 backdrop-blur-sm border-primary/20 focus:border-primary transition-colors"
                  />
                </div>
              </div>
              {featuredPost && searchTerm === "" && !loading && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold mb-8 gradient-text text-center">Featured Article</h2>
                  <Card className="overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 border border-primary/20 bg-gradient-subtle">
                    <div className="md:flex">
                      <div className="md:w-2/3">
                        {/* Featured Post CardHeader with Tooltip */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <CardHeader className="pb-4">
                                <div className="flex items-center gap-3 mb-4">
                                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                                    ⭐ Featured
                                  </Badge>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Heart className="h-4 w-4 text-primary" />
                                    <span className="font-medium">{featuredPost.public_reactions_count}</span>
                                  </div>
                                </div>
                                <CardTitle className="text-3xl md:text-4xl leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
                                  {featuredPost.title}
                                </CardTitle>
                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span className="font-medium">{formatDate(featuredPost.published_at)}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span className="font-medium">{featuredPost.reading_time_minutes} min read</span>
                                  </div>
                                </div>
                              </CardHeader>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{featuredPost.title}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <CardContent>
                          <p className="text-muted-foreground mb-6 line-clamp-3 text-lg leading-relaxed">
                            {featuredPost.description}
                          </p>
                          <div className="flex flex-wrap gap-3 mb-8">
                            {featuredPost.tag_list.slice(0, 4).map((tag) => (
                              <Badge key={tag} variant="outline" className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 transition-colors">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button 
                            onClick={() => handleArticleClick(featuredPost.id)}
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all duration-300"
                          >
                            Read Featured Article
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </div>
                      <div className="md:w-1/3 bg-gradient-depth relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background/20"></div>
                        <div className="relative z-10 flex items-center justify-center p-8 h-full min-h-[300px]">
                          {featuredPost.cover_image ? (
                            <img
                              src={featuredPost.cover_image}
                              alt={featuredPost.title}
                              className="w-full h-full object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="text-center text-primary/80">
                              <div className="text-6xl mb-4">✨</div>
                              <p className="text-lg font-semibold">Featured Article</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
              {loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="h-full animate-pulse bg-card/80 backdrop-blur-sm border-primary/10">
                      <CardHeader>
                        <div className="h-6 bg-primary/20 rounded mb-4"></div>
                        <div className="h-4 bg-muted/50 rounded w-3/4"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <div className="h-4 bg-muted/50 rounded"></div>
                          <div className="h-4 bg-muted/50 rounded w-5/6"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              {!loading && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
                    {searchTerm ? `Search Results (${filteredArticles.length})` : "Latest Articles"}
                  </h2>
                  {(searchTerm ? filteredArticles : regularPosts).length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">🔍</div>
                      <p className="text-lg text-muted-foreground">
                        {searchTerm ? "No articles found matching your search." : "No articles available."}
                      </p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {(searchTerm ? filteredArticles : regularPosts).map(renderArticleCard)}
                    </div>
                  )}
                </div>
              )}
              {!loading && !searchTerm && displayedArticles.length < articles.length && !allArticlesLoaded && (
                <div className="text-center">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="bg-card/50 backdrop-blur-sm border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-8 py-3"
                  >
                    {loadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                        Loading...
                      </>
                    ) : (
                      "Load More Posts"
                    )}
                  </Button>
                </div>
              )}
              {!loading && !searchTerm && allArticlesLoaded && articles.length > 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎉</div>
                  <p className="text-lg text-muted-foreground font-medium">You've reached the end of all posts!</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="series" className="space-y-12">
              {/* Search bar for series */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search series..."
                    value={seriesSearchTerm}
                    onChange={(e) => setSeriesSearchTerm(e.target.value)}
                    className="pl-10 bg-card/80 backdrop-blur-sm border-primary/20 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="h-full animate-pulse bg-card/80 backdrop-blur-sm border-primary/10">
                      <CardHeader>
                        <div className="h-6 bg-primary/20 rounded mb-4"></div>
                        <div className="h-4 bg-muted/50 rounded w-3/4"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="h-4 bg-muted/50 rounded"></div>
                          <div className="h-4 bg-muted/50 rounded w-5/6"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Article Series</h2>
                  <FeaturedSeries 
                    series={filteredSeries} // Pass filtered series
                    onSeriesClick={setSelectedSeries}
                  />
                  {filteredSeries.length === 0 && (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">🔍</div>
                      <p className="text-lg text-muted-foreground">
                        No series found matching your search.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <ArticleDetail
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        series={series}
      />
      <SeriesView
        series={selectedSeries}
        isOpen={!!selectedSeries}
        onClose={() => setSelectedSeries(null)}
        onArticleClick={handleArticleClick}
      />
    </div>
  );
};

export default Blog;