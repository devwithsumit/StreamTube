// src/utils/validation.js

// Validate email address
export const isValidEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one special character' };
  }
  
  return { isValid: true, message: 'Password is strong' };
};

// Validate URL
export const isValidURL = (url) => {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate video file
export const validateVideoFile = (file) => {
  const errors = [];
  
  if (!file) {
    errors.push('No file selected');
    return { isValid: false, errors };
  }
  
  // Check file type
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'];
  if (!allowedTypes.includes(file.type)) {
    errors.push('Invalid file type. Please select a valid video file.');
  }
  
  // Check file size (max 500MB)
  const maxSize = 500 * 1024 * 1024; // 500MB in bytes
  if (file.size > maxSize) {
    errors.push('File size too large. Maximum allowed size is 500MB.');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate image file
export const validateImageFile = (file) => {
  const errors = [];
  
  if (!file) {
    errors.push('No file selected');
    return { isValid: false, errors };
  }
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    errors.push('Invalid file type. Please select a valid image file.');
  }
  
  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    errors.push('File size too large. Maximum allowed size is 10MB.');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate required fields
export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  return { isValid: true, message: '' };
};

// Validate minimum length
export const validateMinLength = (value, minLength, fieldName = 'Field') => {
  if (!value || value.length < minLength) {
    return { 
      isValid: false, 
      message: `${fieldName} must be at least ${minLength} characters long` 
    };
  }
  
  return { isValid: true, message: '' };
};

// Validate maximum length
export const validateMaxLength = (value, maxLength, fieldName = 'Field') => {
  if (value && value.length > maxLength) {
    return { 
      isValid: false, 
      message: `${fieldName} must not exceed ${maxLength} characters` 
    };
  }
  
  return { isValid: true, message: '' };
};

// Validate phone number
export const isValidPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false;
  
  // Remove all non-digit characters
  const cleanedNumber = phoneNumber.replace(/\D/g, '');
  
  // Check if it's a valid length (10-15 digits)
  return cleanedNumber.length >= 10 && cleanedNumber.length <= 15;
};

// Validate username
export const validateUsername = (username) => {
  if (!username) {
    return { isValid: false, message: 'Username is required' };
  }
  
  if (username.length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters long' };
  }
  
  if (username.length > 20) {
    return { isValid: false, message: 'Username must not exceed 20 characters' };
  }
  
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return { 
      isValid: false, 
      message: 'Username can only contain letters, numbers, underscores, and hyphens' 
    };
  }
  
  return { isValid: true, message: '' };
};

// Validate age
export const validateAge = (age, minAge = 13) => {
  if (!age || isNaN(age)) {
    return { isValid: false, message: 'Age must be a valid number' };
  }
  
  if (age < minAge) {
    return { isValid: false, message: `You must be at least ${minAge} years old` };
  }
  
  if (age > 120) {
    return { isValid: false, message: 'Please enter a valid age' };
  }
  
  return { isValid: true, message: '' };
};

// Sanitize HTML content
export const sanitizeHTML = (html) => {
  if (!html) return '';
  
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

// Validate form data

export const validateForm = ({
  formData,
  mode,
  showCaptcha,
  captchaValue,
  generatedCaptcha
}) => {
  const newErrors = {};

  if (!formData.email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address';
  }

  if (mode !== 'forgot') {
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
  }

  if (mode === 'signup') {
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
  }

  if (showCaptcha && captchaValue !== generatedCaptcha) {
    newErrors.captcha = 'CAPTCHA verification failed';
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors
  };
};
// export const validateForm = (data, rules) => {
//   const errors = {};
  
//   Object.keys(rules).forEach(field => {
//     const value = data[field];
//     const fieldRules = rules[field];
    
//     fieldRules.forEach(rule => {
//       if (rule.required && !value) {
//         errors[field] = rule.message || `${field} is required`;
//         return;
//       }
      
//       if (rule.minLength && value && value.length < rule.minLength) {
//         errors[field] = rule.message || `${field} must be at least ${rule.minLength} characters long`;
//         return;
//       }
      
//       if (rule.maxLength && value && value.length > rule.maxLength) {
//         errors[field] = rule.message || `${field} must not exceed ${rule.maxLength} characters`;
//         return;
//       }
      
//       if (rule.pattern && value && !rule.pattern.test(value)) {
//         errors[field] = rule.message || `${field} format is invalid`;
//         return;
//       }
      
//       if (rule.custom && typeof rule.custom === 'function') {
//         const result = rule.custom(value);
//         if (!result.isValid) {
//           errors[field] = result.message;
//           return;
//         }
//       }
//     });
//   });
  
//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors
//   };
// };