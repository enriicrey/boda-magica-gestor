
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/ClientDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import AdminDashboard from "./pages/AdminDashboard";
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

// Importaciones de páginas del proveedor
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

// Componentes para las páginas adicionales
const ClientCalendar = () => <div className="p-8"><h1 className="text-2xl font-serif mb-4">Calendario del Cliente</h1><p>Esta página mostrará el calendario de eventos del cliente.</p></div>;
const ClientInvitations = () => <div className="p-8"><h1 className="text-2xl font-serif mb-4">Invitaciones del Cliente</h1><p>Esta página mostrará las invitaciones del cliente.</p></div>;
const ClientGuests = () => <div className="p-8"><h1 className="text-2xl font-serif mb-4">Invitados del Cliente</h1><p>Esta página mostrará la lista de invitados del cliente.</p></div>;
const ClientVendors = () => <div className="p-8"><h1 className="text-2xl font-serif mb-4">Proveedores del Cliente</h1><p>Esta página mostrará los proveedores del cliente.</p></div>;
const ClientSettings = () => <div className="p-8"><h1 className="text-2xl font-serif mb-4">Ajustes del Cliente</h1><p>Esta página permitirá al cliente configurar su cuenta.</p></div>;

// Páginas para detalles de servicio
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
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
          {/* Client dashboard sections */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/client-calendar" element={<ClientCalendar />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/client-guests" element={<ClientGuests />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/client-settings" element={<ClientSettings />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/client-invitations" element={<ClientInvitations />} />
          <Route path="/client-vendors" element={<ClientVendors />} />
          
          {/* Provider dashboard sections */}
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
          
          {/* Vendor Catalog pages */}
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/:id" element={<ServiceDetail />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
