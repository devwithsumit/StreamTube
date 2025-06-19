import React from 'react';
import Icon from 'components/AppIcon';

const SearchFilters = ({ 
  activeFilters, 
  onFilterChange, 
  onFeatureToggle, 
  onClearAll,
  recentSearches = []
}) => {
  const uploadDateOptions = [
    { value: 'any', label: 'Any time' },
    { value: 'hour', label: 'Last hour' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This week' },
    { value: 'month', label: 'This month' },
    { value: 'year', label: 'This year' }
  ];

  const durationOptions = [
    { value: 'any', label: 'Any duration' },
    { value: 'short', label: 'Under 4 minutes' },
    { value: 'medium', label: '4-20 minutes' },
    { value: 'long', label: 'Over 20 minutes' }
  ];

  const typeOptions = [
    { value: 'video', label: 'Video' },
    { value: 'channel', label: 'Channel' },
    { value: 'playlist', label: 'Playlist' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'upload_date', label: 'Upload date' },
    { value: 'view_count', label: 'View count' },
    { value: 'rating', label: 'Rating' }
  ];

  const featureOptions = [
    { value: 'hd', label: 'HD', icon: 'Hd' },
    { value: 'subtitles', label: 'Subtitles/CC', icon: 'Subtitles' },
    { value: 'creative_commons', label: 'Creative Commons', icon: 'CreativeCommons' },
    { value: '3d', label: '3D', icon: 'Box' },
    { value: 'live', label: 'Live', icon: 'Radio' },
    { value: '4k', label: '4K', icon: 'Monitor' },
    { value: '360', label: '360°', icon: 'RotateCcw' },
    { value: 'vr180', label: 'VR180', icon: 'Glasses' }
  ];

  const hasActiveFilters = () => {
    return activeFilters.uploadDate !== 'any' ||
           activeFilters.duration !== 'any' ||
           activeFilters.type !== 'video' ||
           activeFilters.features.length > 0 ||
           activeFilters.sortBy !== 'relevance';
  };

  const FilterSection = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-text-primary mb-3">{title}</h3>
      {children}
    </div>
  );

  const RadioOption = ({ name, value, currentValue, onChange, label }) => (
    <label className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-surface-700 rounded-md px-2 transition-colors duration-150">
      <input
        type="radio"
        name={name}
        value={value}
        checked={currentValue === value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-4 h-4 text-primary bg-surface border-white/20 focus:ring-primary-500 focus:ring-2"
      />
      <span className="text-sm text-text-secondary">{label}</span>
    </label>
  );

  const CheckboxOption = ({ value, checked, onChange, label, icon }) => (
    <label className="flex items-center space-x-3 py-2 cursor-pointer hover:bg-surface-700 rounded-md px-2 transition-colors duration-150">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(value)}
        className="w-4 h-4 text-primary bg-surface border-white/20 rounded focus:ring-primary-500 focus:ring-2"
      />
      <div className="flex items-center space-x-2">
        {icon && <Icon name={icon} size={14} className="text-text-secondary" />}
        <span className="text-sm text-text-secondary">{label}</span>
      </div>
    </label>
  );

  return (
    <div className="p-4 lg:p-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        {hasActiveFilters() && (
          <button
            onClick={onClearAll}
            className="text-sm text-secondary hover:text-secondary-400 transition-colors duration-150"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Clear All - Desktop */}
      {hasActiveFilters() && (
        <div className="hidden lg:block mb-6">
          <button
            onClick={onClearAll}
            className="flex items-center space-x-2 text-sm text-secondary hover:text-secondary-400 transition-colors duration-150"
          >
            <Icon name="X" size={14} />
            <span>Clear all filters</span>
          </button>
        </div>
      )}

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <FilterSection title="Recent searches">
          <div className="space-y-1">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                className="flex items-center space-x-2 w-full text-left py-2 px-2 hover:bg-surface-700 rounded-md transition-colors duration-150"
              >
                <Icon name="Clock" size={14} className="text-text-secondary" />
                <span className="text-sm text-text-secondary truncate">{search}</span>
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Upload Date */}
      <FilterSection title="Upload date">
        <div className="space-y-1">
          {uploadDateOptions.map(option => (
            <RadioOption
              key={option.value}
              name="uploadDate"
              value={option.value}
              currentValue={activeFilters.uploadDate}
              onChange={onFilterChange}
              label={option.label}
            />
          ))}
        </div>
      </FilterSection>

      {/* Type */}
      <FilterSection title="Type">
        <div className="space-y-1">
          {typeOptions.map(option => (
            <RadioOption
              key={option.value}
              name="type"
              value={option.value}
              currentValue={activeFilters.type}
              onChange={onFilterChange}
              label={option.label}
            />
          ))}
        </div>
      </FilterSection>

      {/* Duration */}
      <FilterSection title="Duration">
        <div className="space-y-1">
          {durationOptions.map(option => (
            <RadioOption
              key={option.value}
              name="duration"
              value={option.value}
              currentValue={activeFilters.duration}
              onChange={onFilterChange}
              label={option.label}
            />
          ))}
        </div>
      </FilterSection>

      {/* Features */}
      <FilterSection title="Features">
        <div className="space-y-1">
          {featureOptions.map(option => (
            <CheckboxOption
              key={option.value}
              value={option.value}
              checked={activeFilters.features.includes(option.value)}
              onChange={onFeatureToggle}
              label={option.label}
              icon={option.icon}
            />
          ))}
        </div>
      </FilterSection>

      {/* Sort By */}
      <FilterSection title="Sort by">
        <div className="space-y-1">
          {sortOptions.map(option => (
            <RadioOption
              key={option.value}
              name="sortBy"
              value={option.value}
              currentValue={activeFilters.sortBy}
              onChange={onFilterChange}
              label={option.label}
            />
          ))}
        </div>
      </FilterSection>

      {/* Advanced Search Tips */}
      <div className="mt-8 p-4 bg-surface-800 rounded-lg">
        <h4 className="text-sm font-medium text-text-primary mb-2">Search tips</h4>
        <div className="space-y-2 text-xs text-text-secondary">
          <div>Use quotes for exact phrases: "react tutorial"</div>
          <div>Exclude words with minus: react -angular</div>
          <div>Search specific channels: react site:youtube.com/c/channelname</div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;