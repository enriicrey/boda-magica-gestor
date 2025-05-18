
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import ProviderForm from '@/components/ProviderForm';
import ClientForm from '@/components/ClientForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Register = () => {
  const navigate = useNavigate();
  
  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation hideLinks={true} />
      
      <main className="flex-grow py-16 flex items-center justify-center">
        <div className="container-custom w-full">
          <div className="max-w-md mx-auto">
            <div className="w-full text-left mb-8">
              <Button 
                onClick={handleBackToLogin}
                className="text-wedding-sage hover:text-wedding-sage/80 font-medium flex items-center group"
                variant="ghost"
              >
                <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver a inicio de sesión
              </Button>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info" className="rounded-none">Información</TabsTrigger>
                  <TabsTrigger value="request" className="rounded-none">Solicitar acceso</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="text-center px-6 py-8">
                  <h2 className="text-2xl font-serif mb-4">Registro no disponible</h2>
                  <p className="text-gray-600 mb-8">
                    El registro directo no está disponible. Para solicitar acceso, utilice los formularios de contacto en la página principal o utilice la pestaña "Solicitar acceso".
                  </p>
                  
                  <Button 
                    onClick={() => navigate('/')} 
                    className="bg-wedding-sage hover:bg-wedding-sage/90 text-white"
                  >
                    Volver a la página principal
                  </Button>
                </TabsContent>
                <TabsContent value="request" className="px-6 py-8">
                  <h2 className="text-2xl font-serif mb-4 text-center">Solicitar acceso</h2>
                  <p className="text-gray-600 mb-6 text-center">
                    Por favor completa el siguiente formulario para solicitar acceso a la plataforma:
                  </p>
                  
                  <div className="mt-8">
                    <Tabs defaultValue="client">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="client">Parejas</TabsTrigger>
                        <TabsTrigger value="provider">Proveedores</TabsTrigger>
                      </TabsList>
                      <TabsContent value="client" className="mt-4">
                        <ClientForm />
                      </TabsContent>
                      <TabsContent value="provider" className="mt-4">
                        <ProviderForm />
                      </TabsContent>
                    </Tabs>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
