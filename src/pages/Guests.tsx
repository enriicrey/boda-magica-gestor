
import React from 'react';
import { toast } from "sonner";
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { User, Plus, ChevronDown, Edit, Trash, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const Guests = () => {
  // Mock user data
  const userData = {
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    weddingDate: "15 de septiembre, 2025",
    avatarFallback: "MG"
  };
  
  // Calculate progress
  const progress = 38;
  
  // Mock guest data
  const guestData = {
    invited: 120,
    confirmed: 42,
    declined: 8
  };

  // Guest lists
  const guests = [
    { id: "1", name: "Carlos Rodríguez", email: "carlos@example.com", phone: "+34 612 345 678", group: "Familia Novia", status: "confirmed", plusOne: true, dietaryRestrictions: "Vegetariano" },
    { id: "2", name: "Laura Fernández", email: "laura@example.com", phone: "+34 623 456 789", group: "Familia Novio", status: "confirmed", plusOne: false, dietaryRestrictions: "" },
    { id: "3", name: "Miguel Álvarez", email: "miguel@example.com", phone: "+34 634 567 890", group: "Amigos Novia", status: "confirmed", plusOne: true, dietaryRestrictions: "Alergia a frutos secos" },
    { id: "4", name: "Elena Martínez", email: "elena@example.com", phone: "+34 645 678 901", group: "Amigos Novio", status: "pending", plusOne: false, dietaryRestrictions: "" },
    { id: "5", name: "Juan Gómez", email: "juan@example.com", phone: "+34 656 789 012", group: "Trabajo", status: "pending", plusOne: true, dietaryRestrictions: "" },
    { id: "6", name: "Sofía López", email: "sofia@example.com", phone: "+34 667 890 123", group: "Universidad", status: "declined", plusOne: false, dietaryRestrictions: "" }
  ];

  // Guest groups
  const guestGroups = [
    { name: "Familia Novia", count: 26 },
    { name: "Familia Novio", count: 24 },
    { name: "Amigos Novia", count: 18 },
    { name: "Amigos Novio", count: 20 },
    { name: "Trabajo", count: 15 },
    { name: "Universidad", count: 17 }
  ];

  const confirmedGuests = guests.filter(g => g.status === "confirmed");
  const pendingGuests = guests.filter(g => g.status === "pending");
  const declinedGuests = guests.filter(g => g.status === "declined");

  const handleAddGuest = () => {
    toast.success("Añadir nuevo invitado");
  };

  const handleEditGuest = (id: string) => {
    toast.success("Editar invitado");
  };

  const handleDeleteGuest = (id: string) => {
    toast.success("Eliminar invitado");
  };

  const handleAddGroup = () => {
    toast.success("Añadir nuevo grupo");
  };

  const handleImportContacts = () => {
    toast.success("Importar contactos");
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Total Invitados</p>
                      <p className="text-3xl font-semibold text-wedding-sage">{guestData.invited}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Confirmados</p>
                      <p className="text-3xl font-semibold text-green-600">{guestData.confirmed}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Declinados</p>
                      <p className="text-3xl font-semibold text-red-500">{guestData.declined}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="font-serif text-2xl font-semibold flex items-center">
                    <User className="text-wedding-sage mr-2 h-5 w-5" />
                    Lista de Invitados
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={handleImportContacts}
                    >
                      Importar Contactos
                    </Button>
                    <Button 
                      onClick={handleAddGuest} 
                      className="bg-wedding-sage hover:bg-wedding-sage/90 text-white"
                    >
                      <Plus className="mr-1 h-4 w-4" /> Añadir Invitado
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Progress value={Math.round((guestData.confirmed / guestData.invited) * 100)} className="h-2" />
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>{guestData.confirmed} confirmados</span>
                      <span>{guestData.invited - guestData.confirmed - guestData.declined} pendientes</span>
                      <span>{guestData.declined} declinados</span>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="all">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all">Todos</TabsTrigger>
                      <TabsTrigger value="confirmed">Confirmados</TabsTrigger>
                      <TabsTrigger value="pending">Pendientes</TabsTrigger>
                      <TabsTrigger value="declined">Declinados</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="mt-4">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grupo</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">+1</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {guests.map((guest) => (
                              <tr key={guest.id}>
                                <td className="px-4 py-3">
                                  <div>
                                    <div className="font-medium text-sm text-gray-900">{guest.name}</div>
                                    <div className="text-xs text-gray-500">{guest.email}</div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900">{guest.group}</td>
                                <td className="px-4 py-3">
                                  {guest.status === "confirmed" && (
                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      <Check className="w-3 h-3 mr-1" />Confirmado
                                    </div>
                                  )}
                                  {guest.status === "pending" && (
                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                      <ChevronDown className="w-3 h-3 mr-1" />Pendiente
                                    </div>
                                  )}
                                  {guest.status === "declined" && (
                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      <X className="w-3 h-3 mr-1" />Declinado
                                    </div>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900">
                                  {guest.plusOne ? "Sí" : "No"}
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <div className="flex justify-end space-x-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleEditGuest(guest.id)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="text-red-600 hover:text-red-800" 
                                      onClick={() => handleDeleteGuest(guest.id)}
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="confirmed" className="mt-4">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grupo</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">+1</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restricciones</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {confirmedGuests.map((guest) => (
                              <tr key={guest.id}>
                                <td className="px-4 py-3">
                                  <div>
                                    <div className="font-medium text-sm text-gray-900">{guest.name}</div>
                                    <div className="text-xs text-gray-500">{guest.email}</div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900">{guest.group}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">
                                  {guest.plusOne ? "Sí" : "No"}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-900">{guest.dietaryRestrictions || "-"}</td>
                                <td className="px-4 py-3 text-right">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleEditGuest(guest.id)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="pending" className="mt-4">
                      {/* Similar table for pending guests */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {pendingGuests.map((guest) => (
                              <tr key={guest.id}>
                                <td className="px-4 py-3 text-sm text-gray-900">{guest.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{guest.email}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{guest.phone}</td>
                                <td className="px-4 py-3 text-right">
                                  <div className="flex justify-end space-x-2">
                                    <Button 
                                      size="sm"
                                      className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                      Enviar Recordatorio
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="declined" className="mt-4">
                      {/* Similar table for declined guests */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grupo</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {declinedGuests.map((guest) => (
                              <tr key={guest.id}>
                                <td className="px-4 py-3 text-sm text-gray-900">{guest.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{guest.email}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{guest.group}</td>
                                <td className="px-4 py-3 text-right">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleEditGuest(guest.id)}
                                  >
                                    Reinvitar
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="font-serif text-xl font-semibold">Grupos</CardTitle>
                  <Button 
                    onClick={handleAddGroup} 
                    className="bg-wedding-sage hover:bg-wedding-sage/90 text-white"
                    size="sm"
                  >
                    <Plus className="mr-1 h-4 w-4" /> Añadir Grupo
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guestGroups.map((group, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{group.name}</p>
                          <p className="text-sm text-gray-500">{group.count} invitados</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Guests;
