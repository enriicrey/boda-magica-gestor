
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
import { User, Calendar, Bell, Lock, CreditCard, Download } from 'lucide-react';

const ClientAjustes = () => {
  const [profile, setProfile] = useState({
    name: 'Clara Cliente',
    email: 'clara.cliente@email.com',
    phone: '+34 612 345 678',
    address: 'Calle Mayor 123, Madrid',
    bio: 'Preparando la boda de mis sueños para agosto de 2025'
  });

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

  const [privacy, setPrivacy] = useState({
    publicProfile: false,
    shareProgress: true,
    allowContact: true
  });

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
          <TabsList className="grid w-full grid-cols-5">
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
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Privacidad
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
                    <AvatarFallback className="text-lg">CC</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline">Cambiar foto</Button>
                    <p className="text-sm text-gray-500 mt-2">JPG, GIF o PNG. Máximo 1MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input 
                      id="name" 
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input 
                      id="phone" 
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input 
                      id="address" 
                      value={profile.address}
                      onChange={(e) => setProfile({...profile, address: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Cuéntanos sobre ti y tu boda..."
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  />
                </div>

                <Button>Guardar cambios</Button>
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

                <Button>Actualizar detalles</Button>
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

                <Button>Guardar preferencias</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Privacidad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Perfil público</h4>
                      <p className="text-sm text-gray-500">Permite que otros usuarios vean tu perfil</p>
                    </div>
                    <Switch 
                      checked={privacy.publicProfile}
                      onCheckedChange={(checked) => setPrivacy({...privacy, publicProfile: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Compartir progreso</h4>
                      <p className="text-sm text-gray-500">Permite que tus proveedores vean tu progreso</p>
                    </div>
                    <Switch 
                      checked={privacy.shareProgress}
                      onCheckedChange={(checked) => setPrivacy({...privacy, shareProgress: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Permitir contacto directo</h4>
                      <p className="text-sm text-gray-500">Los proveedores pueden contactarte directamente</p>
                    </div>
                    <Switch 
                      checked={privacy.allowContact}
                      onCheckedChange={(checked) => setPrivacy({...privacy, allowContact: checked})}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Gestión de datos</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar mis datos
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      <Download className="h-4 w-4 mr-2" />
                      Eliminar mi cuenta
                    </Button>
                  </div>
                </div>

                <Button>Guardar configuración</Button>
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
