
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "sonner";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';

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
  isFavorite?: boolean;
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
  isFavorite = false,
}: ServiceCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);
  
  const handleImageError = () => {
    setImageError(true);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
    toast.success(favorite ? `${title} eliminado de favoritos` : `${title} añadido a favoritos`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all h-full">
      <div className="relative">
        <img 
          src={imageError ? 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' : image} 
          alt={title} 
          className="w-full h-44 object-cover"
          onError={handleImageError}
        />
        <Badge className="absolute top-3 left-3 bg-white/90 text-wedding-navy">
          {category}
        </Badge>
        {isPopular && (
          <Badge className="absolute top-3 right-12 bg-wedding-navy text-white">
            Popular
          </Badge>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={`absolute top-3 right-3 bg-white/90 hover:bg-white ${favorite ? 'text-wedding-sage' : 'text-gray-400'} rounded-full`}
          onClick={toggleFavorite}
        >
          <Heart className={`h-4 w-4 ${favorite ? 'fill-wedding-sage' : ''}`} />
        </Button>
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
            <Button className="bg-wedding-sage hover:bg-wedding-sage/90 text-white" size="sm">Reservar</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
