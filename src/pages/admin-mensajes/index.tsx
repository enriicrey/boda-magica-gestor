
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, Send, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminMensajes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState('1');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: '1',
      subject: 'Problema con pago - Villa Rosa',
      participants: ['María García (Cliente)', 'Villa Rosa Events (Proveedor)'],
      lastMessage: 'El pago no se ha procesado correctamente, necesito ayuda',
      timestamp: '10:30',
      priority: 'Alta',
      status: 'Abierto',
      unread: 2,
      avatar: 'VR'
    },
    {
      id: '2',
      subject: 'Solicitud de reembolso - Fotografía',
      participants: ['Carlos Ruiz (Cliente)', 'Carlos Jiménez Fotografía (Proveedor)'],
      lastMessage: 'El evento se canceló, solicito reembolso completo',
      timestamp: 'Ayer',
      priority: 'Media',
      status: 'En proceso',
      unread: 0,
      avatar: 'CJ'
    },
    {
      id: '3',
      subject: 'Consulta sobre términos de servicio',
      participants: ['Ana López (Cliente)'],
      lastMessage: 'Tengo dudas sobre las políticas de cancelación',
      timestamp: '2 días',
      priority: 'Baja',
      status: 'Resuelto',
      unread: 0,
      avatar: 'AL'
    }
  ];

  const messages = [
    {
      id: '1',
      sender: 'María García',
      senderType: 'Cliente',
      content: 'Hola, tengo un problema con el pago de la reserva de Villa Rosa. El sistema me dice que el pago falló pero mi banco me confirma que se procesó.',
      timestamp: '09:15',
      isAdmin: false
    },
    {
      id: '2',
      sender: 'Villa Rosa Events',
      senderType: 'Proveedor',
      content: 'Efectivamente, no hemos recibido el pago. Por favor, contacte con soporte técnico para revisar la transacción.',
      timestamp: '09:45',
      isAdmin: false
    },
    {
      id: '3',
      sender: 'Soporte Admin',
      senderType: 'Administrador',
      content: 'Hemos revisado la transacción. Hubo un error temporal en el sistema de pagos. Vamos a procesar el pago manualmente y confirmaremos en las próximas 2 horas.',
      timestamp: '10:30',
      isAdmin: true
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.participants.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPriority = priorityFilter === 'all' || conv.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

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
      case 'Abierto': return 'bg-blue-100 text-blue-800';
      case 'En proceso': return 'bg-yellow-100 text-yellow-800';
      case 'Resuelto': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Abierto': return <AlertCircle className="h-4 w-4" />;
      case 'En proceso': return <MessageSquare className="h-4 w-4" />;
      case 'Resuelto': return <CheckCircle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col h-[calc(100vh-12rem)] space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Centro de Mensajes</h1>
          <p className="text-gray-500">
            Gestione las conversaciones entre clientes y proveedores.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Buscar conversaciones..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las prioridades</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-3 cursor-pointer border-b hover:bg-gray-50 ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {conversation.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.status === 'Abierto' && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-medium text-sm truncate">{conversation.subject}</h4>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                            {conversation.unread > 0 && (
                              <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getPriorityColor(conversation.priority)} variant="secondary">
                            {conversation.priority}
                          </Badge>
                          <Badge className={getStatusColor(conversation.status)} variant="secondary">
                            {getStatusIcon(conversation.status)}
                            <span className="ml-1">{conversation.status}</span>
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">
                          {conversation.participants.join(', ')}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Problema con pago - Villa Rosa</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-red-100 text-red-800">Alta prioridad</Badge>
                    <Badge className="bg-blue-100 text-blue-800">Abierto</Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Cerrar ticket</Button>
                  <Button size="sm">Escalar</Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isAdmin
                          ? 'bg-blue-500 text-white'
                          : message.senderType === 'Cliente'
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-purple-100 text-purple-900'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <p className={`text-xs font-medium ${
                          message.isAdmin ? 'text-blue-100' : 'text-gray-600'
                        }`}>
                          {message.sender} ({message.senderType})
                        </p>
                      </div>
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isAdmin ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="space-y-2">
                <Textarea
                  placeholder="Escribe tu respuesta como administrador..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-20"
                />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Plantilla</Button>
                    <Button variant="outline" size="sm">Adjuntar</Button>
                  </div>
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar respuesta
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMensajes;
