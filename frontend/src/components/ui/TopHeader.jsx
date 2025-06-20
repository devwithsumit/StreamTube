import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useAuthContext } from 'context/AuthContext';

const TopHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {user, logout, isAuthenticated} = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results-page?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchExpanded(false);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      navigate('/home-dashboard');
    } else {
      navigate('/user-authentication');
    }
  };

  const toggleSidebar = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.dispatchEvent(new CustomEvent('toggleSidebar'));
  };

  const notifications = [
    { id: 1, title: 'New video from TechChannel', time: '2 hours ago', read: false },
    { id: 2, title: 'Your video has 1K views!', time: '5 hours ago', read: false },
    { id: 3, title: 'Comment on your video', time: '1 day ago', read: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-white/10 h-16">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section - Logo and Menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-surface rounded-full transition-colors duration-150 lg:hidden"
            aria-label="Toggle menu"
          >
            <Icon name="Menu" size={20} />
          </button>
          
          <Link 
            to="/home-dashboard" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-150"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <Icon name="Play" size={20} color="white" />
              </div>
              <span className="ml-2 text-xl font-bold text-text-primary hidden sm:block">
                StreamTube
              </span>
            </div>
          </Link>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-4 hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-surface border border-white/20 rounded-l-full px-4 py-2 text-text-primary placeholder-text-secondary focus:outline-none focus:border-secondary-500 transition-colors duration-150"
              />
              <button
                type="submit"
                className="bg-surface border border-l-0 border-white/20 rounded-r-full px-6 py-2 hover:bg-surface-700 transition-colors duration-150"
                aria-label="Search"
              >
                <Icon name="Search" size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Search Button */}
        <button
          onClick={handleSearchToggle}
          className="p-2 hover:bg-surface rounded-full transition-colors duration-150 md:hidden"
          aria-label="Search"
        >
          <Icon name="Search" size={20} />
        </button>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {isAuthenticated && (
            <>
              <Link
                to="/video-upload-studio"
                className="p-2 hover:bg-surface rounded-full transition-colors duration-150 hidden sm:block"
                aria-label="Create video"
              >
                <Icon name="Plus" size={20} />
              </Link>

              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 hover:bg-surface rounded-full transition-colors duration-150 relative"
                  aria-label="Notifications"
                >
                  <Icon name="Bell" size={20} />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 top-12 w-80 bg-surface border border-white/10 rounded-md shadow-elevation-2 py-2 animate-scale-in">
                    <div className="px-4 py-2 border-b border-white/10">
                      <h3 className="font-medium text-text-primary">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-surface-700 cursor-pointer ${
                            !notification.read ? 'bg-surface-800' : ''
                          }`}
                        >
                          <p className="text-sm text-text-primary">{notification.title}</p>
                          <p className="text-xs text-text-secondary mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-1 hover:bg-surface rounded-full transition-colors duration-150"
              aria-label="User menu"
            >
              {isAuthenticated ? (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
              ) : (
                <div className="flex items-center space-x-2 px-3 py-1 border border-secondary-500 rounded-full hover:bg-secondary-500/10 transition-colors duration-150">
                  <Icon name="User" size={16} />
                  <span className="text-sm font-medium hidden sm:block">Sign in</span>
                </div>
              )}
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-12 w-64 bg-surface border border-white/10 rounded-md shadow-elevation-2 py-2 animate-scale-in">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/channel-profile-page"
                      className="flex items-center space-x-3 px-4 py-2 hover:bg-surface-700 transition-colors duration-150"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Icon name="User" size={16} />
                      <span className="text-sm">Your channel</span>
                    </Link>
                    <Link
                      to="/video-upload-studio"
                      className="flex items-center space-x-3 px-4 py-2 hover:bg-surface-700 transition-colors duration-150"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Icon name="Upload" size={16} />
                      <span className="text-sm">Upload video</span>
                    </Link>
                    <div className="border-t border-white/10 my-2"></div>
                    <button
                      onClick={() => {
                        handleAuthAction();
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-2 hover:bg-surface-700 transition-colors duration-150 w-full text-left"
                    >
                      <Icon name="LogOut" size={16} />
                      <span className="text-sm">Sign out</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      handleAuthAction();
                      setIsUserMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-surface-700 transition-colors duration-150 w-full text-left"
                  >
                    <Icon name="LogIn" size={16} />
                    <span className="text-sm">Sign in</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchExpanded && (
        <div className="absolute top-0 left-0 right-0 bg-background border-b border-white/10 p-4 md:hidden animate-slide-in-right">
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsSearchExpanded(false)}
              className="p-2 hover:bg-surface rounded-full transition-colors duration-150"
              aria-label="Close search"
            >
              <Icon name="ArrowLeft" size={20} />
            </button>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-surface border border-white/20 rounded-full px-4 py-2 text-text-primary placeholder-text-secondary focus:outline-none focus:border-secondary-500 transition-colors duration-150"
            />
            <button
              type="submit"
              className="p-2 hover:bg-surface rounded-full transition-colors duration-150"
              aria-label="Search"
            >
              <Icon name="Search" size={20} />
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default TopHeader;