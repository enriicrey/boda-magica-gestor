
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthForm from '@/components/AuthForm';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import ProviderForm from '@/components/ProviderForm';

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);
  const [registrationView, setRegistrationView] = useState<boolean>(false);
  
  const handleUserTypeSelection = (type: string) => {
    setUserType(type);
    setRegistrationView(true);
  };
  
  const handleBackToRoleSelection = () => {
    setRegistrationView(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation hideLinks={true} />
      
      <main className="flex-grow py-16 flex items-center justify-center">
        <div className="container-custom w-full max-w-4xl">
          <AnimatePresence mode="wait">
            {!registrationView ? (
              <motion.div 
                key="role-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center mb-12"
              >
                <h1 className="heading-lg mb-6">Accede a tu cuenta</h1>
                <p className="text-lg text-gray-600 mb-8">
                  Selecciona el tipo de cuenta con la que deseas acceder
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button
                    onClick={() => handleUserTypeSelection('client')}
                    className="bg-white p-8 rounded-lg border border-gray-200 hover:border-wedding-gold hover:shadow-md transition-all flex flex-col items-center"
                    data-role="client"
                  >
                    <div className="w-16 h-16 bg-wedding-gold/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-wedding-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Soy Cliente</h3>
                    <p className="text-gray-500 text-sm">Planifica tu boda y explora proveedores</p>
                  </button>
                  
                  <button
                    onClick={() => handleUserTypeSelection('provider')}
                    className="bg-white p-8 rounded-lg border border-gray-200 hover:border-wedding-sage hover:shadow-md transition-all flex flex-col items-center"
                    data-role="provider"
                  >
                    <div className="w-16 h-16 bg-wedding-sage/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-wedding-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Soy Proveedor</h3>
                    <p className="text-gray-500 text-sm">Gestiona tus servicios y clientes</p>
                  </button>
                  
                  <button
                    onClick={() => handleUserTypeSelection('admin')}
                    className="bg-white p-8 rounded-lg border border-gray-200 hover:border-purple-600 hover:shadow-md transition-all flex flex-col items-center"
                    data-role="admin"
                  >
                    <div className="w-16 h-16 bg-purple-600/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Soy Administrador</h3>
                    <p className="text-gray-500 text-sm">Accede al panel de administración</p>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <div className="w-full text-left mb-8">
                  <Button 
                    onClick={handleBackToRoleSelection}
                    className="text-wedding-sage hover:text-wedding-sage/80 font-medium flex items-center group"
                    variant="ghost"
                  >
                    <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver a selección
                  </Button>
                </div>
                
                {userType && (
                  <div className="mb-4">
                    <h2 className="text-2xl font-serif mb-4 text-center">
                      {userType === 'client' && 'Inicio de sesión como Cliente'}
                      {userType === 'provider' && 'Inicio de sesión como Proveedor'}
                      {userType === 'admin' && 'Inicio de sesión como Administrador'}
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                      {userType === 'client' && 'Accede a tu cuenta y comienza a planificar tu boda de ensueño'}
                      {userType === 'provider' && 'Accede a tu cuenta profesional y conecta con parejas buscando servicios'}
                      {userType === 'admin' && 'Accede al sistema de administración de la plataforma'}
                    </p>
                    <AuthForm initialTab="login" initialRole={userType} />
                    
                    {/* Provider information request section */}
                    {userType === 'provider' && (
                      <div className="mt-16 pt-8 border-t border-gray-200">
                        <div className="text-center mb-10">
                          <h3 className="text-2xl font-serif mb-2">¿Quieres ofrecer tus servicios?</h3>
                          <p className="text-gray-600 max-w-lg mx-auto">
                            Si eres proveedor de servicios para bodas y deseas formar parte de nuestra red, completa el siguiente formulario y nos pondremos en contacto contigo.
                          </p>
                        </div>
                        <div className="max-w-lg mx-auto">
                          <ProviderForm />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
