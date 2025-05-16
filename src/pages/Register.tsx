
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AuthForm from '@/components/AuthForm';

const Register = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <AuthForm initialTab="register" initialRole={role} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
