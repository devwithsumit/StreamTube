import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RelatedVideos = ({ videos, autoplayEnabled, onAutoplayToggle }) => {
  const formatDuration = (duration) => {
    return duration || '0:00';
  };

  const formatViews = (views) => {
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

  const VideoItem = ({ video, isFirst = false }) => (
    <Link
      to={`/video-watch-page?v=${video.id}`}
      className="flex space-x-3 p-2 hover:bg-surface-700/50 rounded-md transition-colors duration-150 group"
    >
      <div className="relative flex-shrink-0">
        <Image
          src={video.thumbnail}
          alt={video.title}
          className="w-40 h-24 object-cover rounded-md group-hover:scale-105 transition-transform duration-150"
        />
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
          {formatDuration(video.duration)}
        </div>
        {isFirst && autoplayEnabled && (
          <div className="absolute top-1 left-1 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
            <Icon name="Play" size={10} />
            <span>AUTOPLAY</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-text-primary line-clamp-2 mb-1 group-hover:text-accent transition-colors duration-150">
          {video.title}
        </h4>
        
        <div className="flex items-center space-x-1 mb-1">
          <span className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-150">
            {video.channel.name}
          </span>
          {video.channel.verified && (
            <Icon name="CheckCircle" size={10} className="text-text-secondary" />
          )}
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <span>{formatViews(video.views)}</span>
          <span>•</span>
          <span>{video.uploadTime}</span>
        </div>
      </div>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Show video options menu
        }}
        className="flex-shrink-0 p-1 hover:bg-surface rounded-full transition-colors duration-150 opacity-0 group-hover:opacity-100"
        aria-label="Video options"
      >
        <Icon name="MoreVertical" size={14} />
      </button>
    </Link>
  );

  return (
    <div className="space-y-4">
      {/* Autoplay Toggle */}
      <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Play" size={16} />
          <span className="text-sm font-medium text-text-primary">Autoplay</span>
        </div>
        <button
          onClick={onAutoplayToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
            autoplayEnabled ? 'bg-secondary' : 'bg-surface-700'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
              autoplayEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Up Next */}
      {videos.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <h3 className="text-sm font-medium text-text-primary">Up next</h3>
          </div>
          <VideoItem video={videos[0]} isFirst={true} />
        </div>
      )}

      {/* Related Videos */}
      {videos.length > 1 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text-primary">Related</h3>
            <button className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-150">
              Show all
            </button>
          </div>
          
          <div className="space-y-2">
            {videos.slice(1).map((video) => (
              <VideoItem key={video.id} video={video} />
            ))}
          </div>
        </div>
      )}

      {/* Load More */}
      <button className="w-full p-3 text-center text-sm text-secondary hover:text-secondary-400 hover:bg-surface-700/50 rounded-md transition-colors duration-150">
        Show more videos
      </button>
    </div>
  );
};

export default RelatedVideos;