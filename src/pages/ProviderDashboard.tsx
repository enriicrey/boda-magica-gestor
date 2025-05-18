
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Bell, Settings, User, FileText, Package, Home, ArrowUp, ArrowDown, Star, CheckCircle, Clock, Mail } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Sample data for the chart
  const revenueData = [
    { name: 'Ene', revenue: 2400 },
    { name: 'Feb', revenue: 1398 },
    { name: 'Mar', revenue: 9800 },
    { name: 'Abr', revenue: 3908 },
    { name: 'May', revenue: 4800 },
    { name: 'Jun', revenue: 3800 },
    { name: 'Jul', revenue: 4300 },
  ];

  const upcomingEvents = [
    {
      client: 'María y Carlos',
      service: 'Catering para Boda',
      date: '15 de junio, 2025',
      time: '17:00',
      location: 'Villa Rosa, Madrid',
      amount: '€5,500',
      status: 'Confirmado',
    },
    {
      client: 'Laura y David',
      service: 'Catering para Boda',
      date: '28 de junio, 2025',
      time: '18:30',
      location: 'Finca El Olivar, Toledo',
      amount: '€4,800',
      status: 'Pendiente de pago',
    },
  ];
  
  const messages = [
    {
      from: 'María García',
      subject: 'Consulta sobre opciones vegetarianas',
      date: '12 de mayo, 2025',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      from: 'Carlos Martínez',
      subject: 'Cambio de fecha para cita',
      date: '10 de mayo, 2025',
      read: true,
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  const reviews = [
    {
      client: 'Isabel y Pedro',
      date: '28 de abril, 2025',
      rating: 5,
      comment: 'El servicio fue excepcional. La comida estaba deliciosa y el personal muy profesional. ¡Totalmente recomendado!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  // Handler functions for navigation and button clicks
  const handleNavigation = (path) => {
    toast.success(`Navegando a ${path}`);
    // For demonstration purposes, we'll use setTimeout to simulate navigation
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  const handleButtonClick = (action) => {
    toast.success(`Acción: ${action}`);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    toast.info(`Mostrando ${value === 'upcoming' ? 'Eventos Próximos' : value === 'messages' ? 'Mensajes' : 'Reseñas'}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 sticky top-20">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Javier" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-serif font-semibold text-lg">Catering Delicioso</h2>
                    <div className="flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3 w-3 fill-wedding-gold text-wedding-gold" />
                        ))}
                      </div>
                      <span className="text-xs ml-2 text-gray-500">(24 reseñas)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mb-6 py-3 border-y border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-wedding-navy">8</p>
                    <p className="text-xs text-gray-500">Eventos Pendientes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-wedding-navy">€24k</p>
                    <p className="text-xs text-gray-500">Ingresos Totales</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-wedding-navy">92%</p>
                    <p className="text-xs text-gray-500">Completados</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <button 
                    onClick={() => handleNavigation('/provider-dashboard')}
                    className="w-full flex items-center space-x-3 px-3 py-2 bg-wedding-blush/20 text-wedding-navy rounded-md"
                  >
                    <Home size={18} />
                    <span>Panel Principal</span>
                  </button>
                  <button 
                    onClick={() => handleNavigation('/provider-calendar')} 
                    className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <Calendar size={18} />
                    <span>Calendario</span>
                  </button>
                  <button 
                    onClick={() => handleNavigation('/provider-services')}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <Package size={18} />
                    <span>Mis Servicios</span>
                  </button>
                  <button 
                    onClick={() => handleNavigation('/provider-clients')}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <User size={18} />
                    <span>Clientes</span>
                  </button>
                  <button 
                    onClick={() => handleNavigation('/provider-finances')}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <FileText size={18} />
                    <span>Finanzas</span>
                  </button>
                  <button 
                    onClick={() => handleNavigation('/provider-notifications')}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <Bell size={18} />
                    <span>Notificaciones</span>
                  </button>
                  <button 
                    onClick={() => handleNavigation('/provider-settings')}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <Settings size={18} />
                    <span>Ajustes</span>
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Ingresos (este mes)</p>
                      <p className="text-2xl font-semibold">€8,500</p>
                      <div className="flex items-center text-green-600 text-xs mt-1">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span>12% desde el mes pasado</span>
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
                      <p className="text-sm text-gray-500">Nuevas Consultas</p>
                      <p className="text-2xl font-semibold">24</p>
                      <div className="flex items-center text-green-600 text-xs mt-1">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span>8% desde el mes pasado</span>
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
                      <p className="text-sm text-gray-500">Tasa de Conversión</p>
                      <p className="text-2xl font-semibold">65%</p>
                      <div className="flex items-center text-red-600 text-xs mt-1">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        <span>3% desde el mes pasado</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-wedding-navy/10 rounded-md flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-wedding-navy" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Eventos (este mes)</p>
                      <p className="text-2xl font-semibold">6</p>
                      <div className="flex items-center text-green-600 text-xs mt-1">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        <span>2 más que el mes pasado</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-wedding-navy/10 rounded-md flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-wedding-navy" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">Ingresos Mensuales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
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
                          tickFormatter={(value) => `€${value}`} 
                        />
                        <Tooltip 
                          formatter={(value) => [`€${value}`, 'Ingresos']}
                          contentStyle={{ borderRadius: '5px' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#1A365D" 
                          strokeWidth={2}
                          dot={{ stroke: '#1A365D', strokeWidth: 2, r: 4 }}
                          activeDot={{ stroke: '#1A365D', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Tabs Content */}
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="mb-4">
                  <TabsTrigger value="upcoming">Próximos Eventos</TabsTrigger>
                  <TabsTrigger value="messages">Mensajes</TabsTrigger>
                  <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming">
                  <Card>
                    <CardContent className="p-4 lg:p-6">
                      <div className="space-y-4">
                        {upcomingEvents.map((event, index) => (
                          <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-start mb-3 md:mb-0">
                              <div className="bg-wedding-navy/10 rounded-full p-3 mr-4">
                                <Calendar className="h-5 w-5 text-wedding-navy" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{event.client}</h3>
                                <p className="text-gray-600 text-sm">{event.service}</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <span>{event.date}</span>
                                  </div>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{event.time}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                              <div className="text-right">
                                <p className="font-semibold text-wedding-navy">{event.amount}</p>
                                <span className={`text-xs ${event.status === 'Confirmado' ? 'text-green-600' : 'text-amber-600'}`}>
                                  {event.status}
                                </span>
                              </div>
                              <Button 
                                className="btn-primary mt-2 md:mt-0" 
                                size="sm"
                                onClick={() => handleButtonClick(`Ver detalles del evento de ${event.client}`)}
                              >
                                Ver Detalles
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => handleNavigation('/provider-calendar')}
                      >
                        Ver Todos los Eventos
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="messages">
                  <Card>
                    <CardContent className="p-4 lg:p-6">
                      <div className="space-y-3">
                        {messages.map((message, index) => (
                          <button 
                            key={index} 
                            className={`w-full text-left flex items-center p-3 rounded-lg border ${!message.read ? 'bg-wedding-navy/5 border-wedding-navy/10' : ''}`}
                            onClick={() => handleButtonClick(`Leer mensaje de ${message.from}`)}
                          >
                            <Avatar className="h-10 w-10 mr-4">
                              <AvatarImage src={message.avatar} alt={message.from} />
                              <AvatarFallback>{message.from[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <p className={`font-medium ${!message.read ? 'text-wedding-navy' : ''}`}>
                                  {message.from}
                                </p>
                                <span className="text-xs text-gray-500">{message.date}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{message.subject}</p>
                            </div>
                            {!message.read && (
                              <div className="h-2 w-2 bg-wedding-navy rounded-full ml-2"></div>
                            )}
                          </button>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => handleNavigation('/provider-messages')}
                      >
                        Ver Todos los Mensajes
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <Card>
                    <CardContent className="p-4 lg:p-6">
                      <div className="space-y-4">
                        {reviews.map((review, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between mb-3">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-3">
                                  <AvatarImage src={review.avatar} alt={review.client} />
                                  <AvatarFallback>{review.client[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{review.client}</p>
                                  <p className="text-xs text-gray-500">{review.date}</p>
                                </div>
                              </div>
                              <div className="flex">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-wedding-gold text-wedding-gold" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm">{review.comment}</p>
                            <div className="mt-3 flex justify-end">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleButtonClick(`Responder a la reseña de ${review.client}`)}
                              >
                                Responder
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="text-center p-4 border rounded-lg bg-gray-50">
                          <p className="text-gray-500">No hay más reseñas disponibles.</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => handleNavigation('/provider-reviews')}
                      >
                        Ver Todas las Reseñas
                      </Button>
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

export default ProviderDashboard;
