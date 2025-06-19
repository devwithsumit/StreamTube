// src/context/ThemeContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ThemeContext = createContext();

const initialState = {
  theme: 'dark', // 'light', 'dark', 'auto'
  isDark: true,
  sidebarExpanded: true,
  autoplay: true,
  notifications: true
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
        isDark: action.payload === 'dark' || 
               (action.payload === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarExpanded: !state.sidebarExpanded
      };
    case 'SET_SIDEBAR_EXPANDED':
      return {
        ...state,
        sidebarExpanded: action.payload
      };
    case 'TOGGLE_AUTOPLAY':
      return {
        ...state,
        autoplay: !state.autoplay
      };
    case 'TOGGLE_NOTIFICATIONS':
      return {
        ...state,
        notifications: !state.notifications
      };
    case 'LOAD_PREFERENCES':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        dispatch({ type: 'LOAD_PREFERENCES', payload: preferences });
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (state.theme === 'auto') {
        dispatch({ 
          type: 'SET_THEME', 
          payload: 'auto'
        });
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [state.theme]);

  useEffect(() => {
    // Save preferences to localStorage whenever state changes
    const preferences = {
      theme: state.theme,
      sidebarExpanded: state.sidebarExpanded,
      autoplay: state.autoplay,
      notifications: state.notifications
    };
    
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [state]);

  useEffect(() => {
    // Apply theme to document
    if (state.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDark]);

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const setSidebarExpanded = (expanded) => {
    dispatch({ type: 'SET_SIDEBAR_EXPANDED', payload: expanded });
  };

  const toggleAutoplay = () => {
    dispatch({ type: 'TOGGLE_AUTOPLAY' });
  };

  const toggleNotifications = () => {
    dispatch({ type: 'TOGGLE_NOTIFICATIONS' });
  };

  const value = {
    ...state,
    setTheme,
    toggleSidebar,
    setSidebarExpanded,
    toggleAutoplay,
    toggleNotifications
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;