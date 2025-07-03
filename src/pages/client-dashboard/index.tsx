
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
import { Calendar, Heart, CreditCard, Users, CheckCircle, Clock, Plus, StickyNote, Eye } from 'lucide-react';
import { useClient } from '@/contexts/ClientContext';
import { useToast } from '@/hooks/use-toast';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tasks, events, completeTask, addTask } = useClient();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [taskNotes, setTaskNotes] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const services = [
    { id: 1, name: 'Villa Rosa', type: 'Lugar', status: 'Confirmado', amount: '€8,500' },
    { id: 2, name: 'Carlos Fotografía', type: 'Fotografía', status: 'Confirmado', amount: '€1,800' },
    { id: 3, name: 'Catering Deluxe', type: 'Catering', status: 'Pendiente', amount: '€4,200' }
  ];

  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);

  const handleCompleteTask = (taskId: string, withNotes = false) => {
    completeTask(taskId, withNotes ? taskNotes : undefined);
    if (withNotes) {
      setTaskNotes('');
      setSelectedTaskId(null);
      setIsNotesOpen(false);
    }
    toast({
      title: "Tarea completada",
      description: "La tarea se ha marcado como completada exitosamente."
    });
  };

  const handleAddTask = () => {
    if (newTaskTitle && newTaskDate) {
      addTask(newTaskTitle, newTaskDate, 'personal');
      setNewTaskTitle('');
      setNewTaskDate('');
      setIsAddTaskOpen(false);
      toast({
        title: "Tarea creada",
        description: "La nueva tarea se ha añadido a tu lista."
      });
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
      <div className="flex flex-col space-y-8 bg-gradient-to-br from-pink-50/30 to-rose-50/20 min-h-full p-6 rounded-lg">
        <div className="flex flex-col space-y-3">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Mi Boda
          </h1>
          <p className="text-gray-600 text-lg">
            Bienvenida de vuelta, Clara. Tu día especial es el 15 de agosto de 2025.
          </p>
        </div>

        {/* Progress Card */}
        <Card className="bg-gradient-to-r from-pink-100 to-rose-100 border-pink-200 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Faltan 387 días para tu boda</h2>
                <p className="text-gray-700 text-lg mb-6">15 de agosto de 2025</p>
                <Progress value={progress} className="h-4 bg-white/50" />
                <p className="text-sm text-gray-600 mt-3 font-medium">{progress}% de tareas completadas ({completedTasks}/{tasks.length})</p>
              </div>
              <div className="text-center bg-white/30 rounded-xl p-6">
                <div className="text-4xl font-bold text-pink-600 mb-1">{progress}%</div>
                <div className="text-sm text-gray-600 font-medium">Progreso</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards - Clickable */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200" 
            onClick={() => navigate('/client-presupuesto')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Presupuesto</p>
                  <p className="text-2xl font-bold text-green-700">€18,500</p>
                  <p className="text-xs text-green-600 font-medium">77% utilizado</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200" 
            onClick={() => navigate('/client-invitados')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Invitados</p>
                  <p className="text-2xl font-bold text-blue-700">86/120</p>
                  <p className="text-xs text-blue-600 font-medium">72% confirmados</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200" 
            onClick={() => navigate('/client-mis-servicios')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Servicios</p>
                  <p className="text-2xl font-bold text-purple-700">3/8</p>
                  <p className="text-xs text-purple-600 font-medium">Contratados</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200" 
            onClick={() => navigate('/client-calendar')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Próximos eventos</p>
                  <p className="text-2xl font-bold text-orange-700">3</p>
                  <p className="text-xs text-orange-600 font-medium">Esta semana</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tasks - Fully functional */}
          <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  Tareas pendientes
                </CardTitle>
                <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Nueva tarea
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Crear nueva tarea</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="taskTitle">Título de la tarea</Label>
                        <Input
                          id="taskTitle"
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          placeholder="Describe la tarea..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="taskDate">Fecha límite</Label>
                        <Input
                          id="taskDate"
                          type="date"
                          value={newTaskDate}
                          onChange={(e) => setNewTaskDate(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <Button onClick={handleAddTask} className="w-full bg-pink-600 hover:bg-pink-700">
                        Crear tarea
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border">
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                          task.completed 
                            ? 'bg-green-500' 
                            : task.type === 'personal' 
                              ? 'bg-blue-100 border-2 border-blue-400' 
                              : 'bg-purple-100 border-2 border-purple-400'
                        }`}>
                          {task.completed && <CheckCircle className="h-4 w-4 text-white" />}
                        </div>
                        <div>
                          <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </p>
                          <p className="text-sm text-gray-500">{new Date(task.date).toLocaleDateString()}</p>
                          {task.notes && (
                            <p className="text-sm text-blue-600 mt-1 bg-blue-50 px-2 py-1 rounded">
                              📝 {task.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      {!task.completed && (
                        <div className="flex gap-2">
                          <Dialog open={isNotesOpen && selectedTaskId === task.id} onOpenChange={(open) => {
                            setIsNotesOpen(open);
                            if (open) setSelectedTaskId(task.id);
                          }}>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="hover:bg-blue-50">
                                <StickyNote className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Añadir notas y completar</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Textarea
                                  value={taskNotes}
                                  onChange={(e) => setTaskNotes(e.target.value)}
                                  placeholder="Añade notas sobre esta tarea..."
                                  className="min-h-[100px]"
                                />
                                <Button onClick={() => handleCompleteTask(task.id, true)} className="w-full bg-green-600 hover:bg-green-700">
                                  Completar con notas
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            size="sm" 
                            onClick={() => handleCompleteTask(task.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Completar
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No tienes tareas pendientes</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events - Functional */}
          <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                Próximos eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <div>
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString()} 
                        {event.time && ` a las ${event.time}`}
                      </p>
                      {event.location && (
                        <p className="text-xs text-blue-600 mt-1">{event.location}</p>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleViewEvent(event.date)}
                      className="border-blue-200 hover:bg-blue-100"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services - Functional */}
        <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Mis servicios contratados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-semibold text-gray-700">Servicio</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Tipo</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Estado</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Precio</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="p-4 font-medium text-gray-900">{service.name}</td>
                      <td className="p-4 text-gray-600">{service.type}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          service.status === 'Confirmado' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {service.status}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-gray-900">{service.amount}</td>
                      <td className="p-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewServiceDetails(service.id)}
                          className="hover:bg-pink-50 border-pink-200"
                        >
                          <Eye className="h-4 w-4 mr-1" />
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
