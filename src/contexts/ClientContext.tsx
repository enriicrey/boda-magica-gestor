
import React, { createContext, useContext, ReactNode } from 'react';
import { useClientState } from '@/hooks/useClientState';

const ClientContext = createContext<ReturnType<typeof useClientState> | null>(null);

export const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const clientState = useClientState();
  
  return (
    <ClientContext.Provider value={clientState}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};
