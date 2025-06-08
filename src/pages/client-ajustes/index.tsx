
import React, { useState } from 'react';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Calendar, Bell, CreditCard } from 'lucide-react';
import { useClient } from '@/contexts/ClientContext';

const ClientAjustes = () => {
  const { profile, updateProfile } = useClient();
  
  const [weddingDetails, setWeddingDetails] = useState({
    date: '2025-08-15',
    venue: 'Villa Rosa',
    guests: '120',
    budget: '20000',
    style: 'rustico'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true
  });

  const [localProfile, setLocalProfile] = useState(profile);

  const handleProfileSave = () => {
    updateProfile(localProfile);
    alert('Perfil actualizado correctamente');
  };

  const handleWeddingSave = () => {
    alert('Detalles de la boda actualizados correctamente');
  };

  const handleNotificationsSave = () => {
    alert('Preferencias de notificación guardadas correctamente');
  };

  return (
    <ClientLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-gray-500">
            Personaliza tu perfil y preferencias.
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="wedding" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Boda
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Facturación
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt="Perfil" />
                    <AvatarFallback className="text-lg bg-pink-100 text-pink-700">
                      {localProfile.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        const newAvatar = prompt('Introduce las iniciales para el avatar:', localProfile.avatar);
                        if (newAvatar) {
                          setLocalProfile({...localProfile, avatar: newAvatar});
                        }
                      }}
                    >
                      Cambiar foto
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">Iniciales para el avatar.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input 
                      id="name" 
                      value={localProfile.name}
                      onChange={(e) => setLocalProfile({...localProfile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={localProfile.email}
                      onChange={(e) => setLocalProfile({...localProfile, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input 
                      id="phone" 
                      value={localProfile.phone}
                      onChange={(e) => setLocalProfile({...localProfile, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input 
                      id="address" 
                      value={localProfile.address}
                      onChange={(e) => setLocalProfile({...localProfile, address: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Cuéntanos sobre ti y tu boda..."
                    value={localProfile.bio}
                    onChange={(e) => setLocalProfile({...localProfile, bio: e.target.value})}
                  />
                </div>

                <Button onClick={handleProfileSave} className="bg-pink-600 hover:bg-pink-700">
                  Guardar cambios
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wedding Tab */}
          <TabsContent value="wedding">
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la Boda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha de la boda</Label>
                    <Input 
                      id="date" 
                      type="date"
                      value={weddingDetails.date}
                      onChange={(e) => setWeddingDetails({...weddingDetails, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="venue">Lugar</Label>
                    <Input 
                      id="venue" 
                      value={weddingDetails.venue}
                      onChange={(e) => setWeddingDetails({...weddingDetails, venue: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Número de invitados</Label>
                    <Input 
                      id="guests" 
                      type="number"
                      value={weddingDetails.guests}
                      onChange={(e) => setWeddingDetails({...weddingDetails, guests: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Presupuesto (€)</Label>
                    <Input 
                      id="budget" 
                      type="number"
                      value={weddingDetails.budget}
                      onChange={(e) => setWeddingDetails({...weddingDetails, budget: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="style">Estilo de boda</Label>
                    <Select value={weddingDetails.style} onValueChange={(value) => setWeddingDetails({...weddingDetails, style: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clasico">Clásico</SelectItem>
                        <SelectItem value="rustico">Rústico</SelectItem>
                        <SelectItem value="moderno">Moderno</SelectItem>
                        <SelectItem value="boho">Boho</SelectItem>
                        <SelectItem value="elegante">Elegante</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleWeddingSave} className="bg-pink-600 hover:bg-pink-700">
                  Actualizar detalles
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Notificación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificaciones por email</h4>
                      <p className="text-sm text-gray-500">Recibe actualizaciones importantes por correo</p>
                    </div>
                    <Switch 
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificaciones push</h4>
                      <p className="text-sm text-gray-500">Recibe notificaciones en tiempo real</p>
                    </div>
                    <Switch 
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificaciones SMS</h4>
                      <p className="text-sm text-gray-500">Recibe recordatorios importantes por SMS</p>
                    </div>
                    <Switch 
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Promociones y ofertas</h4>
                      <p className="text-sm text-gray-500">Recibe información sobre ofertas especiales</p>
                    </div>
                    <Switch 
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                    />
                  </div>
                </div>

                <Button onClick={handleNotificationsSave} className="bg-pink-600 hover:bg-pink-700">
                  Guardar preferencias
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Información de Facturación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Plan actual</h4>
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 className="font-medium">Plan Premium</h5>
                          <p className="text-sm text-gray-500">Acceso completo a todas las funciones</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">€29/mes</p>
                          <p className="text-sm text-gray-500">Facturado mensualmente</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Método de pago</h4>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-8 w-8 text-gray-400" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-500">Expira 12/26</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Historial de facturas</h4>
                    <div className="space-y-2">
                      {[
                        { date: '01/06/2024', amount: '€29', status: 'Pagado' },
                        { date: '01/05/2024', amount: '€29', status: 'Pagado' },
                        { date: '01/04/2024', amount: '€29', status: 'Pagado' }
                      ].map((invoice, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <p className="font-medium">{invoice.date}</p>
                            <p className="text-sm text-gray-500">{invoice.status}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{invoice.amount}</p>
                            <Button variant="ghost" size="sm">Descargar</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">Cambiar plan</Button>
                  <Button variant="outline">Actualizar método de pago</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  );
};

export default ClientAjustes;
