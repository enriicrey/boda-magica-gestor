
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, Plus, Edit, Trash, Heart, MoreHorizontal, Mail, Phone, Calendar, ArrowUpRight, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Tipo para cliente
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'active' | 'pending' | 'inactive';
  weddingDate: string;
  budget: number;
  location: string;
  notes: string;
  lastContact: string;
  services: string[];
  favorite: boolean;
}

// Tipo para filtros
interface Filters {
  status: string | null;
  search: string;
  weddingDate: string | null;
}

const ProviderClients = () => {
  // Estados para gestionar datos y UI
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [filters, setFilters] = useState<Filters>({
    status: null,
    search: '',
    weddingDate: null,
  });
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('weddingDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Datos simulados para proveedores
  const providerData = {
    name: "Studio Fotográfico Martínez",
    totalClients: 42,
    pendingClients: 8,
    activeClients: 30,
    inactiveClients: 4,
    upcomingWeddings: 5,
  };

  // Generar datos simulados de clientes
  useEffect(() => {
    // Datos de clientes simulados
    const mockClients: Client[] = [
      {
        id: 1,
        name: 'María García',
        email: 'maria.garcia@example.com',
        phone: '612 345 678',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'active',
        weddingDate: '2025-09-15',
        budget: 15000,
        location: 'Madrid',
        notes: 'Interesada en un reportaje completo con álbum digital.',
        lastContact: '2025-05-10',
        services: ['Fotografia Boda Completa', 'Sesión Pre-boda'],
        favorite: true
      },
      {
        id: 2,
        name: 'Pedro Sánchez',
        email: 'pedro.sanchez@example.com',
        phone: '623 456 789',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'active',
        weddingDate: '2025-11-22',
        budget: 18000,
        location: 'Barcelona',
        notes: 'Pareja muy detallista, quieren álbum personalizado y video en 4K.',
        lastContact: '2025-05-12',
        services: ['Fotografia Boda Completa', 'Videografía', 'Álbum Premium'],
        favorite: false
      },
      {
        id: 3,
        name: 'Laura Martínez',
        email: 'laura.martinez@example.com',
        phone: '634 567 890',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'pending',
        weddingDate: '2026-03-08',
        budget: 12000,
        location: 'Valencia',
        notes: 'Primera reunión pendiente. Interesada en paquete básico.',
        lastContact: '2025-05-05',
        services: ['Consulta Inicial'],
        favorite: false
      },
      {
        id: 4,
        name: 'Javier López',
        email: 'javier.lopez@example.com',
        phone: '645 678 901',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'inactive',
        weddingDate: '2025-06-20',
        budget: 10000,
        location: 'Sevilla',
        notes: 'Canceló el servicio por motivos personales.',
        lastContact: '2025-04-28',
        services: [],
        favorite: false
      },
      {
        id: 5,
        name: 'Ana Rodríguez',
        email: 'ana.rodriguez@example.com',
        phone: '656 789 012',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'active',
        weddingDate: '2025-08-01',
        budget: 20000,
        location: 'Madrid',
        notes: 'Quiere fotos artísticas en blanco y negro, estilo minimalista.',
        lastContact: '2025-05-15',
        services: ['Fotografia Boda Completa', 'Sesión Post-boda'],
        favorite: true
      },
      {
        id: 6,
        name: 'Carlos Gómez',
        email: 'carlos.gomez@example.com',
        phone: '667 890 123',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'pending',
        weddingDate: '2026-05-10',
        budget: 15000,
        location: 'Bilbao',
        notes: 'Pendiente de confirmación final de servicios.',
        lastContact: '2025-04-30',
        services: ['Consulta Inicial'],
        favorite: false
      },
      {
        id: 7,
        name: 'Elena Fernández',
        email: 'elena.fernandez@example.com',
        phone: '678 901 234',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'active',
        weddingDate: '2025-10-05',
        budget: 12500,
        location: 'Málaga',
        notes: 'Boda íntima, máximo 50 invitados. Estilo reportaje periodístico.',
        lastContact: '2025-05-08',
        services: ['Fotografia Boda (4h)', 'Álbum Digital'],
        favorite: false
      },
      {
        id: 8,
        name: 'Antonio Ruiz',
        email: 'antonio.ruiz@example.com',
        phone: '689 012 345',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'active',
        weddingDate: '2025-06-12',
        budget: 22000,
        location: 'Madrid',
        notes: 'Boda de lujo, necesita cobertura completa de eventos previos también.',
        lastContact: '2025-05-18',
        services: ['Fotografia Boda Completa', 'Videografía', 'Sesión Pre-boda', 'Álbum Premium'],
        favorite: true
      },
    ];
    
    setClients(mockClients);
    setFilteredClients(mockClients);
  }, []);

  // Efecto para filtrar clientes basado en filtros aplicados
  useEffect(() => {
    let result = [...clients];
    
    // Aplicar filtro de búsqueda
    if (filters.search) {
      result = result.filter(
        client => 
          client.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          client.email.toLowerCase().includes(filters.search.toLowerCase()) ||
          client.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    // Aplicar filtro de estado
    if (filters.status) {
      result = result.filter(client => client.status === filters.status);
    }
    
    // Aplicar filtro de fecha de boda
    if (filters.weddingDate) {
      const currentDate = new Date();
      const threeMonths = new Date();
      threeMonths.setMonth(currentDate.getMonth() + 3);
      const sixMonths = new Date();
      sixMonths.setMonth(currentDate.getMonth() + 6);
      
      switch (filters.weddingDate) {
        case '3months':
          result = result.filter(client => new Date(client.weddingDate) <= threeMonths);
          break;
        case '6months':
          result = result.filter(client => 
            new Date(client.weddingDate) > threeMonths && 
            new Date(client.weddingDate) <= sixMonths
          );
          break;
        case 'future':
          result = result.filter(client => new Date(client.weddingDate) > sixMonths);
          break;
      }
    }
    
    // Ordenar resultados
    result = result.sort((a, b) => {
      if (sortBy === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'weddingDate') {
        return sortDirection === 'asc' 
          ? new Date(a.weddingDate).getTime() - new Date(b.weddingDate).getTime() 
          : new Date(b.weddingDate).getTime() - new Date(a.weddingDate).getTime();
      } else if (sortBy === 'budget') {
        return sortDirection === 'asc' 
          ? a.budget - b.budget 
          : b.budget - a.budget;
      }
      return 0;
    });
    
    setFilteredClients(result);
  }, [clients, filters, sortBy, sortDirection]);

  // Funciones de manipulación de clientes
  const handleAddClient = () => {
    setSelectedClient(null);
    setIsAddDialogOpen(true);
  };
  
  const handleEditClient = (client: Client) => {
    setSelectedClient({...client});
    setIsEditDialogOpen(true);
  };
  
  const handleViewClient = (client: Client) => {
    setSelectedClient({...client});
    setIsViewDialogOpen(true);
  };
  
  const handleDeleteClient = (client: Client) => {
    setSelectedClient({...client});
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDeleteClient = () => {
    if (selectedClient) {
      setClients(clients.filter(c => c.id !== selectedClient.id));
      toast.success(`Cliente ${selectedClient.name} eliminado correctamente`);
      setIsDeleteDialogOpen(false);
      setSelectedClient(null);
    }
  };
  
  const handleSaveClient = () => {
    if (selectedClient) {
      // Editar cliente existente
      setClients(clients.map(c => c.id === selectedClient.id ? selectedClient : c));
      toast.success(`Cliente ${selectedClient.name} actualizado correctamente`);
      setIsEditDialogOpen(false);
    } else {
      // Añadir nuevo cliente
      const newNameElement = document.getElementById('add-name') as HTMLInputElement;
      const newEmailElement = document.getElementById('add-email') as HTMLInputElement;
      const newPhoneElement = document.getElementById('add-phone') as HTMLInputElement;
      const newWeddingDateElement = document.getElementById('add-wedding-date') as HTMLInputElement;
      const newBudgetElement = document.getElementById('add-budget') as HTMLInputElement;
      const newLocationElement = document.getElementById('add-location') as HTMLInputElement;
      const newNotesElement = document.getElementById('add-notes') as HTMLTextAreaElement;
      
      const newClient: Client = {
        id: Math.max(0, ...clients.map(c => c.id)) + 1,
        name: newNameElement?.value as string || 'Nuevo Cliente',
        email: newEmailElement?.value as string || 'nuevo@ejemplo.com',
        phone: newPhoneElement?.value as string || '600 000 000',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'pending',
        weddingDate: newWeddingDateElement?.value as string || new Date().toISOString().split('T')[0],
        budget: Number(newBudgetElement?.value) || 10000,
        location: newLocationElement?.value as string || 'Madrid',
        notes: newNotesElement?.value as string || '',
        lastContact: new Date().toISOString().split('T')[0],
        services: ['Consulta Inicial'],
        favorite: false
      };
      
      setClients([...clients, newClient]);
      toast.success('Nuevo cliente añadido correctamente');
    }
    setIsAddDialogOpen(false);
  };
  
  const toggleFavorite = (client: Client) => {
    setClients(
      clients.map(c => 
        c.id === client.id 
          ? {...c, favorite: !c.favorite} 
          : c
      )
    );
    toast.success(client.favorite 
      ? `${client.name} quitado de favoritos`
      : `${client.name} añadido a favoritos`
    );
  };
  
  const handleChangeStatus = (client: Client, status: 'active' | 'pending' | 'inactive') => {
    setClients(
      clients.map(c => 
        c.id === client.id 
          ? {...c, status} 
          : c
      )
    );
    
    toast.success(`Estado de ${client.name} actualizado a ${
      status === 'active' ? 'Activo' : 
      status === 'pending' ? 'Pendiente' : 
      'Inactivo'
    }`);
  };
  
  const sendEmail = (client: Client) => {
    toast.success(`Correo enviado a ${client.name}`);
  };
  
  // Funciones para formatear fechas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  const getTimeUntilWedding = (dateString: string) => {
    const weddingDate = new Date(dateString);
    const today = new Date();
    
    const diffTime = weddingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return 'Celebrada';
    } else if (diffDays === 0) {
      return 'Hoy';
    } else if (diffDays === 1) {
      return 'Mañana';
    } else if (diffDays < 30) {
      return `${diffDays} días`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'mes' : 'meses'}`;
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      return `${years} ${years === 1 ? 'año' : 'años'}${remainingMonths > 0 ? ` y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}` : ''}`;
    }
  };
  
  // Renderizar color basado en estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  const getStatusName = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'pending':
        return 'Pendiente';
      case 'inactive':
        return 'Inactivo';
      default:
        return status;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header del dashboard */}
      <DashboardHeader />
      
      <main className="flex-grow py-8">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-serif font-semibold">Gestión de Clientes</h1>
            <Button className="bg-wedding-sage hover:bg-wedding-sage/90" onClick={handleAddClient}>
              <Plus className="mr-1 h-4 w-4" /> Añadir Cliente
            </Button>
          </div>
          
          {/* Cards de estadísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Clientes</p>
                    <p className="text-3xl font-bold">{providerData.totalClients}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Clientes Activos</p>
                    <p className="text-3xl font-bold">{providerData.activeClients}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Clientes Pendientes</p>
                    <p className="text-3xl font-bold">{providerData.pendingClients}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Próximas Bodas</p>
                    <p className="text-3xl font-bold">{providerData.upcomingWeddings}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Filtros y búsqueda */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Buscar cliente..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    className="pl-10"
                  />
                </div>
                
                <Select 
                  value={filters.status || ""}
                  onValueChange={(value) => setFilters({...filters, status: value || null})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos los estados</SelectItem>
                    <SelectItem value="active">Activos</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                    <SelectItem value="inactive">Inactivos</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={filters.weddingDate || ""}
                  onValueChange={(value) => setFilters({...filters, weddingDate: value || null})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Fecha de boda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas las fechas</SelectItem>
                    <SelectItem value="3months">Próximos 3 meses</SelectItem>
                    <SelectItem value="6months">3-6 meses</SelectItem>
                    <SelectItem value="future">Más de 6 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          {/* Lista de clientes */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Listado de Clientes</CardTitle>
              <CardDescription>
                Gestiona tus clientes, filtra la información y realiza acciones
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="table" className="mb-4">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="table">Tabla</TabsTrigger>
                  <TabsTrigger value="cards">Tarjetas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="table">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">Favorito</TableHead>
                          <TableHead className="min-w-[150px]">Cliente</TableHead>
                          <TableHead className="hidden md:table-cell">Contacto</TableHead>
                          <TableHead>
                            <div className="flex items-center cursor-pointer" onClick={() => {
                              if (sortBy === 'weddingDate') {
                                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                              } else {
                                setSortBy('weddingDate');
                                setSortDirection('asc');
                              }
                            }}>
                              Fecha Boda
                              {sortBy === 'weddingDate' && (
                                <ArrowUpRight className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                              )}
                            </div>
                          </TableHead>
                          <TableHead className="hidden lg:table-cell">
                            <div className="flex items-center cursor-pointer" onClick={() => {
                              if (sortBy === 'budget') {
                                setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                              } else {
                                setSortBy('budget');
                                setSortDirection('asc');
                              }
                            }}>
                              Presupuesto
                              {sortBy === 'budget' && (
                                <ArrowUpRight className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                              )}
                            </div>
                          </TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredClients.map((client) => (
                          <TableRow key={client.id}>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className={`h-8 w-8 p-0 ${client.favorite ? 'text-red-500' : 'text-gray-300'}`}
                                onClick={() => toggleFavorite(client)}
                              >
                                <Heart fill={client.favorite ? "currentColor" : "none"} size={18} />
                              </Button>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarImage src={client.avatar} alt={client.name} />
                                  <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{client.name}</div>
                                  <div className="text-sm text-gray-500">{client.location}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="text-sm">
                                <div className="flex items-center">
                                  <Mail className="mr-1 h-3 w-3" /> {client.email}
                                </div>
                                <div className="flex items-center mt-1">
                                  <Phone className="mr-1 h-3 w-3" /> {client.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{formatDate(client.weddingDate)}</div>
                                <div className="text-xs text-gray-500">
                                  {getTimeUntilWedding(client.weddingDate)}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <div className="font-medium">{client.budget.toLocaleString('es-ES')} €</div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(client.status)}>
                                {getStatusName(client.status)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 p-0 text-blue-600"
                                  onClick={() => handleViewClient(client)}
                                >
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </Button>
                                
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8 p-0"
                                    >
                                      <MoreHorizontal size={16} />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => sendEmail(client)}>
                                      <Mail className="mr-2 h-4 w-4" /> Enviar email
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleEditClient(client)}>
                                      <Edit className="mr-2 h-4 w-4" /> Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleChangeStatus(client, 'active')}>
                                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> Marcar activo
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleChangeStatus(client, 'pending')}>
                                      <AlertCircle className="mr-2 h-4 w-4 text-yellow-600" /> Marcar pendiente
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleChangeStatus(client, 'inactive')}>
                                      <XCircle className="mr-2 h-4 w-4 text-gray-600" /> Marcar inactivo
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      onClick={() => handleDeleteClient(client)}
                                      className="text-red-600"
                                    >
                                      <Trash className="mr-2 h-4 w-4" /> Eliminar
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        
                        {filteredClients.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              No se encontraron clientes con los criterios seleccionados.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="cards">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredClients.map((client) => (
                      <Card key={client.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2 pt-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <Avatar className="h-12 w-12 mr-3">
                                <AvatarImage src={client.avatar} alt={client.name} />
                                <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg">{client.name}</CardTitle>
                                <div className="flex space-x-2 mt-1">
                                  <Badge className={getStatusColor(client.status)}>
                                    {getStatusName(client.status)}
                                  </Badge>
                                  {client.favorite && (
                                    <Badge variant="outline" className="border-red-200 text-red-700">
                                      <Heart className="h-3 w-3 mr-1 fill-current" /> Favorito
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewClient(client)}>
                                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  Ver detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditClient(client)}>
                                  <Edit className="mr-2 h-4 w-4" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleFavorite(client)}>
                                  <Heart className="mr-2 h-4 w-4" fill={client.favorite ? "currentColor" : "none"} />
                                  {client.favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleDeleteClient(client)} className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" /> Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pb-2">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-gray-500">Fecha boda</p>
                              <p className="font-medium">{formatDate(client.weddingDate)}</p>
                              <p className="text-xs text-gray-500">{getTimeUntilWedding(client.weddingDate)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Presupuesto</p>
                              <p className="font-medium">{client.budget.toLocaleString('es-ES')} €</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Email</p>
                              <p className="font-medium truncate">{client.email}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Teléfono</p>
                              <p className="font-medium">{client.phone}</p>
                            </div>
                          </div>
                          
                          {client.services.length > 0 && (
                            <div className="mt-4">
                              <p className="text-gray-500 mb-2">Servicios</p>
                              <div className="flex flex-wrap gap-1">
                                {client.services.map((service, index) => (
                                  <Badge key={index} variant="outline" className="text-xs bg-blue-50">
                                    {service}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                        
                        <CardFooter className="pt-2 flex justify-between">
                          <Button variant="ghost" size="sm" onClick={() => sendEmail(client)}>
                            <Mail className="mr-1 h-4 w-4" /> Email
                          </Button>
                          <Button 
                            className="bg-wedding-sage hover:bg-wedding-sage/90" 
                            size="sm"
                            onClick={() => handleViewClient(client)}
                          >
                            Ver detalles
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                    
                    {filteredClients.length === 0 && (
                      <div className="col-span-full flex justify-center items-center h-32">
                        <p className="text-gray-500">No se encontraron clientes con los criterios seleccionados.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
      
      {/* Modal para ver detalles de cliente */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalles del Cliente</DialogTitle>
            <DialogDescription>
              Información completa del cliente
            </DialogDescription>
          </DialogHeader>
          
          {selectedClient && (
            <div className="py-4">
              <div className="flex items-center mb-6">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src={selectedClient.avatar} alt={selectedClient.name} />
                  <AvatarFallback>{selectedClient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedClient.name}</h3>
                  <div className="flex items-center mt-1">
                    <Badge className={getStatusColor(selectedClient.status)}>
                      {getStatusName(selectedClient.status)}
                    </Badge>
                    {selectedClient.favorite && (
                      <Badge variant="outline" className="ml-2 border-red-200 text-red-700">
                        <Heart className="h-3 w-3 mr-1 fill-current" /> Favorito
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{selectedClient.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Teléfono</p>
                  <p className="font-medium">{selectedClient.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Fecha de boda</p>
                  <p className="font-medium">{formatDate(selectedClient.weddingDate)}</p>
                  <p className="text-xs text-gray-500">{getTimeUntilWedding(selectedClient.weddingDate)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Presupuesto</p>
                  <p className="font-medium">{selectedClient.budget.toLocaleString('es-ES')} €</p>
                </div>
                <div>
                  <p className="text-gray-500">Ubicación</p>
                  <p className="font-medium">{selectedClient.location}</p>
                </div>
                <div>
                  <p className="text-gray-500">Último contacto</p>
                  <p className="font-medium">{formatDate(selectedClient.lastContact)}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-500 mb-2">Servicios contratados</p>
                {selectedClient.services.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedClient.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50">
                        {service}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">Sin servicios contratados</p>
                )}
              </div>
              
              <div>
                <p className="text-gray-500 mb-2">Notas</p>
                <div className="border rounded-md p-3 bg-gray-50">
                  {selectedClient.notes || <span className="text-gray-400 italic">Sin notas</span>}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setIsViewDialogOpen(false);
                  if (selectedClient) {
                    handleEditClient(selectedClient);
                  }
                }}
              >
                <Edit className="mr-1 h-4 w-4" /> Editar
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => selectedClient && sendEmail(selectedClient)}
              >
                <Mail className="mr-1 h-4 w-4" /> Enviar Email
              </Button>
            </div>
            <Button onClick={() => setIsViewDialogOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal para editar cliente */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>
              Modifica la información del cliente
            </DialogDescription>
          </DialogHeader>
          
          {selectedClient && (
            <div className="py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nombre completo</Label>
                  <Input 
                    id="edit-name" 
                    value={selectedClient.name}
                    onChange={(e) => setSelectedClient({...selectedClient, name: e.target.value})}
                    placeholder="Nombre completo" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input 
                    id="edit-email" 
                    value={selectedClient.email}
                    onChange={(e) => setSelectedClient({...selectedClient, email: e.target.value})}
                    placeholder="Email" 
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Teléfono</Label>
                  <Input 
                    id="edit-phone" 
                    value={selectedClient.phone}
                    onChange={(e) => setSelectedClient({...selectedClient, phone: e.target.value})}
                    placeholder="Teléfono" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Ubicación</Label>
                  <Input 
                    id="edit-location" 
                    value={selectedClient.location}
                    onChange={(e) => setSelectedClient({...selectedClient, location: e.target.value})}
                    placeholder="Ciudad, provincia" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-wedding-date">Fecha de boda</Label>
                  <Input 
                    id="edit-wedding-date" 
                    value={selectedClient.weddingDate}
                    onChange={(e) => setSelectedClient({...selectedClient, weddingDate: e.target.value})}
                    placeholder="YYYY-MM-DD" 
                    type="date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-budget">Presupuesto (€)</Label>
                  <Input 
                    id="edit-budget" 
                    value={selectedClient.budget}
                    onChange={(e) => setSelectedClient({...selectedClient, budget: parseInt(e.target.value) || 0})}
                    placeholder="Presupuesto" 
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Estado</Label>
                  <Select 
                    value={selectedClient.status}
                    onValueChange={(value: any) => setSelectedClient({...selectedClient, status: value})}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-favorite">Favorito</Label>
                  <Select 
                    value={selectedClient.favorite ? "yes" : "no"}
                    onValueChange={(value) => setSelectedClient({...selectedClient, favorite: value === "yes"})}
                  >
                    <SelectTrigger id="edit-favorite">
                      <SelectValue placeholder="Es favorito?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="edit-notes">Notas</Label>
                  <Textarea 
                    id="edit-notes" 
                    value={selectedClient.notes}
                    onChange={(e) => setSelectedClient({...selectedClient, notes: e.target.value})}
                    placeholder="Notas sobre el cliente" 
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-wedding-sage hover:bg-wedding-sage/90" 
              onClick={() => {
                setIsEditDialogOpen(false);
                if (selectedClient) {
                  setClients(clients.map(c => c.id === selectedClient.id ? selectedClient : c));
                  toast.success(`Cliente ${selectedClient.name} actualizado correctamente`);
                }
              }}
            >
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal para añadir cliente */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Cliente</DialogTitle>
            <DialogDescription>
              Completa la información para añadir un nuevo cliente a tu cartera
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-name">Nombre completo</Label>
                <Input 
                  id="add-name" 
                  placeholder="Nombre completo" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-email">Email</Label>
                <Input 
                  id="add-email" 
                  placeholder="Email" 
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-phone">Teléfono</Label>
                <Input 
                  id="add-phone" 
                  placeholder="Teléfono" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-location">Ubicación</Label>
                <Input 
                  id="add-location" 
                  placeholder="Ciudad, provincia" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-wedding-date">Fecha de boda</Label>
                <Input 
                  id="add-wedding-date" 
                  placeholder="YYYY-MM-DD" 
                  type="date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-budget">Presupuesto (€)</Label>
                <Input 
                  id="add-budget" 
                  placeholder="Presupuesto" 
                  type="number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-status">Estado</Label>
                <Select defaultValue="pending">
                  <SelectTrigger id="add-status">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-services">Servicios interesados</Label>
                <Select>
                  <SelectTrigger id="add-services">
                    <SelectValue placeholder="Selecciona servicios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consulta">Consulta Inicial</SelectItem>
                    <SelectItem value="boda-completa">Fotografía Boda Completa</SelectItem>
                    <SelectItem value="preboda">Sesión Pre-boda</SelectItem>
                    <SelectItem value="postboda">Sesión Post-boda</SelectItem>
                    <SelectItem value="video">Videografía</SelectItem>
                    <SelectItem value="album">Álbum Digital</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="add-notes">Notas</Label>
                <Textarea 
                  id="add-notes" 
                  placeholder="Notas sobre el cliente" 
                  rows={4}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-wedding-sage hover:bg-wedding-sage/90" 
              onClick={handleSaveClient}
            >
              Añadir cliente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal para confirmar eliminación */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar a <strong>{selectedClient?.name}</strong> de tu lista de clientes? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteClient}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProviderClients;
