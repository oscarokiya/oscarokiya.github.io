import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { devToApi, DevToSeries } from "@/services/devtoApi";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [series, setSeries] = useState<DevToSeries[]>([]);
  const location = useLocation();
  
  const DEV_TO_USERNAME = 'oscarrobertstar';

  useEffect(() => {
    const fetchSeries = async () => {
      const seriesData = await devToApi.getSeries(DEV_TO_USERNAME);
      setSeries(seriesData);
    };
    fetchSeries();
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      window.location.href = `${import.meta.env.BASE_URL}#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navigateToSeries = (seriesId: number) => {
    window.location.href = `${import.meta.env.BASE_URL}blog?series=${seriesId}`;
    setIsMenuOpen(false);
  };

  const menuItems = (
    <>
      <Button variant="ghost" asChild className="text-lg md:text-base">
        <Link to="/#about" onClick={() => scrollToSection('about')}>About</Link>
      </Button>
      <Button variant="ghost" asChild className="text-lg md:text-base">
        <Link to="/#experience" onClick={() => scrollToSection('experience')}>Experience</Link>
      </Button>
      <Button variant="ghost" asChild className="text-lg md:text-base">
        <Link to="/#highlights" onClick={() => scrollToSection('highlights')}>Highlights</Link>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-lg md:text-base">
            Blog
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)}>All Posts</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {series.length > 0 && (
            <>
              <DropdownMenuItem onClick={() => {
                  window.location.href = `${import.meta.env.BASE_URL}blog?tab=series`;
                  setIsMenuOpen(false);
                }}
              >
                Series
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" asChild className="text-lg md:text-base">
        <Link to="/#contact" onClick={() => scrollToSection('contact')}>Contact</Link>
      </Button>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <nav className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link 
          to="/" 
          className="text-2xl font-tech font-bold gradient-text animate-shine tracking-wide"
        >
          Oscar Okiya
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {menuItems}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Links */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-screen border-t' : 'max-h-0'
      }`}>
        <div className="p-4 flex flex-col space-y-2">
          {menuItems}
        </div>
      </div>
    </header>
  );
};