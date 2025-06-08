
import React, { createContext, useContext, useState } from 'react';

interface Task {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  type: 'personal' | 'service';
  notes?: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  type: 'appointment' | 'tasting' | 'deadline' | 'personal';
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  avatar: string;
}

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Confirmado' | 'Pendiente' | 'Declinado';
  group: string;
  plusOne: boolean;
  plusOneName: string;
  dietary: string;
  table: string;
}

interface ClientContextType {
  tasks: Task[];
  events: Event[];
  profile: UserProfile;
  guests: Guest[];
  completeTask: (taskId: string, notes?: string) => void;
  addTask: (title: string, date: string, type: 'personal' | 'service') => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addGuest: (guest: Omit<Guest, 'id'>) => void;
  updateGuest: (guestId: string, updates: Partial<Guest>) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Clara Cliente',
    email: 'clara.cliente@email.com',
    phone: '+34 612 345 678',
    address: 'Calle Mayor 123, Madrid',
    bio: 'Preparando la boda de mis sueños para agosto de 2025',
    avatar: 'CC'
  });

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Probar menú de catering', date: '2024-06-15', completed: false, type: 'service' },
    { id: '2', title: 'Elegir música para ceremonia', date: '2024-06-18', completed: false, type: 'service' },
    { id: '3', title: 'Confirmar lista de invitados', date: '2024-06-20', completed: true, type: 'personal', notes: 'Lista final confirmada con 120 invitados' },
    { id: '4', title: 'Comprar zapatos', date: '2024-06-22', completed: false, type: 'personal' },
    { id: '5', title: 'Reunión con fotógrafo', date: '2024-06-25', completed: false, type: 'service' }
  ]);

  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Degustación de catering', date: '2024-06-15', time: '18:00', type: 'tasting', location: 'Catering Deluxe' },
    { id: '2', title: 'Sesión de fotos compromiso', date: '2024-06-20', time: '16:00', type: 'appointment', location: 'Parque Retiro' },
    { id: '3', title: 'Última prueba del vestido', date: '2024-06-25', time: '11:00', type: 'appointment', location: 'Atelier Rosa' },
    { id: '4', title: 'Entrega invitaciones', date: '2024-06-30', type: 'deadline' },
    { id: '5', title: 'Reunión con DJ', date: '2024-07-05', time: '19:00', type: 'appointment', location: 'Oficina Music & Eventos' }
  ]);

  const [guests, setGuests] = useState<Guest[]>([
    { id: '1', name: 'María García López', email: 'maria.garcia@email.com', phone: '+34 612 345 678', status: 'Confirmado', group: 'Familia novia', plusOne: true, plusOneName: 'Juan Carlos García', dietary: 'Vegetariana', table: 'Mesa 1' },
    { id: '2', name: 'Carlos Rodríguez Pérez', email: 'carlos.rodriguez@email.com', phone: '+34 623 456 789', status: 'Pendiente', group: 'Amigos novio', plusOne: false, plusOneName: '', dietary: '', table: 'Mesa 5' },
    { id: '3', name: 'Ana Martínez Ruiz', email: 'ana.martinez@email.com', phone: '+34 634 567 890', status: 'Confirmado', group: 'Familia novia', plusOne: true, plusOneName: 'Luis Martínez', dietary: 'Sin gluten', table: 'Mesa 2' },
    { id: '4', name: 'Luis Sánchez Torres', email: 'luis.sanchez@email.com', phone: '+34 645 678 901', status: 'Declinado', group: 'Trabajo', plusOne: false, plusOneName: '', dietary: '', table: '' },
    { id: '5', name: 'Elena López Fernández', email: 'elena.lopez@email.com', phone: '+34 656 789 012', status: 'Confirmado', group: 'Amigos novia', plusOne: true, plusOneName: 'Pedro López', dietary: '', table: 'Mesa 3' },
    { id: '6', name: 'Pedro Jiménez', email: 'pedro.jimenez@email.com', phone: '+34 667 890 123', status: 'Confirmado', group: 'Familia novio', plusOne: false, plusOneName: '', dietary: '', table: 'Mesa 1' },
    { id: '7', name: 'Carmen Ruiz', email: 'carmen.ruiz@email.com', phone: '+34 678 901 234', status: 'Pendiente', group: 'Trabajo', plusOne: true, plusOneName: '', dietary: '', table: '' }
  ]);

  const completeTask = (taskId: string, notes?: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: true, notes: notes || task.notes }
        : task
    ));
  };

  const addTask = (title: string, date: string, type: 'personal' | 'service') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      date,
      completed: false,
      type
    };
    setTasks(prev => [...prev, newTask]);
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString()
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const addGuest = (guest: Omit<Guest, 'id'>) => {
    const newGuest: Guest = {
      ...guest,
      id: Date.now().toString()
    };
    setGuests(prev => [...prev, newGuest]);
  };

  const updateGuest = (guestId: string, updates: Partial<Guest>) => {
    setGuests(prev => prev.map(guest => 
      guest.id === guestId ? { ...guest, ...updates } : guest
    ));
  };

  return (
    <ClientContext.Provider value={{
      tasks,
      events,
      profile,
      guests,
      completeTask,
      addTask,
      addEvent,
      updateProfile,
      addGuest,
      updateGuest
    }}>
      {children}
    </ClientContext.Provider>
  );
};
