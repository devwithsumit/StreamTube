// src/utils/formatters.js

// Format view count numbers
export const formatViews = (views) => {
  if (!views) return '0 views';
  
  if (typeof views === 'string') return views;
  
  if (views >= 1000000000) {
    return `${(views / 1000000000).toFixed(1)}B views`;
  } else if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  }
  
  return `${views} views`;
};

// Format subscriber count
export const formatSubscribers = (count) => {
  if (!count) return '0 subscribers';
  
  if (typeof count === 'string') return count;
  
  if (count >= 1000000000) {
    return `${(count / 1000000000).toFixed(1)}B subscribers`;
  } else if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M subscribers`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K subscribers`;
  }
  
  return `${count} subscribers`;
};

// Format duration from seconds to MM:SS or HH:MM:SS
export const formatDuration = (seconds) => {
  if (!seconds) return '0:00';
  
  if (typeof seconds === 'string') return seconds;
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Format file size
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

// Format number with commas
export const formatNumber = (num) => {
  if (!num) return '0';
  
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Format percentage
export const formatPercentage = (value, total) => {
  if (!total || total === 0) return '0%';
  
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(1)}%`;
};

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
  if (!amount) return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

// Format title for URL slug
export const formatSlug = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
    .replace(/^-|-$/g, ''); // Remove leading/trailing dashes
};

// Format search query highlighting
export const highlightSearchTerm = (text, searchTerm) => {
  if (!text || !searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

// Format video quality label
export const formatQuality = (quality) => {
  const qualityLabels = {
    '144': '144p',
    '240': '240p',
    '360': '360p',
    '480': '480p',
    '720': '720p HD',
    '1080': '1080p HD',
    '1440': '1440p QHD',
    '2160': '2160p 4K'
  };
  
  return qualityLabels[quality] || `${quality}p`;
};

// Format playback speed
export const formatPlaybackSpeed = (speed) => {
  if (speed === 1) return 'Normal';
  return `${speed}x`;
};