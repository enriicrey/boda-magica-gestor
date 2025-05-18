
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from "sonner";

const DashboardHeader = () => {
  const handleLogoClick = () => {
    toast.success("Navegando a la página principal");
  };

  return (
    <header className="bg-white shadow-sm py-3 px-6">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center" onClick={handleLogoClick}>
            <div className="font-serif text-xl font-bold text-wedding-sage">Wedding<span className="text-wedding-gold">Plan</span></div>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Panel de Control</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
