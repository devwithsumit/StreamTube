import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CommunitySection = ({ posts }) => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [votedPolls, setVotedPolls] = useState(new Set());

  const handleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const handleVote = (postId, optionIndex) => {
    if (!votedPolls.has(postId)) {
      setVotedPolls(new Set([...votedPolls, postId]));
    }
  };

  const PostCard = ({ post }) => (
    <div className="bg-surface rounded-lg p-6 space-y-4">
      {/* Post Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={16} color="white" />
        </div>
        <div>
          <h3 className="font-medium text-text-primary">TechMaster Pro</h3>
          <p className="text-xs text-text-secondary">{post.timestamp}</p>
        </div>
      </div>

      {/* Post Content */}
      {post.type === 'text' && (
        <div className="space-y-3">
          <p className="text-text-primary whitespace-pre-line">{post.content}</p>
        </div>
      )}

      {post.type === 'image' && (
        <div className="space-y-3">
          <p className="text-text-primary">{post.content}</p>
          <div className="aspect-video bg-background rounded-md overflow-hidden">
            <Image
              src={post.image}
              alt="Community post"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {post.type === 'poll' && (
        <div className="space-y-4">
          <h4 className="text-text-primary font-medium">{post.question}</h4>
          <div className="space-y-2">
            {post.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleVote(post.id, index)}
                disabled={votedPolls.has(post.id)}
                className={`w-full text-left p-3 rounded-md border transition-colors duration-150 ${
                  votedPolls.has(post.id)
                    ? 'border-white/20 bg-surface-700 cursor-default' :'border-white/20 hover:border-white/40 hover:bg-surface-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-text-primary text-sm">{option.text}</span>
                  {votedPolls.has(post.id) && (
                    <span className="text-text-secondary text-sm">{option.percentage}%</span>
                  )}
                </div>
                {votedPolls.has(post.id) && (
                  <div className="mt-2 w-full bg-background rounded-full h-1">
                    <div
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${option.percentage}%` }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
          {votedPolls.has(post.id) && (
            <p className="text-xs text-text-secondary">
              {post.totalVotes.toLocaleString()} votes
            </p>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center space-x-6 pt-2 border-t border-white/10">
        <button
          onClick={() => handleLike(post.id)}
          className={`flex items-center space-x-2 transition-colors duration-150 ${
            likedPosts.has(post.id)
              ? 'text-primary' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon 
            name={likedPosts.has(post.id) ? 'Heart' : 'Heart'} 
            size={16} 
            className={likedPosts.has(post.id) ? 'fill-current' : ''}
          />
          <span className="text-sm">
            {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
          </span>
        </button>

        <button className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors duration-150">
          <Icon name="MessageCircle" size={16} />
          <span className="text-sm">{post.comments}</span>
        </button>

        <button className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors duration-150">
          <Icon name="Share" size={16} />
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-2">Community</h2>
        <p className="text-text-secondary text-sm">
          Posts and updates from TechMaster Pro
        </p>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load More */}
      {posts.length > 0 && (
        <div className="flex justify-center pt-4">
          <button className="flex items-center space-x-2 px-6 py-3 bg-surface text-text-primary rounded-full hover:bg-surface-700 transition-colors duration-150">
            <Icon name="RotateCcw" size={16} />
            <span>Load more posts</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MessageSquare" size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No community posts yet</h3>
          <p className="text-text-secondary text-sm max-w-md mx-auto">
            This channel hasn't shared any community posts yet. Check back later for updates and discussions.
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunitySection;