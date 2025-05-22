
import React from 'react';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Package, FileText, Users, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const ClientDashboard = () => {
  const upcomingTasks = [
    { id: 1, name: 'Confirmar menú con catering', dueDate: '2024-06-20', status: 'Pendiente' },
    { id: 2, name: 'Revisar propuesta de decoración', dueDate: '2024-06-25', status: 'Pendiente' },
    { id: 3, name: 'Seleccionar canciones para la ceremonia', dueDate: '2024-07-05', status: 'Pendiente' }
  ];

  const bookedServices = [
    { id: 1, name: 'Fotografía', provider: 'Carlos Fotografía', date: '2025-08-15', status: 'Confirmado' },
    { id: 2, name: 'Catering', provider: 'Delicias Gourmet', date: '2025-08-15', status: 'Pendiente de pago' }
  ];

  return (
    <ClientLayout>
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold">Panel principal</h1>
        
        <Card className="bg-wedding-sage/10 border-none">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-semibold">Faltan 387 días para tu boda</h2>
                <p className="text-gray-600 mt-1">15 de agosto de 2025</p>
                <Progress value={65} className="h-2 mt-3 w-full max-w-md" />
              </div>
              <Button className="bg-wedding-sage text-white hover:bg-wedding-sage/90">
                Ver lista de tareas
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-wedding-sage" />
                Próximas tareas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {upcomingTasks.map(task => (
                  <li key={task.id} className="py-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{task.name}</h4>
                        <p className="text-sm text-gray-500">Para el {new Date(task.dueDate).toLocaleDateString()}</p>
                      </div>
                      <Button variant="outline" size="sm">Completar</Button>
                    </div>
                  </li>
                ))}
              </ul>
              <Button variant="link" className="w-full mt-2 text-wedding-sage">
                Ver todas las tareas
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-wedding-sage" />
                Servicios contratados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {bookedServices.map(service => (
                  <li key={service.id} className="py-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-gray-500">{service.provider}</p>
                      </div>
                      <span className={service.status === 'Confirmado' ? 'text-green-500 text-sm' : 'text-amber-500 text-sm'}>
                        {service.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <Button variant="link" className="w-full mt-2 text-wedding-sage">
                Ver todos los servicios
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="h-4 w-4 text-wedding-sage" />
                Presupuesto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">€15,500 <span className="text-sm font-normal text-gray-500">/ €20,000</span></p>
              <Progress value={77.5} className="h-2 mt-2" />
              <p className="text-xs text-right mt-1 text-gray-500">77.5% utilizado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4 text-wedding-sage" />
                Invitados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">86 <span className="text-sm font-normal text-gray-500">/ 120</span></p>
              <Progress value={71.6} className="h-2 mt-2" />
              <p className="text-xs text-right mt-1 text-gray-500">71.6% confirmados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Bell className="h-4 w-4 text-wedding-sage" />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">3</p>
              <div className="mt-2 text-sm">
                <p className="truncate">Nuevo mensaje de tu fotógrafo</p>
                <p className="truncate text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientDashboard;
