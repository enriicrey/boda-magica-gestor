
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  
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
              className="text-wedding-navy hover:text-wedding-navy/80 font-medium flex items-center mb-8 w-full justify-start"
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
              className="text-center"
            >
              <h2 className="text-2xl font-serif mb-4">Registro no disponible</h2>
              <p className="text-gray-600 mb-8">
                El registro directo no está disponible. Para solicitar acceso, utilice los formularios de contacto en la página principal.
              </p>
              
              <Button 
                onClick={() => navigate('/')} 
                className="bg-wedding-navy hover:bg-wedding-navy/90 text-white"
              >
                Volver a la página principal
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
