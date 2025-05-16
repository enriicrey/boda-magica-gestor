
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthForm from '@/components/AuthForm';

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);
  
  const handleUserTypeSelection = (type: string) => {
    setUserType(type);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {!userType ? (
              <div className="text-center mb-12">
                <h1 className="heading-lg mb-6">Accede a tu cuenta</h1>
                <p className="text-lg text-gray-600 mb-8">
                  Selecciona el tipo de cuenta con la que deseas acceder
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button
                    onClick={() => handleUserTypeSelection('client')}
                    className="bg-white p-8 rounded-lg border border-gray-200 hover:border-wedding-blush hover:shadow-md transition-all flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-wedding-blush/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-wedding-blush" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Soy Cliente</h3>
                    <p className="text-gray-500 text-sm">Planifica tu boda y explora proveedores</p>
                  </button>
                  
                  <button
                    onClick={() => handleUserTypeSelection('provider')}
                    className="bg-white p-8 rounded-lg border border-gray-200 hover:border-wedding-navy hover:shadow-md transition-all flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-wedding-navy/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-wedding-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">Soy Proveedor</h3>
                    <p className="text-gray-500 text-sm">Gestiona tus servicios y clientes</p>
                  </button>
                  
                  <button
                    onClick={() => handleUserTypeSelection('admin')}
                    className="bg-white p-8 rounded-lg border border-gray-200 hover:border-purple-600 hover:shadow-md transition-all flex flex-col items-center"
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
              </div>
            ) : (
              <div>
                <button 
                  onClick={() => setUserType(null)}
                  className="text-wedding-navy hover:text-wedding-navy/80 font-medium flex items-center mb-8"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Volver a selección
                </button>
                
                <AuthForm initialRole={userType} />
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
