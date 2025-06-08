
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Calendar as CalendarIcon, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';
import { useClient } from '@/contexts/ClientContext';

const ClientCalendar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { events, tasks, addEvent } = useClient();
  const [date, setDate] = useState<Date | undefined>();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  
  // New event form
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');

  useEffect(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      const selectedDate = new Date(dateParam);
      setDate(selectedDate);
      setCurrentMonth(selectedDate);
    } else {
      setDate(new Date());
    }
  }, [searchParams]);

  const getDayEvents = (day: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day.getDate() && 
             eventDate.getMonth() === day.getMonth() && 
             eventDate.getFullYear() === day.getFullYear();
    });
  };

  const getDayTasks = (day: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate.getDate() === day.getDate() && 
             taskDate.getMonth() === day.getMonth() && 
             taskDate.getFullYear() === day.getFullYear();
    });
  };

  const getFilteredEvents = () => {
    if (filterType === 'all') return events;
    return events.filter(event => event.type === filterType);
  };

  const hasEvents = (day: Date) => {
    return getDayEvents(day).length > 0;
  };

  const hasTasks = (day: Date) => {
    return getDayTasks(day).length > 0;
  };

  const todayEvents = date ? getDayEvents(date) : [];
  const todayTasks = date ? getDayTasks(date) : [];

  const handleAddEvent = () => {
    if (newEventTitle && newEventDate) {
      addEvent({
        title: newEventTitle,
        date: newEventDate,
        time: newEventTime || undefined,
        location: newEventLocation || undefined,
        description: newEventDescription || undefined,
        type: 'personal'
      });
      
      // Reset form
      setNewEventTitle('');
      setNewEventDate('');
      setNewEventTime('');
      setNewEventLocation('');
      setNewEventDescription('');
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'appointment': return 'bg-blue-100 text-blue-800';
      case 'tasting': return 'bg-purple-100 text-purple-800';
      case 'deadline': return 'bg-amber-100 text-amber-800';
      case 'personal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'appointment': return 'Cita';
      case 'tasting': return 'Degustación';
      case 'deadline': return 'Fecha límite';
      case 'personal': return 'Personal';
      default: return 'Evento';
    }
  };

  return (
    <ClientLayout>
      <div className="flex flex-col space-y-6 h-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Calendario</h1>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-pink-600 text-white hover:bg-pink-700">
                  <Plus className="h-4 w-4 mr-1" />
                  Nuevo evento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear evento personal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="eventTitle">Título del evento</Label>
                    <Input
                      id="eventTitle"
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      placeholder="Ej: Comprar zapatos"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventDate">Fecha</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={newEventDate}
                        onChange={(e) => setNewEventDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventTime">Hora (opcional)</Label>
                      <Input
                        id="eventTime"
                        type="time"
                        value={newEventTime}
                        onChange={(e) => setNewEventTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="eventLocation">Ubicación (opcional)</Label>
                    <Input
                      id="eventLocation"
                      value={newEventLocation}
                      onChange={(e) => setNewEventLocation(e.target.value)}
                      placeholder="Ej: Centro Comercial Madrid"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventDescription">Descripción (opcional)</Label>
                    <Textarea
                      id="eventDescription"
                      value={newEventDescription}
                      onChange={(e) => setNewEventDescription(e.target.value)}
                      placeholder="Detalles adicionales..."
                    />
                  </div>
                  <Button onClick={handleAddEvent} className="w-full">
                    Crear evento
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1">
          {/* Calendar - Expands to full width */}
          <Card className="xl:col-span-3 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-pink-600" />
                {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="w-full flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  className="w-full max-w-none"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
                    month: "space-y-4 w-full",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex w-full",
                    head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem] flex-1 text-center",
                    row: "flex w-full mt-2",
                    cell: "h-12 w-full text-center text-sm p-0 relative flex-1 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-12 w-full p-0 font-normal aria-selected:opacity-100 flex items-center justify-center hover:bg-pink-50 data-[selected=true]:bg-pink-600 data-[selected=true]:text-white",
                    day_today: "bg-pink-100 text-pink-700 font-bold",
                    day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                  }}
                  modifiers={{
                    hasEvents: (day) => hasEvents(day),
                    hasTasks: (day) => hasTasks(day)
                  }}
                  modifiersClassNames={{
                    hasEvents: "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-2 after:h-2 after:bg-blue-500 after:rounded-full",
                    hasTasks: "relative before:content-[''] before:absolute before:top-1 before:left-1/2 before:transform before:-translate-x-1/2 before:w-2 before:h-2 before:bg-green-500 before:rounded-full"
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Events of selected day */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-pink-600" />
                Día seleccionado
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(todayEvents.length > 0 || todayTasks.length > 0) ? (
                <div className="space-y-4">
                  {todayEvents.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Eventos</h4>
                      <div className="space-y-2">
                        {todayEvents.map(event => (
                          <div key={event.id} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium">{event.title}</h4>
                                {event.time && (
                                  <p className="text-sm text-gray-500">{event.time}</p>
                                )}
                                {event.location && (
                                  <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                                )}
                              </div>
                              <Badge className={getEventTypeColor(event.type)}>
                                {getEventTypeLabel(event.type)}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {todayTasks.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Tareas</h4>
                      <div className="space-y-2">
                        {todayTasks.map(task => (
                          <div key={task.id} className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                              {task.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {task.type === 'personal' ? 'Personal' : 'Servicio'}
                              </Badge>
                              {task.completed && (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  Completada
                                </Badge>
                              )}
                            </div>
                            {task.notes && (
                              <p className="text-xs text-gray-600 mt-1">📝 {task.notes}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-6">
                  {date ? 'No hay eventos ni tareas para este día' : 'Selecciona un día para ver eventos'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming events table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Collapsible open={showUpcoming} onOpenChange={setShowUpcoming}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 p-0 hover:bg-transparent">
                    <ChevronRight className={`h-4 w-4 transition-transform ${showUpcoming ? 'rotate-90' : ''}`} />
                    <span className="font-semibold">Próximos eventos</span>
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filtrar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="appointment">Citas</SelectItem>
                    <SelectItem value="tasting">Degustaciones</SelectItem>
                    <SelectItem value="deadline">Fechas límite</SelectItem>
                    <SelectItem value="personal">Personales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <Collapsible open={showUpcoming} onOpenChange={setShowUpcoming}>
            <CollapsibleContent>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-2 font-medium">Evento</th>
                        <th className="pb-2 font-medium">Fecha</th>
                        <th className="pb-2 font-medium">Hora</th>
                        <th className="pb-2 font-medium">Ubicación</th>
                        <th className="pb-2 font-medium">Tipo</th>
                        <th className="pb-2 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredEvents().map(event => (
                        <tr key={event.id} className="border-b">
                          <td className="py-3">{event.title}</td>
                          <td className="py-3">{new Date(event.date).toLocaleDateString()}</td>
                          <td className="py-3">
                            {event.type !== 'deadline' && event.time ? event.time : '-'}
                          </td>
                          <td className="py-3">{event.location || '-'}</td>
                          <td className="py-3">
                            <Badge className={getEventTypeColor(event.type)}>
                              {getEventTypeLabel(event.type)}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setDate(new Date(event.date));
                                setCurrentMonth(new Date(event.date));
                              }}
                            >
                              Ver
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default ClientCalendar;
