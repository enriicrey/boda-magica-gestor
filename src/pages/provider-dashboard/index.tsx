
import React from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Users, CreditCard, TrendingUp } from 'lucide-react';

// Mock data for the dashboard
const revenueData = [
  { name: 'Ene', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Abr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

const recentClients = [
  { id: 1, name: 'María García', event: 'Boda', date: '2024-08-15', amount: 2500 },
  { id: 2, name: 'Carlos Rodríguez', event: 'Corporativo', date: '2024-06-22', amount: 3800 },
  { id: 3, name: 'Ana Martínez', event: 'Cumpleaños', date: '2024-07-10', amount: 1200 },
];

const upcomingEvents = [
  { id: 1, client: 'Laura Pérez', type: 'Boda', date: '2024-06-15', location: 'Hotel Majestic' },
  { id: 2, client: 'Pedro Sánchez', type: 'Corporativo', date: '2024-06-18', location: 'Oficinas Centrales' },
  { id: 3, client: 'Elena Gómez', type: 'Aniversario', date: '2024-06-22', location: 'Restaurante El Cielo' },
];

const ProviderDashboard = () => {
  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard del Proveedor</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Bienvenido a tu panel de control. Aquí puedes ver un resumen de tu actividad.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ingresos totales</p>
                  <h3 className="text-2xl font-bold mt-1">€24,500</h3>
                  <p className="text-xs text-green-500 mt-1">+12% respecto al mes anterior</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Clientes activos</p>
                  <h3 className="text-2xl font-bold mt-1">42</h3>
                  <p className="text-xs text-green-500 mt-1">+5% respecto al mes anterior</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Eventos programados</p>
                  <h3 className="text-2xl font-bold mt-1">18</h3>
                  <p className="text-xs text-green-500 mt-1">+3 nuevos este mes</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tasa de conversión</p>
                  <h3 className="text-2xl font-bold mt-1">65%</h3>
                  <p className="text-xs text-green-500 mt-1">+8% respecto al mes anterior</p>
                </div>
                <div className="bg-amber-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Ingresos mensuales</CardTitle>
              <CardDescription>Evolución de ingresos durante los últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`€${value}`, 'Ingresos']} />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Próximos eventos</CardTitle>
              <CardDescription>Eventos programados en los próximos días</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {upcomingEvents.map((event) => (
                  <li key={event.id} className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{event.client}</h4>
                      <p className="text-xs text-gray-500">{event.type} - {new Date(event.date).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-400">{event.location}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Clientes recientes</CardTitle>
            <CardDescription>Últimos clientes que han contratado tus servicios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Cliente</th>
                    <th className="px-4 py-3 text-left">Evento</th>
                    <th className="px-4 py-3 text-left">Fecha</th>
                    <th className="px-4 py-3 text-right">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {recentClients.map((client) => (
                    <tr key={client.id} className="border-b">
                      <td className="px-4 py-3">{client.name}</td>
                      <td className="px-4 py-3">{client.event}</td>
                      <td className="px-4 py-3">{new Date(client.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right">€{client.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProviderLayout>
  );
};

export default ProviderDashboard;
