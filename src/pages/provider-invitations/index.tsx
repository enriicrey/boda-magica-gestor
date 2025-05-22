
import { useState } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Mail, Filter, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock data for invitations
const mockInvitations = [
  {
    id: '1',
    clientName: 'Carlos Mendoza',
    clientEmail: 'carlos@example.com',
    eventType: 'Boda',
    eventDate: '2025-08-15',
    status: 'pendiente',
    message: 'Nos gustaría contar contigo para organizar nuestra boda en Madrid.',
    sentDate: '2024-05-15'
  },
  {
    id: '2',
    clientName: 'Ana García',
    clientEmail: 'ana@example.com',
    eventType: 'Cumpleaños',
    eventDate: '2024-06-22',
    status: 'aceptada',
    message: '¿Podrías organizar la fiesta de cumpleaños de mi hija?',
    sentDate: '2024-05-10'
  },
  {
    id: '3',
    clientName: 'Miguel Fernández',
    clientEmail: 'miguel@example.com',
    eventType: 'Corporativo',
    eventDate: '2024-07-05',
    status: 'rechazada',
    message: 'Necesitamos organizar un evento corporativo para 100 personas.',
    sentDate: '2024-05-05'
  },
  {
    id: '4',
    clientName: 'Lucía Martínez',
    clientEmail: 'lucia@example.com',
    eventType: 'Boda',
    eventDate: '2025-03-12',
    status: 'pendiente',
    message: 'Nos encantaría tener una reunión para discutir los detalles de nuestra boda.',
    sentDate: '2024-05-01'
  },
  {
    id: '5',
    clientName: 'David Sánchez',
    clientEmail: 'david@example.com',
    eventType: 'Aniversario',
    eventDate: '2024-09-10',
    status: 'aceptada',
    message: 'Quiero sorprender a mi esposa con una cena de aniversario especial.',
    sentDate: '2024-04-28'
  }
];

