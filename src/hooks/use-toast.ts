
import { useState } from 'react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  action?: React.ReactNode;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, variant = 'default', action, duration = 3000 }: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, title, description, variant, action, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after specified duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  return { toast, toasts };
}

// Export toast function directly for convenience
export const toast = ({ title, description, variant = 'default', action, duration = 3000 }: Omit<Toast, 'id'>) => {
  // This is a simplified version for direct usage
  console.log('Toast:', { title, description, variant, duration });
};
