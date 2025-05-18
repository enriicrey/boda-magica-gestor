
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  hideLinks?: boolean;
}

const Navigation = ({ hideLinks = false }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Check if we're on a login or registration page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

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
        const headerOffset = 100; // Increased offset to avoid overlapping
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
      className={`fixed top-0 left-0 right-0 z-50 py-6 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-white/10' : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className={`text-2xl font-serif font-normal tracking-wide ${scrolled ? 'text-wedding-sage' : 'text-white'}`}>Wedding<span className="font-light italic">Plan</span></span>
          </Link>
        </div>

        {/* Desktop Navigation - Only show if not on auth page or if hideLinks is false */}
        {!hideLinks && !isAuthPage && (
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`${scrolled ? 'text-wedding-sage' : 'text-white'} hover:text-wedding-gold font-light tracking-wide transition-colors text-sm uppercase relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-wedding-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
                onClick={(e) => handleAnchorClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        )}

        {/* Login button only - Only show if not on auth page or if hideLinks is false */}
        {!hideLinks && !isAuthPage && (
          <div className="hidden md:flex items-center">
            <Link to="/login">
              <Button variant="ghost" className={`${scrolled ? 'text-wedding-sage hover:bg-wedding-sage/10' : 'text-white hover:bg-white/10'} font-light tracking-wide text-sm uppercase`}>Iniciar sesión</Button>
            </Link>
          </div>
        )}

        {/* Mobile Menu Button - Only show if not on auth page or if hideLinks is false */}
        {!hideLinks && !isAuthPage && (
          <button 
            className={`md:hidden p-2 ${scrolled ? 'text-wedding-sage' : 'text-white'}`}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && !hideLinks && !isAuthPage && (
          <div className="absolute top-16 left-0 right-0 bg-white md:hidden z-50 animate-fade-in">
            <div className="container-custom py-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-wedding-sage font-light text-base tracking-wide hover:text-wedding-gold transition-colors"
                  onClick={(e) => {
                    handleAnchorClick(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex pt-4 border-t border-gray-100">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-wedding-sage hover:bg-transparent hover:text-wedding-gold font-light">Iniciar sesión</Button>
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
