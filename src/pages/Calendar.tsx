
import React, { useState } from 'react';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Plus, X, Check, Calendar as CalendarComponent, ArrowRight, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

// Interfaces para tipos de datos
interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  location?: string;
  description?: string;
  type: 'appointment' | 'payment' | 'deadline' | 'other';
}

interface Appointment {
  id: number;
  vendor: string;
  service: string;
  date: Date;
  time: string;
  location: string;
  confirmed: boolean;
}

const CalendarPage = () => {
  // Datos simulados del usuario
  const userData = {
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    weddingDate: "15 de septiembre, 2025",
    avatarFallback: "MG"
  };
  
  // Progreso del perfil
  const progress = 38;
  
  // Estado para la fecha seleccionada en el calendario
  const [date, setDate] = useState<Date>(new Date());
  
  // Estado para los eventos
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Reunión con fotógrafo',
      date: new Date(2025, 5, 15),
      time: '16:00',
      location: 'Estudio Fotografía Creativa',
      description: 'Revisar álbum de bodas y detalles de la sesión pre-boda',
      type: 'appointment'
    },
    {
      id: 2,
      title: 'Pago inicial catering',
      date: new Date(2025, 6, 1),
      time: '12:00',
      description: 'Transferencia bancaria del 30% de anticipo',
      type: 'payment'
    },
    {
      id: 3,
      title: 'Prueba de vestido',
      date: new Date(2025, 7, 10),
      time: '11:00',
      location: 'Atelier Novias',
      description: 'Primera prueba con todos los complementos',
      type: 'appointment'
    },
    {
      id: 4,
      title: 'Fecha límite invitaciones',
      date: new Date(2025, 7, 15),
      time: '',
      description: 'Último día para confirmar lista de invitados',
      type: 'deadline'
    }
  ]);
  
  // Estado para las citas pendientes
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      vendor: 'Carlos Jiménez Fotografía',
      service: 'Sesión pre-boda',
      date: new Date(2025, 5, 15),
      time: '16:00',
      location: 'Estudio Fotografía Creativa',
      confirmed: true
    },
    {
      id: 2,
      vendor: 'Atelier Novias',
      service: 'Prueba de vestido',
      date: new Date(2025, 7, 10),
      time: '11:00',
      location: 'C/ Serrano, 45',
      confirmed: true
    },
    {
      id: 3,
      vendor: 'Villa Rosa',
      service: 'Visita al lugar',
      date: new Date(2025, 6, 20),
      time: '17:30',
      location: 'Finca Villa Rosa, km 34',
      confirmed: false
    }
  ]);
  
  // Estado para modal de nuevo evento
  const [showNewEventDialog, setShowNewEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    date: new Date(),
    time: '',
    location: '',
    description: '',
    type: 'appointment'
  });
  
  // Función para añadir nuevo evento
  const handleAddEvent = () => {
    // Validación básica
    if (!newEvent.title || !newEvent.date) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    
    const event: Event = {
      id: events.length + 1,
      title: newEvent.title || '',
      date: newEvent.date || new Date(),
      time: newEvent.time || '',
      location: newEvent.location,
      description: newEvent.description,
      type: newEvent.type as 'appointment' | 'payment' | 'deadline' | 'other'
    };
    
    setEvents([...events, event]);
    toast.success("Evento añadido correctamente");
    setShowNewEventDialog(false);
    
    // Reiniciar formulario
    setNewEvent({
      title: '',
      date: new Date(),
      time: '',
      location: '',
      description: '',
      type: 'appointment'
    });
  };
  
  // Función para confirmar una cita
  const handleConfirmAppointment = (id: number) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, confirmed: true } : app
    ));
    toast.success("Cita confirmada correctamente");
  };
  
  // Función para cancelar una cita
  const handleCancelAppointment = (id: number) => {
    setAppointments(appointments.filter(app => app.id !== id));
    toast.success("Cita cancelada correctamente");
  };
  
  // Filtrar eventos para la fecha seleccionada
  const eventsForSelectedDate = events.filter(event => 
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  );
  
  // Función para obtener los días con eventos para resaltarlos en el calendario
  const getEventDays = () => {
    const uniqueDays = new Set<string>();
    events.forEach(event => {
      uniqueDays.add(event.date.toDateString());
    });
    return [...uniqueDays].map(dateString => new Date(dateString));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <ClientSidebar 
              userName={userData.name}
              userAvatar={userData.avatar}
              weddingDate={userData.weddingDate}
              progress={progress}
              avatarFallback={userData.avatarFallback}
            />
            
            {/* Main Content */}
            <div className="lg:w-3/4 space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif font-semibold flex items-center">
                  <CalendarIcon className="mr-2 text-wedding-sage" /> 
                  Calendario
                </h1>
                <Button className="bg-wedding-sage hover:bg-wedding-sage/90" onClick={() => setShowNewEventDialog(true)}>
                  <Plus className="mr-1 h-4 w-4" /> Añadir Evento
                </Button>
              </div>
              
              <Tabs defaultValue="month" className="w-full">
                <TabsList>
                  <TabsTrigger value="month">Vista Mensual</TabsTrigger>
                  <TabsTrigger value="upcoming">Próximos Eventos</TabsTrigger>
                  <TabsTrigger value="appointments">Citas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="month" className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <Card className="md:w-1/2">
                      <CardHeader className="pb-2">
                        <CardTitle>Calendario</CardTitle>
                        <CardDescription>
                          Selecciona una fecha para ver tus eventos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
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
                      </CardContent>
                    </Card>
                    
                    <Card className="md:w-1/2">
                      <CardHeader className="pb-2">
                        <CardTitle>Eventos para {date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {eventsForSelectedDate.length > 0 ? (
                          <div className="space-y-4">
                            {eventsForSelectedDate.map((event) => (
                              <div key={event.id} className="flex items-start p-3 rounded-md border">
                                <div className="mr-3 p-2 rounded-full bg-gray-100">
                                  {event.type === 'appointment' ? (
                                    <CalendarComponent className="h-5 w-5 text-blue-700" />
                                  ) : event.type === 'payment' ? (
                                    <svg className="h-5 w-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  ) : event.type === 'deadline' ? (
                                    <Clock className="h-5 w-5 text-red-700" />
                                  ) : (
                                    <CalendarIcon className="h-5 w-5 text-purple-700" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <h3 className="font-medium">{event.title}</h3>
                                    {event.time && (
                                      <Badge variant="outline">{event.time}</Badge>
                                    )}
                                  </div>
                                  {event.location && (
                                    <p className="text-sm text-gray-500 mt-1">
                                      <svg className="inline-block h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                      {event.location}
                                    </p>
                                  )}
                                  {event.description && (
                                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-10 text-gray-500">
                            No hay eventos programados para esta fecha
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="upcoming" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Próximos Eventos</CardTitle>
                      <CardDescription>
                        Todos tus eventos futuros ordenados por fecha
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {events
                          .filter(event => event.date >= new Date())
                          .sort((a, b) => a.date.getTime() - b.date.getTime())
                          .map((event) => (
                            <div key={event.id} className="flex items-start p-4 border rounded-md hover:bg-gray-50">
                              <div className="mr-4 p-2 rounded-full bg-gray-100">
                                {event.type === 'appointment' ? (
                                  <CalendarComponent className="h-5 w-5 text-blue-700" />
                                ) : event.type === 'payment' ? (
                                  <svg className="h-5 w-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                ) : event.type === 'deadline' ? (
                                  <Clock className="h-5 w-5 text-red-700" />
                                ) : (
                                  <CalendarIcon className="h-5 w-5 text-purple-700" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h3 className="font-medium">{event.title}</h3>
                                  <div>
                                    <Badge className="mr-2">
                                      {event.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                    </Badge>
                                    {event.time && (
                                      <Badge variant="outline">{event.time}</Badge>
                                    )}
                                  </div>
                                </div>
                                {event.location && (
                                  <p className="text-sm text-gray-500 mt-1">
                                    <svg className="inline-block h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {event.location}
                                  </p>
                                )}
                                {event.description && (
                                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                                )}
                              </div>
                              <div className="ml-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                  </svg>
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="appointments" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Citas con Proveedores</CardTitle>
                      <CardDescription>
                        Gestiona tus citas con los proveedores de servicios
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {appointments
                          .sort((a, b) => a.date.getTime() - b.date.getTime())
                          .map((appointment) => (
                            <div key={appointment.id} className={`flex items-start p-4 border rounded-md ${appointment.confirmed ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
                              <div className="mr-4 p-2 rounded-full bg-white">
                                <CalendarComponent className={`h-5 w-5 ${appointment.confirmed ? 'text-green-600' : 'text-yellow-600'}`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h3 className="font-medium">{appointment.service}</h3>
                                  <Badge className={appointment.confirmed ? 'bg-green-100 text-green-800 border-0' : 'bg-yellow-100 text-yellow-800 border-0'}>
                                    {appointment.confirmed ? 'Confirmada' : 'Pendiente'}
                                  </Badge>
                                </div>
                                <p className="text-sm font-medium mt-1">{appointment.vendor}</p>
                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                  <CalendarIcon className="h-3 w-3 mr-1" />
                                  <span>
                                    {appointment.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })} • {appointment.time}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                  <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  <span>{appointment.location}</span>
                                </div>
                                {!appointment.confirmed && (
                                  <div className="flex gap-2 mt-3">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="text-green-600"
                                      onClick={() => handleConfirmAppointment(appointment.id)}
                                    >
                                      <Check className="h-3 w-3 mr-1" /> Confirmar
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="text-red-600"
                                      onClick={() => handleCancelAppointment(appointment.id)}
                                    >
                                      <X className="h-3 w-3 mr-1" /> Cancelar
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                      
                      <div className="mt-6 text-center">
                        <Button variant="outline" className="border-wedding-sage text-wedding-sage hover:bg-wedding-sage hover:text-white">
                          Solicitar nueva cita <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Modal para añadir nuevo evento */}
      <Dialog open={showNewEventDialog} onOpenChange={setShowNewEventDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Añadir nuevo evento</DialogTitle>
            <DialogDescription>
              Completa la información para añadir un evento a tu calendario
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-title" className="text-right">
                Título
              </Label>
              <Input
                id="event-title"
                className="col-span-3"
                placeholder="Título del evento"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-type" className="text-right">
                Tipo
              </Label>
              <Select
                value={newEvent.type}
                onValueChange={(value) => setNewEvent({...newEvent, type: value as any})}
              >
                <SelectTrigger id="event-type" className="col-span-3">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appointment">Cita</SelectItem>
                  <SelectItem value="payment">Pago</SelectItem>
                  <SelectItem value="deadline">Fecha límite</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-date" className="text-right">
                Fecha
              </Label>
              <div className="col-span-3">
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
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-time" className="text-right">
                Hora
              </Label>
              <Input
                id="event-time"
                type="time"
                className="col-span-3"
                value={newEvent.time}
                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-location" className="text-right">
                Ubicación
              </Label>
              <Input
                id="event-location"
                className="col-span-3"
                placeholder="(Opcional)"
                value={newEvent.location || ''}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-description" className="text-right">
                Descripción
              </Label>
              <Input
                id="event-description"
                className="col-span-3"
                placeholder="(Opcional)"
                value={newEvent.description || ''}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewEventDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-wedding-sage hover:bg-wedding-sage/90" onClick={handleAddEvent}>
              Añadir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarPage;
