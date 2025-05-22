
import React from 'react';
import ProviderSidebar from '../dashboard/ProviderSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

interface ProviderLayoutProps {
  children: React.ReactNode;
}

const ProviderLayout: React.FC<ProviderLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <ProviderSidebar />
        <SidebarInset className="bg-background">
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ProviderLayout;
