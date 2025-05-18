
import React from 'react';
import { toast } from "sonner";
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Favorites = () => {
  // Mock user data
  const userData = {
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    weddingDate: "15 de septiembre, 2025",
    avatarFallback: "MG"
  };
  
  // Calculate progress
  const progress = 38;
  
  // Mock favorite items
  const favorites = [
    {
      id: "1",
      title: "Hacienda Los Robles",
      category: "Venue",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.8,
      price: "€4,500",
      priceUnit: "día"
    },
    {
      id: "2",
      title: "Flores Mágicas - Decoración Floral de Lujo",
      category: "Decoración",
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.9,
      price: "€800",
      priceUnit: "paquete"
    },
    {
      id: "3",
      title: "Carlos Jiménez Fotografía",
      category: "Fotografía",
      image: "https://images.unsplash.com/photo-1553101872-64e48bfbf309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.7,
      price: "€1,800",
      priceUnit: "sesión"
    },
    {
      id: "4",
      title: "Gastronomía Selección - Menú Premium",
      category: "Catering",
      image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      rating: 4.6,
      price: "€95",
      priceUnit: "por invitado"
    }
  ];

  const handleRemoveFavorite = (id: string) => {
    toast.success("Elemento eliminado de favoritos");
  };

  const handleBookNow = (id: string) => {
    toast.success("Reserva iniciada para este servicio");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <ClientSidebar 
              userName={userData.name}
              userAvatar={userData.avatar}
              weddingDate={userData.weddingDate}
              progress={progress}
              avatarFallback={userData.avatarFallback}
            />
            
            {/* Main Content */}
            <div className="lg:w-3/4 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="font-serif text-2xl font-semibold mb-6 flex items-center">
                  <Heart className="text-wedding-sage mr-2 h-5 w-5" />
                  Mis Favoritos
                </h1>
                
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favorites.map((item) => (
                      <Card key={item.id} className="overflow-hidden hover:shadow-md transition-all">
                        <div className="relative">
                          <img 
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-600 hover:text-wedding-sage rounded-full"
                            onClick={() => handleRemoveFavorite(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <div className="absolute top-2 left-2 bg-white/90 text-wedding-navy text-xs py-1 px-2 rounded-md">
                            {item.category}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-serif text-lg font-medium mb-1">{item.title}</h3>
                          <div className="flex items-center text-gray-500 mb-3">
                            <span className="text-sm mr-2">★ {item.rating}</span>
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <div>
                              <span className="text-wedding-navy font-semibold">{item.price}</span>
                              <span className="text-gray-500 text-xs ml-1">/{item.priceUnit}</span>
                            </div>
                            <Button 
                              className="bg-wedding-sage hover:bg-wedding-sage/90 text-white"
                              size="sm"
                              onClick={() => handleBookNow(item.id)}
                            >
                              Reservar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No tienes favoritos</h3>
                    <p className="text-gray-500 mb-6">Explora servicios y añade a favoritos los que te gusten.</p>
                    <Button className="bg-wedding-sage hover:bg-wedding-sage/90 text-white">
                      Explorar Servicios
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
