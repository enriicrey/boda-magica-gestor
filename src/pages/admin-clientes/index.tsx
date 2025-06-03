
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

// Mock data for clients
const mockClients = [
  {
    id: '1',
    name: 'Laura Martínez',
    email: 'laura@example.com',
    phone: '+34 612 345 678',
    status: 'Activo',
    eventType: 'Boda',
    eventDate: '2025-08-15',
    registeredDate: '2024-03-10'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    phone: '+34 623 456 789',
    status: 'Activo',
    eventType: 'Corporativo',
    eventDate: '2024-11-22',
    registeredDate: '2024-04-15'
  },
  {
    id: '3',
    name: 'Ana García',
    email: 'ana@example.com',
    phone: '+34 634 567 890',
    status: 'Inactivo',
    eventType: 'Cumpleaños',
    eventDate: '2024-09-05',
    registeredDate: '2024-01-20'
  },
  {
    id: '4',
    name: 'Miguel Sánchez',
    email: 'miguel@example.com',
    phone: '+34 645 678 901',
    status: 'Pendiente',
    eventType: 'Boda',
    eventDate: '2025-06-12',
    registeredDate: '2024-05-01'
  },
  {
    id: '5',
    name: 'Elena López',
    email: 'elena@example.com',
    phone: '+34 656 789 012',
    status: 'Activo',
    eventType: 'Aniversario',
    eventDate: '2024-08-10',
    registeredDate: '2024-02-12'
  }
];

const AdminClientes = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState(mockClients);
  const [statusFilter, setStatusFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');

  // Filter clients based on search term and filters
  const filteredClients = clients.filter(
    client => 
      (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       client.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' ? true : client.status === statusFilter) &&
      (eventFilter === 'all' ? true : client.eventType === eventFilter)
  );

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter(client => client.id !== id));
    toast({
      title: "Cliente eliminado",
      description: "El cliente ha sido eliminado con éxito",
      duration: 3000
    });
  };

  const handleViewClient = (id: string) => {
    toast({
      title: "Ver cliente",
      description: `Viendo detalles del cliente ID: ${id}`,
      duration: 3000
    });
  };

  const handleEditClient = (id: string) => {
    toast({
      title: "Editar cliente",
      description: `Editando datos del cliente ID: ${id}`,
      duration: 3000
    });
  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'activo':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'inactivo':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gestione los clientes registrados en la plataforma.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar clientes..."
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
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                </SelectContent>
              </Select>

              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Tipo de evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Boda">Boda</SelectItem>
                  <SelectItem value="Corporativo">Corporativo</SelectItem>
                  <SelectItem value="Cumpleaños">Cumpleaños</SelectItem>
                  <SelectItem value="Aniversario">Aniversario</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Añadir Cliente
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Tipo de evento</TableHead>
                    <TableHead>Fecha de evento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Registro</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{client.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{client.email}</div>
                        <div className="text-xs text-gray-500">{client.phone}</div>
                      </TableCell>
                      <TableCell>{client.eventType}</TableCell>
                      <TableCell>{new Date(client.eventDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(client.registeredDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleViewClient(client.id)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditClient(client.id)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500"
                            onClick={() => handleDeleteClient(client.id)}
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
            {filteredClients.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                No se encontraron clientes con los criterios de búsqueda.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminClientes;
