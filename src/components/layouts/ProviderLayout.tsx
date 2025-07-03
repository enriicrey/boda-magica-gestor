
import React from 'react';
import ProviderSidebar from '../dashboard/ProviderSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

interface ProviderLayoutProps {
  children: React.ReactNode;
}

const ProviderLayout: React.FC<ProviderLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <ProviderSidebar />
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

export default ProviderLayout;
