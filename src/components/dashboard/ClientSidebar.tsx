
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

const ClientSidebar = () => {
  const location = useLocation();
  
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

  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="Cliente" />
              <AvatarFallback>CC</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">Clara Cliente</h3>
              <p className="text-xs text-gray-500">Mi Boda</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs text-gray-500 mb-1">Progreso de planificación</div>
            <Progress value={65} className="h-2" />
            <div className="text-xs text-gray-500 mt-1">65% completado</div>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Mi Boda</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive(item.path)}
                      tooltip={item.label}
                    >
                      <Link to={item.path}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter>
          <div className="p-4">
            <Button variant="outline" className="w-full">
              <Link to="/" className="w-full">
                Cerrar Sesión
              </Link>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="hidden md:block">
        <SidebarTrigger />
      </div>
    </>
  );
};

export default ClientSidebar;
