
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, MessageSquare, Users, Settings, 
  CreditCard, BarChart2, FileText, Bell, Star, Mail
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

const ProviderSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: BarChart2, label: 'Dashboard', path: '/provider-dashboard' },
    { icon: Calendar, label: 'Calendario', path: '/provider-calendar' },
    { icon: Users, label: 'Clientes', path: '/provider-clients' },
    { icon: FileText, label: 'Servicios', path: '/provider-services' },
    { icon: CreditCard, label: 'Finanzas', path: '/provider-finances' },
    { icon: MessageSquare, label: 'Mensajes', path: '/provider-messages' },
    { icon: Star, label: 'Reseñas', path: '/provider-reviews' },
    { icon: Bell, label: 'Notificaciones', path: '/provider-notifications' },
    { icon: Mail, label: 'Invitaciones', path: '/provider-invitations' },
    { icon: BarChart2, label: 'Analítica', path: '/provider-analytics' },
    { icon: Settings, label: 'Ajustes', path: '/provider-settings' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center space-x-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="Provider" />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">Diana Proveedor</h3>
              <p className="text-xs text-gray-500">Organizadora Profesional</p>
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menú principal</SidebarGroupLabel>
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
                Salir
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

export default ProviderSidebar;
