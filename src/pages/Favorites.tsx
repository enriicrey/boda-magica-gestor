
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Heart, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceCard from '@/components/ServiceCard';

// Mock data types
interface Service {
  id: string;
  title: string;
  provider: string;
  image: string;
  price: string;
  priceUnit: string;
  category: string;
  isPopular?: boolean;
  availableDate?: string;
  status: 'favorito' | 'pendiente' | 'confirmado';
  isFavorite: boolean;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isUser: boolean;
}

interface ProviderChat {
  providerId: string;
  providerName: string;
  messages: ChatMessage[];
}

const Favorites = () => {
  // Mock user data
  const userData = {
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    weddingDate: "15 de septiembre, 2025",
    avatarFallback: "MG"
  };
  
  // Calculate progress
  const progress = 38;
  
  // Mock service items with updated structure
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      title: "Hacienda Los Robles",
      provider: "Fincas Premium",
      category: "Lugar",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      price: "€4,500",
      priceUnit: "día",
      status: 'favorito',
      isFavorite: true
    },
    {
      id: "2",
      title: "Flores Mágicas - Decoración Floral de Lujo",
      provider: "Decoradores Unidos",
      category: "Decoración",
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      price: "€800",
      priceUnit: "paquete",
      status: 'favorito',
      isFavorite: true
    },
    {
      id: "3",
      title: "Carlos Jiménez Fotografía",
      provider: "Carlos Jiménez",
      category: "Fotografía",
      image: "https://images.unsplash.com/photo-1553101872-64e48bfbf309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      price: "€1,800",
      priceUnit: "sesión",
      status: 'pendiente',
      isFavorite: false
    },
    {
      id: "4",
      title: "Gastronomía Selección - Menú Premium",
      provider: "Catering Gourmet",
      category: "Catering",
      image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      price: "€95",
      priceUnit: "por invitado",
      status: 'confirmado',
      isFavorite: false
    },
    {
      id: "5",
      title: "DJ Events - La mejor música para bodas",
      provider: "Música Premium",
      category: "Música",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      price: "€950",
      priceUnit: "evento",
      status: 'pendiente',
      isFavorite: false
    },
    {
      id: "6",
      title: "Limusinas VIP",
      provider: "Transporte Elegante",
      category: "Transporte",
      image: "https://images.unsplash.com/photo-1616707046578-e8f3b34a6e21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      price: "€450",
      priceUnit: "servicio",
      status: 'confirmado',
      isFavorite: false
    }
  ]);

  // Selected provider for chat
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  
  // Mock chat data
  const [chats, setChats] = useState<Record<string, ProviderChat>>({
    "3": {
      providerId: "3",
      providerName: "Carlos Jiménez",
      messages: [
        {
          id: "1",
          senderId: "provider_3",
          senderName: "Carlos Jiménez",
          message: "Hola, he recibido tu solicitud para fotografía de boda. ¿En qué puedo ayudarte?",
          timestamp: "2025-05-10T14:30:00",
          isUser: false
        },
        {
          id: "2",
          senderId: "client",
          senderName: "María García",
          message: "Hola Carlos, me interesa tu paquete completo. ¿Incluye video también?",
          timestamp: "2025-05-10T14:35:00",
          isUser: true
        }
      ]
    },
    "4": {
      providerId: "4",
      providerName: "Catering Gourmet",
      messages: [
        {
          id: "1",
          senderId: "provider_4",
          senderName: "Catering Gourmet",
          message: "Gracias por confirmar tu reserva. Tu menú de degustación está programado para el 20 de junio.",
          timestamp: "2025-05-08T10:15:00",
          isUser: false
        }
      ]
    },
    "5": {
      providerId: "5",
      providerName: "Música Premium",
      messages: [
        {
          id: "1",
          senderId: "provider_5",
          senderName: "Música Premium",
          message: "Hemos recibido tu solicitud. ¿Te gustaría programar una llamada para discutir tu lista de reproducción?",
          timestamp: "2025-05-12T09:20:00",
          isUser: false
        }
      ]
    }
  });
  
  const [newMessage, setNewMessage] = useState("");
  
  // Active tab state
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter services based on active tab
  const filteredServices = activeTab === "all" 
    ? services 
    : services.filter(item => {
        if (activeTab === "favoritos") return item.status === "favorito";
        if (activeTab === "pendientes") return item.status === "pendiente";
        if (activeTab === "confirmados") return item.status === "confirmado";
        return true;
      });

  // Toggle favorite status for a service
  const handleToggleFavorite = (id: string) => {
    setServices(prevServices => prevServices.map(service => {
      if (service.id === id) {
        const newStatus = service.isFavorite ? service.status : 'favorito';
        return { 
          ...service, 
          isFavorite: !service.isFavorite,
          status: service.isFavorite ? (service.status === 'favorito' ? 'pendiente' : service.status) : 'favorito'
        };
      }
      return service;
    }));
  };

  // Open chat with provider
  const handleOpenChat = (providerId: string, providerName: string) => {
    setSelectedProvider(providerId);
    
    // Initialize chat if it doesn't exist
    if (!chats[providerId]) {
      setChats(prevChats => ({
        ...prevChats,
        [providerId]: {
          providerId,
          providerName,
          messages: []
        }
      }));
    }
  };

  // Send message in chat
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProvider || !newMessage.trim()) return;
    
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: "client",
      senderName: userData.name,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isUser: true
    };
    
    setChats(prevChats => ({
      ...prevChats,
      [selectedProvider]: {
        ...prevChats[selectedProvider],
        messages: [...(prevChats[selectedProvider]?.messages || []), newMsg]
      }
    }));
    
    setNewMessage("");
    
    // Simulate provider response
    setTimeout(() => {
      const responseMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: `provider_${selectedProvider}`,
        senderName: services.find(s => s.id === selectedProvider)?.provider || "",
        message: "Gracias por tu mensaje. Te responderé a la brevedad posible.",
        timestamp: new Date().toISOString(),
        isUser: false
      };
      
      setChats(prevChats => ({
        ...prevChats,
        [selectedProvider as string]: {
          ...prevChats[selectedProvider as string],
          messages: [...(prevChats[selectedProvider as string]?.messages || []), responseMsg]
        }
      }));
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <ClientSidebar 
              userName={userData.name}
              userAvatar={userData.avatar}
              weddingDate={userData.weddingDate}
              progress={progress}
              avatarFallback={userData.avatarFallback}
            />
            
            {/* Main Content */}
            <div className="lg:w-3/4 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="font-serif text-2xl font-semibold mb-6 flex items-center">
                  <Heart className="text-wedding-sage mr-2 h-5 w-5" />
                  Mis Servicios
                </h1>
                
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-6 grid w-full grid-cols-4 bg-gray-100">
                    <TabsTrigger value="all" className="data-[state=active]:bg-white">
                      Todos
                    </TabsTrigger>
                    <TabsTrigger value="favoritos" className="data-[state=active]:bg-white">
                      <Heart className="h-4 w-4 mr-1" /> 
                      Favoritos
                    </TabsTrigger>
                    <TabsTrigger value="pendientes" className="data-[state=active]:bg-white">
                      <Clock className="h-4 w-4 mr-1" /> 
                      Pendientes
                    </TabsTrigger>
                    <TabsTrigger value="confirmados" className="data-[state=active]:bg-white">
                      <CheckCircle className="h-4 w-4 mr-1" /> 
                      Confirmados
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="relative min-h-[50vh]">
                    {selectedProvider && (
                      <div className="absolute inset-0 bg-white z-10 p-4 border rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-4 border-b pb-3">
                          <h3 className="font-medium text-lg">
                            Chat con {services.find(s => s.id === selectedProvider)?.provider}
                          </h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setSelectedProvider(null)}
                          >
                            Cerrar
                          </Button>
                        </div>
                        
                        <div className="flex flex-col h-[60vh]">
                          <div className="flex-grow overflow-y-auto mb-4 p-2">
                            {chats[selectedProvider]?.messages.map(msg => (
                              <div 
                                key={msg.id} 
                                className={`mb-4 ${msg.isUser ? 'text-right' : 'text-left'}`}
                              >
                                <div 
                                  className={`inline-block px-4 py-2 rounded-lg ${
                                    msg.isUser 
                                      ? 'bg-wedding-sage text-white rounded-br-none' 
                                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                  }`}
                                >
                                  {msg.message}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </p>
                              </div>
                            ))}
                            {(!chats[selectedProvider] || chats[selectedProvider]?.messages.length === 0) && (
                              <div className="text-center py-6 text-gray-500">
                                Inicia una conversación con este proveedor
                              </div>
                            )}
                          </div>
                          
                          <form onSubmit={handleSendMessage} className="mt-auto flex gap-2">
                            <input
                              type="text"
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              placeholder="Escribe un mensaje..."
                              className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-sage"
                            />
                            <Button 
                              type="submit" 
                              className="bg-wedding-sage hover:bg-wedding-sage/90 text-white"
                            >
                              Enviar
                            </Button>
                          </form>
                        </div>
                      </div>
                    )}
                    
                    {filteredServices.length > 0 ? (
                      <TabsContent value={activeTab} className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {filteredServices.map((service) => (
                            <div key={service.id} className="relative">
                              <ServiceCard
                                id={service.id}
                                title={service.title}
                                provider={service.provider}
                                image={service.image}
                                price={service.price}
                                priceUnit={service.priceUnit}
                                category={service.category}
                                isFavorite={service.isFavorite}
                              />
                              <div className="absolute bottom-5 right-20">
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  className="bg-white"
                                  onClick={() => handleOpenChat(service.id, service.provider)}
                                >
                                  <MessageSquare className="h-4 w-4 mr-1" /> Chat
                                </Button>
                              </div>
                              {service.status === 'pendiente' && (
                                <Badge className="absolute top-12 right-3 bg-amber-500 text-white">
                                  Pendiente
                                </Badge>
                              )}
                              {service.status === 'confirmado' && (
                                <Badge className="absolute top-12 right-3 bg-green-500 text-white">
                                  Confirmado
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No hay servicios en esta categoría</h3>
                        <p className="text-gray-500 mb-6">Explora servicios y añade los que te interesen.</p>
                        <Button className="bg-wedding-sage hover:bg-wedding-sage/90 text-white">
                          Explorar Servicios
                        </Button>
                      </div>
                    )}
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
