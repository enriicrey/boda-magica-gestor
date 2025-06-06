
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react';
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
import { useClient } from '@/contexts/ClientContext';

const ClientCalendar = () => {
  const [searchParams] = useSearchParams();
  const { events, addEvent } = useClient();
  const [date, setDate] = useState<Date | undefined>();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showUpcoming, setShowUpcoming] = useState(false);
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

  const getFilteredEvents = () => {
    if (filterType === 'all') return events;
    return events.filter(event => event.type === filterType);
  };

  const hasEvents = (day: Date) => {
    return getDayEvents(day).length > 0;
  };

  const todayEvents = date ? getDayEvents(date) : [];

  const handlePreviousMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

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
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold">Calendario</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Mes anterior
            </Button>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              Mes siguiente
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-wedding-sage text-white hover:bg-wedding-sage/90">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-wedding-sage" />
                Calendario de eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  className="w-full"
                  classNames={{
                    day_selected: "bg-wedding-sage text-white hover:bg-wedding-sage",
                    day_today: "bg-wedding-sage/10 text-wedding-sage font-bold"
                  }}
                  modifiers={{
                    hasEvents: (day) => hasEvents(day)
                  }}
                  modifiersClassNames={{
                    hasEvents: "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1 after:h-1 after:bg-blue-500 after:rounded-full"
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-wedding-sage" />
                Eventos del día seleccionado
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayEvents.length > 0 ? (
                <ul className="space-y-4">
                  {todayEvents.map(event => (
                    <li key={event.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{event.title}</h4>
                          {event.time && (
                            <p className="text-sm text-gray-500">
                              {event.time}
                            </p>
                          )}
                          {event.location && (
                            <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                          )}
                          {event.description && (
                            <p className="text-xs text-gray-600 mt-1">{event.description}</p>
                          )}
                        </div>
                        <Badge className={getEventTypeColor(event.type)}>
                          {getEventTypeLabel(event.type)}
                        </Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 py-6">
                  {date ? 'No hay eventos para este día' : 'Selecciona un día para ver eventos'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Collapsible open={showUpcoming} onOpenChange={setShowUpcoming}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <ChevronRight className={`h-4 w-4 transition-transform ${showUpcoming ? 'rotate-90' : ''}`} />
                    Próximos eventos
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
