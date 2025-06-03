
import React, { useState } from 'react';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, MessageSquare, Calendar, CreditCard, Heart, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ClientNotificaciones = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const notifications = [
    {
      id: '1',
      type: 'message',
      title: 'Nuevo mensaje de Carlos Jiménez Fotografía',
      description: 'Te ha enviado detalles sobre la sesión de compromiso programada para el viernes.',
      timestamp: 'Hace 2 horas',
      read: false,
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Recordatorio de pago',
      description: 'El segundo pago de Villa Rosa vence en 3 días (€3,000).',
      timestamp: 'Hace 4 horas',
      read: false,
      icon: CreditCard,
      color: 'text-red-600'
    },
    {
      id: '3',
      type: 'appointment',
      title: 'Cita confirmada',
      description: 'Degustación de menú con Catering Deluxe confirmada para mañana a las 12:00.',
      timestamp: 'Ayer',
      read: true,
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      id: '4',
      type: 'task',
      title: 'Nueva tarea asignada',
      description: 'Confirmar lista final de invitados - Fecha límite: 30 de junio.',
      timestamp: 'Ayer',
      read: true,
      icon: CheckCircle,
      color: 'text-purple-600'
    },
    {
      id: '5',
      type: 'service',
      title: 'Nuevo servicio recomendado',
      description: 'Hemos encontrado un servicio de música que podría interesarte.',
      timestamp: '2 días',
      read: true,
      icon: Heart,
      color: 'text-pink-600'
    },
    {
      id: '6',
      type: 'info',
      title: 'Consejo de planificación',
      description: 'A 387 días de tu boda: Es un buen momento para reservar el transporte.',
      timestamp: '3 días',
      read: true,
      icon: Info,
      color: 'text-gray-600'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'message': return 'bg-blue-100 text-blue-800';
      case 'payment': return 'bg-red-100 text-red-800';
      case 'appointment': return 'bg-green-100 text-green-800';
      case 'task': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-pink-100 text-pink-800';
      case 'info': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'message': return 'Mensaje';
      case 'payment': return 'Pago';
      case 'appointment': return 'Cita';
      case 'task': return 'Tarea';
      case 'service': return 'Servicio';
      case 'info': return 'Información';
      default: return 'Notificación';
    }
  };

  return (
    <ClientLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Notificaciones</h1>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">
                {unreadCount} sin leer
              </Badge>
            )}
          </div>
          <p className="text-gray-500">
            Mantente al día con todos los aspectos de tu boda.
          </p>
        </div>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Configuración de Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notificaciones por email</h4>
                <p className="text-sm text-gray-500">Recibe notificaciones en tu correo electrónico</p>
              </div>
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notificaciones push</h4>
                <p className="text-sm text-gray-500">Recibe notificaciones en tiempo real en el navegador</p>
              </div>
              <Switch 
                checked={pushNotifications} 
                onCheckedChange={setPushNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Marcar todas como leídas
          </Button>
          <Button variant="outline" size="sm">
            Filtrar por tipo
          </Button>
          <Button variant="outline" size="sm">
            Limpiar leídas
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            
            return (
              <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full bg-gray-100`}>
                      <IconComponent className={`h-5 w-5 ${notification.color}`} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h4>
                            <Badge className={getTypeColor(notification.type)} variant="secondary">
                              {getTypeLabel(notification.type)}
                            </Badge>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{notification.description}</p>
                          <p className="text-xs text-gray-500">{notification.timestamp}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver
                          </Button>
                          {!notification.read && (
                            <Button variant="ghost" size="sm">
                              Marcar como leída
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No tienes notificaciones</h3>
              <p className="text-gray-500">Cuando tengas nuevas notificaciones aparecerán aquí.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ClientLayout>
  );
};

export default ClientNotificaciones;
