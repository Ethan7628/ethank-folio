
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
            (element as HTMLElement).style.color = 'hsl(222 84% 5%)';
            (element as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.1)';
            (element as HTMLElement).style.fontWeight = '700';
          } else if (element.classList.contains('badge') || element.className.includes('badge')) {
            (element as HTMLElement).style.background = 'hsl(222 84% 25%)';
            (element as HTMLElement).style.color = 'hsl(0 0% 98%)';
            (element as HTMLElement).style.textShadow = 'none';
            (element as HTMLElement).style.border = '1px solid hsl(222 84% 25%)';
          } else {
            (element as HTMLElement).style.color = 'hsl(222 84% 5%)';
            (element as HTMLElement).style.textShadow = '0 0.5px 1px rgba(0, 0, 0, 0.1)';
          }
        } else if (theme === 'beige') {
          if (element.tagName.match(/^H[1-6]$/)) {
            (element as HTMLElement).style.color = 'hsl(25 35% 15%)';
            (element as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.2)';
            (element as HTMLElement).style.fontWeight = '700';
          } else if (element.classList.contains('badge') || element.className.includes('badge')) {
            (element as HTMLElement).style.background = 'hsl(28 60% 35%)';
            (element as HTMLElement).style.color = 'hsl(42 25% 96%)';
            (element as HTMLElement).style.textShadow = 'none';
            (element as HTMLElement).style.border = '1px solid hsl(28 60% 35%)';
          } else {
            (element as HTMLElement).style.color = 'hsl(25 35% 15%)';
            (element as HTMLElement).style.textShadow = '0 0.5px 1px rgba(0, 0, 0, 0.15)';
          }
        } else if (theme === 'dark') {
          if (element.tagName.match(/^H[1-6]$/)) {
            (element as HTMLElement).style.color = 'hsl(210 40% 95%)';
            (element as HTMLElement).style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.5)';
          } else if (element.classList.contains('badge') || element.className.includes('badge')) {
            (element as HTMLElement).style.background = 'hsl(217 91% 65%)';
            (element as HTMLElement).style.color = 'hsl(222 84% 10%)';
            (element as HTMLElement).style.textShadow = 'none';
          } else {
            (element as HTMLElement).style.color = 'hsl(210 40% 95%)';
          }
        }
      });

      // Special handling for muted text
      const mutedElements = document.querySelectorAll('.text-muted-foreground');
      mutedElements.forEach((element) => {
        if (theme === 'light') {
          (element as HTMLElement).style.color = 'hsl(222 47% 35%)';
          (element as HTMLElement).style.textShadow = '0 0.5px 1px rgba(0, 0, 0, 0.1)';
        } else if (theme === 'beige') {
          (element as HTMLElement).style.color = 'hsl(25 25% 35%)';
          (element as HTMLElement).style.textShadow = '0 0.5px 1px rgba(0, 0, 0, 0.15)';
        } else if (theme === 'dark') {
          (element as HTMLElement).style.color = 'hsl(215 20% 65%)';
        }
      });

      // Enhanced button visibility
      const buttons = document.querySelectorAll('button, .button');
      buttons.forEach((button) => {
        if (theme === 'light') {
          (button as HTMLElement).style.color = 'hsl(222 84% 5%)';
          (button as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.1)';
          (button as HTMLElement).style.border = '1px solid hsl(214 32% 85%)';
        } else if (theme === 'beige') {
          (button as HTMLElement).style.color = 'hsl(25 35% 15%)';
          (button as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.15)';
          (button as HTMLElement).style.border = '1px solid hsl(35 30% 75%)';
        } else if (theme === 'dark') {
          (button as HTMLElement).style.color = 'hsl(210 40% 95%)';
          (button as HTMLElement).style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.5)';
        }
      });
    };

    // Run enhancement after theme change
    const timeoutId = setTimeout(enhanceTextContrast, 100);

    return () => clearTimeout(timeoutId);
  }, [theme]);

  return null;
};
