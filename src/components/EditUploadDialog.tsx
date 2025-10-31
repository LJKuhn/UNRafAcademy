import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface EditUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  upload: {
    name: string;
    type: string;
    date: string;
    status: string;
  };
  onSave: () => void;
}

export function EditUploadDialog({ open, onOpenChange, upload, onSave }: EditUploadDialogProps) {
  const [title, setTitle] = useState(upload.name);
  const [type, setType] = useState(upload.type);
  const [visibility, setVisibility] = useState("public");
  const [authors, setAuthors] = useState<string[]>(["Dr. Juan Pérez"]);
  const [links, setLinks] = useState<{ title: string; url: string }[]>([{ title: "", url: "" }]);
  const [keywords, setKeywords] = useState<string[]>(["Machine Learning", "Agricultura"]);
  const [currentKeyword, setCurrentKeyword] = useState("");

  const handleAddAuthor = () => setAuthors([...authors, ""]);
  const handleRemoveAuthor = (index: number) => setAuthors(authors.filter((_, i) => i !== index));
  const handleAuthorChange = (index: number, value: string) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
  };

  const handleAddLink = () => setLinks([...links, { title: "", url: "" }]);
  const handleRemoveLink = (index: number) => setLinks(links.filter((_, i) => i !== index));
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

  const handleRemoveKeyword = (keyword: string) => setKeywords(keywords.filter(k => k !== keyword));

  const handleSave = () => {
    toast.success("Recurso actualizado correctamente");
    onSave();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Recurso</DialogTitle>
          <DialogDescription>
            Modifica la información de tu recurso publicado
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Título</Label>
            <Input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-type">Tipo de Recurso</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="edit-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paper">Paper / Documento</SelectItem>
                <SelectItem value="Dataset">Dataset</SelectItem>
                <SelectItem value="Algorithm">Algoritmo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-abstract">Resumen / Abstract</Label>
            <Textarea id="edit-abstract" rows={4} placeholder="Describe brevemente tu trabajo..." />
          </div>

          <div className="space-y-3">
            <Label>Autores / Colaboradores</Label>
            {authors.map((author, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Nombre completo del autor"
                  value={author}
                  onChange={(e) => handleAuthorChange(index, e.target.value)}
                />
                {authors.length > 1 && (
                  <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveAuthor(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={handleAddAuthor}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Autor
            </Button>
          </div>

          <div className="space-y-3">
            <Label>Palabras Clave</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Agregar palabra clave"
                value={currentKeyword}
                onChange={(e) => setCurrentKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
              />
              <Button type="button" variant="outline" onClick={handleAddKeyword}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {keyword}
                    <button type="button" onClick={() => handleRemoveKeyword(keyword)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

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
                  <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveLink(index)}>
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
            <Button type="button" variant="outline" size="sm" onClick={handleAddLink}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Enlace
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-visibility">Visibilidad</Label>
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger id="edit-visibility">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Público</SelectItem>
                <SelectItem value="private">Privado</SelectItem>
                <SelectItem value="institutional">Solo Institucional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Guardar Cambios
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
