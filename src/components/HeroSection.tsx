
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from './ContactForm';
import ProviderForm from './ProviderForm';
import { DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import ClientForm from './ClientForm';

const HeroSection = () => {
  const navigate = useNavigate();
  const [showClientForm, setShowClientForm] = useState(false);
  
  const handleToggleClientForm = () => {
    setShowClientForm(!showClientForm);
  };

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
            {!showClientForm ? (
              <Button 
                onClick={handleToggleClientForm}
                className="bg-white text-wedding-navy hover:bg-white/90 text-base px-8 py-6 rounded-md"
              >
                Comenzar como Pareja
              </Button>
            ) : (
              <Button 
                onClick={handleToggleClientForm}
                variant="outline"
                className="border border-white bg-transparent hover:bg-white/10 text-white text-base px-8 py-6 rounded-md"
              >
                Cerrar formulario
              </Button>
            )}
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border border-white bg-transparent hover:bg-white/10 text-white text-base px-8 py-6 rounded-md">
                  Unirse como Proveedor
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogTitle className="font-serif text-2xl font-light mb-2 text-center">
                  Forma parte de nuestra red de proveedores
                </DialogTitle>
                <p className="text-muted-foreground text-center mb-6">
                  Completa el formulario y te contactaremos para discutir cómo puedes ofrecer tus servicios a nuestras parejas.
                </p>
                <ProviderForm />
              </DialogContent>
            </Dialog>
          </div>
          
          {showClientForm && (
            <div className="mt-10 bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 animate-fade-in">
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
