import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const NewsDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Mock data
  const article = {
    id: id || "1",
    title: "Nuevo Programa de Becas en Investigación Agrícola",
    category: "Institucional",
    date: "2024-01-15",
    author: "Secretaría Académica",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop",
    excerpt: "La UNRaf anuncia un programa de becas para estudiantes de posgrado enfocados en investigación agropecuaria y tecnologías aplicadas.",
    content: `
      <p>La Universidad Nacional de Rafaela (UNRaf) se complace en anunciar el lanzamiento de un nuevo programa de becas destinado a estudiantes de posgrado que deseen realizar investigación en el campo de la agricultura y las tecnologías aplicadas al sector agropecuario.</p>
      
      <h2>Objetivo del Programa</h2>
      <p>El programa busca fomentar la investigación científica y tecnológica en áreas estratégicas para el desarrollo del sector agropecuario regional y nacional. Se priorizarán proyectos que integren tecnologías emergentes como Machine Learning, IoT y análisis de datos.</p>
      
      <h2>Características de las Becas</h2>
      <ul>
        <li>Duración: 2 años con posibilidad de extensión</li>
        <li>Monto mensual: $150,000 ARS</li>
        <li>Cobertura de gastos de investigación hasta $500,000 ARS anuales</li>
        <li>Acceso completo a infraestructura y laboratorios de la UNRaf</li>
        <li>Posibilidad de realizar estadías en instituciones internacionales</li>
      </ul>
      
      <h2>Áreas de Investigación Prioritarias</h2>
      <p>Se dará prioridad a proyectos en las siguientes áreas:</p>
      <ul>
        <li>Agricultura de precisión y tecnologías aplicadas</li>
        <li>Machine Learning aplicado al sector agropecuario</li>
        <li>Sustentabilidad y gestión de recursos naturales</li>
        <li>Genética y mejoramiento de cultivos y ganado</li>
        <li>Análisis de datos climáticos y predicción</li>
      </ul>
      
      <h2>Requisitos</h2>
      <ul>
        <li>Ser graduado universitario o estar cursando los últimos años de carrera</li>
        <li>Presentar un proyecto de investigación con aval de un director/a con categoría en investigación</li>
        <li>Dedicación exclusiva al proyecto de investigación</li>
        <li>Compromiso de publicación de resultados en revistas académicas</li>
      </ul>
      
      <h2>Proceso de Selección</h2>
      <p>Los postulantes serán evaluados por un comité académico integrado por investigadores de reconocida trayectoria. Se tendrán en cuenta la viabilidad del proyecto, su relevancia e impacto potencial, así como los antecedentes académicos del postulante.</p>
      
      <h2>Fechas Importantes</h2>
      <ul>
        <li>Apertura de convocatoria: 15 de enero de 2024</li>
        <li>Cierre de inscripciones: 28 de febrero de 2024</li>
        <li>Evaluación de proyectos: marzo de 2024</li>
        <li>Anuncio de resultados: 15 de abril de 2024</li>
        <li>Inicio de becas: 1 de mayo de 2024</li>
      </ul>
      
      <p>Para más información y consultas, contactar a becas@unraf.edu.ar o visitar la oficina de Posgrado de la UNRaf.</p>
    `
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Eliminado de favoritos" : "Agregado a favoritos");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Enlace copiado al portapapeles");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-8 md:px-8 md:py-12 max-w-4xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/news">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Noticias
          </Link>
        </Button>

        <article className="space-y-6">
          {/* Header */}
          <div>
            <Badge className="mb-4">{article.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(article.date).toLocaleDateString('es-AR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={isFavorite ? "default" : "outline"}
                size="sm"
                onClick={handleToggleFavorite}
              >
                <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Guardado' : 'Guardar'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <Card>
            <CardContent className="p-0">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-auto rounded-lg"
              />
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardContent className="pt-6">
              <div 
                className="prose prose-slate max-w-none dark:prose-invert
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-ul:text-muted-foreground prose-ul:my-4
                  prose-li:my-2"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </CardContent>
          </Card>

          {/* Related Articles */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Artículos Relacionados</h3>
              <div className="space-y-3">
                <Link to="/news/2" className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <p className="font-medium">Conferencia Internacional sobre Machine Learning en Agricultura</p>
                  <p className="text-sm text-muted-foreground">Eventos • 12 de enero, 2024</p>
                </Link>
                <Link to="/news/3" className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <p className="font-medium">Publicación de Nuevos Datasets sobre Clima Regional</p>
                  <p className="text-sm text-muted-foreground">Investigación • 8 de enero, 2024</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
};

export default NewsDetail;
