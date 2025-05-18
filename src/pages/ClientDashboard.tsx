
import React from 'react';
import Footer from '@/components/Footer';
import ClientSidebar from '@/components/dashboard/ClientSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeCard from '@/components/dashboard/WelcomeCard';
import RecommendedServices from '@/components/dashboard/RecommendedServices';
import UpcomingPayments from '@/components/dashboard/UpcomingPayments';

const ClientDashboard = () => {
  // Calculate days until wedding
  const weddingDate = new Date(2025, 8, 15); // September 15, 2025
  const today = new Date();
  const timeUntilWedding = weddingDate.getTime() - today.getTime();
  const daysUntilWedding = Math.ceil(timeUntilWedding / (1000 * 60 * 60 * 24));
  
  // User data
  const userData = {
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    weddingDate: "15 de septiembre, 2025",
    avatarFallback: "MG"
  };
  
  // Tasks data
  const tasks = [
    { title: 'Reservar lugar para la ceremonia', completed: true },
    { title: 'Elegir el catering', completed: true },
    { title: 'Contratar fotógrafo', completed: true },
    { title: 'Enviar invitaciones', completed: false },
    { title: 'Elegir música para la ceremonia', completed: false },
    { title: 'Planificar luna de miel', completed: false },
    { title: 'Elegir anillos', completed: false },
    { title: 'Confirmar lista de invitados', completed: false },
  ];
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  // Upcoming events data
  const upcomingEvents = [
    {
      title: 'Degustación de Menú',
      date: '15 de junio, 2025',
      time: '12:00 PM',
      location: 'Catering El Jardín',
      address: 'Calle Serrano 45, Madrid',
    },
    {
      title: 'Prueba de Vestido',
      date: '22 de junio, 2025',
      time: '10:00 AM',
      location: 'Boutique Eleganza',
      address: 'Gran Vía 28, Madrid',
    },
    {
      title: 'Visita a Villa Rosa',
      date: '5 de julio, 2025',
      time: '16:30 PM', 
      location: 'Villa Rosa',
      address: 'Carretera de El Escorial km 5, Madrid',
    }
  ];

  // Recommended services data
  const recommendedServices = [
    {
      id: '1',
      title: 'Decoración Floral Elegante',
      provider: 'Flores Mágicas',
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '€800',
      priceUnit: 'paquete',
      category: 'Decoración',
      isPopular: true,
    },
    {
      id: '2',
      title: 'DJ y Animación',
      provider: 'Melodía Events',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '€1,200',
      priceUnit: 'evento',
      category: 'Música',
      availableDate: '15/09/2025',
    },
    {
      id: '3',
      title: 'Fotografía Premium',
      provider: 'Carlos Jiménez',
      image: 'https://images.unsplash.com/photo-1553101872-64e48bfbf309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '€1,800',
      priceUnit: 'sesión',
      category: 'Fotografía',
      availableDate: '15/09/2025',
      isPopular: true,
    },
  ];

  // Upcoming payments data
  const upcomingPayments = [
    {
      id: '1',
      title: 'Villa Rosa - Segundo Pago',
      dueDate: '1 de julio, 2025',
      amount: '€3,000',
      icon: 'home'
    },
    {
      id: '2',
      title: 'Carlos Jiménez Fotografía',
      dueDate: '15 de julio, 2025',
      amount: '€800',
      icon: 'camera'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Use the new header component */}
      <DashboardHeader />
      
      <main className="flex-grow pt-8 pb-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Use the sidebar component */}
            <ClientSidebar 
              userName={userData.name}
              userAvatar={userData.avatar}
              weddingDate={userData.weddingDate}
              progress={progress}
              avatarFallback={userData.avatarFallback}
            />
            
            {/* Main Content */}
            <div className="lg:w-3/4 space-y-6">
              {/* Welcome card with events and tasks */}
              <WelcomeCard 
                userName={userData.name}
                daysUntilWedding={daysUntilWedding}
                upcomingEvents={upcomingEvents}
                tasks={tasks}
              />
              
              {/* Recommended services section */}
              <RecommendedServices services={recommendedServices} />
              
              {/* Upcoming payments section */}
              <UpcomingPayments payments={upcomingPayments} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClientDashboard;
