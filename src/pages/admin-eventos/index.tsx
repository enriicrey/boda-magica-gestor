
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Eye, Edit, Calendar, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const mockEvents = [
  {
    id: '1',
    title: 'Boda María & Carlos',
    client: 'María García',
    date: '2025-08-15',
    time: '17:00',
    venue: 'Villa Rosa',
    location: 'Madrid',
    guests: 120,
    status: 'Confirmado',
    budget: '€18,500',
    type: 'Boda',
    progress: 85
  },
  {
    id: '2',
    title: 'Evento Corporativo Empresa XYZ',
    client: 'Ana López (Empresa XYZ)',
    date: '2024-11-22',
    time: '19:30',
    venue: 'Hotel Palace',
    location: 'Barcelona',
    guests: 80,
    status: 'Confirmado',
    budget: '€12,000',
    type: 'Corporativo',
    progress: 60
  },
  {
    id: '3',
    title: 'Cumpleaños 50 - Elena',
    client: 'Elena Martínez',
    date: '2024-09-05',
    time: '20:00',
    venue: 'Restaurante El Jardín',
    location: 'Valencia',
    guests: 45,
    status: 'En planificación',
    budget: '€3,500',
    type: 'Cumpleaños',
    progress: 30
  },
  {
    id: '4',
    title: 'Boda Luis & Carmen',
    client: 'Luis Rodríguez',
    date: '2025-06-12',
    time: '16:00',
    venue: 'Finca Los Olivos',
    location: 'Sevilla',
    guests: 95,
    status: 'Pendiente',
    budget: '€15,200',
    type: 'Boda',
    progress: 15
  },
  {
    id: '5',
    title: 'Aniversario 25 años',
    client: 'Carmen Sánchez',
    date: '2024-08-10',
    time: '18:30',
    venue: 'Salón Real',
    location: 'Madrid',
    guests: 60,
    status: 'Completado',
    budget: '€8,000',
    type: 'Aniversario',
    progress: 100
  }
];

const AdminEventos = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState(mockEvents);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredEvents = events.filter(
    event => 
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       event.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
       event.venue.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || event.status === statusFilter) &&
      (typeFilter === 'all' || event.type === typeFilter)
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmado':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'en planificación':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'completado':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'cancelado':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'boda':
        return 'bg-pink-100 text-pink-800';
      case 'corporativo':
        return 'bg-blue-100 text-blue-800';
      case 'cumpleaños':
        return 'bg-orange-100 text-orange-800';
      case 'aniversario':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Eventos</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gestione todos los eventos programados en la plataforma.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar eventos..."
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
                  <SelectItem value="Confirmado">Confirmado</SelectItem>
                  <SelectItem value="En planificación">En planificación</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Completado">Completado</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Tipo" />
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
            Crear Evento
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha y Hora</TableHead>
                    <TableHead>Lugar</TableHead>
                    <TableHead>Invitados</TableHead>
                    <TableHead>Presupuesto</TableHead>
                    <TableHead>Progreso</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{event.title.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <Badge className={getTypeColor(event.type)} variant="secondary">
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{event.client}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="text-sm">{new Date(event.date).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-500">{event.time}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start space-x-1">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium">{event.venue}</div>
                            <div className="text-xs text-gray-500">{event.location}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{event.guests}</TableCell>
                      <TableCell className="font-medium">{event.budget}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${event.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{event.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
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
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredEvents.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                No se encontraron eventos con los criterios de búsqueda.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminEventos;
