
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientLayout from '@/components/layouts/ClientLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar, Heart, CreditCard, Users, CheckCircle, Clock, Plus, StickyNote } from 'lucide-react';
import { useClient } from '@/contexts/ClientContext';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { tasks, events, completeTask, addTask } = useClient();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [taskNotes, setTaskNotes] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const services = [
    { id: 1, name: 'Villa Rosa', type: 'Lugar', status: 'Confirmado', amount: '€8,500' },
    { id: 2, name: 'Carlos Fotografía', type: 'Fotografía', status: 'Confirmado', amount: '€1,800' },
    { id: 3, name: 'Catering Deluxe', type: 'Catering', status: 'Pendiente', amount: '€4,200' }
  ];

  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId, taskNotes);
    setTaskNotes('');
    setSelectedTaskId(null);
  };

  const handleAddTask = () => {
    if (newTaskTitle && newTaskDate) {
      addTask(newTaskTitle, newTaskDate, 'personal');
      setNewTaskTitle('');
      setNewTaskDate('');
    }
  };

  const handleViewEvent = (eventDate: string) => {
    navigate(`/client-calendar?date=${eventDate}`);
  };

  const handleViewServiceDetails = (serviceId: number) => {
    navigate(`/vendors/${serviceId}`);
  };

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
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/client-presupuesto')}>
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

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/client-invitados')}>
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

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/client-mis-servicios')}>
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

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/client-calendar')}>
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
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Tareas pendientes
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Nueva tarea
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Crear nueva tarea</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="taskTitle">Título</Label>
                        <Input
                          id="taskTitle"
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          placeholder="Describe la tarea..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="taskDate">Fecha límite</Label>
                        <Input
                          id="taskDate"
                          type="date"
                          value={newTaskDate}
                          onChange={(e) => setNewTaskDate(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleAddTask} className="w-full">
                        Crear tarea
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        task.completed ? 'bg-green-500' : 'bg-gray-300'
                      } ${task.type === 'personal' ? 'border-2 border-blue-500' : ''}`}>
                        {task.completed && <CheckCircle className="h-3 w-3 text-white" />}
                      </div>
                      <div>
                        <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-500">{task.date}</p>
                        {task.notes && (
                          <p className="text-xs text-blue-600 mt-1">📝 {task.notes}</p>
                        )}
                      </div>
                    </div>
                    {!task.completed && (
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedTaskId(task.id)}>
                              <StickyNote className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Añadir notas</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Textarea
                                value={taskNotes}
                                onChange={(e) => setTaskNotes(e.target.value)}
                                placeholder="Añade notas sobre esta tarea..."
                              />
                              <Button onClick={() => selectedTaskId && handleCompleteTask(selectedTaskId)} className="w-full">
                                Completar con notas
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline" onClick={() => handleCompleteTask(task.id)}>
                          Completar
                        </Button>
                      </div>
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
                {events.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.date} {event.time && `a las ${event.time}`}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleViewEvent(event.date)}>
                      Ver
                    </Button>
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
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewServiceDetails(service.id)}
                        >
                          Ver detalles
                        </Button>
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
