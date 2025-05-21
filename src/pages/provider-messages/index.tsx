
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  PlusCircle,
  ImagePlus,
  FilePlus,
  MapPin,
  Calendar,
  Smile,
  Clock,
  Check,
  CheckCheck,
  Trash,
  MicIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';

// Definir interfaces
interface Contact {
  id: number;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  online?: boolean;
  isVendor?: boolean;
  typing?: boolean;
}

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  isMe: boolean;
  attachments?: {
    type: 'image' | 'document' | 'location';
    url?: string;
    name?: string;
    thumbnail?: string;
    location?: {
      name: string;
      address: string;
    }
  }[];
}

// Mock data
const currentUser = {
  id: 1,
  name: "Carlos Jiménez",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const ProviderMessages = () => {
  // Estados
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [isAttachMenuOpen, setIsAttachMenuOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Efecto para cargar datos de ejemplo
  useEffect(() => {
    const mockContacts: Contact[] = [
      {
        id: 2,
        name: "María García (Cliente)",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastMessage: "¿Podrías enviarme más fotos de ejemplo?",
        lastMessageTime: "12:45",
        unreadCount: 2,
        online: true,
        isVendor: false,
      },
      {
        id: 3,
        name: "Catering Delicias (Vendor)",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastMessage: "Te comparto el menú actualizado",
        lastMessageTime: "Ayer",
        unreadCount: 0,
        online: false,
        isVendor: true,
      },
      {
        id: 4,
        name: "Pedro Sánchez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastMessage: "¿Has considerado incluir un segundo fotógrafo?",
        lastMessageTime: "Ayer",
        unreadCount: 1,
        online: true,
        isVendor: false,
      },
      {
        id: 5,
        name: "Ana Rodríguez",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastMessage: "Gracias por las fotos, nos encantan",
        lastMessageTime: "Lunes",
        unreadCount: 0,
        online: false,
        isVendor: false,
      },
      {
        id: 6,
        name: "Finca El Olivar (Venue)",
        avatar: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastMessage: "Confirmamos disponibilidad para el 15 de julio",
        lastMessageTime: "05/05",
        unreadCount: 0,
        online: true,
        isVendor: true,
      },
      {
        id: 7,
        name: "Laura Martínez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastMessage: "¿Podríamos cambiar la fecha de la sesión pre-boda?",
        lastMessageTime: "02/05",
        unreadCount: 0,
        online: false,
        isVendor: false,
        typing: true,
      },
    ];
    
    setContacts(mockContacts);
    setFilteredContacts(mockContacts);
    
    // Seleccionar el primer contacto de la lista por defecto
    if (mockContacts.length > 0 && !selectedContact) {
      handleSelectContact(mockContacts[0]);
    }
  }, []);
  
  // Efecto para filtrar contactos cuando cambia el término de búsqueda
  useEffect(() => {
    const filtered = contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [contacts, searchQuery]);
  
  // Efecto para hacer scroll al final de los mensajes cuando se añaden nuevos
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Seleccionar un contacto para chatear
  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    
    // Cargar mensajes para este contacto
    const mockMessages: Message[] = [
      {
        id: 1,
        senderId: contact.id,
        receiverId: currentUser.id,
        content: "Hola Carlos, me gustaría hablar contigo sobre los servicios de fotografía para mi boda.",
        timestamp: "11:30",
        status: 'read',
        isMe: false
      },
      {
        id: 2,
        senderId: currentUser.id,
        receiverId: contact.id,
        content: "¡Hola! Claro, encantado de ayudarte. ¿Cuándo es la fecha prevista para tu boda?",
        timestamp: "11:32",
        status: 'read',
        isMe: true
      },
      {
        id: 3,
        senderId: contact.id,
        receiverId: currentUser.id,
        content: "Estamos pensando en el 15 de septiembre de 2025. ¿Tienes disponibilidad para esa fecha?",
        timestamp: "11:35",
        status: 'read',
        isMe: false
      },
      {
        id: 4,
        senderId: currentUser.id,
        receiverId: contact.id,
        content: "Déjame verificar mi agenda... ¡Sí, tengo disponibilidad para esa fecha! ¿Qué tipo de reportaje estás buscando?",
        timestamp: "11:40",
        status: 'read',
        isMe: true
      },
      {
        id: 5,
        senderId: contact.id,
        receiverId: currentUser.id,
        content: "Nos gustaría un reportaje completo desde los preparativos hasta el final de la fiesta. ¿Podrías compartirme ejemplos de tu trabajo y tus paquetes?",
        timestamp: "11:45",
        status: 'read',
        isMe: false
      },
      {
        id: 6,
        senderId: currentUser.id,
        receiverId: contact.id,
        content: "Por supuesto, aquí tienes algunos ejemplos de bodas recientes:",
        timestamp: "12:00",
        status: 'read',
        isMe: true,
        attachments: [
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
          },
          {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
          }
        ]
      },
      {
        id: 7,
        senderId: currentUser.id,
        receiverId: contact.id,
        content: "Y aquí está mi catálogo de servicios con todos los paquetes y precios:",
        timestamp: "12:02",
        status: 'read',
        isMe: true,
        attachments: [
          {
            type: 'document',
            name: 'Catálogo_Servicios_2025.pdf',
            url: '#'
          }
        ]
      },
      {
        id: 8,
        senderId: currentUser.id,
        receiverId: contact.id,
        content: "Esta es la ubicación de mi estudio por si quieres pasar a verme en persona:",
        timestamp: "12:05",
        status: 'delivered',
        isMe: true,
        attachments: [
          {
            type: 'location',
            location: {
              name: "Estudio Fotográfico Carlos",
              address: "Calle Gran Vía 45, Madrid"
            }
          }
        ]
      },
      {
        id: 9,
        senderId: contact.id,
        receiverId: currentUser.id,
        content: "¡Gracias! Las fotos son preciosas. ¿Podrías enviarme más fotos de ejemplo?",
        timestamp: "12:45",
        status: 'delivered',
        isMe: false
      }
    ];
    
    setMessages(mockMessages);
    
    // Marcar mensajes como leídos
    const updatedContacts = contacts.map(c => 
      c.id === contact.id 
        ? {...c, unreadCount: 0} 
        : c
    );
    setContacts(updatedContacts);
    setFilteredContacts(updatedContacts.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  };
  
  // Enviar un mensaje
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedContact) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      senderId: currentUser.id,
      receiverId: selectedContact.id,
      content: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending',
      isMe: true
    };
    
    setMessages([...messages, newMessage]);
    setMessageText('');
    
    // Simular cambio de estado del mensaje (sending -> sent -> delivered)
    setTimeout(() => {
      setMessages(currentMessages => 
        currentMessages.map(m => 
          m.id === newMessage.id 
            ? {...m, status: 'sent'} 
            : m
        )
      );
      
      setTimeout(() => {
        setMessages(currentMessages => 
          currentMessages.map(m => 
            m.id === newMessage.id 
              ? {...m, status: 'delivered'} 
              : m
          )
        );
      }, 1500);
    }, 1000);
    
    // Simular respuesta después de un tiempo
    if (selectedContact.id === 2) { // Solo para María García
      setTimeout(() => {
        const replyMessage: Message = {
          id: messages.length + 2,
          senderId: selectedContact.id,
          receiverId: currentUser.id,
          content: "Gracias por la información. Me parece genial, ¿podríamos agendar una reunión para hablar más en detalle?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered',
          isMe: false
        };
        
        setMessages(currentMessages => [...currentMessages, replyMessage]);
        
        // Actualizar último mensaje en la lista de contactos
        setContacts(currentContacts => 
          currentContacts.map(c => 
            c.id === selectedContact.id 
              ? {
                  ...c, 
                  lastMessage: replyMessage.content,
                  lastMessageTime: replyMessage.timestamp,
                  unreadCount: (c.unreadCount || 0) + 1
                } 
              : c
          )
        );
      }, 5000);
    }
  };
  
  // Manejar anexos
  const handleAttachment = (type: string) => {
    toast.success(`Funcionalidad de adjuntar ${type} simulada`);
    setIsAttachMenuOpen(false);
  };
  
  // Renderizar el estado del mensaje
  const renderMessageStatus = (status: string) => {
    switch(status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-gray-400" />;
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };
  
  // Formatear hora del mensaje
  const formatMessageTime = (timestamp: string) => {
    return timestamp;
  };
  
  // Renderizar la vista del chat
  const renderChat = () => {
    if (!selectedContact) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-500">Selecciona un chat para comenzar</h3>
            <p className="text-sm text-gray-400 mt-1">Envía y recibe mensajes con tus clientes y proveedores</p>
          </div>
        </div>
      );
    }
    
    return (
      <>
        {/* Cabecera del chat */}
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
              <AvatarFallback>{selectedContact.name.split(' ')[0][0]}{selectedContact.name.split(' ')[1][0]}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-medium">{selectedContact.name}</p>
              <div className="flex items-center">
                {selectedContact.online ? (
                  <span className="flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                    <span className="text-xs text-gray-500">En línea</span>
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">Último acceso: Hoy, 10:23</span>
                )}
                {selectedContact.typing && (
                  <span className="ml-2 text-xs text-blue-500">escribiendo...</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Phone className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Llamada</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Video className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Videollamada</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Ver información de contacto</DropdownMenuItem>
                <DropdownMenuItem>Buscar en la conversación</DropdownMenuItem>
                <DropdownMenuItem>Silenciar notificaciones</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Eliminar chat</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Mensajes */}
        <ScrollArea className="flex-grow p-3">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] ${
                    message.isMe 
                      ? 'bg-wedding-sage/90 text-white rounded-tl-lg rounded-tr-sm rounded-bl-lg' 
                      : 'bg-gray-100 text-gray-800 rounded-tr-lg rounded-tl-sm rounded-br-lg'
                  } p-3 shadow-sm`}
                >
                  {/* Contenido del mensaje */}
                  <p className="break-words">{message.content}</p>
                  
                  {/* Adjuntos */}
                  {message.attachments && (
                    <div className="mt-2 space-y-2">
                      {message.attachments.map((attachment, index) => (
                        <div key={index}>
                          {attachment.type === 'image' && (
                            <div className="rounded-lg overflow-hidden">
                              <img 
                                src={attachment.url} 
                                alt="Attachment" 
                                className="w-full h-auto cursor-pointer"
                                onClick={() => toast.success('Vista previa de imagen abierta')}
                              />
                            </div>
                          )}
                          
                          {attachment.type === 'document' && (
                            <div 
                              className={`flex items-center p-2 rounded-md ${
                                message.isMe ? 'bg-wedding-sage/80' : 'bg-gray-200'
                              }`}
                              onClick={() => toast.success('Documento abierto')}
                            >
                              <FilePlus className={`h-5 w-5 ${message.isMe ? 'text-white' : 'text-gray-600'}`} />
                              <span className={`ml-2 text-sm ${message.isMe ? 'text-white' : 'text-gray-700'}`}>
                                {attachment.name}
                              </span>
                            </div>
                          )}
                          
                          {attachment.type === 'location' && attachment.location && (
                            <div 
                              className={`flex items-center p-2 rounded-md ${
                                message.isMe ? 'bg-wedding-sage/80' : 'bg-gray-200'
                              } cursor-pointer`}
                              onClick={() => toast.success('Ubicación abierta en mapa')}
                            >
                              <MapPin className={`h-5 w-5 flex-shrink-0 ${message.isMe ? 'text-white' : 'text-gray-600'}`} />
                              <div className={`ml-2 ${message.isMe ? 'text-white' : 'text-gray-700'}`}>
                                <p className="font-medium text-sm">{attachment.location.name}</p>
                                <p className="text-xs">{attachment.location.address}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Hora y estado */}
                  <div className={`flex items-center justify-end mt-1 space-x-1 text-xs ${
                    message.isMe ? 'text-wedding-sage/30' : 'text-gray-500'
                  }`}>
                    <span>{formatMessageTime(message.timestamp)}</span>
                    {message.isMe && (
                      <span>{renderMessageStatus(message.status)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Input para escribir mensaje */}
        <div className="border-t p-3">
          <div className="flex items-end">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9"
                onClick={() => setIsAttachMenuOpen(!isAttachMenuOpen)}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              
              {isAttachMenuOpen && (
                <div className="absolute bottom-full left-0 mb-2 p-2 bg-white rounded-lg shadow-lg border flex flex-col space-y-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleAttachment('imagen')}
                    className="flex justify-start px-2"
                  >
                    <ImagePlus className="h-4 w-4 mr-2" />
                    <span>Imagen</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleAttachment('documento')}
                    className="flex justify-start px-2"
                  >
                    <FilePlus className="h-4 w-4 mr-2" />
                    <span>Documento</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleAttachment('ubicación')}
                    className="flex justify-start px-2"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Ubicación</span>
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex-grow mx-2">
              <Textarea
                placeholder="Escribe un mensaje..."
                className="resize-none min-h-[44px] max-h-[120px]"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9"
              >
                <Smile className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9"
              >
                <MicIcon className="h-5 w-5" />
              </Button>
              <Button
                className="rounded-full h-9 w-9 bg-wedding-sage hover:bg-wedding-sage/90"
                size="icon"
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />
      
      <main className="flex-grow py-8">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-serif font-semibold">Mensajes</h1>
          </div>
          
          <Card className="shadow-md overflow-hidden">
            <div className="flex h-[75vh]">
              {/* Panel de contactos */}
              <div className="w-1/3 border-r flex flex-col">
                {/* Cabecera de búsqueda */}
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      placeholder="Buscar en mensajes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                
                {/* Lista de contactos */}
                <ScrollArea className="flex-grow">
                  <div>
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`p-3 flex items-center hover:bg-gray-100 cursor-pointer ${
                          selectedContact?.id === contact.id ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => handleSelectContact(contact)}
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={contact.avatar} alt={contact.name} />
                            <AvatarFallback>{contact.name.split(' ')[0][0]}{contact.name.split(' ')[1][0]}</AvatarFallback>
                          </Avatar>
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
                          )}
                        </div>
                        
                        <div className="ml-3 flex-grow min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="font-medium truncate">{contact.name}</p>
                            <p className="text-xs text-gray-500">{contact.lastMessageTime}</p>
                          </div>
                          
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-gray-600 truncate">
                              {contact.typing ? (
                                <span className="text-blue-500">escribiendo...</span>
                              ) : contact.lastMessage}
                            </p>
                            
                            {contact.unreadCount && contact.unreadCount > 0 ? (
                              <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-wedding-sage text-white">
                                {contact.unreadCount}
                              </Badge>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {filteredContacts.length === 0 && (
                      <div className="p-6 text-center text-gray-500">
                        No se encontraron contactos que coincidan con la búsqueda
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                {/* Acciones rápidas */}
                <div className="p-3 border-t">
                  <Button className="w-full bg-wedding-sage hover:bg-wedding-sage/90">
                    <PlusCircle className="mr-1 h-4 w-4" /> Nuevo mensaje
                  </Button>
                </div>
              </div>
              
              {/* Panel de chat */}
              <div className="w-2/3 flex flex-col">
                {renderChat()}
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProviderMessages;
