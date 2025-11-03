import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Heart, Clock, Upload, Search, Edit, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { DateRangePicker } from "@/components/DateRangePicker";
import { EditUploadDialog } from "@/components/EditUploadDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { AvatarSelector } from "@/components/AvatarSelector";

const Profile = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [avatarSelectorOpen, setAvatarSelectorOpen] = useState(false);
  const [editUploadOpen, setEditUploadOpen] = useState(false);
  const [confirmEditOpen, setConfirmEditOpen] = useState(false);
  const [selectedUpload, setSelectedUpload] = useState<any>(null);
  const [currentAvatar, setCurrentAvatar] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=user");
  const [searchHistory, setSearchHistory] = useState("");
  const [searchFavorites, setSearchFavorites] = useState("");
  const [searchUploads, setSearchUploads] = useState("");
  const [filterHistory, setFilterHistory] = useState("all");
  const [filterFavorites, setFilterFavorites] = useState("all");
  const [filterUploads, setFilterUploads] = useState("all");
  const [dateFromHistory, setDateFromHistory] = useState<Date>();
  const [dateToHistory, setDateToHistory] = useState<Date>();
  const [dateFromFavorites, setDateFromFavorites] = useState<Date>();
  const [dateToFavorites, setDateToFavorites] = useState<Date>();
  const [dateFromUploads, setDateFromUploads] = useState<Date>();
  const [dateToUploads, setDateToUploads] = useState<Date>();

  const handleSaveProfile = () => {
    toast.success("Perfil actualizado correctamente");
    setEditDialogOpen(false);
  };

  const handleAvatarSelect = (avatarUrl: string) => {
    setCurrentAvatar(avatarUrl);
    toast.success("Avatar actualizado correctamente");
  };

  const handleEditClick = (upload: any) => {
    setSelectedUpload(upload);
    setConfirmEditOpen(true);
  };

  const handleConfirmEdit = () => {
    setConfirmEditOpen(false);
    setEditUploadOpen(true);
  };

  const handleSaveUpload = () => {
    toast.success("Recurso actualizado correctamente");
  };

  const allDownloadHistory = [
    { name: "Predicción Producción Lechera", date: "2024-01-15", type: "Paper" },
    { name: "Dataset Climático 2020-2024", date: "2024-01-12", type: "Dataset" },
    { name: "MilkCast Algorithm", date: "2024-01-08", type: "Algorithm" },
    { name: "Análisis de Suelos", date: "2024-01-05", type: "Paper" }
  ];

  const filteredHistory = allDownloadHistory.filter(item => {
    const matchesSearch = searchHistory === "" ||
      item.name.toLowerCase().includes(searchHistory.toLowerCase());
    
    const matchesFilter = filterHistory === "all" || item.type === filterHistory;
    
    const itemDate = new Date(item.date);
    const matchesDate = (!dateFromHistory || itemDate >= dateFromHistory) &&
                        (!dateToHistory || itemDate <= dateToHistory);
    
    return matchesSearch && matchesFilter && matchesDate;
  });

  const allFavorites = [
    { name: "Análisis de Suelos", author: "Ing. Carlos Ruiz", type: "Paper", id: "2" },
    { name: "Datos Agrícolas Región Centro", author: "UNRaf", type: "Dataset", id: "5" },
    { name: "CropYield Predictor", author: "Equipo UNRaf", type: "Algorithm", id: "7" }
  ];

  const filteredFavorites = allFavorites.filter(item => {
    const matchesSearch = searchFavorites === "" ||
      item.name.toLowerCase().includes(searchFavorites.toLowerCase()) ||
      item.author.toLowerCase().includes(searchFavorites.toLowerCase());
    
    const matchesFilter = filterFavorites === "all" || item.type === filterFavorites;
    
    return matchesSearch && matchesFilter;
  });

  const allUploads = [
    { name: "Estudio de Pasturas 2024", date: "2024-01-20", type: "Paper", status: "Publicado" },
    { name: "Dataset Regional Ganadería", date: "2024-01-10", type: "Dataset", status: "En Revisión" },
    { name: "Predictor Climático V2", date: "2024-01-05", type: "Algorithm", status: "Publicado" }
  ];

  const filteredUploads = allUploads.filter(item => {
    const matchesSearch = searchUploads === "" ||
      item.name.toLowerCase().includes(searchUploads.toLowerCase());
    
    const matchesFilter = filterUploads === "all" || item.type === filterUploads;
    
    const itemDate = new Date(item.date);
    const matchesDate = (!dateFromUploads || itemDate >= dateFromUploads) &&
                        (!dateToUploads || itemDate <= dateToUploads);
    
    return matchesSearch && matchesFilter && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-8 md:px-8 md:py-12">
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="h-24 w-24 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setAvatarSelectorOpen(true)}>
                  <AvatarImage src={currentAvatar} />
                  <AvatarFallback>LK</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">Lautaro Jesús Kühn</h1>
                  <p className="text-muted-foreground mb-3">Administrador - Carrera de Ingeniería en Computación</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge>Investigador</Badge>
                    <Badge variant="secondary">Machine Learning</Badge>
                    <Badge variant="outline">Agricultura</Badge>
                  </div>
                </div>
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Editar Perfil</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Editar Perfil</DialogTitle>
                      <DialogDescription>
                        Actualiza tu información personal y profesional
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Nombre Completo</Label>
                        <Input id="edit-name" defaultValue="Lautaro Jesús Kühn" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-title">Título / Cargo</Label>
                        <Input id="edit-title" defaultValue="Administrador - Carrera de Ingeniería en Computación" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-bio">Biografía</Label>
                        <Textarea id="edit-bio" rows={4} placeholder="Cuéntanos sobre tu trabajo..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Avatar</Label>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={currentAvatar} />
                            <AvatarFallback>LK</AvatarFallback>
                          </Avatar>
                          <Button type="button" variant="outline" onClick={() => setAvatarSelectorOpen(true)}>
                            Cambiar Avatar
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSaveProfile}>
                          Guardar Cambios
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="history">Historial</TabsTrigger>
            <TabsTrigger value="favorites">Favoritos</TabsTrigger>
            <TabsTrigger value="uploads">Mis Uploads</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Historial de Descargas
                </CardTitle>
                <CardDescription>Recursos que has descargado recientemente</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="space-y-3 mb-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar en historial..."
                          value={searchHistory}
                          onChange={(e) => setSearchHistory(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <Select value={filterHistory} onValueChange={setFilterHistory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Paper">Papers</SelectItem>
                        <SelectItem value="Dataset">Datasets</SelectItem>
                        <SelectItem value="Algorithm">Algoritmos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DateRangePicker
                    dateFrom={dateFromHistory}
                    dateTo={dateToHistory}
                    onDateFromChange={setDateFromHistory}
                    onDateToChange={setDateToHistory}
                  />
                </div>
                <div className="space-y-4">
                  {filteredHistory.map((item, index) => (
                    <Link key={index} to={`/resources/${index + 1}`}>
                      <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <Download className="h-5 w-5 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.type}</Badge>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Recursos Favoritos
                </CardTitle>
                <CardDescription>Recursos que has marcado como favoritos</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="space-y-3 mb-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar favoritos..."
                          value={searchFavorites}
                          onChange={(e) => setSearchFavorites(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <Select value={filterFavorites} onValueChange={setFilterFavorites}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Paper">Papers</SelectItem>
                        <SelectItem value="Dataset">Datasets</SelectItem>
                        <SelectItem value="Algorithm">Algoritmos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DateRangePicker
                    dateFrom={dateFromFavorites}
                    dateTo={dateToFavorites}
                    onDateFromChange={setDateFromFavorites}
                    onDateToChange={setDateToFavorites}
                  />
                </div>
                <div className="space-y-4">
                  {filteredFavorites.map((item, index) => (
                    <Link key={index} to={`/resources/${item.id}`}>
                      <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <Heart className="h-5 w-5 text-primary fill-primary" />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.author}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.type}</Badge>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="uploads" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Mis Contribuciones
                    </CardTitle>
                    <CardDescription>Recursos que has subido a la plataforma</CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Subir Recurso
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {filteredUploads.length > 0 ? (
                  <>
                    {/* Search and Filter */}
                    <div className="space-y-3 mb-4">
                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="md:col-span-2">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Buscar uploads..."
                              value={searchUploads}
                              onChange={(e) => setSearchUploads(e.target.value)}
                              className="pl-9"
                            />
                          </div>
                        </div>
                        <Select value={filterUploads} onValueChange={setFilterUploads}>
                          <SelectTrigger>
                            <SelectValue placeholder="Tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="Paper">Papers</SelectItem>
                            <SelectItem value="Dataset">Datasets</SelectItem>
                            <SelectItem value="Algorithm">Algoritmos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <DateRangePicker
                        dateFrom={dateFromUploads}
                        dateTo={dateToUploads}
                        onDateFromChange={setDateFromUploads}
                        onDateToChange={setDateToUploads}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      {filteredUploads.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center gap-4 flex-1">
                            <Upload className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{item.type}</Badge>
                            <Badge variant={item.status === "Publicado" ? "default" : "secondary"}>
                              {item.status}
                            </Badge>
                            <Button variant="ghost" size="sm" onClick={() => handleEditClick(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">No has subido recursos aún</p>
                    <Button asChild>
                      <Link to="/upload">Subir Recurso</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <AvatarSelector
          open={avatarSelectorOpen}
          onOpenChange={setAvatarSelectorOpen}
          onSelect={handleAvatarSelect}
          currentAvatar={currentAvatar}
        />

        {selectedUpload && (
          <>
            <ConfirmDialog
              open={confirmEditOpen}
              onOpenChange={setConfirmEditOpen}
              onConfirm={handleConfirmEdit}
              title="Confirmar Edición"
              description="Estás a punto de modificar este recurso. ¿Deseas continuar?"
              confirmText="Continuar"
            />
            <EditUploadDialog
              open={editUploadOpen}
              onOpenChange={setEditUploadOpen}
              upload={selectedUpload}
              onSave={handleSaveUpload}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
