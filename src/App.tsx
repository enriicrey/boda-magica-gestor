
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/client-dashboard";
import ProviderDashboard from "./pages/provider-dashboard";
import AdminDashboard from "./pages/admin-dashboard";
import Calendar from "./pages/Calendar";
import Favorites from "./pages/Favorites";
import Services from "./pages/Services";
import Budget from "./pages/Budget";
import Guests from "./pages/Guests";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";
import Vendors from "./pages/Vendors";

// Provider area pages
import ProviderCalendar from "./pages/provider-calendar";
import ProviderServices from "./pages/provider-services";
import ProviderClients from "./pages/provider-clients";
import ProviderFinances from "./pages/provider-finances";
import ProviderMessages from "./pages/provider-messages";
import ProviderReviews from "./pages/provider-reviews";
import ProviderNotifications from "./pages/provider-notifications";
import ProviderSettings from "./pages/provider-settings";
import ProviderInvitations from "./pages/provider-invitations";
import ProviderAnalytics from "./pages/provider-analytics";

// Client area pages
import ClientCalendar from "./pages/client-calendar";

// Admin area pages
import AdminClientes from "./pages/admin-clientes";
import AdminProveedores from "./pages/admin-proveedores";

// Placeholder components for additional pages
const ClientServices = () => <div className="p-8"><h1 className="text-2xl font-serif mb-4">Mis Servicios</h1><p>Esta página mostrará los servicios contratados por el cliente.</p></div>;
const ClientMessages = () => <div className="p-8"><h1 className="text-2xl font-serif mb-4">Mensajes del Cliente</h1><p>Esta página mostrará los mensajes del cliente.</p></div>;
const ClientBudget = () => <div className="p-8"><h1 className="text-2xl font-serif mb-4">Presupuesto del Cliente</h1><p>Esta página mostrará el presupuesto del cliente.</p></div>;
const ClientGuests = () => <div className="p-8"><h1 className="text-2xl font-serif mb-4">Invitados del Cliente</h1><p>Esta página mostrará la lista de invitados del cliente.</p></div>;
const ClientNotifications = () => <div className="p-8"><h1 className="text-2xl font-serif mb-4">Notificaciones del Cliente</h1><p>Esta página mostrará las notificaciones del cliente.</p></div>;
const ClientSettings = () => <div className="p-8"><h1 className="text-2xl font-serif mb-4">Ajustes del Cliente</h1><p>Esta página permitirá al cliente configurar su cuenta.</p></div>;
const ClientInvitations = () => <div className="p-8"><h1 className="text-2xl font-serif mb-4">Invitaciones del Cliente</h1><p>Esta página mostrará las invitaciones del cliente.</p></div>;
const ClientVendors = () => <div className="p-8"><h1 className="text-2xl font-serif mb-4">Proveedores del Cliente</h1><p>Esta página mostrará los proveedores del cliente.</p></div>;

// Admin area additional placeholders
const AdminServicios = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Servicios</h1><p>Gestión de servicios de la plataforma.</p></div>;
const AdminEventos = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Eventos</h1><p>Gestión de eventos de la plataforma.</p></div>;
const AdminNotificaciones = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Notificaciones</h1><p>Gestión de notificaciones de la plataforma.</p></div>;
const AdminAjustes = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Ajustes</h1><p>Configuración de la plataforma.</p></div>;
const AdminMensajes = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Mensajes</h1><p>Gestión de mensajes de la plataforma.</p></div>;
const AdminAnaliticas = () => <div className="p-8"><h1 className="text-2xl font-bold mb-4">Analíticas</h1><p>Estadísticas y análisis de la plataforma.</p></div>;

// Pages for service details
const ServiceDetail = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-serif mb-4">Detalle del Servicio</h1>
      <p>Esta página mostrará información detallada de un servicio específico.</p>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Client dashboard sections */}
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/client-calendar" element={<ClientCalendar />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/services" element={<Services />} />
          <Route path="/client-services" element={<ClientServices />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/client-budget" element={<ClientBudget />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/client-guests" element={<ClientGuests />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/client-notifications" element={<ClientNotifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/client-settings" element={<ClientSettings />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/client-messages" element={<ClientMessages />} />
          <Route path="/client-invitations" element={<ClientInvitations />} />
          <Route path="/client-vendors" element={<ClientVendors />} />
          
          {/* Provider dashboard sections */}
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
          <Route path="/provider-calendar" element={<ProviderCalendar />} />
          <Route path="/provider-services" element={<ProviderServices />} />
          <Route path="/provider-clients" element={<ProviderClients />} />
          <Route path="/provider-finances" element={<ProviderFinances />} />
          <Route path="/provider-messages" element={<ProviderMessages />} />
          <Route path="/provider-reviews" element={<ProviderReviews />} />
          <Route path="/provider-notifications" element={<ProviderNotifications />} />
          <Route path="/provider-settings" element={<ProviderSettings />} />
          <Route path="/provider-invitations" element={<ProviderInvitations />} />
          <Route path="/provider-analytics" element={<ProviderAnalytics />} />
          
          {/* Admin dashboard sections */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-clientes" element={<AdminClientes />} />
          <Route path="/admin-proveedores" element={<AdminProveedores />} />
          <Route path="/admin-servicios" element={<AdminServicios />} />
          <Route path="/admin-eventos" element={<AdminEventos />} />
          <Route path="/admin-notificaciones" element={<AdminNotificaciones />} />
          <Route path="/admin-ajustes" element={<AdminAjustes />} />
          <Route path="/admin-mensajes" element={<AdminMensajes />} />
          <Route path="/admin-analiticas" element={<AdminAnaliticas />} />
          
          {/* Vendor Catalog pages */}
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/:id" element={<ServiceDetail />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
