
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { toast } from "sonner";

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
  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Eliminado de favoritos" : "Añadido a favoritos");
  };

  const handleBookNow = () => {
    toast.success(`Iniciando reserva para ${title}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 h-full border-0 shadow-sm">
      <div className="relative">
        <img 
          src={imageError ? 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : image} 
          alt={title} 
          className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
          onError={handleImageError}
        />
        <Badge className="absolute top-3 left-3 bg-white/90 text-wedding-navy border-0">
          {category}
        </Badge>
        {isPopular && (
          <Badge className="absolute top-3 right-3 bg-wedding-navy text-white border-0">
            Popular
          </Badge>
        )}
        <button 
          onClick={handleFavoriteClick}
          className={`absolute bottom-3 right-3 p-2 rounded-full ${isFavorite ? 'bg-wedding-sage text-white' : 'bg-white/90 text-wedding-sage'} transition-colors duration-200`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill={isFavorite ? "currentColor" : "none"} 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>
      <CardContent className="p-5 flex flex-col h-[calc(100%-192px)]">
        <h3 className="font-serif text-lg font-semibold mb-1 line-clamp-1">{title}</h3>
        <div className="flex items-center mb-1">
          <Star className="h-4 w-4 fill-wedding-gold text-wedding-gold mr-1" /> 
          <span className="text-sm font-medium mr-1">4.9</span>
          <span className="text-xs text-gray-500">(24)</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">por {provider}</p>
        
        {availableDate && (
          <p className="text-xs bg-wedding-sage/10 text-wedding-navy py-1 px-2 rounded-full inline-flex self-start mb-3">
            Disponible {availableDate}
          </p>
        )}
        
        <div className="mt-auto flex justify-between items-center pt-4">
          <div className="font-medium">
            <span className="text-wedding-navy text-lg">{price}</span>
            <span className="text-gray-500 text-xs ml-1">{priceUnit}</span>
          </div>
          <Link to={`/services/${id}`} onClick={handleBookNow}>
            <Button className="bg-wedding-sage hover:bg-wedding-sage/90 text-white" size="sm">
              Reservar
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
