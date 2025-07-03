
import { useState } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Star, Filter, MessageSquare, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for reviews
const mockReviews = [
  {
    id: '1',
    clientName: 'Carlos Mendoza',
    clientAvatar: '/placeholder.svg',
    rating: 5,
    comment: 'Excelente servicio. Todo fue perfecto para nuestra boda. Diana superó todas nuestras expectativas y logró crear exactamente lo que habíamos soñado.',
    date: '2024-05-10',
    eventType: 'Boda',
    status: 'publicado',
    response: 'Gracias Carlos, fue un placer organizar tu boda. Espero que tengan una vida llena de felicidad juntos.'
  },
  {
    id: '2',
    clientName: 'Ana García',
    clientAvatar: '/placeholder.svg',
    rating: 4,
    comment: 'Muy buena organización. Todo salió genial aunque hubo un pequeño retraso en el inicio. El resultado final fue fantástico.',
    date: '2024-05-05',
    eventType: 'Cumpleaños',
    status: 'publicado',
    response: ''
  },
  {
    id: '3',
    clientName: 'Miguel Fernández',
    clientAvatar: '/placeholder.svg',
    rating: 5,
    comment: 'Profesionalidad absoluta. El evento corporativo fue todo un éxito. Nuestros clientes quedaron impresionados con la organización.',
    date: '2024-04-20',
    eventType: 'Corporativo',
    status: 'publicado',
    response: 'Gracias Miguel, encantados de haber colaborado con vosotros. Esperamos futuras colaboraciones.'
  },
  {
    id: '4',
    clientName: 'Lucía Martínez',
    clientAvatar: '/placeholder.svg',
    rating: 3,
    comment: 'El servicio fue correcto, pero esperaba un poco más de personalización. Algunos detalles no fueron como los había imaginado.',
    date: '2024-03-15',
    eventType: 'Boda',
    status: 'pendiente',
    response: ''
  },
  {
    id: '5',
    clientName: 'David Sánchez',
    clientAvatar: '/placeholder.svg',
    rating: 4,
    comment: 'Buena organización y atención. Recomendaría sus servicios. El aniversario fue muy emotivo y bien planificado.',
    date: '2024-02-28',
    eventType: 'Aniversario',
    status: 'publicado',
    response: 'Gracias por tu comentario David. ¡Esperamos verte en futuros eventos!'
  }
];

const ProviderReviews = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');
  const [reviews, setReviews] = useState(mockReviews);

  // Filter reviews based on search term and filter selection
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'pendiente') {
      return matchesSearch && review.status === 'pendiente';
    } else if (filter === '5-star') {
      return matchesSearch && review.rating === 5;
    } else if (filter === '4-star') {
      return matchesSearch && review.rating === 4;
    } else if (filter === '3-star') {
      return matchesSearch && review.rating === 3;
    } else if (filter === 'sin-respuesta') {
      return matchesSearch && review.response === '';
    }

    return matchesSearch;
  });

  const handleSendResponse = (id: string) => {
    if (!responseText.trim()) return;

    setReviews(prev => 
      prev.map(review => 
        review.id === id 
          ? { ...review, response: responseText, status: 'publicado' }
          : review
      )
    );
    
    setSelectedReview(null);
    setResponseText('');
    
    toast({
      title: "Respuesta enviada",
      description: "Tu respuesta ha sido publicada correctamente"
    });
  };

  // Helper to render star ratings
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'publicado':
        return <Badge className="bg-green-100 text-green-800">Publicado</Badge>;
      case 'pendiente':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const fiveStarReviews = reviews.filter(r => r.rating === 5).length;
  const pendingResponses = reviews.filter(r => r.response === '').length;
  const recentReviews = reviews.filter(r => new Date(r.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length;

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reseñas</h1>
          <p className="text-gray-600">
            Gestiona las valoraciones de tus clientes y construye tu reputación profesional
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-md bg-gradient-to-br from-amber-50 to-amber-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-amber-700">Puntuación media</p>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-amber-800 mr-2">{avgRating.toFixed(1)}</span>
                    <div className="flex">
                      {renderStars(Math.round(avgRating))}
                    </div>
                  </div>
                  <p className="text-xs text-amber-600">
                    Basado en {totalReviews} reseñas
                  </p>
                </div>
                <div className="bg-amber-200 p-3 rounded-full">
                  <Star className="h-6 w-6 text-amber-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-700">Reseñas 5 estrellas</p>
                  <h3 className="text-2xl font-bold text-green-800">{fiveStarReviews}</h3>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {Math.round((fiveStarReviews / totalReviews) * 100)}% del total
                  </p>
                </div>
                <div className="bg-green-200 p-3 rounded-full">
                  <Star className="h-6 w-6 text-green-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-orange-700">Sin respuesta</p>
                  <h3 className="text-2xl font-bold text-orange-800">{pendingResponses}</h3>
                  <p className="text-xs text-orange-600">
                    Requieren tu atención
                  </p>
                </div>
                <div className="bg-orange-200 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-orange-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-700">Reseñas recientes</p>
                  <h3 className="text-2xl font-bold text-blue-800">{recentReviews}</h3>
                  <p className="text-xs text-blue-600">
                    En los últimos 30 días
                  </p>
                </div>
                <div className="bg-blue-200 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-blue-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar reseñas..."
                className="w-full bg-white pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={filter === 'all' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                Todas
              </Button>
              <Button 
                variant={filter === 'pendiente' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('pendiente')}
              >
                Pendientes
              </Button>
              <Button 
                variant={filter === '5-star' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('5-star')}
              >
                5 estrellas
              </Button>
              <Button 
                variant={filter === 'sin-respuesta' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('sin-respuesta')}
              >
                Sin respuesta
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <Card key={review.id} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.clientAvatar} alt={review.clientName} />
                        <AvatarFallback>{review.clientName.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.clientName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <Badge variant="outline">{review.eventType}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(review.status)}
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                  
                  {review.response && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Tu respuesta:</p>
                      <p className="text-gray-700">{review.response}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (selectedReview === review.id) {
                          setSelectedReview(null);
                        } else {
                          setSelectedReview(review.id);
                          setResponseText(review.response);
                        }
                      }}
                      className="flex items-center gap-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      {review.response ? 'Editar respuesta' : 'Responder'}
                    </Button>
                  </div>
                  
                  {selectedReview === review.id && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="response" className="block text-sm font-medium mb-2">
                            Tu respuesta
                          </label>
                          <Textarea
                            id="response"
                            rows={3}
                            placeholder="Escribe tu respuesta aquí..."
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            className="resize-none"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedReview(null);
                              setResponseText('');
                            }}
                          >
                            Cancelar
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleSendResponse(review.id)}
                            disabled={!responseText.trim()}
                          >
                            Publicar respuesta
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-md">
              <CardContent className="text-center py-12">
                <Star className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-1">No hay reseñas</p>
                <p className="text-gray-500">
                  {searchTerm 
                    ? 'No se encontraron reseñas que coincidan con tu búsqueda.' 
                    : 'Las reseñas de tus clientes aparecerán aquí.'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderReviews;
