import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import VideoCard from 'components/ui/VideoCard';
import SearchFilters from './components/SearchFilters';
import SearchSuggestions from './components/SearchSuggestions';
import NoResults from './components/NoResults';
import { mockSearchResults } from 'data/mockData';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    uploadDate: 'any',
    duration: 'any',
    type: 'video',
    features: [],
    sortBy: 'relevance'
  });
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [didYouMean, setDidYouMean] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  
  const observerRef = useRef();
  const filtersRef = useRef();

  // Mock search results data
  // mockSearchResults

  const searchSuggestions = [
    'react hooks tutorial',
    'react native vs flutter',
    'react router dom',
    'react context api',
    'react testing library'
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    const category = params.get('category') || '';
    
    if (query) {
      setSearchQuery(query);
      performSearch(query);
      addToRecentSearches(query);
    } else if (category) {
      setSearchQuery(category);
      performSearch(category);
    }
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setIsFiltersOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = async (query) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter results based on query and active filters
      let filteredResults = mockSearchResults.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.description?.toLowerCase().includes(query.toLowerCase()) ||
        result.channel?.name.toLowerCase().includes(query.toLowerCase())
      );

      // Apply filters
      if (activeFilters.type !== 'any') {
        filteredResults = filteredResults.filter(result => result.type === activeFilters.type);
      }

      // Sort results
      switch (activeFilters.sortBy) {
        case 'upload_date':
          filteredResults.sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime));
          break;
        case 'view_count':
          filteredResults.sort((a, b) => {
            const aViews = parseFloat(a.views?.replace(/[KM]/g, '')) || 0;
            const bViews = parseFloat(b.views?.replace(/[KM]/g, '')) || 0;
            return bViews - aViews;
          });
          break;
        default:
          // Keep relevance order
          break;
      }

      setSearchResults(filteredResults);
      setTotalResults(filteredResults.length);
      
      // Check for typos and suggest corrections
      if (filteredResults.length === 0 && query.includes('recat')) {
        setDidYouMean('react');
      } else {
        setDidYouMean('');
      }
      
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToRecentSearches = (query) => {
    setRecentSearches(prev => {
      const updated = [query, ...prev.filter(q => q !== query)].slice(0, 5);
      return updated;
    });
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    
    if (searchQuery) {
      performSearch(searchQuery);
    }
  };

  const handleFeatureToggle = (feature) => {
    setActiveFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
    
    if (searchQuery) {
      performSearch(searchQuery);
    }
  };

  const clearAllFilters = () => {
    setActiveFilters({
      uploadDate: 'any',
      duration: 'any',
      type: 'video',
      features: [],
      sortBy: 'relevance'
    });
    
    if (searchQuery) {
      performSearch(searchQuery);
    }
  };

  const handleSearchCorrection = (correctedQuery) => {
    navigate(`/search-results-page?q=${encodeURIComponent(correctedQuery)}`);
  };

  const renderVideoResult = (result) => (
    <div key={result.id} className={`${viewMode === 'list' ? 'mb-4' : ''}`}>
      <VideoCard 
        video={result} 
        layout={viewMode}
        showChannel={true}
        className={viewMode === 'list' ? 'w-full' : ''}
      />
    </div>
  );

  const renderChannelResult = (result) => (
    <div key={result.id} className="bg-surface rounded-lg p-6 mb-4 hover:bg-surface-700 transition-colors duration-150">
      <div className="flex items-start space-x-4">
        <Link to="/channel-profile-page" className="flex-shrink-0">
          <div className="w-20 h-20 bg-surface-700 rounded-full overflow-hidden">
            <img 
              src={result.thumbnail} 
              alt={result.title}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link to="/channel-profile-page" className="block group">
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-150 mb-1">
              {result.title}
            </h3>
          </Link>
          
          <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
            <span>{result.subscribers} subscribers</span>
            <span>•</span>
            <span>{result.videoCount} videos</span>
          </div>
          
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
            {result.description}
          </p>
          
          {result.recentVideos && (
            <div className="space-y-1">
              <p className="text-xs text-text-secondary font-medium">Recent videos:</p>
              {result.recentVideos.map((video, index) => (
                <div key={index} className="text-xs text-text-secondary">
                  <Link to="/video-watch-page" className="hover:text-text-primary transition-colors duration-150">
                    {video.title}
                  </Link>
                  <span className="mx-2">•</span>
                  <span>{video.views} views</span>
                  <span className="mx-2">•</span>
                  <span>{video.uploadTime}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button className="btn-secondary text-sm px-4 py-2">
          Subscribe
        </button>
      </div>
    </div>
  );

  const renderPlaylistResult = (result) => (
    <div key={result.id} className="bg-surface rounded-lg p-6 mb-4 hover:bg-surface-700 transition-colors duration-150">
      <div className="flex items-start space-x-4">
        <Link to="/video-watch-page" className="flex-shrink-0 relative">
          <div className="w-32 h-20 bg-surface-700 rounded-md overflow-hidden">
            <img 
              src={result.thumbnail} 
              alt={result.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                <Icon name="PlayCircle" size={24} className="text-white mb-1" />
                <div className="text-xs text-white">{result.videoCount} videos</div>
              </div>
            </div>
          </div>
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link to="/video-watch-page" className="block group">
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-150 mb-1">
              {result.title}
            </h3>
          </Link>
          
          <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
            <span>Playlist</span>
            <span>•</span>
            <span>{result.creator}</span>
            <span>•</span>
            <span>{result.totalDuration}</span>
          </div>
          
          <p className="text-sm text-text-secondary line-clamp-2">
            {result.description}
          </p>
        </div>
        
        <button className="p-2 hover:bg-surface rounded-full transition-colors duration-150">
          <Icon name="MoreVertical" size={16} />
        </button>
      </div>
    </div>
  );

  const renderResult = (result) => {
    switch (result.type) {
      case 'channel':
        return renderChannelResult(result);
      case 'playlist':
        return renderPlaylistResult(result);
      default:
        return renderVideoResult(result);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            {searchQuery && (
              <div className="mb-2">
                <h1 className="text-xl font-medium text-text-primary">
                  Search results for "{searchQuery}"
                </h1>
                {totalResults > 0 && (
                  <p className="text-sm text-text-secondary">
                    About {totalResults.toLocaleString()} results
                  </p>
                )}
              </div>
            )}
            
            {didYouMean && (
              <div className="mb-4">
                <p className="text-sm text-text-secondary">
                  Did you mean:{' '}
                  <button
                    onClick={() => handleSearchCorrection(didYouMean)}
                    className="text-secondary hover:text-secondary-400 transition-colors duration-150"
                  >
                    {didYouMean}
                  </button>
                </p>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="hidden md:flex items-center space-x-2 bg-surface rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-150 ${
                  viewMode === 'grid' ? 'bg-surface-700 text-text-primary' : 'text-text-secondary hover:text-text-primary'
                }`}
                aria-label="Grid view"
              >
                <Icon name="Grid3X3" size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-150 ${
                  viewMode === 'list' ? 'bg-surface-700 text-text-primary' : 'text-text-secondary hover:text-text-primary'
                }`}
                aria-label="List view"
              >
                <Icon name="List" size={16} />
              </button>
            </div>
            
            {/* Filters Button */}
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-surface hover:bg-surface-700 rounded-lg transition-colors duration-150"
            >
              <Icon name="Filter" size={16} />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div
            ref={filtersRef}
            className={`${
              isFiltersOpen ? 'block' : 'hidden'
            } lg:block fixed lg:static inset-y-0 left-0 z-40 w-80 lg:w-64 bg-background lg:bg-transparent border-r border-white/10 lg:border-0 pt-16 lg:pt-0 transition-transform duration-200`}
          >
            <SearchFilters
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onFeatureToggle={handleFeatureToggle}
              onClearAll={clearAllFilters}
              recentSearches={recentSearches}
            />
          </div>

          {/* Search Results */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="flex space-x-4">
                      <div className="w-48 h-28 bg-surface rounded-md" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-surface rounded w-3/4" />
                        <div className="h-3 bg-surface rounded w-1/2" />
                        <div className="h-3 bg-surface rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length === 0 ? (
              <NoResults 
                searchQuery={searchQuery}
                onSuggestionClick={(suggestion) => navigate(`/search-results-page?q=${encodeURIComponent(suggestion)}`)}
              />
            ) : (
              <div className={`${
                viewMode === 'grid' ?'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' :'space-y-4'
              }`}>
                {searchResults.map(renderResult)}
              </div>
            )}

            {/* Load More */}
            {searchResults.length > 0 && hasMore && !isLoading && (
              <div className="text-center mt-8">
                <button
                  onClick={() => performSearch(searchQuery)}
                  className="btn-secondary px-6 py-2"
                >
                  Load More Results
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {isFiltersOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsFiltersOpen(false)}
        />
      )}

      {/* Search Suggestions */}
      {showSuggestions && (
        <SearchSuggestions
          suggestions={searchSuggestions}
          onSuggestionClick={(suggestion) => {
            navigate(`/search-results-page?q=${encodeURIComponent(suggestion)}`);
            setShowSuggestions(false);
          }}
          onClose={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default SearchResultsPage;