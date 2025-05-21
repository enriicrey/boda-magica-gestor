
import React, { useState } from 'react';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Circle, Plus, Edit, Trash, Calendar, ChevronRight, Check, Tag, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

// Interfaces para tipos de datos
interface Task {
  id: number;
  title: string;
  description?: string;
  category: 'venue' | 'decor' | 'food' | 'attire' | 'guest' | 'music' | 'photo' | 'transport' | 'other';
  dueDate?: Date;
  status: 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
}

const Tasks = () => {
  // Datos simulados del usuario
  const userData = {
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    weddingDate: "15 de septiembre, 2025",
    avatarFallback: "MG"
  };
  
  // Progreso del perfil
  const progress = 38;
  
  // Estado para tareas
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Reservar el lugar de la ceremonia',
      description: 'Confirmar fecha y hora con la iglesia',
      category: 'venue',
      dueDate: new Date(2025, 2, 15),
      status: 'completed',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Contratar fotógrafo',
      description: 'Reunión para revisar portafolio y presupuesto',
      category: 'photo',
      dueDate: new Date(2025, 3, 1),
      status: 'completed',
      priority: 'high',
      assignedTo: 'Pedro'
    },
    {
      id: 3,
      title: 'Elegir flores para decoración',
      description: 'Definir centros de mesa y ramos',
      category: 'decor',
      dueDate: new Date(2025, 4, 10),
      status: 'pending',
      priority: 'medium',
      assignedTo: 'María'
    },
    {
      id: 4,
      title: 'Prueba de vestido',
      description: 'Primera prueba con accesorios',
      category: 'attire',
      dueDate: new Date(2025, 5, 15),
      status: 'pending',
      priority: 'high',
      assignedTo: 'María'
    },
    {
      id: 5,
      title: 'Finalizar lista de invitados',
      description: 'Confirmar números finales para el catering',
      category: 'guest',
      dueDate: new Date(2025, 5, 30),
      status: 'pending',
      priority: 'high'
    },
    {
      id: 6,
      title: 'Seleccionar menú',
      description: 'Degustación con el catering',
      category: 'food',
      dueDate: new Date(2025, 6, 15),
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 7,
      title: 'Contratar DJ',
      description: 'Revisar playlists y opciones',
      category: 'music',
      dueDate: new Date(2025, 6, 30),
      status: 'pending',
      priority: 'low'
    },
    {
      id: 8,
      title: 'Reservar transporte para invitados',
      description: 'Autobuses para el traslado iglesia-banquete',
      category: 'transport',
      dueDate: new Date(2025, 7, 15),
      status: 'pending',
      priority: 'medium',
      assignedTo: 'Pedro'
    }
  ]);
  
  // Estado para filtros
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Estado para el modal de edición/creación de tarea
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    category: 'other',
    dueDate: undefined,
    status: 'pending',
    priority: 'medium',
    assignedTo: ''
  });
  
  // Calcular estadísticas
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completionPercentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const highPriorityPendingTasks = tasks.filter(task => task.status === 'pending' && task.priority === 'high').length;
  
  // Funciones para manejar tareas
  const handleAddTask = () => {
    setSelectedTask(null);
    setNewTask({
      title: '',
      description: '',
      category: 'other',
      dueDate: undefined,
      status: 'pending',
      priority: 'medium',
      assignedTo: ''
    });
    setIsTaskModalOpen(true);
  };
  
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setNewTask({ ...task });
    setIsTaskModalOpen(true);
  };
  
  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.success("Tarea eliminada correctamente");
  };
  
  const handleSaveTask = () => {
    if (!newTask.title) {
      toast.error("Por favor introduce un título para la tarea");
      return;
    }
    
    if (selectedTask) {
      // Editar tarea existente
      setTasks(tasks.map(task => 
        task.id === selectedTask.id ? { ...task, ...newTask } as Task : task
      ));
      toast.success("Tarea actualizada correctamente");
    } else {
      // Crear nueva tarea
      const newTaskWithId = {
        ...newTask,
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1
      } as Task;
      setTasks([...tasks, newTaskWithId]);
      toast.success("Nueva tarea añadida correctamente");
    }
    
    setIsTaskModalOpen(false);
  };
  
  const handleToggleTaskStatus = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? 
      { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } : 
      task
    ));
    
    const taskStatus = tasks.find(t => t.id === taskId)?.status === 'pending' ? 'completada' : 'pendiente';
    toast.success(`Tarea marcada como ${taskStatus}`);
  };
  
  // Filtrar tareas según categoría activa y búsqueda
  const filteredTasks = tasks.filter(task => {
    const matchesCategory = activeCategory === 'all' || task.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  // Obtener el color de la categoría
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'venue': return 'bg-blue-100 text-blue-800';
      case 'decor': return 'bg-pink-100 text-pink-800';
      case 'food': return 'bg-orange-100 text-orange-800';
      case 'attire': return 'bg-purple-100 text-purple-800';
      case 'guest': return 'bg-green-100 text-green-800';
      case 'music': return 'bg-indigo-100 text-indigo-800';
      case 'photo': return 'bg-amber-100 text-amber-800';
      case 'transport': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Obtener el nombre de la categoría
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'venue': return 'Lugar';
      case 'decor': return 'Decoración';
      case 'food': return 'Catering';
      case 'attire': return 'Vestuario';
      case 'guest': return 'Invitados';
      case 'music': return 'Música';
      case 'photo': return 'Fotografía';
      case 'transport': return 'Transporte';
      default: return 'Otro';
    }
  };
  
  // Obtener el color de la prioridad
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Obtener el nombre de la prioridad
  const getPriorityName = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Media';
    }
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
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif font-semibold flex items-center">
                  <CheckCircle className="mr-2 text-wedding-sage" /> 
                  Tareas
                </h1>
                <Button className="bg-wedding-sage hover:bg-wedding-sage/90" onClick={handleAddTask}>
                  <Plus className="mr-1 h-4 w-4" /> Nueva Tarea
                </Button>
              </div>
              
              {/* Tarjetas de resumen */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-gray-500">Progreso General</p>
                      <div className="relative w-24 h-24 my-2">
                        <svg className="w-24 h-24" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e6e6e6"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#7CBC9D"
                            strokeWidth="3"
                            strokeDasharray={`${completionPercentage}, 100`}
                          />
                          <text x="18" y="20.35" textAnchor="middle" fill="#333" fontSize="10px" fontWeight="bold">
                            {`${completionPercentage}%`}
                          </text>
                        </svg>
                      </div>
                      <p className="font-medium text-sm mt-2">{completedTasks} de {tasks.length} completadas</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Pendientes</p>
                        <p className="text-3xl font-bold">{pendingTasks}</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Alta Prioridad</p>
                        <p className="text-3xl font-bold">{highPriorityPendingTasks}</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Lista de tareas */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Lista de Tareas</CardTitle>
                  </div>
                  <CardDescription>
                    Gestiona todas las tareas relacionadas con tu boda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-4">
                    <Input
                      className="max-w-xs"
                      placeholder="Buscar tarea..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="space-x-2 flex">
                      <Button
                        variant={activeCategory === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveCategory('all')}
                        className={activeCategory === 'all' ? 'bg-wedding-sage hover:bg-wedding-sage/90' : ''}
                      >
                        Todas
                      </Button>
                      <Button
                        variant={activeCategory === 'pending' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveCategory('pending')}
                        className={activeCategory === 'pending' ? 'bg-wedding-sage hover:bg-wedding-sage/90' : ''}
                      >
                        Pendientes
                      </Button>
                      <Button
                        variant={activeCategory === 'completed' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveCategory('completed')}
                        className={activeCategory === 'completed' ? 'bg-wedding-sage hover:bg-wedding-sage/90' : ''}
                      >
                        Completadas
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {filteredTasks
                      .sort((a, b) => {
                        // Primero ordenar por estado (pendientes primero)
                        if (a.status !== b.status) {
                          return a.status === 'pending' ? -1 : 1;
                        }
                        // Después por prioridad
                        const priorityOrder = { high: 0, medium: 1, low: 2 };
                        return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
                      })
                      .map((task) => (
                        <div 
                          key={task.id} 
                          className={`border rounded-lg p-4 ${task.status === 'completed' ? 'bg-gray-50' : ''}`}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 pt-1">
                              <Checkbox 
                                checked={task.status === 'completed'} 
                                id={`task-${task.id}`}
                                onCheckedChange={() => handleToggleTaskStatus(task.id)}
                                className="data-[state=checked]:bg-wedding-sage data-[state=checked]:border-wedding-sage"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <div className="flex justify-between items-start">
                                <h3 className={`font-medium text-gray-900 ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                                  {task.title}
                                </h3>
                                <div className="flex space-x-1">
                                  <Badge className={getCategoryColor(task.category)}>
                                    {getCategoryName(task.category)}
                                  </Badge>
                                  <Badge className={getPriorityColor(task.priority)}>
                                    {getPriorityName(task.priority)}
                                  </Badge>
                                </div>
                              </div>
                              {task.description && (
                                <p className={`text-sm text-gray-600 mt-1 ${task.status === 'completed' ? 'text-gray-400' : ''}`}>
                                  {task.description}
                                </p>
                              )}
                              <div className="mt-2 flex flex-wrap gap-4">
                                {task.dueDate && (
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <span>Fecha límite: {task.dueDate.toLocaleDateString('es-ES')}</span>
                                  </div>
                                )}
                                {task.assignedTo && (
                                  <div className="flex items-center text-sm text-gray-500">
                                    <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>Asignada a: {task.assignedTo}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <div className="flex space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleEditTask(task)} 
                                  className="h-8 w-8 p-0"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleDeleteTask(task.id)} 
                                  className="h-8 w-8 p-0 text-red-600"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    
                    {filteredTasks.length === 0 && (
                      <div className="text-center py-10 text-gray-500">
                        <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No se encontraron tareas.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Sugerencias de tareas */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Sugerencias</CardTitle>
                  <CardDescription>
                    Tareas que podrías considerar añadir a tu planificación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Reservar hotel para invitados</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Bloque de habitaciones con descuento para invitados de fuera
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Plus className="mr-1 h-4 w-4" /> Añadir
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Contratar maquillador/a</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Programar prueba de maquillaje y peinado
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Plus className="mr-1 h-4 w-4" /> Añadir
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Planificar luna de miel</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Investigar destinos y reservar vuelos
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Plus className="mr-1 h-4 w-4" /> Añadir
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="text-wedding-sage w-full">
                    Ver más sugerencias <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Modal para añadir/editar tarea */}
      <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedTask ? 'Editar tarea' : 'Añadir nueva tarea'}</DialogTitle>
            <DialogDescription>
              {selectedTask 
                ? 'Modifica los detalles de la tarea' 
                : 'Completa la información para crear una nueva tarea'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Título</Label>
              <Input
                id="task-title"
                placeholder="Título de la tarea"
                value={newTask.title || ''}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="task-description">Descripción</Label>
              <Input
                id="task-description"
                placeholder="Descripción (opcional)"
                value={newTask.description || ''}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task-category">Categoría</Label>
                <Select
                  value={newTask.category}
                  onValueChange={(value) => setNewTask({...newTask, category: value as any})}
                >
                  <SelectTrigger id="task-category">
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venue">Lugar</SelectItem>
                    <SelectItem value="decor">Decoración</SelectItem>
                    <SelectItem value="food">Catering</SelectItem>
                    <SelectItem value="attire">Vestuario</SelectItem>
                    <SelectItem value="guest">Invitados</SelectItem>
                    <SelectItem value="music">Música</SelectItem>
                    <SelectItem value="photo">Fotografía</SelectItem>
                    <SelectItem value="transport">Transporte</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="task-priority">Prioridad</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value) => setNewTask({...newTask, priority: value as any})}
                >
                  <SelectTrigger id="task-priority">
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="low">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task-due-date">Fecha límite</Label>
                <Input
                  id="task-due-date"
                  type="date"
                  value={newTask.dueDate ? newTask.dueDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setNewTask({
                    ...newTask, 
                    dueDate: e.target.value ? new Date(e.target.value) : undefined
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="task-assigned">Asignada a</Label>
                <Input
                  id="task-assigned"
                  placeholder="Nombre (opcional)"
                  value={newTask.assignedTo || ''}
                  onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTaskModalOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-wedding-sage hover:bg-wedding-sage/90" onClick={handleSaveTask}>
              {selectedTask ? 'Guardar cambios' : 'Añadir tarea'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;
