
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')", 
            backgroundPosition: 'center',
            filter: 'brightness(0.6)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>
      <div className="container-custom relative z-10 text-white">
        <div className="max-w-2xl mx-auto md:ml-0">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight tracking-tight">
            El día perfecto<br />merece una<br /><span className="font-normal italic">planificación perfecta</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 font-light">
            Conectamos parejas con los mejores proveedores de servicios para bodas, creando experiencias memorables.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/register?role=client">
              <Button className="bg-white text-wedding-navy hover:bg-white/90 text-base px-8 py-6 rounded-none">
                Comenzar como Pareja
              </Button>
            </Link>
            <Link to="/register?role=provider">
              <Button variant="outline" className="border border-white bg-transparent hover:bg-white/10 text-white text-base px-8 py-6 rounded-none">
                Unirse como Proveedor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
