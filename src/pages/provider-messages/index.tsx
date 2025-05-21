
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Paperclip, Phone, Video, MoreHorizontal, ChevronDown, Star, Filter, Trash, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Interfaces
interface Contact {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isStarred: boolean;
  email: string;
  phone?: string;
  type: 'client' | 'team' | 'vendor';
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: {
    name: string;
    type: string;
    url: string;
    size?: string;
  }[];
}

interface Filters {
  search: string;
  type: 'all' | 'client' | 'team' | 'vendor';
  status: 'all' | 'unread' | 'starred';
}

const ProviderMessages = () => {
  // Estados
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [filters, setFilters] = useState<Filters>({
    search: '',
    type: 'all',
    status: 'all'
  });
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [isNewMessageDialogOpen, setIsNewMessageDialogOpen] = useState(false);
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Usuario actual (simulado)
  const currentUser = {
    id: 'current-user',
    name: 'Carlos Jiménez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'carlos@fotografiajimenez.com'
  };

  // Cargar datos simulados
  useEffect(() => {
    // Contactos simulados
    const mockContacts: Contact[] = [
      {
        id: 'contact-1',
        name: 'María García',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'online',
        lastMessage: '¿Podemos hablar sobre la sesión pre-boda?',
        lastMessageTime: '10:30',
        unreadCount: 2,
        isStarred: true,
        email: 'maria.garcia@example.com',
        phone: '612 345 678',
        type: 'client'
      },
      {
        id: 'contact-2',
        name: 'Pedro Sánchez',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'offline',
        lastMessage: 'Muchas gracias por las fotos, son geniales',
        lastMessageTime: 'Ayer',
        unreadCount: 0,
        isStarred: false,
        email: 'pedro.sanchez@example.com',
        phone: '623 456 789',
        type: 'client'
      },
      {
        id: 'contact-3',
        name: 'Ana Rodríguez',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'away',
        lastMessage: 'Necesitamos programar una reunión para hablar sobre tu servicio',
        lastMessageTime: '12/05',
        unreadCount: 1,
        isStarred: true,
        email: 'ana.rodriguez@example.com',
        phone: '634 567 890',
        type: 'client'
      },
      {
        id: 'contact-4',
        name: 'Equipo Técnico',
        avatar: undefined,
        status: 'online',
        lastMessage: 'La calibración del equipo está lista',
        lastMessageTime: '15/05',
        unreadCount: 0,
        isStarred: false,
        email: 'soporte@tecnofoto.com',
        type: 'team'
      },
      {
        id: 'contact-5',
        name: 'Laura Asistente',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'online',
        lastMessage: 'He confirmado la cita con el cliente del viernes',
        lastMessageTime: 'Hoy',
        unreadCount: 0,
        isStarred: false,
        email: 'laura@fotografiajimenez.com',
        phone: '645 678 901',
        type: 'team'
      },
      {
        id: 'contact-6',
        name: 'Álbumes Premium',
        avatar: undefined,
        status: 'offline',
        lastMessage: 'Los álbumes se entregarán el próximo lunes',
        lastMessageTime: '10/05',
        unreadCount: 0,
        isStarred: false,
        email: 'info@albumespremium.com',
        phone: '910 123 456',
        type: 'vendor'
      }
    ];
    
    // Mensajes simulados para María García
    const mockMessages: Message[] = [
      {
        id: 'msg-1',
        senderId: 'contact-1',
        receiverId: currentUser.id,
        content: 'Hola Carlos, quería preguntarte sobre la sesión pre-boda',
        timestamp: '2025-05-17T10:25:00',
        isRead: true
      },
      {
        id: 'msg-2',
        senderId: currentUser.id,
        receiverId: 'contact-1',
        content: 'Hola María, claro cuéntame, ¿qué necesitas saber?',
        timestamp: '2025-05-17T10:28:00',
        isRead: true
      },
      {
        id: 'msg-3',
        senderId: 'contact-1',
        receiverId: currentUser.id,
        content: '¿Podemos cambiar la fecha para la próxima semana? Tenemos un compromiso familiar el día que teníamos planeado',
        timestamp: '2025-05-17T10:29:00',
        isRead: true
      },
      {
        id: 'msg-4',
        senderId: 'contact-1',
        receiverId: currentUser.id,
        content: '¿Podemos hablar sobre la sesión pre-boda?',
        timestamp: '2025-05-17T10:30:00',
        isRead: false
      }
    ];
    
    setContacts(mockContacts);
    setFilteredContacts(mockContacts);
    setMessages(mockMessages);
    setSelectedContactId('contact-1');
  }, []);

  // Filtrar contactos según los criterios seleccionados
  useEffect(() => {
    let filtered = [...contacts];
    
    // Filtro de búsqueda
    if (filters.search) {
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        contact.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        contact.lastMessage.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    // Filtro por tipo
    if (filters.type !== 'all') {
      filtered = filtered.filter(contact => contact.type === filters.type);
    }
    
    // Filtro por estado
    if (filters.status === 'unread') {
      filtered = filtered.filter(contact => contact.unreadCount > 0);
    } else if (filters.status === 'starred') {
      filtered = filtered.filter(contact => contact.isStarred);
    }
    
    setFilteredContacts(filtered);
  }, [contacts, filters]);
  
  // Seleccionar un contacto
  const handleSelectContact = (contactId: string) => {
    // Marcar mensajes como leídos
    setMessages(messages.map(msg => 
      msg.receiverId === currentUser.id && msg.senderId === contactId
        ? {...msg, isRead: true}
        : msg
    ));
    
    // Actualizar contador de mensajes no leídos
    setContacts(contacts.map(contact => 
      contact.id === contactId
        ? {...contact, unreadCount: 0}
        : contact
    ));
    
    setSelectedContactId(contactId);
  };
  
  // Enviar un mensaje
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContactId) return;
    
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: selectedContactId,
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setMessages([...messages, newMsg]);
    
    // Actualizar último mensaje del contacto
    setContacts(contacts.map(contact => 
      contact.id === selectedContactId
        ? {
            ...contact, 
            lastMessage: newMessage,
            lastMessageTime: 'Ahora',
          }
        : contact
    ));
    
    setNewMessage('');
    
    // Simulación de respuesta automática
    setTimeout(() => {
      const autoReply: Message = {
        id: `msg-${Date.now() + 1}`,
        senderId: selectedContactId,
        receiverId: currentUser.id,
        content: '¡Gracias por tu mensaje! Te responderé en breve.',
        timestamp: new Date().toISOString(),
        isRead: false
      };
      
      setMessages(prev => [...prev, autoReply]);
      
      // Incrementar contador de mensajes no leídos solo si el usuario ha cambiado de contacto
      if (selectedContactId !== autoReply.senderId) {
        setContacts(contacts.map(contact => 
          contact.id === selectedContactId
            ? {...contact, unreadCount: contact.unreadCount + 1}
            : contact
        ));
      }
      
      toast.success('Nuevo mensaje recibido');
    }, 2000);
  };
  
  // Marcar/desmarcar favorito
  const toggleStarred = (contactId: string) => {
    setContacts(contacts.map(contact => 
      contact.id === contactId
        ? {...contact, isStarred: !contact.isStarred}
        : contact
    ));
    
    toast.success(`Contacto ${
      contacts.find(c => c.id === contactId)?.isStarred
        ? 'eliminado de'
        : 'añadido a'
    } favoritos`);
  };
  
  // Eliminar conversación
  const handleDeleteConversation = () => {
    if (!selectedContactId) return;
    
    // Eliminar mensajes
    setMessages(messages.filter(msg => 
      !(msg.senderId === selectedContactId || msg.receiverId === selectedContactId)
    ));
    
    toast.success('Conversación eliminada');
    setIsDeleteDialogOpen(false);
    
    // Seleccionar otro contacto si hay disponible
    if (filteredContacts.length > 1) {
      const nextContact = filteredContacts.find(c => c.id !== selectedContactId);
      if (nextContact) setSelectedContactId(nextContact.id);
      else setSelectedContactId(null);
    } else {
      setSelectedContactId(null);
    }
  };

  // Obtener contacto seleccionado
  const selectedContact = contacts.find(contact => contact.id === selectedContactId);
  
  // Filtrar mensajes para el contacto seleccionado
  const filteredMessages = messages.filter(msg => 
    (msg.senderId === currentUser.id && msg.receiverId === selectedContactId) || 
    (msg.receiverId === currentUser.id && msg.senderId === selectedContactId)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  
  // Formatear fecha de mensaje
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('es-ES', { weekday: 'long' });
    } else {
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
    }
  };
  
  // Agrupar mensajes por fecha
  const groupMessagesByDate = (messages: Message[]) => {
    const groups: {[key: string]: Message[]} = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp);
      const dateStr = date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      
      groups[dateStr].push(message);
    });
    
    return groups;
  };
  
  const messageGroups = groupMessagesByDate(filteredMessages);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />
      
      <main className="flex-grow flex overflow-hidden">
        <div className="container mx-auto my-4 flex h-[calc(100vh-8rem)] rounded-lg shadow-sm">
          {/* Panel izquierdo - Lista de contactos */}
          <div className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Mensajes</h2>
                <Button
                  size="sm"
                  className="bg-wedding-sage hover:bg-wedding-sage/90"
                  onClick={() => setIsNewMessageDialogOpen(true)}
                >
                  Nuevo mensaje
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Buscar mensajes..."
                  className="pl-9"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
            </div>
            
            <div className="p-2 border-b">
              <div className="flex space-x-2">
                <Select
                  value={filters.type}
                  onValueChange={(value) => setFilters({...filters, type: value as any})}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="client">Clientes</SelectItem>
                    <SelectItem value="team">Equipo</SelectItem>
                    <SelectItem value="vendor">Proveedores</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters({...filters, status: value as any})}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="unread">No leídos</SelectItem>
                    <SelectItem value="starred">Favoritos</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <Filter size={14} />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="divide-y">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-3 hover:bg-gray-50 cursor-pointer flex ${
                        contact.id === selectedContactId ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => handleSelectContact(contact.id)}
                    >
                      <div className="relative mr-3">
                        <Avatar>
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span 
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            contact.status === 'online' ? 'bg-green-500' :
                            contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium truncate">{contact.name}</h3>
                          <div className="flex items-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStarred(contact.id);
                              }}
                              className="text-gray-400 hover:text-yellow-400 mr-1"
                            >
                              <Star 
                                size={14} 
                                fill={contact.isStarred ? 'currentColor' : 'none'}
                                className={contact.isStarred ? 'text-yellow-400' : ''} 
                              />
                            </button>
                            <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                          {contact.unreadCount > 0 && (
                            <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center bg-wedding-sage">
                              {contact.unreadCount}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center mt-1">
                          <Badge 
                            variant="outline" 
                            className="text-[10px] px-1 py-0 border-gray-200 text-gray-500"
                          >
                            {contact.type === 'client' ? 'Cliente' : 
                             contact.type === 'team' ? 'Equipo' : 'Proveedor'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No se encontraron contactos con los filtros aplicados.
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
          
          {/* Panel derecho - Conversación */}
          <div className="hidden md:flex flex-col flex-1 bg-gray-50">
            {selectedContact ? (
              <>
                {/* Cabecera del chat */}
                <div className="px-4 py-3 bg-white border-b flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={selectedContact.avatar} />
                      <AvatarFallback>{selectedContact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedContact.name}</h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <span 
                          className={`inline-block w-2 h-2 rounded-full mr-1 ${
                            selectedContact.status === 'online' ? 'bg-green-500' :
                            selectedContact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}
                        />
                        {selectedContact.status === 'online' ? 'En línea' :
                         selectedContact.status === 'away' ? 'Ausente' : 'Desconectado'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone size={18} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsContactInfoOpen(!isContactInfoOpen)}
                    >
                      <ChevronDown size={18} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toggleStarred(selectedContact.id)}>
                          <Star className="mr-2 h-4 w-4" />
                          {selectedContact.isStarred ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Clock className="mr-2 h-4 w-4" />
                          Silenciar notificaciones
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => setIsDeleteDialogOpen(true)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Eliminar conversación
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Información de contacto expandible */}
                {isContactInfoOpen && (
                  <div className="bg-white px-4 py-3 border-b">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p>{selectedContact.email}</p>
                      </div>
                      {selectedContact.phone && (
                        <div>
                          <p className="text-gray-500">Teléfono</p>
                          <p>{selectedContact.phone}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-gray-500">Tipo</p>
                        <p>
                          {selectedContact.type === 'client' ? 'Cliente' : 
                           selectedContact.type === 'team' ? '
Equipo' : 'Proveedor'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Área de mensajes */}
                <ScrollArea className="flex-grow p-4">
                  <div className="space-y-6">
                    {Object.entries(messageGroups).map(([date, msgs]) => (
                      <div key={date}>
                        <div className="flex justify-center mb-4">
                          <Badge variant="outline" className="bg-white">
                            {date}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          {msgs.map((message) => (
                            <div 
                              key={message.id}
                              className={`flex ${
                                message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <div className={`max-w-[75%] ${
                                message.senderId === currentUser.id 
                                  ? 'bg-wedding-sage text-white rounded-tl-lg rounded-tr-none' 
                                  : 'bg-white rounded-tr-lg rounded-tl-none'
                                } rounded-bl-lg rounded-br-lg p-3 shadow-sm`}
                              >
                                <p>{message.content}</p>
                                {message.attachments && message.attachments.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    {message.attachments.map((attachment, index) => (
                                      <div 
                                        key={index}
                                        className="flex items-center p-2 bg-opacity-10 bg-black rounded"
                                      >
                                        <div className="mr-2">
                                          {attachment.type.includes('image') ? (
                                            <img 
                                              src={attachment.url} 
                                              alt={attachment.name}
                                              className="w-8 h-8 object-cover rounded"
                                            />
                                          ) : (
                                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                                              <Paperclip size={14} />
                                            </div>
                                          )}
                                        </div>
                                        <div className="flex-1">
                                          <p className="text-xs truncate">{attachment.name}</p>
                                          {attachment.size && (
                                            <p className="text-xs opacity-70">{attachment.size}</p>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <div className={`text-xs mt-1 ${
                                  message.senderId === currentUser.id 
                                    ? 'text-white/70' 
                                    : 'text-gray-500'
                                } text-right`}
                                >
                                  {formatMessageTime(message.timestamp)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Área de entrada de texto */}
                <div className="p-3 border-t bg-white">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <Paperclip size={18} />
                    </Button>
                    <Textarea
                      placeholder="Escribe un mensaje..."
                      className="min-h-10 resize-none"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      className="bg-wedding-sage hover:bg-wedding-sage/90 shrink-0" 
                      size="sm"
                      onClick={handleSendMessage}
                    >
                      <Send size={16} className="mr-1" />
                      Enviar
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center p-8">
                  <h3 className="text-xl font-semibold mb-2">Selecciona una conversación</h3>
                  <p className="text-gray-500">Elige un contacto para ver tus mensajes o inicia una nueva conversación.</p>
                  <Button 
                    className="mt-4 bg-wedding-sage hover:bg-wedding-sage/90" 
                    onClick={() => setIsNewMessageDialogOpen(true)}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Nuevo mensaje
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Diálogo para nuevo mensaje */}
      <Dialog open={isNewMessageDialogOpen} onOpenChange={setIsNewMessageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nuevo Mensaje</DialogTitle>
            <DialogDescription>
              Envía un mensaje a un cliente o miembro del equipo
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Para:</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un contacto" />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map(contact => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.name} - {contact.type === 'client' ? 'Cliente' : contact.type === 'team' ? 'Equipo' : 'Proveedor'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Mensaje:</label>
              <Textarea 
                placeholder="Escribe tu mensaje aquí..." 
                rows={5} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Adjuntos:</label>
              <div className="flex items-center justify-center border-2 border-dashed rounded-md py-4 cursor-pointer">
                <div className="text-center">
                  <Paperclip className="mx-auto h-6 w-6 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-500">
                    Haz clic para adjuntar archivos
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewMessageDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              className="bg-wedding-sage hover:bg-wedding-sage/90"
              onClick={() => {
                toast.success('Mensaje enviado correctamente');
                setIsNewMessageDialogOpen(false);
              }}
            >
              Enviar mensaje
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para eliminar conversación */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Eliminar Conversación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar esta conversación? Esta acción no puede deshacerse.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteConversation}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProviderMessages;
