import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Eye, FileText, Database as DatabaseIcon, Code, Search } from "lucide-react";
import { DateRangePicker } from "@/components/DateRangePicker";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const allPapers = [
    {
      title: "Predicción de Producción Lechera mediante ML",
      authors: "Dr. Juan Pérez, Dra. María González",
      date: "2024-01",
      category: "Machine Learning",
      downloads: 234
    },
    {
      title: "Análisis de Suelos en la Región Centro",
      authors: "Ing. Carlos Ruiz, Lic. Ana Martínez",
      date: "2023-11",
      category: "Agricultura",
      downloads: 156
    },
    {
      title: "Optimización de Recursos Hídricos",
      authors: "Dr. Roberto Silva",
      date: "2023-09",
      category: "Sustentabilidad",
      downloads: 189
    }
  ];

  const filteredPapers = allPapers.filter(paper => {
    const matchesSearch = searchQuery === "" ||
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || paper.category === filterCategory;
    const matchesType = filterType === "all" || filterType === "Paper";
    
    const paperDate = new Date(paper.date);
    const matchesDate = (!dateFrom || paperDate >= dateFrom) &&
                        (!dateTo || paperDate <= dateTo);
    
    return matchesSearch && matchesCategory && matchesType && matchesDate;
  });

  const allDatasets = [
    {
      title: "Dataset Producción Láctea 2020-2024",
      size: "45 MB",
      format: "CSV",
      records: "12,450",
      category: "Ganadería"
    },
    {
      title: "Datos Climáticos Región Centro",
      size: "128 MB",
      format: "JSON",
      records: "50,000",
      category: "Clima"
    },
    {
      title: "Análisis de Cultivos Agrícolas",
      size: "32 MB",
      format: "XLSX",
      records: "8,200",
      category: "Agricultura"
    }
  ];

  const filteredDatasets = allDatasets.filter(dataset => {
    const matchesSearch = searchQuery === "" ||
      dataset.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || dataset.category === filterCategory;
    const matchesType = filterType === "all" || filterType === "Dataset";
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const allAlgorithms = [
    {
      title: "MilkCast - Predicción Lechera",
      type: "Random Forest",
      accuracy: "94.2%",
      language: "Python"
    },
    {
      title: "CropYield Predictor",
      type: "XGBoost",
      accuracy: "91.5%",
      language: "Python"
    },
    {
      title: "Weather Forecasting Model",
      type: "LSTM",
      accuracy: "88.7%",
      language: "Python"
    }
  ];

  const filteredAlgorithms = allAlgorithms.filter(algorithm => {
    const matchesSearch = searchQuery === "" ||
      algorithm.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === "all" || filterType === "Algorithm";
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-8 md:px-8 md:py-12">
        <div className="mb-8">
          <h1 className="mb-3 text-4xl font-bold tracking-tight">Recursos y Datos Abiertos</h1>
          <p className="text-lg text-muted-foreground">
            Explora datasets, investigaciones y algoritmos del sector agropecuario
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar recursos..."
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
                    <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                    <SelectItem value="Agricultura">Agricultura</SelectItem>
                    <SelectItem value="Ganadería">Ganadería</SelectItem>
                    <SelectItem value="Clima">Clima</SelectItem>
                    <SelectItem value="Sustentabilidad">Sustentabilidad</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="Paper">Papers</SelectItem>
                    <SelectItem value="Dataset">Datasets</SelectItem>
                    <SelectItem value="Algorithm">Algoritmos</SelectItem>
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

        <Tabs defaultValue="papers" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="papers">Papers</TabsTrigger>
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="algorithms">Algoritmos</TabsTrigger>
          </TabsList>

          <TabsContent value="papers" className="mt-6 space-y-4">
            {filteredPapers.map((paper, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <Badge variant="secondary">{paper.category}</Badge>
                      </div>
                      <CardTitle className="text-xl">{paper.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {paper.authors} • {paper.date}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {paper.downloads} descargas
                    </span>
                  <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/resources/${index + 1}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link to={`/resources/${index + 1}`}>
                          <Download className="mr-2 h-4 w-4" />
                          Descargar
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="datasets" className="mt-6 space-y-4">
            {filteredDatasets.map((dataset, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <DatabaseIcon className="h-5 w-5 text-accent" />
                        <Badge variant="secondary">{dataset.category}</Badge>
                      </div>
                      <CardTitle className="text-xl">{dataset.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {dataset.format} • {dataset.size} • {dataset.records} registros
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/resources/${index + 4}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to={`/resources/${index + 4}`}>
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="algorithms" className="mt-6 space-y-4">
            {filteredAlgorithms.map((algo, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Code className="h-5 w-5 text-secondary" />
                        <Badge>{algo.type}</Badge>
                        <Badge variant="outline">{algo.language}</Badge>
                      </div>
                      <CardTitle className="text-xl">{algo.title}</CardTitle>
                      <CardDescription className="mt-2">
                        Precisión: {algo.accuracy}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/unrafcast/${algo.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Detalles
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to={`/unrafcast/${algo.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Resources;
