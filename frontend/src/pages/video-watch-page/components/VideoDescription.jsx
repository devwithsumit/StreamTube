import React from 'react';
import Icon from 'components/AppIcon';

const VideoDescription = ({ description, isExpanded, onToggle, uploadDate, views, tags }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderDescription = () => {
    if (!description) return null;

    const lines = description.split('\n');
    const displayLines = isExpanded ? lines : lines.slice(0, 3);
    
    return displayLines.map((line, index) => (
      <p key={index} className="mb-2 last:mb-0">
        {line}
      </p>
    ));
  };

  const shouldShowToggle = description && description.split('\n').length > 3;

  return (
    <div className="mb-6">
      <div className="bg-surface rounded-lg p-4">
        {/* Stats */}
        <div className="flex items-center space-x-4 text-sm font-medium text-text-primary mb-3">
          <span>{formatNumber(views)} views</span>
          <span>{formatDate(uploadDate)}</span>
        </div>

        {/* Description */}
        <div className={`text-text-primary text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
          {renderDescription()}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-surface-700 text-secondary text-xs rounded-full hover:bg-surface-600 cursor-pointer transition-colors duration-150"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Show More/Less Button */}
        {shouldShowToggle && (
          <button
            onClick={onToggle}
            className="flex items-center space-x-1 mt-3 text-text-secondary hover:text-text-primary transition-colors duration-150 text-sm font-medium"
          >
            <span>{isExpanded ? 'Show less' : 'Show more'}</span>
            <Icon
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              size={16}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoDescription;