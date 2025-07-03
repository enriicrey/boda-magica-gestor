
import { useState } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, Calendar, CreditCard, Star, Eye, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Mock data for analytics
const monthlyRevenue = [
  { month: 'Ene', revenue: 4200, events: 8, clients: 6 },
  { month: 'Feb', revenue: 3800, events: 6, clients: 5 },
  { month: 'Mar', revenue: 5600, events: 12, clients: 9 },
  { month: 'Abr', revenue: 4900, events: 9, clients: 7 },
  { month: 'May', revenue: 6800, events: 15, clients: 12 },
  { month: 'Jun', revenue: 7200, events: 14, clients: 11 },
];

const eventTypeDistribution = [
  { name: 'Bodas', value: 65, count: 42, revenue: 145000 },
  { name: 'Corporativo', value: 20, count: 15, revenue: 85000 },
  { name: 'Cumpleaños', value: 10, count: 8, revenue: 25000 },
  { name: 'Otros', value: 5, count: 3, revenue: 15000 },
];

const clientSatisfaction = [
  { period: 'Q1', satisfaction: 4.2, reviews: 45 },
  { period: 'Q2', satisfaction: 4.5, reviews: 52 },
  { period: 'Q3', satisfaction: 4.7, reviews: 48 },
  { period: 'Q4', satisfaction: 4.9, reviews: 47 },
];

const topMetrics = {
  totalRevenue: 270000,
  totalClients: 68,
  avgEventValue: 3970,
  satisfactionScore: 4.9,
  retentionRate: 85,
  monthlyGrowth: 18.5
};

const COLORS = ['#8b5a83', '#a67c94', '#c199a5', '#dcb6b6'];

const ProviderAnalytics = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const handleExportData = () => {
    toast({
      title: "Exportando datos",
      description: "Los datos de analítica se están descargando en formato CSV."
    });
  };

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analítica</h1>
            <p className="text-gray-600">
              Insights detallados sobre tu rendimiento y crecimiento profesional
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="3months">Últimos 3 meses</option>
              <option value="6months">Últimos 6 meses</option>
              <option value="1year">Último año</option>
            </select>
            <Button onClick={handleExportData} variant="outline">
              Exportar datos
            </Button>
          </div>
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-purple-700">Ingresos totales</p>
                  <h3 className="text-2xl font-bold text-purple-800">€{topMetrics.totalRevenue.toLocaleString()}</h3>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{topMetrics.monthlyGrowth}% este mes
                  </div>
                </div>
                <div className="bg-purple-200 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-purple-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-700">Clientes totales</p>
                  <h3 className="text-2xl font-bold text-green-800">{topMetrics.totalClients}</h3>
                  <div className="flex items-center text-xs text-green-600">
                    <Users className="h-3 w-3 mr-1" />
                    {topMetrics.retentionRate}% retención
                  </div>
                </div>
                <div className="bg-green-200 p-3 rounded-full">
                  <Users className="h-6 w-6 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-amber-700">Satisfacción</p>
                  <h3 className="text-2xl font-bold text-amber-800">{topMetrics.satisfactionScore}</h3>
                  <div className="flex items-center text-xs text-amber-600">
                    <Star className="h-3 w-3 mr-1" />
                    Promedio de reseñas
                  </div>
                </div>
                <div className="bg-amber-200 p-3 rounded-full">
                  <Star className="h-6 w-6 text-amber-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">Ingresos</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfacción</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Evolución de ingresos</CardTitle>
                  <CardDescription>Tendencia mensual de ingresos y eventos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'revenue' ? `€${value}` : value,
                          name === 'revenue' ? 'Ingresos' : 'Eventos'
                        ]}
                      />
                      <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8b5a83" fill="#8b5a83" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl">Distribución por tipo</CardTitle>
                  <CardDescription>Ingresos por tipo de evento</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={eventTypeDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {eventTypeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {eventTypeDistribution.map((item, index) => (
                      <div key={item.name} className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index] }}
                        />
                        <div className="text-xs">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-gray-500">€{item.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Eventos por mes</CardTitle>
                <CardDescription>Número de eventos organizados mensualmente</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="events" fill="#8b5a83" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Adquisición de clientes</CardTitle>
                <CardDescription>Nuevos clientes por mes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="clients" stroke="#8b5a83" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="satisfaction" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Satisfacción del cliente</CardTitle>
                <CardDescription>Evolución de la puntuación promedio</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={clientSatisfaction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip formatter={(value) => [value, 'Puntuación']} />
                    <Area type="monotone" dataKey="satisfaction" stroke="#8b5a83" fill="#8b5a83" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProviderLayout>
  );
};

export default ProviderAnalytics;
