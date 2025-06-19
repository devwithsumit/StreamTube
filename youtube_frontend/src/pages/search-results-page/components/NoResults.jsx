import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NoResults = ({ searchQuery, onSuggestionClick }) => {
  const suggestions = [
    'Try different keywords',
    'Try more general keywords',
    'Try fewer keywords',
    'Check your spelling'
  ];

  const trendingTopics = [
    { title: 'React Tutorial', query: 'react tutorial' },
    { title: 'JavaScript Basics', query: 'javascript basics' },
    { title: 'CSS Grid', query: 'css grid' },
    { title: 'Node.js', query: 'nodejs tutorial' },
    { title: 'Python Programming', query: 'python programming' },
    { title: 'Web Development', query: 'web development 2024' }
  ];

  const popularChannels = [
    { name: 'CodeMaster', subscribers: '1.2M', category: 'Programming' },
    { name: 'WebDev Pro', subscribers: '850K', category: 'Web Development' },
    { name: 'TechTalks', subscribers: '2.1M', category: 'Technology' },
    { name: 'DevAcademy', subscribers: '950K', category: 'Education' }
  ];

  return (
    <div className="text-center py-12">
      {/* No Results Icon */}
      <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="SearchX" size={48} className="text-text-secondary" />
      </div>

      {/* Main Message */}
      <h2 className="text-2xl font-semibold text-text-primary mb-2">
        No results found
      </h2>
      
      {searchQuery && (
        <p className="text-text-secondary mb-8">
          Your search for <span className="font-medium">"{searchQuery}"</span> did not match any videos.
        </p>
      )}

      {/* Search Suggestions */}
      <div className="max-w-md mx-auto mb-12">
        <h3 className="text-lg font-medium text-text-primary mb-4">Try adjusting your search:</h3>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center space-x-3 text-text-secondary">
              <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
              <span className="text-sm">{suggestion}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="mb-12">
        <h3 className="text-lg font-medium text-text-primary mb-6">Trending searches</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {trendingTopics.map((topic, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(topic.query)}
              className="p-3 bg-surface hover:bg-surface-700 rounded-lg transition-colors duration-150 text-left"
            >
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-secondary" />
                <span className="text-sm font-medium text-text-primary">{topic.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Channels */}
      <div className="mb-12">
        <h3 className="text-lg font-medium text-text-primary mb-6">Popular channels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {popularChannels.map((channel, index) => (
            <Link
              key={index}
              to="/channel-profile-page"
              className="flex items-center space-x-4 p-4 bg-surface hover:bg-surface-700 rounded-lg transition-colors duration-150"
            >
              <div className="w-12 h-12 bg-surface-700 rounded-full flex items-center justify-center">
                <Icon name="User" size={20} className="text-text-secondary" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium text-text-primary">{channel.name}</h4>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <span>{channel.subscribers} subscribers</span>
                  <span>•</span>
                  <span>{channel.category}</span>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            </Link>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <Link
          to="/home-dashboard"
          className="btn-primary flex items-center space-x-2"
        >
          <Icon name="Home" size={16} />
          <span>Go to Home</span>
        </Link>
        
        <button
          onClick={() => onSuggestionClick('trending')}
          className="btn-secondary flex items-center space-x-2"
        >
          <Icon name="TrendingUp" size={16} />
          <span>Browse Trending</span>
        </button>
      </div>

      {/* Help Text */}
      <div className="mt-12 p-6 bg-surface rounded-lg max-w-2xl mx-auto">
        <h4 className="font-medium text-text-primary mb-3">Search tips:</h4>
        <div className="space-y-2 text-sm text-text-secondary text-left">
          <div className="flex items-start space-x-2">
            <Icon name="Quote" size={14} className="mt-0.5 flex-shrink-0" />
            <span>Use quotes for exact phrases: "react tutorial"</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Minus" size={14} className="mt-0.5 flex-shrink-0" />
            <span>Exclude words with minus: react -angular</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Hash" size={14} className="mt-0.5 flex-shrink-0" />
            <span>Search by hashtags: #webdevelopment</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Calendar" size={14} className="mt-0.5 flex-shrink-0" />
            <span>Filter by date using the filters panel</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoResults;