'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  console.log('ThemeProvider rendered, mounted:', mounted, 'theme:', theme); // Debug log

  // Load theme from localStorage on mount
  useEffect(() => {
    const loadTheme = () => {
      try {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = savedTheme || systemTheme;
        
        setTheme(initialTheme);
        
        // Apply theme to document
        if (initialTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        console.log('Initial theme loaded:', initialTheme); // Debug log
      } catch (error) {
        console.warn('Failed to load theme from localStorage:', error);
        setTheme('light');
      } finally {
        setMounted(true);
      }
    };

    loadTheme();
  }, []);

  // Watch for theme changes and update DOM
  useEffect(() => {
    if (mounted) {
      const htmlElement = document.documentElement;
      if (theme === 'dark') {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
      console.log('Theme updated via useEffect:', theme, 'HTML classes:', htmlElement.className);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Toggling theme from', theme, 'to', newTheme); // Debug log
    
    setTheme(newTheme);
    
    try {
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  };

  // Prevent hydration mismatch by showing a loading state
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {}, mounted: false }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Provide a fallback instead of throwing an error
    console.warn('useTheme must be used within a ThemeProvider. Falling back to light theme.');
    return {
      theme: 'light' as Theme,
      mounted: false,
      toggleTheme: () => {
        console.warn('Theme toggle not available outside ThemeProvider');
      }
    };
  }
  return context;
}
