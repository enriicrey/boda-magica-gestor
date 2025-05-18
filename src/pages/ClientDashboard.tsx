
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Heart, MapPin, Clock, Check, Settings, Bell, User, FileText, Package, Home, Camera } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

const ClientDashboard = () => {
  const upcomingEvents = [
    {
      title: 'Degustación de Menú',
      date: '15 de junio, 2025',
      time: '12:00 PM',
      location: 'Catering El Jardín',
      address: 'Calle Serrano 45, Madrid',
    },
    {
      title: 'Prueba de Vestido',
      date: '22 de junio, 2025',
      time: '10:00 AM',
      location: 'Boutique Eleganza',
      address: 'Gran Vía 28, Madrid',
    },
    {
      title: 'Visita a Villa Rosa',
      date: '5 de julio, 2025',
      time: '16:30 PM', 
      location: 'Villa Rosa',
      address: 'Carretera de El Escorial km 5, Madrid',
    }
  ];
  
  const weddingDate = new Date(2025, 8, 15); // September 15, 2025
  const today = new Date();
  const timeUntilWedding = weddingDate.getTime() - today.getTime();
  const daysUntilWedding = Math.ceil(timeUntilWedding / (1000 * 60 * 60 * 24));
  
  const tasks = [
    { title: 'Reservar lugar para la ceremonia', completed: true },
    { title: 'Elegir el catering', completed: true },
    { title: 'Contratar fotógrafo', completed: true },
    { title: 'Enviar invitaciones', completed: false },
    { title: 'Elegir música para la ceremonia', completed: false },
    { title: 'Planificar luna de miel', completed: false },
    { title: 'Elegir anillos', completed: false },
    { title: 'Confirmar lista de invitados', completed: false },
  ];
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  const recommendedServices = [
    {
      id: '1',
      title: 'Decoración Floral Elegante',
      provider: 'Flores Mágicas',
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '€800',
      priceUnit: 'paquete',
      category: 'Decoración',
      isPopular: true,
    },
    {
      id: '2',
      title: 'DJ y Animación',
      provider: 'Melodía Events',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '€1,200',
      priceUnit: 'evento',
      category: 'Música',
      availableDate: '15/09/2025',
    },
    {
      id: '3',
      title: 'Fotografía Premium',
      provider: 'Carlos Jiménez',
      image: 'https://images.unsplash.com/photo-1553101872-64e48bfbf309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '€1,800',
      priceUnit: 'sesión',
      category: 'Fotografía',
      availableDate: '15/09/2025',
      isPopular: true,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Mini header with only logo */}
      <header className="bg-white shadow-sm py-3 px-6">
        <div className="container-custom">
          <Link to="/" className="flex items-center">
            <div className="font-serif text-xl font-bold text-wedding-sage">Wedding<span className="text-wedding-gold">Plan</span></div>
          </Link>
        </div>
      </header>
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 sticky top-20">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="María" />
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-serif font-semibold text-lg">María García</h2>
                    <p className="text-gray-500 text-sm">Boda: 15 de septiembre, 2025</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Progreso de planificación</p>
                  <Progress value={progress} className="h-2 mb-2" />
                  <p className="text-xs text-right text-gray-500">{progress}% completado</p>
                </div>
                
                <nav className="space-y-1">
                  <Link to="/client-dashboard" className="flex items-center space-x-3 px-3 py-2 bg-wedding-blush/20 text-wedding-sage rounded-md">
                    <Home size={18} />
                    <span>Panel Principal</span>
                  </Link>
                  <Link to="/calendar" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                    <Calendar size={18} />
                    <span>Calendario</span>
                  </Link>
                  <Link to="/favorites" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                    <Heart size={18} />
                    <span>Favoritos</span>
                  </Link>
                  <Link to="/services" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                    <Package size={18} />
                    <span>Mis Servicios</span>
                  </Link>
                  <Link to="/budget" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                    <FileText size={18} />
                    <span>Presupuesto</span>
                  </Link>
                  <Link to="/guests" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                    <User size={18} />
                    <span>Invitados</span>
                  </Link>
                  <Link to="/notifications" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                    <Bell size={18} />
                    <span>Notificaciones</span>
                  </Link>
                  <Link to="/settings" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                    <Settings size={18} />
                    <span>Ajustes</span>
                  </Link>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4 space-y-6">
              <Card className="border-wedding-sage/10">
                <CardHeader className="bg-wedding-sage/5">
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-serif text-2xl text-wedding-sage">
                      ¡Hola, María!
                    </CardTitle>
                    <div className="bg-wedding-sage text-white px-4 py-2 rounded-md flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-medium">{daysUntilWedding} días</span>
                      <span className="ml-2 opacity-80 text-sm">para tu boda</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-6">Continúa trabajando en los preparativos para tu gran día. Aquí tienes un resumen de tus próximos eventos y tareas.</p>
                  
                  <Tabs defaultValue="events" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="events">Próximos Eventos</TabsTrigger>
                      <TabsTrigger value="tasks">Tareas Pendientes</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="events">
                      <div className="space-y-4">
                        {upcomingEvents.map((event, index) => (
                          <div key={index} className="flex border rounded-md p-4 hover:bg-gray-50">
                            <div className="mr-4 bg-wedding-blush/20 h-14 w-14 rounded-full flex items-center justify-center">
                              <Calendar className="h-6 w-6 text-wedding-sage" />
                            </div>
                            <div>
                              <h3 className="font-medium text-lg">{event.title}</h3>
                              <div className="flex items-center text-gray-500 text-sm mt-1">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{event.date} • {event.time}</span>
                              </div>
                              <div className="flex items-center text-gray-500 text-sm mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{event.location} ({event.address})</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        <Link to="/calendar">
                          <Button variant="outline" className="w-full mt-2">Ver Todos los Eventos</Button>
                        </Link>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tasks">
                      <div className="space-y-2">
                        {tasks.map((task, index) => (
                          <div key={index} className={`flex items-center p-3 rounded-md ${task.completed ? 'bg-gray-50' : 'bg-white'}`}>
                            <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${task.completed ? 'bg-wedding-sage border-wedding-sage' : 'border-gray-300'}`}>
                              {task.completed && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <span className={task.completed ? 'line-through text-gray-500' : ''}>
                              {task.title}
                            </span>
                          </div>
                        ))}
                        <Link to="/tasks">
                          <Button variant="outline" className="w-full mt-4">Administrar Tareas</Button>
                        </Link>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-serif text-2xl font-semibold">Servicios Recomendados</h2>
                  <Link to="/services">
                    <Button variant="link" className="text-wedding-sage">Ver Todos</Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedServices.map((service) => (
                    <ServiceCard key={service.id} {...service} />
                  ))}
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">Próximos Pagos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-wedding-sage/10 rounded-md flex items-center justify-center mr-4">
                          <Home className="h-5 w-5 text-wedding-sage" />
                        </div>
                        <div>
                          <p className="font-medium">Villa Rosa - Segundo Pago</p>
                          <p className="text-sm text-gray-500">Vencimiento: 1 de julio, 2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">€3,000</p>
                        <Button size="sm" className="bg-wedding-sage hover:bg-wedding-sage/90 text-white mt-1">Pagar</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-wedding-sage/10 rounded-md flex items-center justify-center mr-4">
                          <Camera className="h-5 w-5 text-wedding-sage" />
                        </div>
                        <div>
                          <p className="font-medium">Carlos Jiménez Fotografía</p>
                          <p className="text-sm text-gray-500">Vencimiento: 15 de julio, 2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">€800</p>
                        <Button size="sm" className="bg-wedding-sage hover:bg-wedding-sage/90 text-white mt-1">Pagar</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClientDashboard;
