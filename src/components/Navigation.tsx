
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change header background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: 'Inicio', href: '#top' },
    { name: 'Servicios', href: '#services' },
    { name: 'Proveedores', href: '#vendors' },
    { name: 'Testimonios', href: '#testimonials' },
    { name: 'Contacto', href: '#contact' },
  ];

  // Handle smooth scrolling for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle anchor links that start with #
    if (href.startsWith('#')) {
      e.preventDefault();
      
      // If it's just #top, scroll to top
      if (href === '#top') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        setMobileMenuOpen(false);
        return;
      }
      
      // Find the element to scroll to
      const element = document.getElementById(href.substring(1));
      if (element) {
        // Calculate position with offset for fixed header
        const headerOffset = 80; // Adjust based on your header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Scroll to the element
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        
        // Close mobile menu after clicking
        setMobileMenuOpen(false);
      }
    }
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        scrolled ? 'bg-wedding-navy/90 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-normal tracking-wide text-white">Wedding<span className="font-light italic">Plan</span></span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white hover:text-wedding-blush font-light tracking-wide transition-colors text-sm uppercase"
              onClick={(e) => handleAnchorClick(e, link.href)}
            >
              {link.name}
            </a>
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
                <a
                  key={link.name}
                  href={link.href}
                  className="text-wedding-navy font-light text-base tracking-wide hover:text-wedding-blush transition-colors"
                  onClick={(e) => {
                    handleAnchorClick(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </a>
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
