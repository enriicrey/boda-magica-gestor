
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import VendorCard from '@/components/VendorCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProviderForm from '@/components/ProviderForm';
import ClientForm from '@/components/ClientForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  // Start with the client form visible by default in the footer
  const [showClientForm, setShowClientForm] = useState(true);
  const [activeForm, setActiveForm] = useState<'client' | 'provider'>('client');
  
  useEffect(() => {
    // Listen for the custom event to set the active form
    const handleSetActiveForm = (event: CustomEvent<{formType: 'client' | 'provider'}>) => {
      setActiveForm(event.detail.formType);
    };
    
    document.addEventListener('setActiveForm', handleSetActiveForm as EventListener);
    
    return () => {
      document.removeEventListener('setActiveForm', handleSetActiveForm as EventListener);
    };
  }, []);
  
  const featuredVendors = [
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
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow" id="top">
        <HeroSection />
        
        <div id="services">
          <ServicesSection />
        </div>
        
        <section id="vendors" className="py-24 bg-white">
          <div className="container-custom">
            <div className="text-center max-w-lg mx-auto mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">Proveedores Destacados</h2>
              <div className="w-20 h-[1px] bg-wedding-gold mx-auto mb-6"></div>
              <p className="text-gray-600 font-light leading-relaxed mb-12">
                Trabaja con los mejores profesionales del sector para hacer realidad la boda de tus sueños.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredVendors.map((vendor) => (
                <VendorCard key={vendor.id} {...vendor} />
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/vendors">
                <Button variant="outline" className="border-wedding-sage text-wedding-sage hover:bg-wedding-sage hover:text-white rounded-none px-8 py-6">
                  Ver todos los proveedores
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        
        <section id="contact" className="py-24 bg-wedding-sage text-white">
          <div className="container-custom">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">¿Estás listo para comenzar?</h2>
              <div className="w-20 h-[1px] bg-wedding-gold mx-auto mb-6"></div>
              <p className="text-xl mb-12 text-gray-100 font-light">
                Únete a nuestra plataforma y comienza a planificar la boda de tus sueños hoy mismo.
              </p>
              
              <Tabs defaultValue={activeForm} value={activeForm} onValueChange={(value) => setActiveForm(value as 'client' | 'provider')} className="w-full mb-8">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="client">Comenzar como Pareja</TabsTrigger>
                  <TabsTrigger value="provider">Unirse como Proveedor</TabsTrigger>
                </TabsList>
              
                <TabsContent value="client" className="animate-fade-in">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 max-w-2xl mx-auto">
                    <h3 className="font-serif text-2xl font-light mb-6 text-center">Solicitar información como pareja</h3>
                    <ClientForm />
                  </div>
                </TabsContent>
                
                <TabsContent value="provider" className="animate-fade-in">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 max-w-2xl mx-auto">
                    <h3 className="font-serif text-2xl font-light mb-6 text-center">Forma parte de nuestra red de proveedores</h3>
                    <p className="text-white/80 text-center mb-6">
                      Completa el formulario y te contactaremos para discutir cómo puedes ofrecer tus servicios a nuestras parejas.
                    </p>
                    <ProviderForm />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
