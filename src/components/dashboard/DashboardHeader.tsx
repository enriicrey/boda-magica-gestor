
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm py-3 px-6">
      <div className="container-custom">
        <Link to="/" className="flex items-center">
          <div className="font-serif text-xl font-bold text-wedding-sage">Wedding<span className="text-wedding-gold">Plan</span></div>
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;
