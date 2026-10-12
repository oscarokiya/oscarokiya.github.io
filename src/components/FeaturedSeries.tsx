import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import { DevToSeries } from "@/services/devtoApi";

interface FeaturedSeriesProps {
  series: DevToSeries[];
  onSeriesClick: (series: DevToSeries) => void;
}

const SERIES_DATA = {
  33089: {
    title: "E-commerce Platform: From the Ground Up",
    description: "A comprehensive series on building a full-featured e-commerce platform using modern web technologies.",
  },
  // Add more custom data as needed for other series IDs
};

export const FeaturedSeries = ({ series, onSeriesClick }: FeaturedSeriesProps) => {
  if (series.length === 0) {
    return null;
  }

  return (
    // Removed the "mb-16" from here, as the parent Blog component will manage spacing
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Changed to gap-8 for consistency */}
      {series.map((seriesItem) => { // Now mapping over all passed series
        const data = SERIES_DATA[seriesItem.id as keyof typeof SERIES_DATA];
        const seriesTitle = data?.title || seriesItem.name;
        const seriesDescription = data?.description || seriesItem.description;

        // Create a new series object with the custom data
        const augmentedSeries = {
          ...seriesItem,
          name: seriesTitle,
          description: seriesDescription,
        };

        return (
          <Card
            key={seriesItem.id}
            className="h-full flex flex-col overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 border border-border/50 hover:border-primary/20 bg-card/80 backdrop-blur-sm"
          >
            {seriesItem.articles[0]?.cover_image ? (
              <div className="w-full h-40 overflow-hidden rounded-t-lg">
                <img
                  src={seriesItem.articles[0].cover_image}
                  alt={seriesTitle}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ) : (
              <div className="w-full h-40 bg-muted/20 flex items-center justify-center rounded-t-lg">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            <CardContent className="p-6 flex-grow flex flex-col">
              <CardTitle 
                className="text-xl leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300"
              >
                {seriesTitle}
              </CardTitle>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20"> {/* Styled badge */}
                  {seriesItem.articles.length} articles
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">
                {seriesDescription}
              </p>
              <div className="space-y-3">
                <div className="space-y-2">
                  {seriesItem.articles.slice(0, 2).map((article) => (
                    <div key={article.id} className="text-sm">
                      <p className="line-clamp-1 text-foreground font-medium">
                        {article.title}
                      </p>
                    </div>
                  ))}
                  {seriesItem.articles.length > 2 && (
                    <p className="text-xs text-muted-foreground">
                      +{seriesItem.articles.length - 2} more articles
                    </p>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 group/button hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300" // Added button styling
                  onClick={() => onSeriesClick(augmentedSeries)}
                >
                  Explore Series
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};