const ProviderInvitations = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'accepted', 'rejected'
  const [invitations, setInvitations] = useState(mockInvitations);

  // New invitation form state
  const [showNewInvitationForm, setShowNewInvitationForm] = useState(false);
  const [newInvitation, setNewInvitation] = useState({
    clientName: '',
    clientEmail: '',
    eventType: '',
    eventDate: '',
    message: ''
  });

  // Filter invitations based on search term and filter selection
  const filteredInvitations = invitations.filter(invitation => {
    const matchesSearch = 
      invitation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invitation.eventType.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'pendiente') {
      return matchesSearch && invitation.status === 'pendiente';
    } else if (filter === 'aceptada') {
      return matchesSearch && invitation.status === 'aceptada';
    } else if (filter === 'rechazada') {
      return matchesSearch && invitation.status === 'rechazada';
    }
    
    return matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: 'aceptada' | 'rechazada' | 'pendiente') => {
    setInvitations(invitations.map(invitation => 
      invitation.id === id ? { ...invitation, status: newStatus } : invitation
    ));
    
    const statusText = newStatus === 'aceptada' ? 'aceptada' : 
                       newStatus === 'rechazada' ? 'rechazada' : 'pendiente';
    
    toast({
      title: "Estado actualizado",
      description: `La invitación ha sido marcada como ${statusText}.`,
      duration: 3000
    });
  };

  const handleSendInvitation = () => {
    // Validate form
    if (!newInvitation.clientName || !newInvitation.clientEmail || !newInvitation.eventType || !newInvitation.eventDate) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }

    // Create new invitation
    const newId = (invitations.length + 1).toString();
    const today = new Date().toISOString().split('T')[0];
    
    // Add to invitations list
    setInvitations([
      {
        id: newId,
        clientName: newInvitation.clientName,
        clientEmail: newInvitation.clientEmail,
        eventType: newInvitation.eventType,
        eventDate: newInvitation.eventDate,
        status: 'pendiente',
        message: newInvitation.message,
        sentDate: today
      },
      ...invitations
    ]);

    // Reset form and hide it
    setNewInvitation({
      clientName: '',
      clientEmail: '',
      eventType: '',
      eventDate: '',
      message: ''
    });
    setShowNewInvitationForm(false);
    
    toast({
      title: "Invitación enviada",
      description: `Se ha enviado una invitación a ${newInvitation.clientName}.`,
      duration: 3000
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'aceptada':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aceptada</Badge>;
      case 'rechazada':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rechazada</Badge>;
      case 'pendiente':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Invitaciones</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gestiona las invitaciones enviadas a clientes potenciales.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar invitaciones..."
                className="w-full pl-8 bg-white"
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
                variant={filter === 'aceptada' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('aceptada')}
              >
                Aceptadas
              </Button>
              <Button 
                variant={filter === 'rechazada' ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter('rechazada')}
              >
                Rechazadas
              </Button>
            </div>
          </div>
          <Button onClick={() => setShowNewInvitationForm(!showNewInvitationForm)}>
            {showNewInvitationForm ? 'Cancelar' : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Invitación
              </>
            )}
          </Button>
        </div>

        {showNewInvitationForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Crear Nueva Invitación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="clientName" className="text-sm font-medium">
                    Nombre del cliente *
                  </label>
                  <Input
                    id="clientName"
                    value={newInvitation.clientName}
                    onChange={(e) => setNewInvitation({...newInvitation, clientName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="clientEmail" className="text-sm font-medium">
                    Email del cliente *
                  </label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={newInvitation.clientEmail}
                    onChange={(e) => setNewInvitation({...newInvitation, clientEmail: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="eventType" className="text-sm font-medium">
                    Tipo de evento *
                  </label>
                  <Input
                    id="eventType"
                    value={newInvitation.eventType}
                    onChange={(e) => setNewInvitation({...newInvitation, eventType: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="eventDate" className="text-sm font-medium">
                    Fecha del evento *
                  </label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={newInvitation.eventDate}
                    onChange={(e) => setNewInvitation({...newInvitation, eventDate: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensaje (opcional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-2 border rounded-md resize-none"
                    value={newInvitation.message}
                    onChange={(e) => setNewInvitation({...newInvitation, message: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <Button onClick={handleSendInvitation} className="mt-4">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Invitación
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>Fecha del evento</TableHead>
                  <TableHead>Fecha de envío</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvitations.length > 0 ? (
                  filteredInvitations.map((invitation) => (
                    <TableRow key={invitation.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{invitation.clientName.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{invitation.clientName}</div>
                            <div className="text-xs text-gray-500">{invitation.clientEmail}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{invitation.eventType}</TableCell>
                      <TableCell>{new Date(invitation.eventDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(invitation.sentDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(invitation.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {invitation.status === 'pendiente' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-50 hover:bg-green-100 text-green-700"
                                onClick={() => handleStatusChange(invitation.id, 'aceptada')}
                              >
                                Aceptar
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-red-50 hover:bg-red-100 text-red-700"
                                onClick={() => handleStatusChange(invitation.id, 'rechazada')}
                              >
                                Rechazar
                              </Button>
                            </>
                          )}
                          {invitation.status !== 'pendiente' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-gray-50 hover:bg-gray-100"
                              onClick={() => {
                                toast({
                                  title: "Detalles de la invitación",
                                  description: `${invitation.message || "No hay mensaje adicional"}`,
                                  duration: 5000
                                });
                              }}
                            >
                              Ver detalles
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No se encontraron invitaciones que coincidan con los criterios de búsqueda.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Mostrando {filteredInvitations.length} de {invitations.length} invitaciones
          </div>
          <Button variant="outline" onClick={() => {
            toast({
              title: "Función en desarrollo",
              description: "La exportación de invitaciones estará disponible próximamente.",
              duration: 3000
            });
          }}>
            Exportar invitaciones
          </Button>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderInvitations;
