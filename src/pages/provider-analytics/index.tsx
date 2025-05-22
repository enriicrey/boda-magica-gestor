
import { useState } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, BarChart2, Calendar, CreditCard, Download, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Mock data for analytics
const mockAnalytics = {
  totalClients: 48,
  activeEvents: 12,
  completedEvents: 87,
  totalRevenue: 157850,
  averageEventValue: 3680,
  monthlyGrowth: 18.5,
  yearlyGrowth: 42.3,
  popularServices: [
    { name: 'Bodas', percentage: 45, count: 39 },
    { name: 'Cumpleaños', percentage: 27, count: 23 },
    { name: 'Corporativos', percentage: 15, count: 13 },
    { name: 'Aniversarios', percentage: 8, count: 7 },
    { name: 'Otros', percentage: 5, count: 4 }
  ],
  recentMonthsData: [
    { month: 'Enero', revenue: 12500, events: 3 },
    { month: 'Febrero', revenue: 9800, events: 2 },
    { month: 'Marzo', revenue: 15300, events: 4 },
    { month: 'Abril', revenue: 20100, events: 5 },
    { month: 'Mayo', revenue: 17900, events: 4 }
  ],
  clientSatisfaction: 4.8,
  reviewCount: 42,
  clientRetention: 76
};

const ProviderAnalytics = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('6m'); // '1m', '6m', '1y', 'all'
  
  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Descargando informe",
      description: `El informe de ${reportType} se está generando`,
      duration: 3000
    });
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analítica</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Visualiza y analiza el rendimiento de tu negocio.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className={timeRange === '1m' ? 'bg-primary/10' : ''} onClick={() => setTimeRange('1m')}>
              1 mes
            </Button>
            <Button variant="outline" size="sm" className={timeRange === '6m' ? 'bg-primary/10' : ''} onClick={() => setTimeRange('6m')}>
              6 meses
            </Button>
            <Button variant="outline" size="sm" className={timeRange === '1y' ? 'bg-primary/10' : ''} onClick={() => setTimeRange('1y')}>
              1 año
            </Button>
            <Button variant="outline" size="sm" className={timeRange === 'all' ? 'bg-primary/10' : ''} onClick={() => setTimeRange('all')}>
              Todo
            </Button>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ingresos Totales
              </CardTitle>
              <CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalytics.totalRevenue.toLocaleString('es-ES', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +{mockAnalytics.yearlyGrowth}% vs año anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Clientes Totales
              </CardTitle>
              <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalytics.totalClients}
              </div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12% este año
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Eventos Completados
              </CardTitle>
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalytics.completedEvents}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {mockAnalytics.activeEvents} eventos activos
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Satisfacción Cliente
              </CardTitle>
              <StarIcon className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalytics.clientSatisfaction}/5
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Basado en {mockAnalytics.reviewCount} reseñas
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="eventos">Eventos</TabsTrigger>
            <TabsTrigger value="financiero">Financiero</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
          </TabsList>
          
          {/* General Tab */}
          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Ingresos mensuales</CardTitle>
                  <CardDescription>
                    Comparativa de ingresos en los últimos meses
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <BarChart2 className="h-16 w-16 mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-500 mb-2">Gráfico de barras de ingresos mensuales</p>
                      <p className="text-xs text-gray-400">(Visualización de gráficos en desarrollo)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución de servicios</CardTitle>
                  <CardDescription>
                    Por tipo de evento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnalytics.popularServices.map((service) => (
                      <div key={service.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{service.name}</span>
                          <span className="text-sm text-gray-500">{service.percentage}% ({service.count})</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${service.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>KPIs destacados</CardTitle>
                  <CardDescription>
                    Métricas clave de rendimiento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <p className="text-sm">Valor medio por evento</p>
                      <p className="font-bold">
                        {mockAnalytics.averageEventValue.toLocaleString('es-ES', {
                          style: 'currency',
                          currency: 'EUR'
                        })}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <p className="text-sm">Retención de clientes</p>
                      <p className="font-bold">{mockAnalytics.clientRetention}%</p>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <p className="text-sm">Crecimiento mensual</p>
                      <p className="font-bold text-green-500">+{mockAnalytics.monthlyGrowth}%</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm">Crecimiento anual</p>
                      <p className="font-bold text-green-500">+{mockAnalytics.yearlyGrowth}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Eventos Tab */}
          <TabsContent value="eventos" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Eventos por mes</CardTitle>
                  <CardDescription>
                    Total de eventos organizados por mes
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <BarChart2 className="h-16 w-16 mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-500 mb-2">Gráfico de eventos mensuales</p>
                      <p className="text-xs text-gray-400">(Visualización de gráficos en desarrollo)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Desglose por estado</CardTitle>
                  <CardDescription>
                    Estado actual de los eventos
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full flex-col justify-center">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                          <span>Completados</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">{mockAnalytics.completedEvents}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                          <span>Activos</span>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">{mockAnalytics.activeEvents}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                          <span>Programados</span>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">8</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                          <span>Cancelados</span>
                        </div>
                        <Badge className="bg-red-100 text-red-800">3</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Temporada de eventos</CardTitle>
                  <CardDescription>
                    Distribución de eventos a lo largo del año
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-60">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-500 mb-2">Gráfico de distribución anual</p>
                      <p className="text-xs text-gray-400">(Visualización de gráficos en desarrollo)</p>
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 border-t">
                  <p className="text-sm font-medium">Temporada alta: Mayo - Septiembre</p>
                  <p className="text-sm text-gray-500">67% de los eventos se concentran en estos meses</p>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          {/* Financiero Tab */}
          <TabsContent value="financiero" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Tendencia de ingresos</CardTitle>
                  <CardDescription>
                    Evolución de los ingresos en el tiempo
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <BarChart2 className="h-16 w-16 mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-500 mb-2">Gráfico de líneas de tendencia de ingresos</p>
                      <p className="text-xs text-gray-400">(Visualización de gráficos en desarrollo)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ingresos por servicio</CardTitle>
                  <CardDescription>
                    Desglose de ingresos por tipo de evento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnalytics.popularServices.map((service) => (
                      <div key={service.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{service.name}</span>
                          <span className="text-sm font-medium">
                            {Math.round(mockAnalytics.totalRevenue * service.percentage / 100).toLocaleString('es-ES', {
                              style: 'currency',
                              currency: 'EUR'
                            })}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${service.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Rentabilidad</CardTitle>
                  <CardDescription>
                    Análisis de márgenes y costes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <p className="text-sm">Margen bruto</p>
                      <p className="font-bold text-green-500">68%</p>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <p className="text-sm">Gastos operativos</p>
                      <p className="font-bold text-red-500">22%</p>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <p className="text-sm">Margen neto</p>
                      <p className="font-bold text-green-500">46%</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm">ROI marketing</p>
                      <p className="font-bold text-green-500">310%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => handleDownloadReport('financiero')}>
                <Download className="h-4 w-4 mr-2" />
                Descargar informe financiero
              </Button>
            </div>
          </TabsContent>
          
          {/* Clientes Tab */}
          <TabsContent value="clientes" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Nuevos clientes</CardTitle>
                  <CardDescription>
                    Adquisición de clientes por mes
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <BarChart2 className="h-16 w-16 mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-500 mb-2">Gráfico de nuevos clientes por mes</p>
                      <p className="text-xs text-gray-400">(Visualización de gráficos en desarrollo)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Satisfacción del cliente</CardTitle>
                  <CardDescription>
                    Análisis de reseñas y feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-8 mt-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-yellow-500">{mockAnalytics.clientSatisfaction}</div>
                      <div className="flex items-center justify-center mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`h-6 w-6 ${
                              star <= Math.floor(mockAnalytics.clientSatisfaction)
                                ? 'text-yellow-500 fill-yellow-500'
                                : star <= mockAnalytics.clientSatisfaction
                                ? 'text-yellow-500 fill-yellow-500 opacity-50'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Basado en {mockAnalytics.reviewCount} reseñas
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">5 estrellas</span>
                        <span className="text-sm">{Math.round(mockAnalytics.reviewCount * 0.85)}  ({85}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">4 estrellas</span>
                        <span className="text-sm">{Math.round(mockAnalytics.reviewCount * 0.12)} ({12}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">3 estrellas</span>
                        <span className="text-sm">{Math.round(mockAnalytics.reviewCount * 0.03)} ({3}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '3%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Fuentes de adquisición</CardTitle>
                  <CardDescription>
                    Cómo los clientes encuentran tus servicios
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-60">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <BarChart2 className="h-16 w-16 mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-500 mb-2">Gráfico de fuentes de adquisición</p>
                      <p className="text-xs text-gray-400">(Visualización de gráficos en desarrollo)</p>
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 border-t">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="font-bold text-blue-500 text-xl">43%</p>
                      <p className="text-sm text-gray-500">Referidos</p>
                    </div>
                    <div>
                      <p className="font-bold text-green-500 text-xl">28%</p>
                      <p className="text-sm text-gray-500">WeddingPlan</p>
                    </div>
                    <div>
                      <p className="font-bold text-purple-500 text-xl">18%</p>
                      <p className="text-sm text-gray-500">Redes sociales</p>
                    </div>
                    <div>
                      <p className="font-bold text-orange-500 text-xl">11%</p>
                      <p className="text-sm text-gray-500">Otros</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => handleDownloadReport('clientes')}>
                <Download className="h-4 w-4 mr-2" />
                Descargar informe de clientes
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Última actualización: {new Date().toLocaleDateString()}</p>
          <Button variant="outline" onClick={() => handleDownloadReport('completo')}>
            <Download className="h-4 w-4 mr-2" />
            Descargar informe completo
          </Button>
        </div>
      </div>
    </ProviderLayout>
  );
};

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default ProviderAnalytics;
