
import React from 'react';
import { toast } from "sonner";
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Settings as SettingsIcon, User, Calendar, Lock, Bell, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Settings = () => {
  // Mock user data
  const userData = {
    name: "María García",
    email: "maria.garcia@example.com",
    phone: "+34 612 345 678",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    weddingDate: "15 de septiembre, 2025",
    partnerId: "carlos@example.com",
    avatarFallback: "MG"
  };
  
  // Calculate progress
  const progress = 38;

  const handleSaveProfile = () => {
    toast.success("Perfil actualizado correctamente");
  };

  const handleSaveAccount = () => {
    toast.success("Configuración de la cuenta actualizada");
  };

  const handleSaveWedding = () => {
    toast.success("Detalles de la boda actualizados");
  };

  const handleSavePassword = () => {
    toast.success("Contraseña actualizada correctamente");
  };

  const handleSaveNotifications = () => {
    toast.success("Preferencias de notificación actualizadas");
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
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif text-2xl font-semibold flex items-center">
                    <SettingsIcon className="text-wedding-sage mr-2 h-5 w-5" />
                    Ajustes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
                      <TabsTrigger value="profile" className="text-xs md:text-sm">Perfil</TabsTrigger>
                      <TabsTrigger value="account" className="text-xs md:text-sm">Cuenta</TabsTrigger>
                      <TabsTrigger value="wedding" className="text-xs md:text-sm">Boda</TabsTrigger>
                      <TabsTrigger value="password" className="text-xs md:text-sm">Contraseña</TabsTrigger>
                      <TabsTrigger value="notifications" className="text-xs md:text-sm">Notificaciones</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="profile">
                      <div className="space-y-6">
                        <div className="flex flex-col items-center md:items-start md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                          <div className="flex flex-col items-center">
                            <Avatar className="h-24 w-24">
                              <AvatarImage src={userData.avatar} alt={userData.name} />
                              <AvatarFallback>{userData.avatarFallback}</AvatarFallback>
                            </Avatar>
                            <Button variant="link" className="mt-2 text-wedding-sage">
                              Cambiar Foto
                            </Button>
                          </div>
                          <div className="space-y-4 flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Nombre Completo</Label>
                                <Input id="name" defaultValue={userData.name} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue={userData.email} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Teléfono</Label>
                                <Input id="phone" defaultValue={userData.phone} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="partnerId">Email de tu Pareja</Label>
                                <Input id="partnerId" type="email" defaultValue={userData.partnerId} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            onClick={handleSaveProfile} 
                            className="bg-wedding-sage hover:bg-wedding-sage/90 text-white"
                          >
                            <Save className="mr-2 h-4 w-4" /> Guardar Cambios
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="account">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">Preferencias de la Cuenta</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="language">Idioma</Label>
                              <select id="language" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                <option value="es">Español</option>
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="currency">Moneda</Label>
                              <select id="currency" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                <option value="eur">EUR (€)</option>
                                <option value="usd">USD ($)</option>
                                <option value="gbp">GBP (£)</option>
                              </select>
                            </div>
                          </div>
                          
                          <h3 className="font-medium text-lg mt-6">Información de Facturación</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="billingName">Nombre en Factura</Label>
                              <Input id="billingName" defaultValue={userData.name} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billingAddress">Dirección</Label>
                              <Input id="billingAddress" placeholder="Introduce tu dirección" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billingCity">Ciudad</Label>
                              <Input id="billingCity" placeholder="Ciudad" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billingPostalCode">Código Postal</Label>
                              <Input id="billingPostalCode" placeholder="Código Postal" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billingCountry">País</Label>
                              <select id="billingCountry" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                <option value="es">España</option>
                                <option value="fr">Francia</option>
                                <option value="it">Italia</option>
                                <option value="de">Alemania</option>
                                <option value="pt">Portugal</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            onClick={handleSaveAccount} 
                            className="bg-wedding-sage hover:bg-wedding-sage/90 text-white"
                          >
                            <Save className="mr-2 h-4 w-4" /> Guardar Cambios
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="wedding">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">Detalles de la Boda</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="weddingDate">Fecha de la Boda</Label>
                              <Input type="date" id="weddingDate" defaultValue="2025-09-15" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="weddingTime">Hora de la Ceremonia</Label>
                              <Input type="time" id="weddingTime" defaultValue="18:00" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="weddingLocation">Lugar de la Ceremonia</Label>
                              <Input id="weddingLocation" defaultValue="Villa Rosa" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label htmlFor="weddingAddress">Dirección</Label>
                              <Input id="weddingAddress" defaultValue="Carretera de El Escorial km 5, Madrid" />
                            </div>
                          </div>
                          
                          <h3 className="font-medium text-lg mt-6">Invitados</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="guestCount">Número Estimado de Invitados</Label>
                              <Input type="number" id="guestCount" defaultValue="120" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="plusOnes">¿Permitir Acompañantes?</Label>
                              <select id="plusOnes" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                <option value="yes">Sí, para todos los invitados</option>
                                <option value="some">Sólo para algunos invitados</option>
                                <option value="no">No se permiten acompañantes</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            onClick={handleSaveWedding} 
                            className="bg-wedding-sage hover:bg-wedding-sage/90 text-white"
                          >
                            <Save className="mr-2 h-4 w-4" /> Guardar Cambios
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="password">
                      <div className="space-y-6 max-w-md mx-auto">
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">Cambiar Contraseña</h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="currentPassword">Contraseña Actual</Label>
                              <Input id="currentPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="newPassword">Nueva Contraseña</Label>
                              <Input id="newPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                              <Input id="confirmPassword" type="password" />
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 mt-2">
                            <p>Tu contraseña debe tener:</p>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                              <li>Al menos 8 caracteres</li>
                              <li>Al menos una letra mayúscula</li>
                              <li>Al menos un número</li>
                              <li>Al menos un carácter especial</li>
                            </ul>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <Button 
                            onClick={handleSavePassword} 
                            className="bg-wedding-sage hover:bg-wedding-sage/90 text-white w-full"
                          >
                            <Lock className="mr-2 h-4 w-4" /> Cambiar Contraseña
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="notifications">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">Preferencias de Notificación</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between py-2">
                              <div>
                                <p className="font-medium">Recordatorios de Eventos</p>
                                <p className="text-sm text-gray-500">Recibir recordatorios sobre próximos eventos</p>
                              </div>
                              <div className="flex space-x-6">
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="eventEmail" className="rounded border-gray-300" defaultChecked />
                                  <Label htmlFor="eventEmail" className="text-sm">Email</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="eventPush" className="rounded border-gray-300" defaultChecked />
                                  <Label htmlFor="eventPush" className="text-sm">Push</Label>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between py-2">
                              <div>
                                <p className="font-medium">Actualizaciones de Proveedores</p>
                                <p className="text-sm text-gray-500">Notificaciones sobre tus proveedores contratados</p>
                              </div>
                              <div className="flex space-x-6">
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="vendorEmail" className="rounded border-gray-300" defaultChecked />
                                  <Label htmlFor="vendorEmail" className="text-sm">Email</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="vendorPush" className="rounded border-gray-300" defaultChecked />
                                  <Label htmlFor="vendorPush" className="text-sm">Push</Label>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between py-2">
                              <div>
                                <p className="font-medium">Recordatorios de Pagos</p>
                                <p className="text-sm text-gray-500">Alertas sobre pagos pendientes y próximos vencimientos</p>
                              </div>
                              <div className="flex space-x-6">
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="paymentEmail" className="rounded border-gray-300" defaultChecked />
                                  <Label htmlFor="paymentEmail" className="text-sm">Email</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="paymentPush" className="rounded border-gray-300" defaultChecked />
                                  <Label htmlFor="paymentPush" className="text-sm">Push</Label>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between py-2">
                              <div>
                                <p className="font-medium">Actualizaciones de Invitados</p>
                                <p className="text-sm text-gray-500">Notificaciones sobre las respuestas de los invitados</p>
                              </div>
                              <div className="flex space-x-6">
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="guestEmail" className="rounded border-gray-300" defaultChecked />
                                  <Label htmlFor="guestEmail" className="text-sm">Email</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="guestPush" className="rounded border-gray-300" defaultChecked />
                                  <Label htmlFor="guestPush" className="text-sm">Push</Label>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between py-2">
                              <div>
                                <p className="font-medium">Promociones y Ofertas</p>
                                <p className="text-sm text-gray-500">Recibe información sobre descuentos y promociones</p>
                              </div>
                              <div className="flex space-x-6">
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="promoEmail" className="rounded border-gray-300" />
                                  <Label htmlFor="promoEmail" className="text-sm">Email</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="promoPush" className="rounded border-gray-300" />
                                  <Label htmlFor="promoPush" className="text-sm">Push</Label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            onClick={handleSaveNotifications} 
                            className="bg-wedding-sage hover:bg-wedding-sage/90 text-white"
                          >
                            <Bell className="mr-2 h-4 w-4" /> Guardar Preferencias
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
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

export default Settings;
