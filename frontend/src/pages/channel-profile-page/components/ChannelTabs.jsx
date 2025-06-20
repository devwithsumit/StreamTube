import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';

const ChannelTabs = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabsRef = useRef(null);

  const tabs = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'videos', label: 'Videos', icon: 'Video' },
    { id: 'playlists', label: 'Playlists', icon: 'List' },
    { id: 'community', label: 'Community', icon: 'MessageSquare' },
    { id: 'about', label: 'About', icon: 'Info' }
  ];

  useEffect(() => {
    if (tabsRef.current && activeTab) {
      const activeTabElement = tabsRef.current.querySelector(`[data-tab="${activeTab}"]`);
      if (activeTabElement) {
        activeTabElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeTab]);

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    const searchParams = new URLSearchParams(location.search);
    if (tabId === 'home') {
      searchParams.delete('tab');
    } else {
      searchParams.set('tab', tabId);
    }
    const newSearch = searchParams.toString();
    navigate(`${location.pathname}${newSearch ? `?${newSearch}` : ''}`, { replace: true });
  };

  return (
    <div className="border-b border-white/10 sticky top-16 bg-background z-30">
      <div className="px-4 lg:px-6">
        {/* Desktop Tabs */}
        <div className="hidden md:flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 transition-all duration-150 ${
                activeTab === tab.id
                  ? 'border-text-primary text-text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Tabs */}
        <div className="md:hidden">
          <div
            ref={tabsRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide py-3"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                data-tab={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-150 ${
                  activeTab === tab.id
                    ? 'bg-surface text-text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelTabs;