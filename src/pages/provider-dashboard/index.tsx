
import React from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, CreditCard, TrendingUp, Eye, MessageSquare, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

// Mock data actualizada con más realismo
const revenueData = [
  { name: 'Ene', revenue: 4200, events: 8 },
  { name: 'Feb', revenue: 3800, events: 6 },
  { name: 'Mar', revenue: 5600, events: 12 },
  { name: 'Abr', revenue: 4900, events: 9 },
  { name: 'May', revenue: 6800, events: 15 },
  { name: 'Jun', revenue: 7200, events: 14 },
];

const serviceDistribution = [
  { name: 'Bodas', value: 65, count: 42 },
  { name: 'Corporativo', value: 20, count: 15 },
  { name: 'Cumpleaños', value: 10, count: 8 },
  { name: 'Otros', value: 5, count: 3 },
];

const COLORS = ['#f8d7da', '#d1ecf1', '#d4edda', '#fff3cd'];

const upcomingEvents = [
  { 
    id: 1, 
    client: 'Laura Pérez', 
    type: 'Boda', 
    date: '2024-06-15', 
    location: 'Hotel Majestic',
    status: 'confirmed',
    revenue: 3500,
    clientId: 'c1'
  },
  { 
    id: 2, 
    client: 'Pedro Sánchez', 
    type: 'Corporativo', 
    date: '2024-06-18', 
    location: 'Oficinas Centrales',
    status: 'pending',
    revenue: 2800,
    clientId: 'c2'
  },
  { 
    id: 3, 
    client: 'Elena Gómez', 
    type: 'Aniversario', 
    date: '2024-06-22', 
    location: 'Restaurante El Cielo',
    status: 'confirmed',
    revenue: 1200,
    clientId: 'c3'
  },
];

const recentActivity = [
  { id: 1, type: 'message', client: 'María García', text: 'Nuevo mensaje recibido', time: '2 min' },
  { id: 2, type: 'booking', client: 'Carlos Rodríguez', text: 'Nueva reserva confirmada', time: '15 min' },
  { id: 3, type: 'payment', client: 'Ana Martínez', text: 'Pago recibido', time: '1 hora' },
];

const ProviderDashboard = () => {
  const navigate = useNavigate();

  const handleViewClientDetails = (clientId: string) => {
    navigate(`/provider-clients`);
  };

  const handleViewAllEvents = () => {
    navigate('/provider-calendar');
  };

  const handleViewMessages = () => {
    navigate('/provider-messages');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="h-4 w-4 text-blue-600" />;
      case 'booking': return <Calendar className="h-4 w-4 text-green-600" />;
      case 'payment': return <CreditCard className="h-4 w-4 text-purple-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6 p-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Bienvenido Diana, aquí tienes un resumen completo de tu actividad profesional
          </p>
        </div>

        {/* KPI Cards mejorados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-700">Ingresos del mes</p>
                  <h3 className="text-2xl font-bold text-green-800">€7,200</h3>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +18% vs mes anterior
                  </p>
                </div>
                <div className="bg-green-200 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-700">Eventos este mes</p>
                  <h3 className="text-2xl font-bold text-blue-800">14</h3>
                  <p className="text-xs text-blue-600 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    3 próximos esta semana
                  </p>
                </div>
                <div className="bg-blue-200 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-purple-700">Clientes activos</p>
                  <h3 className="text-2xl font-bold text-purple-800">68</h3>
                  <p className="text-xs text-purple-600 flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    +12 nuevos este mes
                  </p>
                </div>
                <div className="bg-purple-200 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-amber-700">Satisfacción</p>
                  <h3 className="text-2xl font-bold text-amber-800">4.9</h3>
                  <p className="text-xs text-amber-600 flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Basado en 47 reseñas
                  </p>
                </div>
                <div className="bg-amber-200 p-3 rounded-full">
                  <Star className="h-6 w-6 text-amber-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos y próximos eventos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Evolución de ingresos</CardTitle>
              <CardDescription>Ingresos y número de eventos por mes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'revenue' ? `€${value}` : value, 
                      name === 'revenue' ? 'Ingresos' : 'Eventos'
                    ]}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar dataKey="revenue" fill="#8b5a83" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center justify-between">
                Próximos eventos
                <Button variant="outline" size="sm" onClick={handleViewAllEvents}>
                  Ver todos
                </Button>
              </CardTitle>
              <CardDescription>Eventos confirmados para las próximas semanas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleViewClientDetails(event.clientId)}
                >
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <Calendar className="h-4 w-4 text-wedding-sage" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{event.client}</h4>
                    <p className="text-xs text-gray-600">{event.type} • {new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500 truncate">{event.location}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge className={getStatusColor(event.status)}>
                      {event.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                    </Badge>
                    <span className="text-xs font-medium text-gray-700">€{event.revenue}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Distribución de servicios y actividad reciente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Distribución de servicios</CardTitle>
              <CardDescription>Tipos de eventos más solicitados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={serviceDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {serviceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {serviceDistribution.map((item, index) => (
                  <div key={item.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <div className="text-sm">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500">{item.count} eventos</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-between">
                Actividad reciente
                <Button variant="outline" size="sm" onClick={handleViewMessages}>
                  Ver mensajes
                </Button>
              </CardTitle>
              <CardDescription>Últimas interacciones con clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.client}</p>
                    <p className="text-xs text-gray-600">{activity.text}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full" onClick={handleViewMessages}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ver todas las conversaciones
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderDashboard;
