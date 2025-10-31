import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, Search } from "lucide-react";
import { DateRangePicker } from "@/components/DateRangePicker";

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const allArticles = [
    {
      title: "Nuevo Programa de Becas en Investigación Agrícola",
      excerpt: "La UNRaf anuncia un programa de becas para estudiantes de posgrado enfocados en investigación agropecuaria y tecnologías aplicadas.",
      date: "2024-01-15",
      author: "Secretaría Académica",
      category: "Institucional",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop"
    },
    {
      title: "Conferencia Internacional sobre Machine Learning en Agricultura",
      excerpt: "Se llevará a cabo en abril la tercera edición del congreso internacional sobre aplicaciones de ML en el sector agropecuario.",
      date: "2024-01-12",
      author: "Comité Organizador",
      category: "Eventos",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop"
    },
    {
      title: "Publicación de Nuevos Datasets sobre Clima Regional",
      excerpt: "El departamento de Ciencias Ambientales publica una colección de datos climáticos recopilados durante los últimos 10 años.",
      date: "2024-01-08",
      author: "Dr. Roberto Silva",
      category: "Investigación",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=400&fit=crop"
    },
    {
      title: "Convenio con Instituciones Internacionales",
      excerpt: "La UNRaf firma convenios de colaboración con universidades de Brasil y Uruguay para proyectos conjuntos de investigación.",
      date: "2024-01-05",
      author: "Relaciones Internacionales",
      category: "Institucional",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop"
    },
    {
      title: "Resultados del Proyecto MilkCast",
      excerpt: "El modelo de predicción de producción lechera alcanza un 94% de precisión en pruebas con datos reales de establecimientos locales.",
      date: "2023-12-28",
      author: "Equipo MilkCast",
      category: "Investigación",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop"
    },
    {
      title: "Taller: Introducción a Python para Análisis de Datos",
      excerpt: "Se dictará un curso intensivo de 4 semanas sobre Python aplicado al análisis de datos agrícolas. Inscripciones abiertas.",
      date: "2023-12-20",
      author: "Extensión Universitaria",
      category: "Capacitación",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop"
    }
  ];

  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || article.category === filterCategory;
    
    const articleDate = new Date(article.date);
    const matchesDate = (!dateFrom || articleDate >= dateFrom) &&
                        (!dateTo || articleDate <= dateTo);
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-8 md:px-8 md:py-12">
        <div className="mb-8">
          <h1 className="mb-3 text-4xl font-bold tracking-tight">Noticias y Blog</h1>
          <p className="text-lg text-muted-foreground">
            Mantente actualizado con las últimas novedades de la comunidad académica
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar noticias..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    <SelectItem value="Institucional">Institucional</SelectItem>
                    <SelectItem value="Eventos">Eventos</SelectItem>
                    <SelectItem value="Investigación">Investigación</SelectItem>
                    <SelectItem value="Capacitación">Capacitación</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DateRangePicker
                dateFrom={dateFrom}
                dateTo={dateTo}
                onDateFromChange={setDateFrom}
                onDateToChange={setDateTo}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article, index) => (
            <Link key={index} to={`/news/${index + 1}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <Badge className="w-fit mb-2">{article.category}</Badge>
                <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.date).toLocaleDateString('es-AR')}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {article.author}
                  </div>
                </div>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
