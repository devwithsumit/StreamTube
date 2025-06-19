// src/services/videoService.js
const BASE_URL = 'https://api.example.com';

// Mock video data
const mockVideos = [
  {
    id: '1',
    title: 'Building a Modern React App with Vite and TypeScript - Complete Tutorial',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    duration: '24:15',
    views: 125000,
    uploadTime: '2 days ago',
    channel: {
      name: 'TechMaster Pro',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      verified: true
    }
  },
  {
    id: '2',
    title: 'Amazing Nature Documentary: Wildlife in 4K Ultra HD',
    thumbnail: 'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?w=400&h=225&fit=crop',
    duration: '45:30',
    views: 2300000,
    uploadTime: '1 week ago',
    channel: {
      name: 'Nature Explorer',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=40&h=40&fit=crop&crop=face',
      verified: true
    }
  }
];

const videoService = {
  // Get all videos with pagination
  getVideos: (page = 1, limit = 12, category = 'all') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const filteredVideos = category === 'all' 
          ? mockVideos 
          : mockVideos.filter(video => 
              video.title.toLowerCase().includes(category.toLowerCase())
            );
        
        const paginatedVideos = filteredVideos.slice(startIndex, endIndex);
        
        resolve({
          videos: paginatedVideos,
          totalPages: Math.ceil(filteredVideos.length / limit),
          currentPage: page,
          hasMore: endIndex < filteredVideos.length
        });
      }, 1000);
    });
  },

  // Get video by ID
  getVideoById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const video = mockVideos.find(v => v.id === id);
        if (video) {
          resolve({
            ...video,
            description: 'This is a sample video description with detailed information about the content.',
            likes: 8500,
            dislikes: 120,
            uploadDate: '2024-01-15',
            videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
            tags: ['React', 'JavaScript', 'Tutorial'],
            category: 'Education'
          });
        } else {
          reject(new Error('Video not found'));
        }
      }, 500);
    });
  },

  // Get trending videos
  getTrendingVideos: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockVideos.slice(0, 6));
      }, 800);
    });
  },

  // Get related videos
  getRelatedVideos: (videoId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const relatedVideos = mockVideos.filter(v => v.id !== videoId).slice(0, 5);
        resolve(relatedVideos);
      }, 600);
    });
  },

  // Search videos
  searchVideos: (query, page = 1, limit = 12) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredVideos = mockVideos.filter(video =>
          video.title.toLowerCase().includes(query.toLowerCase()) ||
          video.channel.name.toLowerCase().includes(query.toLowerCase())
        );
        
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedVideos = filteredVideos.slice(startIndex, endIndex);
        
        resolve({
          videos: paginatedVideos,
          totalResults: filteredVideos.length,
          currentPage: page,
          hasMore: endIndex < filteredVideos.length
        });
      }, 1200);
    });
  },

  // Upload video
  uploadVideo: (videoData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (videoData.title && videoData.file) {
          const newVideo = {
            id: Date.now().toString(),
            ...videoData,
            uploadTime: 'just now',
            views: 0,
            likes: 0,
            dislikes: 0
          };
          resolve(newVideo);
        } else {
          reject(new Error('Missing required fields'));
        }
      }, 2000);
    });
  },

  // Like/Unlike video
  toggleLike: (videoId, action) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          action,
          message: `Video ${action}d successfully`
        });
      }, 300);
    });
  }
};

export default videoService;