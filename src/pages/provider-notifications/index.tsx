
import { useState } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Bell, CheckCircle, Calendar, MessageSquare, CreditCard, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for notifications
const mockNotifications = [
  {
    id: '1',
    title: 'Nueva reseña recibida',
    description: 'Carlos Mendoza ha dejado una reseña de 5 estrellas en tu perfil.',
    time: '10 minutos',
    read: false,
    type: 'review',
    avatar: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Pago recibido',
    description: 'Has recibido un pago de €1,200 por "Boda - Carlos Mendoza"',
    time: '1 hora',
    read: false,
    type: 'payment',
    avatar: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Nuevo mensaje',
    description: 'Ana García te ha enviado un mensaje sobre el cumpleaños.',
    time: '2 horas',
    read: false,
    type: 'message',
    avatar: '/placeholder.svg'
  },
  {
    id: '4',
    title: 'Recordatorio de evento',
    description: 'Mañana: Reunión de planificación con Miguel Fernández.',
    time: '5 horas',
    read: true,
    type: 'event',
    avatar: '/placeholder.svg'
  },
  {
    id: '5',
    title: 'Nuevo cliente registrado',
    description: 'Lucía Martínez se ha registrado y ha mostrado interés en tus servicios.',
    time: '1 día',
    read: true,
    type: 'client',
    avatar: '/placeholder.svg'
  },
  {
    id: '6',
    title: 'Factura vencida',
    description: 'La factura #INV-005 para David Sánchez está vencida.',
    time: '2 días',
    read: true,
    type: 'invoice',
    avatar: '/placeholder.svg'
  }
];

const ProviderNotifications = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [notifications, setNotifications] = useState(mockNotifications);

  // Filter notifications based on search term and filter selection
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'unread') {
      return matchesSearch && !notification.read;
    } else if (filter === 'read') {
      return matchesSearch && notification.read;
    }
    
    return matchesSearch;
  });

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "Notificaciones marcadas como leídas",
      description: "Todas las notificaciones han sido marcadas como leídas.",
      duration: 3000
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      title: "Notificación eliminada",
      description: "La notificación ha sido eliminada correctamente.",
      duration: 3000
    });
  };

  const handleAction = (notification: typeof mockNotifications[0]) => {
    markAsRead(notification.id);
    
    // Different actions based on notification type
    switch (notification.type) {
      case 'review':
        toast({
          title: "Ir a reseñas",
          description: "Redirigiendo a la sección de reseñas...",
          duration: 3000
        });
        break;
      case 'payment':
        toast({
          title: "Ver detalles del pago",
          description: "Redirigiendo a la sección de finanzas...",
          duration: 3000
        });
        break;
      case 'message':
        toast({
          title: "Ver mensaje",
          description: "Abriendo la conversación...",
          duration: 3000
        });
        break;
      case 'event':
        toast({
          title: "Ver detalles del evento",
          description: "Abriendo el calendario...",
          duration: 3000
        });
        break;
      case 'client':
        toast({
          title: "Ver perfil del cliente",
          description: "Redirigiendo a la sección de clientes...",
          duration: 3000
        });
        break;
      default:
        toast({
          title: "Ver detalles",
          description: "Abriendo detalles de la notificación...",
          duration: 3000
        });
    }
  };

  // Icon for notification type
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'review':
        return <Star className="h-5 w-5" />;
      case 'payment':
        return <CreditCard className="h-5 w-5" />;
      case 'message':
        return <MessageSquare className="h-5 w-5" />;
      case 'event':
        return <Calendar className="h-5 w-5" />;
      case 'client':
        return <Users className="h-5 w-5" />;
      case 'invoice':
        return <CreditCard className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  // Background color for notification type
  const getNotificationColor = (type: string) => {
    switch(type) {
      case 'review':
        return 'bg-yellow-100';
      case 'payment':
        return 'bg-green-100';
      case 'message':
        return 'bg-blue-100';
      case 'event':
        return 'bg-purple-100';
      case 'client':
        return 'bg-indigo-100';
      case 'invoice':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Notificaciones</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Mantente al día con todas tus alertas y actualizaciones.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar notificaciones..."
                className="w-full pl-8 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={filter === 'all' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                Todas
              </Button>
              <Button 
                variant={filter === 'unread' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('unread')}
                className="flex items-center gap-1"
              >
                <div className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                  )}
                </div>
                No leídas{" "}
                {notifications.filter(n => !n.read).length > 0 && (
                  <Badge className="ml-1" variant="secondary">
                    {notifications.filter(n => !n.read).length}
                  </Badge>
                )}
              </Button>
              <Button 
                variant={filter === 'read' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('read')}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Leídas
              </Button>
            </div>
          </div>
          {notifications.filter(n => !n.read).length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead}
              className="ml-auto"
            >
              Marcar todas como leídas
            </Button>
          )}
        </div>

        <Card>
          <CardContent className="divide-y p-0">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className={`${getNotificationColor(notification.type)} rounded-full p-2`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-gray-600">{notification.description}</div>
                        <div className="text-xs text-gray-400 mt-1">Hace {notification.time}</div>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                      )}
                    </div>
                    <div className="mt-3 flex justify-start">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 mr-2"
                        onClick={() => handleAction(notification)}
                      >
                        Ver detalles
                      </Button>
                      {!notification.read && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 mr-2"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Marcar como leída
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-gray-500">
                <Bell className="h-12 w-12 mb-4 opacity-20" />
                <p className="text-lg font-medium mb-1">No hay notificaciones</p>
                <p className="text-sm">
                  {searchTerm 
                    ? 'No se encontraron notificaciones que coincidan con tu búsqueda.' 
                    : filter === 'unread' 
                      ? 'No tienes notificaciones sin leer.' 
                      : 'Todas tus notificaciones aparecerán aquí.'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProviderLayout>
  );
};

export default ProviderNotifications;

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
