import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Database, FileCode, Settings, TrendingUp, Activity, Search, UserPlus, Edit, Trash2, Ban, Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { DateRangePicker } from "@/components/DateRangePicker";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [confirmAction, setConfirmAction] = useState<{ open: boolean; type: string; item: any }>({ open: false, type: "", item: null });

  const stats = [
    { label: "Usuarios Activos", value: "1,234", icon: Users, color: "text-primary" },
    { label: "Recursos Totales", value: "456", icon: Database, color: "text-accent" },
    { label: "Algoritmos", value: "23", icon: FileCode, color: "text-secondary" },
    { label: "Descargas/Mes", value: "5,678", icon: TrendingUp, color: "text-unraf-turquoise" }
  ];

  const allUsers = [
    { id: 1, name: "María González", email: "maria@unraf.edu.ar", role: "Investigadora", status: "Activo", date: "2024-01-15" },
    { id: 2, name: "Carlos Ruiz", email: "carlos@unraf.edu.ar", role: "Estudiante", status: "Activo", date: "2024-01-12" },
    { id: 3, name: "Ana Martínez", email: "ana@unraf.edu.ar", role: "Investigadora", status: "Pendiente", date: "2024-01-10" },
    { id: 4, name: "Laura Fernández", email: "laura@unraf.edu.ar", role: "Docente", status: "Activo", date: "2024-01-08" },
    { id: 5, name: "Pedro Gómez", email: "pedro@unraf.edu.ar", role: "Estudiante", status: "Bloqueado", date: "2023-12-20" },
    { id: 6, name: "Mariel Araceli López", email: "mariel@unraf.edu.ar", role: "Investigadora", status: "Activo", date: "2024-01-22" }
  ];

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = (!dateFrom || new Date(user.date) >= dateFrom) &&
                        (!dateTo || new Date(user.date) <= dateTo);
    
    return matchesSearch && matchesDate;
  });

  const allResources = [
    { id: 1, title: "Predicción Producción Lechera ML", type: "Paper", author: "Dr. Juan Pérez", date: "2024-01-20", downloads: 234, status: "Activo" },
    { id: 2, title: "Dataset Climático Regional", type: "Dataset", author: "Dra. María González", date: "2024-01-18", downloads: 156, status: "Activo" },
    { id: 3, title: "MilkCast Algorithm", type: "Algorithm", author: "Equipo UNRaf", date: "2024-01-15", downloads: 89, status: "Activo" },
    { id: 4, title: "AgroCast Predictor", type: "Algorithm", author: "Equipo UNRaf", date: "2024-01-10", downloads: 67, status: "Activo" },
    { id: 5, title: "Análisis de Suelos", type: "Paper", author: "Ing. Carlos Ruiz", date: "2023-12-15", downloads: 145, status: "Activo" }
  ];

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = (!dateFrom || new Date(resource.date) >= dateFrom) &&
                        (!dateTo || new Date(resource.date) <= dateTo);
    
    return matchesSearch && matchesDate;
  });

  const allSystemLogs = [
    { id: 1, user: "María González", action: "Descargó recurso", type: "Download", date: "2024-01-20 14:30", result: "Exitoso" },
    { id: 2, user: "Carlos Ruiz", action: "Subió dataset", type: "Upload", date: "2024-01-20 13:15", result: "Exitoso" },
    { id: 3, user: "Ana Martínez", action: "Editó perfil", type: "Edit", date: "2024-01-20 11:45", result: "Exitoso" },
    { id: 4, user: "Admin", action: "Bloqueó usuario", type: "Block", date: "2024-01-19 16:20", result: "Exitoso" },
    { id: 5, user: "Sistema", action: "Backup automático", type: "System", date: "2024-01-19 03:00", result: "Exitoso" }
  ];

  const filteredLogs = allSystemLogs.filter(log => {
    const matchesSearch = searchQuery === "" ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase());
    
    const logDate = new Date(log.date);
    const matchesDate = (!dateFrom || logDate >= dateFrom) &&
                        (!dateTo || logDate <= dateTo);
    
    return matchesSearch && matchesDate;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Usuario agregado correctamente");
    setAddUserOpen(false);
  };

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Usuario actualizado correctamente");
    setEditUserOpen(false);
  };

  const handleConfirmAction = () => {
    const { type, item } = confirmAction;
    if (type === "block") {
      toast.warning(`Usuario ${item.name} bloqueado`);
    } else if (type === "delete") {
      toast.error(`Usuario ${item.name} eliminado permanentemente`);
    } else if (type === "deleteResource") {
      toast.error(`Recurso ${item.title} eliminado`);
    } else if (type === "blockResource") {
      toast.warning(`Recurso ${item.title} bloqueado`);
    }
    setConfirmAction({ open: false, type: "", item: null });
  };

  const handleExportLogs = (format: string) => {
    toast.success(`Exportando logs en formato ${format.toUpperCase()}...`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-4rem)] border-r border-border bg-muted/30">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-1">Panel Admin</h2>
            <p className="text-sm text-muted-foreground">UNRaf Academy</p>
          </div>
          <nav className="px-3 space-y-1">
            <Button 
              variant={activeSection === "users" ? "default" : "ghost"} 
              className="w-full justify-start gap-3"
              onClick={() => setActiveSection("users")}
            >
              <Users className="h-4 w-4" />
              Usuarios
            </Button>
            <Button 
              variant={activeSection === "resources" ? "default" : "ghost"} 
              className="w-full justify-start gap-3"
              onClick={() => setActiveSection("resources")}
            >
              <Database className="h-4 w-4" />
              Recursos & Algoritmos
            </Button>
            <Button 
              variant={activeSection === "statistics" ? "default" : "ghost"} 
              className="w-full justify-start gap-3"
              onClick={() => setActiveSection("statistics")}
            >
              <Activity className="h-4 w-4" />
              Estadísticas
            </Button>
            <Button 
              variant={activeSection === "config" ? "default" : "ghost"} 
              className="w-full justify-start gap-3"
              onClick={() => setActiveSection("config")}
            >
              <Settings className="h-4 w-4" />
              Configuración
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard Administrativo</h1>
            <p className="text-muted-foreground">Gestión de usuarios y recursos</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Users Section */}
          {activeSection === "users" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle>Gestión de Usuarios</CardTitle>
                    <CardDescription>Administra usuarios de la plataforma</CardDescription>
                  </div>
                  <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Agregar Usuario
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                        <DialogDescription>Complete la información del usuario</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddUser} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre Completo</Label>
                          <Input id="name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Rol</Label>
                          <Select required>
                            <SelectTrigger id="role">
                              <SelectValue placeholder="Seleccionar rol" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Administrador</SelectItem>
                              <SelectItem value="investigador">Investigador</SelectItem>
                              <SelectItem value="estudiante">Estudiante</SelectItem>
                              <SelectItem value="publico">Público</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Estado</Label>
                          <Select required defaultValue="activo">
                            <SelectTrigger id="status">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="activo">Activo</SelectItem>
                              <SelectItem value="pendiente">Pendiente</SelectItem>
                              <SelectItem value="bloqueado">Bloqueado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button type="submit" className="flex-1">Agregar</Button>
                          <Button type="button" variant="outline" onClick={() => setAddUserOpen(false)}>Cancelar</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="md:col-span-2 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Buscar usuarios..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Filtrar por estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="activo">Activos</SelectItem>
                        <SelectItem value="pendiente">Pendientes</SelectItem>
                        <SelectItem value="bloqueado">Bloqueados</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DateRangePicker dateFrom={dateFrom} dateTo={dateTo} onDateFromChange={setDateFrom} onDateToChange={setDateTo} />
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
                        <TableCell><Badge variant={user.status === "Activo" ? "default" : "secondary"}>{user.status}</Badge></TableCell>
                        <TableCell>{user.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => { setSelectedUser(user); setEditUserOpen(true); }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setConfirmAction({ open: true, type: "block", item: user })}>
                              <Ban className="h-4 w-4 text-orange-500" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setConfirmAction({ open: true, type: "delete", item: user })}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Resources & Algorithms Section */}
          {activeSection === "resources" && (
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Recursos & Algoritmos</CardTitle>
                <CardDescription>Administra todos los recursos y algoritmos publicados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="md:col-span-2 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="paper">Papers</SelectItem>
                        <SelectItem value="dataset">Datasets</SelectItem>
                        <SelectItem value="algorithm">Algoritmos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DateRangePicker dateFrom={dateFrom} dateTo={dateTo} onDateFromChange={setDateFrom} onDateToChange={setDateTo} />
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Autor</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Descargas</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">{resource.title}</TableCell>
                        <TableCell><Badge variant="secondary">{resource.type}</Badge></TableCell>
                        <TableCell>{resource.author}</TableCell>
                        <TableCell>{resource.date}</TableCell>
                        <TableCell>{resource.downloads}</TableCell>
                        <TableCell><Badge variant="default">{resource.status}</Badge></TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setConfirmAction({ open: true, type: "blockResource", item: resource })}>
                              <Ban className="h-4 w-4 text-orange-500" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setConfirmAction({ open: true, type: "deleteResource", item: resource })}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Statistics Section */}
          {activeSection === "statistics" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle>Registro de Eventos del Sistema</CardTitle>
                    <CardDescription>Historial de actividades y acciones en la plataforma</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleExportLogs("pdf")}>
                      <FileText className="mr-2 h-4 w-4" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExportLogs("csv")}>
                      <Download className="mr-2 h-4 w-4" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExportLogs("doc")}>
                      <FileText className="mr-2 h-4 w-4" />
                      DOC
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExportLogs("txt")}>
                      <FileText className="mr-2 h-4 w-4" />
                      TXT
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4">
                  <div className="grid gap-3 md:grid-cols-4">
                    <div className="md:col-span-2 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Buscar en logs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo de acción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="download">Descargas</SelectItem>
                        <SelectItem value="upload">Subidas</SelectItem>
                        <SelectItem value="edit">Ediciones</SelectItem>
                        <SelectItem value="block">Bloqueos</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Resultado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="success">Exitoso</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DateRangePicker dateFrom={dateFrom} dateTo={dateTo} onDateFromChange={setDateFrom} onDateToChange={setDateTo} />
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Acción</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha y Hora</TableHead>
                      <TableHead>Resultado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell><Badge variant="outline">{log.type}</Badge></TableCell>
                        <TableCell>{log.date}</TableCell>
                        <TableCell><Badge variant={log.result === "Exitoso" ? "default" : "destructive"}>{log.result}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Configuration Section */}
          {activeSection === "config" && (
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Sistema</CardTitle>
                <CardDescription>Ajusta las configuraciones globales de la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="general">
                  <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="uploads">Subidas</TabsTrigger>
                    <TabsTrigger value="permissions">Permisos</TabsTrigger>
                  </TabsList>
                  <TabsContent value="general" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="site-name">Nombre del Sitio</Label>
                      <Input id="site-name" defaultValue="UNRaf Academy" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme">Tema de Color</Label>
                      <Select defaultValue="default">
                        <SelectTrigger id="theme">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Por Defecto</SelectItem>
                          <SelectItem value="dark">Oscuro</SelectItem>
                          <SelectItem value="light">Claro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => toast.success("Configuración guardada")}>Guardar Cambios</Button>
                  </TabsContent>
                  <TabsContent value="uploads" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="max-size">Tamaño Máximo de Archivo (MB)</Label>
                      <Input id="max-size" type="number" defaultValue="100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="formats">Formatos Permitidos</Label>
                      <Input id="formats" defaultValue="PDF, CSV, XLSX, PKL, JOBLIB, ZIP" />
                    </div>
                    <Button onClick={() => toast.success("Configuración guardada")}>Guardar Cambios</Button>
                  </TabsContent>
                  <TabsContent value="permissions" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Registro Público</p>
                          <p className="text-sm text-muted-foreground">Permitir que usuarios se registren sin aprobación</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Subidas Públicas</p>
                          <p className="text-sm text-muted-foreground">Permitir que cualquier usuario suba recursos</p>
                        </div>
                        <input type="checkbox" className="h-4 w-4" />
                      </div>
                    </div>
                    <Button onClick={() => toast.success("Configuración guardada")}>Guardar Cambios</Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Edit User Dialog */}
          {selectedUser && (
            <Dialog open={editUserOpen} onOpenChange={setEditUserOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Usuario</DialogTitle>
                  <DialogDescription>Modifica la información del usuario</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditUser} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Nombre Completo</Label>
                    <Input id="edit-name" defaultValue={selectedUser.name} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input id="edit-email" type="email" defaultValue={selectedUser.email} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-role">Rol</Label>
                    <Select required defaultValue={selectedUser.role.toLowerCase()}>
                      <SelectTrigger id="edit-role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="investigador">Investigador</SelectItem>
                        <SelectItem value="estudiante">Estudiante</SelectItem>
                        <SelectItem value="publico">Público</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Estado</Label>
                    <Select required defaultValue={selectedUser.status.toLowerCase()}>
                      <SelectTrigger id="edit-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="activo">Activo</SelectItem>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="bloqueado">Bloqueado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">Guardar Cambios</Button>
                    <Button type="button" variant="outline" onClick={() => setEditUserOpen(false)}>Cancelar</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}

          {/* Confirmation Dialogs */}
          <ConfirmDialog
            open={confirmAction.open}
            onOpenChange={(open) => setConfirmAction({ ...confirmAction, open })}
            onConfirm={handleConfirmAction}
            title={
              confirmAction.type === "block" ? "Bloquear Usuario" :
              confirmAction.type === "delete" ? "Eliminar Usuario" :
              confirmAction.type === "blockResource" ? "Bloquear Recurso" :
              "Eliminar Recurso"
            }
            description={
              confirmAction.type === "block" ? `¿Deseas bloquear al usuario ${confirmAction.item?.name}? Perderán acceso hasta ser reactivados.` :
              confirmAction.type === "delete" ? `¿Estás seguro de eliminar permanentemente al usuario ${confirmAction.item?.name}? Esta acción no se puede deshacer.` :
              confirmAction.type === "blockResource" ? `¿Deseas bloquear el recurso ${confirmAction.item?.title}?` :
              `¿Estás seguro de eliminar permanentemente el recurso ${confirmAction.item?.title}? Esta acción no se puede deshacer.`
            }
            confirmText={confirmAction.type === "delete" || confirmAction.type === "deleteResource" ? "Eliminar" : "Bloquear"}
            variant={confirmAction.type === "delete" || confirmAction.type === "deleteResource" ? "destructive" : "default"}
          />
        </main>
      </div>
    </div>
  );
};

export default Admin;
