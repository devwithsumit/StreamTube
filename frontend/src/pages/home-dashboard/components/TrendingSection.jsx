import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import VideoCard from 'components/ui/VideoCard';

const TrendingSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const trendingVideos = [
    {
      id: 'trending-1',
      title: 'Breaking: Major Tech Announcement Changes Everything',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=338&fit=crop',
      duration: '8:45',
      views: '5.2M',
      uploadTime: '3 hours ago',
      channel: {
        name: 'Tech News Daily',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        verified: true
      },
      trending: true
    },
    {
      id: 'trending-2',
      title: 'Viral Dance Challenge Takes Over Social Media',
      thumbnail: 'https://images.pexels.com/photos/1701194/pexels-photo-1701194.jpeg?w=600&h=338&fit=crop',
      duration: '3:22',
      views: '12.8M',
      uploadTime: '1 day ago',
      channel: {
        name: 'Dance Central',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=40&h=40&fit=crop&crop=face',
        verified: true
      },
      trending: true
    },
    {
      id: 'trending-3',
      title: 'Celebrity Interview Reveals Shocking Truth',
      thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=338&fit=crop',
      duration: '25:15',
      views: '8.9M',
      uploadTime: '6 hours ago',
      channel: {
        name: 'Entertainment Tonight',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        verified: true
      },
      trending: true
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % trendingVideos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + trendingVideos.length) % trendingVideos.length);
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-text-primary">Trending</h2>
        </div>
        <Link
          to="/search-results-page?trending=true"
          className="text-sm text-secondary hover:text-secondary-400 transition-colors duration-150"
        >
          View all
        </Link>
      </div>

      {/* Desktop Trending Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {trendingVideos.map((video, index) => (
          <div key={video.id} className="relative">
            <VideoCard video={video} layout="grid" showChannel={true} />
            <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
              <Icon name="TrendingUp" size={12} />
              <span>#{index + 1}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Trending Carousel */}
      <div className="md:hidden relative">
        <div className="overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {trendingVideos.map((video, index) => (
              <div key={video.id} className="w-full flex-shrink-0 relative">
                <Link to={`/video-watch-page?v=${video.id}`} className="block">
                  <div className="relative aspect-video bg-surface rounded-lg overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/assets/images/no_image.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Trending Badge */}
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                      <Icon name="TrendingUp" size={12} />
                      <span>#{index + 1} Trending</span>
                    </div>
                    
                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    
                    {/* Video Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-medium text-sm line-clamp-2 mb-2">{video.title}</h3>
                      <div className="flex items-center justify-between text-xs opacity-90">
                        <div className="flex items-center space-x-2">
                          <span>{video.channel.name}</span>
                          {video.channel.verified && (
                            <Icon name="CheckCircle" size={12} />
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>{video.views} views</span>
                          <span>•</span>
                          <span>{video.uploadTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-150"
          aria-label="Previous trending video"
        >
          <Icon name="ChevronLeft" size={16} />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-150"
          aria-label="Next trending video"
        >
          <Icon name="ChevronRight" size={16} />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-4">
          {trendingVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-150 ${
                index === currentSlide ? 'bg-primary' : 'bg-surface-700'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;