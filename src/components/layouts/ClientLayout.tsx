
import React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import ClientSidebar from '../dashboard/ClientSidebar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <ClientSidebar />
        <SidebarInset className="bg-background transition-all duration-300">
          <main className="flex-1 p-6 overflow-auto w-full">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ClientLayout;
