
import { useState } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Edit, Trash, Eye, Camera, Heart, Users, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data para servicios
const mockServices = [
  {
    id: '1',
    name: 'Sesión de fotos pre-boda',
    category: 'Fotografía',
    price: 450,
    duration: '2 horas',
    description: 'Sesión romántica para capturar momentos especiales antes del gran día',
    status: 'active',
    bookings: 12,
    rating: 4.9,
    featured: true
  },
  {
    id: '2',
    name: 'Cobertura completa de boda',
    category: 'Fotografía',
    price: 1200,
    duration: '8 horas',
    description: 'Cobertura fotográfica completa de ceremonia y banquete',
    status: 'active',
    bookings: 8,
    rating: 5.0,
    featured: true
  },
  {
    id: '3',
    name: 'Álbum digital personalizado',
    category: 'Fotografía',
    price: 200,
    duration: '1 semana entrega',
    description: 'Álbum digital con las mejores fotos editadas y personalizadas',
    status: 'active',
    bookings: 25,
    rating: 4.8,
    featured: false
  },
  {
    id: '4',
    name: 'Evento corporativo',
    category: 'Corporativo',
    price: 800,
    duration: '4 horas',
    description: 'Cobertura profesional para eventos de empresa',
    status: 'active',
    bookings: 5,
    rating: 4.7,
    featured: false
  },
  {
    id: '5',
    name: 'Sesión familiar',
    category: 'Familiar',
    price: 300,
    duration: '1.5 horas',
    description: 'Sesión de fotos familiares en exteriores',
    status: 'inactive',
    bookings: 3,
    rating: 4.6,
    featured: false
  },
];

const categories = ['Todas', 'Fotografía', 'Corporativo', 'Familiar', 'Eventos'];

const ProviderServices = () => {
  const { toast } = useToast();
  const [services, setServices] = useState(mockServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
    description: '',
    status: 'active'
  });

  // Filtrar servicios
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddService = () => {
    setSelectedService(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      duration: '',
      description: '',
      status: 'active'
    });
    setIsDialogOpen(true);
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setFormData({
      name: service.name,
      category: service.category,
      price: service.price.toString(),
      duration: service.duration,
      description: service.description,
      status: service.status
    });
    setIsDialogOpen(true);
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Servicio eliminado",
      description: "El servicio ha sido eliminado correctamente",
    });
  };

  const handleSaveService = () => {
    if (!formData.name || !formData.category || !formData.price) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    const serviceData = {
      ...formData,
      price: parseFloat(formData.price),
      bookings: selectedService?.bookings || 0,
      rating: selectedService?.rating || 0,
      featured: selectedService?.featured || false
    };

    if (selectedService) {
      // Editar servicio existente
      setServices(services.map(service =>
        service.id === selectedService.id ? { ...service, ...serviceData } : service
      ));
      toast({
        title: "Servicio actualizado",
        description: "Los cambios han sido guardados correctamente",
      });
    } else {
      // Crear nuevo servicio
      const newService = {
        id: Date.now().toString(),
        ...serviceData
      };
      setServices([...services, newService]);
      toast({
        title: "Servicio creado",
        description: "El nuevo servicio ha sido añadido correctamente",
      });
    }

    setIsDialogOpen(false);
  };

  const toggleServiceStatus = (id) => {
    setServices(services.map(service =>
      service.id === id
        ? { ...service, status: service.status === 'active' ? 'inactive' : 'active' }
        : service
    ));
    toast({
      title: "Estado actualizado",
      description: "El estado del servicio ha sido cambiado",
    });
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 hover:bg-green-100' 
      : 'bg-red-100 text-red-800 hover:bg-red-100';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Fotografía': return <Camera className="h-4 w-4" />;
      case 'Corporativo': return <Users className="h-4 w-4" />;
      case 'Familiar': return <Heart className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Mis Servicios</h1>
          <p className="text-gray-600">
            Gestiona tu catálogo de servicios y personaliza tu oferta
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Total servicios</p>
                  <h3 className="text-2xl font-bold text-blue-800">{services.length}</h3>
                </div>
                <Sparkles className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Activos</p>
                  <h3 className="text-2xl font-bold text-green-800">
                    {services.filter(s => s.status === 'active').length}
                  </h3>
                </div>
                <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Reservas totales</p>
                  <h3 className="text-2xl font-bold text-purple-800">
                    {services.reduce((sum, s) => sum + s.bookings, 0)}
                  </h3>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-700">Rating promedio</p>
                  <h3 className="text-2xl font-bold text-amber-800">
                    {(services.reduce((sum, s) => sum + s.rating, 0) / services.length).toFixed(1)}
                  </h3>
                </div>
                <div className="text-amber-600">★</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controles */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar servicios..."
                className="pl-10 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAddService} className="bg-wedding-sage hover:bg-wedding-sage/90">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Servicio
          </Button>
        </div>

        {/* Tabla de servicios */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Reservas</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="bg-wedding-blush/20 p-2 rounded-lg">
                          {getCategoryIcon(service.category)}
                        </div>
                        <div>
                          <div className="font-medium flex items-center">
                            {service.name}
                            {service.featured && (
                              <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100">
                                Destacado
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {service.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{service.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">€{service.price}</TableCell>
                    <TableCell>{service.duration}</TableCell>
                    <TableCell>
                      <span className="font-medium">{service.bookings}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        ★ <span className="ml-1">{service.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={`cursor-pointer ${getStatusColor(service.status)}`}
                        onClick={() => toggleServiceStatus(service.id)}
                      >
                        {service.status === 'active' ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditService(service)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Mensaje si no hay servicios */}
        {filteredServices.length === 0 && (
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron servicios
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza añadiendo tu primer servicio'}
            </p>
            <Button onClick={handleAddService} className="bg-wedding-sage hover:bg-wedding-sage/90">
              <Plus className="mr-2 h-4 w-4" />
              Añadir Servicio
            </Button>
          </div>
        )}
      </div>

      {/* Modal para añadir/editar servicio */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedService ? 'Editar servicio' : 'Nuevo servicio'}
            </DialogTitle>
            <DialogDescription>
              {selectedService 
                ? 'Modifica los detalles de tu servicio' 
                : 'Añade un nuevo servicio a tu catálogo'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="service-name">Nombre del servicio *</Label>
              <Input
                id="service-name"
                placeholder="Ej: Sesión de fotos pre-boda"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-category">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({...formData, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fotografía">Fotografía</SelectItem>
                    <SelectItem value="Corporativo">Corporativo</SelectItem>
                    <SelectItem value="Familiar">Familiar</SelectItem>
                    <SelectItem value="Eventos">Eventos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service-price">Precio (€) *</Label>
                <Input
                  id="service-price"
                  type="number"
                  placeholder="300"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service-duration">Duración</Label>
              <Input
                id="service-duration"
                placeholder="Ej: 2 horas, 1 día, 1 semana"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service-description">Descripción</Label>
              <Textarea
                id="service-description"
                placeholder="Describe los detalles de tu servicio..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service-status">Estado</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({...formData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveService} className="bg-wedding-sage hover:bg-wedding-sage/90">
              {selectedService ? 'Guardar cambios' : 'Crear servicio'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProviderLayout>
  );
};

export default ProviderServices;
