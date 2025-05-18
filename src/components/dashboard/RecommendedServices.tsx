
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';

interface Service {
  id: string;
  title: string;
  provider: string;
  image: string;
  price: string;
  priceUnit: string;
  category: string;
  isPopular?: boolean;
  availableDate?: string;
}

interface RecommendedServicesProps {
  services: Service[];
}

const RecommendedServices = ({ services }: RecommendedServicesProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-serif text-2xl font-semibold">Servicios Recomendados</h2>
        <Link to="/services">
          <Button variant="link" className="text-wedding-sage">Ver Todos</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedServices;
