import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AboutSection = ({ channelData }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const descriptionLines = channelData.description.split('\n');
  const shouldTruncate = descriptionLines.length > 3;
  const displayDescription = showFullDescription 
    ? channelData.description 
    : descriptionLines.slice(0, 3).join('\n');

  return (
    <div className="space-y-8">
      {/* Channel Description */}
      <div className="bg-surface rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Description</h2>
        <div className="space-y-4">
          <div className="text-text-primary whitespace-pre-line leading-relaxed">
            {displayDescription}
          </div>
          
          {shouldTruncate && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-secondary hover:text-secondary-400 text-sm font-medium transition-colors duration-150"
            >
              {showFullDescription ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </div>

      {/* Channel Statistics */}
      <div className="bg-surface rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Stats</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary mb-1">
              {channelData.stats.subscribers}
            </div>
            <div className="text-sm text-text-secondary">Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary mb-1">
              {channelData.stats.totalViews}
            </div>
            <div className="text-sm text-text-secondary">Total views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary mb-1">
              {channelData.stats.totalVideos}
            </div>
            <div className="text-sm text-text-secondary">Videos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary mb-1">
              {channelData.stats.joined}
            </div>
            <div className="text-sm text-text-secondary">Joined</div>
          </div>
        </div>
      </div>

      {/* Channel Details */}
      <div className="bg-surface rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Details</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={16} className="text-text-secondary" />
            <span className="text-text-primary">{channelData.location}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={16} className="text-text-secondary" />
            <span className="text-text-primary">Joined {channelData.joinDate}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Icon name="BarChart3" size={16} className="text-text-secondary" />
            <span className="text-text-primary">{channelData.stats.totalViews} total views</span>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-surface rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {channelData.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 bg-background rounded-md hover:bg-surface-700 transition-colors duration-150 group"
            >
              <Icon name={link.icon} size={16} className="text-text-secondary group-hover:text-text-primary" />
              <span className="text-text-primary group-hover:text-accent">{link.name}</span>
              <Icon name="ExternalLink" size={12} className="text-text-secondary ml-auto" />
            </a>
          ))}
        </div>
      </div>

      {/* Related Channels */}
      <div className="bg-surface rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Related channels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: 'CodeMaster',
              subscribers: '1.8M',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
              verified: true
            },
            {
              name: 'DevTips',
              subscribers: '950K',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
              verified: false
            },
            {
              name: 'TechReviews',
              subscribers: '2.1M',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
              verified: true
            }
          ].map((channel, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-background rounded-md hover:bg-surface-700 transition-colors duration-150 cursor-pointer group"
            >
              <div className="w-12 h-12 bg-surface rounded-full overflow-hidden">
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <h3 className="font-medium text-text-primary truncate group-hover:text-accent">
                    {channel.name}
                  </h3>
                  {channel.verified && (
                    <Icon name="CheckCircle" size={12} className="text-text-secondary" />
                  )}
                </div>
                <p className="text-xs text-text-secondary">{channel.subscribers} subscribers</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;