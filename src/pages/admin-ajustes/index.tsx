
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Database, Bell, CreditCard, Shield, Users } from 'lucide-react';

const AdminAjustes = () => {
  const [platformSettings, setPlatformSettings] = useState({
    siteName: 'WeddingPlatform',
    siteDescription: 'Plataforma integral para la planificación de bodas',
    contactEmail: 'admin@weddingplatform.com',
    supportPhone: '+34 900 123 456',
    maintenanceMode: false,
    newRegistrations: true
  });

  const [paymentSettings, setPaymentSettings] = useState({
    commissionRate: '5',
    currency: 'EUR',
    paymentMethods: {
      stripe: true,
      paypal: true,
      bankTransfer: false
    },
    autoPayouts: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorRequired: false,
    sessionTimeout: '30',
    passwordMinLength: '8',
    maxLoginAttempts: '5',
    accountLockTime: '15'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: true,
    systemAlerts: true
  });

  return (
    <AdminLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h1>
          <p className="text-gray-500">
            Administre la configuración global de la plataforma.
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Pagos
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Seguridad
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuarios
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Configuración General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Nombre del sitio</Label>
                    <Input
                      id="siteName"
                      value={platformSettings.siteName}
                      onChange={(e) => setPlatformSettings({...platformSettings, siteName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email de contacto</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={platformSettings.contactEmail}
                      onChange={(e) => setPlatformSettings({...platformSettings, contactEmail: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportPhone">Teléfono de soporte</Label>
                    <Input
                      id="supportPhone"
                      value={platformSettings.supportPhone}
                      onChange={(e) => setPlatformSettings({...platformSettings, supportPhone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Descripción del sitio</Label>
                  <Textarea
                    id="siteDescription"
                    value={platformSettings.siteDescription}
                    onChange={(e) => setPlatformSettings({...platformSettings, siteDescription: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Modo mantenimiento</h4>
                      <p className="text-sm text-gray-500">Desactiva el acceso al sitio para usuarios</p>
                    </div>
                    <Switch
                      checked={platformSettings.maintenanceMode}
                      onCheckedChange={(checked) => setPlatformSettings({...platformSettings, maintenanceMode: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Nuevos registros</h4>
                      <p className="text-sm text-gray-500">Permite el registro de nuevos usuarios</p>
                    </div>
                    <Switch
                      checked={platformSettings.newRegistrations}
                      onCheckedChange={(checked) => setPlatformSettings({...platformSettings, newRegistrations: checked})}
                    />
                  </div>
                </div>

                <Button>Guardar configuración general</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Pagos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="commissionRate">Tasa de comisión (%)</Label>
                    <Input
                      id="commissionRate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={paymentSettings.commissionRate}
                      onChange={(e) => setPaymentSettings({...paymentSettings, commissionRate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moneda predeterminada</Label>
                    <Select value={paymentSettings.currency} onValueChange={(value) => setPaymentSettings({...paymentSettings, currency: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        <SelectItem value="USD">Dólar (USD)</SelectItem>
                        <SelectItem value="GBP">Libra (GBP)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Métodos de pago habilitados</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Stripe</h5>
                      <p className="text-sm text-gray-500">Procesamiento de tarjetas de crédito</p>
                    </div>
                    <Switch
                      checked={paymentSettings.paymentMethods.stripe}
                      onCheckedChange={(checked) => setPaymentSettings({
                        ...paymentSettings,
                        paymentMethods: {...paymentSettings.paymentMethods, stripe: checked}
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">PayPal</h5>
                      <p className="text-sm text-gray-500">Pagos a través de PayPal</p>
                    </div>
                    <Switch
                      checked={paymentSettings.paymentMethods.paypal}
                      onCheckedChange={(checked) => setPaymentSettings({
                        ...paymentSettings,
                        paymentMethods: {...paymentSettings.paymentMethods, paypal: checked}
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Transferencia bancaria</h5>
                      <p className="text-sm text-gray-500">Pagos por transferencia directa</p>
                    </div>
                    <Switch
                      checked={paymentSettings.paymentMethods.bankTransfer}
                      onCheckedChange={(checked) => setPaymentSettings({
                        ...paymentSettings,
                        paymentMethods: {...paymentSettings.paymentMethods, bankTransfer: checked}
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Pagos automáticos</h5>
                      <p className="text-sm text-gray-500">Transferir automáticamente a proveedores</p>
                    </div>
                    <Switch
                      checked={paymentSettings.autoPayouts}
                      onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, autoPayouts: checked})}
                    />
                  </div>
                </div>

                <Button>Guardar configuración de pagos</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Seguridad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Tiempo límite de sesión (minutos)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      min="5"
                      max="480"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">Longitud mínima de contraseña</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      min="6"
                      max="20"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Máximo intentos de login</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      min="3"
                      max="10"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountLockTime">Tiempo de bloqueo (minutos)</Label>
                    <Input
                      id="accountLockTime"
                      type="number"
                      min="5"
                      max="60"
                      value={securitySettings.accountLockTime}
                      onChange={(e) => setSecuritySettings({...securitySettings, accountLockTime: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Autenticación de dos factores obligatoria</h4>
                    <p className="text-sm text-gray-500">Requiere 2FA para todos los administradores</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorRequired}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorRequired: checked})}
                  />
                </div>

                <Button>Guardar configuración de seguridad</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Notificaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificaciones por email</h4>
                      <p className="text-sm text-gray-500">Envío de notificaciones por correo electrónico</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificaciones SMS</h4>
                      <p className="text-sm text-gray-500">Envío de notificaciones por mensaje de texto</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificaciones push</h4>
                      <p className="text-sm text-gray-500">Notificaciones en tiempo real en el navegador</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Emails de marketing</h4>
                      <p className="text-sm text-gray-500">Envío de promociones y ofertas especiales</p>
                    </div>
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingEmails: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Alertas del sistema</h4>
                      <p className="text-sm text-gray-500">Notificaciones sobre errores y mantenimiento</p>
                    </div>
                    <Switch
                      checked={notificationSettings.systemAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemAlerts: checked})}
                    />
                  </div>
                </div>

                <Button>Guardar configuración de notificaciones</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Total Usuarios</p>
                          <p className="text-2xl font-bold">1,245</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Clientes</p>
                          <p className="text-2xl font-bold">865</p>
                        </div>
                        <Users className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Proveedores</p>
                          <p className="text-2xl font-bold">380</p>
                        </div>
                        <Users className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Acciones masivas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline">Exportar lista de usuarios</Button>
                    <Button variant="outline">Enviar notificación masiva</Button>
                    <Button variant="outline">Generar reporte de actividad</Button>
                    <Button variant="outline" className="text-red-600">
                      Limpiar usuarios inactivos
                    </Button>
                  </div>
                </div>

                <Button>Aplicar configuración de usuarios</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminAjustes;
