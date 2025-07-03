
import { useState } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Search, Send, Paperclip, Phone, Video, MoreVertical, Eye, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Mock data para conversaciones
const mockConversations = [
  {
    id: 'conv1',
    clientName: 'Laura Pérez',
    clientEmail: 'laura@example.com',
    lastMessage: 'Perfecto, confirmo la fecha del 15 de junio para la sesión',
    timestamp: '10:30',
    unread: 2,
    status: 'online',
    eventType: 'Boda',
    eventDate: '2024-06-15'
  },
  {
    id: 'conv2',
    clientName: 'Carlos Mendoza',
    clientEmail: 'carlos@example.com',
    lastMessage: '¿Podríamos incluir la decoración de mesas en el paquete?',
    timestamp: 'Ayer',
    unread: 0,
    status: 'offline',
    eventType: 'Corporativo',
    eventDate: '2024-07-20'
  },
  {
    id: 'conv3',
    clientName: 'Ana García',
    clientEmail: 'ana@example.com',
    lastMessage: 'Gracias por el presupuesto, lo revisamos y te contactamos',
    timestamp: '2 días',
    unread: 1,
    status: 'offline',
    eventType: 'Cumpleaños',
    eventDate: '2024-08-05'
  },
];

// Mock data para mensajes
const mockMessages = {
  'conv1': [
    {
      id: 1,
      sender: 'client',
      content: 'Hola Diana, ¿podríamos coordinar los detalles de la sesión de fotos?',
      timestamp: '09:45',
      type: 'text'
    },
    {
      id: 2,
      sender: 'provider',
      content: 'Por supuesto Laura, ¿qué fecha tenías en mente?',
      timestamp: '09:50',
      type: 'text'
    },
    {
      id: 3,
      sender: 'client',
      content: 'El 15 de junio estaría perfecto, ¿tienes disponibilidad?',
      timestamp: '10:15',
      type: 'text'
    },
    {
      id: 4,
      sender: 'provider',
      content: 'Sí, tengo ese día libre. ¿Prefieres por la mañana o por la tarde?',
      timestamp: '10:20',
      type: 'text'
    },
    {
      id: 5,
      sender: 'client',
      content: 'Perfecto, confirmo la fecha del 15 de junio para la sesión',
      timestamp: '10:30',
      type: 'text'
    },
  ],
  'conv2': [
    {
      id: 1,
      sender: 'client',
      content: 'Buenos días Diana, hemos revisado tu propuesta para el evento corporativo',
      timestamp: 'Ayer 14:30',
      type: 'text'
    },
    {
      id: 2,
      sender: 'provider',
      content: 'Perfecto Carlos, ¿qué te parece la propuesta?',
      timestamp: 'Ayer 14:45',
      type: 'text'
    },
    {
      id: 3,
      sender: 'client',
      content: '¿Podríamos incluir la decoración de mesas en el paquete?',
      timestamp: 'Ayer 15:20',
      type: 'text'
    },
  ],
  'conv3': [
    {
      id: 1,
      sender: 'client',
      content: 'Hola, nos podrías enviar un presupuesto para una fiesta de cumpleaños?',
      timestamp: '3 días 16:00',
      type: 'text'
    },
    {
      id: 2,
      sender: 'provider',
      content: 'Por supuesto Ana, ¿cuántos invitados aproximadamente?',
      timestamp: '3 días 16:15',
      type: 'text'
    },
    {
      id: 3,
      sender: 'client',
      content: 'Serían unas 50 personas, queremos algo elegante pero no muy formal',
      timestamp: '3 días 16:30',
      type: 'text'
    },
    {
      id: 4,
      sender: 'provider',
      content: 'Te envío el presupuesto detallado por email',
      timestamp: '2 días 10:00',
      type: 'text'
    },
    {
      id: 5,
      sender: 'client',
      content: 'Gracias por el presupuesto, lo revisamos y te contactamos',
      timestamp: '2 días 18:00',
      type: 'text'
    },
  ],
};

const ProviderMessages = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState('conv1');
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = mockConversations.filter(conv =>
    conv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.eventType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    toast({
      title: "Mensaje enviado",
      description: "Tu mensaje ha sido enviado correctamente",
    });
    setNewMessage('');
  };

  const handleAttachFile = () => {
    toast({
      title: "Adjuntar archivo",
      description: "Funcionalidad de adjuntar archivos disponible próximamente",
    });
  };

  const handleViewClientDetails = (conversationId: string) => {
    navigate('/provider-clients');
  };

  const handleVideoCall = () => {
    toast({
      title: "Videollamada",
      description: "Iniciando videollamada...",
    });
  };

  const handlePhoneCall = () => {
    toast({
      title: "Llamada",
      description: "Iniciando llamada telefónica...",
    });
  };

  const selectedConversationData = mockConversations.find(conv => conv.id === selectedConversation);
  const messages = mockMessages[selectedConversation as keyof typeof mockMessages] || [];

  return (
    <ProviderLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Mensajes</h1>
          <p className="text-gray-600">
            Conversa con tus parejas y haz realidad su día especial
          </p>
        </div>

        <div className="flex flex-1 gap-6 min-h-0">
          {/* Lista de conversaciones */}
          <Card className="w-full lg:w-80 flex flex-col border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Conversaciones</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar conversaciones..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full">
                <div className="space-y-1 p-4 pt-0">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation === conversation.id
                          ? 'bg-wedding-blush/20 border border-wedding-sage/20'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="" alt={conversation.clientName} />
                            <AvatarFallback>
                              {conversation.clientName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.status === 'online' && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900 truncate">
                              {conversation.clientName}
                            </h4>
                            <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className="text-xs">
                              {conversation.eventType}
                            </Badge>
                            {conversation.unread > 0 && (
                              <Badge className="bg-wedding-sage text-white text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Área de conversación */}
          <Card className="flex-1 flex flex-col border-0 shadow-md">
            {selectedConversationData ? (
              <>
                {/* Header de la conversación */}
                <CardHeader className="pb-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" alt={selectedConversationData.clientName} />
                        <AvatarFallback>
                          {selectedConversationData.clientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {selectedConversationData.clientName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {selectedConversationData.eventType} • {selectedConversationData.eventDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={handlePhoneCall}>
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleVideoCall}>
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewClientDetails(selectedConversation)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Mensajes */}
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'provider' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === 'provider'
                                ? 'bg-wedding-sage text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'provider' ? 'text-white/70' : 'text-gray-500'
                            }`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Input para nuevo mensaje */}
                <div className="border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={handleAttachFile}>
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Escribe tu mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} className="bg-wedding-sage hover:bg-wedding-sage/90">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Selecciona una conversación
                  </h3>
                  <p className="text-gray-600">
                    Elige una conversación de la lista para comenzar a chatear
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderMessages;
