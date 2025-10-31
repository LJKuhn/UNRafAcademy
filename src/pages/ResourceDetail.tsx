import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, ArrowLeft, FileText, Calendar, User, ExternalLink } from "lucide-react";

const ResourceDetail = () => {
  const { id } = useParams();
  
  // Mock data - in real app this would fetch based on id
  const resource = {
    id: id || "1",
    title: "Predicción de Producción Lechera mediante ML",
    type: "Paper",
    authors: ["Dr. Juan Pérez", "Dra. María González"],
    date: "2024-01",
    category: "Machine Learning",
    downloads: 234,
    abstract: "Este trabajo presenta un modelo predictivo basado en Random Forest para estimar la producción lechera diaria en establecimientos ganaderos de la región centro de Argentina. Se utilizaron datos históricos de 12,450 registros incluyendo variables climáticas, de suelo y de manejo del rodeo.",
    institution: "Universidad Nacional de Rafaela",
    license: "Creative Commons BY-NC-SA 4.0",
    keywords: ["Machine Learning", "Producción Lechera", "Agricultura de Precisión", "Random Forest"],
    relatedLinks: [
      { title: "Dataset Producción Láctea 2020-2024", url: "#" },
      { title: "MilkCast Algorithm Repository", url: "#" }
    ],
    bibliography: [
      "González, M. et al. (2023). 'Factores climáticos en producción lechera', Journal of Agricultural Science.",
      "Silva, R. (2022). 'Modelos predictivos en ganadería', Rev. Ciencias Agrarias UNRaf."
    ],
    fileUrl: "/resources/paper-1.pdf",
    previewImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-8 md:px-8 md:py-12 max-w-5xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/resources">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Recursos
          </Link>
        </Button>

        <div className="space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                    <Badge variant="secondary">{resource.category}</Badge>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                  <CardTitle className="text-3xl mb-3">{resource.title}</CardTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {resource.authors.join(", ")}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {resource.date}
                    </div>
                    <div>
                      {resource.downloads} descargas
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Vista Previa
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Preview */}
          <Card>
            <CardContent className="pt-6">
              <img 
                src={resource.previewImage} 
                alt="Preview" 
                className="w-full rounded-lg border"
              />
            </CardContent>
          </Card>

          {/* Abstract */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Resumen / Abstract</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{resource.abstract}</p>
            </CardContent>
          </Card>

          {/* Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Palabras Clave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {resource.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">{keyword}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Authors & Contributors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Autores y Colaboradores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {resource.authors.map((author, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{author}</p>
                      <p className="text-sm text-muted-foreground">{resource.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Enlaces Relacionados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {resource.relatedLinks.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {link.title}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bibliography */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Bibliografía</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                {resource.bibliography.map((ref, index) => (
                  <li key={index}>{ref}</li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Información Adicional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Institución</p>
                  <p className="font-medium">{resource.institution}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Licencia</p>
                  <p className="font-medium">{resource.license}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Fecha de Publicación</p>
                  <p className="font-medium">{resource.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Tipo de Recurso</p>
                  <p className="font-medium">{resource.type}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
