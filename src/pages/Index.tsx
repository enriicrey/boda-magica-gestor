
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import VendorCard from '@/components/VendorCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
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
      image: 'https://images.unsplash.com/photo-1551854716-8b811be39e7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
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
      image: 'https://images.unsplash.com/photo-1623170075680-22c6145fdf44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      rating: 4.7,
      reviewCount: 56,
      location: 'Valencia, España',
      isVerified: true,
      description: 'Espectaculares tartas de boda personalizadas con ingredientes de primera calidad.',
      price: 'Desde €400',
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        <HeroSection />
        
        <ServicesSection />
        
        <section id="vendors" className="py-24 bg-white">
          <div className="container-custom">
            <div className="text-center max-w-lg mx-auto mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">Proveedores Destacados</h2>
              <div className="w-20 h-[1px] bg-wedding-blush mx-auto mb-6"></div>
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
                <Button variant="outline" className="border-wedding-navy text-wedding-navy hover:bg-wedding-navy hover:text-white rounded-none px-8 py-6">
                  Ver todos los proveedores
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <TestimonialsSection />
        
        <section id="contact" className="py-24 bg-wedding-navy text-white">
          <div className="container-custom">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">¿Estás listo para comenzar?</h2>
              <div className="w-20 h-[1px] bg-wedding-blush mx-auto mb-6"></div>
              <p className="text-xl mb-12 text-gray-300 font-light">
                Únete a nuestra plataforma y comienza a planificar la boda de tus sueños hoy mismo.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/register?role=client">
                  <Button className="bg-white text-wedding-navy hover:bg-white/90 text-base px-8 py-6 rounded-none">
                    Comenzar como Pareja
                  </Button>
                </Link>
                <Link to="/register?role=provider">
                  <Button variant="outline" className="border-white bg-transparent hover:bg-white/10 text-white text-base px-8 py-6 rounded-none">
                    Unirse como Proveedor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
