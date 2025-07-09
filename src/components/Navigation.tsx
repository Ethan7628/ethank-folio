
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Zap, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'beige':
        return <Zap className="w-4 h-4 sm:w-5 sm:h-5" />;
      case 'dark':
        return <Moon className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <Zap className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-tech font-bold text-sm sm:text-lg">EK</span>
            </div>
            <span className="text-lg sm:text-xl font-tech font-bold text-foreground">Ethan</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm xl:text-base"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 text-foreground hover:text-primary"
            >
              {getThemeIcon()}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 text-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 glass-effect rounded-lg p-4 space-y-3 sm:space-y-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-foreground hover:text-primary transition-colors duration-200 font-medium py-2 text-base"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
