
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/enhanced/AnimatedSection';

export const HeroSection = () => {
  const handleDownloadCV = () => {
    // Create a temporary link to download CV
    const link = document.createElement('a');
    link.href = '/cv-ethan-kusasirakwe.pdf';
    link.download = 'Ethan-Kusasirakwe-CV.pdf';
    link.click();
  };

  return (
    <AnimatedSection className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block"
              >
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Available for Work
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-6xl font-bold text-gradient"
              >
                Hello, I'm{' '}
                <span className="text-primary">Ethan</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl md:text-2xl text-muted-foreground"
              >
                Software Developer & Creative Technologist
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-base md:text-lg text-muted-foreground max-w-2xl"
              >
                Building experiences for the intelligent web with React, TypeScript, and modern technologies. 
                Passionate about creating scalable solutions and beautiful user interfaces.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg" 
                className="group"
                onClick={handleDownloadCV}
              >
                Download CV
                <Download className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Connect
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex gap-6"
            >
              <a
                href="https://github.com/ethan-kusasirakwe"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/ethan-kusasirakwe"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 relative">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-1 animate-spin-slow">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <img
                      src="./uploads/790aa63d-8736-498b-b561-e0884f2609a7.png"
                      alt="Ethan Kusasirakwe"
                      className="w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover animate-hologram-flicker"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = './placeholder.svg';
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Floating Tech Icons */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-2xl">⚛️</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};
