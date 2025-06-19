// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage or token
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
      
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (email && password) {
          const userData = {
            id: '1',
            email: email,
            name: 'User Name',
            avatar: '/assets/images/no_image.png'
          };
          
          localStorage.setItem('authToken', 'fake-token');
          localStorage.setItem('userData', JSON.stringify(userData));
          
          setIsAuthenticated(true);
          setUser(userData);
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (userData.email && userData.password) {
          const newUser = {
            id: Date.now().toString(),
            email: userData.email,
            name: `${userData.firstName} ${userData.lastName}`,
            avatar: '/assets/images/no_image.png'
          };
          
          localStorage.setItem('authToken', 'fake-token');
          localStorage.setItem('userData', JSON.stringify(newUser));
          
          setIsAuthenticated(true);
          setUser(newUser);
          resolve(newUser);
        } else {
          reject(new Error('Registration failed'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateProfile = (newData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...user, ...newData };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        setUser(updatedUser);
        resolve(updatedUser);
      }, 500);
    });
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  };
};

export default useAuth;