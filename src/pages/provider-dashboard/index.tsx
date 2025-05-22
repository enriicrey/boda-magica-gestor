
import React from 'react';
import ProviderLayout from '@/components/layouts/ProviderLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, Calendar, CreditCard, MessageSquare, Star, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProviderDashboard = () => {
  // Sample data for quick stats
  const stats = [
    {
      title: "Total de Ingresos",
      value: "€12,450",
      description: "↗️ +15% comparado con el mes pasado",
      icon: CreditCard,
      color: "text-green-500"
    },
    {
      title: "Clientes Activos",
      value: "24",
      description: "↗️ +3 clientes nuevos este mes",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Eventos Pendientes",
      value: "18",
      description: "Próximos 30 días",
      icon: Calendar,
      color: "text-amber-500"
    },
    {
      title: "Reseñas Positivas",
      value: "92%",
      description: "↗️ +5% comparado con el trimestre anterior",
      icon: Star,
      color: "text-purple-500"
    }
  ];

  // Sample data for upcoming events
  const upcomingEvents = [
    {
      client: "María García",
      event: "Boda",
      date: "15 Jun 2025",
      status: "confirmed"
    },
    {
      client: "Carlos Martínez",
      event: "Fiesta de cumpleaños",
      date: "22 Jun 2024",
      status: "pending"
    },
    {
      client: "Laura Sánchez",
      event: "Evento corporativo",
      date: "7 Jul 2024",
      status: "confirmed"
    }
  ];

  // Sample data for recent messages
  const recentMessages = [
    {
      sender: "Ana Rodríguez",
      message: "Necesito información sobre sus servicios de fotografía para bodas.",
      time: "Hace 2 horas",
      unread: true
    },
    {
      sender: "Pedro López",
      message: "Gracias por la cotización. ¿Podemos agendar una llamada?",
      time: "Ayer",
      unread: false
    },
    {
      sender: "Carmen Díaz",
      message: "Confirmo la reserva para el 15 de agosto. Gracias.",
      time: "Hace 2 días",
      unread: false
    }
  ];

  return (
    <ProviderLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Bienvenido de nuevo. Aquí tienes un resumen de tu actividad reciente.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`rounded-full p-2 ${stat.color} bg-gray-100`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Próximos Eventos</CardTitle>
              <CardDescription>Eventos programados para los próximos días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{event.client}</p>
                      <p className="text-xs text-gray-500">{event.event} • {event.date}</p>
                    </div>
                    <Badge
                      className={
                        event.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                      }
                    >
                      {event.status === 'confirmed' ? 'Confirmado' : 'Pendiente'}
                    </Badge>
                  </div>
                ))}
                <div className="pt-2">
                  <a
                    href="/provider-calendar"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Ver todos los eventos →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Mensajes Recientes</CardTitle>
              <CardDescription>Últimas comunicaciones con clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <p className="text-sm font-medium">{message.sender}</p>
                        {message.unread && (
                          <span className="ml-2 flex h-2 w-2 rounded-full bg-blue-600"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{message.message}</p>
                      <p className="text-xs text-gray-400">{message.time}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <a
                    href="/provider-messages"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Ver todos los mensajes →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Graph */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Actividad Reciente</CardTitle>
            <CardDescription>Resumen de actividad e ingresos del último mes</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <BarChart2 className="mx-auto h-16 w-16 text-gray-300" />
              <p className="mt-2 text-sm text-gray-500">
                Los gráficos de actividad estarán disponibles próximamente
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProviderLayout>
  );
};

export default ProviderDashboard;
