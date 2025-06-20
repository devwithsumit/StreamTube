import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import VideoCard from 'components/ui/VideoCard';
import TrendingSection from './components/TrendingSection';
import CategoryChips from './components/CategoryChips';
import SubscriptionsFeed from './components/SubscriptionsFeed';
import { mockVideos } from 'data/mockData';
import VideoSkeleton from './components/VideoSkeleton';
import { useGenerateMoreVideos } from 'hooks/useGenerateMoreVideos';

const HomeDashboard = () => {

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerRef = useRef();

  // Generate more mock videos for infinite scroll
  const generateMoreVideos = useGenerateMoreVideos();

  // Mock video data

  // Initialize videos
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideos(mockVideos);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMoreVideos();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore]);

  const loadMoreVideos = async () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    
    // Simulate API call
    setTimeout(() => {
      const newVideos = generateMoreVideos(videos.length + 1);
      setVideos(prev => [...prev, ...newVideos]);
      setPage(prev => prev + 1);
      setLoadingMore(false);
      
      // Stop loading after 5 pages
      if (page >= 5) {
        setHasMore(false);
      }
    }, 1500);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setLoading(true);
    
    // Simulate category filtering
    setTimeout(() => {
      if (category === 'All') {
        setVideos(mockVideos);
      } else {
        const filteredVideos = mockVideos.filter(video => 
          video.title.toLowerCase().includes(category.toLowerCase()) ||
          video.channel.name.toLowerCase().includes(category.toLowerCase())
        );
        setVideos(filteredVideos.length > 0 ? filteredVideos : mockVideos.slice(0, 4));
      }
      setLoading(false);
      setPage(1);
      setHasMore(true);
    }, 800);
  };

  const handleRefresh = () => {
    setLoading(true);
    setPage(1);
    setHasMore(true);
    
    setTimeout(() => {
      setVideos([...mockVideos].sort(() => Math.random() - 0.5));
      setLoading(false);
    }, 1000);
  };

  // Skeleton loader component
  // VideoSkeleton

  return (
    <div className="min-h-screen bg-background">
      {/* Category Chips */}
      <div className="sticky top-16 z-30 bg-background border-b border-white/10 py-3">
        <CategoryChips 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="max-w-full px-4 py-6">
        {/* Trending Section */}
        <TrendingSection />

        {/* Subscriptions Feed for authenticated users */}
        <SubscriptionsFeed />

        {/* Main Video Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">
              {selectedCategory === 'All' ? 'Recommended' : selectedCategory}
            </h2>
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-colors duration-150"
              aria-label="Refresh videos"
            >
              <Icon name="RefreshCw" size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 12 }).map((_, index) => (
                <VideoSkeleton key={index} />
              ))
            ) : (
              videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  layout="grid"
                  showChannel={true}
                />
              ))
            )}
          </div>

          {/* Load More Trigger */}
          {hasMore && !loading && (
            <div ref={observerRef} className="mt-8 flex justify-center">
              {loadingMore ? (
                <div className="flex items-center space-x-2 text-text-secondary">
                  <Icon name="Loader2" size={20} className="animate-spin" />
                  <span>Loading more videos...</span>
                </div>
              ) : (
                <button
                  onClick={loadMoreVideos}
                  className="px-6 py-2 bg-surface hover:bg-surface-700 text-text-primary rounded-md transition-colors duration-150"
                >
                  Load More Videos
                </button>
              )}
            </div>
          )}

          {/* End of content message */}
          {!hasMore && !loading && (
            <div className="mt-8 text-center">
              <p className="text-text-secondary">You've reached the end of the feed</p>
              <button
                onClick={handleRefresh}
                className="mt-2 text-secondary hover:text-secondary-400 transition-colors duration-150"
              >
                Refresh to see new content
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions - Mobile */}
        <div className="fixed bottom-4 right-4 lg:hidden">
          <Link
            to="/video-upload-studio"
            className="w-14 h-14 bg-primary hover:bg-primary-700 rounded-full flex items-center justify-center shadow-elevation-2 transition-colors duration-150"
            aria-label="Upload video"
          >
            <Icon name="Plus" size={24} color="white" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;