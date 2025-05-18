
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ClientForm from './ClientForm';

const HeroSection = () => {
  const navigate = useNavigate();
  const [showClientForm, setShowClientForm] = useState(false);
  
  const handleToggleClientForm = () => {
    setShowClientForm(!showClientForm);
  };

  const scrollToContactSection = (formType: 'client' | 'provider') => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Set the appropriate tab in the contact section
      const event = new CustomEvent('setActiveForm', { 
        detail: { formType } 
      });
      document.dispatchEvent(event);
    }
  };

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
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
      <div className="container-custom relative z-10 text-white pt-20 md:pt-32">
        <div className="max-w-2xl mx-auto md:ml-0">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-tight">
            El día perfecto<br />merece una<br /><span className="font-normal italic">planificación perfecta</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 font-light">
            Conectamos parejas con los mejores proveedores de servicios para bodas, creando experiencias memorables.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button 
              onClick={() => scrollToContactSection('client')}
              className="bg-white text-wedding-sage hover:bg-white/90 text-base px-8 py-6 rounded-md"
            >
              Comenzar como Pareja
            </Button>
            <Button 
              onClick={() => scrollToContactSection('provider')}
              variant="outline" 
              className="border border-white bg-transparent hover:bg-white/10 text-white text-base px-8 py-6 rounded-md"
            >
              Unirse como Proveedor
            </Button>
          </div>
          
          {showClientForm && (
            <div className="mt-10 bg-black/5 backdrop-blur-md p-6 rounded-lg border border-white/20 animate-fade-in">
              <h3 className="font-serif text-2xl font-light mb-4">Solicitar información</h3>
              <ClientForm />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
