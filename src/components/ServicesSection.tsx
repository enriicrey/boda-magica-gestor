
import React from 'react';
import { MapPin, Camera, Music, Utensils, Home, Palette } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      title: 'Lugares para Bodas',
      description: 'Encuentra el lugar perfecto para tu ceremonia y recepción, desde jardines y playas hasta salones elegantes.',
      icon: <MapPin className="h-8 w-8 text-wedding-blush" />,
    },
    {
      title: 'Fotografía y Video',
      description: 'Captura los momentos más hermosos de tu día especial con nuestros fotógrafos y videógrafos profesionales.',
      icon: <Camera className="h-8 w-8 text-wedding-blush" />,
    },
    {
      title: 'Música y Entretenimiento',
      description: 'Desde bandas en vivo hasta DJs y espectáculos, tenemos todo para mantener a tus invitados bailando.',
      icon: <Music className="h-8 w-8 text-wedding-blush" />,
    },
    {
      title: 'Catering y Pastelería',
      description: 'Deliciosas opciones de menú y pasteles de boda impresionantes para satisfacer todos los gustos.',
      icon: <Utensils className="h-8 w-8 text-wedding-blush" />,
    },
    {
      title: 'Decoración y Flores',
      description: 'Transforma tu espacio con hermosas decoraciones florales y detalles personalizados.',
      icon: <Palette className="h-8 w-8 text-wedding-blush" />,
    },
    {
      title: 'Planificación Completa',
      description: 'Nuestros planificadores de bodas te ayudarán en cada paso, desde la organización hasta el día de la ceremonia.',
      icon: <Home className="h-8 w-8 text-wedding-blush" />,
    },
  ];

  return (
    <section id="services" className="py-24">
      <div className="container-custom">
        <div className="text-center max-w-lg mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">Nuestros Servicios</h2>
          <div className="w-20 h-[1px] bg-wedding-blush mx-auto mb-6"></div>
          <p className="text-gray-600 font-light leading-relaxed">
            Ofrecemos todo lo que necesitas para crear la boda perfecta con proveedores cuidadosamente seleccionados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-8 hover:shadow-md transition-shadow flex flex-col items-start"
            >
              <div className="mb-6 inline-block">
                {service.icon}
              </div>
              <h3 className="font-serif text-xl mb-4 font-medium">{service.title}</h3>
              <p className="text-gray-600 font-light leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
