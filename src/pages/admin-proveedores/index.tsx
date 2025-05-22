
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, Eye, Edit, Trash } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock data for providers
const mockProviders = [
  {
    id: '1',
    name: 'Carlos Fotografía',
    type: 'Fotografía',
    email: 'carlos@fotografias.com',
    phone: '+34 612 345 678',
    location: 'Madrid',
    status: 'Verificado',
    rating: 4.8,
    registeredDate: '2023-05-10'
  },
  {
    id: '2',
    name: 'Delicias Catering',
    type: 'Catering',
    email: 'info@deliciascatering.com',
    phone: '+34 623 456 789',
    location: 'Barcelona',
    status: 'Verificado',
    rating: 4.5,
    registeredDate: '2023-06-15'
  },
  {
    id: '3',
    name: 'Melodía Musical',
    type: 'Música',
    email: 'contacto@melodia.com',
    phone: '+34 634 567 890',
    location: 'Valencia',
    status: 'Pendiente',
    rating: 0,
    registeredDate: '2024-01-20'
  },
  {
    id: '4',
    name: 'Decoraciones Elegantes',
    type: 'Decoración',
    email: 'info@decoracioneselegantes.com',
    phone: '+34 645 678 901',
    location: 'Sevilla',
    status: 'Verificado',
    rating: 4.3,
    registeredDate: '2023-09-01'
  },
  {
    id: '5',
    name: 'Salón Real',
    type: 'Lugar',
    email: 'reservas@salonreal.com',
    phone: '+34 656 789 012',
    location: 'Madrid',
    status: 'Suspendido',
    rating: 3.9,
    registeredDate: '2023-04-12'
  }
];

const AdminProveedores = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [providers, setProviders] = useState(mockProviders);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // Filter providers based on search term and filters
  const filteredProviders = providers.filter(
    provider => 
      (provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       provider.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter ? provider.status === statusFilter : true) &&
      (typeFilter ? provider.type === typeFilter : true)
  );

  const handleDeleteProvider = (id: string) => {
    setProviders(providers.filter(provider => provider.id !== id));
    toast({
      title: "Proveedor eliminado",
      description: "El proveedor ha sido eliminado con éxito",
      duration: 3000
    });
  };

  const handleViewProvider = (id: string) => {
    toast({
      title: "Ver proveedor",
      description: `Viendo detalles del proveedor ID: ${id}`,
      duration: 3000
    });
  };

  const handleEditProvider = (id: string) => {
    toast({
      title: "Editar proveedor",
      description: `Editando datos del proveedor ID: ${id}`,
      duration: 3000
    });
  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verificado':
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
          <h1 className="text-3xl font-bold tracking-tight">Proveedores</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gestione los proveedores de servicios de la plataforma.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar proveedores..."
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
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="Verificado">Verificado</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Suspendido">Suspendido</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Tipo de servicio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="Fotografía">Fotografía</SelectItem>
                  <SelectItem value="Catering">Catering</SelectItem>
                  <SelectItem value="Música">Música</SelectItem>
                  <SelectItem value="Decoración">Decoración</SelectItem>
                  <SelectItem value="Lugar">Lugar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Añadir Proveedor
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Valoración</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProviders.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{provider.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{provider.name}</div>
                            <div className="text-xs text-gray-500">{new Date(provider.registeredDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{provider.type}</TableCell>
                      <TableCell>
                        <div className="text-sm">{provider.email}</div>
                        <div className="text-xs text-gray-500">{provider.phone}</div>
                      </TableCell>
                      <TableCell>{provider.location}</TableCell>
                      <TableCell>
                        {provider.status !== 'Pendiente' ? (
                          <div className="flex items-center">
                            <span className="mr-1">{provider.rating.toFixed(1)}</span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </div>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(provider.status)}>
                          {provider.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleViewProvider(provider.id)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditProvider(provider.id)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500"
                            onClick={() => handleDeleteProvider(provider.id)}
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
            {filteredProviders.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                No se encontraron proveedores con los criterios de búsqueda.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

// Star icon for ratings
const Star = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default AdminProveedores;
