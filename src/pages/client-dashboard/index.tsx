
import React from 'react';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, Heart, CreditCard, Users, CheckCircle, Clock } from 'lucide-react';

const ClientDashboard = () => {
  const tasks = [
    { id: 1, title: 'Confirmar menú con catering', completed: true, date: '2024-06-20' },
    { id: 2, title: 'Revisar propuesta de decoración', completed: false, date: '2024-06-25' },
    { id: 3, title: 'Seleccionar canciones', completed: false, date: '2024-07-05' },
    { id: 4, title: 'Prueba de vestido', completed: false, date: '2024-07-10' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Degustación menú', date: '2024-06-25', time: '12:00' },
    { id: 2, title: 'Prueba de vestido', date: '2024-07-10', time: '10:00' },
    { id: 3, title: 'Reunión con decorador', date: '2024-07-15', time: '16:00' }
  ];

  const services = [
    { id: 1, name: 'Villa Rosa', type: 'Lugar', status: 'Confirmado', amount: '€8,500' },
    { id: 2, name: 'Carlos Fotografía', type: 'Fotografía', status: 'Confirmado', amount: '€1,800' },
    { id: 3, name: 'Catering Deluxe', type: 'Catering', status: 'Pendiente', amount: '€4,200' }
  ];

  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);

  return (
    <ClientLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Mi Boda</h1>
          <p className="text-gray-500">
            Bienvenida de vuelta, Clara. Tu boda es el 15 de agosto de 2025.
          </p>
        </div>

        {/* Progress Card */}
        <Card className="bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">Faltan 387 días para tu boda</h2>
                <p className="text-gray-600 mt-1">15 de agosto de 2025</p>
                <Progress value={progress} className="h-3 mt-4" />
                <p className="text-sm text-gray-500 mt-2">{progress}% de tareas completadas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{progress}%</div>
                <div className="text-sm text-gray-500">Progreso</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Presupuesto</p>
                  <p className="text-xl font-bold">€18,500</p>
                  <p className="text-xs text-green-600">77% utilizado</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Invitados</p>
                  <p className="text-xl font-bold">86/120</p>
                  <p className="text-xs text-blue-600">72% confirmados</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Servicios</p>
                  <p className="text-xl font-bold">3/8</p>
                  <p className="text-xs text-purple-600">Contratados</p>
                </div>
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Próximos eventos</p>
                  <p className="text-xl font-bold">3</p>
                  <p className="text-xs text-orange-600">Esta semana</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Tareas pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <div>
                        <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-500">{task.date}</p>
                      </div>
                    </div>
                    {!task.completed && (
                      <Button size="sm" variant="outline">Completar</Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Próximos eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.date} a las {event.time}</p>
                    </div>
                    <Button size="sm" variant="outline">Ver</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle>Mis servicios contratados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Servicio</th>
                    <th className="text-left p-2">Tipo</th>
                    <th className="text-left p-2">Estado</th>
                    <th className="text-left p-2">Precio</th>
                    <th className="text-left p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-b">
                      <td className="p-2 font-medium">{service.name}</td>
                      <td className="p-2">{service.type}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          service.status === 'Confirmado' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {service.status}
                        </span>
                      </td>
                      <td className="p-2 font-semibold">{service.amount}</td>
                      <td className="p-2">
                        <Button size="sm" variant="outline">Ver detalles</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
};

export default ClientDashboard;
