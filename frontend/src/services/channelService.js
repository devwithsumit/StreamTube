// src/services/channelService.js
const BASE_URL = 'https://api.example.com';

// Mock channel data
const mockChannels = [
  {
    id: '1',
    name: 'TechMaster Pro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=300&fit=crop',
    subscribers: 2400000,
    verified: true,
    description: 'Welcome to TechMaster Pro! We create high-quality programming tutorials and tech reviews.',
    joinedDate: '2020-03-15',
    totalViews: 50000000,
    videoCount: 245
  }
];

const channelService = {
  // Get channel by ID
  getChannelById: (channelId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const channel = mockChannels.find(c => c.id === channelId);
        if (channel) {
          resolve(channel);
        } else {
          reject(new Error('Channel not found'));
        }
      }, 500);
    });
  },

  // Get channel videos
  getChannelVideos: (channelId, page = 1, limit = 12) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock videos for the channel
        const mockChannelVideos = [
          {
            id: '1',
            title: 'React Hooks Deep Dive',
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=320&h=180&fit=crop',
            duration: '24:15',
            views: 125000,
            uploadTime: '2 days ago'
          },
          {
            id: '2',
            title: 'JavaScript ES2024 Features',
            thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=320&h=180&fit=crop',
            duration: '18:42',
            views: 89000,
            uploadTime: '1 week ago'
          }
        ];
        
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedVideos = mockChannelVideos.slice(startIndex, endIndex);
        
        resolve({
          videos: paginatedVideos,
          totalVideos: mockChannelVideos.length,
          currentPage: page,
          hasMore: endIndex < mockChannelVideos.length
        });
      }, 800);
    });
  },

  // Subscribe to channel
  subscribeToChannel: (channelId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          subscribed: true,
          subscriberCount: 2400001
        });
      }, 500);
    });
  },

  // Unsubscribe from channel
  unsubscribeFromChannel: (channelId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          subscribed: false,
          subscriberCount: 2399999
        });
      }, 500);
    });
  },

  // Get channel playlists
  getChannelPlaylists: (channelId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockPlaylists = [
          {
            id: '1',
            title: 'React Tutorial Series',
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=320&h=180&fit=crop',
            videoCount: 15,
            lastUpdated: '2 days ago'
          },
          {
            id: '2',
            title: 'JavaScript Fundamentals',
            thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=320&h=180&fit=crop',
            videoCount: 20,
            lastUpdated: '1 week ago'
          }
        ];
        
        resolve(mockPlaylists);
      }, 600);
    });
  },

  // Get subscription feed
  getSubscriptionFeed: (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockFeedVideos = [
          {
            id: '1',
            title: 'Latest React Updates',
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=320&h=180&fit=crop',
            duration: '15:30',
            views: 45000,
            uploadTime: '3 hours ago',
            channel: {
              name: 'TechMaster Pro',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
              verified: true
            }
          }
        ];
        
        resolve(mockFeedVideos);
      }, 700);
    });
  },

  // Search channels
  searchChannels: (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredChannels = mockChannels.filter(channel =>
          channel.name.toLowerCase().includes(query.toLowerCase())
        );
        
        resolve(filteredChannels);
      }, 800);
    });
  }
};

export default channelService;