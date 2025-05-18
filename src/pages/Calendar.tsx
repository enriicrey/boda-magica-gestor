
import React from 'react';
import { toast } from "sonner";
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Calendar = () => {
  // Mock user data
  const userData = {
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    weddingDate: "15 de septiembre, 2025",
    avatarFallback: "MG"
  };
  
  // Calculate progress
  const progress = 38;
  
  // Mock events
  const events = [
    {
      id: "1",
      title: "Degustación de Menú",
      date: "15 de junio, 2025",
      time: "12:00 PM",
      location: "Catering El Jardín",
      address: "Calle Serrano 45, Madrid",
      type: "catering",
      color: "bg-amber-500"
    },
    {
      id: "2",
      title: "Prueba de Vestido",
      date: "22 de junio, 2025",
      time: "10:00 AM",
      location: "Boutique Eleganza",
      address: "Gran Vía 28, Madrid",
      type: "dress",
      color: "bg-pink-500"
    },
    {
      id: "3",
      title: "Visita a Villa Rosa",
      date: "5 de julio, 2025",
      time: "16:30 PM", 
      location: "Villa Rosa",
      address: "Carretera de El Escorial km 5, Madrid",
      type: "venue",
      color: "bg-emerald-500"
    },
    {
      id: "4",
      title: "Reunión con Fotógrafo",
      date: "12 de julio, 2025",
      time: "15:00 PM",
      location: "Carlos Jiménez Fotografía",
      address: "Calle Alcalá 86, Madrid",
      type: "photography",
      color: "bg-blue-500"
    }
  ];

  // Current month display
  const [currentMonthDisplay, setCurrentMonthDisplay] = React.useState("Junio 2025");

  const handleAddEvent = () => {
    toast.success("Función para añadir evento");
  };

  const handlePrevMonth = () => {
    setCurrentMonthDisplay("Mayo 2025");
    toast("Cambiado a mes anterior", { description: "Mayo 2025" });
  };

  const handleNextMonth = () => {
    setCurrentMonthDisplay("Julio 2025");
    toast("Cambiado a mes siguiente", { description: "Julio 2025" });
  };

  const handleEventClick = (id: string) => {
    toast.success("Detalles del evento mostrados");
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
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="font-serif text-2xl font-semibold flex items-center">
                    <CalendarIcon className="text-wedding-sage mr-2 h-5 w-5" />
                    Calendario
                  </CardTitle>
                  <Button onClick={handleAddEvent} className="bg-wedding-sage hover:bg-wedding-sage/90 text-white">
                    <Plus className="mr-1 h-4 w-4" /> Añadir Evento
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h3 className="font-serif text-xl font-medium">{currentMonthDisplay}</h3>
                    <Button variant="ghost" size="sm" onClick={handleNextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Calendar grid would go here in a real implementation */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center text-gray-500 italic">
                    Vista de calendario (implementación futura)
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg mb-2">Próximos Eventos</h3>
                    {events.map((event) => (
                      <div 
                        key={event.id} 
                        className="flex border rounded-md p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleEventClick(event.id)}
                      >
                        <div className={`mr-4 ${event.color} h-12 w-12 rounded-full flex items-center justify-center`}>
                          <CalendarIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <span>{event.date} • {event.time}</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <span>{event.location} ({event.address})</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Calendar;
