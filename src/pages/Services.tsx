import React, { useState } from 'react';
import { toast } from "sonner";
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Package, Calendar, Check, Heart, MessageSquare, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Define interfaces for our data
interface Vendor {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  location: string;
  price: string;
  status?: 'favorite' | 'pending' | 'confirmed';
  lastMessage?: string;
  unreadMessages?: number;
}

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
  
  // State to store simulated data
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: "1",
      name: "Hacienda Los Robles",
      category: "Lugar",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.8,
      location: "Madrid",
      price: "€4,500",
      status: 'favorite'
    },
    {
      id: "2",
      name: "Flores Mágicas",
      category: "Decoración",
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.9,
      location: "Barcelona",
      price: "€800",
      status: 'pending',
      lastMessage: "Podemos hacer arreglos personalizados",
      unreadMessages: 2
    },
    {
      id: "3",
      name: "Carlos Jiménez Fotografía",
      category: "Fotografía",
      image: "https://images.unsplash.com/photo-1553101872-64e48bfbf309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.7,
      location: "Valencia",
      price: "€1,800",
      status: 'confirmed',
      lastMessage: "Confirmo disponibilidad para la fecha"
    },
    {
      id: "4",
      name: "Gastronomía Selección",
      category: "Catering",
      image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.6,
      location: "Sevilla",
      price: "€95",
      status: 'favorite'
    },
    {
      id: "5",
      name: "DJ Events",
      category: "Música",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.8,
      location: "Madrid",
      price: "€950",
      status: 'pending',
      lastMessage: "Te envío las opciones de música"
    },
    {
      id: "6",
      name: "Vehículos Clásicos",
      category: "Transporte",
      image: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.8,
      location: "Barcelona",
      price: "€500",
      status: 'confirmed',
      lastMessage: "Nos vemos el gran día"
    },
    {
      id: "7",
      name: "Pastelería Dulce Momento",
      category: "Catering",
      image: "https://images.unsplash.com/photo-1535254973379-9e872211821b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.9,
      location: "Madrid",
      price: "€400"
    },
    {
      id: "8",
      name: "Melodía Nupcial",
      category: "Música",
      image: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.7,
      location: "Barcelona",
      price: "€1,200"
    },
    {
      id: "9",
      name: "Elegancia Floral",
      category: "Decoración",
      image: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.8,
      location: "Sevilla",
      price: "€750"
    },
  ]);

  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Filter vendors based on active tab
  const filteredVendors = vendors.filter(vendor => {
    if (activeTab === 'all') return true;
    if (activeTab === 'favorites') return vendor.status === 'favorite';
    if (activeTab === 'pending') return vendor.status === 'pending';
    if (activeTab === 'confirmed') return vendor.status === 'confirmed';
    return true;
  });

  // Handle toggling vendor as favorite
  const handleToggleFavorite = (vendorId: string) => {
    setVendors(vendors.map(vendor => {
      if (vendor.id === vendorId) {
        const newStatus = vendor.status === 'favorite' ? undefined : 'favorite';
        toast.success(newStatus ? "Añadido a favoritos" : "Eliminado de favoritos");
        return { ...vendor, status: newStatus as any };
      }
      return vendor;
    }));
  };

  // Handle requesting a service
  const handleRequestService = (vendorId: string) => {
    setVendors(vendors.map(vendor => {
      if (vendor.id === vendorId) {
        toast.success("Solicitud enviada al proveedor");
        return { 
          ...vendor, 
          status: 'pending', 
          lastMessage: "Hola, me interesa tu servicio para mi boda." 
        };
      }
      return vendor;
    }));
  };

  // Handle confirming a service
  const handleConfirmService = (vendorId: string) => {
    setVendors(vendors.map(vendor => {
      if (vendor.id === vendorId) {
        toast.success("Servicio confirmado");
        return { 
          ...vendor, 
          status: 'confirmed', 
          lastMessage: "Servicio confirmado. Gracias por tu reserva." 
        };
      }
      return vendor;
    }));
  };

  // Handle opening the chat
  const handleChatOpen = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setChatOpen(true);
    
    // Mark messages as read
    setVendors(vendors.map(v => {
      if (v.id === vendor.id) {
        return { ...v, unreadMessages: 0 };
      }
      return v;
    }));
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedVendor) return;

    // Simulate sending a message
    setVendors(vendors.map(vendor => {
      if (vendor.id === selectedVendor.id) {
        return {
          ...vendor,
          lastMessage: messageInput
        };
      }
      return vendor;
    }));
    
    toast.success("Mensaje enviado");
    setMessageInput('');
  };

  // Handle view details
  const handleViewDetails = (id: string) => {
    toast.success("Viendo detalles del servicio");
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
                    Catálogo de Servicios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs 
                    defaultValue="all" 
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                      <TabsTrigger value="all">Todos</TabsTrigger>
                      <TabsTrigger value="favorites" className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        <span className="hidden sm:inline">Favoritos</span>
                      </TabsTrigger>
                      <TabsTrigger value="pending" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span className="hidden sm:inline">Pendientes</span>
                      </TabsTrigger>
                      <TabsTrigger value="confirmed" className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span className="hidden sm:inline">Confirmados</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredVendors.map((vendor) => (
                          <Card key={vendor.id} className="overflow-hidden hover:shadow-md transition-all">
                            <div className="relative">
                              <img 
                                src={vendor.image}
                                alt={vendor.name}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                                }}
                              />
                              <Badge 
                                className="absolute top-2 left-2 bg-white/90 text-wedding-navy border-0"
                              >
                                {vendor.category}
                              </Badge>
                              
                              {vendor.status === 'pending' && vendor.unreadMessages && (
                                <Badge 
                                  className="absolute top-2 right-12 bg-red-500 text-white border-0"
                                >
                                  {vendor.unreadMessages} nuevo{vendor.unreadMessages > 1 ? 's' : ''}
                                </Badge>
                              )}

                              <Button 
                                variant="ghost" 
                                size="icon"
                                className={`absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full ${vendor.status === 'favorite' ? 'text-wedding-sage hover:text-wedding-sage/80' : 'text-gray-400 hover:text-wedding-sage'}`}
                                onClick={() => handleToggleFavorite(vendor.id)}
                              >
                                <Heart className={`h-4 w-4 ${vendor.status === 'favorite' ? 'fill-wedding-sage' : ''}`} />
                              </Button>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-serif text-lg font-medium mb-1">{vendor.name}</h3>
                              <div className="flex items-center text-gray-500 mb-3">
                                <span className="flex items-center text-sm mr-2">
                                  <Star className="h-4 w-4 fill-wedding-gold text-wedding-gold mr-1" />
                                  {vendor.rating}
                                </span>
                                <span className="text-sm">{vendor.location}</span>
                              </div>
                              
                              {vendor.lastMessage && (
                                <div className="bg-gray-50 p-3 rounded-md mb-3 text-sm">
                                  <p className="line-clamp-2">{vendor.lastMessage}</p>
                                </div>
                              )}
                              
                              <div className="flex justify-between items-center mt-3">
                                <div>
                                  <span className="text-wedding-navy font-semibold">{vendor.price}</span>
                                </div>
                                
                                <div className="space-x-2">
                                  {!vendor.status && (
                                    <Button 
                                      size="sm"
                                      onClick={() => handleRequestService(vendor.id)}
                                    >
                                      Solicitar
                                    </Button>
                                  )}
                                  
                                  {vendor.status === 'pending' && (
                                    <>
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleChatOpen(vendor)}
                                      >
                                        Chat
                                      </Button>
                                      <Button 
                                        size="sm"
                                        onClick={() => handleConfirmService(vendor.id)}
                                      >
                                        Confirmar
                                      </Button>
                                    </>
                                  )}
                                  
                                  {vendor.status === 'confirmed' && (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleChatOpen(vendor)}
                                    >
                                      Chat
                                    </Button>
                                  )}

                                  <Button 
                                    variant={vendor.status ? "outline" : "ghost"}
                                    size="sm"
                                    onClick={() => handleViewDetails(vendor.id)}
                                  >
                                    Detalles
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {filteredVendors.length === 0 && (
                        <div className="text-center py-12">
                          <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-800 mb-2">No hay servicios disponibles</h3>
                          <p className="text-gray-500 mb-6">No se encontraron servicios en esta categoría.</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    {['favorites', 'pending', 'confirmed'].map((tab) => (
                      <TabsContent key={tab} value={tab} className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {filteredVendors.map((vendor) => (
                            <Card key={vendor.id} className="overflow-hidden hover:shadow-md transition-all">
                              <div className="relative">
                                <img 
                                  src={vendor.image}
                                  alt={vendor.name}
                                  className="w-full h-48 object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                                  }}
                                />
                                <Badge 
                                  className="absolute top-2 left-2 bg-white/90 text-wedding-navy border-0"
                                >
                                  {vendor.category}
                                </Badge>
                                
                                {vendor.status === 'pending' && vendor.unreadMessages && (
                                  <Badge 
                                    className="absolute top-2 right-12 bg-red-500 text-white border-0"
                                  >
                                    {vendor.unreadMessages} nuevo{vendor.unreadMessages > 1 ? 's' : ''}
                                  </Badge>
                                )}

                                {tab === 'favorites' && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="absolute top-2 right-2 bg-white/90 hover:bg-white text-wedding-sage hover:text-wedding-sage/80 rounded-full"
                                    onClick={() => handleToggleFavorite(vendor.id)}
                                  >
                                    <Heart className="h-4 w-4 fill-wedding-sage" />
                                  </Button>
                                )}
                              </div>
                              <CardContent className="p-4">
                                <h3 className="font-serif text-lg font-medium mb-1">{vendor.name}</h3>
                                <div className="flex items-center text-gray-500 mb-3">
                                  <span className="flex items-center text-sm mr-2">
                                    <Star className="h-4 w-4 fill-wedding-gold text-wedding-gold mr-1" />
                                    {vendor.rating}
                                  </span>
                                  <span className="text-sm">{vendor.location}</span>
                                </div>
                                
                                {vendor.lastMessage && (
                                  <div className="bg-gray-50 p-3 rounded-md mb-3 text-sm">
                                    <p className="line-clamp-2">{vendor.lastMessage}</p>
                                  </div>
                                )}
                                
                                <div className="flex justify-between items-center mt-3">
                                  <div>
                                    <span className="text-wedding-navy font-semibold">{vendor.price}</span>
                                  </div>
                                  
                                  <div className="space-x-2">
                                    {tab === 'favorites' && (
                                      <Button 
                                        size="sm"
                                        onClick={() => handleRequestService(vendor.id)}
                                      >
                                        Solicitar
                                      </Button>
                                    )}
                                    
                                    {tab === 'pending' && (
                                      <>
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          onClick={() => handleChatOpen(vendor)}
                                        >
                                          Chat
                                        </Button>
                                        <Button 
                                          size="sm"
                                          onClick={() => handleConfirmService(vendor.id)}
                                        >
                                          Confirmar
                                        </Button>
                                      </>
                                    )}
                                    
                                    {tab === 'confirmed' && (
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleChatOpen(vendor)}
                                      >
                                        Chat
                                      </Button>
                                    )}

                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleViewDetails(vendor.id)}
                                    >
                                      Detalles
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        
                        {filteredVendors.length === 0 && (
                          <div className="text-center py-12">
                            {tab === 'favorites' && (
                              <>
                                <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-800 mb-2">No tienes favoritos</h3>
                                <p className="text-gray-500 mb-6">Explora servicios y añade a favoritos los que te gusten.</p>
                              </>
                            )}
                            
                            {tab === 'pending' && (
                              <>
                                <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-800 mb-2">No hay solicitudes pendientes</h3>
                                <p className="text-gray-500 mb-6">Solicita servicios a proveedores para empezar a planificar tu boda.</p>
                              </>
                            )}
                            
                            {tab === 'confirmed' && (
                              <>
                                <Check className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-800 mb-2">No hay servicios confirmados</h3>
                                <p className="text-gray-500 mb-6">Confirma servicios para ir completando la planificación de tu boda.</p>
                              </>
                            )}
                            
                            <Button className="bg-wedding-sage hover:bg-wedding-sage/90 text-white">
                              Explorar Servicios
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Chat Modal */}
      {chatOpen && selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedVendor.image} 
                  alt={selectedVendor.name} 
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                  }}
                />
                <div>
                  <h3 className="font-medium">{selectedVendor.name}</h3>
                  <p className="text-xs text-gray-500">{selectedVendor.category}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setChatOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%] ml-auto">
                  <p className="text-sm">Hola, me interesa tu servicio para mi boda.</p>
                  <span className="text-xs text-gray-500 block text-right">12:05</span>
                </div>
                {selectedVendor.lastMessage && (
                  <div className="bg-wedding-sage/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">{selectedVendor.lastMessage}</p>
                    <span className="text-xs text-gray-500 block">12:10</span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 border-t flex gap-2">
              <input 
                type="text" 
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-wedding-sage"
                placeholder="Escribe un mensaje..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                Enviar
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Services;
