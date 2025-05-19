
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
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service.id} onClick={() => handleServiceClick(service.id, service.title)}>
              <ServiceCard {...service} />
            </div>
          ))
        ) : (
          // Servicios de respaldo en caso de que no se proporcionen servicios
          [1, 2, 3].map((i) => (
            <div key={i}>
              <ServiceCard 
                id={`backup-${i}`}
                title={`Servicio de Ejemplo ${i}`}
                provider="Proveedor Premium"
                image={`https://images.unsplash.com/photo-${1520400485-${i}6247a8b1-1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80`}
                price={`${(i * 500).toLocaleString()}`}
                priceUnit="€"
                category={i === 1 ? "Fotografía" : i === 2 ? "Catering" : "Decoración"}
                isPopular={i === 1}
                availableDate={i === 2 ? "próximamente" : undefined}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecommendedServices;
