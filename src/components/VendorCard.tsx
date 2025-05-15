
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VendorCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  isVerified: boolean;
  isFeatured?: boolean;
  description: string;
  price: string;
}

const VendorCard = ({
  id,
  name,
  category,
  image,
  rating,
  reviewCount,
  location,
  isVerified,
  isFeatured,
  description,
  price,
}: VendorCardProps) => {
  return (
    <Card className={`overflow-hidden hover:shadow-md transition-all ${isFeatured ? 'border-2 border-wedding-gold' : ''}`}>
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-52 object-cover"
        />
        {isFeatured && (
          <Badge className="absolute top-3 right-3 bg-wedding-gold text-white">
            Destacado
          </Badge>
        )}
        <Badge className="absolute top-3 left-3 bg-white/90 text-wedding-navy">
          {category}
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl font-semibold line-clamp-1">{name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-wedding-gold text-wedding-gold mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="text-sm text-gray-500 ml-1">({reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
          
          {isVerified && (
            <div className="flex items-center ml-3 text-green-600">
              <Check className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">Verificado</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 line-clamp-2 mb-4 text-sm">{description}</p>
        
        <div className="flex justify-between items-center">
          <div className="font-medium">
            <span className="text-wedding-navy">{price}</span>
          </div>
          <Link to={`/vendors/${id}`}>
            <Button variant="outline" className="btn-outline">Ver Detalles</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorCard;
