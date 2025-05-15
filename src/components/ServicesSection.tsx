
import React from 'react';
import { MapPin, Camera, Music, Utensils, Home, Palette } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      title: 'Lugares para Bodas',
      description: 'Encuentra el lugar perfecto para tu ceremonia y recepción, desde jardines y playas hasta salones elegantes.',
      icon: <MapPin className="h-10 w-10 text-wedding-navy" />,
    },
    {
      title: 'Fotografía y Video',
      description: 'Captura los momentos más hermosos de tu día especial con nuestros fotógrafos y videógrafos profesionales.',
      icon: <Camera className="h-10 w-10 text-wedding-navy" />,
    },
    {
      title: 'Música y Entretenimiento',
      description: 'Desde bandas en vivo hasta DJs y espectáculos, tenemos todo para mantener a tus invitados bailando.',
      icon: <Music className="h-10 w-10 text-wedding-navy" />,
    },
    {
      title: 'Catering y Pastelería',
      description: 'Deliciosas opciones de menú y pasteles de boda impresionantes para satisfacer todos los gustos.',
      icon: <Utensils className="h-10 w-10 text-wedding-navy" />,
    },
    {
      title: 'Decoración y Flores',
      description: 'Transforma tu espacio con hermosas decoraciones florales y detalles personalizados.',
      icon: <Palette className="h-10 w-10 text-wedding-navy" />,
    },
    {
      title: 'Planificación Completa',
      description: 'Nuestros planificadores de bodas te ayudarán en cada paso, desde la organización hasta el día de la ceremonia.',
      icon: <Home className="h-10 w-10 text-wedding-navy" />,
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">Nuestros Servicios</h2>
          <p className="text-body text-gray-600">
            Ofrecemos todo lo que necesitas para crear la boda perfecta. Nuestros proveedores de confianza te ayudarán a hacer realidad tu visión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-6 bg-wedding-blush/20 p-4 inline-block rounded-full">
                {service.icon}
              </div>
              <h3 className="heading-sm mb-4">{service.title}</h3>
              <p className="text-body text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
