import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import { useAuthContext } from 'context/AuthContext';

const SidebarNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(user);
  const location = useLocation();
  const {user, isAuthenticated} = useAuthContext();
  
  // console.log(isAuthenticated);
  useEffect(() => {
    const handleToggleSidebar = () => {
      setIsMobileOpen(!isMobileOpen);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('toggleSidebar', handleToggleSidebar);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('toggleSidebar', handleToggleSidebar);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileOpen]);

  const mainNavItems = [
    { label: 'Home', path: '/home-dashboard', icon: 'Home', authRequired: false },
    { label: 'Trending', path: '/home-dashboard', icon: 'TrendingUp', authRequired: false },
    { label: 'Subscriptions', path: '/home-dashboard', icon: 'Users', authRequired: true },
  ];

  const libraryItems = [
    { label: 'Library', path: '/channel-profile-page', icon: 'BookOpen', authRequired: true },
    { label: 'History', path: '/home-dashboard', icon: 'History', authRequired: true },
    { label: 'Your videos', path: '/channel-profile-page', icon: 'Video', authRequired: true },
    { label: 'Watch later', path: '/home-dashboard', icon: 'Clock', authRequired: true },
    { label: 'Liked videos', path: '/home-dashboard', icon: 'ThumbsUp', authRequired: true },
  ];

  const creatorItems = [
    { label: 'Upload Studio', path: '/video-upload-studio', icon: 'Upload', authRequired: true, creatorOnly: true },
    { label: 'Analytics', path: '/video-upload-studio', icon: 'BarChart3', authRequired: true, creatorOnly: true },
  ];

  const exploreItems = [
    { label: 'Gaming', path: '/search-results-page?category=gaming', icon: 'Gamepad2', authRequired: false },
    { label: 'Music', path: '/search-results-page?category=music', icon: 'Music', authRequired: false },
    { label: 'Sports', path: '/search-results-page?category=sports', icon: 'Trophy', authRequired: false },
    { label: 'News', path: '/search-results-page?category=news', icon: 'Newspaper', authRequired: false },
  ];

  const subscriptions = [
    { name: 'TechChannel', avatar: '/assets/images/no_image.png', isLive: false },
    { name: 'MusicWorld', avatar: '/assets/images/no_image.png', isLive: true },
    { name: 'GameZone', avatar: '/assets/images/no_image.png', isLive: false },
  ];

  const isActive = (path) => {
    if (path === '/home-dashboard' && location.pathname === '/') return true;
    return location.pathname === path;
  };

  const NavItem = ({ item, isCompact = false }) => (
    <Link
      to={item.path}
      className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-150 group ${
        isActive(item.path)
          ? 'bg-surface-700 text-text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-700'
      } ${isCompact ? 'justify-center' : ''}`}
      title={isCompact ? item.label : ''}
    >
      <Icon name={item.icon} size={20} />
      {!isCompact && <span className="text-sm font-medium">{item.label}</span>}
    </Link>
  );

  const SectionTitle = ({ title, isCompact }) => (
    !isCompact && (
      <h3 className="px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wider">
        {title}
      </h3>
    )
  );

  const Divider = () => <div className="border-t border-white/10 my-2" />;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Main Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {mainNavItems.map((item, index) => (
          (!item.authRequired || isAuthenticated) && (
            <NavItem key={item.label} item={item} isCompact={!isExpanded} />
          )
        ))}

        <Divider />

        {/* Library Section */}
        {isAuthenticated && (
          <>
            <SectionTitle title="Library" isCompact={!isExpanded} />
            {libraryItems.map((item) => (
              <NavItem key={item.path + item.label} item={item} isCompact={!isExpanded} />
            ))}
            <Divider />
          </>
        )}

        {/* Creator Tools */}
        {isAuthenticated && (
          <>
            <SectionTitle title="Creator Tools" isCompact={!isExpanded} />
            {creatorItems.map((item) => (
              <NavItem key={item.path + item.label} item={item} isCompact={!isExpanded} />
            ))}
            <Divider />
          </>
        )}

        {/* Explore */}
        <SectionTitle title="Explore" isCompact={!isExpanded} />
        {exploreItems.map((item) => (
          <NavItem key={item.path} item={item} isCompact={!isExpanded} />
        ))}

        {/* Subscriptions */}
        {isAuthenticated && isExpanded && (
          <>
            <Divider />
            <SectionTitle title="Subscriptions" isCompact={false} />
            {subscriptions.map((sub) => (
              <Link
                key={sub.name}
                to="/channel-profile-page"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-700 transition-all duration-150"
              >
                <div className="relative">
                  <div className="w-6 h-6 bg-surface-700 rounded-full flex items-center justify-center">
                    <Icon name="User" size={12} />
                  </div>
                  {sub.isLive && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background"></div>
                  )}
                </div>
                <span className="text-sm font-medium truncate">{sub.name}</span>
              </Link>
            ))}
          </>
        )}

        {/* Sign in prompt for unauthenticated users */}
        {!isAuthenticated && isExpanded && (
          <>
            <Divider />
            <div className="px-3 py-4">
              <p className="text-sm text-text-secondary mb-3">
                Sign in to like videos, comment, and subscribe.
              </p>
              <Link
                to="/user-authentication"
                className="inline-flex items-center space-x-2 px-4 py-2 border border-secondary-500 rounded-full text-secondary-500 hover:bg-secondary-500/10 transition-colors duration-150"
              >
                <Icon name="User" size={16} />
                <span className="text-sm font-medium">Sign in</span>
              </Link>
            </div>
          </>
        )}
      </nav>

      {/* Toggle Button - Desktop Only */}
      <div className="hidden lg:block border-t border-white/10 p-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center p-2 hover:bg-surface-700 rounded-md transition-colors duration-150"
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <Icon name={isExpanded ? 'ChevronLeft' : 'ChevronRight'} size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed overflow-y-auto left-0 top-16 bottom-0 bg-background border-r border-white/10 transition-all duration-200 z-40 ${
          isExpanded ? 'w-60' : 'w-18'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="absolute left-0 top-16 bottom-0 w-60 bg-background border-r border-white/10 animate-slide-in-left">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default SidebarNavigation;