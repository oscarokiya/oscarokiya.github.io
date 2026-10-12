import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { RecentBlogs } from "@/components/RecentBlogs";
import { Contact } from "@/components/Contact";
import { Interests } from "@/components/Interests"; 

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <RecentBlogs />
        <Interests />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
