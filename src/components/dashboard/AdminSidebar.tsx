
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart2, Users, Settings, 
  Package, FileText, Bell, MessageSquare, Calendar, Mail
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

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: BarChart2, label: 'Dashboard', path: '/admin-dashboard' },
    { icon: Users, label: 'Clientes', path: '/admin-clientes' },
    { icon: Users, label: 'Proveedores', path: '/admin-proveedores' },
    { icon: Package, label: 'Servicios', path: '/admin-servicios' },
    { icon: Calendar, label: 'Eventos', path: '/admin-eventos' },
    { icon: MessageSquare, label: 'Mensajes', path: '/admin-mensajes' },
    { icon: Bell, label: 'Notificaciones', path: '/admin-notificaciones' },
    { icon: BarChart2, label: 'Analíticas', path: '/admin-analiticas' },
    { icon: Settings, label: 'Ajustes', path: '/admin-ajustes' },
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
              <AvatarImage src="/placeholder.svg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">Admin Panel</h3>
              <p className="text-xs text-gray-500">Administrador del sistema</p>
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

export default AdminSidebar;
