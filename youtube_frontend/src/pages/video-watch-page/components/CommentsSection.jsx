import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CommentsSection = ({ comments, videoId }) => {
  const [sortBy, setSortBy] = useState('top');
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [expandedComments, setExpandedComments] = useState(new Set());

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Handle comment submission
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  const handleSubmitReply = (e, commentId) => {
    e.preventDefault();
    if (replyText.trim()) {
      // Handle reply submission
      console.log('Reply to comment:', commentId, replyText);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const handleLikeComment = (commentId) => {
    // Handle comment like
    console.log('Like comment:', commentId);
  };

  const toggleReplies = (commentId) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const CommentItem = ({ comment, isReply = false }) => (
    <div className={`flex space-x-3 ${isReply ? 'ml-12' : ''}`}>
      <Image
        src={comment.author.avatar}
        alt={comment.author.name}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-text-primary text-sm">
            {comment.author.name}
          </span>
          {comment.author.verified && (
            <Icon name="CheckCircle" size={12} className="text-text-secondary" />
          )}
          {comment.author.isChannelOwner && (
            <span className="px-2 py-0.5 bg-surface-700 text-xs rounded-full text-text-secondary">
              Creator
            </span>
          )}
          <span className="text-text-secondary text-xs">{comment.timestamp}</span>
        </div>
        
        <p className="text-text-primary text-sm mb-2 leading-relaxed">
          {comment.content}
        </p>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleLikeComment(comment.id)}
            className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors duration-150"
          >
            <Icon name="ThumbsUp" size={14} />
            <span className="text-xs">{formatNumber(comment.likes)}</span>
          </button>
          
          <button className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors duration-150">
            <Icon name="ThumbsDown" size={14} />
          </button>
          
          {!isReply && (
            <button
              onClick={() => setReplyingTo(comment.id)}
              className="text-text-secondary hover:text-text-primary transition-colors duration-150 text-xs font-medium"
            >
              Reply
            </button>
          )}
          
          <button className="text-text-secondary hover:text-text-primary transition-colors duration-150">
            <Icon name="MoreHorizontal" size={14} />
          </button>
        </div>
        
        {/* Reply Form */}
        {replyingTo === comment.id && (
          <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-3">
            <div className="flex space-x-3">
              <Image
                src="/assets/images/no_image.png"
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Add a reply..."
                  className="w-full bg-transparent border-b border-white/20 focus:border-secondary-500 outline-none text-text-primary text-sm py-2 resize-none"
                  rows="2"
                />
                <div className="flex items-center justify-end space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setReplyingTo(null);
                      setReplyText('');
                    }}
                    className="px-4 py-1 text-text-secondary hover:text-text-primary transition-colors duration-150 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="px-4 py-1 bg-secondary text-white rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-700 transition-colors duration-150"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
        
        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => toggleReplies(comment.id)}
              className="flex items-center space-x-2 text-secondary hover:text-secondary-400 transition-colors duration-150 text-sm font-medium mb-3"
            >
              <Icon
                name={expandedComments.has(comment.id) ? 'ChevronUp' : 'ChevronDown'}
                size={16}
              />
              <span>
                {expandedComments.has(comment.id) ? 'Hide' : 'Show'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </span>
            </button>
            
            {expandedComments.has(comment.id) && (
              <div className="space-y-4">
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} isReply={true} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      {/* Comments Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {comments.length} Comments
        </h3>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSortBy('top')}
            className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors duration-150 ${
              sortBy === 'top' ?'bg-surface text-text-primary' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="TrendingUp" size={16} />
            <span className="text-sm font-medium">Top comments</span>
          </button>
          
          <button
            onClick={() => setSortBy('newest')}
            className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors duration-150 ${
              sortBy === 'newest' ?'bg-surface text-text-primary' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name="Clock" size={16} />
            <span className="text-sm font-medium">Newest first</span>
          </button>
        </div>
      </div>
      
      {/* Add Comment */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex space-x-3">
          <Image
            src="/assets/images/no_image.png"
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full bg-transparent border-b border-white/20 focus:border-secondary-500 outline-none text-text-primary py-2 resize-none"
              rows="2"
            />
            <div className="flex items-center justify-end space-x-2 mt-2">
              <button
                type="button"
                onClick={() => setNewComment('')}
                className="px-4 py-1 text-text-secondary hover:text-text-primary transition-colors duration-150 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-1 bg-secondary text-white rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-700 transition-colors duration-150"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;