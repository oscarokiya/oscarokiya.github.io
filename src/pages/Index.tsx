import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Highlights } from "@/components/Highlights";
import { RecentBlogs } from "@/components/RecentBlogs";
import { Contact } from "@/components/Contact";

const Index = () => {
  // Sections render after the browser's own anchor jump, so scroll to /#section links once mounted
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Highlights />
        <RecentBlogs />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
