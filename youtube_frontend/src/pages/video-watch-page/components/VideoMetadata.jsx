import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const VideoMetadata = ({ video, onLike, onDislike, onShare, onSubscribe }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(video.channel.isSubscribed);
  const [likesCount, setLikesCount] = useState(video.likes);
  const [dislikesCount, setDislikesCount] = useState(video.dislikes);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatViews = (views) => {
    return `${formatNumber(views)} views`;
  };

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
      if (isDisliked) {
        setIsDisliked(false);
        setDislikesCount(prev => prev - 1);
      }
    }
    onLike();
  };

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
      setDislikesCount(prev => prev - 1);
    } else {
      setIsDisliked(true);
      setDislikesCount(prev => prev + 1);
      if (isLiked) {
        setIsLiked(false);
        setLikesCount(prev => prev - 1);
      }
    }
    onDislike();
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    onSubscribe();
  };

  return (
    <div className="mb-6">
      {/* Video Title */}
      <h1 className="text-xl font-semibold text-text-primary mb-4 leading-tight">
        {video.title}
      </h1>

      {/* Video Stats and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        {/* Views and Upload Date */}
        <div className="flex items-center space-x-2 text-text-secondary text-sm">
          <span>{formatViews(video.views)}</span>
          <span>•</span>
          <span>{video.uploadTime}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Like/Dislike */}
          <div className="flex items-center bg-surface rounded-full overflow-hidden">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 hover:bg-surface-700 transition-colors duration-150 ${
                isLiked ? 'text-primary' : 'text-text-secondary'
              }`}
            >
              <Icon name="ThumbsUp" size={16} />
              <span className="text-sm font-medium">{formatNumber(likesCount)}</span>
            </button>
            <div className="w-px h-6 bg-white/10"></div>
            <button
              onClick={handleDislike}
              className={`flex items-center space-x-2 px-4 py-2 hover:bg-surface-700 transition-colors duration-150 ${
                isDisliked ? 'text-primary' : 'text-text-secondary'
              }`}
            >
              <Icon name="ThumbsDown" size={16} />
            </button>
          </div>

          {/* Share */}
          <button
            onClick={onShare}
            className="flex items-center space-x-2 px-4 py-2 bg-surface hover:bg-surface-700 rounded-full transition-colors duration-150"
          >
            <Icon name="Share" size={16} />
            <span className="text-sm font-medium hidden sm:block">Share</span>
          </button>

          {/* Download */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-surface hover:bg-surface-700 rounded-full transition-colors duration-150">
            <Icon name="Download" size={16} />
            <span className="text-sm font-medium hidden sm:block">Download</span>
          </button>

          {/* Save */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-surface hover:bg-surface-700 rounded-full transition-colors duration-150">
            <Icon name="Plus" size={16} />
            <span className="text-sm font-medium hidden sm:block">Save</span>
          </button>

          {/* More Options */}
          <button className="p-2 bg-surface hover:bg-surface-700 rounded-full transition-colors duration-150">
            <Icon name="MoreHorizontal" size={16} />
          </button>
        </div>
      </div>

      {/* Channel Information */}
      <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
        <div className="flex items-center space-x-4">
          <Link to="/channel-profile-page" className="flex-shrink-0">
            <Image
              src={video.channel.avatar}
              alt={video.channel.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </Link>
          
          <div className="flex-1 min-w-0">
            <Link
              to="/channel-profile-page"
              className="flex items-center space-x-2 hover:text-text-primary transition-colors duration-150"
            >
              <h3 className="font-medium text-text-primary">{video.channel.name}</h3>
              {video.channel.verified && (
                <Icon name="CheckCircle" size={16} className="text-text-secondary" />
              )}
            </Link>
            <p className="text-sm text-text-secondary">
              {video.channel.subscribers} subscribers
            </p>
          </div>
        </div>

        <button
          onClick={handleSubscribe}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-150 ${
            isSubscribed
              ? 'bg-surface-700 text-text-primary hover:bg-surface-600' :'bg-primary text-white hover:bg-primary-700'
          }`}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
};

export default VideoMetadata;