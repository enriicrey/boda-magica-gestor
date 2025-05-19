
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from "sonner";
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import VendorCard from '@/components/VendorCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Vendors = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredVendors, setFilteredVendors] = useState<any[]>([]);
  
  // Extraer categoría de los parámetros de la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      toast.info(`Mostrando proveedores de categoría: ${categoryParam}`);
    }
  }, [location.search]);
  
  // Datos de ejemplo de proveedores
  const allVendors = [
    {
      id: '1',
      name: 'Villa Rosa - Finca para Eventos',
      category: 'venue',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.9,
      reviewCount: 124,
      location: 'Madrid, España',
      isVerified: true,
      isFeatured: true,
      description: 'Elegante finca con jardines para bodas y eventos, con capacidad hasta 300 invitados.',
      price: 'Desde €5,000',
    },
    {
      id: '2',
      name: 'Carlos Jiménez Fotografía',
      category: 'photography',
      image: 'https://images.unsplash.com/photo-1553101872-64e48bfbf309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.8,
      reviewCount: 87,
      location: 'Barcelona, España',
      isVerified: true,
      description: 'Fotógrafo premiado especializado en bodas con un estilo natural y emotivo.',
      price: 'Desde €1,800',
    },
    {
      id: '3',
      name: 'Dulce Tentación - Pastelería',
      category: 'catering',
      image: 'https://images.unsplash.com/photo-1535254973379-9e872211821b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.7,
      reviewCount: 56,
      location: 'Valencia, España',
      isVerified: true,
      description: 'Espectaculares tartas de boda personalizadas con ingredientes de primera calidad.',
      price: 'Desde €400',
    },
    {
      id: '4',
      name: 'Elegancia Floral',
      category: 'decoration',
      image: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.9,
      reviewCount: 78,
      location: 'Sevilla, España',
      isVerified: true,
      description: 'Arreglos florales exquisitos para crear ambientes mágicos en tu ceremonia y celebración.',
      price: 'Desde €800',
    },
    {
      id: '5',
      name: 'Melodía Nupcial',
      category: 'music',
      image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.6,
      reviewCount: 45,
      location: 'Barcelona, España',
      isVerified: true,
      description: 'Grupo musical versátil que adapta su repertorio desde música clásica hasta éxitos actuales.',
      price: 'Desde €1,200',
    },
    {
      id: '6',
      name: 'Vehículos Clásicos Premier',
      category: 'transport',
      image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.8,
      reviewCount: 32,
      location: 'Madrid, España',
      isVerified: true,
      description: 'Colección de coches clásicos y de lujo para transportar a los novios con estilo y elegancia.',
      price: 'Desde €500',
    },
    {
      id: '7',
      name: 'Deluxe Catering',
      category: 'catering',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.7,
      reviewCount: 63,
      location: 'Barcelona, España',
      isVerified: true,
      description: 'Servicio de catering premium con opciones gastronómicas internacionales y presentaciones de lujo.',
      price: 'Desde €80 por persona',
    },
    {
      id: '8',
      name: 'Fotografía Artística Marta',
      category: 'photography',
      image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
      rating: 4.9,
      reviewCount: 91,
      location: 'Valencia, España',
      isVerified: true,
      isFeatured: true,
      description: 'Capturo momentos únicos con un enfoque fotográfico artístico y contemporáneo.',
      price: 'Desde €2,200',
    }
  ];

  // Filtrar proveedores basados en la categoría y término de búsqueda
  useEffect(() => {
    let filtered = allVendors;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(vendor => vendor.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(vendor => 
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        vendor.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredVendors(filtered);
  }, [selectedCategory, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Buscando: ${searchTerm}`);
  };

  const handleFilter = () => {
    toast.info(`Aplicando filtros adicionales`);
  };

  const handleTabChange = (value: string) => {
    setSelectedCategory(value);
    toast.info(`Categoría seleccionada: ${value}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="font-serif text-3xl md:text-5xl font-light mb-6">Nuestros Proveedores</h1>
            <div className="w-20 h-[1px] bg-wedding-gold mx-auto mb-6"></div>
            <p className="text-gray-600 font-light leading-relaxed">
              Descubre a los mejores profesionales del sector para hacer de tu día especial un momento inolvidable.
            </p>
          </div>
          
          {/* Búsqueda y Filtros */}
          <div className="mb-10">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre o descripción..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-wedding-sage hover:bg-wedding-sage/90">
                Buscar
              </Button>
              <Button type="button" variant="outline" className="flex items-center gap-2" onClick={handleFilter}>
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </form>
            
            <Tabs defaultValue={selectedCategory} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-7">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="venue">Lugares</TabsTrigger>
                <TabsTrigger value="catering">Catering</TabsTrigger>
                <TabsTrigger value="photography">Fotografía</TabsTrigger>
                <TabsTrigger value="music">Música</TabsTrigger>
                <TabsTrigger value="decoration">Decoración</TabsTrigger>
                <TabsTrigger value="transport">Transporte</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Lista de Proveedores */}
          {filteredVendors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVendors.map((vendor) => (
                <VendorCard key={vendor.id} {...vendor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl text-gray-600 mb-4">No se encontraron proveedores</h3>
              <p className="text-gray-500">Intenta con otros términos de búsqueda o categorías</p>
              <Button 
                className="mt-6 bg-wedding-sage hover:bg-wedding-sage/90"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Ver todos los proveedores
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vendors;
