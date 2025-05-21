
import React, { useState } from 'react';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash, Search, Star, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

// Interfaces para tipos de datos
interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  featured: boolean;
  availability: 'available' | 'limited' | 'unavailable';
  image: string;
  category: string;
  bookings?: number;
  views?: number;
}

interface ServiceRequest {
  id: number;
  clientName: string;
  clientAvatar: string;
  serviceName: string;
  serviceId: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  message: string;
  budget?: number;
  eventDate?: string;
}

const ProviderServices = () => {
  // Estado para los servicios
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Reportaje de boda completo",
      description: "Cobertura completa de tu boda, desde los preparativos hasta el final de la fiesta. Incluye más de 500 fotos editadas y un álbum de 30 páginas.",
      price: 1800,
      priceUnit: "evento",
      featured: true,
      availability: 'available',
      image: "https://images.unsplash.com/photo-1535254973379-9e872211821b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Bodas",
      bookings: 18,
      views: 245
    },
    {
      id: 2,
      name: "Sesión pre-boda",
      description: "Sesión de 2 horas en locación a elección. Incluye 50 fotos editadas entregadas en formato digital.",
      price: 350,
      priceUnit: "sesión",
      featured: true,
      availability: 'available',
      image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Pre-bodas",
      bookings: 24,
      views: 189
    },
    {
      id: 3,
      name: "Reportaje de ceremonia",
      description: "Cobertura de la ceremonia y sesión de fotos familiares. Incluye 200 fotos editadas.",
      price: 800,
      priceUnit: "evento",
      featured: false,
      availability: 'limited',
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Ceremonias",
      bookings: 12,
      views: 156
    },
    {
      id: 4,
      name: "Sesión post-boda",
      description: "Sesión de fotos después de la boda en una locación especial. Perfecta para conseguir esas fotos soñadas sin las presiones del día de la boda.",
      price: 400,
      priceUnit: "sesión",
      featured: false,
      availability: 'available',
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "Post-bodas",
      bookings: 9,
      views: 112
    }
  ]);
  
  // Estado para las solicitudes de servicio
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([
    {
      id: 1,
      clientName: "María García",
      clientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      serviceName: "Sesión pre-boda",
      serviceId: 2,
      date: "15/05/2025",
      status: 'pending',
      message: "Me gustaría contratar una sesión de fotos pre-boda al aire libre, ¿podríamos hacerla en el Parque del Retiro?",
      budget: 350,
      eventDate: "01/07/2025"
    },
    {
      id: 2,
      clientName: "Pedro Sánchez",
      clientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      serviceName: "Reportaje de boda completo",
      serviceId: 1,
      date: "12/05/2025",
      status: 'pending',
      message: "Buscamos un reportaje completo para nuestra boda, estamos interesados en tu paquete Premium con álbum. La boda es en Septiembre en Madrid.",
      budget: 1800,
      eventDate: "15/09/2025"
    },
    {
      id: 3,
      clientName: "Laura Pérez",
      clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      serviceName: "Reportaje de ceremonia",
      serviceId: 3,
      date: "10/05/2025",
      status: 'approved',
      message: "Queremos concretar los detalles para el servicio de fotos de la ceremonia.",
      eventDate: "10/11/2025"
    }
  ]);
  
  // Estados para modales
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({
    name: '',
    description: '',
    price: 0,
    priceUnit: 'evento',
    featured: false,
    availability: 'available',
    image: '',
    category: ''
  });
  
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('services');
  
  // Filtrar servicios según búsqueda
  const filteredServices = services.filter(service => {
    return service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Filtrar solicitudes según búsqueda
  const filteredRequests = serviceRequests.filter(request => {
    return request.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.message.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Funciones para manejar servicios
  const handleAddService = () => {
    setSelectedService(null);
    setNewService({
      name: '',
      description: '',
      price: 0,
      priceUnit: 'evento',
      featured: false,
      availability: 'available',
      image: '',
      category: ''
    });
    setIsServiceModalOpen(true);
  };
  
  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setNewService({ ...service });
    setIsServiceModalOpen(true);
  };
  
  const handleDeleteService = (serviceId: number) => {
    setServices(services.filter(service => service.id !== serviceId));
    toast.success("Servicio eliminado correctamente");
  };
  
  const handleSaveService = () => {
    if (!newService.name || !newService.price) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    
    if (selectedService) {
      // Editar servicio existente
      setServices(services.map(service => 
        service.id === selectedService.id ? { ...service, ...newService } as Service : service
      ));
      toast.success("Servicio actualizado correctamente");
    } else {
      // Crear nuevo servicio
      const newServiceWithId = {
        ...newService,
        id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
        views: 0,
        bookings: 0
      } as Service;
      setServices([...services, newServiceWithId]);
      toast.success("Servicio añadido correctamente");
    }
    
    setIsServiceModalOpen(false);
  };
  
  const handleToggleFeature = (serviceId: number) => {
    setServices(services.map(service => 
      service.id === serviceId ? 
      { ...service, featured: !service.featured } : 
      service
    ));
    
    const service = services.find(s => s.id === serviceId);
    if (service) {
      toast.success(service.featured ? "Servicio quitado de destacados" : "Servicio añadido a destacados");
    }
  };
  
  const handleChangeAvailability = (serviceId: number, availability: 'available' | 'limited' | 'unavailable') => {
    setServices(services.map(service => 
      service.id === serviceId ? 
      { ...service, availability } : 
      service
    ));
    
    const availabilityText = {
      available: "disponible",
      limited: "disponibilidad limitada",
      unavailable: "no disponible"
    };
    
    toast.success(`Servicio marcado como ${availabilityText[availability]}`);
  };
  
  // Funciones para manejar solicitudes
  const handleViewRequest = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setIsRequestModalOpen(true);
  };
  
  const handleRequestAction = (requestId: number, action: 'approve' | 'reject') => {
    setServiceRequests(serviceRequests.map(request => 
      request.id === requestId ? 
      { ...request, status: action === 'approve' ? 'approved' : 'rejected' } : 
      request
    ));
    
    toast.success(`Solicitud ${action === 'approve' ? 'aprobada' : 'rechazada'} correctamente`);
    setIsRequestModalOpen(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />
      
      <main className="flex-grow py-8">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-serif font-semibold">Gestión de Servicios</h1>
            <Button className="bg-wedding-sage hover:bg-wedding-sage/90" onClick={handleAddService}>
              <Plus className="mr-1 h-4 w-4" /> Añadir Servicio
            </Button>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar servicios o solicitudes..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="services" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="services">
                Mis Servicios ({services.length})
              </TabsTrigger>
              <TabsTrigger value="requests">
                Solicitudes ({serviceRequests.filter(r => r.status === 'pending').length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="services">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img 
                        src={service.image}
                        alt={service.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                        }}
                      />
                      <Badge 
                        className="absolute top-2 left-2 bg-white/90 text-wedding-navy border-0"
                      >
                        {service.category}
                      </Badge>
                      
                      {service.featured && (
                        <Badge 
                          className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 border-0"
                        >
                          Destacado
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-1">{service.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="font-medium">
                          {service.price}€
                          <span className="text-xs text-gray-500 ml-1">/{service.priceUnit}</span>
                        </div>
                        <Badge className={`
                          ${service.availability === 'available' ? 'bg-green-100 text-green-800' : 
                            service.availability === 'limited' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}
                        `}>
                          {service.availability === 'available' ? 'Disponible' : 
                            service.availability === 'limited' ? 'Limitado' : 
                            'No disponible'}
                        </Badge>
                      </div>
                      
                      {(service.bookings !== undefined || service.views !== undefined) && (
                        <div className="flex justify-between mt-3 text-xs text-gray-500">
                          {service.bookings !== undefined && (
                            <span className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-1" /> {service.bookings} reservas
                            </span>
                          )}
                          {service.views !== undefined && (
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" /> {service.views} vistas
                            </span>
                          )}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">Acciones</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleEditService(service)}>
                            <Edit className="mr-2 h-4 w-4" /> Editar servicio
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleFeature(service.id)}>
                            {service.featured ? (
                              <>
                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Quitar destacado
                              </>
                            ) : (
                              <>
                                <Star className="mr-2 h-4 w-4" /> Destacar servicio
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleChangeAvailability(service.id, 'available')}>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> Marcar disponible
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleChangeAvailability(service.id, 'limited')}>
                            <svg className="mr-2 h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Marcar limitado
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleChangeAvailability(service.id, 'unavailable')}>
                            <XCircle className="mr-2 h-4 w-4 text-red-600" /> Marcar no disponible
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteService(service.id)}
                            className="text-red-600 focus:text-red-700"
                          >
                            <Trash className="mr-2 h-4 w-4" /> Eliminar servicio
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button size="sm" className="bg-wedding-navy hover:bg-wedding-navy/90" onClick={() => toast.info("Previsualización de servicio")}>
                        Ver detalles
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                {filteredServices.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium">No se encontraron servicios</h3>
                    <p className="text-gray-500 mt-2 max-w-md mx-auto">
                      {searchQuery ? 'No hay servicios que coincidan con tu búsqueda' : 'Aún no has añadido ningún servicio'}
                    </p>
                    <Button className="mt-6 bg-wedding-sage hover:bg-wedding-sage/90" onClick={handleAddService}>
                      <Plus className="mr-1 h-4 w-4" /> Añadir tu primer servicio
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="requests">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Solicitudes de servicios</CardTitle>
                  <CardDescription>
                    Gestiona las solicitudes recibidas de clientes interesados en tus servicios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredRequests.map((request) => (
                      <div 
                        key={request.id} 
                        className={`border rounded-lg p-4 ${
                          request.status === 'pending' ? 'border-yellow-200 bg-yellow-50' :
                          request.status === 'approved' ? 'border-green-200 bg-green-50' :
                          'border-red-200 bg-red-50'
                        }`}
                      >
                        <div className="sm:flex justify-between">
                          <div className="flex items-center mb-3 sm:mb-0">
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                              <img src={request.clientAvatar} alt={request.clientName} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium">{request.clientName}</div>
                              <div className="text-sm text-gray-500">{request.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end">
                            <Badge className={`
                              ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-0' :
                                request.status === 'approved' ? 'bg-green-100 text-green-800 border-0' :
                                'bg-red-100 text-red-800 border-0'}
                            `}>
                              {request.status === 'pending' ? 'Pendiente' :
                                request.status === 'approved' ? 'Aprobada' :
                                'Rechazada'}
                            </Badge>
                            <div className="flex ml-4">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleViewRequest(request)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-1">Servicio solicitado: {request.serviceName}</p>
                          <p className="text-sm text-gray-600">{request.message}</p>
                          {request.eventDate && (
                            <p className="text-xs text-gray-500 mt-2">Fecha del evento: {request.eventDate}</p>
                          )}
                        </div>
                        {request.status === 'pending' && (
                          <div className="mt-3 flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600" 
                              onClick={() => handleRequestAction(request.id, 'reject')}
                            >
                              Rechazar
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-wedding-sage hover:bg-wedding-sage/90"
                              onClick={() => handleRequestAction(request.id, 'approve')}
                            >
                              Aprobar
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {filteredRequests.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                          <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                        </div>
                        <p>{searchQuery ? 'No hay solicitudes que coincidan con tu búsqueda' : 'No tienes solicitudes de servicios en este momento'}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      
      {/* Modal para añadir/editar servicio */}
      <Dialog open={isServiceModalOpen} onOpenChange={setIsServiceModalOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{selectedService ? 'Editar servicio' : 'Añadir nuevo servicio'}</DialogTitle>
            <DialogDescription>
              {selectedService 
                ? 'Modifica los detalles de tu servicio' 
                : 'Completa los detalles para añadir un nuevo servicio a tu catálogo'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-name">Nombre del servicio</Label>
                <Input
                  id="service-name"
                  placeholder="Nombre del servicio"
                  value={newService.name || ''}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service-category">Categoría</Label>
                <Input
                  id="service-category"
                  placeholder="Categoría del servicio"
                  value={newService.category || ''}
                  onChange={(e) => setNewService({...newService, category: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service-description">Descripción</Label>
              <Textarea
                id="service-description"
                placeholder="Describe tu servicio..."
                rows={4}
                value={newService.description || ''}
                onChange={(e) => setNewService({...newService, description: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-price">Precio (€)</Label>
                <Input
                  id="service-price"
                  type="number"
                  placeholder="0"
                  value={newService.price || ''}
                  onChange={(e) => setNewService({...newService, price: Number(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service-price-unit">Unidad de precio</Label>
                <Select
                  value={newService.priceUnit}
                  onValueChange={(value) => setNewService({...newService, priceUnit: value})}
                >
                  <SelectTrigger id="service-price-unit">
                    <SelectValue placeholder="Selecciona una unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="evento">Por evento</SelectItem>
                    <SelectItem value="hora">Por hora</SelectItem>
                    <SelectItem value="sesión">Por sesión</SelectItem>
                    <SelectItem value="persona">Por persona</SelectItem>
                    <SelectItem value="paquete">Por paquete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service-image">URL de imagen</Label>
              <Input
                id="service-image"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={newService.image || ''}
                onChange={(e) => setNewService({...newService, image: e.target.value})}
              />
              <p className="text-xs text-gray-500">Introduce la URL de una imagen para mostrar en tu servicio</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service-availability">Disponibilidad</Label>
              <Select
                value={newService.availability}
                onValueChange={(value) => setNewService({...newService, availability: value as any})}
              >
                <SelectTrigger id="service-availability">
                  <SelectValue placeholder="Selecciona disponibilidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="limited">Disponibilidad limitada</SelectItem>
                  <SelectItem value="unavailable">No disponible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={newService.featured}
                onCheckedChange={(checked) => setNewService({...newService, featured: checked})}
              />
              <Label htmlFor="service-featured">Destacar este servicio en mi perfil</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsServiceModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-wedding-sage hover:bg-wedding-sage/90" onClick={handleSaveService}>
              {selectedService ? 'Guardar cambios' : 'Añadir servicio'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal para ver solicitud */}
      <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Solicitud de servicio</DialogTitle>
            <DialogDescription>
              Detalles de la solicitud
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="py-4">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                  <img src={selectedRequest.clientAvatar} alt={selectedRequest.clientName} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedRequest.clientName}</h3>
                  <p className="text-sm text-gray-500">{selectedRequest.date}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Servicio solicitado:</p>
                  <p className="font-medium">{selectedRequest.serviceName}</p>
                </div>
                
                {selectedRequest.eventDate && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Fecha del evento:</p>
                    <p>{selectedRequest.eventDate}</p>
                  </div>
                )}
                
                {selectedRequest.budget && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Presupuesto estimado:</p>
                    <p>{selectedRequest.budget}€</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Mensaje:</p>
                  <p>{selectedRequest.message}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Estado:</p>
                  <Badge className={`
                    ${selectedRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-0' :
                      selectedRequest.status === 'approved' ? 'bg-green-100 text-green-800 border-0' :
                      'bg-red-100 text-red-800 border-0'}
                  `}>
                    {selectedRequest.status === 'pending' ? 'Pendiente' :
                      selectedRequest.status === 'approved' ? 'Aprobada' :
                      'Rechazada'}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {selectedRequest && selectedRequest.status === 'pending' ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleRequestAction(selectedRequest.id, 'reject')}
                  className="text-red-600"
                >
                  Rechazar
                </Button>
                <Button
                  className="bg-wedding-sage hover:bg-wedding-sage/90"
                  onClick={() => handleRequestAction(selectedRequest.id, 'approve')}
                >
                  Aprobar
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsRequestModalOpen(false)}>
                Cerrar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProviderServices;
