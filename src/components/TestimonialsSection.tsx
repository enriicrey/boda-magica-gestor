
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'María y Carlos',
      role: 'Boda en Madrid',
      content: 'WeddingPlan nos ayudó a encontrar los mejores proveedores para nuestra boda. Su plataforma es fácil de usar y el equipo fue increíblemente atento. ¡Nuestra boda fue perfecta gracias a ellos!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      rating: 5,
    },
    {
      name: 'Alejandro y Paula',
      role: 'Boda en Barcelona',
      content: 'No podríamos haber organizado nuestra boda sin WeddingPlan. La plataforma nos permitió gestionar todo de manera eficiente y los proveedores que encontramos fueron excepcionales.',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      rating: 5,
    },
    {
      name: 'Laura y David',
      role: 'Boda en Valencia',
      content: 'Encontramos a nuestro fotógrafo perfecto a través de WeddingPlan. Las fotos son increíbles y capturaron exactamente lo que queríamos. El proceso fue tan fácil y sin estrés.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">Historias de Amor</h2>
          <p className="text-body text-gray-600">
            Miles de parejas han confiado en nosotros para hacer de su día especial algo verdaderamente mágico. Esto es lo que dicen sobre su experiencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-wedding-gold text-wedding-gold" />
                ))}
              </div>
              <p className="text-body text-gray-600 mt-4 mb-6">"{testimonial.content}"</p>
              <div className="flex items-center mt-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-serif font-medium text-wedding-navy">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
