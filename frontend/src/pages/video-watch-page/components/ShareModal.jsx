import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const ShareModal = ({ isOpen, onClose, video }) => {
  const [copied, setCopied] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [includeStartTime, setIncludeStartTime] = useState(false);
  
  const modalRef = useRef(null);
  const urlInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => urlInputRef.current?.select(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getShareUrl = () => {
    const baseUrl = `${window.location.origin}/video-watch-page?v=${video.id}`;
    if (includeStartTime && startTime) {
      const timeInSeconds = convertTimeToSeconds(startTime);
      return `${baseUrl}&t=${timeInSeconds}s`;
    }
    return baseUrl;
  };

  const convertTimeToSeconds = (timeString) => {
    const parts = timeString.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else if (parts.length === 3) {
      return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    }
    return 0;
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      urlInputRef.current?.select();
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getEmbedCode = () => {
    const embedUrl = `${window.location.origin}/embed/${video.id}`;
    return `<iframe width="560" height="315" src="${embedUrl}" title="${video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  };

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(getEmbedCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy embed code');
    }
  };

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(video.title)}`,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`,
      color: 'hover:bg-blue-700'
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`,
      color: 'hover:bg-blue-800'
    },
    {
      name: 'Reddit',
      icon: 'MessageCircle',
      url: `https://reddit.com/submit?url=${encodeURIComponent(getShareUrl())}&title=${encodeURIComponent(video.title)}`,
      color: 'hover:bg-orange-600'
    },
    {
      name: 'WhatsApp',
      icon: 'MessageSquare',
      url: `https://wa.me/?text=${encodeURIComponent(`${video.title} ${getShareUrl()}`)}`,
      color: 'hover:bg-green-600'
    },
    {
      name: 'Telegram',
      icon: 'Send',
      url: `https://t.me/share/url?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(video.title)}`,
      color: 'hover:bg-blue-500'
    }
  ];

  const handleSocialShare = (platform) => {
    window.open(platform.url, '_blank', 'width=600,height=400');
  };

  if (!isOpen || !video) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-subtle animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="w-full max-w-md bg-surface rounded-lg shadow-elevation-3 animate-scale-in max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-text-primary">Share</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-surface-700 rounded-full transition-colors duration-150"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Social Platforms */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Share on social media</h3>
            <div className="grid grid-cols-3 gap-3">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleSocialShare(platform)}
                  className={`flex flex-col items-center space-y-2 p-3 bg-surface-700 hover:bg-surface-600 rounded-lg transition-colors duration-150 ${platform.color}`}
                >
                  <Icon name={platform.icon} size={20} />
                  <span className="text-xs font-medium">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Copy Link */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Copy link</h3>
            
            {/* Start Time Option */}
            <div className="flex items-center space-x-3 mb-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeStartTime}
                  onChange={(e) => setIncludeStartTime(e.target.checked)}
                  className="w-4 h-4 text-secondary bg-surface border-white/20 rounded focus:ring-secondary-500 focus:ring-2"
                />
                <span className="text-sm text-text-secondary">Start at</span>
              </label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="0:00"
                disabled={!includeStartTime}
                className="input-field text-sm w-20 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex space-x-2">
              <input
                ref={urlInputRef}
                type="text"
                value={getShareUrl()}
                readOnly
                className="input-field flex-1 text-sm"
              />
              <button
                onClick={handleCopyUrl}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-150 ${
                  copied
                    ? 'bg-success text-white' :'bg-secondary text-white hover:bg-secondary-700'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Embed Code */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Embed</h3>
            <div className="space-y-3">
              <textarea
                value={getEmbedCode()}
                readOnly
                className="input-field w-full text-sm h-20 resize-none"
              />
              <button
                onClick={handleCopyEmbed}
                className="w-full btn-secondary"
              >
                Copy embed code
              </button>
            </div>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Send via email</h3>
            <a
              href={`mailto:?subject=${encodeURIComponent(video.title)}&body=${encodeURIComponent(`Check out this video: ${getShareUrl()}`)}`}
              className="flex items-center space-x-3 p-3 bg-surface-700 hover:bg-surface-600 rounded-lg transition-colors duration-150"
            >
              <Icon name="Mail" size={20} />
              <span className="text-sm font-medium">Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;