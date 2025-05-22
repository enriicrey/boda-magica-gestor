
import { useState } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for clients
const mockClients = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    email: 'carlos@example.com',
    phone: '+34 612 345 678',
    status: 'Activo',
    eventType: 'Boda',
    eventDate: '2025-08-15',
    totalSpent: 3500,
    lastContact: '2024-05-10'
  },
  {
    id: '2',
    name: 'Ana García',
    email: 'ana@example.com',
    phone: '+34 623 456 789',
    status: 'Pendiente',
    eventType: 'Cumpleaños',
    eventDate: '2024-06-22',
    totalSpent: 850,
    lastContact: '2024-05-15'
  },
  {
    id: '3',
    name: 'Miguel Fernández',
    email: 'miguel@example.com',
    phone: '+34 634 567 890',
    status: 'Completado',
    eventType: 'Corporativo',
    eventDate: '2024-04-05',
    totalSpent: 12000,
    lastContact: '2024-04-10'
  },
  {
    id: '4',
    name: 'Lucía Martínez',
    email: 'lucia@example.com',
    phone: '+34 645 678 901',
    status: 'Activo',
    eventType: 'Boda',
    eventDate: '2025-03-12',
    totalSpent: 6500,
    lastContact: '2024-05-01'
  },
  {
    id: '5',
    name: 'David Sánchez',
    email: 'david@example.com',
    phone: '+34 656 789 012',
    status: 'Pendiente',
    eventType: 'Aniversario',
    eventDate: '2024-09-10',
    totalSpent: 950,
    lastContact: '2024-05-12'
  }
];

const ProviderClients = () => {
  const { toast } = useToast();
  const [view, setView] = useState<'table' | 'cards'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState(mockClients);

  // Filter clients based on search term
  const filteredClients = clients.filter(
    client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.eventType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    toast({
      title: "Función en desarrollo",
      description: "La función para agregar clientes estará disponible próximamente.",
      duration: 3000
    });
  };

  const handleDeleteClient = (id: string) => {
    setClients(clients.filter(client => client.id !== id));
    toast({
      title: "Cliente eliminado",
      description: "El cliente ha sido eliminado con éxito",
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'activo':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'completado':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gestiona tus clientes, sus eventos y comunicaciones.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar clientes..."
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
          <Button onClick={handleAddClient}>
            <UserPlus className="mr-2 h-4 w-4" />
            Añadir Cliente
          </Button>
        </div>

        {view === 'table' ? (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Evento</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Último contacto</TableHead>
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
                            <div className="text-gray-500 text-xs">{client.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{client.eventType}</TableCell>
                      <TableCell>{new Date(client.eventDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{client.totalSpent.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</TableCell>
                      <TableCell>{new Date(client.lastContact).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditClient(client.id)}
                          >
                            <span className="sr-only">Editar</span>
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
                              className="h-4 w-4"
                            >
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                              <path d="m15 5 4 4"></path>
                            </svg>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500"
                            onClick={() => handleDeleteClient(client.id)}
                          >
                            <span className="sr-only">Eliminar</span>
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
                              className="h-4 w-4"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                              <line x1="10" x2="10" y1="11" y2="17"></line>
                              <line x1="14" x2="14" y1="11" y2="17"></line>
                            </svg>
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((client) => (
              <Card key={client.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {client.name}
                  </CardTitle>
                  <Badge className={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <Avatar>
                      <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm">{client.email}</div>
                      <div className="text-sm text-gray-500">{client.phone}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Evento:</span>
                      <span className="text-sm">{client.eventType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Fecha:</span>
                      <span className="text-sm">{new Date(client.eventDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Total:</span>
                      <span className="text-sm font-medium">{client.totalSpent.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditClient(client.id)}>
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDeleteClient(client.id)}>
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProviderLayout>
  );
};

export default ProviderClients;
