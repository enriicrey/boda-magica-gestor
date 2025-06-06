
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Eye, Edit, MessageSquare, Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const ClientMisServicios = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    {
      id: '1',
      name: 'Villa Rosa',
      provider: 'Eventos Elegantes S.L.',
      category: 'Lugar',
      status: 'Confirmado',
      date: '2025-08-15',
      price: '€8,500',
      description: 'Ceremonia y recepción en villa con jardines',
      contact: 'María García',
      phone: '+34 612 345 678',
      rating: 4.8,
      image: 'VR',
      conversationId: '2'
    },
    {
      id: '2',
      name: 'Carlos Jiménez Fotografía',
      provider: 'Carlos Jiménez',
      category: 'Fotografía',
      status: 'Confirmado',
      date: '2025-08-15',
      price: '€1,800',
      description: 'Cobertura completa de boda con álbum premium',
      contact: 'Carlos Jiménez',
      phone: '+34 623 456 789',
      rating: 4.9,
      image: 'CJ',
      conversationId: '1'
    },
    {
      id: '3',
      name: 'Catering Deluxe',
      provider: 'Catering Premium S.L.',
      category: 'Catering',
      status: 'Pendiente de pago',
      date: '2025-08-15',
      price: '€4,200',
      description: 'Menú degustación para 120 invitados',
      contact: 'Ana López',
      phone: '+34 634 567 890',
      rating: 4.7,
      image: 'CD',
      conversationId: '3'
    },
    {
      id: '4',
      name: 'Decoración Floral Bella',
      provider: 'Flores y Más',
      category: 'Decoración',
      status: 'En negociación',
      date: '2025-08-15',
      price: '€2,400',
      description: 'Decoración floral para ceremonia y recepción',
      contact: 'Isabel Ruiz',
      phone: '+34 645 678 901',
      rating: 4.6,
      image: 'FB',
      conversationId: '4'
    }
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return 'bg-green-100 text-green-800';
      case 'Pendiente de pago':
        return 'bg-yellow-100 text-yellow-800';
      case 'En negociación':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (serviceId: string) => {
    navigate(`/vendors/${serviceId}`);
  };

  const handleContact = (conversationId: string) => {
    navigate(`/client-mensajes?conversation=${conversationId}`);
  };

  const handleSearchServices = () => {
    navigate('/vendors');
  };

  return (
    <ClientLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Mis Servicios</h1>
          <p className="text-gray-500">
            Gestiona todos los servicios contratados para tu boda.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Buscar servicios..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleSearchServices}>
            <Plus className="mr-2 h-4 w-4" />
            Buscar servicios
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-pink-100 text-pink-700">
                        {service.image}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <p className="text-sm text-gray-500">{service.provider}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Categoría</p>
                    <p className="font-medium">{service.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Precio</p>
                    <p className="font-semibold text-lg">{service.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fecha</p>
                    <p className="font-medium">{new Date(service.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Valoración</p>
                    <div className="flex items-center">
                      <span className="font-medium mr-1">{service.rating}</span>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Descripción</p>
                  <p className="text-sm">{service.description}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Contacto</p>
                  <p className="text-sm font-medium">{service.contact}</p>
                  <p className="text-sm text-gray-600">{service.phone}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewDetails(service.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver detalles
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleContact(service.conversationId)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Contactar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No se encontraron servicios con los criterios de búsqueda.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ClientLayout>
  );
};

export default ClientMisServicios;
