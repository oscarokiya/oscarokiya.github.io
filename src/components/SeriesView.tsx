import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Heart, ArrowLeft } from "lucide-react";
import { DevToSeries } from "@/services/devtoApi";

interface SeriesViewProps {
  series: DevToSeries | null;
  isOpen: boolean;
  onClose: () => void;
  onArticleClick: (articleId: number) => void;
}

export const SeriesView = ({ series, isOpen, onClose, onArticleClick }: SeriesViewProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {series ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-4">
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </div>
              <DialogTitle className="text-2xl md:text-3xl leading-tight text-left">
                {series.name}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{series.articles.length} articles</Badge>
              </div>
              <p className="text-muted-foreground text-left">{series.description}</p>
            </DialogHeader>

            <div className="space-y-4">
              {series.articles.map((article, index) => (
                <Card 
                  key={article.id} 
                  // Apply the hover effects to the card
                  className="cursor-pointer group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500"
                  onClick={() => onArticleClick(article.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            Part {index + 1}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Heart className="h-3 w-3" />
                            {article.public_reactions_count}
                          </div>
                        </div>
                        <CardTitle 
                          // Apply the hover color change to the title
                          className="text-lg leading-tight group-hover:text-primary transition-colors duration-300"
                        >
                          {article.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(article.published_at)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.reading_time_minutes} min read
                          </div>
                        </div>
                      </div>
                      {article.cover_image && (
                        <div className="w-24 h-16 flex-shrink-0">
                          <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {article.tag_list.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onArticleClick(article.id)}
                      >
                        Read Article
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">Series not found</p>
            <Button variant="outline" onClick={onClose} className="mt-4">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};