
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Vendors from './pages/vendors';
import ClientForm from './pages/ClientForm';
import NotFound from './pages/NotFound';

// Admin pages
import AdminDashboard from './pages/admin-dashboard';
import AdminClientes from './pages/admin-clientes';
import AdminProveedores from './pages/admin-proveedores';
import AdminServicios from './pages/admin-servicios';
import AdminEventos from './pages/admin-eventos';
import AdminNotificaciones from './pages/admin-notificaciones';
import AdminMensajes from './pages/admin-mensajes';
import AdminAnaliticas from './pages/admin-analiticas';
import AdminAjustes from './pages/admin-ajustes';

// Provider pages
import ProviderDashboard from './pages/ProviderDashboard';
import ProviderServices from './pages/provider-services';
import ProviderClients from './pages/provider-clients';
import ProviderMessages from './pages/provider-messages';
import ProviderCalendar from './pages/provider-calendar';
import ProviderFinances from './pages/provider-finances';
import ProviderReviews from './pages/provider-reviews';
import ProviderNotifications from './pages/provider-notifications';
import ProviderInvitations from './pages/provider-invitations';
import ProviderAnalytics from './pages/provider-analytics';
import ProviderSettings from './pages/provider-settings';

// Client pages
import ClientDashboard from './pages/client-dashboard';
import ClientCalendar from './pages/client-calendar';
import ClientMisServicios from './pages/client-mis-servicios';
import ClientMensajes from './pages/client-mensajes';
import ClientPresupuesto from './pages/client-presupuesto';
import ClientInvitados from './pages/client-invitados';
import ClientNotificaciones from './pages/client-notificaciones';
import ClientAjustes from './pages/client-ajustes';

import { ClientProvider } from './contexts/ClientContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendors/:id" element={<Vendors />} />
        <Route path="/client-form" element={<ClientForm />} />

        {/* Admin routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-clientes" element={<AdminClientes />} />
        <Route path="/admin-proveedores" element={<AdminProveedores />} />
        <Route path="/admin-servicios" element={<AdminServicios />} />
        <Route path="/admin-eventos" element={<AdminEventos />} />
        <Route path="/admin-notificaciones" element={<AdminNotificaciones />} />
        <Route path="/admin-mensajes" element={<AdminMensajes />} />
        <Route path="/admin-analiticas" element={<AdminAnaliticas />} />
        <Route path="/admin-ajustes" element={<AdminAjustes />} />

        {/* Provider routes */}
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/provider-services" element={<ProviderServices />} />
        <Route path="/provider-clients" element={<ProviderClients />} />
        <Route path="/provider-messages" element={<ProviderMessages />} />
        <Route path="/provider-calendar" element={<ProviderCalendar />} />
        <Route path="/provider-finances" element={<ProviderFinances />} />
        <Route path="/provider-reviews" element={<ProviderReviews />} />
        <Route path="/provider-notifications" element={<ProviderNotifications />} />
        <Route path="/provider-invitations" element={<ProviderInvitations />} />
        <Route path="/provider-analytics" element={<ProviderAnalytics />} />
        <Route path="/provider-settings" element={<ProviderSettings />} />

        {/* Client routes wrapped with ClientProvider */}
        <Route path="/client-dashboard" element={<ClientProvider><ClientDashboard /></ClientProvider>} />
        <Route path="/client-calendar" element={<ClientProvider><ClientCalendar /></ClientProvider>} />
        <Route path="/client-mis-servicios" element={<ClientProvider><ClientMisServicios /></ClientProvider>} />
        <Route path="/client-mensajes" element={<ClientProvider><ClientMensajes /></ClientProvider>} />
        <Route path="/client-presupuesto" element={<ClientProvider><ClientPresupuesto /></ClientProvider>} />
        <Route path="/client-invitados" element={<ClientProvider><ClientInvitados /></ClientProvider>} />
        <Route path="/client-notificaciones" element={<ClientProvider><ClientNotificaciones /></ClientProvider>} />
        <Route path="/client-ajustes" element={<ClientProvider><ClientAjustes /></ClientProvider>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
