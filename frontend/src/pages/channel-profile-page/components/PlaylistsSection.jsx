import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PlaylistsSection = ({ playlists }) => {
  const allPlaylists = [
    {
      id: 'playlist-1',
      title: 'React Mastery Series',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
      videoCount: 24,
      totalDuration: '8h 45m',
      lastUpdated: '3 days ago',
      isPublic: true
    },
    {
      id: 'playlist-2',
      title: 'AI & Machine Learning Fundamentals',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
      videoCount: 18,
      totalDuration: '6h 20m',
      lastUpdated: '1 week ago',
      isPublic: true
    },
    {
      id: 'playlist-3',
      title: 'Cybersecurity Essentials',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop',
      videoCount: 15,
      totalDuration: '4h 55m',
      lastUpdated: '2 weeks ago',
      isPublic: true
    },
    {
      id: 'playlist-4',
      title: 'Web Development Bootcamp',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop',
      videoCount: 32,
      totalDuration: '12h 30m',
      lastUpdated: '3 weeks ago',
      isPublic: true
    },
    {
      id: 'playlist-5',
      title: 'JavaScript Deep Dive',
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=225&fit=crop',
      videoCount: 28,
      totalDuration: '9h 15m',
      lastUpdated: '1 month ago',
      isPublic: true
    },
    {
      id: 'playlist-6',
      title: 'Database Design & Management',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop',
      videoCount: 20,
      totalDuration: '7h 40m',
      lastUpdated: '1 month ago',
      isPublic: true
    }
  ];

  const PlaylistCard = ({ playlist }) => (
    <div className="group cursor-pointer">
      <Link to={`/video-watch-page?list=${playlist.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-surface rounded-md overflow-hidden mb-3">
          <Image
            src={playlist.thumbnail}
            alt={playlist.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-200" />
          
          {/* Play Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Icon name="Play" size={20} color="white" />
            </div>
          </div>
          
          {/* Video Count */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
            <Icon name="List" size={12} />
            <span>{playlist.videoCount}</span>
          </div>
        </div>

        {/* Playlist Info */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-text-primary line-clamp-2 group-hover:text-accent transition-colors duration-150">
            {playlist.title}
          </h3>
          
          <div className="flex items-center space-x-2 text-xs text-text-secondary">
            <span>{playlist.videoCount} videos</span>
            <span>•</span>
            <span>{playlist.totalDuration}</span>
          </div>
          
          <p className="text-xs text-text-secondary">
            Updated {playlist.lastUpdated}
          </p>
        </div>
      </Link>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Created playlists</h2>
          <p className="text-text-secondary text-sm">
            {allPlaylists.length} playlist{allPlaylists.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allPlaylists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>

      {/* Empty State */}
      {allPlaylists.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="List" size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No playlists yet</h3>
          <p className="text-text-secondary text-sm max-w-md mx-auto">
            This channel hasn't created any public playlists yet. Check back later for curated video collections.
          </p>
        </div>
      )}
    </div>
  );
};

export default PlaylistsSection;