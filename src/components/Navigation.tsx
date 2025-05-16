
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/#services' },
    { name: 'Proveedores', href: '/#vendors' },
    { name: 'Testimonios', href: '/#testimonials' },
    { name: 'Contacto', href: '/#contact' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-transparent py-4">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-normal tracking-wide text-white">Wedding<span className="font-light italic">Plan</span></span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-white hover:text-wedding-blush font-light tracking-wide transition-colors text-sm uppercase"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10 font-light tracking-wide text-sm uppercase">Iniciar sesión</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" className="border-white text-white hover:bg-white/10 font-light tracking-wide text-sm uppercase rounded-none">Registrarse</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-white" 
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white md:hidden z-50 animate-fade-in">
            <div className="container-custom py-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-wedding-navy font-light text-base tracking-wide hover:text-wedding-blush transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-4 pt-4 border-t border-gray-100">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-wedding-navy hover:bg-transparent hover:text-wedding-blush font-light">Iniciar sesión</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-wedding-navy hover:bg-wedding-navy/90 text-white font-light">Registrarse</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
