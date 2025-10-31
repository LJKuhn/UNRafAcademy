import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const UploadResource = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<string[]>([""]);
  const [links, setLinks] = useState<{ title: string; url: string }[]>([{ title: "", url: "" }]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState("");

  const handleAddAuthor = () => {
    setAuthors([...authors, ""]);
  };

  const handleRemoveAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const handleAuthorChange = (index: number, value: string) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
  };

  const handleAddLink = () => {
    setLinks([...links, { title: "", url: "" }]);
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleLinkChange = (index: number, field: 'title' | 'url', value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const handleAddKeyword = () => {
    if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Recurso subido exitosamente");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-8 md:px-8 md:py-12 max-w-4xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/profile">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Perfil
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Upload className="h-7 w-7" />
              Subir Recurso
            </CardTitle>
            <CardDescription>
              Comparte tu investigación, dataset o algoritmo con la comunidad académica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input 
                  id="title" 
                  placeholder="Ej: Predicción de Producción Lechera mediante ML"
                  required
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Recurso *</Label>
                <Select required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paper">Paper / Documento</SelectItem>
                    <SelectItem value="dataset">Dataset</SelectItem>
                    <SelectItem value="algorithm">Algoritmo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ml">Machine Learning</SelectItem>
                    <SelectItem value="agricultura">Agricultura</SelectItem>
                    <SelectItem value="ganaderia">Ganadería</SelectItem>
                    <SelectItem value="clima">Clima</SelectItem>
                    <SelectItem value="sustentabilidad">Sustentabilidad</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Abstract */}
              <div className="space-y-2">
                <Label htmlFor="abstract">Resumen / Abstract *</Label>
                <Textarea 
                  id="abstract"
                  placeholder="Describe brevemente tu trabajo, metodología y resultados principales..."
                  rows={5}
                  required
                />
              </div>

              {/* Authors */}
              <div className="space-y-3">
                <Label>Autores / Colaboradores *</Label>
                {authors.map((author, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Nombre completo del autor"
                      value={author}
                      onChange={(e) => handleAuthorChange(index, e.target.value)}
                      required
                    />
                    {authors.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveAuthor(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddAuthor}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Autor
                </Button>
              </div>

              {/* Keywords */}
              <div className="space-y-3">
                <Label>Palabras Clave</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Agregar palabra clave"
                    value={currentKeyword}
                    onChange={(e) => setCurrentKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddKeyword}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {keyword}
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(keyword)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Related Links */}
              <div className="space-y-3">
                <Label>Enlaces Relacionados / Bibliografía</Label>
                {links.map((link, index) => (
                  <div key={index} className="space-y-2 p-3 border rounded-lg">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Título del enlace"
                        value={link.title}
                        onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveLink(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="URL del enlace"
                      type="url"
                      value={link.url}
                      onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddLink}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Enlace
                </Button>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="file">Archivo *</Label>
                <Input 
                  id="file" 
                  type="file"
                  accept=".pdf,.csv,.xlsx,.pkl,.joblib,.zip"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Formatos aceptados: PDF, CSV, XLSX, PKL, JOBLIB, ZIP (máx. 100MB)
                </p>
              </div>

              {/* Visibility */}
              <div className="space-y-2">
                <Label htmlFor="visibility">Visibilidad *</Label>
                <Select required defaultValue="public">
                  <SelectTrigger id="visibility">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Público</SelectItem>
                    <SelectItem value="private">Privado</SelectItem>
                    <SelectItem value="institutional">Solo Institucional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* License */}
              <div className="space-y-2">
                <Label htmlFor="license">Licencia *</Label>
                <Select required defaultValue="cc-by-nc-sa">
                  <SelectTrigger id="license">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cc-by-nc-sa">Creative Commons BY-NC-SA 4.0</SelectItem>
                    <SelectItem value="cc-by">Creative Commons BY 4.0</SelectItem>
                    <SelectItem value="cc0">CC0 - Dominio Público</SelectItem>
                    <SelectItem value="proprietary">Propietaria</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  <Upload className="mr-2 h-4 w-4" />
                  Subir Recurso
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/profile">Cancelar</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadResource;
