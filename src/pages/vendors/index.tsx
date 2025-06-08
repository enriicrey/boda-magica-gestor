
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, MapPin, Phone, Mail, Heart } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Vendors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const vendors = [
    {
      id: '1',
      name: 'Villa Rosa Eventos',
      category: 'Lugar',
      description: 'Hermosa villa con jardines para bodas íntimas y elegantes',
      location: 'Madrid',
      rating: 4.8,
      reviews: 127,
      price: 'Desde €150/persona',
      image: 'VR',
      services: ['Ceremonia', 'Recepción', 'Catering'],
      verified: true
    },
    {
      id: '2',
      name: 'Carlos Jiménez Fotografía',
      category: 'Fotografía',
      description: 'Fotografía profesional de bodas con estilo natural y emotivo',
      location: 'Madrid',
      rating: 4.9,
      reviews: 89,
      price: 'Desde €1,200',
      image: 'CJ',
      services: ['Reportaje', 'Álbum', 'Sesión compromiso'],
      verified: true
    },
    {
      id: '3',
      name: 'Catering Deluxe',
      category: 'Catering',
      description: 'Gastronomía de alta calidad para eventos especiales',
      location: 'Madrid',
      rating: 4.7,
      reviews: 156,
      price: 'Desde €75/persona',
      image: 'CD',
      services: ['Menú degustación', 'Servicio completo', 'Bebidas'],
      verified: true
    },
    {
      id: '4',
      name: 'Flores Bella',
      category: 'Decoración',
      description: 'Decoración floral exclusiva para bodas únicas',
      location: 'Madrid',
      rating: 4.6,
      reviews: 93,
      price: 'Desde €500',
      image: 'FB',
      services: ['Ramos', 'Centros de mesa', 'Ceremonia'],
      verified: false
    },
    {
      id: '5',
      name: 'Música & Eventos',
      category: 'Música',
      description: 'DJ profesional y música en vivo para tu gran día',
      location: 'Barcelona',
      rating: 4.5,
      reviews: 74,
      price: 'Desde €800',
      image: 'ME',
      services: ['DJ', 'Sonido', 'Iluminación'],
      verified: true
    }
  ];

  const categories = ['all', 'Lugar', 'Fotografía', 'Catering', 'Decoración', 'Música'];
  const locations = ['all', 'Madrid', 'Barcelona', 'Valencia', 'Sevilla'];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || vendor.location === locationFilter;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleViewDetails = (vendorId: string) => {
    navigate(`/vendors/${vendorId}`);
  };

  const handleContact = (vendorId: string) => {
    navigate(`/client-mensajes?vendor=${vendorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Proveedores</h1>
            <p className="text-gray-500">
              Encuentra los mejores profesionales para tu boda.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-lg shadow-sm">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar proveedores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'Todas las categorías' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Ubicación" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location === 'all' ? 'Todas las ubicaciones' : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Vendors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <Card key={vendor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-pink-100 text-pink-700">
                          {vendor.image}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {vendor.name}
                          {vendor.verified && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Verificado
                            </Badge>
                          )}
                        </CardTitle>
                        <Badge className="bg-blue-100 text-blue-800">
                          {vendor.category}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{vendor.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{vendor.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{vendor.rating}</span>
                      <span className="text-gray-500">({vendor.reviews})</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {vendor.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-semibold text-lg">{vendor.price}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleViewDetails(vendor.id)}
                    >
                      Ver detalles
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleContact(vendor.id)}
                    >
                      Contactar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVendors.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-500">No se encontraron proveedores con los criterios seleccionados.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vendors;
