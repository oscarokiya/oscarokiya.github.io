import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

export const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const backgroundImageUrl = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop&crop=center";

  return (
    <section className="min-h-screen px-4 pt-24 pb-16 relative overflow-hidden md:flex md:flex-col md:items-center md:justify-center">
      {/* Background Image & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImageUrl}
          alt="Network architecture and data visualization"
          className="w-full h-full object-cover opacity-15"
        />
        {/* Existing gradient over the main background image */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hi, My name is <span className="text-primary">Oscar Okiya</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Cloud Infrastructure Engineer & Acting Solution Architect
          </p>
          <p className="text-lg text-primary/80 font-medium mb-8">
            Cloud platforms that cost less to run and ship faster
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            5+ years in fintech: I co-led an AWS-to-GCP migration that cut cloud costs by 30%,
            sped up software delivery by 50%, and run platforms serving 800,000+ customers. Three-times AWS certified.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" onClick={() => scrollToSection('highlights')}>
              Explore My Work
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')}>
              Get in Touch
            </Button>
          </div>

          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/oscarrobert-star"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/oscar-robert-okiya/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};