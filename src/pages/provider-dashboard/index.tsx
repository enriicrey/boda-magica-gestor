
import React from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Calendar, MessageSquare, Star, Users, Clock, CreditCard, BarChart2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

const ProviderDashboard = () => {
  const { toast } = useToast();

  const mockEvents = [
    { 
      id: '1',
      title: 'Boda Carlos y Ana',
      date: '2024-06-15',
      time: '16:00',
      location: 'Finca El Olivar',
      status: 'próximo'
    },
    { 
      id: '2',
      title: 'Cumpleaños María',
      date: '2024-05-28',
      time: '18:30',
      location: 'Restaurante La Plaza',
      status: 'próximo'
    },
    { 
      id: '3',
      title: 'Evento Corporativo Tech',
      date: '2024-06-02',
      time: '10:00',
      location: 'Centro de Convenciones',
      status: 'próximo'
    }
  ];

  const mockMessages = [
    {
      id: '1',
      sender: 'Carlos Mendoza',
      avatar: '/placeholder.svg',
      message: 'Hola, ¿podemos hablar sobre los detalles de la boda?',
      time: '10:30',
      unread: true
    },
    {
      id: '2',
      sender: 'Ana García',
      avatar: '/placeholder.svg',
      message: 'Gracias por toda la información',
      time: '09:45',
      unread: false
    },
    {
      id: '3',
      sender: 'Miguel Fernández',
      avatar: '/placeholder.svg',
      message: '¿Podrías enviarme el presupuesto actualizado?',
      time: 'Ayer',
      unread: true
    }
  ];

  const mockStats = {
    pendingEvents: 12,
    newMessages: 5,
    pendingReviews: 3,
    monthlyRevenue: 8750,
    yearlyGrowth: 38
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Bienvenido de nuevo, Diana. Aquí tienes un resumen de tu actividad.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Eventos pendientes
              </CardTitle>
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.pendingEvents}</div>
              <Link to="/provider-calendar">
                <p className="text-xs text-blue-500 flex items-center mt-1 hover:underline">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  Ver calendario
                </p>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nuevos mensajes
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.newMessages}</div>
              <Link to="/provider-messages">
                <p className="text-xs text-blue-500 flex items-center mt-1 hover:underline">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  Ver mensajes
                </p>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reseñas pendientes
              </CardTitle>
              <Star className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.pendingReviews}</div>
              <Link to="/provider-reviews">
                <p className="text-xs text-blue-500 flex items-center mt-1 hover:underline">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  Ver reseñas
                </p>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ingresos este mes
              </CardTitle>
              <CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.monthlyRevenue.toLocaleString('es-ES', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </div>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +{mockStats.yearlyGrowth}% vs. año anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Upcoming Events */}
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Próximos eventos</CardTitle>
                  <CardDescription>
                    Los eventos más cercanos en tu agenda
                  </CardDescription>
                </div>
                <Link to="/provider-calendar">
                  <Button variant="outline" size="sm">
                    Ver todos
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {mockEvents.map((event) => (
                  <div key={event.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge className="bg-blue-100 text-blue-800">{event.status}</Badge>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString()} a las {event.time}
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                          width="16" height="16" viewBox="0 0 24 24" 
                          fill="none" stroke="currentColor" strokeWidth="2" 
                          strokeLinecap="round" strokeLinejoin="round" 
                          className="h-4 w-4 mr-2">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 py-2">
              <div className="flex justify-center items-center w-full">
                <Button variant="ghost" className="text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Ir al calendario
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Recent Messages */}
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Mensajes recientes</CardTitle>
                  <CardDescription>
                    Últimas comunicaciones con clientes
                  </CardDescription>
                </div>
                <Link to="/provider-messages">
                  <Button variant="outline" size="sm">
                    Ver todos
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {mockMessages.map((message) => (
                  <div key={message.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback>{message.sender.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-medium">{message.sender}</h3>
                          <div className="flex items-center">
                            {message.unread && (
                              <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                            )}
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{message.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 py-2">
              <div className="flex justify-center items-center w-full">
                <Button variant="ghost" className="text-sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Ver todos los mensajes
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Acciones rápidas</CardTitle>
              <CardDescription>
                Acciones frecuentes para gestionar tu negocio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/provider-clients">
                  <Button variant="outline" className="h-20 w-full flex flex-col items-center justify-center">
                    <Users className="h-6 w-6 mb-1" />
                    <span>Gestionar clientes</span>
                  </Button>
                </Link>
                <Link to="/provider-services">
                  <Button variant="outline" className="h-20 w-full flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      width="24" height="24" viewBox="0 0 24 24" 
                      fill="none" stroke="currentColor" strokeWidth="2" 
                      strokeLinecap="round" strokeLinejoin="round" 
                      className="h-6 w-6 mb-1">
                      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
                      <path d="M16 2v4" />
                      <path d="M8 2v4" />
                      <path d="M3 10h5" />
                      <path d="M17.5 17.5 16 16.25V14" />
                      <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
                    </svg>
                    <span>Gestionar servicios</span>
                  </Button>
                </Link>
                <Link to="/provider-invitations">
                  <Button variant="outline" className="h-20 w-full flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      width="24" height="24" viewBox="0 0 24 24" 
                      fill="none" stroke="currentColor" strokeWidth="2" 
                      strokeLinecap="round" strokeLinejoin="round" 
                      className="h-6 w-6 mb-1">
                      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                      <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                    </svg>
                    <span>Crear invitación</span>
                  </Button>
                </Link>
                <Link to="/provider-finances">
                  <Button variant="outline" className="h-20 w-full flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      width="24" height="24" viewBox="0 0 24 24" 
                      fill="none" stroke="currentColor" strokeWidth="2" 
                      strokeLinecap="round" strokeLinejoin="round" 
                      className="h-6 w-6 mb-1">
                      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-7h-3z" />
                      <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                      <path d="M16 20h6" />
                    </svg>
                    <span>Crear factura</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Rendimiento</CardTitle>
              <CardDescription>
                Estadísticas clave de tu negocio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Tasa de respuesta</p>
                      <p className="text-sm text-gray-500">Tiempo medio: 2.5 horas</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">98%</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      <Star className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">Valoración media</p>
                      <p className="text-sm text-gray-500">Basado en 42 reseñas</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">4.8/5</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Clientes nuevos</p>
                      <p className="text-sm text-gray-500">Este mes</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">+8</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link to="/provider-analytics" className="w-full">
                <Button variant="outline" className="w-full">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Ver analíticas completas
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderDashboard;
