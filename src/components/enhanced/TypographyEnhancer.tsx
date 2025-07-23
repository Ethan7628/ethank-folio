
import React, { useEffect } from 'react';
import { useTheme } from '../ThemeProvider';

export const TypographyEnhancer: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Enhance text contrast dynamically
    const enhanceTextContrast = () => {
      const elements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, button, a, .badge');
      
      elements.forEach((element) => {
        // Apply theme-specific text enhancements
        if (theme === 'light') {
          if (element.tagName.match(/^H[1-6]$/)) {
            (element as HTMLElement).style.color = 'hsl(210 20% 10%)';
            (element as HTMLElement).style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.15)';
            (element as HTMLElement).style.fontWeight = '800';
          } else if (element.classList.contains('badge') || element.className.includes('badge')) {
            (element as HTMLElement).style.background = 'hsl(210 40% 25%)';
            (element as HTMLElement).style.color = 'hsl(0 0% 98%)';
            (element as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.3)';
            (element as HTMLElement).style.border = '1px solid hsl(210 40% 25%)';
            (element as HTMLElement).style.fontWeight = '600';
          } else {
            (element as HTMLElement).style.color = 'hsl(210 20% 10%)';
            (element as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.12)';
          }
        } else if (theme === 'beige') {
          if (element.tagName.match(/^H[1-6]$/)) {
            (element as HTMLElement).style.color = 'hsl(25 35% 15%)';
            (element as HTMLElement).style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.25)';
            (element as HTMLElement).style.fontWeight = '800';
          } else if (element.classList.contains('badge') || element.className.includes('badge')) {
            (element as HTMLElement).style.background = 'hsl(28 60% 30%)';
            (element as HTMLElement).style.color = 'hsl(42 25% 96%)';
            (element as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.3)';
            (element as HTMLElement).style.border = '1px solid hsl(28 60% 30%)';
            (element as HTMLElement).style.fontWeight = '600';
          } else {
            (element as HTMLElement).style.color = 'hsl(25 35% 15%)';
            (element as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.18)';
          }
        } else if (theme === 'dark') {
          if (element.tagName.match(/^H[1-6]$/)) {
            (element as HTMLElement).style.color = 'hsl(210 40% 95%)';
            (element as HTMLElement).style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.6)';
            (element as HTMLElement).style.fontWeight = '700';
          } else if (element.classList.contains('badge') || element.className.includes('badge')) {
            (element as HTMLElement).style.background = 'hsl(217 91% 60%)';
            (element as HTMLElement).style.color = 'hsl(222 84% 10%)';
            (element as HTMLElement).style.textShadow = 'none';
            (element as HTMLElement).style.fontWeight = '600';
          } else {
            (element as HTMLElement).style.color = 'hsl(210 40% 95%)';
            (element as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.4)';
          }
        }
      });

      // Special handling for muted text
      const mutedElements = document.querySelectorAll('.text-muted-foreground');
      mutedElements.forEach((element) => {
        if (theme === 'light') {
          (element as HTMLElement).style.color = 'hsl(210 20% 35%)';
          (element as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.12)';
        } else if (theme === 'beige') {
          (element as HTMLElement).style.color = 'hsl(25 25% 30%)';
          (element as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.18)';
        } else if (theme === 'dark') {
          (element as HTMLElement).style.color = 'hsl(215 20% 70%)';
          (element as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.4)';
        }
      });

      // Enhanced button visibility
      const buttons = document.querySelectorAll('button, .button');
      buttons.forEach((button) => {
        if (theme === 'light') {
          (button as HTMLElement).style.color = 'hsl(210 20% 10%)';
          (button as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.15)';
          (button as HTMLElement).style.border = '1px solid hsl(210 20% 70%)';
          (button as HTMLElement).style.background = 'rgba(255, 255, 255, 0.9)';
          (button as HTMLElement).style.fontWeight = '600';
        } else if (theme === 'beige') {
          (button as HTMLElement).style.color = 'hsl(25 35% 15%)';
          (button as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.18)';
          (button as HTMLElement).style.border = '1px solid hsl(35 30% 70%)';
          (button as HTMLElement).style.background = 'rgba(251, 243, 219, 0.9)';
          (button as HTMLElement).style.fontWeight = '600';
        } else if (theme === 'dark') {
          (button as HTMLElement).style.color = 'hsl(210 40% 95%)';
          (button as HTMLElement).style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.5)';
          (button as HTMLElement).style.border = '1px solid hsl(217 33% 30%)';
          (button as HTMLElement).style.fontWeight = '600';
        }
      });
    };

    // Run enhancement after theme change
    const timeoutId = setTimeout(enhanceTextContrast, 100);

    return () => clearTimeout(timeoutId);
  }, [theme]);

  return null;
};
