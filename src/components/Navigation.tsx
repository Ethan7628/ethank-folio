
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Zap, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { ChatDialog } from './ChatDialog';
import { motion } from 'framer-motion';

export const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    const t = setInterval(() => ['about','skills','projects','experience','contact'].forEach(id => { const el = document.getElementById(id); if (el && !el.dataset.navObs) { el.dataset.navObs = '1'; io.observe(el); } }), 800);
    return () => { window.removeEventListener('scroll', handleScroll); io.disconnect(); clearInterval(t); };
  }, []);

  const navItems = [
    
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
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 transition-all duration-300">
      <div className={`container mx-auto max-w-6xl ${isMobileMenuOpen ? "rounded-3xl glass-effect" : "rounded-full"} border px-4 sm:px-6 py-2 sm:py-2.5 transition-all duration-500 ${isScrolled ? 'glass-effect border-primary/30' : 'border-transparent'}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href='#home' className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-tech font-bold text-sm sm:text-lg">EK</span>
            </div>
            <span className="text-lg sm:text-xl font-tech font-bold text-foreground">
              Ethan
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => scrollToSection(item.href)}
                className={`relative isolate rounded-full font-medium text-sm xl:text-base hover:text-primary ${active === item.href.slice(1) ? 'text-primary-foreground' : 'text-foreground'}`}
              >
                {active === item.href.slice(1) && <motion.span layoutId="nav-active" className="absolute inset-0 -z-10 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.6)]" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                {item.label}
              </Button>
            ))}
          </div>

          {/* AI Chat Button & Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ChatDialog />

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 transition-all duration-300 hover:bg-primary/10 text-foreground"
            >
              {getThemeIcon()}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 transition-all duration-300 hover:bg-primary/10 text-foreground"
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
          <div className="lg:hidden mt-3 glass-effect rounded-2xl p-4 space-y-3 sm:space-y-4 shadow-xl">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => scrollToSection(item.href)}
                className="w-full justify-start font-medium text-base"
              >
                {item.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
