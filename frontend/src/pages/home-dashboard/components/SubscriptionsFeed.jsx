import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import VideoCard from 'components/ui/VideoCard';
import { subscribedChannels, subscriptionVideos } from 'data/mockData';

const SubscriptionsFeed = () => {
  const [isAuthenticated] = useState(false); // Mock authentication state
  const [showAll, setShowAll] = useState(false);

  // Mock subscription data
  // subscriptionVideos & subscribedChannels

  if (!isAuthenticated) {
    return null; // Don't show subscriptions feed for unauthenticated users
  }

  const displayedVideos = showAll ? subscriptionVideos : subscriptionVideos.slice(0, 3);

  return (
    <section className="mb-8">
      {/* Subscribed Channels Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary">Your Subscriptions</h3>
          <Link
            to="/channel-profile-page"
            className="text-sm text-secondary hover:text-secondary-400 transition-colors duration-150"
          >
            Manage
          </Link>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {subscribedChannels.map((channel) => (
            <Link
              key={channel.name}
              to="/channel-profile-page"
              className="flex-shrink-0 flex flex-col items-center space-y-2 group"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-surface group-hover:ring-2 group-hover:ring-primary transition-all duration-150">
                  <img
                    src={channel.avatar}
                    alt={channel.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/assets/images/no_image.png";
                    }}
                  />
                </div>
                
                {/* Status Indicators */}
                {channel.isLive && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
                
                {channel.hasNewContent && !channel.isLive && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-background"></div>
                )}
              </div>
              
              <span className="text-xs text-text-secondary text-center line-clamp-2 max-w-[64px] group-hover:text-text-primary transition-colors duration-150">
                {channel.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest from Subscriptions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-secondary" />
          <h3 className="text-lg font-medium text-text-primary">Latest from your subscriptions</h3>
        </div>
        
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-secondary hover:text-secondary-400 transition-colors duration-150"
        >
          {showAll ? 'Show less' : 'Show all'}
        </button>
      </div>

      {/* Subscription Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {displayedVideos.map((video) => (
          <div key={video.id} className="relative">
            <VideoCard video={video} layout="grid" showChannel={true} />
            
            {/* New Content Badge */}
            {video.isNew && (
              <div className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>New</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {subscriptionVideos.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Bell" size={24} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No new videos</h3>
          <p className="text-text-secondary mb-4">
            Your subscribed channels haven't uploaded any new content yet.
          </p>
          <Link
            to="/search-results-page"
            className="btn-secondary"
          >
            Discover new channels
          </Link>
        </div>
      )}
    </section>
  );
};

export default SubscriptionsFeed;