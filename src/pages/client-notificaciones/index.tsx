
import React, { useState } from 'react';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, MessageSquare, Calendar, CreditCard, Heart, CheckCircle, AlertCircle, Info, Filter, Archive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ClientNotificaciones = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [showArchived, setShowArchived] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'message',
      title: 'Nuevo mensaje de Carlos Jiménez Fotografía',
      description: 'Te ha enviado detalles sobre la sesión de compromiso programada para el viernes.',
      timestamp: 'Hace 2 horas',
      read: false,
      icon: MessageSquare,
      color: 'text-blue-600',
      actionable: true
    },
    {
      id: '2',
      type: 'payment',
      title: 'Recordatorio de pago',
      description: 'El segundo pago de Villa Rosa vence en 3 días (€3,000).',
      timestamp: 'Hace 4 horas',
      read: false,
      icon: CreditCard,
      color: 'text-red-600',
      actionable: true
    },
    {
      id: '3',
      type: 'appointment',
      title: 'Cita confirmada',
      description: 'Degustación de menú con Catering Deluxe confirmada para mañana a las 12:00.',
      timestamp: 'Ayer',
      read: true,
      icon: Calendar,
      color: 'text-green-600',
      actionable: false
    },
    {
      id: '4',
      type: 'task',
      title: 'Nueva tarea asignada',
      description: 'Confirmar lista final de invitados - Fecha límite: 30 de junio.',
      timestamp: 'Ayer',
      read: true,
      icon: CheckCircle,
      color: 'text-purple-600',
      actionable: true
    },
    {
      id: '5',
      type: 'service',
      title: 'Nuevo servicio recomendado',
      description: 'Hemos encontrado un servicio de música que podría interesarte.',
      timestamp: '2 días',
      read: true,
      icon: Heart,
      color: 'text-pink-600',
      actionable: false
    },
    {
      id: '6',
      type: 'info',
      title: 'Consejo de planificación',
      description: 'A 387 días de tu boda: Es un buen momento para reservar el transporte.',
      timestamp: '3 días',
      read: true,
      icon: Info,
      color: 'text-gray-600',
      actionable: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = notifications.filter(n => {
    if (filterType !== 'all' && n.type !== filterType) return false;
    return true;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'message': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'payment': return 'bg-red-100 text-red-800 border-red-200';
      case 'appointment': return 'bg-green-100 text-green-800 border-green-200';
      case 'task': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'service': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'info': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      message: 'Mensaje',
      payment: 'Pago',
      appointment: 'Cita',
      task: 'Tarea',
      service: 'Servicio',
      info: 'Información'
    };
    return labels[type as keyof typeof labels] || 'Notificación';
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
    toast({
      title: "Marcado como leído",
      description: "La notificación se ha marcado como leída."
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "Todas marcadas como leídas",
      description: "Todas las notificaciones se han marcado como leídas."
    });
  };

  const clearReadNotifications = () => {
    const actionableUnread = notifications.filter(n => !n.read && n.actionable);
    setNotifications(prev => prev.filter(n => !n.read || n.actionable));
    toast({
      title: "Notificaciones limpiadas",
      description: "Se han eliminado las notificaciones leídas sin acciones pendientes."
    });
  };

  const viewNotification = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    // Handle different notification types
    switch (notification.type) {
      case 'message':
        // Navigate to messages
        break;
      case 'payment':
        // Navigate to budget
        break;
      case 'appointment':
        // Navigate to calendar
        break;
      case 'task':
        // Navigate to tasks
        break;
      default:
        break;
    }
  };

  return (
    <ClientLayout>
      <div className="flex flex-col space-y-8 bg-gradient-to-br from-pink-50/30 to-rose-50/20 p-6 rounded-lg">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900">Notificaciones</h1>
            {unreadCount > 0 && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold">
                {unreadCount} sin leer
              </Badge>
            )}
          </div>
          <p className="text-gray-600 text-lg">
            Mantente al día con todos los aspectos de tu boda
          </p>
        </div>

        {/* Notification Settings */}
        <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              Configuración de Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900">Notificaciones por email</h4>
                <p className="text-sm text-gray-600">Recibe notificaciones en tu correo electrónico</p>
              </div>
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={(checked) => {
                  setEmailNotifications(checked);
                  toast({
                    title: checked ? "Email activado" : "Email desactivado",
                    description: `Las notificaciones por email han sido ${checked ? 'activadas' : 'desactivadas'}.`
                  });
                }}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900">Notificaciones push</h4>
                <p className="text-sm text-gray-600">Recibe notificaciones en tiempo real en el navegador</p>
              </div>
              <Switch 
                checked={pushNotifications} 
                onCheckedChange={(checked) => {
                  setPushNotifications(checked);
                  toast({
                    title: checked ? "Push activado" : "Push desactivado",
                    description: `Las notificaciones push han sido ${checked ? 'activadas' : 'desactivadas'}.`
                  });
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="hover:bg-green-50 border-green-200"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Marcar todas como leídas
          </Button>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="message">Mensajes</SelectItem>
              <SelectItem value="payment">Pagos</SelectItem>
              <SelectItem value="appointment">Citas</SelectItem>
              <SelectItem value="task">Tareas</SelectItem>
              <SelectItem value="service">Servicios</SelectItem>
              <SelectItem value="info">Información</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearReadNotifications}
            className="hover:bg-red-50 border-red-200"
          >
            <Archive className="h-4 w-4 mr-2" />
            Limpiar leídas
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const IconComponent = notification.icon;
              
              return (
                <Card 
                  key={notification.id} 
                  className={`shadow-lg transition-all duration-200 hover:shadow-xl cursor-pointer ${
                    !notification.read 
                      ? 'border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-white' 
                      : 'bg-white/80 backdrop-blur-sm'
                  }`}
                  onClick={() => viewNotification(notification)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${
                        !notification.read ? 'bg-white shadow-sm' : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`h-6 w-6 ${notification.color}`} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                              <h4 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </h4>
                              <Badge className={getTypeColor(notification.type)} variant="secondary">
                                {getTypeLabel(notification.type)}
                              </Badge>
                              {!notification.read && (
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{notification.description}</p>
                            <p className="text-xs text-gray-500 font-medium">{notification.timestamp}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                viewNotification(notification);
                              }}
                              className="hover:bg-pink-50 border-pink-200"
                            >
                              Ver
                            </Button>
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="hover:bg-green-50 text-green-600"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="py-16 text-center">
                <Bell className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">No tienes notificaciones</h3>
                <p className="text-gray-500">Cuando tengas nuevas notificaciones aparecerán aquí.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientNotificaciones;
