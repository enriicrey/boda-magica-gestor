
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthForm from '@/components/AuthForm';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || null;

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <Button 
              onClick={handleBackToLogin}
              className="text-wedding-navy hover:text-wedding-navy/80 font-medium flex items-center mb-8"
              variant="ghost"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a inicio de sesión
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {role === 'client' && (
                <div className="mb-4">
                  <h2 className="text-2xl font-serif mb-4 text-center">Registro como Cliente</h2>
                  <p className="text-gray-600 text-center mb-8">Crea tu cuenta y comienza a planificar tu boda de ensueño</p>
                </div>
              )}
              
              {role === 'provider' && (
                <div className="mb-4">
                  <h2 className="text-2xl font-serif mb-4 text-center">Registro como Proveedor</h2>
                  <p className="text-gray-600 text-center mb-8">Crea tu cuenta profesional y conecta con parejas buscando servicios</p>
                </div>
              )}
              
              {role === 'admin' && (
                <div className="mb-4">
                  <h2 className="text-2xl font-serif mb-4 text-center">Registro como Administrador</h2>
                  <p className="text-gray-600 text-center mb-8">Accede al sistema de administración de la plataforma</p>
                </div>
              )}
              
              <AuthForm initialTab="register" initialRole={role} />
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
