
import React from 'react';
import { toast } from "sonner";
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Check, Plus, Calendar, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Tasks = () => {
  // Mock user data
  const userData = {
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    weddingDate: "15 de septiembre, 2025",
    avatarFallback: "MG"
  };
  
  // Calculate progress
  const progress = 38;
  
  // Mock task data
  const tasks = [
    { 
      id: "1", 
      title: "Reservar lugar para la ceremonia", 
      completed: true, 
      dueDate: "15/02/2025",
      category: "Venue",
      priority: "alta",
      notes: "Recordar preguntar por disponibilidad y capacidad"
    },
    { 
      id: "2", 
      title: "Elegir el catering", 
      completed: true, 
      dueDate: "01/03/2025",
      category: "Catering",
      priority: "alta",
      notes: "Considerar opciones vegetarianas"
    },
    { 
      id: "3", 
      title: "Contratar fotógrafo", 
      completed: true, 
      dueDate: "15/03/2025",
      category: "Fotografía",
      priority: "alta",
      notes: ""
    },
    { 
      id: "4", 
      title: "Enviar invitaciones", 
      completed: false, 
      dueDate: "01/06/2025",
      category: "Invitaciones",
      priority: "media",
      notes: "Confirmar lista final antes de enviar"
    },
    { 
      id: "5", 
      title: "Elegir música para la ceremonia", 
      completed: false, 
      dueDate: "15/06/2025",
      category: "Música",
      priority: "baja",
      notes: ""
    },
    { 
      id: "6", 
      title: "Planificar luna de miel", 
      completed: false, 
      dueDate: "01/07/2025",
      category: "Luna de miel",
      priority: "media",
      notes: "Revisar opciones en Italia y Grecia"
    },
    { 
      id: "7", 
      title: "Elegir anillos", 
      completed: false, 
      dueDate: "15/07/2025",
      category: "Accesorios",
      priority: "alta",
      notes: ""
    },
    { 
      id: "8", 
      title: "Confirmar lista de invitados", 
      completed: false, 
      dueDate: "01/08/2025",
      category: "Invitados",
      priority: "alta",
      notes: "Finalizar después de recibir todas las confirmaciones"
    },
  ];
  
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  const taskProgress = Math.round((completedTasks.length / tasks.length) * 100);

  const [isChecked, setIsChecked] = React.useState<{[key: string]: boolean}>(() => {
    const initialState: {[key: string]: boolean} = {};
    tasks.forEach(task => {
      initialState[task.id] = task.completed;
    });
    return initialState;
  });

  const handleAddTask = () => {
    toast.success("Añadir nueva tarea");
  };

  const handleToggleTask = (id: string) => {
    setIsChecked(prev => {
      const newState = { ...prev, [id]: !prev[id] };
      
      // Find the task to show the correct message
      const task = tasks.find(t => t.id === id);
      if (task) {
        if (newState[id]) {
          toast.success(`Tarea completada: ${task.title}`);
        } else {
          toast(`Tarea marcada como pendiente: ${task.title}`);
        }
      }
      
      return newState;
    });
  };

  const handleEditTask = (id: string) => {
    toast.success("Editar tarea");
  };

  const handleDeleteTask = (id: string) => {
    toast.success("Eliminar tarea");
  };

  const getPriorityClass = (priority: string) => {
    switch(priority) {
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'media':
        return 'bg-yellow-100 text-yellow-800';
      case 'baja':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="font-serif text-2xl font-semibold flex items-center">
                    <Check className="text-wedding-sage mr-2 h-5 w-5" />
                    Mis Tareas
                  </CardTitle>
                  <Button 
                    onClick={handleAddTask} 
                    className="bg-wedding-sage hover:bg-wedding-sage/90 text-white"
                  >
                    <Plus className="mr-1 h-4 w-4" /> Añadir Tarea
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progreso</span>
                      <span>{taskProgress}% completado</span>
                    </div>
                    <Progress value={taskProgress} className="h-2" />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-lg mb-3">Tareas Pendientes</h3>
                      <div className="space-y-2">
                        {pendingTasks.map((task) => (
                          <div key={task.id} className="flex items-start p-3 border rounded-md hover:bg-gray-50">
                            <div 
                              className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 cursor-pointer ${isChecked[task.id] ? 'bg-wedding-sage border-wedding-sage' : 'border-gray-300'}`}
                              onClick={() => handleToggleTask(task.id)}
                            >
                              {isChecked[task.id] && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className={isChecked[task.id] ? 'line-through text-gray-500' : ''}>
                                  {task.title}
                                </span>
                                <div className="flex space-x-1">
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityClass(task.priority)}`}>
                                    {task.priority}
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-between mt-1">
                                <div className="flex items-center text-xs text-gray-500">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>Fecha límite: {task.dueDate}</span>
                                </div>
                                <div className="flex space-x-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 w-6 p-0"
                                    onClick={() => handleEditTask(task.id)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 w-6 p-0 text-red-500"
                                    onClick={() => handleDeleteTask(task.id)}
                                  >
                                    <Trash className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              {task.notes && (
                                <p className="text-xs text-gray-500 mt-1">{task.notes}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg mb-3">Tareas Completadas</h3>
                      <div className="space-y-2">
                        {completedTasks.map((task) => (
                          <div key={task.id} className="flex items-start p-3 border rounded-md bg-gray-50">
                            <div 
                              className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 cursor-pointer ${isChecked[task.id] ? 'bg-wedding-sage border-wedding-sage' : 'border-gray-300'}`}
                              onClick={() => handleToggleTask(task.id)}
                            >
                              {isChecked[task.id] && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className="line-through text-gray-500">
                                  {task.title}
                                </span>
                                <div className="flex space-x-1">
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityClass(task.priority)}`}>
                                    {task.priority}
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-between mt-1">
                                <div className="flex items-center text-xs text-gray-500">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>Completada</span>
                                </div>
                                <div className="flex space-x-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 w-6 p-0"
                                    onClick={() => handleEditTask(task.id)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 w-6 p-0 text-red-500"
                                    onClick={() => handleDeleteTask(task.id)}
                                  >
                                    <Trash className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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

export default Tasks;
