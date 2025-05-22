
import { useState } from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Mock user data
const mockUser = {
  name: "Diana Rodríguez",
  email: "diana@weddingplan.com",
  role: "Organizador Premium",
  phone: "+34 612 345 678",
  location: "Madrid, España",
  avatar: "/placeholder.svg",
  memberSince: "Marzo 2023"
};

// Mock service categories
const serviceCategories = [
  "Bodas", 
  "Cumpleaños", 
  "Eventos corporativos", 
  "Aniversarios", 
  "Bautizos y comuniones",
  "Graduaciones",
  "Baby showers"
];

const ProviderSettings = () => {
  const { toast } = useToast();
  
  // Personal information state
  const [personalInfo, setPersonalInfo] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    location: mockUser.location,
    description: "Organizadora profesional con más de 5 años de experiencia en la planificación de bodas y eventos especiales. Especialista en crear experiencias únicas y personalizadas para cada cliente.",
    website: "www.dianaeventos.com"
  });

  // Business information state
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "Diana Eventos & Celebraciones",
    taxId: "B12345678",
    address: "Calle Gran Vía 123, 28013",
    city: "Madrid",
    postalCode: "28013",
    country: "España",
    serviceArea: "Madrid y alrededores (hasta 100km)"
  });

  // Security settings state
  const [securityInfo, setSecurityInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    messageAlerts: true,
    reviewAlerts: true,
    paymentAlerts: true,
    marketingEmails: false
  });

  // Selected service categories state
  const [selectedCategories, setSelectedCategories] = useState([
    "Bodas", 
    "Cumpleaños", 
    "Aniversarios"
  ]);

  const handleUpdatePersonal = () => {
    toast({
      title: "Perfil actualizado",
      description: "Tu información personal ha sido actualizada correctamente.",
      duration: 3000
    });
  };

  const handleUpdateBusiness = () => {
    toast({
      title: "Información de negocio actualizada",
      description: "Los datos de tu negocio han sido actualizados.",
      duration: 3000
    });
  };

  const handleUpdatePassword = () => {
    if (securityInfo.newPassword !== securityInfo.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas nuevas no coinciden.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    if (securityInfo.currentPassword === "") {
      toast({
        title: "Error",
        description: "Debes introducir tu contraseña actual.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido actualizada correctamente.",
      duration: 3000
    });
    
    setSecurityInfo({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleUpdateNotifications = () => {
    toast({
      title: "Preferencias actualizadas",
      description: "Tus preferencias de notificación han sido actualizadas.",
      duration: 3000
    });
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleUpdateCategories = () => {
    toast({
      title: "Categorías actualizadas",
      description: "Tus categorías de servicio han sido actualizadas.",
      duration: 3000
    });
  };

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Ajustes</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Configura tu cuenta y tus preferencias.
          </p>
        </div>

        <Tabs defaultValue="perfil" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="negocio">Negocio</TabsTrigger>
            <TabsTrigger value="servicios">Servicios</TabsTrigger>
            <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
            <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          </TabsList>
          
          {/* Perfil Tab */}
          <TabsContent value="perfil" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                  Actualiza tu información personal y de contacto.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback>{mockUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="mb-2">
                      Cambiar imagen
                    </Button>
                    <p className="text-xs text-gray-500">
                      Recomendado: 300x300px, máximo 2MB.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nombre completo
                    </label>
                    <Input
                      id="name"
                      value={personalInfo.name}
                      onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Correo electrónico
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Número de teléfono
                    </label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium">
                      Ubicación
                    </label>
                    <Input
                      id="location"
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="website" className="text-sm font-medium">
                      Sitio web
                    </label>
                    <Input
                      id="website"
                      value={personalInfo.website}
                      onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Descripción
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="w-full p-2 border rounded-md resize-none"
                      value={personalInfo.description}
                      onChange={(e) => setPersonalInfo({...personalInfo, description: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleUpdatePersonal}>Guardar cambios</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Negocio Tab */}
          <TabsContent value="negocio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información de Negocio</CardTitle>
                <CardDescription>
                  Actualiza la información relacionada con tu empresa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="businessName" className="text-sm font-medium">
                      Nombre de la empresa
                    </label>
                    <Input
                      id="businessName"
                      value={businessInfo.businessName}
                      onChange={(e) => setBusinessInfo({...businessInfo, businessName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="taxId" className="text-sm font-medium">
                      CIF / NIF
                    </label>
                    <Input
                      id="taxId"
                      value={businessInfo.taxId}
                      onChange={(e) => setBusinessInfo({...businessInfo, taxId: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="address" className="text-sm font-medium">
                      Dirección
                    </label>
                    <Input
                      id="address"
                      value={businessInfo.address}
                      onChange={(e) => setBusinessInfo({...businessInfo, address: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">
                      Ciudad
                    </label>
                    <Input
                      id="city"
                      value={businessInfo.city}
                      onChange={(e) => setBusinessInfo({...businessInfo, city: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="postalCode" className="text-sm font-medium">
                      Código postal
                    </label>
                    <Input
                      id="postalCode"
                      value={businessInfo.postalCode}
                      onChange={(e) => setBusinessInfo({...businessInfo, postalCode: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium">
                      País
                    </label>
                    <Input
                      id="country"
                      value={businessInfo.country}
                      onChange={(e) => setBusinessInfo({...businessInfo, country: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="serviceArea" className="text-sm font-medium">
                      Área de servicio
                    </label>
                    <Input
                      id="serviceArea"
                      value={businessInfo.serviceArea}
                      onChange={(e) => setBusinessInfo({...businessInfo, serviceArea: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleUpdateBusiness}>Guardar cambios</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Servicios Tab */}
          <TabsContent value="servicios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Categorías de Servicios</CardTitle>
                <CardDescription>
                  Selecciona las categorías de servicios que ofreces.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Estas categorías aparecerán en tu perfil y ayudarán a los clientes a encontrar tus servicios.
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {serviceCategories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        className={`cursor-pointer px-3 py-1 text-sm ${
                          selectedCategories.includes(category) ? 'bg-primary' : ''
                        }`}
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Categorías seleccionadas:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.length > 0 ? (
                        selectedCategories.map((category) => (
                          <Badge key={category} className="bg-primary">
                            {category}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No hay categorías seleccionadas</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleUpdateCategories}>Guardar cambios</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Seguridad Tab */}
          <TabsContent value="seguridad" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cambiar Contraseña</CardTitle>
                <CardDescription>
                  Actualiza tu contraseña de acceso.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="currentPassword" className="text-sm font-medium">
                      Contraseña actual
                    </label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={securityInfo.currentPassword}
                      onChange={(e) => setSecurityInfo({...securityInfo, currentPassword: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="text-sm font-medium">
                      Nueva contraseña
                    </label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={securityInfo.newPassword}
                      onChange={(e) => setSecurityInfo({...securityInfo, newPassword: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirmar nueva contraseña
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={securityInfo.confirmPassword}
                      onChange={(e) => setSecurityInfo({...securityInfo, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleUpdatePassword}>Cambiar contraseña</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sesiones Activas</CardTitle>
                <CardDescription>
                  Administra tus sesiones activas en diferentes dispositivos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600"
                        >
                          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                          <path d="M12 18h.01" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Dispositivo actual</p>
                        <p className="text-xs text-gray-500">
                          Madrid, España · {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-600">Activa</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-600"
                        >
                          <rect width="20" height="14" x="2" y="3" rx="2" />
                          <line x1="8" x2="16" y1="21" y2="21" />
                          <line x1="12" x2="12" y1="17" y2="21" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm">MacBook Pro</p>
                        <p className="text-xs text-gray-500">
                          Barcelona, España · Hace 2 días
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-600">
                      Cerrar sesión
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="text-red-600">
                  Cerrar todas las sesiones
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Notificaciones Tab */}
          <TabsContent value="notificaciones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Notificación</CardTitle>
                <CardDescription>
                  Configura cómo y cuándo quieres recibir notificaciones.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificaciones por email</p>
                      <p className="text-sm text-gray-500">
                        Recibe actualizaciones importantes en tu correo electrónico.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={notificationSettings.emailNotifications}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          emailNotifications: !notificationSettings.emailNotifications
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificaciones push</p>
                      <p className="text-sm text-gray-500">
                        Recibe alertas instantáneas en tu navegador.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={notificationSettings.pushNotifications}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          pushNotifications: !notificationSettings.pushNotifications
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Alertas de mensajes</p>
                      <p className="text-sm text-gray-500">
                        Recibe notificaciones cuando recibes nuevos mensajes.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={notificationSettings.messageAlerts}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          messageAlerts: !notificationSettings.messageAlerts
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Alertas de reseñas</p>
                      <p className="text-sm text-gray-500">
                        Recibe notificaciones cuando recibes nuevas reseñas.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={notificationSettings.reviewAlerts}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          reviewAlerts: !notificationSettings.reviewAlerts
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Alertas de pagos</p>
                      <p className="text-sm text-gray-500">
                        Recibe notificaciones sobre pagos y transacciones.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={notificationSettings.paymentAlerts}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          paymentAlerts: !notificationSettings.paymentAlerts
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Emails de marketing</p>
                      <p className="text-sm text-gray-500">
                        Recibe ofertas, consejos y actualizaciones del servicio.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={notificationSettings.marketingEmails}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          marketingEmails: !notificationSettings.marketingEmails
                        })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleUpdateNotifications}>Guardar preferencias</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProviderLayout>
  );
};

export default ProviderSettings;
