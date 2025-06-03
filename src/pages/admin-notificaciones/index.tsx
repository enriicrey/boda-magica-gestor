
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Send, Users, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';

const AdminNotificaciones = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Mantenimiento programado del sistema',
      message: 'El sistema estará en mantenimiento el domingo de 02:00 a 06:00',
      type: 'Sistema',
      priority: 'Media',
      audience: 'Todos los usuarios',
      status: 'Activa',
      sentDate: '2024-06-10',
      recipients: 1245,
      readCount: 892
    },
    {
      id: '2',
      title: 'Nueva función: Chat en tiempo real',
      message: 'Ya está disponible el nuevo sistema de mensajería instantánea',
      type: 'Función',
      priority: 'Baja',
      audience: 'Clientes y Proveedores',
      status: 'Programada',
      sentDate: '2024-06-15',
      recipients: 1100,
      readCount: 0
    },
    {
      id: '3',
      title: 'Problema de conectividad resuelto',
      message: 'Se ha solucionado el problema de conexión reportado esta mañana',
      type: 'Incidencia',
      priority: 'Alta',
      audience: 'Todos los usuarios',
      status: 'Enviada',
      sentDate: '2024-06-08',
      recipients: 1245,
      readCount: 1200
    }
  ]);

  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'Sistema',
    priority: 'Media',
    audience: 'all',
    sendNow: false
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Sistema': return 'bg-blue-100 text-blue-800';
      case 'Función': return 'bg-green-100 text-green-800';
      case 'Incidencia': return 'bg-red-100 text-red-800';
      case 'Promoción': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta': return 'bg-red-100 text-red-800';
      case 'Media': return 'bg-yellow-100 text-yellow-800';
      case 'Baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activa': return 'bg-green-100 text-green-800';
      case 'Programada': return 'bg-blue-100 text-blue-800';
      case 'Enviada': return 'bg-gray-100 text-gray-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Activa': return <Bell className="h-4 w-4" />;
      case 'Programada': return <Info className="h-4 w-4" />;
      case 'Enviada': return <CheckCircle className="h-4 w-4" />;
      case 'Cancelada': return <X className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const handleSendNotification = () => {
    if (newNotification.title && newNotification.message) {
      const notification = {
        id: String(notifications.length + 1),
        ...newNotification,
        audience: newNotification.audience === 'all' ? 'Todos los usuarios' : 
                 newNotification.audience === 'clients' ? 'Solo Clientes' : 'Solo Proveedores',
        status: newNotification.sendNow ? 'Enviada' : 'Programada',
        sentDate: new Date().toISOString().split('T')[0],
        recipients: newNotification.audience === 'all' ? 1245 : 
                   newNotification.audience === 'clients' ? 865 : 380,
        readCount: newNotification.sendNow ? Math.floor(Math.random() * 100) : 0
      };

      setNotifications([notification, ...notifications]);
      setNewNotification({
        title: '',
        message: '',
        type: 'Sistema',
        priority: 'Media',
        audience: 'all',
        sendNow: false
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Centro de Notificaciones</h1>
          <p className="text-gray-500">
            Gestione las notificaciones y comunicaciones masivas a los usuarios.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Notification */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Nueva Notificación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Título</label>
                <Input
                  placeholder="Título de la notificación"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Mensaje</label>
                <Textarea
                  placeholder="Contenido de la notificación"
                  className="min-h-24"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo</label>
                <Select value={newNotification.type} onValueChange={(value) => setNewNotification({...newNotification, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sistema">Sistema</SelectItem>
                    <SelectItem value="Función">Nueva Función</SelectItem>
                    <SelectItem value="Incidencia">Incidencia</SelectItem>
                    <SelectItem value="Promoción">Promoción</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Prioridad</label>
                <Select value={newNotification.priority} onValueChange={(value) => setNewNotification({...newNotification, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Audiencia</label>
                <Select value={newNotification.audience} onValueChange={(value) => setNewNotification({...newNotification, audience: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los usuarios</SelectItem>
                    <SelectItem value="clients">Solo Clientes</SelectItem>
                    <SelectItem value="providers">Solo Proveedores</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Enviar ahora</label>
                <Switch
                  checked={newNotification.sendNow}
                  onCheckedChange={(checked) => setNewNotification({...newNotification, sendNow: checked})}
                />
              </div>

              <Button onClick={handleSendNotification} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                {newNotification.sendNow ? 'Enviar Ahora' : 'Programar'}
              </Button>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificaciones Enviadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{notification.title}</h4>
                          <Badge className={getStatusColor(notification.status)}>
                            {getStatusIcon(notification.status)}
                            <span className="ml-1">{notification.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getTypeColor(notification.type)} variant="secondary">
                            {notification.type}
                          </Badge>
                          <Badge className={getPriorityColor(notification.priority)} variant="secondary">
                            {notification.priority}
                          </Badge>
                          <Badge variant="outline">
                            <Users className="h-3 w-3 mr-1" />
                            {notification.audience}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>{notification.sentDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>📤 {notification.recipients} enviadas</span>
                        <span>👁️ {notification.readCount} leídas</span>
                        <span>📊 {Math.round((notification.readCount / notification.recipients) * 100)}% tasa de lectura</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Ver detalles</Button>
                        {notification.status === 'Programada' && (
                          <Button variant="outline" size="sm" className="text-red-600">
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Enviadas</p>
                  <p className="text-2xl font-bold">127</p>
                </div>
                <Send className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tasa de Lectura</p>
                  <p className="text-2xl font-bold">78%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Programadas</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Info className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Usuarios Activos</p>
                  <p className="text-2xl font-bold">1,245</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNotificaciones;
