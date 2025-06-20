import { mockCredentials } from "data/mockData";

// src/services/authService.js
const BASE_URL = 'https://api.example.com';

const authService = {
  // Login user
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        const users = mockCredentials.users;

        const foundUser = users.find((item) => item.email === email && item.password === password)

        // console.log(foundUser);
        if (foundUser) {
          const user = {
            id: '1',
            email: email,
            name: foundUser.firstName + ' ' + foundUser.lastName,
            avatar: '/assets/images/no_image.png',
            subscribers: 0,
            verified: false
          };
          
          const token = 'mock-jwt-token-' + Date.now();
          
          resolve({
            user,
            token,
            expiresIn: 3600
          });
        } else {  
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },

  // Register user
  register: (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password && userData.firstName && userData.lastName) {
          const user = {
            id: Date.now().toString(),
            email: userData.email,
            name: `${userData.firstName} ${userData.lastName}`,
            avatar: '/assets/images/no_image.png',
            subscribers: 0,
            verified: false
          };
          
          const token = 'mock-jwt-token-' + Date.now();
          
          resolve({
            user,
            token,
            expiresIn: 3600
          });
        } else {
          reject(new Error('Missing required fields'));
        }
      }, 1200);
    });
  },

  // Logout user
  logout: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Logged out successfully' });
      }, 300);
    });
  },

  // Refresh token
  refreshToken: (token) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token && token.startsWith('mock-jwt-token')) {
          const newToken = 'mock-jwt-token-' + Date.now();
          resolve({
            token: newToken,
            expiresIn: 3600
          });
        } else {
          reject(new Error('Invalid token'));
        }
      }, 500);
    });
  },

  // Verify token
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token && token.startsWith('mock-jwt-token')) {
          resolve({ valid: true });
        } else {
          reject(new Error('Invalid token'));
        }
      }, 200);
    });
  },

  // Reset password
  resetPassword: (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && email.includes('@')) {
          resolve({ message: 'Password reset link sent to email' });
        } else {
          reject(new Error('Invalid email address'));
        }
      }, 800);
    });
  },

  // Update profile
  updateProfile: (userId, profileData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userId && profileData) {
          const updatedUser = {
            id: userId,
            ...profileData,
            updatedAt: new Date().toISOString()
          };
          resolve(updatedUser);
        } else {
          reject(new Error('Missing required data'));
        }
      }, 1000);
    });
  },

  // Change password
  changePassword: (userId, currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (currentPassword === 'password' && newPassword) {
          resolve({ message: 'Password changed successfully' });
        } else {
          reject(new Error('Current password is incorrect'));
        }
      }, 800);
    });
  }
};

export default authService;