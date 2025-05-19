
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import { toast } from "sonner";

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
  isFavorite?: boolean;
}

interface RecommendedServicesProps {
  services: Service[];
}

const RecommendedServices = ({ services }: RecommendedServicesProps) => {
  const handleViewAll = () => {
    toast.success("Navegando a todos los servicios");
  };

  const handleServiceClick = (serviceId: string, serviceTitle: string) => {
    toast.info(`Viendo detalles de ${serviceTitle}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-serif text-2xl font-semibold">Servicios Recomendados</h2>
        <Link to="/services" onClick={handleViewAll}>
          <Button variant="link" className="text-wedding-sage">Ver Todos</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} onClick={() => handleServiceClick(service.id, service.title)}>
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedServices;
