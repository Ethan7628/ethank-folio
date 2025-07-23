
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Zap, Menu, X, MessageCircle } from 'lucide-react';
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

  // Enhanced glass effect based on theme
  const getNavBackground = () => {
    if (!isScrolled) return 'bg-transparent';
    
    switch (theme) {
      case 'light':
        return 'bg-background/85 backdrop-blur-lg border-b border-primary/25';
      case 'beige':
        return 'bg-background/85 backdrop-blur-lg border-b border-tech-primary/25';
      case 'dark':
        return 'glass-effect backdrop-blur-lg';
      default:
        return 'glass-effect backdrop-blur-lg';
    }
  };

  const getButtonStyle = () => {
    switch (theme) {
      case 'light':
        return {
          color: 'hsl(210 20% 10%)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
          border: '1px solid hsl(210 20% 70%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          fontWeight: '600'
        };
      case 'beige':
        return {
          color: 'hsl(25 35% 15%)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.18)',
          border: '1px solid hsl(35 30% 70%)',
          backgroundColor: 'rgba(251, 243, 219, 0.9)',
          fontWeight: '600'
        };
      case 'dark':
        return {
          color: 'hsl(210 40% 95%)',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
          border: '1px solid hsl(217 33% 30%)',
          fontWeight: '600'
        };
      default:
        return {};
    }
  };

  const getTextStyle = () => {
    switch (theme) {
      case 'light':
        return {
          color: 'hsl(210 20% 10%)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.12)'
        };
      case 'beige':
        return {
          color: 'hsl(25 35% 15%)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.18)'
        };
      case 'dark':
        return {
          color: 'hsl(210 40% 95%)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)'
        };
      default:
        return {};
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavBackground()}`}>
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-tech font-bold text-sm sm:text-lg">EK</span>
            </div>
            <span 
              className="text-lg sm:text-xl font-tech font-bold"
              style={getTextStyle()}
            >
              Ethan
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="hover:text-primary transition-colors duration-200 font-medium text-sm xl:text-base relative group"
                style={getTextStyle()}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* AI Chat Button & Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* AI Chat Button - Enhanced visibility */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 transition-all duration-300 hover:bg-primary/10"
              style={getButtonStyle()}
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 transition-all duration-300 hover:bg-primary/10"
              style={getButtonStyle()}
            >
              {getThemeIcon()}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 transition-all duration-300 hover:bg-primary/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={getButtonStyle()}
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 glass-effect rounded-lg p-4 space-y-3 sm:space-y-4 shadow-xl">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left font-medium py-2 text-base hover:bg-primary/5 rounded px-2 transition-colors duration-200"
                style={getTextStyle()}
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
