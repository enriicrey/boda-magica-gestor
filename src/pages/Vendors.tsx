import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VendorCard from '@/components/VendorCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Vendors = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const location = useLocation();
  
  const allVendors = [
    // Lugares
    {
      id: '1',
      name: 'Villa Rosa - Finca para Eventos',
      category: 'Lugar',
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
      id: '7',
      name: 'Palacio del Mar',
      category: 'Lugar',
      image: 'https://images.unsplash.com/photo-1571702275286-0f8b0a45d0a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.8,
      reviewCount: 98,
      location: 'Valencia, España',
      isVerified: true,
      description: 'Espectaculares vistas al mar con arquitectura clásica española para bodas inolvidables.',
      price: 'Desde €6,500',
    },
    
    // Fotografía
    {
      id: '2',
      name: 'Carlos Jiménez Fotografía',
      category: 'Fotografía',
      image: 'https://images.unsplash.com/photo-1553101872-64e48bfbf309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.8,
      reviewCount: 87,
      location: 'Barcelona, España',
      isVerified: true,
      description: 'Fotógrafo premiado especializado en bodas con un estilo natural y emotivo.',
      price: 'Desde €1,800',
    },
    {
      id: '8',
      name: 'Captura Momentos',
      category: 'Fotografía',
      image: 'https://images.unsplash.com/photo-1579200152039-7c332686c7cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.7,
      reviewCount: 64,
      location: 'Sevilla, España',
      isVerified: true,
      description: 'Duo fotográfico especializado en capturar los momentos más espontáneos y emotivos.',
      price: 'Desde €1,500',
    },
    
    // Catering
    {
      id: '3',
      name: 'Dulce Tentación - Pastelería',
      category: 'Catering',
      image: 'https://images.unsplash.com/photo-1535254973379-9e872211821b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.7,
      reviewCount: 56,
      location: 'Valencia, España',
      isVerified: true,
      description: 'Espectaculares tartas de boda personalizadas con ingredientes de primera calidad.',
      price: 'Desde €400',
    },
    {
      id: '9',
      name: 'Gourmet Bodas',
      category: 'Catering',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.9,
      reviewCount: 112,
      location: 'Madrid, España',
      isVerified: true,
      description: 'Servicio completo de catering con menús personalizados y presentaciones espectaculares.',
      price: 'Desde €85/persona',
    },
    
    // Decoración
    {
      id: '4',
      name: 'Elegancia Floral',
      category: 'Decoración',
      image: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.9,
      reviewCount: 78,
      location: 'Sevilla, España',
      isVerified: true,
      description: 'Arreglos florales exquisitos para crear ambientes mágicos en tu ceremonia y celebración.',
      price: 'Desde €800',
    },
    {
      id: '10',
      name: 'Decorando Sueños',
      category: 'Decoración',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.6,
      reviewCount: 43,
      location: 'Barcelona, España',
      isVerified: true,
      description: 'Decoración integral con atención al detalle para crear el ambiente perfecto para tu boda.',
      price: 'Desde €950',
    },
    
    // Música
    {
      id: '5',
      name: 'Melodía Nupcial',
      category: 'Música',
      image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.6,
      reviewCount: 45,
      location: 'Barcelona, España',
      isVerified: true,
      description: 'Grupo musical versátil que adapta su repertorio desde música clásica hasta éxitos actuales.',
      price: 'Desde €1,200',
    },
    {
      id: '11',
      name: 'DJ Events',
      category: 'Música',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.8,
      reviewCount: 67,
      location: 'Madrid, España',
      isVerified: true,
      description: 'DJs profesionales con equipos de sonido e iluminación de última generación.',
      price: 'Desde €950',
    },
    
    // Transporte
    {
      id: '6',
      name: 'Vehículos Clásicos Premier',
      category: 'Transporte',
      image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.8,
      reviewCount: 32,
      location: 'Madrid, España',
      isVerified: true,
      description: 'Colección de coches clásicos y de lujo para transportar a los novios con estilo y elegancia.',
      price: 'Desde €500',
    },
    {
      id: '12',
      name: 'Limusinas VIP',
      category: 'Transporte',
      image: 'https://images.unsplash.com/photo-1616707046578-e8f3b34a6e21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.7,
      reviewCount: 29,
      location: 'Barcelona, España',
      isVerified: true,
      description: 'Servicio premium de limusinas con chófer para momentos especiales de tu boda.',
      price: 'Desde €450',
    }
  ];
  
  // Categorías disponibles
  const categories = ['all', 'Lugar', 'Fotografía', 'Catering', 'Decoración', 'Música', 'Transporte'];
  
  // Filtrar proveedores por categoría
  const filteredVendors = activeCategory === 'all' 
    ? allVendors 
    : allVendors.filter(vendor => vendor.category === activeCategory);

  useEffect(() => {
    // Extraer la categoría de los parámetros de URL
    const params = new URLSearchParams(location.search);
    const category = params.get('categoria');
    
    // Si hay una categoría válida, establecerla como activa
    if (category && categories.includes(category)) {
      setActiveCategory(category);
      toast.info(`Mostrando proveedores de ${category}`);
    }
  }, [location]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    toast.success(`Categoría cambiada a ${category === 'all' ? 'todas' : category}`);
  };

  const handleRegister = () => {
    toast.success("Redirigiendo al registro de usuarios");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-serif text-3xl md:text-4xl font-light mb-6">Catálogo de Proveedores</h1>
            <div className="w-20 h-[1px] bg-wedding-gold mx-auto mb-6"></div>
            <p className="text-gray-600 font-light leading-relaxed">
              Descubre nuestra selección de los mejores profesionales para hacer tu boda perfecta
            </p>
            <div className="mt-8">
              <Button 
                className="bg-wedding-sage hover:bg-wedding-sage/90 text-white"
                onClick={handleRegister}
              >
                Registrarme para gestionar mis proveedores
              </Button>
            </div>
          </div>
          
          <Tabs 
            defaultValue={activeCategory} 
            value={activeCategory} 
            onValueChange={handleCategoryChange} 
            className="w-full mb-12"
          >
            <div className="flex justify-center">
              <TabsList className="mb-8 space-x-1">
                {categories.map(category => (
                  <TabsTrigger key={category} value={category} className="px-4">
                    {category === 'all' ? 'Todos' : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {categories.map(category => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredVendors.map(vendor => (
                    <VendorCard key={vendor.id} {...vendor} />
                  ))}
                </div>
                
                {filteredVendors.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-xl text-gray-500">No hay proveedores disponibles en esta categoría actualmente.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vendors;
