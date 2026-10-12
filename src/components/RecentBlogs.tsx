// @/components/RecentBlogs.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { devToApi, DevToArticle } from "@/services/devtoApi";
// Removed: import Link from 'next/link';

export const RecentBlogs = () => {
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const DEV_TO_USERNAME = 'oscarrobertstar';

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const latestArticles = await devToApi.getLatestArticles(DEV_TO_USERNAME, 3);
      setArticles(latestArticles);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="blog" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Latest from <span className="font-tech gradient-text">Tech With Okiya</span></h2>
              <p className="text-lg text-muted-foreground">
                Notes on cloud infrastructure, system design and DevOps, drawn from real projects
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-full animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded mb-4"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Latest from <span className="font-tech gradient-text">Tech With Okiya</span></h2>
            <p className="text-lg text-muted-foreground">
              Notes on cloud infrastructure, system design and DevOps, drawn from real projects
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {articles.map((article) => (
              <Card 
                key={article.id} 
                className="h-full flex flex-col group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/20"
              >
                {/* Conditionally render the cover image */}
                {article.cover_image && (
                  <div className="w-full h-40 overflow-hidden rounded-t-lg">
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors duration-300">{article.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(article.published_at)}
                    </div>
                    <span>{article.reading_time_minutes} min read</span>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {article.public_reactions_count}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">{article.description}</p>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(article.tag_list) && article.tag_list.length > 0 &&
                        article.tag_list.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full group/button hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300" 
                      asChild
                    >
                      {/* Replaced Link with a standard <a> tag */}
                      <a href={`${import.meta.env.BASE_URL}blog?articleId=${article.id}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" asChild>
              {/* Replaced Link with a standard <a> tag */}
              <a href={`${import.meta.env.BASE_URL}blog`}>
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};