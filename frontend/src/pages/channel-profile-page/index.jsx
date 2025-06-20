import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import VideoCard from 'components/ui/VideoCard';
import ChannelHeader from './components/ChannelHeader';
import ChannelTabs from './components/ChannelTabs';
import VideosSection from './components/VideosSection';
import PlaylistsSection from './components/PlaylistsSection';
import CommunitySection from './components/CommunitySection';
import AboutSection from './components/AboutSection';

const ChannelProfilePage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('home');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [isOwner, setIsOwner] = useState(true);

  useEffect(() => {
    const tab = searchParams.get('tab') || 'home';
    setActiveTab(tab);
  }, [searchParams]);

  const channelData = {
    id: 'tech-channel-123',
    name: 'TechMaster Pro',
    handle: '@techmasterpro',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=300&fit=crop',
    subscriberCount: '2.4M',
    videoCount: '1,247',
    verified: true,
    description: `Welcome to TechMaster Pro! 🚀 Your ultimate destination for cutting-edge technology tutorials, reviews, and insights.

Join our community of tech enthusiasts as we explore the latest in software development, AI, cybersecurity, and emerging technologies. From beginner-friendly tutorials to advanced programming concepts, we've got something for everyone.

📅 New videos every Tuesday and Friday
🎯 Focus on practical, real-world applications
💡 Tips and tricks from industry professionals
🔔 Don't forget to subscribe and hit the notification bell!`,
    joinDate: 'Jan 15, 2019',
    location: 'San Francisco, CA',
    links: [
      { name: 'Website', url: 'https://techmasterpro.com', icon: 'Globe' },
      { name: 'Twitter', url: 'https://twitter.com/techmasterpro', icon: 'Twitter' },
      { name: 'GitHub', url: 'https://github.com/techmasterpro', icon: 'Github' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/techmasterpro', icon: 'Linkedin' }
    ],
    stats: {
      totalViews: '45.2M',
      totalVideos: '1,247',
      subscribers: '2.4M',
      joined: 'Jan 2019'
    }
  };

  const featuredVideo = {
    id: 'featured-1',
    title: 'Welcome to TechMaster Pro - Channel Trailer 2024',
    thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=450&fit=crop',
    duration: '2:45',
    views: '125K',
    uploadTime: '1 month ago',
    description: 'Get to know what TechMaster Pro is all about! This channel trailer showcases our mission to make technology accessible to everyone.',
    channel: channelData
  };

  const recentVideos = [
    {
      id: 'video-1',
      title: 'Complete React 18 Tutorial - Build Modern Web Apps',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
      duration: '45:30',
      views: '89K',
      uploadTime: '3 days ago',
      channel: channelData
    },
    {
      id: 'video-2',
      title: 'AI and Machine Learning Explained for Beginners',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
      duration: '28:15',
      views: '156K',
      uploadTime: '1 week ago',
      channel: channelData
    },
    {
      id: 'video-3',
      title: 'Cybersecurity Best Practices in 2024',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop',
      duration: '35:20',
      views: '203K',
      uploadTime: '2 weeks ago',
      channel: channelData
    },
    {
      id: 'video-4',
      title: 'Building Scalable APIs with Node.js and Express',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop',
      duration: '52:10',
      views: '94K',
      uploadTime: '3 weeks ago',
      channel: channelData
    }
  ];

  const playlists = [
    {
      id: 'playlist-1',
      title: 'React Mastery Series',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
      videoCount: 24,
      totalDuration: '8h 45m',
      lastUpdated: '3 days ago'
    },
    {
      id: 'playlist-2',
      title: 'AI & Machine Learning Fundamentals',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
      videoCount: 18,
      totalDuration: '6h 20m',
      lastUpdated: '1 week ago'
    },
    {
      id: 'playlist-3',
      title: 'Cybersecurity Essentials',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop',
      videoCount: 15,
      totalDuration: '4h 55m',
      lastUpdated: '2 weeks ago'
    }
  ];

  const communityPosts = [
    {
      id: 'post-1',
      type: 'text',
      content: `🎉 Exciting news! We just hit 2.4M subscribers! Thank you all for being part of this incredible journey. 

What would you like to see next on the channel? Drop your suggestions in the comments below! 👇`,
      timestamp: '2 days ago',
      likes: 15420,
      comments: 892,
      isLiked: false
    },
    {
      id: 'post-2',
      type: 'poll',
      question: 'Which programming language should we cover next?',
      options: [
        { text: 'Python', votes: 3245, percentage: 35 },
        { text: 'Go', votes: 2156, percentage: 23 },
        { text: 'Rust', votes: 1987, percentage: 21 },
        { text: 'TypeScript', votes: 1954, percentage: 21 }
      ],
      timestamp: '5 days ago',
      totalVotes: 9342,
      hasVoted: false
    },
    {
      id: 'post-3',
      type: 'image',
      content: 'Behind the scenes of our latest video shoot! 📹✨',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      timestamp: '1 week ago',
      likes: 8934,
      comments: 234,
      isLiked: true
    }
  ];

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    if (!isSubscribed) {
      setNotificationEnabled(true);
    }
  };

  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Channel Trailer */}
            <div className="bg-surface rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-text-primary">For new viewers</h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="aspect-video bg-background rounded-lg overflow-hidden">
                  <Link to={`/video-watch-page?v=${featuredVideo.id}`}>
                    <div className="relative w-full h-full group cursor-pointer">
                      <Image
                        src={featuredVideo.thumbnail}
                        alt={featuredVideo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-200" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Icon name="Play" size={24} color="white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                        {featuredVideo.duration}
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-text-primary">{featuredVideo.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {featuredVideo.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span>{featuredVideo.views} views</span>
                    <span>•</span>
                    <span>{featuredVideo.uploadTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Uploads */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">Recent uploads</h2>
                <Link
                  to={`/channel-profile-page?tab=videos`}
                  className="text-secondary hover:text-secondary-400 text-sm font-medium transition-colors duration-150"
                >
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recentVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    showChannel={false}
                    className="hover-scale"
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'videos':
        return <VideosSection channelId={channelData.id} />;

      case 'playlists':
        return <PlaylistsSection playlists={playlists} />;

      case 'community':
        return <CommunitySection posts={communityPosts} />;

      case 'about':
        return <AboutSection channelData={channelData} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Channel Header */}
        <ChannelHeader
          channelData={channelData}
          isSubscribed={isSubscribed}
          notificationEnabled={notificationEnabled}
          isOwner={isOwner}
          onSubscribe={handleSubscribe}
          onNotificationToggle={handleNotificationToggle}
        />

        {/* Channel Tabs */}
        <ChannelTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <div className="px-4 lg:px-6 pb-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ChannelProfilePage;