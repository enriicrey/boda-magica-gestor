
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-wedding-navy to-wedding-blush min-h-[80vh] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')", 
            backgroundPosition: 'center',
            filter: 'brightness(0.4)'
          }}
        />
      </div>
      <div className="container-custom relative z-10 text-white">
        <div className="max-w-2xl mx-auto md:mx-0">
          <h1 className="heading-xl mb-4 text-center md:text-left">
            Crea la boda de tus sueños
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-center md:text-left opacity-90">
            Conectamos parejas con los mejores proveedores de servicios para bodas, haciendo que tu día especial sea perfecto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/register?role=client">
              <Button className="bg-white text-wedding-navy hover:bg-white/90 text-lg px-6 py-4 w-full sm:w-auto">
                Soy una Pareja
              </Button>
            </Link>
            <Link to="/register?role=provider">
              <Button variant="outline" className="border-2 border-white bg-transparent hover:bg-white/10 text-white text-lg px-6 py-4 w-full sm:w-auto">
                Soy un Proveedor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
