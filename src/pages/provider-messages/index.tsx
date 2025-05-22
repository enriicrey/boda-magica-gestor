
import { useState } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MoreHorizontal, Paperclip, Send, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for contacts
const mockContacts = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    lastMessage: 'Hola, ¿podemos hablar sobre los detalles de la boda?',
    timestamp: '10:30',
    avatar: '/placeholder.svg',
    unread: 2,
    online: true,
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Ana García',
    lastMessage: 'Gracias por toda la información',
    timestamp: '09:45',
    avatar: '/placeholder.svg',
    unread: 0,
    online: false,
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Miguel Fernández',
    lastMessage: '¿Podrías enviarme el presupuesto actualizado?',
    timestamp: 'Ayer',
    avatar: '/placeholder.svg',
    unread: 1,
    online: false,
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Lucía Martínez',
    lastMessage: 'Perfecto, nos vemos el jueves entonces',
    timestamp: 'Ayer',
    avatar: '/placeholder.svg',
    unread: 0,
    online: true,
    isFavorite: false,
  },
  {
    id: '5',
    name: 'David Sánchez',
    lastMessage: 'He revisado las opciones y me gusta la segunda propuesta',
    timestamp: 'Lun',
    avatar: '/placeholder.svg',
    unread: 0,
    online: false,
    isFavorite: false,
  },
];

// Mock conversation data
const mockConversation = [
  {
    id: 'm1',
    senderId: '1',
    text: 'Hola, ¿podemos hablar sobre los detalles de la boda?',
    timestamp: '2024-05-22T10:30:00',
    isRead: true
  },
  {
    id: 'm2',
    senderId: 'me',
    text: 'Claro Carlos, ¿qué necesitas saber?',
    timestamp: '2024-05-22T10:32:00',
    isRead: true
  },
  {
    id: 'm3',
    senderId: '1',
    text: 'Me gustaría confirmar la fecha del 15 de agosto y preguntar sobre las opciones de catering',
    timestamp: '2024-05-22T10:33:00',
    isRead: true
  },
  {
    id: 'm4',
    senderId: 'me',
    text: 'La fecha del 15 de agosto está confirmada. Respecto al catering, tengo varias opciones que podría mostrarte. ¿Tienes alguna preferencia en cuanto a tipo de cocina?',
    timestamp: '2024-05-22T10:35:00',
    isRead: true
  },
  {
    id: 'm5',
    senderId: '1',
    text: 'Nos gustaría algo de cocina mediterránea, y necesitamos opciones vegetarianas también',
    timestamp: '2024-05-22T10:37:00',
    isRead: false
  },
  {
    id: 'm6',
    senderId: '1',
    text: '¿Podrías enviarme algunas propuestas?',
    timestamp: '2024-05-22T10:37:30',
    isRead: false
  }
];

const ProviderMessages = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState(mockConversation);
  const [contacts, setContacts] = useState(mockContacts);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'favorites'

  // Filter contacts based on search term and filter selection
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'unread') {
      return matchesSearch && contact.unread > 0;
    } else if (filter === 'favorites') {
      return matchesSearch && contact.isFavorite;
    }
    
    return matchesSearch;
  });

  const handleContactClick = (contact: typeof mockContacts[0]) => {
    setSelectedContact(contact);
    
    // Mark messages as read when selecting a contact
    if (contact.unread > 0) {
      setContacts(prevContacts => 
        prevContacts.map(c => 
          c.id === contact.id ? { ...c, unread: 0 } : c
        )
      );
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: `m${conversations.length + 1}`,
      senderId: 'me',
      text: message,
      timestamp: new Date().toISOString(),
      isRead: true
    };
    
    setConversations([...conversations, newMessage]);
    setMessage('');
    
    toast({
      title: "Mensaje enviado",
      description: `Mensaje enviado a ${selectedContact.name}`,
      duration: 3000,
    });
  };

  const handleToggleFavorite = (contactId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact.id === contactId 
          ? { ...contact, isFavorite: !contact.isFavorite } 
          : contact
      )
    );
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col h-[calc(100vh-6rem)]">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Mensajes</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Administra tus conversaciones con clientes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 max-h-[calc(100vh-12rem)] overflow-hidden">
          {/* Contacts sidebar */}
          <Card className="md:col-span-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b">
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar contactos..."
                  className="w-full pl-8 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto py-1">
                <Button 
                  variant={filter === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  Todos
                </Button>
                <Button 
                  variant={filter === 'unread' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilter('unread')}
                >
                  No leídos
                </Button>
                <Button 
                  variant={filter === 'favorites' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilter('favorites')}
                >
                  Favoritos
                </Button>
              </div>
            </div>
            <CardContent className="p-0 overflow-y-auto flex-1">
              <div className="flex flex-col">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      selectedContact.id === contact.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                    }`}
                    onClick={() => handleContactClick(contact)}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></span>
                      )}
                    </div>
                    <div className="ml-3 flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">{contact.name}</p>
                        <div className="flex items-center">
                          <button 
                            onClick={(e) => handleToggleFavorite(contact.id, e)}
                            className="focus:outline-none"
                          >
                            <Star 
                              className={`h-4 w-4 ${contact.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                            />
                          </button>
                          <span className="text-xs text-gray-500 ml-2">{contact.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && (
                      <Badge className="ml-2 bg-blue-500">{contact.unread}</Badge>
                    )}
                  </div>
                ))}
                
                {filteredContacts.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No se encontraron contactos.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Chat area */}
          <Card className="md:col-span-2 flex flex-col overflow-hidden">
            {selectedContact ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                      <AvatarFallback>{selectedContact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="font-medium">{selectedContact.name}</p>
                      <p className="text-xs text-gray-500">
                        {selectedContact.online ? 'En línea' : 'Desconectado'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {conversations.map((msg) => {
                      const isMe = msg.senderId === 'me';
                      const date = new Date(msg.timestamp);
                      const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                        >
                          {!isMe && (
                            <Avatar className="h-8 w-8 mr-2 mt-1">
                              <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                              <AvatarFallback>{selectedContact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <div
                              className={`rounded-lg p-3 max-w-xs lg:max-w-md ${
                                isMe
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                              }`}
                            >
                              <p className="text-sm">{msg.text}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Message input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Escribe un mensaje..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                      className="bg-white"
                    />
                    <Button onClick={handleSendMessage} disabled={!message.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center">
                  <p className="text-gray-500">Selecciona un contacto para iniciar una conversación</p>
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
