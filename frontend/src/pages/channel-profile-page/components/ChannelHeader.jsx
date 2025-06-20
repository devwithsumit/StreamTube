import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ChannelHeader = ({
  channelData,
  isSubscribed,
  notificationEnabled,
  isOwner,
  onSubscribe,
  onNotificationToggle
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  const copyChannelLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareMenu(false);
  };

  return (
    <div className="relative">
      {/* Channel Banner */}
      <div className="relative h-32 sm:h-48 lg:h-64 bg-surface overflow-hidden">
        <Image
          src={channelData.banner}
          alt={`${channelData.name} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Channel Info */}
      <div className="px-4 lg:px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
          {/* Left Section - Avatar and Info */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-surface rounded-full overflow-hidden border-4 border-background shadow-lg">
                <Image
                  src={channelData.avatar}
                  alt={channelData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Channel Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-text-primary truncate">
                  {channelData.name}
                </h1>
                {channelData.verified && (
                  <Icon name="CheckCircle" size={20} className="text-text-secondary flex-shrink-0" />
                )}
              </div>
              
              <div className="space-y-1 text-sm text-text-secondary">
                <p>{channelData.handle}</p>
                <div className="flex items-center space-x-2">
                  <span>{channelData.subscriberCount} subscribers</span>
                  <span>•</span>
                  <span>{channelData.videoCount} videos</span>
                </div>
              </div>

              {/* Mobile Subscribe Button */}
              <div className="flex items-center space-x-3 mt-4 sm:hidden">
                <button
                  onClick={onSubscribe}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-150 ${
                    isSubscribed
                      ? 'bg-surface text-text-primary hover:bg-surface-700' :'bg-primary text-white hover:bg-primary-700'
                  }`}
                >
                  <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
                  {isSubscribed && (
                    <Icon name="ChevronDown" size={16} />
                  )}
                </button>

                {isSubscribed && (
                  <button
                    onClick={onNotificationToggle}
                    className={`p-2 rounded-full transition-colors duration-150 ${
                      notificationEnabled
                        ? 'bg-surface text-text-primary hover:bg-surface-700' :'bg-surface text-text-secondary hover:bg-surface-700 hover:text-text-primary'
                    }`}
                    title={notificationEnabled ? 'Turn off notifications' : 'Turn on notifications'}
                  >
                    <Icon name={notificationEnabled ? 'Bell' : 'BellOff'} size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Actions (Desktop) */}
          <div className="hidden sm:flex items-center space-x-3">
            {isOwner ? (
              <Link
                to="/video-upload-studio"
                className="flex items-center space-x-2 px-4 py-2 bg-surface text-text-primary rounded-full hover:bg-surface-700 transition-colors duration-150"
              >
                <Icon name="Settings" size={16} />
                <span>Manage channel</span>
              </Link>
            ) : (
              <>
                <button
                  onClick={onSubscribe}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-full font-medium transition-all duration-150 ${
                    isSubscribed
                      ? 'bg-surface text-text-primary hover:bg-surface-700' :'bg-primary text-white hover:bg-primary-700'
                  }`}
                >
                  <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
                  {isSubscribed && (
                    <Icon name="ChevronDown" size={16} />
                  )}
                </button>

                {isSubscribed && (
                  <button
                    onClick={onNotificationToggle}
                    className={`p-2 rounded-full transition-colors duration-150 ${
                      notificationEnabled
                        ? 'bg-surface text-text-primary hover:bg-surface-700' :'bg-surface text-text-secondary hover:bg-surface-700 hover:text-text-primary'
                    }`}
                    title={notificationEnabled ? 'Turn off notifications' : 'Turn on notifications'}
                  >
                    <Icon name={notificationEnabled ? 'Bell' : 'BellOff'} size={16} />
                  </button>
                )}
              </>
            )}

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={handleShare}
                className="p-2 bg-surface text-text-primary rounded-full hover:bg-surface-700 transition-colors duration-150"
                title="Share channel"
              >
                <Icon name="Share" size={16} />
              </button>

              {showShareMenu && (
                <div className="absolute right-0 top-12 w-48 bg-surface border border-white/10 rounded-md shadow-elevation-2 py-2 z-10">
                  <button
                    onClick={copyChannelLink}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-surface-700 transition-colors duration-150"
                  >
                    <Icon name="Link" size={16} />
                    <span className="text-sm">Copy channel URL</span>
                  </button>
                  <button
                    onClick={() => setShowShareMenu(false)}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-surface-700 transition-colors duration-150"
                  >
                    <Icon name="Twitter" size={16} />
                    <span className="text-sm">Share on Twitter</span>
                  </button>
                  <button
                    onClick={() => setShowShareMenu(false)}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-surface-700 transition-colors duration-150"
                  >
                    <Icon name="Facebook" size={16} />
                    <span className="text-sm">Share on Facebook</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Channel Description Preview */}
        <div className="mt-4 lg:mt-6">
          <p className="text-text-secondary text-sm line-clamp-2 max-w-4xl">
            {channelData.description.split('\n')[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChannelHeader;