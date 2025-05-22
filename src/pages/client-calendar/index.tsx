
import React from 'react';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

const ClientCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  const upcomingEvents = [
    { 
      id: 1, 
      title: 'Prueba de vestido', 
      date: '2024-06-18 14:00', 
      location: 'Boutique Elegant, Calle Mayor 24',
      type: 'appointment'
    },
    { 
      id: 2, 
      title: 'Cita con fotógrafo', 
      date: '2024-06-22 10:30', 
      location: 'Estudio Fotografía Carlos, Plaza España 5',
      type: 'appointment'
    },
    { 
      id: 3, 
      title: 'Degustación menú', 
      date: '2024-07-05 19:00', 
      location: 'Catering Delicias, Avenida Principal 45',
      type: 'tasting'
    },
    { 
      id: 4, 
      title: 'Entrega de invitaciones', 
      date: '2024-07-15 00:00', 
      type: 'deadline'
    }
  ];

  const getDayEvents = (day: Date) => {
    return upcomingEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day.getDate() && 
             eventDate.getMonth() === day.getMonth() && 
             eventDate.getFullYear() === day.getFullYear();
    });
  };

  const todayEvents = getDayEvents(date || new Date());

  return (
    <ClientLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold">Calendario</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Mes anterior
            </Button>
            <Button variant="outline" size="sm">
              Mes siguiente
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Button size="sm" className="bg-wedding-sage text-white hover:bg-wedding-sage/90">
              <Plus className="h-4 w-4 mr-1" />
              Nuevo evento
            </Button>
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
              <div className="p-2 border rounded-lg bg-white">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="w-full"
                  classNames={{
                    day_selected: "bg-wedding-sage text-white hover:bg-wedding-sage",
                    day_today: "bg-wedding-sage/10 text-wedding-sage font-bold"
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-wedding-sage" />
                Eventos del día
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayEvents.length > 0 ? (
                <ul className="space-y-4">
                  {todayEvents.map(event => (
                    <li key={event.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                          {event.location && (
                            <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                          )}
                        </div>
                        <span className={
                          event.type === 'appointment' 
                            ? 'bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'
                            : event.type === 'tasting'
                            ? 'bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded'
                            : 'bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded'
                        }>
                          {event.type === 'appointment' ? 'Cita' : 
                           event.type === 'tasting' ? 'Degustación' : 'Fecha límite'}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 py-6">No hay eventos programados para hoy</p>
              )}
              <Button variant="link" className="w-full mt-4 text-wedding-sage">
                Ver todos los eventos
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Próximos eventos</CardTitle>
          </CardHeader>
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
                  {upcomingEvents.map(event => (
                    <tr key={event.id} className="border-b">
                      <td className="py-3">{event.title}</td>
                      <td className="py-3">{new Date(event.date).toLocaleDateString()}</td>
                      <td className="py-3">
                        {event.type !== 'deadline' ? new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '-'}
                      </td>
                      <td className="py-3">{event.location || '-'}</td>
                      <td className="py-3">
                        <span className={
                          event.type === 'appointment' 
                            ? 'bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'
                            : event.type === 'tasting'
                            ? 'bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded'
                            : 'bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded'
                        }>
                          {event.type === 'appointment' ? 'Cita' : 
                           event.type === 'tasting' ? 'Degustación' : 'Fecha límite'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default ClientCalendar;
