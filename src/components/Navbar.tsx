
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-foreground font-semibold text-xl">Logo</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/reservas" className="text-muted hover:text-foreground transition-colors">Reservas</Link>
            <a href="#" className="text-muted hover:text-foreground transition-colors">About</a>
            <a href="#" className="text-muted hover:text-foreground transition-colors">Contact</a>
            <button className="bg-accent-foreground text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
