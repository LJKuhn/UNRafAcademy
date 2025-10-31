import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
            <Globe className="h-5 w-5 text-secondary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">UNRaf Academy</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Inicio
          </Link>
          <Link 
            to="/resources" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/resources") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Recursos
          </Link>
          <Link 
            to="/news" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/news") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Noticias
          </Link>
          <Link 
            to="/unrafcast" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/unrafcast") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            UNRafCast
          </Link>
          <Link 
            to="/contact" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/contact") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Contacto
          </Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link to="/profile">Perfil</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/admin">Admin</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
