
import React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import ClientSidebar from '../dashboard/ClientSidebar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <ClientSidebar />
          <SidebarInset className="bg-transparent transition-all duration-300 ease-in-out">
            <main className="flex-1 overflow-auto w-full">
              <div className="p-6 h-full">
                {children}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ClientLayout;
