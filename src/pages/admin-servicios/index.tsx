
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Eye, Edit, Trash, Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const mockServices = [
  {
    id: '1',
    name: 'Paquete Fotografía Premium',
    provider: 'Carlos Jiménez Fotografía',
    category: 'Fotografía',
    price: '€1,800',
    priceType: 'por evento',
    status: 'Activo',
    rating: 4.9,
    bookings: 24,
    location: 'Madrid',
    dateAdded: '2024-01-15'
  },
  {
    id: '2',
    name: 'Ceremonias en Villa Rosa',
    provider: 'Villa Rosa Events',
    category: 'Lugar',
    price: '€8,500',
    priceType: 'por día',
    status: 'Activo',
    rating: 4.8,
    bookings: 18,
    location: 'Madrid',
    dateAdded: '2023-12-10'
  },
  {
    id: '3',
    name: 'Menú Degustación Premium',
    provider: 'Catering Deluxe',
    category: 'Catering',
    price: '€85',
    priceType: 'por persona',
    status: 'Activo',
    rating: 4.7,
    bookings: 32,
    location: 'Barcelona',
    dateAdded: '2024-02-20'
  },
  {
    id: '4',
    name: 'Decoración Floral Completa',
    provider: 'Flores Mágicas',
    category: 'Decoración',
    price: '€2,400',
    priceType: 'por evento',
    status: 'Pendiente',
    rating: 0,
    bookings: 0,
    location: 'Valencia',
    dateAdded: '2024-06-01'
  },
  {
    id: '5',
    name: 'DJ y Sonido Profesional',
    provider: 'Music Events Pro',
    category: 'Música',
    price: '€1,200',
    priceType: 'por evento',
    status: 'Suspendido',
    rating: 4.3,
    bookings: 15,
    location: 'Sevilla',
    dateAdded: '2024-03-08'
  }
];

const AdminServicios = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState(mockServices);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredServices = services.filter(
    service => 
      (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
       service.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || service.status === statusFilter) &&
      (categoryFilter === 'all' || service.category === categoryFilter)
  );

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Servicio eliminado",
      description: "El servicio ha sido eliminado con éxito",
      duration: 3000
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'activo':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'suspendido':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Servicios</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gestione todos los servicios disponibles en la plataforma.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar servicios..."
                className="w-full bg-white pl-8 dark:bg-gray-950"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex w-full sm:w-auto gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Suspendido">Suspendido</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Fotografía">Fotografía</SelectItem>
                  <SelectItem value="Lugar">Lugar</SelectItem>
                  <SelectItem value="Catering">Catering</SelectItem>
                  <SelectItem value="Decoración">Decoración</SelectItem>
                  <SelectItem value="Música">Música</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Añadir Servicio
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Servicio</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Valoración</TableHead>
                    <TableHead>Reservas</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{service.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-xs text-gray-500">{service.location}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{service.provider}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{service.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{service.price}</div>
                          <div className="text-xs text-gray-500">{service.priceType}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {service.status !== 'Pendiente' ? (
                          <div className="flex items-center">
                            <span className="mr-1">{service.rating.toFixed(1)}</span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </div>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{service.bookings}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredServices.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                No se encontraron servicios con los criterios de búsqueda.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminServicios;
