import React, { useState } from 'react';
import { toast } from 'sonner';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Plus, Edit, Trash, Clock, Users, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

// Interfaces para tipos de datos
interface Event {
  id: number;
  title: string;
  date: Date;
  startTime: string;
  endTime?: string;
  clientName?: string;
  clientEmail?: string;
  location?: string;
  description?: string;
  type: 'booking' | 'consultation' | 'wedding' | 'other';
  status: 'confirmed' | 'pending' | 'canceled';
  isAllDay?: boolean;
}

const ProviderCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Sesión de fotos pre-boda',
      date: new Date(2025, 5, 15),
      startTime: '16:00',
      endTime: '18:00',
      clientName: 'María García',
      clientEmail: 'maria@example.com',
      location: 'Parque del Retiro, Madrid',
      description: 'Sesión de 2 horas en el parque',
      type: 'booking',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Consulta inicial',
      date: new Date(2025, 5, 20),
      startTime: '10:30',
      endTime: '11:30',
      clientName: 'Pedro Sánchez',
      clientEmail: 'pedro@example.com',
      location: 'Estudio fotográfico',
      description: 'Primera reunión para discutir servicios para boda',
      type: 'consultation',
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Boda completa',
      date: new Date(2025, 8, 15),
      startTime: '12:00',
      endTime: '23:00',
      clientName: 'Pedro Sánchez',
      clientEmail: 'pedro@example.com',
      location: 'Finca Villa Rosa, Madrid',
      description: 'Cobertura completa de ceremonia y banquete',
      type: 'wedding',
      status: 'confirmed',
      isAllDay: true
    },
    {
      id: 4,
      title: 'Consulta sobre servicios',
      date: new Date(2025, 6, 10),
      startTime: '17:00',
      endTime: '18:00',
      clientName: 'Laura Pérez',
      clientEmail: 'laura@example.com',
      location: 'Videollamada',
      description: 'Consulta para servicios de fotografía',
      type: 'consultation',
      status: 'pending'
    }
  ]);
  
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    date: new Date(),
    startTime: '10:00',
    endTime: '',
    clientName: '',
    clientEmail: '',
    location: '',
    description: '',
    type: 'booking',
    status: 'pending',
    isAllDay: false
  });
  
  const [isViewEventModalOpen, setIsViewEventModalOpen] = useState(false);
  
  // Filtrar eventos para la fecha seleccionada
  const eventsForSelectedDate = events.filter(event => 
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  );
  
  // Próximos eventos
  const upcomingEvents = events
    .filter(event => event.date >= new Date() && event.status !== 'canceled')
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Funciones para manejar eventos
  const handleAddEvent = () => {
    setSelectedEvent(null);
    setNewEvent({
      title: '',
      date: new Date(),
      startTime: '10:00',
      endTime: '',
      clientName: '',
      clientEmail: '',
      location: '',
      description: '',
      type: 'booking',
      status: 'pending',
      isAllDay: false
    });
    setIsEventModalOpen(true);
  };
  
  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setNewEvent({ ...event });
    setIsEventModalOpen(true);
  };
  
  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsViewEventModalOpen(true);
  };
  
  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast.success("Evento eliminado correctamente");
  };
  
  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.startTime) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    
    if (selectedEvent) {
      // Editar evento existente
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? { ...event, ...newEvent } as Event : event
      ));
      toast.success("Evento actualizado correctamente");
    } else {
      // Crear nuevo evento
      const newEventWithId = {
        ...newEvent,
        id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1
      } as Event;
      setEvents([...events, newEventWithId]);
      toast.success("Evento añadido correctamente");
    }
    
    setIsEventModalOpen(false);
  };
  
  const handleChangeEventStatus = (eventId: number, status: 'confirmed' | 'pending' | 'canceled') => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status } : event
    ));
    
    const statusText = status === 'confirmed' ? 'confirmado' : status === 'canceled' ? 'cancelado' : 'pendiente';
    toast.success(`Evento marcado como ${statusText}`);
    setIsViewEventModalOpen(false);
  };
  
  // Función para obtener los días con eventos para resaltarlos en el calendario
  const getEventDays = () => {
    const uniqueDays = new Set<string>();
    events.forEach(event => {
      uniqueDays.add(event.date.toDateString());
    });
    return [...uniqueDays].map(dateString => new Date(dateString));
  };
  
  // Función para obtener el color según el tipo de evento
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'bg-blue-100 text-blue-800';
      case 'consultation': return 'bg-purple-100 text-purple-800';
      case 'wedding': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Función para obtener el icono según el tipo de evento
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <CalendarIcon className="h-4 w-4 text-blue-600" />;
      case 'consultation':
        return <Users className="h-4 w-4 text-purple-600" />;
      case 'wedding':
        return (
          <svg className="h-4 w-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };
  
  // Función para obtener el color según el estado del evento
  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Función para formatear la fecha
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  // Función para obtener el nombre del tipo de evento
  const getEventTypeName = (type: string) => {
    switch (type) {
      case 'booking': return 'Reserva';
      case 'consultation': return 'Consulta';
      case 'wedding': return 'Boda';
      default: return 'Otro';
    }
  };
  
  // Función para obtener el nombre del estado del evento
  const getEventStatusName = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendiente';
      case 'canceled': return 'Cancelado';
      default: return 'Pendiente';
    }
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Calendario de Eventos</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gestiona todos tus eventos y citas
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <Button className="bg-wedding-sage hover:bg-wedding-sage/90 w-full sm:w-auto" onClick={handleAddEvent}>
            <Plus className="mr-1 h-4 w-4" /> Añadir Evento
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Calendario</CardTitle>
              <CardDescription>
                Gestiona todos tus eventos y citas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-md border shadow"
                    modifiers={{
                      event: getEventDays(),
                    }}
                    modifiersStyles={{
                      event: { 
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(178, 190, 181, 0.2)',
                        borderRadius: '4px',
                      }
                    }}
                  />
                </div>
                <div className="lg:w-1/2 space-y-4">
                  <h3 className="font-medium">
                    {formatDate(date)}
                  </h3>
                  
                  {eventsForSelectedDate.length > 0 ? (
                    <div className="space-y-3">
                      {eventsForSelectedDate.map((event) => (
                        <div 
                          key={event.id} 
                          className="border rounded-md p-3 hover:shadow-sm cursor-pointer"
                          onClick={() => handleViewEvent(event)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <div className="mr-3 p-2 rounded-full bg-gray-100">
                                {getEventTypeIcon(event.type)}
                              </div>
                              <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <div className="text-sm text-gray-500 mt-1">
                                  {event.isAllDay ? 'Todo el día' : `${event.startTime} - ${event.endTime || '?'}`}
                                </div>
                                {event.clientName && (
                                  <div className="text-sm text-gray-600 mt-1">
                                    Cliente: {event.clientName}
                                  </div>
                                )}
                              </div>
                            </div>
                            <Badge className={getEventStatusColor(event.status)}>
                              {getEventStatusName(event.status)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>No hay eventos programados para esta fecha</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mt-4"
                        onClick={handleAddEvent}
                      >
                        <Plus className="mr-1 h-4 w-4" /> Añadir evento
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Próximos eventos</CardTitle>
              <CardDescription>
                Tus eventos programados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="upcoming">Próximos</TabsTrigger>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming">
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {upcomingEvents.length > 0 ? (
                      upcomingEvents.map((event) => (
                        <div 
                          key={event.id} 
                          className="border rounded-md p-3 hover:shadow-sm cursor-pointer"
                          onClick={() => handleViewEvent(event)}
                        >
                          <div className="flex items-center">
                            <div className="mr-3 p-2 rounded-full bg-gray-100">
                              {getEventTypeIcon(event.type)}
                            </div>
                            <div>
                              <h4 className="font-medium">{event.title}</h4>
                              <div className="text-sm text-gray-500 mt-1">
                                {event.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} • {event.isAllDay ? 'Todo el día' : event.startTime}
                              </div>
                              {event.clientName && (
                                <div className="flex items-center text-xs text-gray-600 mt-1">
                                  <Users className="h-3 w-3 mr-1" />
                                  {event.clientName}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 flex justify-between items-center">
                            <Badge className={getEventTypeColor(event.type)}>
                              {getEventTypeName(event.type)}
                            </Badge>
                            <Badge className={getEventStatusColor(event.status)}>
                              {getEventStatusName(event.status)}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No hay eventos próximos programados</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="all">
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {events.length > 0 ? (
                      events
                        .sort((a, b) => b.date.getTime() - a.date.getTime())
                        .map((event) => (
                          <div 
                            key={event.id} 
                            className="border rounded-md p-3 hover:shadow-sm cursor-pointer"
                            onClick={() => handleViewEvent(event)}
                          >
                            <div className="flex items-center">
                              <div className="mr-3 p-2 rounded-full bg-gray-100">
                                {getEventTypeIcon(event.type)}
                              </div>
                              <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <div className="text-sm text-gray-500 mt-1">
                                  {event.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} • {event.isAllDay ? 'Todo el día' : event.startTime}
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                              <Badge className={getEventTypeColor(event.type)}>
                                {getEventTypeName(event.type)}
                              </Badge>
                              <Badge className={getEventStatusColor(event.status)}>
                                {getEventStatusName(event.status)}
                              </Badge>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No hay eventos programados</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Modal para añadir/editar evento */}
      <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? 'Editar evento' : 'Añadir nuevo evento'}</DialogTitle>
            <DialogDescription>
              {selectedEvent 
                ? 'Modifica los detalles del evento' 
                : 'Completa la información para crear un nuevo evento'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="event-title">Título del evento</Label>
              <Input
                id="event-title"
                placeholder="Título del evento"
                value={newEvent.title || ''}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-type">Tipo de evento</Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(value) => setNewEvent({...newEvent, type: value as any})}
                >
                  <SelectTrigger id="event-type">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking">Reserva</SelectItem>
                    <SelectItem value="consultation">Consulta</SelectItem>
                    <SelectItem value="wedding">Boda</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-status">Estado</Label>
                <Select
                  value={newEvent.status}
                  onValueChange={(value) => setNewEvent({...newEvent, status: value as any})}
                >
                  <SelectTrigger id="event-status">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="confirmed">Confirmado</SelectItem>
                    <SelectItem value="canceled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="event-date">Fecha</Label>
              <Input
                id="event-date"
                type="date"
                value={newEvent.date ? newEvent.date.toISOString().split('T')[0] : ''}
                onChange={(e) => setNewEvent({
                  ...newEvent, 
                  date: e.target.value ? new Date(e.target.value) : new Date()
                })}
              />
            </div>
            
            <div className="flex items-center space-x-2 my-2">
              <Checkbox 
                id="all-day"
                checked={newEvent.isAllDay}
                onCheckedChange={(checked) => setNewEvent({...newEvent, isAllDay: checked as boolean})}
              />
              <Label htmlFor="all-day">Evento de todo el día</Label>
            </div>
            
            {!newEvent.isAllDay && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-start-time">Hora de inicio</Label>
                  <Input
                    id="event-start-time"
                    type="time"
                    value={newEvent.startTime || ''}
                    onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event-end-time">Hora de finalización</Label>
                  <Input
                    id="event-end-time"
                    type="time"
                    value={newEvent.endTime || ''}
                    onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="event-client">Cliente</Label>
              <Input
                id="event-client"
                placeholder="Nombre del cliente"
                value={newEvent.clientName || ''}
                onChange={(e) => setNewEvent({...newEvent, clientName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="event-client-email">Email del cliente</Label>
              <Input
                id="event-client-email"
                type="email"
                placeholder="Email del cliente"
                value={newEvent.clientEmail || ''}
                onChange={(e) => setNewEvent({...newEvent, clientEmail: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="event-location">Ubicación</Label>
              <Input
                id="event-location"
                placeholder="Ubicación del evento"
                value={newEvent.location || ''}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="event-description">Descripción</Label>
              <Input
                id="event-description"
                placeholder="Descripción del evento"
                value={newEvent.description || ''}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEventModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-wedding-sage hover:bg-wedding-sage/90" onClick={handleSaveEvent}>
              {selectedEvent ? 'Guardar cambios' : 'Añadir evento'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal para ver detalles del evento */}
      <Dialog open={isViewEventModalOpen} onOpenChange={setIsViewEventModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedEvent?.title}
              <Badge className={`ml-2 ${selectedEvent && getEventStatusColor(selectedEvent.status)}`}>
                {selectedEvent && getEventStatusName(selectedEvent.status)}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Detalles del evento
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {selectedEvent && (
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-full bg-gray-100">
                    {getEventTypeIcon(selectedEvent.type)}
                  </div>
                  <div>
                    <Badge className={getEventTypeColor(selectedEvent.type)}>
                      {getEventTypeName(selectedEvent.type)}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatDate(selectedEvent.date)}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-t border-b py-4">
                  <div>
                    <p className="text-sm text-gray-500">Horario</p>
                    <p className="font-medium">
                      {selectedEvent.isAllDay ? 'Todo el día' : `${selectedEvent.startTime} - ${selectedEvent.endTime || '?'}`}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Ubicación</p>
                    <p className="font-medium">
                      {selectedEvent.location || 'No especificada'}
                    </p>
                  </div>
                </div>
                
                {selectedEvent.clientName && (
                  <div>
                    <p className="text-sm text-gray-500">Cliente</p>
                    <p className="font-medium">{selectedEvent.clientName}</p>
                    {selectedEvent.clientEmail && (
                      <p className="text-sm text-gray-600">{selectedEvent.clientEmail}</p>
                    )}
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div>
                    <p className="text-sm text-gray-500">Descripción</p>
                    <p className="text-gray-700">{selectedEvent.description}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter className="flex justify-between">
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => selectedEvent && handleEditEvent(selectedEvent)}
              >
                <Edit className="mr-1 h-4 w-4" /> Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600"
                onClick={() => selectedEvent && handleDeleteEvent(selectedEvent.id)}
              >
                <Trash className="mr-1 h-4 w-4" /> Eliminar
              </Button>
            </div>
            
            <div className="space-x-2">
              {selectedEvent?.status === 'pending' && (
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => selectedEvent && handleChangeEventStatus(selectedEvent.id, 'confirmed')}
                >
                  Confirmar
                </Button>
              )}
              {selectedEvent?.status !== 'canceled' && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => selectedEvent && handleChangeEventStatus(selectedEvent.id, 'canceled')}
                >
                  Cancelar evento
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProviderLayout>
  );
};

export default ProviderCalendar;
