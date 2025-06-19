// src/utils/constants.js

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.REACT_APP_API_URL || 'https://api.example.com',
  VERSION: 'v1',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
};

// Video Categories
export const VIDEO_CATEGORIES = [
  'All',
  'Gaming',
  'Music',
  'Entertainment',
  'News',
  'Sports',
  'Technology',
  'Education',
  'Comedy',
  'Movies',
  'Animation',
  'Cooking',
  'Travel',
  'Fashion',
  'Health',
  'Science'
];

// Video Quality Options
export const VIDEO_QUALITY_OPTIONS = [
  { value: '144p', label: '144p' },
  { value: '240p', label: '240p' },
  { value: '360p', label: '360p' },
  { value: '480p', label: '480p' },
  { value: '720p', label: '720p HD' },
  { value: '1080p', label: '1080p HD' },
  { value: '1440p', label: '1440p QHD' },
  { value: '2160p', label: '2160p 4K' }
];

// Playback Speed Options
export const PLAYBACK_SPEED_OPTIONS = [
  { value: 0.25, label: '0.25x' },
  { value: 0.5, label: '0.5x' },
  { value: 0.75, label: '0.75x' },
  { value: 1, label: 'Normal' },
  { value: 1.25, label: '1.25x' },
  { value: 1.5, label: '1.5x' },
  { value: 1.75, label: '1.75x' },
  { value: 2, label: '2x' }
];

// File Size Limits
export const FILE_SIZE_LIMITS = {
  VIDEO: 500 * 1024 * 1024, // 500MB
  IMAGE: 10 * 1024 * 1024,  // 10MB
  THUMBNAIL: 2 * 1024 * 1024 // 2MB
};

// Allowed File Types
export const ALLOWED_FILE_TYPES = {
  VIDEO: ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'],
  IMAGE: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  AUDIO: ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/aac']
};

// Theme Options
export const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'auto', label: 'Auto' }
];

// Navigation Menu Items
export const MAIN_NAV_ITEMS = [
  { label: 'Home', path: '/', icon: 'Home', authRequired: false },
  { label: 'Trending', path: '/trending', icon: 'TrendingUp', authRequired: false },
  { label: 'Subscriptions', path: '/subscriptions', icon: 'Users', authRequired: true }
];

export const LIBRARY_NAV_ITEMS = [
  { label: 'Library', path: '/library', icon: 'BookOpen', authRequired: true },
  { label: 'History', path: '/history', icon: 'History', authRequired: true },
  { label: 'Your videos', path: '/your-videos', icon: 'Video', authRequired: true },
  { label: 'Watch later', path: '/watch-later', icon: 'Clock', authRequired: true },
  { label: 'Liked videos', path: '/liked-videos', icon: 'ThumbsUp', authRequired: true }
];

export const EXPLORE_NAV_ITEMS = [
  { label: 'Gaming', path: '/category/gaming', icon: 'Gamepad2', authRequired: false },
  { label: 'Music', path: '/category/music', icon: 'Music', authRequired: false },
  { label: 'Sports', path: '/category/sports', icon: 'Trophy', authRequired: false },
  { label: 'News', path: '/category/news', icon: 'Newspaper', authRequired: false }
];

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
  DEFAULT_PAGE: 1
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME_PREFERENCE: 'themePreference',
  WATCH_HISTORY: 'watchHistory',
  VOLUME_PREFERENCE: 'volumePreference',
  AUTOPLAY_PREFERENCE: 'autoplayPreference'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You need to sign in to access this feature.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UPLOAD_ERROR: 'Upload failed. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully signed in!',
  REGISTER_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Successfully signed out!',
  UPLOAD_SUCCESS: 'Video uploaded successfully!',
  SAVE_SUCCESS: 'Changes saved successfully!',
  DELETE_SUCCESS: 'Item deleted successfully!',
  SUBSCRIBE_SUCCESS: 'Successfully subscribed!',
  UNSUBSCRIBE_SUCCESS: 'Successfully unsubscribed!'
};

// Video Player Settings
export const VIDEO_PLAYER_SETTINGS = {
  DEFAULT_VOLUME: 1,
  DEFAULT_PLAYBACK_RATE: 1,
  SEEK_STEP: 10, // seconds
  VOLUME_STEP: 0.1,
  AUTOPLAY_COUNTDOWN: 10 // seconds
};

// Social Media Platforms
export const SOCIAL_PLATFORMS = [
  { name: 'Facebook', icon: 'Facebook', color: '#1877F2' },
  { name: 'Twitter', icon: 'Twitter', color: '#1DA1F2' },
  { name: 'Instagram', icon: 'Instagram', color: '#E4405F' },
  { name: 'LinkedIn', icon: 'Linkedin', color: '#0A66C2' },
  { name: 'WhatsApp', icon: 'MessageCircle', color: '#25D366' },
  { name: 'Telegram', icon: 'Send', color: '#0088CC' }
];

// Regular Expressions
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,3}?[\s\-\(\)]?[\d]{1,4}[\s\-\(\)]?[\d]{1,9}$/,
  URL: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9]*\.[^\s]{2,}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

// Date Formats
export const DATE_FORMATS = {
  FULL: 'MMMM d, yyyy',
  SHORT: 'MMM d, yyyy',
  NUMERIC: 'MM/dd/yyyy',
  TIME: 'h:mm a',
  DATETIME: 'MMM d, yyyy h:mm a'
};

// Animation Durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000
};

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536
};