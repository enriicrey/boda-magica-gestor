
import React from 'react';
import { toast } from "sonner";
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Package, Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Services = () => {
  // Mock user data
  const userData = {
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    weddingDate: "15 de septiembre, 2025",
    avatarFallback: "MG"
  };
  
  // Calculate progress
  const progress = 38;
  
  // Mock services
  const bookedServices = [
    {
      id: "1",
      title: "Villa Rosa - Espacio para Ceremonia y Cóctel",
      provider: "Villa Rosa",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      status: "Confirmado",
      date: "15 de septiembre, 2025",
      paymentStatus: "Depósito pagado",
      price: "€6,500",
      category: "Venue"
    },
    {
      id: "2",
      title: "Fotografía Premium",
      provider: "Carlos Jiménez",
      image: "https://images.unsplash.com/photo-1553101872-64e48bfbf309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      status: "Confirmado",
      date: "15 de septiembre, 2025",
      paymentStatus: "Depósito pagado",
      price: "€1,800",
      category: "Fotografía"
    }
  ];
  
  // Mock pending services
  const pendingServices = [
    {
      id: "3",
      title: "Decoración Floral Elegante",
      provider: "Flores Mágicas",
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      status: "Pendiente",
      date: "15 de septiembre, 2025",
      price: "€800",
      category: "Decoración"
    }
  ];

  const handleViewDetails = (id: string) => {
    toast.success("Viendo detalles del servicio");
  };

  const handleContactProvider = (id: string) => {
    toast.success("Contactando con el proveedor");
  };

  const handleConfirmService = (id: string) => {
    toast.success("Servicio confirmado");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <ClientSidebar 
              userName={userData.name}
              userAvatar={userData.avatar}
              weddingDate={userData.weddingDate}
              progress={progress}
              avatarFallback={userData.avatarFallback}
            />
            
            {/* Main Content */}
            <div className="lg:w-3/4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl font-semibold flex items-center">
                    <Package className="text-wedding-sage mr-2 h-5 w-5" />
                    Mis Servicios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="booked" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="booked">Servicios Confirmados</TabsTrigger>
                      <TabsTrigger value="pending">Pendientes de Confirmar</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="booked">
                      <div className="space-y-6">
                        {bookedServices.map((service) => (
                          <div key={service.id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden hover:shadow-md transition-all">
                            <div className="w-full md:w-1/3">
                              <img 
                                src={service.image}
                                alt={service.title}
                                className="w-full h-48 md:h-full object-cover"
                              />
                            </div>
                            <div className="p-4 w-full md:w-2/3 flex flex-col">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-serif text-lg font-medium mb-1">{service.title}</h3>
                                  <p className="text-gray-500 text-sm">por {service.provider}</p>
                                </div>
                                <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-md">
                                  <Check className="h-3 w-3 mr-1" />
                                  <span className="text-xs font-medium">{service.status}</span>
                                </div>
                              </div>
                              
                              <div className="mt-3 space-y-2">
                                <div className="flex items-center text-sm">
                                  <Calendar className="h-4 w-4 mr-2 text-wedding-sage" />
                                  <span>{service.date}</span>
                                </div>
                                <p className="text-sm"><span className="font-medium">Estado de pago:</span> {service.paymentStatus}</p>
                                <p className="text-sm"><span className="font-medium">Precio:</span> {service.price}</p>
                              </div>
                              
                              <div className="flex mt-auto pt-4 space-x-2 justify-end">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleContactProvider(service.id)}
                                >
                                  Contactar Proveedor
                                </Button>
                                <Button 
                                  className="bg-wedding-sage hover:bg-wedding-sage/90 text-white"
                                  size="sm"
                                  onClick={() => handleViewDetails(service.id)}
                                >
                                  Ver Detalles
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="pending">
                      <div className="space-y-6">
                        {pendingServices.map((service) => (
                          <div key={service.id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden hover:shadow-md transition-all">
                            <div className="w-full md:w-1/3">
                              <img 
                                src={service.image}
                                alt={service.title}
                                className="w-full h-48 md:h-full object-cover"
                              />
                            </div>
                            <div className="p-4 w-full md:w-2/3 flex flex-col">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-serif text-lg font-medium mb-1">{service.title}</h3>
                                  <p className="text-gray-500 text-sm">por {service.provider}</p>
                                </div>
                                <div className="flex items-center bg-amber-100 text-amber-700 px-2 py-1 rounded-md">
                                  <span className="text-xs font-medium">{service.status}</span>
                                </div>
                              </div>
                              
                              <div className="mt-3 space-y-2">
                                <div className="flex items-center text-sm">
                                  <Calendar className="h-4 w-4 mr-2 text-wedding-sage" />
                                  <span>{service.date}</span>
                                </div>
                                <p className="text-sm"><span className="font-medium">Precio:</span> {service.price}</p>
                              </div>
                              
                              <div className="flex mt-auto pt-4 space-x-2 justify-end">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleViewDetails(service.id)}
                                >
                                  Ver Detalles
                                </Button>
                                <Button 
                                  className="bg-wedding-sage hover:bg-wedding-sage/90 text-white"
                                  size="sm"
                                  onClick={() => handleConfirmService(service.id)}
                                >
                                  Confirmar Servicio
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
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

export default Services;
