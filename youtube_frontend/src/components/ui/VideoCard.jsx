import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const VideoCard = ({ 
  video = {
    id: '1',
    title: 'Sample Video Title',
    thumbnail: '/assets/images/no_image.png',
    duration: '10:30',
    views: '1.2M',
    uploadTime: '2 days ago',
    channel: {
      name: 'Sample Channel',
      avatar: '/assets/images/no_image.png',
      verified: false
    }
  },
  layout = 'grid',
  showChannel = true,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDuration = (duration) => {
    return duration || '0:00';
  };

  const formatViews = (views) => {
    if (!views) return '0 views';
    if (typeof views === 'number') {
      if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M views`;
      } else if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K views`;
      }
      return `${views} views`;
    }
    return views;
  };

  const handleThumbnailClick = () => {
    // Navigate to video watch page
  };

  const handleChannelClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate to channel page
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Show video options menu
  };

  if (layout === 'list') {
    return (
      <div className={`flex space-x-4 p-2 hover:bg-surface-700/50 rounded-md transition-colors duration-150 ${className}`}>
        <Link
          to={`/video-watch-page?v=${video.id}`}
          className="relative flex-shrink-0 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-40 h-24 bg-surface rounded-md overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 skeleton rounded-md" />
            )}
            <Image
              src={video.thumbnail}
              alt={video.title}
              className={`w-full h-full object-cover transition-transform duration-150 ${
                isHovered ? 'scale-105' : ''
              } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
              {formatDuration(video.duration)}
            </div>
          </div>
        </Link>

        <div className="flex-1 min-w-0">
          <Link
            to={`/video-watch-page?v=${video.id}`}
            className="block group"
          >
            <h3 className="text-sm font-medium text-text-primary line-clamp-2 group-hover:text-accent transition-colors duration-150">
              {video.title}
            </h3>
          </Link>

          {showChannel && (
            <Link
              to="/channel-profile-page"
              onClick={handleChannelClick}
              className="inline-flex items-center space-x-1 mt-1 text-xs text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              <span>{video.channel?.name}</span>
              {video.channel?.verified && (
                <Icon name="CheckCircle" size={12} className="text-text-secondary" />
              )}
            </Link>
          )}

          <div className="flex items-center space-x-2 mt-1 text-xs text-text-secondary">
            <span>{formatViews(video.views)}</span>
            <span>•</span>
            <span>{video.uploadTime}</span>
          </div>
        </div>

        <button
          onClick={handleMenuClick}
          className="flex-shrink-0 p-1 hover:bg-surface rounded-full transition-colors duration-150 opacity-0 group-hover:opacity-100"
          aria-label="Video options"
        >
          <Icon name="MoreVertical" size={16} />
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div to={`/video-watch-page?v=${video.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-surface rounded-md overflow-hidden mb-3">
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton rounded-md" />
          )}
          <Image
            src={video.thumbnail}
            alt={video.title}
            className={`w-full h-full object-cover transition-transform duration-150 hover-scale ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Duration */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.duration)}
          </div>

          {/* Hover overlay */}
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-150 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>

        {/* Video Info */}
        <div className="flex space-x-3">
          {showChannel && (
            <Link
              to="/channel-profile-page"
              onClick={handleChannelClick}
              className="flex-shrink-0"
            >
              <div className="w-9 h-9 bg-surface rounded-full overflow-hidden">
                <Image
                  src={video.channel?.avatar}
                  alt={video.channel?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-text-primary line-clamp-2 mb-1 group-hover:text-accent transition-colors duration-150">
              {video.title}
            </h3>

            {showChannel && (
              <Link
                to="/channel-profile-page"
                onClick={handleChannelClick}
                className="inline-flex items-center space-x-1 text-xs text-text-secondary hover:text-text-primary transition-colors duration-150"
              >
                <span>{video.channel?.name}</span>
                {video.channel?.verified && (
                  <Icon name="CheckCircle" size={12} className="text-text-secondary" />
                )}
              </Link>
            )}

            <div className="flex items-center space-x-2 mt-1 text-xs text-text-secondary">
              <span>{formatViews(video.views)}</span>
              <span>•</span>
              <span>{video.uploadTime}</span>
            </div>
          </div>

          <button
            onClick={handleMenuClick}
            className="flex-shrink-0 p-1 hover:bg-surface rounded-full transition-colors duration-150 opacity-0 group-hover:opacity-100"
            aria-label="Video options"
          >
            <Icon name="MoreVertical" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;