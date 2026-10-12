import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import basketballImage from "@/assets/basketball-interest.jpg";
import foodImage from "@/assets/food-restaurant-interest.jpg";
import musicImage from "@/assets/music-interest.jpg";
import travelImage from "@/assets/travel-interest.jpg";

const BeyondTech = () => {
  const interests = [
    { 
      title: "Basketball", 
      description: "From strategy on the court to leadership off it, basketball teaches teamwork and resilience. I find a lot of parallels between a well-executed play and a well-structured system.", 
      image: basketballImage
    },
    { 
      title: "Food & Restaurants", 
      description: "Exploring new culinary experiences is a passion. It's a blend of art and science, much like software development. I appreciate the creativity and precision that goes into every dish.", 
      image: foodImage
    },
    { 
      title: "Music", 
      description: "Whether it's creating playlists for coding sessions or attending live concerts, music is a constant source of inspiration. It's the perfect way to recharge and find new creative energy.", 
      image: musicImage
    },
    { 
      title: "Travel", 
      description: "Exploring different cultures and perspectives broadens my mind and helps me approach problems with a fresh outlook. Every journey is a lesson in adaptability and discovery.", 
      image: travelImage
    },
  ];

  const values = [
    "Curiosity-driven learning",
    "Work-life balance",
    "Sustainable practices",
    "Community building",
    "Mentorship",
    "Creative problem solving"
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Beyond the Code
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            While I architect systems by day, I'm driven by curiosity, creativity, and connection. 
            Here's what makes me tick beyond the terminal.
          </p>
        </section>

        {/* Interests Grid with Images and Hover Effect */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">What Energizes Me</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            The passions and interests that fuel my creativity and drive my continuous growth.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {interests.map((interest, index) => (
              <Card key={index} className="group overflow-hidden border-2 border-primary/10 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:scale-105">
                <div className="relative w-full h-80">
                  <img src={interest.image} alt={interest.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  
                  {/* Remove this gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent"></div>
                  
                  {/* Remove this gradient and replace with a simple black overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center">
                    <CardTitle className="text-3xl font-bold mb-4 text-white drop-shadow-lg">
                      {interest.title}
                    </CardTitle>
                    <p className="text-base text-white opacity-0 group-hover:opacity-100 transition-opacity delay-200 duration-500 leading-relaxed drop-shadow-md">
                      {interest.description}
                    </p>
                  </div>
                  
                  {/* Static title at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                    <CardTitle className="text-2xl font-semibold text-foreground">
                      {interest.title}
                    </CardTitle>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide both my technical decisions and life choices.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {values.map((value, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-4 py-2">
                {value}
              </Badge>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Heart className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">My Philosophy</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg leading-relaxed">
                I believe that the best solutions come from understanding people, not just technology. 
                Every system I design starts with empathy for the humans who will use it.
              </p>
              <p className="text-lg leading-relaxed">
                Complexity should be elegant, not complicated. Like a good jazz improvisation, 
                the best architectures feel effortless even when they're handling incredible complexity underneath.
              </p>
              <p className="text-lg leading-relaxed">
                Growth happens outside comfort zones. Whether I'm tackling a new mountain trail 
                or learning a new technology, I'm always pushing boundaries while staying grounded in fundamentals.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Fun Facts */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Random Fun Facts</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <p className="text-center">
                  <span className="text-2xl font-bold text-primary">4</span><br />
                  <span className="text-muted-foreground">Continents explored</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-center">
                  <span className="text-2xl font-bold text-primary">1</span><br />
                  <span className="text-muted-foreground">Hole-in-one on the golf course</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-center">
                  <span className="text-2xl font-bold text-primary">15+</span><br />
                  <span className="text-muted-foreground">Different cuisines mastered</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-center">
                  <span className="text-2xl font-bold text-primary">∞</span><br />
                  <span className="text-muted-foreground">Curiosity level (unmeasurable)</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BeyondTech;