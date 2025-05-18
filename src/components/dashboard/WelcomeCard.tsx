
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Check } from 'lucide-react';

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
}

interface Task {
  title: string;
  completed: boolean;
}

interface WelcomeCardProps {
  userName: string;
  daysUntilWedding: number;
  upcomingEvents: Event[];
  tasks: Task[];
}

const WelcomeCard = ({ userName, daysUntilWedding, upcomingEvents, tasks }: WelcomeCardProps) => {
  return (
    <Card className="border-wedding-sage/10">
      <CardHeader className="bg-wedding-sage/5">
        <div className="flex justify-between items-center">
          <CardTitle className="font-serif text-2xl text-wedding-sage">
            ¡Hola, {userName}!
          </CardTitle>
          <div className="bg-wedding-sage text-white px-4 py-2 rounded-md flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="font-medium">{daysUntilWedding} días</span>
            <span className="ml-2 opacity-80 text-sm">para tu boda</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-gray-600 mb-6">Continúa trabajando en los preparativos para tu gran día. Aquí tienes un resumen de tus próximos eventos y tareas.</p>
        
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="events">Próximos Eventos</TabsTrigger>
            <TabsTrigger value="tasks">Tareas Pendientes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events">
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex border rounded-md p-4 hover:bg-gray-50">
                  <div className="mr-4 bg-wedding-blush/20 h-14 w-14 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-wedding-sage" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{event.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{event.location} ({event.address})</span>
                    </div>
                  </div>
                </div>
              ))}
              <Link to="/calendar">
                <Button variant="outline" className="w-full mt-2">Ver Todos los Eventos</Button>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="tasks">
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <div key={index} className={`flex items-center p-3 rounded-md ${task.completed ? 'bg-gray-50' : 'bg-white'}`}>
                  <div className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${task.completed ? 'bg-wedding-sage border-wedding-sage' : 'border-gray-300'}`}>
                    {task.completed && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className={task.completed ? 'line-through text-gray-500' : ''}>
                    {task.title}
                  </span>
                </div>
              ))}
              <Link to="/tasks">
                <Button variant="outline" className="w-full mt-4">Administrar Tareas</Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
