import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="AlertTriangle" size={48} className="text-warning" />
          </div>
          <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/home-dashboard"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Icon name="Home" size={16} />
            <span>Go to Home</span>
          </Link>
          
          <div className="flex justify-center space-x-4 text-sm">
            <Link
              to="/search-results-page"
              className="text-secondary hover:text-secondary-400 transition-colors duration-150"
            >
              Search Videos
            </Link>
            <span className="text-text-secondary">•</span>
            <Link
              to="/channel-profile-page"
              className="text-secondary hover:text-secondary-400 transition-colors duration-150"
            >
              Browse Channels
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;