import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, BookOpen, LineChart, Users, FileText, Zap } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Database,
      title: "Datos Abiertos",
      description: "Accede a datasets del sector agropecuario y científico",
      link: "/resources"
    },
    {
      icon: BookOpen,
      title: "Investigaciones",
      description: "Explora papers y publicaciones académicas",
      link: "/resources"
    },
    {
      icon: LineChart,
      title: "UNRafCast",
      description: "Simulaciones predictivas con modelos de ML",
      link: "/unrafcast"
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Conecta con investigadores y académicos",
      link: "/news"
    },
    {
      icon: FileText,
      title: "Algoritmos",
      description: "Biblioteca de algoritmos pre-entrenados",
      link: "/resources"
    },
    {
      icon: Zap,
      title: "Noticias",
      description: "Mantente actualizado con las últimas novedades",
      link: "/news"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-background to-muted py-20 md:py-32">
        <div className="container px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Universidad Nacional de{" "}
              <span className="text-primary">Rafaela</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Plataforma académica para compartir conocimiento, datos abiertos y herramientas de análisis predictivo
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link to="/resources">Explorar Recursos</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/unrafcast">Probar UNRafCast</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Plataforma Integral de Investigación
            </h2>
            <p className="text-lg text-muted-foreground">
              Accede a herramientas y recursos para impulsar tu investigación
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.link}>
                  <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                    <CardHeader>
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted py-16 md:py-24">
        <div className="container px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              ¿Listo para comenzar?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Únete a nuestra comunidad académica y accede a recursos de investigación
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Contactar</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
