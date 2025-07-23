
import React, { useEffect } from 'react';
import { useTheme } from '../ThemeProvider';

export const TypographyEnhancer: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Enhance text contrast dynamically
    const enhanceTextContrast = () => {
      const elements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, button, a');
      
      elements.forEach((element) => {
        const computedStyle = window.getComputedStyle(element);
        const backgroundColor = computedStyle.backgroundColor;
        
        // Apply theme-specific text enhancements
        if (theme === 'light') {
          if (element.tagName.match(/^H[1-6]$/)) {
            (element as HTMLElement).style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
          }
        } else if (theme === 'beige') {
          if (element.tagName.match(/^H[1-6]$/)) {
            (element as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.15)';
          }
        } else if (theme === 'dark') {
          if (element.tagName.match(/^H[1-6]$/)) {
            (element as HTMLElement).style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.5)';
          }
        }
      });
    };

    // Run enhancement after theme change
    const timeoutId = setTimeout(enhanceTextContrast, 100);

    return () => clearTimeout(timeoutId);
  }, [theme]);

  return null;
};
