
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, Heart, Code, Coffee } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 relative border-t border-cyber-blue/20">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center">
              <span className="text-white font-cyber font-bold text-xl">EK</span>
            </div>
            <span className="text-2xl font-cyber font-bold text-gradient">Ethan Kusasirakwe</span>
          </div>

          {/* Tagline */}
          <p className="text-lg text-muted-foreground mb-6">
            Building the future, one line of code at a time
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-cyber-blue" />
              <span>15+ Projects Delivered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-cyber-pink" />
              <span>98% Client Satisfaction</span>
            </div>
            <div className="flex items-center space-x-2">
              <Coffee className="w-4 h-4 text-cyber-orange" />
              <span>1000+ Cups of Coffee</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {[
              { name: 'GitHub', url: 'https://github.com/ethan-kusasirakwe' },
              { name: 'LinkedIn', url: 'https://linkedin.com/in/ethan-kusasirakwe' },
              { name: 'Twitter', url: 'https://twitter.com/ethankusasirakwe' },
              { name: 'Email', url: 'mailto:ethan.kusasirakwe@gmail.com' }
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.url.startsWith('http') ? '_blank' : undefined}
                rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-muted-foreground hover:text-cyber-blue transition-colors duration-200"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-muted-foreground">
            <p>© {currentYear}–2030 Ethan Kusasirakwe. All rights reserved.</p>
            <p>Made with ❤️ using React, TypeScript & Tailwind CSS</p>
          </div>

          {/* Back to Top Button */}
          <Button
            onClick={scrollToTop}
            className="mt-8 bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-pink text-white rounded-full w-12 h-12 p-0"
            title="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyber-blue rounded-full animate-float opacity-30"
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
