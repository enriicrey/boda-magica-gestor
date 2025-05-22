
import React from 'react';
import ClientSidebar from '../dashboard/ClientSidebar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-gray-50">
      <ClientSidebar 
        userName="Clara Cliente" 
        weddingDate="15 de Agosto, 2025" 
        progress={65} 
        avatarFallback="CC"
      />
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
};

export default ClientLayout;
