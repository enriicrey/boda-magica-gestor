
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ClientLayout from '@/components/layouts/ClientLayout';
import { CalendarIcon, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useClient } from '@/contexts/ClientContext';
import { useToast } from '@/hooks/use-toast';

const ClientCalendar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const { events, tasks, addEvent } = useClient();
  const [date, setDate] = useState<Date | undefined>();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);
  
  // New event form
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventType, setNewEventType] = useState<'personal' | 'appointment' | 'tasting' | 'deadline'>('personal');

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
    const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getTime() === dayStart.getTime();
    });
  };

  const getDayTasks = (day: Date) => {
    const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    return tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate.getTime() === dayStart.getTime();
    });
  };

  const hasEvents = (day: Date) => getDayEvents(day).length > 0;
  const hasTasks = (day: Date) => getDayTasks(day).length > 0;

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
        type: newEventType
      });
      
      // Reset form
      setNewEventTitle('');
      setNewEventDate('');
      setNewEventTime('');
      setNewEventLocation('');
      setNewEventDescription('');
      setNewEventType('personal');
      setIsNewEventOpen(false);
      
      toast({
        title: "Evento creado",
        description: "El nuevo evento se ha añadido a tu calendario."
      });
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'appointment': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'tasting': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'deadline': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'personal': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  return (
    <ClientLayout>
      <div className="flex flex-col h-full space-y-6 bg-gradient-to-br from-pink-50/30 to-rose-50/20 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Calendario</h1>
            <p className="text-gray-600 text-lg">Organiza todos los momentos importantes de tu boda</p>
          </div>
          <div className="flex items-center gap-3">
            <Dialog open={isNewEventOpen} onOpenChange={setIsNewEventOpen}>
              <DialogTrigger asChild>
                <Button className="bg-pink-600 hover:bg-pink-700 shadow-lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Nuevo evento
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Crear nuevo evento</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="eventTitle">Título del evento</Label>
                    <Input
                      id="eventTitle"
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      placeholder="Ej: Cita con el florista"
                      className="mt-1"
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
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventTime">Hora (opcional)</Label>
                      <Input
                        id="eventTime"
                        type="time"
                        value={newEventTime}
                        onChange={(e) => setNewEventTime(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="eventType">Tipo de evento</Label>
                    <Select value={newEventType} onValueChange={(value: any) => setNewEventType(value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="appointment">Cita</SelectItem>
                        <SelectItem value="tasting">Degustación</SelectItem>
                        <SelectItem value="deadline">Fecha límite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="eventLocation">Ubicación (opcional)</Label>
                    <Input
                      id="eventLocation"
                      value={newEventLocation}
                      onChange={(e) => setNewEventLocation(e.target.value)}
                      placeholder="Ej: Oficina del proveedor"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventDescription">Descripción (opcional)</Label>
                    <Textarea
                      id="eventDescription"
                      value={newEventDescription}
                      onChange={(e) => setNewEventDescription(e.target.value)}
                      placeholder="Añade detalles sobre el evento..."
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={handleAddEvent} className="w-full bg-pink-600 hover:bg-pink-700">
                    Crear evento
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 flex-1">
          {/* Calendar - Full width */}
          <Card className="xl:col-span-3 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <CalendarIcon className="h-6 w-6 text-pink-600" />
                  {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                    className="hover:bg-pink-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateMonth('next')}
                    className="hover:bg-pink-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="w-full"
                classNames={{
                  months: "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                  month: "space-y-4 w-full flex flex-col",
                  table: "w-full h-full border-collapse space-y-1",
                  head_row: "",
                  head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem] h-14 flex items-center justify-center",
                  row: "flex w-full mt-2",
                  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md h-20 w-full border border-gray-100",
                  day: "h-full w-full p-0 font-normal aria-selected:opacity-100 hover:bg-pink-50 flex flex-col items-center justify-center relative",
                  day_range_end: "day-range-end",
                  day_selected: "bg-pink-100 text-pink-900 hover:bg-pink-100 hover:text-pink-900 focus:bg-pink-100 focus:text-pink-900",
                  day_today: "bg-accent text-accent-foreground font-semibold",
                  day_outside: "text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_hidden: "invisible",
                }}
                components={{
                  DayContent: ({ date: dayDate }) => (
                    <div className="flex flex-col items-center justify-center h-full w-full p-1">
                      <span className="text-sm font-medium mb-1">{dayDate.getDate()}</span>
                      <div className="flex gap-1 flex-wrap justify-center">
                        {hasEvents(dayDate) && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        {hasTasks(dayDate) && (
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  )
                }}
              />
            </CardContent>
          </Card>

          {/* Day Details */}
          <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">
                {date ? date.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                }) : 'Selecciona un día'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Events for selected day */}
              {todayEvents.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    Eventos
                  </h4>
                  <div className="space-y-2">
                    {todayEvents.map((event) => (
                      <div key={event.id} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-900">{event.title}</p>
                            {event.time && (
                              <p className="text-xs text-blue-600 mt-1">{event.time}</p>
                            )}
                            {event.location && (
                              <p className="text-xs text-gray-600 mt-1">{event.location}</p>
                            )}
                          </div>
                          <Badge className={getEventTypeColor(event.type)} variant="secondary">
                            {getEventTypeLabel(event.type)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks for selected day */}
              {todayTasks.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    Tareas
                  </h4>
                  <div className="space-y-2">
                    {todayTasks.map((task) => (
                      <div key={task.id} className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                        <p className={`font-medium text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.title}
                        </p>
                        <Badge className={`mt-1 ${task.type === 'personal' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`} variant="secondary">
                          {task.type === 'personal' ? 'Personal' : 'Servicio'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {todayEvents.length === 0 && todayTasks.length === 0 && date && (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No hay eventos o tareas para este día</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientCalendar;
