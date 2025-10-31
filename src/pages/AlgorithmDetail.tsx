import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ArrowLeft, Code, TrendingUp, User, Calendar } from "lucide-react";

const AlgorithmDetail = () => {
  const { id } = useParams();
  
  // Mock data
  const algorithm = {
    id: id || "milkcast",
    name: "MilkCast - Predicción Lechera",
    type: "Random Forest",
    accuracy: "94.2%",
    language: "Python",
    version: "2.1.0",
    authors: ["Dr. Juan Pérez", "Dra. María González"],
    date: "2024-01",
    description: "MilkCast es un modelo de Machine Learning basado en Random Forest diseñado para predecir la producción diaria de leche en establecimientos ganaderos. Utiliza variables climáticas, de suelo y de manejo para generar predicciones precisas.",
    variables: [
      { name: "Temperatura (°C)", type: "float", range: "-10 a 50", description: "Temperatura ambiente promedio" },
      { name: "Humedad (%)", type: "float", range: "0 a 100", description: "Humedad relativa del ambiente" },
      { name: "pH del Suelo", type: "float", range: "4 a 9", description: "Medición de acidez del suelo" },
      { name: "Precipitaciones (mm)", type: "float", range: "0 a 200", description: "Precipitaciones acumuladas" }
    ],
    performance: {
      accuracy: "94.2%",
      precision: "92.8%",
      recall: "93.5%",
      f1Score: "93.1%",
      trainingRecords: "12,450",
      validationRecords: "3,112"
    },
    samplePredictions: [
      { input: "Temp: 22°C, Hum: 65%, pH: 6.5, Precip: 25mm", output: "28.4 L/día", confidence: "94%" },
      { input: "Temp: 18°C, Hum: 70%, pH: 6.8, Precip: 35mm", output: "31.2 L/día", confidence: "92%" },
      { input: "Temp: 25°C, Hum: 55%, pH: 6.2, Precip: 15mm", output: "25.8 L/día", confidence: "95%" }
    ],
    requirements: [
      "Python 3.8+",
      "scikit-learn 1.0+",
      "pandas 1.3+",
      "numpy 1.21+"
    ],
    downloadUrl: "/algorithms/milkcast-v2.1.pkl"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container px-4 py-8 md:px-8 md:py-12 max-w-5xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/unrafcast">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a UNRafCast
          </Link>
        </Button>

        <div className="space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Code className="h-5 w-5 text-secondary flex-shrink-0" />
                    <Badge>{algorithm.type}</Badge>
                    <Badge variant="outline">{algorithm.language}</Badge>
                    <Badge variant="secondary">v{algorithm.version}</Badge>
                  </div>
                  <CardTitle className="text-3xl mb-3">{algorithm.name}</CardTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {algorithm.authors.join(", ")}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {algorithm.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      {algorithm.accuracy} accuracy
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button asChild>
                    <Link to="/unrafcast">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Probar Modelo
                    </Link>
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Descripción General</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{algorithm.description}</p>
            </CardContent>
          </Card>

          {/* Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Variables de Entrada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {algorithm.variables.map((variable, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{variable.name}</h4>
                      <Badge variant="outline">{variable.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{variable.description}</p>
                    <p className="text-sm text-primary">Rango: {variable.range}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Métricas de Rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
                  <p className="text-2xl font-bold text-primary">{algorithm.performance.accuracy}</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Precision</p>
                  <p className="text-2xl font-bold text-primary">{algorithm.performance.precision}</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Recall</p>
                  <p className="text-2xl font-bold text-primary">{algorithm.performance.recall}</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">F1 Score</p>
                  <p className="text-2xl font-bold text-primary">{algorithm.performance.f1Score}</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Training Records</p>
                  <p className="text-2xl font-bold">{algorithm.performance.trainingRecords}</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Validation Records</p>
                  <p className="text-2xl font-bold">{algorithm.performance.validationRecords}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sample Predictions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Predicciones de Ejemplo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {algorithm.samplePredictions.map((sample, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground mb-1">Input</p>
                        <p className="font-mono text-sm">{sample.input}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Output</p>
                        <p className="font-semibold text-primary">{sample.output}</p>
                        <p className="text-xs text-muted-foreground">Confidence: {sample.confidence}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Requisitos del Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {algorithm.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Authors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Desarrolladores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {algorithm.authors.map((author, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{author}</p>
                      <p className="text-sm text-muted-foreground">Universidad Nacional de Rafaela</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDetail;
