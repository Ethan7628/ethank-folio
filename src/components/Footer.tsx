
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, Heart, Code, Coffee } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 sm:py-12 relative border-t border-primary/20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center space-y-4 sm:space-y-6">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center space-x-2 mb-6 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-tech font-bold text-lg sm:text-xl">EK</span>
            </div>
            <span className="text-xl sm:text-2xl font-tech font-bold text-gradient">Ethan Kusasirakwe</span>
          </div>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 px-4">
            Building the future, one line of code at a time
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6 sm:mb-8 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Code className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span>15+ Projects Delivered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
              <span>98% Client Satisfaction</span>
            </div>
            <div className="flex items-center space-x-2">
              <Coffee className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
              <span>1000+ Cups of Coffee</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-sm sm:text-base">
            {[
              { name: 'GitHub', url: 'https://github.com/Ethan7628' },
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kusasirakwe-ethan-21585a34b/' },
              { name: 'Twitter', url: 'https://twitter.com/ethankusasirakwe' },
              { name: 'Email', url: 'mailto:kusasirakweethan31@gmail.com' }
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.url.startsWith('http') ? '_blank' : undefined}
                rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-muted-foreground px-4">
            <p>© {currentYear}–2030 Ethan Kusasirakwe. All rights reserved.</p>
            <p className="hidden sm:block">•</p>
            <p>Made with ❤️ using React, TypeScript & Tailwind CSS</p>
          </div>

          {/* Back to Top Button */}
          <Button
            onClick={scrollToTop}
            className="mt-6 sm:mt-8 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-primary-foreground rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-primary rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </footer>
  );
};
