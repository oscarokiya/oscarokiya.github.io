// @/components/ArticleDetail.tsx

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Clock, Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { devToApi, DevToArticleDetail, DevToSeries } from "@/services/devtoApi";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ArticleDetailProps {
  article: DevToArticleDetail | null;
  isOpen: boolean;
  onClose: () => void;
  series: DevToSeries[];
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const ArticleDetail = ({ article, isOpen, onClose, series }: ArticleDetailProps) => {
  const [currentSeries, setCurrentSeries] = useState<DevToSeries | null>(null);
  const [prevArticle, setPrevArticle] = useState<DevToArticleDetail | null>(null);
  const [nextArticle, setNextArticle] = useState<DevToArticleDetail | null>(null);
  const [articleId, setArticleId] = useState<number | null>(null);

  useEffect(() => {
    if (article) {
      setArticleId(article.id);
    }
  }, [article]);

  useEffect(() => {
    if (articleId && series) {
      const foundSeries = series.find(s => s.articles.some(a => a.id === articleId));
      if (foundSeries) {
        setCurrentSeries(foundSeries);
        const currentArticleIndex = foundSeries.articles.findIndex(a => a.id === articleId);
        const prev = foundSeries.articles[currentArticleIndex - 1];
        const next = foundSeries.articles[currentArticleIndex + 1];

        const fetchSiblings = async () => {
          if (prev) {
            const prevData = await devToApi.getArticleById(prev.id);
            setPrevArticle(prevData);
          } else {
            setPrevArticle(null);
          }
          if (next) {
            const nextData = await devToApi.getArticleById(next.id);
            setNextArticle(nextData);
          } else {
            setNextArticle(null);
          }
        };
        fetchSiblings();
      }
    } else {
      setCurrentSeries(null);
      setPrevArticle(null);
      setNextArticle(null);
    }
  }, [articleId, series]);

  const handlePrevClick = () => {
    if (prevArticle) {
      window.location.href = `${import.meta.env.BASE_URL}blog?articleId=${prevArticle.id}`;
    }
  };

  const handleNextClick = () => {
    if (nextArticle) {
      window.location.href = `${import.meta.env.BASE_URL}blog?articleId=${nextArticle.id}`;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-6xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-card border-primary/20"
      >
        {article ? (
          <>
            <DialogHeader>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <Button variant="ghost" size="sm" onClick={onClose} className="mb-2 sm:mb-0 hover:bg-primary/10 hover:text-primary">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                {currentSeries && (
                  <div className="text-sm text-muted-foreground w-full sm:w-auto text-left sm:text-right">
                    Part of: <span className="font-semibold text-primary">{currentSeries.name}</span>
                  </div>
                )}
              </div>
              <DialogTitle className="text-2xl md:text-4xl leading-tight text-left font-bold text-foreground">
                {article.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Article details for {article.title}.
              </DialogDescription>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">{formatDate(article.published_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">{article.reading_time_minutes} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="font-medium">{article.public_reactions_count} reactions</span>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-8">
              {article.cover_image && (
                <div className="w-full">
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {Array.isArray(article.tag_list) && article.tag_list.length > 0 &&
                  article.tag_list.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {tag}
                    </Badge>
                  ))}
              </div>

              <Card className="border-primary/10 bg-background/50">
                <CardContent className="p-6 md:p-8">
                  <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-card prose-pre:border prose-pre:border-primary/20 prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-foreground">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {article.body_markdown}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
              
              {/* Prev/Next Navigation with Tooltips */}
              {currentSeries && (
                <div className="flex flex-col items-center py-6 border-t border-primary/20 space-y-4">
                  <TooltipProvider>
                    {prevArticle ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button onClick={handlePrevClick} variant="outline" className="w-full justify-start text-left flex-wrap h-auto p-4 hover:bg-primary/10 hover:border-primary border-primary/20">
                            <ArrowLeft className="h-5 w-5 mr-3 flex-shrink-0 text-primary" />
                            <div className="flex flex-col items-start">
                              <span className="text-xs text-muted-foreground mb-1">Previous Article</span>
                              <span className="truncate font-medium">{prevArticle.title}</span>
                            </div>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{prevArticle.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <div className="w-full"></div>
                    )}
                  </TooltipProvider>

                  <TooltipProvider>
                    {nextArticle ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button onClick={handleNextClick} className="w-full justify-start text-left flex-wrap h-auto p-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                            <div className="flex flex-col items-start flex-grow">
                              <span className="text-xs opacity-80 mb-1">Next Article</span>
                              <span className="truncate font-medium">{nextArticle.title}</span>
                            </div>
                            <ArrowRight className="h-5 w-5 ml-3 flex-shrink-0" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{nextArticle.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <div className="w-full"></div>
                    )}
                  </TooltipProvider>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-gradient-subtle rounded-lg border border-primary/10 space-y-4 sm:space-y-0">
                <div className="flex items-center gap-4">
                  <img
                    src={article.user.profile_image_90}
                    alt={article.user.name}
                    className="w-12 h-12 rounded-full border-2 border-primary/20"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{article.user.name}</p>
                    <p className="text-sm text-muted-foreground">@{article.user.username}</p>
                  </div>
                </div>
                <Button variant="outline" asChild className="bg-primary/10 border-primary/30 hover:bg-primary hover:text-primary-foreground">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    View on Dev.to
                  </a>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">Failed to load article</p>
            <Button variant="outline" onClick={onClose} className="mt-4">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};