
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Calendar, Heart, Package, FileText, 
  Users, Bell, Settings, MessageSquare, CreditCard
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useClient } from '@/contexts/ClientContext';

const ClientSidebar = () => {
  const location = useLocation();
  const { profile, tasks } = useClient();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/client-dashboard' },
    { icon: Calendar, label: 'Calendario', path: '/client-calendar' },
    { icon: Package, label: 'Mis Servicios', path: '/client-mis-servicios' },
    { icon: MessageSquare, label: 'Mensajes', path: '/client-mensajes' },
    { icon: CreditCard, label: 'Presupuesto', path: '/client-presupuesto' },
    { icon: Users, label: 'Invitados', path: '/client-invitados' },
    { icon: Bell, label: 'Notificaciones', path: '/client-notificaciones' },
    { icon: Settings, label: 'Ajustes', path: '/client-ajustes' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);

  return (
    <>
      <Sidebar className="border-r border-pink-100">
        <SidebarHeader className="p-4 bg-gradient-to-r from-pink-50 to-rose-50">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-pink-200">
              <AvatarImage src="/placeholder.svg" alt={profile.name} />
              <AvatarFallback className="bg-pink-100 text-pink-700 font-semibold">
                {profile.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm text-gray-900">{profile.name}</h3>
              <p className="text-xs text-pink-600 font-medium">Mi Boda</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs text-gray-600 mb-2 font-medium">Progreso de planificación</div>
            <Progress value={progress} className="h-3 bg-pink-100" />
            <div className="text-xs text-gray-600 mt-2 font-medium">{progress}% completado</div>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="bg-white">
          <SidebarGroup>
            <SidebarGroupLabel className="text-pink-700 font-semibold">Mi Boda</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.path)}
                      tooltip={item.label}
                      className="hover:bg-pink-50 hover:text-pink-700 data-[active=true]:bg-pink-100 data-[active=true]:text-pink-700 transition-colors"
                    >
                      <Link to={item.path}>
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="p-4 bg-gray-50">
          <Button variant="outline" className="w-full border-pink-200 text-pink-700 hover:bg-pink-50">
            <Link to="/" className="w-full">
              Cerrar Sesión
            </Link>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <div className="hidden md:block">
        <SidebarTrigger className="text-pink-600 hover:text-pink-700" />
      </div>
    </>
  );
};

export default ClientSidebar;
