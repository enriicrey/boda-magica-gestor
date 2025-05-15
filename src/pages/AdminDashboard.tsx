
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Settings, User, FileText, Package, Home, Search, ArrowUp, ArrowDown, Bell, Mail, Heart, CheckCircle, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for charts
  const categoryData = [
    { name: 'Lugares', value: 35 },
    { name: 'Catering', value: 25 },
    { name: 'Fotografía', value: 20 },
    { name: 'Música', value: 15 },
    { name: 'Decoración', value: 5 },
  ];
  
  const revenueData = [
    { name: 'Ene', revenue: 18000 },
    { name: 'Feb', revenue: 15000 },
    { name: 'Mar', revenue: 25000 },
    { name: 'Abr', revenue: 22000 },
    { name: 'May', revenue: 30000 },
    { name: 'Jun', revenue: 27000 },
    { name: 'Jul', revenue: 32000 },
  ];

  const COLORS = ['#1A365D', '#F8D7DA', '#D4AF37', '#B2AC88', '#708090'];
  
  const pendingVendors = [
    {
      id: '1',
      name: 'Flores Encanto',
      category: 'Decoración',
      contact: 'Ana López',
      email: 'ana@floresencanto.com',
      phone: '+34 612 345 678',
      submittedDate: '12 de mayo, 2025',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: '2',
      name: 'Dulce Momento',
      category: 'Pastelería',
      contact: 'Carlos Ruiz',
      email: 'carlos@dulcemomento.com',
      phone: '+34 623 456 789',
      submittedDate: '10 de mayo, 2025',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];
  
  const recentBookings = [
    {
      id: '1',
      client: 'María y Carlos',
      clientEmail: 'maria.carlos@gmail.com',
      vendor: 'Villa Rosa',
      service: 'Lugar para Boda',
      date: '15 de septiembre, 2025',
      amount: '€6,500',
      status: 'Confirmado',
    },
    {
      id: '2',
      client: 'Laura y David',
      clientEmail: 'laura.david@gmail.com',
      vendor: 'Carlos Jiménez Fotografía',
      service: 'Fotografía de Boda',
      date: '28 de agosto, 2025',
      amount: '€1,800',
      status: 'Pendiente',
    },
  ];
  
  const topVendors = [
    {
      id: '1',
      name: 'Villa Rosa',
      category: 'Lugar',
      bookings: 24,
      revenue: '€156,000',
      rating: 4.9,
    },
    {
      id: '2',
      name: 'Catering Delicioso',
      category: 'Catering',
      bookings: 18,
      revenue: '€96,000',
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Carlos Jiménez Fotografía',
      category: 'Fotografía',
      bookings: 32,
      revenue: '€76,800',
      rating: 4.9,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 sticky top-20">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-serif font-semibold text-lg">Administración</h2>
                    <p className="text-gray-500 text-sm">Panel de Control</p>
                  </div>
                </div>
                
                <div className="flex justify-between mb-6 py-3 border-y border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-wedding-navy">124</p>
                    <p className="text-xs text-gray-500">Clientes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-wedding-navy">56</p>
                    <p className="text-xs text-gray-500">Proveedores</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-wedding-navy">85</p>
                    <p className="text-xs text-gray-500">Bodas</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <Link to="/admin-dashboard" className="flex items-center space-x-3 px-3 py-2 bg-wedding-blush/20 text-wedding-navy rounded-md">
                    <Home size={18} />
                    <span>Panel Principal</span>
                  </Link>
                  <Link to="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                    <User size={18} />
                    <span>Clientes</span>
                  </Link>
                  <Link to="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                    <Package size={18} />
                    <span>Proveedores</span>
                  </Link>
                  <Link to="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                    <FileText size={18} />
                    <span>Servicios</span>
                  </Link>
                  <Link to="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                    <Calendar size={18} />
                    <span>Eventos</span>
                  </Link>
                  <Link to="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                    <Bell size={18} />
                    <span>Notificaciones</span>
                  </Link>
                  <Link to="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                    <Settings size={18} />
                    <span>Configuración</span>
                  </Link>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4 space-y-6">
              {/* Search and Welcome */}
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-serif font-semibold text-wedding-navy">Panel de Administración</h1>
                  <p className="text-gray-600">Bienvenido de nuevo, gestiona todos los aspectos de tu plataforma de bodas.</p>
                </div>
                <div className="w-full md:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar clientes, proveedores..."
                      className="pl-10 w-full md:w-80"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Ingresos Mensuales</p>
                      <p className="text-2xl font-semibold">€32,500</p>
                      <div className="flex items-center text-green-600 text-xs mt-1">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span>8.3% desde el mes pasado</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-wedding-navy/10 rounded-md flex items-center justify-center">
                      <FileText className="h-6 w-6 text-wedding-navy" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Nuevos Clientes</p>
                      <p className="text-2xl font-semibold">18</p>
                      <div className="flex items-center text-red-600 text-xs mt-1">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        <span>3.2% desde el mes pasado</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-wedding-navy/10 rounded-md flex items-center justify-center">
                      <User className="h-6 w-6 text-wedding-navy" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Mensajes</p>
                      <p className="text-2xl font-semibold">45</p>
                      <div className="flex items-center text-green-600 text-xs mt-1">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span>12% desde el mes pasado</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-wedding-navy/10 rounded-md flex items-center justify-center">
                      <Mail className="h-6 w-6 text-wedding-navy" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Reservas</p>
                      <p className="text-2xl font-semibold">28</p>
                      <div className="flex items-center text-green-600 text-xs mt-1">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span>4.6% desde el mes pasado</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-wedding-navy/10 rounded-md flex items-center justify-center">
                      <Heart className="h-6 w-6 text-wedding-navy" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">Ingresos Mensuales</CardTitle>
                    <CardDescription>Evolución de los ingresos durante los últimos 7 meses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={revenueData}
                          margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                          <YAxis 
                            stroke="#9CA3AF" 
                            tick={{ fontSize: 12 }} 
                            tickFormatter={(value) => `€${value/1000}k`} 
                          />
                          <Tooltip 
                            formatter={(value) => [`€${value}`, 'Ingresos']}
                            contentStyle={{ borderRadius: '5px' }}
                          />
                          <Bar dataKey="revenue" fill="#1A365D" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">Distribución por Categorías</CardTitle>
                    <CardDescription>Porcentaje de servicios por categoría</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="45%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={3}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend 
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                          />
                          <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Tabs Content */}
              <Tabs defaultValue="pending">
                <TabsList className="mb-4">
                  <TabsTrigger value="pending">Proveedores Pendientes</TabsTrigger>
                  <TabsTrigger value="bookings">Reservas Recientes</TabsTrigger>
                  <TabsTrigger value="top">Top Proveedores</TabsTrigger>
                </TabsList>
                
                <TabsContent value="pending">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-serif">Proveedores Pendientes de Aprobación</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {pendingVendors.map((vendor) => (
                          <div key={vendor.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex items-start mb-4 md:mb-0">
                              <Avatar className="h-12 w-12 mr-4">
                                <AvatarImage src={vendor.avatar} alt={vendor.name} />
                                <AvatarFallback>{vendor.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{vendor.name}</h3>
                                <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300 mt-1">
                                  {vendor.category}
                                </Badge>
                                <div className="mt-2 text-sm text-gray-600">
                                  <p>{vendor.contact}</p>
                                  <p>{vendor.email}</p>
                                  <p>{vendor.phone}</p>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Enviado el {vendor.submittedDate}
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50">
                                <X className="h-4 w-4 mr-1" />
                                Rechazar
                              </Button>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Aprobar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="bookings">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-serif">Reservas Recientes</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left bg-gray-50 border-b">
                              <th className="p-3 font-medium">Cliente</th>
                              <th className="p-3 font-medium">Proveedor</th>
                              <th className="p-3 font-medium">Servicio</th>
                              <th className="p-3 font-medium">Fecha</th>
                              <th className="p-3 font-medium">Cantidad</th>
                              <th className="p-3 font-medium">Estado</th>
                              <th className="p-3 font-medium">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentBookings.map((booking) => (
                              <tr key={booking.id} className="border-b">
                                <td className="p-3">
                                  <div>
                                    <p className="font-medium">{booking.client}</p>
                                    <p className="text-xs text-gray-500">{booking.clientEmail}</p>
                                  </div>
                                </td>
                                <td className="p-3">{booking.vendor}</td>
                                <td className="p-3">{booking.service}</td>
                                <td className="p-3">{booking.date}</td>
                                <td className="p-3 font-medium">{booking.amount}</td>
                                <td className="p-3">
                                  <Badge className={`${booking.status === 'Confirmado' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                    {booking.status}
                                  </Badge>
                                </td>
                                <td className="p-3">
                                  <Button size="sm" variant="outline">Ver</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="top">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-serif">Top Proveedores</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left bg-gray-50 border-b">
                              <th className="p-3 font-medium">Nombre</th>
                              <th className="p-3 font-medium">Categoría</th>
                              <th className="p-3 font-medium">Reservas</th>
                              <th className="p-3 font-medium">Ingresos</th>
                              <th className="p-3 font-medium">Valoración</th>
                              <th className="p-3 font-medium">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {topVendors.map((vendor, index) => (
                              <tr key={vendor.id} className={`border-b ${index === 0 ? 'bg-wedding-gold/5' : ''}`}>
                                <td className="p-3 font-medium">{vendor.name}</td>
                                <td className="p-3">{vendor.category}</td>
                                <td className="p-3">{vendor.bookings}</td>
                                <td className="p-3 font-medium">{vendor.revenue}</td>
                                <td className="p-3">
                                  <div className="flex items-center">
                                    <span className="mr-1">{vendor.rating}</span>
                                    <Star className="h-4 w-4 fill-wedding-gold text-wedding-gold" />
                                  </div>
                                </td>
                                <td className="p-3">
                                  <Button size="sm" variant="outline">Perfil</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
