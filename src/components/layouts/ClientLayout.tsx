
import React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import ClientSidebar from '../dashboard/ClientSidebar';
import { ClientProvider } from '@/contexts/ClientContext';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <ClientProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <ClientSidebar />
          <SidebarInset className="bg-background">
            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ClientProvider>
  );
};

export default ClientLayout;
