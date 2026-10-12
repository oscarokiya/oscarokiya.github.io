import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import basketballImage from "@/assets/basketball-interest.jpg";
import foodImage from "@/assets/food-restaurant-interest.jpg";
import musicImage from "@/assets/music-interest.jpg";
import travelImage from "@/assets/travel-interest.jpg";

export const Interests = () => {
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

  return (
    <section className="mb-16 relative pt-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
          Beyond Tech
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Discover what drives my creativity and passion outside the world of code
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-12">
        {interests.map((interest, index) => (
          <Card key={index} className="group overflow-hidden transition-all duration-300 hover:scale-105">
            <div className="relative w-full h-56">
              <img src={interest.image} alt={interest.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              
              {/* This is the black overlay that appears on hover, hiding the image */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center text-white">
                <CardTitle className="text-2xl font-bold mb-2 text-white drop-shadow-lg">
                  {interest.title}
                </CardTitle>
                <p className="text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity delay-150 duration-300 leading-relaxed drop-shadow-md">
                  {interest.description}
                </p>
              </div>
              
              {/* Removed the static title and its corresponding overlay */}
            </div>
          </Card>
        ))}
      </div>

      {/* Call to action button */}
      <div className="text-center">
        <Link to="/beyond-tech">
          <Button 
            size="lg" 
            className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-2xl hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105 px-8 py-3"
          >
            Explore My World Beyond Code
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
};