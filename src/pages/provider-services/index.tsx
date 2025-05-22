
import React, { useState } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, Edit, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for services
const mockServices = [
  {
    id: '1',
    name: 'Fotografía de Boda Completa',
    category: 'Fotografía',
    price: 1500,
    description: 'Servicio completo de fotografía para bodas, incluye sesión pre-boda, ceremonia y recepción.',
    status: 'Activo',
    duration: '12 horas'
  },
  {
    id: '2',
    name: 'Video Documental de Ceremonia',
    category: 'Video',
    price: 1200,
    description: 'Grabación profesional de la ceremonia y edición de un video documental de 60 minutos.',
    status: 'Activo',
    duration: '6 horas'
  },
  {
    id: '3',
    name: 'Paquete de Impresión',
    category: 'Impresión',
    price: 350,
    description: 'Álbum impreso de 30 páginas con las mejores fotos seleccionadas por el cliente.',
    status: 'Activo',
    duration: 'N/A'
  },
  {
    id: '4',
    name: 'Sesión Pre-Boda',
    category: 'Fotografía',
    price: 300,
    description: 'Sesión fotográfica para parejas antes del día de la boda, en locación a elección.',
    status: 'Activo',
    duration: '2 horas'
  },
  {
    id: '5',
    name: 'Fotografía de Evento Corporativo',
    category: 'Fotografía',
    price: 800,
    description: 'Cobertura fotográfica para eventos empresariales, incluye edición y entrega digital.',
    status: 'Inactivo',
    duration: '4 horas'
  },
];

const ProviderServices = () => {
  const { toast } = useToast();
  const [view, setView] = useState<'table' | 'cards'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState(mockServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Fotografía',
    price: '',
    description: '',
    status: 'Activo',
    duration: ''
  });

  // Filter services based on search term
  const filteredServices = services.filter(
    service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddService = () => {
    setEditingService(null);
    setFormData({
      name: '',
      category: 'Fotografía',
      price: '',
      description: '',
      status: 'Activo',
      duration: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditService = (service: typeof services[0]) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category,
      price: service.price.toString(),
      description: service.description,
      status: service.status,
      duration: service.duration
    });
    setIsDialogOpen(true);
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Servicio eliminado",
      description: "El servicio ha sido eliminado con éxito",
      duration: 3000
    });
  };

  const handleSaveService = () => {
    if (!formData.name || !formData.price) {
      toast({
        title: "Error",
        description: "Por favor completa los campos obligatorios",
        variant: "destructive",
        duration: 3000
      });
      return;
    }

    if (editingService) {
      // Update existing service
      setServices(services.map(service => 
        service.id === editingService.id 
          ? { 
              ...service, 
              name: formData.name,
              category: formData.category,
              price: parseFloat(formData.price),
              description: formData.description,
              status: formData.status,
              duration: formData.duration
            } 
          : service
      ));
      toast({
        title: "Servicio actualizado",
        description: "El servicio ha sido actualizado con éxito",
        duration: 3000
      });
    } else {
      // Create new service
      const newService = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        status: formData.status,
        duration: formData.duration
      };
      setServices([...services, newService]);
      toast({
        title: "Servicio añadido",
        description: "El nuevo servicio ha sido añadido con éxito",
        duration: 3000
      });
    }
    setIsDialogOpen(false);
  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'activo':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'inactivo':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
      default:
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
    }
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Servicios</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Administra tus servicios y paquetes disponibles para clientes
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar servicios..."
                className="w-full bg-white pl-8 dark:bg-gray-950"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filtros
            </Button>
            <div className="flex items-center space-x-2">
              <Button 
                variant={view === 'table' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setView('table')}
              >
                Tabla
              </Button>
              <Button 
                variant={view === 'cards' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setView('cards')}
              >
                Tarjetas
              </Button>
            </div>
          </div>
          <Button onClick={handleAddService}>
            <Plus className="mr-2 h-4 w-4" />
            Añadir Servicio
          </Button>
        </div>

        {view === 'table' ? (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Duración</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>{service.category}</TableCell>
                      <TableCell>{service.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</TableCell>
                      <TableCell>{service.duration}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditService(service)}
                          >
                            <span className="sr-only">Editar</span>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <span className="sr-only">Eliminar</span>
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-md font-medium">{service.name}</CardTitle>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-2xl font-bold">
                        {service.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                      </p>
                      <p className="text-sm text-gray-500">{service.category}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-700">{service.description}</p>
                    </div>
                    
                    {service.duration !== 'N/A' && (
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <span>Duración:</span>
                        <span>{service.duration}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditService(service)}
                      >
                        <Edit className="mr-1 h-4 w-4" /> Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash className="mr-1 h-4 w-4" /> Eliminar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Dialog for adding/editing service */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Editar Servicio' : 'Añadir Nuevo Servicio'}</DialogTitle>
            <DialogDescription>
              {editingService 
                ? 'Modifica los detalles del servicio existente' 
                : 'Introduce los detalles para crear un nuevo servicio'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="service-name">Nombre del Servicio</Label>
              <Input
                id="service-name"
                placeholder="Nombre del servicio"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-category">Categoría</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({...formData, category: value})}
                >
                  <SelectTrigger id="service-category">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fotografía">Fotografía</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                    <SelectItem value="Impresión">Impresión</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service-status">Estado</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({...formData, status: value})}
                >
                  <SelectTrigger id="service-status">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-price">Precio (€)</Label>
                <Input
                  id="service-price"
                  type="number"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service-duration">Duración</Label>
                <Input
                  id="service-duration"
                  placeholder="ej. 2 horas, N/A"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="service-description">Descripción</Label>
              <Textarea
                id="service-description"
                placeholder="Descripción detallada del servicio..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSaveService}>{editingService ? 'Guardar Cambios' : 'Crear Servicio'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProviderLayout>
  );
};

export default ProviderServices;
