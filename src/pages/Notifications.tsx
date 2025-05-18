
import React from 'react';
import { toast } from "sonner";
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Bell, Check, Calendar, Package, User, Settings, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from "@/components/ui/switch";

const Notifications = () => {
  // Mock user data
  const userData = {
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    weddingDate: "15 de septiembre, 2025",
    avatarFallback: "MG"
  };
  
  // Calculate progress
  const progress = 38;
  
  // Mock notification data
  const notifications = [
    {
      id: "1",
      title: "Recordatorio: Degustación de Menú",
      message: "Tu cita para la degustación de menú está programada para mañana a las 12:00 PM en Catering El Jardín.",
      date: "14/06/2025",
      time: "10:00 AM",
      type: "calendar",
      read: false
    },
    {
      id: "2",
      title: "Carlos Jiménez ha confirmado tu reserva",
      message: "El fotógrafo Carlos Jiménez ha confirmado su disponibilidad para tu boda el 15 de septiembre, 2025.",
      date: "12/06/2025",
      time: "2:34 PM",
      type: "service",
      read: false
    },
    {
      id: "3",
      title: "Nuevo mensaje de Villa Rosa",
      message: "Has recibido un nuevo mensaje del equipo de Villa Rosa sobre tu reserva.",
      date: "10/06/2025",
      time: "11:20 AM",
      type: "message",
      read: true
    },
    {
      id: "4",
      title: "Recordatorio de pago",
      message: "Tienes un pago pendiente para Villa Rosa con fecha límite 01/07/2025.",
      date: "05/06/2025",
      time: "9:15 AM",
      type: "payment",
      read: true
    },
    {
      id: "5",
      title: "3 invitados han confirmado su asistencia",
      message: "Elena Martínez, Juan Gómez y Sofía López han confirmado su asistencia a tu boda.",
      date: "01/06/2025",
      time: "4:45 PM",
      type: "guest",
      read: true
    }
  ];

  const [notificationSettings, setNotificationSettings] = React.useState({
    email: true,
    push: true,
    reminders: true,
    messages: true,
    payments: true,
    guestUpdates: true
  });

  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      toast.success(`Configuración actualizada: ${setting}`);
      return newSettings;
    });
  };

  const handleMarkAllAsRead = () => {
    toast.success("Todas las notificaciones marcadas como leídas");
  };

  const handleDeleteAll = () => {
    toast.success("Todas las notificaciones eliminadas");
  };

  const handleMarkAsRead = (id: string) => {
    toast.success("Notificación marcada como leída");
  };

  const handleDeleteNotification = (id: string) => {
    toast.success("Notificación eliminada");
  };

  // Function to render icon based on notification type
  const renderNotificationIcon = (type: string) => {
    switch (type) {
      case 'calendar':
        return <Calendar className="h-6 w-6 text-blue-500" />;
      case 'service':
        return <Package className="h-6 w-6 text-wedding-sage" />;
      case 'message':
        return <Bell className="h-6 w-6 text-purple-500" />;
      case 'payment':
        return <Settings className="h-6 w-6 text-orange-500" />;
      case 'guest':
        return <User className="h-6 w-6 text-pink-500" />;
      default:
        return <Bell className="h-6 w-6 text-gray-500" />;
    }
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
                    <Bell className="text-wedding-sage mr-2 h-5 w-5" />
                    Notificaciones
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleMarkAllAsRead}
                    >
                      <Check className="h-4 w-4 mr-1" /> Marcar Todo como Leído
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:border-red-200 hover:bg-red-50"
                      onClick={handleDeleteAll}
                    >
                      <Trash className="h-4 w-4 mr-1" /> Eliminar Todo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border rounded-lg flex ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                      >
                        <div className="mr-4 flex-shrink-0">
                          {renderNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className={`font-medium ${notification.read ? '' : 'text-blue-800'}`}>{notification.title}</h3>
                            <span className="text-xs text-gray-500">{notification.date} · {notification.time}</span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                        </div>
                        <div className="ml-4 flex items-start space-x-1">
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-blue-600"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-500"
                            onClick={() => handleDeleteNotification(notification.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl font-semibold">Configuración de Notificaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="font-medium">Canales de Notificación</h3>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Notificaciones por Email</p>
                          <p className="text-sm text-gray-500">Recibir notificaciones en tu dirección de correo electrónico</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.email} 
                          onCheckedChange={() => handleNotificationChange('email')} 
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Notificaciones Push</p>
                          <p className="text-sm text-gray-500">Recibir notificaciones directamente en tu navegador</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.push} 
                          onCheckedChange={() => handleNotificationChange('push')} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <h3 className="font-medium">Tipos de Notificación</h3>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Recordatorios de Eventos</p>
                          <p className="text-sm text-gray-500">Recordatorios para tus próximas citas y eventos</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.reminders} 
                          onCheckedChange={() => handleNotificationChange('reminders')} 
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Mensajes de Proveedores</p>
                          <p className="text-sm text-gray-500">Notificaciones cuando recibas mensajes de proveedores</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.messages} 
                          onCheckedChange={() => handleNotificationChange('messages')} 
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Recordatorios de Pago</p>
                          <p className="text-sm text-gray-500">Alertas sobre pagos pendientes y vencimientos</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.payments} 
                          onCheckedChange={() => handleNotificationChange('payments')} 
                        />
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Actualizaciones de Invitados</p>
                          <p className="text-sm text-gray-500">Notificaciones sobre confirmaciones de invitados</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.guestUpdates} 
                          onCheckedChange={() => handleNotificationChange('guestUpdates')} 
                        />
                      </div>
                    </div>
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

export default Notifications;
