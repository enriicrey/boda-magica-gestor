
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Home, Calendar, Heart, Package, FileText, User, Bell, Settings } from 'lucide-react';

interface ClientSidebarProps {
  userName: string;
  userAvatar?: string;
  weddingDate: string;
  progress: number;
  avatarFallback: string;
}

const ClientSidebar = ({ 
  userName, 
  userAvatar, 
  weddingDate, 
  progress,
  avatarFallback
}: ClientSidebarProps) => {
  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 sticky top-20">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="h-14 w-14">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-serif font-semibold text-lg">{userName}</h2>
            <p className="text-gray-500 text-sm">Boda: {weddingDate}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Progreso de planificación</p>
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-xs text-right text-gray-500">{progress}% completado</p>
        </div>
        
        <nav className="space-y-1">
          <Link to="/client-dashboard" className="flex items-center space-x-3 px-3 py-2 bg-wedding-sage/20 text-wedding-sage rounded-md">
            <Home size={18} />
            <span>Panel Principal</span>
          </Link>
          <Link to="/calendar" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <Calendar size={18} />
            <span>Calendario</span>
          </Link>
          <Link to="/favorites" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <Heart size={18} />
            <span>Favoritos</span>
          </Link>
          <Link to="/services" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <Package size={18} />
            <span>Mis Servicios</span>
          </Link>
          <Link to="/budget" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <FileText size={18} />
            <span>Presupuesto</span>
          </Link>
          <Link to="/guests" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <User size={18} />
            <span>Invitados</span>
          </Link>
          <Link to="/notifications" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <Bell size={18} />
            <span>Notificaciones</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            <Settings size={18} />
            <span>Ajustes</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default ClientSidebar;
