
import React, { useState } from 'react';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Plus, Users, UserCheck, UserX, Mail, Phone } from 'lucide-react';
import { useClient } from '@/contexts/ClientContext';

const ClientInvitados = () => {
  const { guests, addGuest } = useClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [groupFilter, setGroupFilter] = useState('all');
  
  // New guest form
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestEmail, setNewGuestEmail] = useState('');
  const [newGuestPhone, setNewGuestPhone] = useState('');
  const [newGuestGroup, setNewGuestGroup] = useState('');
  const [newGuestPlusOne, setNewGuestPlusOne] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || guest.status === statusFilter;
    const matchesGroup = groupFilter === 'all' || guest.group === groupFilter;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const confirmedGuests = guests.filter(g => g.status === 'Confirmado').length;
  const pendingGuests = guests.filter(g => g.status === 'Pendiente').length;
  const declinedGuests = guests.filter(g => g.status === 'Declinado').length;
  const totalAttending = guests.filter(g => g.status === 'Confirmado').reduce((sum, g) => sum + (g.plusOne ? 2 : 1), 0);

  const handleAddGuest = () => {
    if (newGuestName && newGuestEmail) {
      addGuest({
        name: newGuestName,
        email: newGuestEmail,
        phone: newGuestPhone,
        status: 'Pendiente',
        group: newGuestGroup || 'General',
        plusOne: newGuestPlusOne,
        plusOneName: '',
        dietary: '',
        table: ''
      });
      
      // Reset form
      setNewGuestName('');
      setNewGuestEmail('');
      setNewGuestPhone('');
      setNewGuestGroup('');
      setNewGuestPlusOne(false);
      setIsDialogOpen(false);
    }
  };

  const handleStatsCardClick = (filter: string) => {
    setStatusFilter(filter);
    setGroupFilter('all');
    setSearchTerm('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado': return 'bg-green-100 text-green-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Declinado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmado': return <UserCheck className="h-4 w-4 text-green-600" />;
      case 'Pendiente': return <Users className="h-4 w-4 text-yellow-600" />;
      case 'Declinado': return <UserX className="h-4 w-4 text-red-600" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const groups = [...new Set(guests.map(g => g.group))];

  return (
    <ClientLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Lista de Invitados</h1>
          <p className="text-gray-500">
            Gestiona tu lista de invitados y sus confirmaciones.
          </p>
        </div>

        {/* Stats Cards - Now clickable */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-blue-50" 
            onClick={() => handleStatsCardClick('all')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Invitados</p>
                  <p className="text-2xl font-bold">{guests.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-green-50" 
            onClick={() => handleStatsCardClick('Confirmado')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Confirmados</p>
                  <p className="text-2xl font-bold text-green-600">{confirmedGuests}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-yellow-50" 
            onClick={() => handleStatsCardClick('Pendiente')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingGuests}</p>
                </div>
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-purple-50" 
            onClick={() => handleStatsCardClick('all')}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Asistentes</p>
                  <p className="text-2xl font-bold text-purple-600">{totalAttending}</p>
                </div>
                <UserCheck className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar invitados..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Confirmado">Confirmado</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="Declinado">Declinado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={groupFilter} onValueChange={setGroupFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Grupo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los grupos</SelectItem>
                {groups.map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Plus className="mr-2 h-4 w-4" />
                Añadir Invitado
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Añadir nuevo invitado</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="guestName">Nombre completo</Label>
                  <Input
                    id="guestName"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    placeholder="Ej: María García López"
                  />
                </div>
                <div>
                  <Label htmlFor="guestEmail">Email</Label>
                  <Input
                    id="guestEmail"
                    type="email"
                    value={newGuestEmail}
                    onChange={(e) => setNewGuestEmail(e.target.value)}
                    placeholder="maria@ejemplo.com"
                  />
                </div>
                <div>
                  <Label htmlFor="guestPhone">Teléfono</Label>
                  <Input
                    id="guestPhone"
                    value={newGuestPhone}
                    onChange={(e) => setNewGuestPhone(e.target.value)}
                    placeholder="+34 612 345 678"
                  />
                </div>
                <div>
                  <Label htmlFor="guestGroup">Grupo</Label>
                  <Select value={newGuestGroup} onValueChange={setNewGuestGroup}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Familia novia">Familia novia</SelectItem>
                      <SelectItem value="Familia novio">Familia novio</SelectItem>
                      <SelectItem value="Amigos novia">Amigos novia</SelectItem>
                      <SelectItem value="Amigos novio">Amigos novio</SelectItem>
                      <SelectItem value="Trabajo">Trabajo</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="plusOne"
                    checked={newGuestPlusOne}
                    onChange={(e) => setNewGuestPlusOne(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="plusOne">Puede traer acompañante</Label>
                </div>
                <Button onClick={handleAddGuest} className="w-full">
                  Añadir invitado
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Guests Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-4 font-medium">Invitado</th>
                    <th className="text-left p-4 font-medium">Contacto</th>
                    <th className="text-left p-4 font-medium">Grupo</th>
                    <th className="text-left p-4 font-medium">Acompañante</th>
                    <th className="text-left p-4 font-medium">Restricciones</th>
                    <th className="text-left p-4 font-medium">Mesa</th>
                    <th className="text-left p-4 font-medium">Estado</th>
                    <th className="text-right p-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.map((guest) => (
                    <tr key={guest.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(guest.status)}
                          <div>
                            <div className="font-medium">{guest.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-3 w-3 mr-1" />
                            {guest.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3 w-3 mr-1" />
                            {guest.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{guest.group}</td>
                      <td className="p-4">
                        {guest.plusOne ? (
                          <div className="text-sm">
                            <div className="font-medium">Sí</div>
                            {guest.plusOneName && (
                              <div className="text-gray-500">{guest.plusOneName}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">No</span>
                        )}
                      </td>
                      <td className="p-4 text-sm">{guest.dietary || '-'}</td>
                      <td className="p-4 text-sm">{guest.table || '-'}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(guest.status)}>
                          {guest.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Ver
                          </Button>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredGuests.length === 0 && (
              <div className="py-12 text-center text-gray-500">
                No se encontraron invitados con los criterios de búsqueda.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default ClientInvitados;
