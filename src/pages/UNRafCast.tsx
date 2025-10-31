import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Activity, TrendingUp, Search, Code, Eye } from "lucide-react";
import { DateRangePicker } from "@/components/DateRangePicker";

const UNRafCast = () => {
  const [showSimulator, setShowSimulator] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [temperature, setTemperature] = useState([20]);
  const [humidity, setHumidity] = useState([65]);
  const [ph, setPh] = useState([6.5]);
  const [prediction, setPrediction] = useState<number | null>(null);

  const allAlgorithms = [
    {
      id: "milkcast",
      name: "MilkCast",
      fullName: "MilkCast - Predicción Lechera",
      description: "Modelo de Machine Learning para predecir producción diaria de leche en establecimientos ganaderos",
      type: "Random Forest",
      accuracy: "94.2%",
      category: "Ganadería",
      language: "Python"
    },
    {
      id: "agrocast",
      name: "AgroCast",
      fullName: "AgroCast - Rendimiento de Cultivos",
      description: "Sistema predictivo para estimar rendimiento de cultivos según condiciones climáticas y de suelo",
      type: "XGBoost",
      accuracy: "91.5%",
      category: "Agricultura",
      language: "Python"
    },
    {
      id: "climatecast",
      name: "ClimateCast",
      fullName: "ClimateCast - Pronóstico Climático",
      description: "Modelo LSTM para predicción de variables climáticas en la región centro de Argentina",
      type: "LSTM",
      accuracy: "88.7%",
      category: "Clima",
      language: "Python"
    }
  ];

  const filteredAlgorithms = allAlgorithms.filter(algo => {
    const matchesSearch = searchQuery === "" ||
      algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      algo.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || algo.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handlePredict = () => {
    const mockPrediction = (temperature[0] * 0.5 + humidity[0] * 0.3 + ph[0] * 2) + Math.random() * 5;
    setPrediction(Number(mockPrediction.toFixed(2)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <div className="container px-4 py-8 md:px-8 md:py-12">
        <div className="mb-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-3">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight">UNRafCast</h1>
            </div>
            <Button 
              variant={showSimulator ? "outline" : "default"}
              onClick={() => setShowSimulator(!showSimulator)}
              className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
            >
              {showSimulator ? "Ver Algoritmos" : "Probar Simulador"}
            </Button>
          </div>
          <p className="text-lg text-slate-300">
            Sistema de predicción mediante modelos de Machine Learning pre-entrenados
          </p>
        </div>

        {!showSimulator ? (
          <>
            <Card className="mb-6 bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Buscar algoritmos..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 bg-slate-900/50 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                        <SelectValue placeholder="Categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las categorías</SelectItem>
                        <SelectItem value="Ganadería">Ganadería</SelectItem>
                        <SelectItem value="Agricultura">Agricultura</SelectItem>
                        <SelectItem value="Clima">Clima</SelectItem>
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
              {filteredAlgorithms.map((algo) => (
                <Card key={algo.id} className="bg-slate-800/50 border-slate-700 backdrop-blur hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="h-5 w-5 text-secondary" />
                      <Badge variant="secondary">{algo.category}</Badge>
                    </div>
                    <CardTitle className="text-white">{algo.name}</CardTitle>
                    <CardDescription className="text-slate-300">
                      {algo.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Tipo:</span>
                        <Badge variant="outline" className="border-slate-600 text-white">{algo.type}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Precisión:</span>
                        <span className="text-primary font-semibold">{algo.accuracy}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Lenguaje:</span>
                        <span className="text-white">{algo.language}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white hover:bg-slate-700" asChild>
                          <Link to={`/unrafcast/${algo.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Detalles
                          </Link>
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => setShowSimulator(true)}
                        >
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Probar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Variables de Entrada
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Ajusta los parámetros para generar una predicción
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="temperature" className="text-white">
                    Temperatura (°C): {temperature[0]}
                  </Label>
                  <Slider
                    id="temperature"
                    min={-10}
                    max={50}
                    step={0.5}
                    value={temperature}
                    onValueChange={setTemperature}
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="humidity" className="text-white">
                    Humedad (%): {humidity[0]}
                  </Label>
                  <Slider
                    id="humidity"
                    min={0}
                    max={100}
                    step={1}
                    value={humidity}
                    onValueChange={setHumidity}
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="ph" className="text-white">
                    pH del Suelo: {ph[0]}
                  </Label>
                  <Slider
                    id="ph"
                    min={4}
                    max={9}
                    step={0.1}
                    value={ph}
                    onValueChange={setPh}
                    className="cursor-pointer"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="rainfall" className="text-white">
                    Precipitaciones (mm)
                  </Label>
                  <Input 
                    id="rainfall"
                    type="number" 
                    placeholder="Ej: 25.5"
                    className="bg-slate-900/50 border-slate-600 text-white"
                  />
                </div>

                <Button 
                  onClick={handlePredict} 
                  className="w-full mt-6"
                  size="lg"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Generar Predicción
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white">Resultado de la Predicción</CardTitle>
                  <CardDescription className="text-slate-300">
                    Modelo: Random Forest Regressor v2.1
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {prediction !== null ? (
                    <div className="space-y-4">
                      <div className="rounded-lg bg-primary/10 border border-primary/30 p-6 text-center">
                        <p className="text-sm text-slate-300 mb-2">Producción Estimada</p>
                        <p className="text-4xl font-bold text-primary">{prediction}</p>
                        <p className="text-sm text-slate-300 mt-2">litros/día</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="rounded-lg bg-slate-900/50 p-4">
                          <p className="text-slate-400 mb-1">Confianza</p>
                          <p className="text-lg font-semibold text-white">94.2%</p>
                        </div>
                        <div className="rounded-lg bg-slate-900/50 p-4">
                          <p className="text-slate-400 mb-1">Varianza</p>
                          <p className="text-lg font-semibold text-white">±2.3</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-400">
                      <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Ajusta las variables y presiona "Generar Predicción"</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Información del Modelo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Algoritmo:</span>
                    <span className="text-white font-medium">Random Forest</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Precisión:</span>
                    <span className="text-white font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Dataset:</span>
                    <span className="text-white font-medium">12,450 registros</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Última actualización:</span>
                    <span className="text-white font-medium">Enero 2024</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UNRafCast;
