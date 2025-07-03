
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Paperclip, Star, Eye } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useClient } from '@/contexts/ClientContext';
import { useToast } from '@/hooks/use-toast';

const ClientMensajes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const { conversations, addMessage } = useClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState('1');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const conversationParam = searchParams.get('conversation');
    if (conversationParam) {
      setSelectedConversation(conversationParam);
    }
  }, [searchParams]);

  const filteredConversations = conversations.filter(conv =>
    conv.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentConversation = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      addMessage(selectedConversation, newMessage);
      setNewMessage('');
      toast({
        title: "Mensaje enviado",
        description: "Tu mensaje ha sido enviado correctamente."
      });
    }
  };

  const handleFileAttachment = () => {
    if (selectedConversation) {
      addMessage(selectedConversation, 'He adjuntado un archivo: documento.pdf', ['documento.pdf']);
      toast({
        title: "Archivo adjuntado",
        description: "El archivo se ha adjuntado al mensaje."
      });
    }
  };

  const handleViewProviderDetails = () => {
    if (currentConversation) {
      // Extract provider ID from conversation (in real app, this would be stored)
      const providerId = currentConversation.id;
      navigate(`/vendors/${providerId}`);
    }
  };

  return (
    <ClientLayout>
      <div className="flex flex-col h-[calc(100vh-12rem)] space-y-6 bg-gradient-to-br from-pink-50/30 to-rose-50/20 p-6 rounded-lg">
        <div className="flex flex-col space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">Mensajes</h1>
          <p className="text-gray-600 text-lg">
            Comparte ideas, coordina sueños y da vida a tu día perfecto
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conversations List */}
          <Card className="lg:col-span-1 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar conversaciones..."
                  className="pl-10 bg-gray-50 border-gray-200"
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
                    className={`p-4 cursor-pointer border-b hover:bg-pink-50/50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-pink-50 border-l-4 border-l-pink-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                          <AvatarFallback className="bg-gradient-to-br from-pink-100 to-rose-100 text-pink-700 font-semibold">
                            {conversation.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm text-gray-900 truncate">{conversation.provider}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                            {conversation.unread > 0 && (
                              <Badge className="bg-pink-500 text-white text-xs px-2 py-1">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 truncate">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex items-center mt-1">
                          <div className={`w-2 h-2 rounded-full mr-2 ${conversation.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <span className="text-xs text-gray-500">
                            {conversation.online ? 'En línea' : 'Desconectado'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col shadow-lg bg-white/90 backdrop-blur-sm">
            {currentConversation && (
              <>
                <CardHeader className="pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-gradient-to-br from-pink-100 to-rose-100 text-pink-700 font-semibold">
                          {currentConversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl text-gray-900">{currentConversation.provider}</CardTitle>
                        <div className="flex items-center space-x-3 mt-1">
                          <div className={`w-2 h-2 rounded-full ${currentConversation.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <span className="text-sm text-gray-600">
                            {currentConversation.online ? 'En línea' : 'Desconectado'}
                          </span>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm font-medium text-gray-700">4.9</span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleViewProviderDetails}
                      className="hover:bg-pink-50 border-pink-200"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver detalles
                    </Button>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-white to-pink-50/20">
                  <div className="space-y-6">
                    {currentConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isProvider ? 'justify-start' : 'justify-end'}`}
                      >
                        <div className="max-w-xs lg:max-w-md">
                          <div
                            className={`px-4 py-3 rounded-2xl shadow-sm ${
                              message.isProvider
                                ? 'bg-white border border-gray-200 text-gray-900'
                                : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-pink-200">
                                {message.attachments.map((attachment, index) => (
                                  <div key={index} className="flex items-center gap-2 text-xs">
                                    <Paperclip className="h-3 w-3" />
                                    <span className="underline cursor-pointer hover:text-pink-200">
                                      {attachment}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <p
                            className={`text-xs mt-2 ${
                              message.isProvider ? 'text-gray-500' : 'text-gray-600'
                            } ${message.isProvider ? 'text-left' : 'text-right'}`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleFileAttachment}
                      className="hover:bg-pink-50 border-pink-200"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Escribe tu mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      className="flex-1 bg-white border-gray-200 focus:border-pink-300"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-pink-600 hover:bg-pink-700 shadow-sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientMensajes;
