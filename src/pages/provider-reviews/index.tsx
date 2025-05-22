
import { useState } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Star, Filter, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for reviews
const mockReviews = [
  {
    id: '1',
    clientName: 'Carlos Mendoza',
    clientAvatar: '/placeholder.svg',
    rating: 5,
    comment: 'Excelente servicio. Todo fue perfecto para nuestra boda.',
    date: '2024-05-10',
    eventType: 'Boda',
    status: 'publicado',
    response: 'Gracias Carlos, fue un placer organizar tu boda.'
  },
  {
    id: '2',
    clientName: 'Ana García',
    clientAvatar: '/placeholder.svg',
    rating: 4,
    comment: 'Muy buena organización. Todo salió genial aunque hubo un pequeño retraso en el inicio.',
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
    comment: 'Profesionalidad absoluta. El evento corporativo fue todo un éxito.',
    date: '2024-04-20',
    eventType: 'Corporativo',
    status: 'publicado',
    response: 'Gracias Miguel, encantados de haber colaborado contigo.'
  },
  {
    id: '4',
    clientName: 'Lucía Martínez',
    clientAvatar: '/placeholder.svg',
    rating: 3,
    comment: 'El servicio fue correcto, pero esperaba un poco más de personalización.',
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
    comment: 'Buena organización y atención. Recomendaría sus servicios.',
    date: '2024-02-28',
    eventType: 'Aniversario',
    status: 'publicado',
    response: 'Gracias por tu comentario David. ¡Esperamos verte en futuros eventos!'
  }
];

const ProviderReviews = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', '5-star', '4-star', etc.
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
      description: "Tu respuesta ha sido publicada correctamente",
      duration: 3000
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

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Reseñas</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gestiona y responde a las reseñas de tus clientes.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Puntuación media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">4.2</span>
                <div className="flex">
                  {renderStars(4)}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Basado en {reviews.length} reseñas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Reseñas 5 estrellas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {reviews.filter(review => review.rating === 5).length}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((reviews.filter(review => review.rating === 5).length / reviews.length) * 100)}% del total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Pendientes de respuesta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {reviews.filter(review => review.response === '').length}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Requieren tu atención
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Reseñas recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {reviews.filter(review => new Date(review.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                En los últimos 30 días
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar reseñas..."
                className="w-full bg-white pl-8 dark:bg-gray-950"
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

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Puntuación</TableHead>
                  <TableHead>Comentario</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.clientAvatar} alt={review.clientName} />
                            <AvatarFallback>{review.clientName.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.clientName}</div>
                            <div className="text-xs text-gray-500">{review.eventType}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex">{renderStars(review.rating)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">{review.comment}</div>
                        {review.response && (
                          <div className="text-xs italic text-gray-500 mt-1 max-w-xs truncate">
                            Respuesta: {review.response}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(review.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(review.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className={review.response ? "bg-gray-100" : ""}
                          onClick={() => {
                            if (selectedReview === review.id) {
                              setSelectedReview(null);
                            } else {
                              setSelectedReview(review.id);
                              setResponseText(review.response);
                            }
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {review.response ? 'Editar respuesta' : 'Responder'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No se encontraron reseñas que coincidan con los criterios de búsqueda.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {selectedReview && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Responder a reseña
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.find(r => r.id === selectedReview)?.comment && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-medium mb-2">
                      {reviews.find(r => r.id === selectedReview)?.clientName}:
                    </p>
                    <p className="italic">
                      "{reviews.find(r => r.id === selectedReview)?.comment}"
                    </p>
                  </div>
                )}
                <div>
                  <label htmlFor="response" className="block text-sm font-medium mb-2">
                    Tu respuesta
                  </label>
                  <Input
                    id="response"
                    className="min-h-[100px]"
                    placeholder="Escribe tu respuesta aquí..."
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedReview(null);
                      setResponseText('');
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => handleSendResponse(selectedReview)}
                    disabled={!responseText.trim()}
                  >
                    Publicar respuesta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ProviderLayout>
  );
};

export default ProviderReviews;
