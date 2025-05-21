
import React, { useState } from 'react';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Search, Calendar, MessageSquare, X, Filter, ArrowRight, Star } from 'lucide-react';
import VendorCard from '@/components/VendorCard';
import ServiceCard from '@/components/ServiceCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Interfaces para tipos de datos
interface Vendor {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  isVerified: boolean;
  isFeatured?: boolean;
  description: string;
  price: string;
}

interface Service {
  id: string;
  title: string;
  provider: string;
  image: string;
  price: string;
  priceUnit: string;
  category: string;
  isPopular?: boolean;
  availableDate?: string;
}

const Favorites = () => {
  // Datos simulados del usuario
  const userData = {
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    weddingDate: "15 de septiembre, 2025",
    avatarFallback: "MG"
  };
  
  // Progreso del perfil
  const progress = 38;
  
  // Estado para favoritos
  const [favoriteVendors, setFavoriteVendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'Villa Rosa - Finca para Eventos',
      category: 'Lugar',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.9,
      reviewCount: 124,
      location: 'Madrid, España',
      isVerified: true,
      description: 'Elegante finca con jardines para bodas y eventos, con capacidad hasta 300 invitados.',
      price: 'Desde €5,000',
    },
    {
      id: '2',
      name: 'Carlos Jiménez Fotografía',
      category: 'Fotografía',
      image: 'https://images.unsplash.com/photo-1553101872-64e48bfbf309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.8,
      reviewCount: 87,
      location: 'Barcelona, España',
      isVerified: true,
      description: 'Fotógrafo premiado especializado en bodas con un estilo natural y emotivo.',
      price: 'Desde €1,800',
    },
    {
      id: '4',
      name: 'Elegancia Floral',
      category: 'Decoración',
      image: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.9,
      reviewCount: 78,
      location: 'Sevilla, España',
      isVerified: true,
      description: 'Arreglos florales exquisitos para crear ambientes mágicos en tu ceremonia y celebración.',
      price: 'Desde €800',
    }
  ]);
  
  const [favoriteServices, setFavoriteServices] = useState<Service[]>([
    {
      id: '1',
      title: 'Reportaje de boda completo',
      provider: 'Carlos Jiménez Fotografía',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '1800',
      priceUnit: 'servicio',
      category: 'Fotografía',
      isPopular: true
    },
    {
      id: '2',
      title: 'Menú Premium con barra libre',
      provider: 'Catering Delicioso',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '120',
      priceUnit: 'persona',
      category: 'Catering',
      availableDate: '15/09/2025'
    },
    {
      id: '3',
      title: 'Decoración floral completa',
      provider: 'Elegancia Floral',
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '1200',
      priceUnit: 'paquete',
      category: 'Decoración'
    }
  ]);
  
  // Estado para filtros y búsqueda
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [messageText, setMessageText] = useState('');
  
  // Filtrar favoritos según categoría activa y búsqueda
  const filteredVendors = favoriteVendors.filter(vendor => {
    const matchesCategory = activeCategory === 'all' || vendor.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  const filteredServices = favoriteServices.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Funciones para manejar favoritos
  const handleRemoveVendor = (id: string) => {
    setFavoriteVendors(favoriteVendors.filter(vendor => vendor.id !== id));
    toast.success("Proveedor eliminado de favoritos");
  };
  
  const handleRemoveService = (id: string) => {
    setFavoriteServices(favoriteServices.filter(service => service.id !== id));
    toast.success("Servicio eliminado de favoritos");
  };
  
  const handleContactVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setShowContactDialog(true);
  };
  
  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast.error("Por favor escribe un mensaje");
      return;
    }
    
    toast.success(`Mensaje enviado a ${selectedVendor?.name}`);
    setMessageText('');
    setShowContactDialog(false);
  };
  
  const handleRequestAppointment = (vendorId: string) => {
    const vendor = favoriteVendors.find(v => v.id === vendorId);
    toast.success(`Solicitud de cita enviada a ${vendor?.name}`);
  };
  
  const handleAddServiceToCart = (serviceId: string) => {
    const service = favoriteServices.find(s => s.id === serviceId);
    toast.success(`${service?.title} añadido al carrito`);
  };
  
  // Obtener categorías únicas
  const getUniqueCategories = () => {
    const vendorCategories = favoriteVendors.map(vendor => vendor.category);
    const serviceCategories = favoriteServices.map(service => service.category);
    const allCategories = [...new Set([...vendorCategories, ...serviceCategories])];
    return allCategories;
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
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif font-semibold flex items-center">
                  <Heart className="mr-2 text-wedding-sage" /> 
                  Favoritos
                </h1>
                <Button variant="outline" className="border-wedding-sage text-wedding-sage hover:bg-wedding-sage hover:text-white">
                  <ArrowRight className="mr-1 h-4 w-4" /> 
                  Ver Catálogo
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="relative max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Buscar favoritos..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      {activeCategory === 'all' ? 'Todas las categorías' : activeCategory}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setActiveCategory('all')}>
                      Todas las categorías
                    </DropdownMenuItem>
                    {getUniqueCategories().map((category) => (
                      <DropdownMenuItem 
                        key={category}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Tabs defaultValue="vendors" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="vendors">
                    Proveedores ({favoriteVendors.length})
                  </TabsTrigger>
                  <TabsTrigger value="services">
                    Servicios ({favoriteServices.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="vendors">
                  {filteredVendors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                      {filteredVendors.map((vendor) => (
                        <div key={vendor.id} className="relative group">
                          <Button
                            variant="ghost"
                            className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white text-red-500 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveVendor(vendor.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          
                          <VendorCard {...vendor} />
                          
                          <div className="mt-3 flex space-x-2">
                            <Button 
                              className="flex-1 bg-wedding-sage hover:bg-wedding-sage/90"
                              onClick={() => handleContactVendor(vendor)}
                            >
                              <MessageSquare className="mr-1 h-4 w-4" /> Contactar
                            </Button>
                            <Button 
                              variant="outline"
                              className="flex-1 border-wedding-sage text-wedding-sage hover:bg-wedding-sage hover:text-white"
                              onClick={() => handleRequestAppointment(vendor.id)}
                            >
                              <Calendar className="mr-1 h-4 w-4" /> Solicitar cita
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Heart className="h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Aún no tienes favoritos</h3>
                        <p className="text-gray-500 mt-2 text-center max-w-md">
                          Añade proveedores a tus favoritos para guardarlos aquí y contactarlos fácilmente.
                        </p>
                        <Button className="mt-6 bg-wedding-sage hover:bg-wedding-sage/90">
                          Explorar proveedores
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="services">
                  {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredServices.map((service) => (
                        <div key={service.id} className="relative group">
                          <Button
                            variant="ghost"
                            className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white text-red-500 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveService(service.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          
                          <ServiceCard {...service} />
                          
                          <div className="mt-3">
                            <Button 
                              className="w-full bg-wedding-sage hover:bg-wedding-sage/90"
                              onClick={() => handleAddServiceToCart(service.id)}
                            >
                              Contratar servicio
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Heart className="h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Aún no tienes servicios favoritos</h3>
                        <p className="text-gray-500 mt-2 text-center max-w-md">
                          Guarda los servicios que te interesen para compararlos más tarde o contratarlos.
                        </p>
                        <Button className="mt-6 bg-wedding-sage hover:bg-wedding-sage/90">
                          Explorar servicios
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
              
              {/* Recomendaciones */}
              {(filteredVendors.length > 0 || filteredServices.length > 0) && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-serif font-semibold mb-4">Recomendados para ti</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="h-36 rounded-md overflow-hidden mb-3">
                          <img
                            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
                            alt="DJ Melodía"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Badge className="mb-2">Música</Badge>
                          <h3 className="font-medium">DJ Melodía</h3>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className="h-3 w-3" 
                                  fill={star <= 4.5 ? "gold" : "none"}
                                  stroke={star <= 4.5 ? "gold" : "currentColor"}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-2">4.5 (32 reseñas)</span>
                          </div>
                          <Button className="w-full mt-3 bg-wedding-sage hover:bg-wedding-sage/90 h-8 text-sm">
                            Añadir a Favoritos
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="h-36 rounded-md overflow-hidden mb-3">
                          <img
                            src="https://images.unsplash.com/photo-1574169208507-84376144848b"
                            alt="Vehículos Clásicos Premier"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Badge className="mb-2">Transporte</Badge>
                          <h3 className="font-medium">Vehículos Clásicos Premier</h3>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className="h-3 w-3" 
                                  fill={star <= 4.8 ? "gold" : "none"}
                                  stroke={star <= 4.8 ? "gold" : "currentColor"}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-2">4.8 (19 reseñas)</span>
                          </div>
                          <Button className="w-full mt-3 bg-wedding-sage hover:bg-wedding-sage/90 h-8 text-sm">
                            Añadir a Favoritos
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="h-36 rounded-md overflow-hidden mb-3">
                          <img
                            src="https://images.unsplash.com/photo-1519072379003-7459633e1d0d"
                            alt="Invitaciones Arte Papel"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Badge className="mb-2">Papelería</Badge>
                          <h3 className="font-medium">Invitaciones Arte Papel</h3>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className="h-3 w-3" 
                                  fill={star <= 4.7 ? "gold" : "none"}
                                  stroke={star <= 4.7 ? "gold" : "currentColor"}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-2">4.7 (45 reseñas)</span>
                          </div>
                          <Button className="w-full mt-3 bg-wedding-sage hover:bg-wedding-sage/90 h-8 text-sm">
                            Añadir a Favoritos
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Modal para contactar proveedor */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contactar con {selectedVendor?.name}</DialogTitle>
            <DialogDescription>
              Envía un mensaje para solicitar información o hacer una consulta
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-3 pb-4 border-b">
              <div className="h-12 w-12 rounded-md overflow-hidden">
                <img 
                  src={selectedVendor?.image} 
                  alt={selectedVendor?.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{selectedVendor?.name}</h3>
                <p className="text-sm text-gray-500">{selectedVendor?.category} • {selectedVendor?.location}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="contact-reason" className="text-sm font-medium">
                Motivo de contacto
              </label>
              <Select defaultValue="info">
                <SelectTrigger id="contact-reason">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Solicitud de información</SelectItem>
                  <SelectItem value="quote">Solicitar presupuesto</SelectItem>
                  <SelectItem value="date">Consultar disponibilidad</SelectItem>
                  <SelectItem value="other">Otro motivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message-text" className="text-sm font-medium">
                Mensaje
              </label>
              <textarea
                id="message-text"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Escribe tu mensaje aquí..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                El proveedor recibirá tu mensaje y tus datos de contacto para poder responderte.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContactDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-wedding-sage hover:bg-wedding-sage/90" onClick={handleSendMessage}>
              <MessageSquare className="mr-2 h-4 w-4" /> Enviar mensaje
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Favorites;
