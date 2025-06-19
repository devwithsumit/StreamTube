import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import VideoCard from 'components/ui/VideoCard';

const VideosSection = ({ channelId }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'popular', label: 'Most popular' },
    { value: 'views', label: 'Most viewed' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All videos' },
    { value: 'uploads', label: 'Uploads' },
    { value: 'live', label: 'Live streams' },
    { value: 'shorts', label: 'Shorts' }
  ];

  const videos = [
    {
      id: 'video-1',
      title: 'Complete React 18 Tutorial - Build Modern Web Apps from Scratch',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
      duration: '45:30',
      views: '89K',
      uploadTime: '3 days ago',
      type: 'upload',
      channel: {
        name: 'TechMaster Pro',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        verified: true
      }
    },
    {
      id: 'video-2',
      title: 'AI and Machine Learning Explained for Beginners - Complete Guide',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
      duration: '28:15',
      views: '156K',
      uploadTime: '1 week ago',
      type: 'upload',
      channel: {
        name: 'TechMaster Pro',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        verified: true
      }
    },
    {
      id: 'video-3',
      title: 'Live: Q&A Session - Your Programming Questions Answered',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
      duration: '1:32:45',
      views: '45K',
      uploadTime: '2 weeks ago',
      type: 'live',
      channel: {
        name: 'TechMaster Pro',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        verified: true
      }
    },
    {
      id: 'video-4',
      title: 'Quick Tip: VS Code Extensions Every Developer Needs',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
      duration: '0:58',
      views: '234K',
      uploadTime: '3 weeks ago',
      type: 'shorts',
      channel: {
        name: 'TechMaster Pro',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        verified: true
      }
    },
    {
      id: 'video-5',
      title: 'Cybersecurity Best Practices in 2024 - Protect Your Data',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop',
      duration: '35:20',
      views: '203K',
      uploadTime: '1 month ago',
      type: 'upload',
      channel: {
        name: 'TechMaster Pro',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        verified: true
      }
    },
    {
      id: 'video-6',
      title: 'Building Scalable APIs with Node.js and Express - Full Course',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop',
      duration: '52:10',
      views: '94K',
      uploadTime: '1 month ago',
      type: 'upload',
      channel: {
        name: 'TechMaster Pro',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        verified: true
      }
    }
  ];

  const filteredVideos = videos.filter(video => {
    if (filterBy === 'all') return true;
    return video.type === filterBy;
  });

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.uploadTime) - new Date(a.uploadTime);
      case 'oldest':
        return new Date(a.uploadTime) - new Date(b.uploadTime);
      case 'popular':
        return parseInt(b.views.replace(/[^\d]/g, '')) - parseInt(a.views.replace(/[^\d]/g, ''));
      case 'views':
        return parseInt(b.views.replace(/[^\d]/g, '')) - parseInt(a.views.replace(/[^\d]/g, ''));
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Left Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-surface text-text-primary rounded-full hover:bg-surface-700 transition-colors duration-150 sm:hidden"
          >
            <Icon name="Filter" size={16} />
            <span className="text-sm">Filters</span>
          </button>

          {/* Desktop Filters */}
          <div className="hidden sm:flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface border border-white/20 rounded-md px-3 py-2 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="bg-surface border border-white/20 rounded-md px-3 py-2 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors duration-150 ${
              viewMode === 'grid' ?'bg-surface text-text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
            }`}
            title="Grid view"
          >
            <Icon name="Grid3X3" size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors duration-150 ${
              viewMode === 'list' ?'bg-surface text-text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
            }`}
            title="List view"
          >
            <Icon name="List" size={16} />
          </button>
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="sm:hidden bg-surface rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-background border border-white/20 rounded-md px-3 py-2 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Filter by</label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="w-full bg-background border border-white/20 rounded-md px-3 py-2 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Video Count */}
      <div className="text-text-secondary text-sm">
        {sortedVideos.length} video{sortedVideos.length !== 1 ? 's' : ''}
      </div>

      {/* Videos Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              showChannel={false}
              className="hover-scale"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              layout="list"
              showChannel={false}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {sortedVideos.length > 0 && (
        <div className="flex justify-center pt-8">
          <button className="flex items-center space-x-2 px-6 py-3 bg-surface text-text-primary rounded-full hover:bg-surface-700 transition-colors duration-150">
            <Icon name="RotateCcw" size={16} />
            <span>Load more videos</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default VideosSection;