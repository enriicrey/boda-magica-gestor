
import React, { useState } from 'react';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Paperclip, Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const ClientMensajes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState('1');
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: '1',
      provider: 'Carlos Jiménez Fotografía',
      lastMessage: 'Perfecto, nos vemos el viernes para la sesión de prueba',
      timestamp: '10:30',
      unread: 0,
      avatar: 'CJ',
      online: true
    },
    {
      id: '2',
      provider: 'Villa Rosa',
      lastMessage: 'He enviado el contrato actualizado con los cambios solicitados',
      timestamp: 'Ayer',
      unread: 2,
      avatar: 'VR',
      online: false
    },
    {
      id: '3',
      provider: 'Catering Deluxe',
      lastMessage: 'La degustación está programada para el próximo martes',
      timestamp: '2 días',
      unread: 0,
      avatar: 'CD',
      online: true
    }
  ];

  const messages = [
    {
      id: '1',
      sender: 'Carlos Jiménez',
      content: 'Hola Clara, he revisado las fechas disponibles para la sesión de compromiso.',
      timestamp: '09:15',
      isProvider: true
    },
    {
      id: '2',
      sender: 'Yo',
      content: 'Perfecto Carlos. ¿Qué día te viene mejor? Nosotros tenemos disponibilidad el viernes y el sábado.',
      timestamp: '09:20',
      isProvider: false
    },
    {
      id: '3',
      sender: 'Carlos Jiménez',
      content: 'El viernes por la tarde sería ideal. ¿Qué os parece a las 17:00 en el parque del Retiro?',
      timestamp: '09:25',
      isProvider: true
    },
    {
      id: '4',
      sender: 'Yo',
      content: 'Perfecto, nos vemos el viernes a las 17:00 en el Retiro. ¿Necesitas que llevemos algo especial?',
      timestamp: '09:30',
      isProvider: false
    },
    {
      id: '5',
      sender: 'Carlos Jiménez',
      content: 'Solo traed vuestras sonrisas y ganas de pasarlo bien. Yo me encargo del resto 📸',
      timestamp: '10:30',
      isProvider: true
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Aquí se enviaría el mensaje
      setNewMessage('');
    }
  };

  return (
    <ClientLayout>
      <div className="flex flex-col h-[calc(100vh-12rem)] space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Mensajes</h1>
          <p className="text-gray-500">
            Comunícate con tus proveedores de servicios.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
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
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-pink-100 text-pink-700">
                            {conversation.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{conversation.provider}</p>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                            {conversation.unread > 0 && (
                              <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-1">
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
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-pink-100 text-pink-700">CJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Carlos Jiménez Fotografía</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-500">En línea</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium">4.9</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isProvider ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isProvider
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isProvider ? 'text-gray-500' : 'text-blue-100'
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
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Escribe tu mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientMensajes;
