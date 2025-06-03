
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, CreditCard, Calendar, Star, Download } from 'lucide-react';

const AdminAnaliticas = () => {
  const [timeRange, setTimeRange] = useState('6months');

  // Sample data for charts
  const revenueData = [
    { month: 'Ene', revenue: 15000, events: 12, newUsers: 45 },
    { month: 'Feb', revenue: 18000, events: 15, newUsers: 52 },
    { month: 'Mar', revenue: 22000, events: 18, newUsers: 68 },
    { month: 'Abr', revenue: 25000, events: 20, newUsers: 71 },
    { month: 'May', revenue: 28000, events: 22, newUsers: 83 },
    { month: 'Jun', revenue: 32000, events: 25, newUsers: 95 }
  ];

  const categoryData = [
    { name: 'Lugares', value: 35, revenue: 280000 },
    { name: 'Catering', value: 25, revenue: 180000 },
    { name: 'Fotografía', value: 20, revenue: 120000 },
    { name: 'Decoración', value: 15, revenue: 95000 },
    { name: 'Música', value: 5, revenue: 40000 }
  ];

  const userGrowthData = [
    { month: 'Ene', clients: 650, providers: 280 },
    { month: 'Feb', clients: 702, providers: 295 },
    { month: 'Mar', clients: 770, providers: 315 },
    { month: 'Abr', clients: 841, providers: 335 },
    { month: 'May', clients: 924, providers: 360 },
    { month: 'Jun', clients: 1019, providers: 385 }
  ];

  const topProviders = [
    { name: 'Villa Rosa', bookings: 45, revenue: 380000, rating: 4.9 },
    { name: 'Carlos Jiménez Fotografía', bookings: 67, revenue: 120600, rating: 4.8 },
    { name: 'Catering Deluxe', bookings: 52, revenue: 218400, rating: 4.7 },
    { name: 'Flores Mágicas', bookings: 38, revenue: 91200, rating: 4.6 },
    { name: 'Music Events Pro', bookings: 29, revenue: 34800, rating: 4.5 }
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalEvents = revenueData.reduce((sum, item) => sum + item.events, 0);
  const totalNewUsers = revenueData.reduce((sum, item) => sum + item.newUsers, 0);
  const avgRating = topProviders.reduce((sum, provider) => sum + provider.rating, 0) / topProviders.length;

  return (
    <AdminLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analíticas</h1>
            <p className="text-gray-500">
              Análisis detallado del rendimiento de la plataforma.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Último mes</SelectItem>
                <SelectItem value="3months">Últimos 3 meses</SelectItem>
                <SelectItem value="6months">Últimos 6 meses</SelectItem>
                <SelectItem value="1year">Último año</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ingresos Totales</p>
                  <p className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center text-green-600 text-xs mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+15% vs período anterior</span>
                  </div>
                </div>
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Eventos Totales</p>
                  <p className="text-2xl font-bold">{totalEvents}</p>
                  <div className="flex items-center text-green-600 text-xs mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+12% vs período anterior</span>
                  </div>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nuevos Usuarios</p>
                  <p className="text-2xl font-bold">{totalNewUsers}</p>
                  <div className="flex items-center text-red-600 text-xs mt-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    <span>-3% vs período anterior</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Valoración Media</p>
                  <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
                  <div className="flex items-center text-green-600 text-xs mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+0.2 vs período anterior</span>
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue and Events Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Evolución de Ingresos y Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" tickFormatter={(value) => `€${value/1000}k`} />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'revenue' ? `€${value}` : value,
                        name === 'revenue' ? 'Ingresos' : 'Eventos'
                      ]}
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                      name="Ingresos"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="events"
                      stroke="#ff7300"
                      strokeWidth={3}
                      dot={{ fill: '#ff7300', strokeWidth: 2, r: 4 }}
                      name="Eventos"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución por Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}%`, 'Porcentaje']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="clients"
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                    name="Clientes"
                  />
                  <Line
                    type="monotone"
                    dataKey="providers"
                    stroke="#82ca9d"
                    strokeWidth={3}
                    dot={{ fill: '#82ca9d', strokeWidth: 2, r: 6 }}
                    name="Proveedores"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Providers and Category Revenue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Proveedores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProviders.map((provider, index) => (
                  <div key={provider.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{provider.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{provider.bookings} reservas</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{provider.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">€{provider.revenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">ingresos</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingresos por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `€${value/1000}k`} />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip formatter={(value) => [`€${value}`, 'Ingresos']} />
                    <Bar dataKey="revenue" fill="#8884d8" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnaliticas;
