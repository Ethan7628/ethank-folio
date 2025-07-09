
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, MessageSquare, Play, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [text, setText] = useState('');
  const fullText = "Code. Create. Connect. I build experiences for the intelligent web.";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleVoiceGreeting = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        "Hello! I'm Ethan Kusasirakwe, a software developer and creative technologist. Welcome to my futuristic portfolio!"
      );
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      if (isVoicePlaying) {
        speechSynthesis.cancel();
        setIsVoicePlaying(false);
      } else {
        speechSynthesis.speak(utterance);
        setIsVoicePlaying(true);
        utterance.onend = () => setIsVoicePlaying(false);
      }
    }
  };

  const downloadCV = () => {
    // Create a placeholder PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Ethan_Kusasirakwe_CV_2030.pdf';
    link.click();
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-cyber-blue rounded-full animate-pulse-cyber opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10 max-w-4xl">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Avatar */}
          <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-6 sm:mb-8">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                  alt="Ethan Kusasirakwe"
                  className="w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 glass-effect rounded-full p-2 sm:p-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceGreeting}
                className="rounded-full w-8 h-8 sm:w-12 sm:h-12 p-0"
              >
                {isVoicePlaying ? (
                  <VolumeX className="w-4 h-4 sm:w-6 sm:h-6 text-cyber-blue" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-6 sm:h-6 text-cyber-blue" />
                )}
              </Button>
            </div>
          </div>

          {/* Name and Title */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-cyber font-bold text-gradient animate-slide-up">
              ETHAN KUSASIRAKWE
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground animate-slide-up px-4" style={{ animationDelay: '0.2s' }}>
              Software Developer • Creative Technologist • Data Specialist
            </p>
          </div>

          {/* Animated Tagline */}
          <div className="h-12 sm:h-16 flex items-center justify-center animate-slide-up px-4" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-cyber-blue font-medium text-center">
              {text}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-slide-up px-4" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-pink transition-all duration-300 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full w-full sm:w-auto text-sm sm:text-base"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              ✨ Launch My Work
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={downloadCV}
              className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 rounded-full w-full sm:w-auto text-sm sm:text-base"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              📄 Download Smart CV
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-cyber-purple hover:text-cyber-pink transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 rounded-full w-full sm:w-auto text-sm sm:text-base"
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              🤖 Chat With My AI Bot
            </Button>
          </div>

          {/* Scroll Indicator - Fixed positioning */}
          <div className="fixed bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-float z-50">
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-cyber-blue rounded-full flex justify-center bg-background/20 backdrop-blur-sm">
              <div className="w-1 h-2 sm:h-3 bg-cyber-blue rounded-full mt-1 sm:mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
