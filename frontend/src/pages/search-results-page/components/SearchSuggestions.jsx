import React from 'react';
import Icon from 'components/AppIcon';

const SearchSuggestions = ({ suggestions = [], onSuggestionClick, onClose }) => {
  const trendingSuggestions = [
    'react hooks tutorial',
    'javascript es6 features',
    'css grid layout',
    'node.js backend',
    'python machine learning',
    'web development 2024',
    'react native app',
    'vue.js vs react'
  ];

  const categorySuggestions = [
    { name: 'Programming', icon: 'Code', query: 'programming tutorial' },
    { name: 'Web Development', icon: 'Globe', query: 'web development' },
    { name: 'Mobile Apps', icon: 'Smartphone', query: 'mobile app development' },
    { name: 'Data Science', icon: 'BarChart3', query: 'data science python' },
    { name: 'AI & ML', icon: 'Brain', query: 'artificial intelligence' },
    { name: 'DevOps', icon: 'Server', query: 'devops tutorial' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-surface rounded-lg shadow-elevation-3 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-text-primary">Search Suggestions</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-surface-700 rounded-full transition-colors duration-150"
            aria-label="Close suggestions"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto">
          {/* Auto-complete Suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center space-x-2">
                <Icon name="Search" size={16} />
                <span>Suggestions</span>
              </h4>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => onSuggestionClick(suggestion)}
                    className="flex items-center space-x-3 w-full text-left py-2 px-3 hover:bg-surface-700 rounded-md transition-colors duration-150"
                  >
                    <Icon name="Search" size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} />
              <span>Trending</span>
            </h4>
            <div className="space-y-1">
              {trendingSuggestions.map((trend, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick(trend)}
                  className="flex items-center space-x-3 w-full text-left py-2 px-3 hover:bg-surface-700 rounded-md transition-colors duration-150"
                >
                  <Icon name="TrendingUp" size={14} className="text-secondary" />
                  <span className="text-sm text-text-secondary">{trend}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Suggestions */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="Grid3X3" size={16} />
              <span>Browse by Category</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {categorySuggestions.map((category, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick(category.query)}
                  className="flex items-center space-x-3 p-3 bg-surface-800 hover:bg-surface-700 rounded-md transition-colors duration-150"
                >
                  <Icon name={category.icon} size={16} className="text-accent" />
                  <span className="text-sm text-text-secondary">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-surface-800 rounded-b-lg">
          <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Keyboard" size={12} />
              <span>Use ↑↓ to navigate</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="CornerDownLeft" size={12} />
              <span>Enter to search</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Escape" size={12} />
              <span>Esc to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;