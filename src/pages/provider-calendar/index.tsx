
import { useState } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  MapPin, 
  Users,
  Phone,
  Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: 'Boda - Carlos y María',
    date: '2024-06-15',
    time: '16:00',
    type: 'Boda',
    status: 'confirmed',
    location: 'Hotel Majestic',
    client: 'Carlos Mendoza',
    phone: '+34 612 345 678',
    email: 'carlos@example.com',
    attendees: 120,
    notes: 'Ceremonia al aire libre, cena de gala'
  },
  {
    id: 2,
    title: 'Consulta inicial - Ana García',
    date: '2024-06-18',
    time: '10:00',
    type: 'Consulta',
    status: 'pending',
    location: 'Oficina',
    client: 'Ana García',
    phone: '+34 623 456 789',
    email: 'ana@example.com',
    attendees: 2,
    notes: 'Primera reunión para planificar cumpleaños'
  },
  {
    id: 3,
    title: 'Evento Corporativo - TechCorp',
    date: '2024-06-22',
    time: '09:00',
    type: 'Corporativo',
    status: 'confirmed',
    location: 'Centro de Convenciones',
    client: 'Miguel Fernández',
    phone: '+34 634 567 890',
    email: 'miguel@techcorp.com',
    attendees: 200,
    notes: 'Presentación anual de productos'
  }
];

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const ProviderCalendar = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<typeof mockEvents[0] | null>(null);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleNewEvent = () => {
    toast({
      title: "Nuevo evento",
      description: "Abriendo formulario para crear un nuevo evento..."
    });
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'Boda': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Corporativo': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Consulta': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = mockEvents.filter(event => event.date === dateStr);

      days.push(
        <div key={day} className="h-32 p-2 border border-gray-100 hover:bg-gray-50 transition-colors">
          <div className="font-medium text-sm text-gray-900 mb-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.map(event => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded cursor-pointer border ${getEventColor(event.type)} hover:shadow-sm transition-shadow`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="font-medium truncate">{event.time}</div>
                <div className="truncate">{event.title}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col h-full space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Calendario</h1>
            <p className="text-gray-600">
              Gestiona tus eventos, citas y consultas de forma organizada
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <Button 
                variant={view === 'month' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setView('month')}
              >
                Mes
              </Button>
              <Button 
                variant={view === 'week' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setView('week')}
              >
                Semana
              </Button>
              <Button 
                variant={view === 'day' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setView('day')}
              >
                Día
              </Button>
            </div>
            <Button onClick={handleNewEvent}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo evento
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
          {/* Calendar */}
          <Card className="lg:col-span-3 border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={goToNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-7 gap-0">
                {/* Days of the week header */}
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50 border-b">
                    {day}
                  </div>
                ))}
                {/* Calendar days */}
                {renderCalendarDays()}
              </div>
            </CardContent>
          </Card>

          {/* Event Details Sidebar */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedEvent ? 'Detalles del evento' : 'Próximos eventos'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedEvent ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{selectedEvent.title}</h3>
                    <Badge className={getStatusColor(selectedEvent.status)}>
                      {selectedEvent.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(selectedEvent.date).toLocaleDateString()} a las {selectedEvent.time}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {selectedEvent.location}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {selectedEvent.attendees} asistentes
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Información del cliente</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{selectedEvent.client}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3 w-3 mr-2" />
                        {selectedEvent.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-3 w-3 mr-2" />
                        {selectedEvent.email}
                      </div>
                    </div>
                  </div>
                  
                  {selectedEvent.notes && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Notas</h4>
                      <p className="text-sm text-gray-600">{selectedEvent.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-2 pt-4">
                    <Button size="sm" className="flex-1">Editar</Button>
                    <Button size="sm" variant="outline" onClick={() => setSelectedEvent(null)}>
                      Cerrar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {mockEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getEventColor(event.type)} variant="outline">
                          {event.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{event.time}</span>
                      </div>
                      <h4 className="font-medium text-sm text-gray-900 mb-1">{event.title}</h4>
                      <div className="flex items-center text-xs text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderCalendar;
