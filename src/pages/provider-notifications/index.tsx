
import { useState } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Bell, CheckCircle, Calendar, MessageSquare, CreditCard, Users, Star, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for notifications
const mockNotifications = [
  {
    id: '1',
    title: 'Nueva reseña recibida',
    description: 'Carlos Mendoza ha dejado una reseña de 5 estrellas: "Excelente servicio para nuestra boda"',
    time: '10 minutos',
    read: false,
    type: 'review',
    priority: 'high',
    avatar: '/placeholder.svg',
    actionUrl: '/provider-reviews'
  },
  {
    id: '2',
    title: 'Pago recibido',
    description: 'Has recibido un pago de €1,200 por "Boda - Carlos Mendoza"',
    time: '1 hora',
    read: false,
    type: 'payment',
    priority: 'high',
    avatar: '/placeholder.svg',
    actionUrl: '/provider-finances'
  },
  {
    id: '3',
    title: 'Nuevo mensaje',
    description: 'Ana García te ha enviado un mensaje sobre el cumpleaños de su hija.',
    time: '2 horas',
    read: false,
    type: 'message',
    priority: 'medium',
    avatar: '/placeholder.svg',
    actionUrl: '/provider-messages'
  },
  {
    id: '4',
    title: 'Recordatorio de evento',
    description: 'Mañana: Reunión de planificación con Miguel Fernández a las 10:00.',
    time: '5 horas',
    read: true,
    type: 'event',
    priority: 'medium',
    avatar: '/placeholder.svg',
    actionUrl: '/provider-calendar'
  },
  {
    id: '5',
    title: 'Nuevo cliente registrado',
    description: 'Lucía Martínez se ha registrado y ha mostrado interés en tus servicios de boda.',
    time: '1 día',
    read: true,
    type: 'client',
    priority: 'low',
    avatar: '/placeholder.svg',
    actionUrl: '/provider-clients'
  },
  {
    id: '6',
    title: 'Factura vencida',
    description: 'La factura #INV-005 para David Sánchez está vencida desde hace 3 días.',
    time: '2 días',
    read: true,
    type: 'invoice',
    priority: 'high',
    avatar: '/placeholder.svg',
    actionUrl: '/provider-finances'
  }
];

const ProviderNotifications = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
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
    } else if (filter === 'priority') {
      return matchesSearch && notification.priority === 'high';
    }
    
    return matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const priorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "Notificaciones marcadas como leídas",
      description: "Todas las notificaciones han sido marcadas como leídas."
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
      description: "La notificación ha sido eliminada correctamente."
    });
  };

  const handleAction = (notification: typeof mockNotifications[0]) => {
    markAsRead(notification.id);
    
    toast({
      title: "Redirigiendo...",
      description: `Abriendo ${getActionTitle(notification.type)}...`
    });
  };

  const getActionTitle = (type: string) => {
    switch (type) {
      case 'review': return 'reseñas';
      case 'payment': return 'finanzas';
      case 'message': return 'mensajes';
      case 'event': return 'calendario';
      case 'client': return 'clientes';
      case 'invoice': return 'facturas';
      default: return 'detalles';
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
  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') {
      switch(type) {
        case 'review': return 'bg-amber-100 border-amber-200';
        case 'payment': return 'bg-green-100 border-green-200';
        case 'invoice': return 'bg-red-100 border-red-200';
        default: return 'bg-purple-100 border-purple-200';
      }
    }
    
    switch(type) {
      case 'review': return 'bg-amber-50 border-amber-100';
      case 'payment': return 'bg-green-50 border-green-100';
      case 'message': return 'bg-blue-50 border-blue-100';
      case 'event': return 'bg-purple-50 border-purple-100';
      case 'client': return 'bg-indigo-50 border-indigo-100';
      case 'invoice': return 'bg-red-50 border-red-100';
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">Alta</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Media</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Baja</Badge>;
      default:
        return null;
    }
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Notificaciones</h1>
          <p className="text-gray-600">
            Mantente al día con todas las actualizaciones importantes de tu negocio
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-700">Sin leer</p>
                  <h3 className="text-2xl font-bold text-blue-800">{unreadCount}</h3>
                  <p className="text-xs text-blue-600">Notificaciones pendientes</p>
                </div>
                <div className="bg-blue-200 p-3 rounded-full relative">
                  <Bell className="h-6 w-6 text-blue-700" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-red-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-red-700">Alta prioridad</p>
                  <h3 className="text-2xl font-bold text-red-800">{priorityCount}</h3>
                  <p className="text-xs text-red-600">Requieren atención inmediata</p>
                </div>
                <div className="bg-red-200 p-3 rounded-full">
                  <Bell className="h-6 w-6 text-red-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-700">Total</p>
                  <h3 className="text-2xl font-bold text-green-800">{notifications.length}</h3>
                  <p className="text-xs text-green-600">Notificaciones totales</p>
                </div>
                <div className="bg-green-200 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
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
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                  )}
                </div>
                No leídas
                {unreadCount > 0 && (
                  <Badge className="ml-1" variant="secondary">
                    {unreadCount}
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
              <Button 
                variant={filter === 'priority' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('priority')}
              >
                Prioridad alta
              </Button>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead}
            >
              Marcar todas como leídas
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id}
                className={`border-2 transition-all duration-200 hover:shadow-lg ${
                  !notification.read ? 'shadow-md' : 'shadow-sm'
                } ${getNotificationColor(notification.type, notification.priority)}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full p-2 ${
                      notification.priority === 'high' ? 'bg-white/80' : 'bg-white/60'
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                          {getPriorityBadge(notification.priority)}
                          {!notification.read && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Hace {notification.time}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-red-600"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">{notification.description}</p>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleAction(notification)}
                          className="bg-gray-900 hover:bg-gray-800 text-white"
                        >
                          Ver detalles
                        </Button>
                        {!notification.read && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Marcar como leída
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-md">
              <CardContent className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-1">No hay notificaciones</p>
                <p className="text-gray-500">
                  {searchTerm 
                    ? 'No se encontraron notificaciones que coincidan con tu búsqueda.' 
                    : filter === 'unread' 
                      ? 'No tienes notificaciones sin leer.' 
                      : 'Todas tus notificaciones aparecerán aquí.'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderNotifications;
