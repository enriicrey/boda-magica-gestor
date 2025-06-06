
import { useState, useEffect } from 'react';

export interface ClientTask {
  id: string;
  title: string;
  completed: boolean;
  date: string;
  notes?: string;
  type: 'personal' | 'service';
}

export interface ClientEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  type: 'appointment' | 'tasting' | 'deadline' | 'personal';
  serviceId?: string;
  description?: string;
}

export interface ClientMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isProvider: boolean;
  attachments?: string[];
}

export interface ClientConversation {
  id: string;
  provider: string;
  serviceId?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
  messages: ClientMessage[];
}

export interface ClientNotification {
  id: string;
  type: 'message' | 'payment' | 'appointment' | 'task' | 'service' | 'info';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
  relatedId?: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  description: string;
  budgeted: number;
  spent: number;
  serviceId?: string;
  provider?: string;
}

export const useClientState = () => {
  const [tasks, setTasks] = useState<ClientTask[]>([
    { id: '1', title: 'Confirmar menú con catering', completed: true, date: '2024-06-20', type: 'service' },
    { id: '2', title: 'Revisar propuesta de decoración', completed: false, date: '2024-06-25', type: 'service' },
    { id: '3', title: 'Seleccionar canciones', completed: false, date: '2024-07-05', type: 'personal' },
    { id: '4', title: 'Prueba de vestido', completed: false, date: '2024-07-10', type: 'service' }
  ]);

  const [events, setEvents] = useState<ClientEvent[]>([
    { 
      id: '1', 
      title: 'Prueba de vestido', 
      date: '2024-06-18', 
      time: '14:00',
      location: 'Boutique Elegant, Calle Mayor 24',
      type: 'appointment',
      serviceId: 'service-1'
    },
    { 
      id: '2', 
      title: 'Cita con fotógrafo', 
      date: '2024-06-22', 
      time: '10:30',
      location: 'Estudio Fotografía Carlos, Plaza España 5',
      type: 'appointment',
      serviceId: 'service-2'
    },
    { 
      id: '3', 
      title: 'Degustación menú', 
      date: '2024-07-05', 
      time: '19:00',
      location: 'Catering Delicias, Avenida Principal 45',
      type: 'tasting',
      serviceId: 'service-3'
    },
    { 
      id: '4', 
      title: 'Entrega de invitaciones', 
      date: '2024-07-15',
      type: 'deadline'
    }
  ]);

  const [conversations, setConversations] = useState<ClientConversation[]>([
    {
      id: '1',
      provider: 'Carlos Jiménez Fotografía',
      serviceId: 'service-2',
      lastMessage: 'Perfecto, nos vemos el viernes para la sesión de prueba',
      timestamp: '10:30',
      unread: 0,
      avatar: 'CJ',
      online: true,
      messages: [
        { id: '1', sender: 'Carlos Jiménez', content: 'Hola Clara, he revisado las fechas disponibles para la sesión de compromiso.', timestamp: '09:15', isProvider: true },
        { id: '2', sender: 'Yo', content: 'Perfecto Carlos. ¿Qué día te viene mejor? Nosotros tenemos disponibilidad el viernes y el sábado.', timestamp: '09:20', isProvider: false },
        { id: '3', sender: 'Carlos Jiménez', content: 'El viernes por la tarde sería ideal. ¿Qué os parece a las 17:00 en el parque del Retiro?', timestamp: '09:25', isProvider: true },
        { id: '4', sender: 'Yo', content: 'Perfecto, nos vemos el viernes a las 17:00 en el Retiro. ¿Necesitas que llevemos algo especial?', timestamp: '09:30', isProvider: false },
        { id: '5', sender: 'Carlos Jiménez', content: 'Solo traed vuestras sonrisas y ganas de pasarlo bien. Yo me encargo del resto 📸', timestamp: '10:30', isProvider: true }
      ]
    },
    {
      id: '2',
      provider: 'Villa Rosa',
      serviceId: 'service-1',
      lastMessage: 'He enviado el contrato actualizado con los cambios solicitados',
      timestamp: 'Ayer',
      unread: 2,
      avatar: 'VR',
      online: false,
      messages: [
        { id: '6', sender: 'Villa Rosa', content: 'Buenos días Clara, adjunto el contrato actualizado con las modificaciones que me solicitaste.', timestamp: 'Ayer 14:30', isProvider: true },
        { id: '7', sender: 'Villa Rosa', content: 'He enviado el contrato actualizado con los cambios solicitados', timestamp: 'Ayer 15:00', isProvider: true }
      ]
    }
  ]);

  const [notifications, setNotifications] = useState<ClientNotification[]>([
    {
      id: '1',
      type: 'message',
      title: 'Nuevo mensaje de Carlos Jiménez Fotografía',
      description: 'Te ha enviado detalles sobre la sesión de compromiso programada para el viernes.',
      timestamp: 'Hace 2 horas',
      read: false,
      relatedId: '1'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Recordatorio de pago',
      description: 'El segundo pago de Villa Rosa vence en 3 días (€3,000).',
      timestamp: 'Hace 4 horas',
      read: false,
      actionRequired: true,
      relatedId: '1'
    }
  ]);

  const [budget, setBudget] = useState<BudgetItem[]>([
    { id: '1', category: 'Lugar', description: 'Villa Rosa - Ceremonia y recepción', budgeted: 8500, spent: 8500, serviceId: '1', provider: 'Villa Rosa' },
    { id: '2', category: 'Fotografía', description: 'Carlos Jiménez - Cobertura completa', budgeted: 1800, spent: 1800, serviceId: '2', provider: 'Carlos Jiménez' },
    { id: '3', category: 'Catering', description: 'Catering Deluxe - Menú para 120 personas', budgeted: 4200, spent: 0, serviceId: '3', provider: 'Catering Deluxe' },
    { id: '4', category: 'Decoración', description: 'Flores y decoración', budgeted: 2400, spent: 0 }
  ]);

  const completeTask = (taskId: string, notes?: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: true, notes } : task
    ));
  };

  const addTask = (title: string, date: string, type: 'personal' | 'service' = 'personal') => {
    const newTask: ClientTask = {
      id: Date.now().toString(),
      title,
      completed: false,
      date,
      type
    };
    setTasks(prev => [...prev, newTask]);
  };

  const addEvent = (event: Omit<ClientEvent, 'id'>) => {
    const newEvent: ClientEvent = {
      id: Date.now().toString(),
      ...event
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const addMessage = (conversationId: string, content: string, attachments?: string[]) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const newMessage: ClientMessage = {
          id: Date.now().toString(),
          sender: 'Yo',
          content,
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          isProvider: false,
          attachments
        };
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: content,
          timestamp: 'Ahora'
        };
      }
      return conv;
    }));
  };

  const addBudgetItem = (item: Omit<BudgetItem, 'id'>) => {
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      ...item
    };
    setBudget(prev => [...prev, newItem]);
  };

  return {
    tasks,
    events,
    conversations,
    notifications,
    budget,
    completeTask,
    addTask,
    addEvent,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addMessage,
    addBudgetItem
  };
};
