
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, CreditCard, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for the dashboard
const userStats = [
  { name: 'Ene', clientes: 40, proveedores: 25 },
  { name: 'Feb', clientes: 45, proveedores: 28 },
  { name: 'Mar', clientes: 55, proveedores: 30 },
  { name: 'Abr', clientes: 60, proveedores: 35 },
  { name: 'May', clientes: 75, proveedores: 45 },
  { name: 'Jun', clientes: 85, proveedores: 52 },
];

const pieData = [
  { name: 'Bodas', value: 65 },
  { name: 'Corporativos', value: 15 },
  { name: 'Cumpleaños', value: 12 },
  { name: 'Otros', value: 8 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const recentUsers = [
  { id: 1, name: 'Laura Martínez', type: 'Cliente', date: '2024-06-10', status: 'Activo' },
  { id: 2, name: 'Carlos Fotografía', type: 'Proveedor', date: '2024-06-09', status: 'Activo' },
  { id: 3, name: 'Sara Gómez', type: 'Cliente', date: '2024-06-08', status: 'Pendiente' },
  { id: 4, name: 'Catering Deluxe', type: 'Proveedor', date: '2024-06-07', status: 'Activo' },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Bienvenido al panel de administración. Aquí puede gestionar todos los aspectos de la plataforma.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Clientes totales</p>
                  <h3 className="text-2xl font-bold mt-1">865</h3>
                  <p className="text-xs text-green-500 mt-1">+24 este mes</p>
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
                  <p className="text-sm font-medium text-gray-500">Proveedores</p>
                  <h3 className="text-2xl font-bold mt-1">192</h3>
                  <p className="text-xs text-green-500 mt-1">+12 este mes</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Eventos activos</p>
                  <h3 className="text-2xl font-bold mt-1">324</h3>
                  <p className="text-xs text-green-500 mt-1">+15 esta semana</p>
                </div>
                <div className="bg-amber-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ingresos platform</p>
                  <h3 className="text-2xl font-bold mt-1">€32,450</h3>
                  <p className="text-xs text-green-500 mt-1">+8% respecto al mes anterior</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Crecimiento de usuarios</CardTitle>
              <CardDescription>Evolución de clientes y proveedores durante los últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="clientes" fill="#8884d8" name="Clientes" />
                  <Bar dataKey="proveedores" fill="#82ca9d" name="Proveedores" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Distribución de eventos</CardTitle>
              <CardDescription>Por tipo de evento</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Usuarios recientes</CardTitle>
              <CardDescription>Últimos registros en la plataforma</CardDescription>
            </div>
            <Button size="sm" className="mt-2 sm:mt-0">Ver todos</Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3 text-left">Tipo</th>
                    <th className="px-4 py-3 text-left">Fecha registro</th>
                    <th className="px-4 py-3 text-left">Estado</th>
                    <th className="px-4 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">
                        <span className={
                          user.type === 'Cliente' 
                            ? 'bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'
                            : 'bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded'
                        }>
                          {user.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">{new Date(user.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <span className={
                          user.status === 'Activo' 
                            ? 'bg-green-100 text-green-800 text-xs px-2 py-1 rounded'
                            : 'bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded'
                        }>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm">Detalles</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
