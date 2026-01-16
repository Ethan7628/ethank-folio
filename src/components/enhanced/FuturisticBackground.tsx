import React, { memo, useMemo } from 'react';
import { useTheme } from '../ThemeProvider';

export const FuturisticBackground: React.FC = memo(() => {
  const { theme } = useTheme();

  // Pre-compute particle positions for performance (reduced from 20 to 8)
  const particles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${(i * 12) + 5}%`,
      top: `${(i * 10) + 5}%`,
      delay: `${i * 0.5}s`,
      duration: `${4 + (i * 0.3)}s`,
    })), 
  []);

  // Pre-compute neural paths for performance (reduced from 5 to 3)
  const neuralPaths = useMemo(() => 
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      path: `M ${10 + i * 30}% ${20 + i * 15}% Q ${50}% ${40 + i * 10}% ${90 - i * 20}% ${60 + i * 10}%`,
      delay: `${i * 0.7}s`,
    })), 
  []);

  if (theme === 'dark') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Animated Grid */}
      <div className="cyber-grid absolute inset-0 opacity-20" />
      
      {/* Optimized Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* Holographic Orbs - simplified */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      
      {/* Optimized Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-15" style={{ zIndex: -1 }}>
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {neuralPaths.map((neural) => (
          <path
            key={neural.id}
            d={neural.path}
            stroke="url(#neuralGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: neural.delay }}
          />
        ))}
      </svg>
    </div>
  );
});

FuturisticBackground.displayName = 'FuturisticBackground';
