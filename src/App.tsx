
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Vendors from "./pages/Vendors";

// Client area pages
import ClientDashboard from "./pages/client-dashboard";
import ClientCalendar from "./pages/client-calendar";
import ClientMisServicios from "./pages/client-mis-servicios";
import ClientMensajes from "./pages/client-mensajes";
import ClientPresupuesto from "./pages/client-presupuesto";
import ClientInvitados from "./pages/client-invitados";
import ClientNotificaciones from "./pages/client-notificaciones";
import ClientAjustes from "./pages/client-ajustes";

// Provider area pages
import ProviderDashboard from "./pages/provider-dashboard";
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

// Admin area pages
import AdminDashboard from "./pages/admin-dashboard";
import AdminClientes from "./pages/admin-clientes";
import AdminProveedores from "./pages/admin-proveedores";
import AdminServicios from "./pages/admin-servicios";
import AdminEventos from "./pages/admin-eventos";
import AdminNotificaciones from "./pages/admin-notificaciones";
import AdminAjustes from "./pages/admin-ajustes";
import AdminMensajes from "./pages/admin-mensajes";
import AdminAnaliticas from "./pages/admin-analiticas";

// Service detail page
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
          <Route path="/client-calendar" element={<ClientCalendar />} />
          <Route path="/client-mis-servicios" element={<ClientMisServicios />} />
          <Route path="/client-mensajes" element={<ClientMensajes />} />
          <Route path="/client-presupuesto" element={<ClientPresupuesto />} />
          <Route path="/client-invitados" element={<ClientInvitados />} />
          <Route path="/client-notificaciones" element={<ClientNotificaciones />} />
          <Route path="/client-ajustes" element={<ClientAjustes />} />
          
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
          <Route path="/services/:id" element={<ServiceDetail />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
