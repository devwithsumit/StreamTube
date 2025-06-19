import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import Image from 'components/AppImage';
import VideoPlayer from './components/VideoPlayer';
import VideoMetadata from './components/VideoMetadata';
import VideoDescription from './components/VideoDescription';
import CommentsSection from './components/CommentsSection';
import RelatedVideos from './components/RelatedVideos';
import ShareModal from './components/ShareModal';
import { mockComments, mockRelatedVideos, mockVideo } from 'data/mockData';
import { useKeyboardShortcuts } from 'hooks/useKeyboardShortcuts';

const VideoWatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v') || '1';
  
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [nextVideoCountdown, setNextVideoCountdown] = useState(null);
  
  const playerRef = useRef(null);

  // Mock video data
  //mockVideo
  // mockRelatedVideos
  // mockComments

  useEffect(() => {
    setCurrentVideo(mockVideo);
    setRelatedVideos(mockRelatedVideos);
    setComments(mockComments);
  }, [videoId]);

  //for Video Controls
  useKeyboardShortcuts();

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleLike = () => {
    // Handle like functionality
    console.log('Video liked');
  };

  const handleDislike = () => {
    // Handle dislike functionality
    console.log('Video disliked');
  };

  const handleSubscribe = () => {
    // Handle subscribe functionality
    console.log('Subscribed to channel');
  };

  const startAutoplayCountdown = (nextVideo) => {
    setNextVideoCountdown({ video: nextVideo, timeLeft: 10 });
    
    const interval = setInterval(() => {
      setNextVideoCountdown(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(interval);
          // Navigate to next video
          window.location.href = `/video-watch-page?v=${nextVideo.id}`;
          return null;
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  const cancelAutoplay = () => {
    setNextVideoCountdown(null);
  };

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="aspect-video bg-surface mb-4"></div>
          <div className="h-6 bg-surface rounded mb-2"></div>
          <div className="h-4 bg-surface rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-full">
        {/* Main Content */}
        <div className="lg:flex lg:space-x-6 p-4">
          {/* Left Column - Video Player and Details */}
          <div className="lg:flex-1 lg:max-w-4xl">
            {/* Video Player */}
            <div className="relative mb-4">
              <VideoPlayer
                ref={playerRef}
                video={currentVideo}
                onEnded={() => {
                  if (isAutoplayEnabled && relatedVideos.length > 0) {
                    startAutoplayCountdown(relatedVideos[0]);
                  }
                }}
              />
              
              {/* Autoplay Countdown Overlay */}
              {nextVideoCountdown && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
                  <div className="bg-surface rounded-lg p-6 max-w-sm mx-4 text-center">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      Up next
                    </h3>
                    <div className="flex items-center space-x-3 mb-4">
                      <Image
                        src={nextVideoCountdown.video.thumbnail}
                        alt={nextVideoCountdown.video.title}
                        className="w-20 h-12 object-cover rounded"
                      />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-text-primary line-clamp-2">
                          {nextVideoCountdown.video.title}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {nextVideoCountdown.video.channel.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">
                        Playing in {nextVideoCountdown.timeLeft}s
                      </span>
                      <button
                        onClick={cancelAutoplay}
                        className="px-3 py-1 text-sm bg-surface-700 hover:bg-surface-600 rounded transition-colors duration-150"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Metadata */}
            <VideoMetadata
              video={currentVideo}
              onLike={handleLike}
              onDislike={handleDislike}
              onShare={handleShare}
              onSubscribe={handleSubscribe}
            />

            {/* Video Description */}
            <VideoDescription
              description={currentVideo.description}
              isExpanded={isDescriptionExpanded}
              onToggle={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              uploadDate={currentVideo.uploadDate}
              views={currentVideo.views}
              tags={currentVideo.tags}
            />

            {/* Comments Section */}
            <CommentsSection
              comments={comments}
              videoId={currentVideo.id}
            />
          </div>

          {/* Right Column - Related Videos */}
          <div className="lg:w-80 xl:w-96 mt-8 lg:mt-0">
            <RelatedVideos
              videos={relatedVideos}
              autoplayEnabled={isAutoplayEnabled}
              onAutoplayToggle={() => setIsAutoplayEnabled(!isAutoplayEnabled)}
            />
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        video={currentVideo}
      />
    </div>
  );
};

export default VideoWatchPage;