
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
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

const ServiceCard = ({
  id,
  title,
  provider,
  image,
  price,
  priceUnit,
  category,
  isPopular,
  availableDate,
}: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all h-full">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-44 object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-white/90 text-wedding-navy">
          {category}
        </Badge>
        {isPopular && (
          <Badge className="absolute top-3 right-3 bg-wedding-navy text-white">
            Popular
          </Badge>
        )}
      </div>
      <CardContent className="p-5 flex flex-col h-[calc(100%-176px)]">
        <h3 className="font-serif text-lg font-semibold mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">por {provider}</p>
        
        {availableDate && (
          <p className="text-xs bg-wedding-blush/20 text-wedding-navy py-1 px-2 rounded-full inline-flex self-start mb-3">
            Disponible {availableDate}
          </p>
        )}
        
        <div className="mt-auto flex justify-between items-center pt-4">
          <div className="font-medium">
            <span className="text-wedding-navy text-lg">{price}</span>
            <span className="text-gray-500 text-xs ml-1">{priceUnit}</span>
          </div>
          <Link to={`/services/${id}`}>
            <Button className="btn-primary" size="sm">Reservar</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
