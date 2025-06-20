import React, { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const VideoUploadStudio = () => {
  const [uploadStep, setUploadStep] = useState('upload'); // upload, details, publish
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [],
    visibility: 'public',
    thumbnail: null,
    customThumbnail: null,
    monetization: false,
    commentsEnabled: true,
    ratingsEnabled: true,
    language: 'en',
    scheduledDate: '',
    scheduledTime: ''
  });
  const [tagInput, setTagInput] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [isDraft, setIsDraft] = useState(false);
  
  const fileInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    'Gaming', 'Music', 'Sports', 'Entertainment', 'News & Politics',
    'Education', 'Science & Technology', 'Travel & Events', 'People & Blogs',
    'Comedy', 'Film & Animation', 'Autos & Vehicles', 'Pets & Animals'
  ];

  const suggestedTags = [
    'tutorial', 'review', 'gaming', 'music', 'comedy', 'educational',
    'technology', 'lifestyle', 'travel', 'cooking', 'fitness', 'art'
  ];

  const mockVideoData = {
    title: formData.title || 'Untitled Video',
    description: formData.description || 'No description provided',
    thumbnail: thumbnailPreview || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop',
    duration: '0:00',
    views: '0',
    uploadTime: 'Just uploaded',
    channel: {
      name: 'Your Channel',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      verified: false
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    if (videoFile) {
      handleFileUpload(videoFile);
    }
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Generate thumbnail preview
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.addEventListener('loadedmetadata', () => {
      video.currentTime = 1;
    });
    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const thumbnailUrl = canvas.toDataURL();
      setThumbnailPreview(thumbnailUrl);
      URL.revokeObjectURL(video.src);
    });

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadStep('details');
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Set default title from filename
    setFormData(prev => ({
      ...prev,
      title: file.name.replace(/\.[^/.]+$/, "")
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTagAdd = (tag) => {
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleTagAdd(tagInput.trim());
    }
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          customThumbnail: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDraft = () => {
    setIsDraft(true);
    setTimeout(() => setIsDraft(false), 2000);
  };

  const handlePublish = () => {
    if (!formData.title.trim()) {
      alert('Please enter a title for your video');
      return;
    }
    
    // Simulate publishing
    setUploadStep('publish');
    setTimeout(() => {
      navigate('/channel-profile-page');
    }, 3000);
  };

  const renderUploadStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Upload Video</h1>
        <p className="text-text-secondary">Share your content with the world</p>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-primary bg-primary/5' :'border-white/20 hover:border-white/40'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Upload" size={32} className="text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium text-text-primary mb-2">Uploading...</p>
              <div className="w-full bg-surface-700 rounded-full h-2 mb-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-text-secondary">{Math.round(uploadProgress)}% complete</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-surface-700 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Upload" size={32} className="text-text-secondary" />
            </div>
            <div>
              <p className="text-lg font-medium text-text-primary mb-2">
                Drag and drop video files to upload
              </p>
              <p className="text-text-secondary mb-4">
                Your videos will be private until you publish them.
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary"
              >
                SELECT FILES
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-text-secondary">
        <p>By submitting your videos to StreamTube, you acknowledge that you agree to StreamTube's Terms of Service and Community Guidelines.</p>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Video Details</h1>
          <p className="text-text-secondary">Add information about your video</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSaveDraft}
            className="flex items-center space-x-2 px-4 py-2 border border-white/20 rounded-md hover:bg-surface-700 transition-colors duration-150"
          >
            <Icon name="Save" size={16} />
            <span>{isDraft ? 'Saved!' : 'Save Draft'}</span>
          </button>
          <button
            onClick={handlePublish}
            className="btn-primary"
          >
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Basic Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Add a title that describes your video"
                  className="input-field w-full"
                  maxLength="100"
                />
                <p className="text-xs text-text-secondary mt-1">
                  {formData.title.length}/100
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell viewers about your video"
                  rows="6"
                  className="input-field w-full resize-none"
                  maxLength="5000"
                />
                <p className="text-xs text-text-secondary mt-1">
                  {formData.description.length}/5000
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input-field w-full"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="input-field w-full"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Tags
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagInputKeyPress}
                    placeholder="Add tags to help people find your video"
                    className="input-field w-full"
                  />
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 bg-surface-700 text-text-primary px-2 py-1 rounded-full text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => handleTagRemove(tag)}
                          className="hover:text-error transition-colors duration-150"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-text-secondary">Suggested:</span>
                    {suggestedTags.filter(tag => !formData.tags.includes(tag)).slice(0, 5).map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagAdd(tag)}
                        className="text-xs text-secondary hover:text-secondary-400 transition-colors duration-150"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Thumbnail</h3>
            <p className="text-sm text-text-secondary mb-4">
              Select or upload a picture that shows what's in your video
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                className={`aspect-video bg-surface-700 rounded-md overflow-hidden cursor-pointer border-2 transition-colors duration-150 ${
                  !formData.customThumbnail ? 'border-primary' : 'border-transparent hover:border-white/20'
                }`}
                onClick={() => !formData.customThumbnail && setFormData(prev => ({ ...prev, customThumbnail: null }))}
              >
                {thumbnailPreview && (
                  <Image
                    src={thumbnailPreview}
                    alt="Auto-generated thumbnail"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <div
                className="aspect-video bg-surface-700 rounded-md border-2 border-dashed border-white/20 hover:border-white/40 cursor-pointer flex items-center justify-center transition-colors duration-150"
                onClick={() => thumbnailInputRef.current?.click()}
              >
                <div className="text-center">
                  <Icon name="Plus" size={24} className="text-text-secondary mx-auto mb-1" />
                  <p className="text-xs text-text-secondary">Upload</p>
                </div>
              </div>
            </div>
            
            <input
              ref={thumbnailInputRef}
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              className="hidden"
            />
          </div>

          {/* Visibility */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Visibility</h3>
            
            <div className="space-y-3">
              {[
                { value: 'public', label: 'Public', desc: 'Anyone can search for and view' },
                { value: 'unlisted', label: 'Unlisted', desc: 'Anyone with the link can view' },
                { value: 'private', label: 'Private', desc: 'Only you can view' },
                { value: 'scheduled', label: 'Scheduled', desc: 'Publish at a specific time' }
              ].map(option => (
                <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value={option.value}
                    checked={formData.visibility === option.value}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{option.label}</p>
                    <p className="text-xs text-text-secondary">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            {formData.visibility === 'scheduled' && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleInputChange}
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    name="scheduledTime"
                    value={formData.scheduledTime}
                    onChange={handleInputChange}
                    className="input-field w-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Advanced Settings */}
          <div className="card p-6">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-lg font-semibold text-text-primary">Advanced Settings</h3>
              <Icon name={showAdvanced ? 'ChevronUp' : 'ChevronDown'} size={20} />
            </button>
            
            {showAdvanced && (
              <div className="mt-4 space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="commentsEnabled"
                      checked={formData.commentsEnabled}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <span className="text-sm text-text-primary">Allow comments</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="ratingsEnabled"
                      checked={formData.ratingsEnabled}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <span className="text-sm text-text-primary">Allow likes and dislikes</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="monetization"
                      checked={formData.monetization}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    <span className="text-sm text-text-primary">Enable monetization</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Preview</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded-md transition-colors duration-150 ${
                    previewMode === 'desktop' ? 'bg-primary text-white' : 'hover:bg-surface-700'
                  }`}
                >
                  <Icon name="Monitor" size={16} />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded-md transition-colors duration-150 ${
                    previewMode === 'mobile' ? 'bg-primary text-white' : 'hover:bg-surface-700'
                  }`}
                >
                  <Icon name="Smartphone" size={16} />
                </button>
              </div>
            </div>

            <div className={previewMode === 'mobile' ? 'max-w-xs mx-auto' : ''}>
              <div className="bg-surface-800 rounded-md p-4">
                <div className="aspect-video bg-surface-700 rounded-md overflow-hidden mb-3">
                  <Image
                    src={thumbnailPreview || mockVideoData.thumbnail}
                    alt="Video preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-text-primary line-clamp-2">
                    {mockVideoData.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <span>{mockVideoData.views} views</span>
                    <span>•</span>
                    <span>{mockVideoData.uploadTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-surface-700 rounded-full overflow-hidden">
                      <Image
                        src={mockVideoData.channel.avatar}
                        alt={mockVideoData.channel.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-text-secondary">{mockVideoData.channel.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Upload Progress</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary">Processing</span>
                <Icon name="CheckCircle" size={16} className="text-success" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary">HD Processing</span>
                <Icon name="Clock" size={16} className="text-warning" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Checks</span>
                <Icon name="Clock" size={16} className="text-text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPublishStep = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Video Published!</h1>
        <p className="text-text-secondary">Your video is now live and ready to be discovered</p>
      </div>

      <div className="card p-6 mb-8">
        <div className="aspect-video bg-surface-700 rounded-md overflow-hidden mb-4">
          <Image
            src={thumbnailPreview || mockVideoData.thumbnail}
            alt="Published video"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">{mockVideoData.title}</h3>
        <p className="text-sm text-text-secondary mb-4">
          Video URL: streamtube.com/watch?v=abc123xyz
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-surface-700 rounded-md hover:bg-surface-600 transition-colors duration-150">
            <Icon name="Share" size={16} />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-surface-700 rounded-md hover:bg-surface-600 transition-colors duration-150">
            <Icon name="Copy" size={16} />
            <span>Copy Link</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <Link
          to="/channel-profile-page"
          className="btn-primary"
        >
          View on Channel
        </Link>
        <button
          onClick={() => {
            setUploadStep('upload');
            setUploadedFile(null);
            setThumbnailPreview('');
            setFormData({
              title: '',
              description: '',
              category: '',
              tags: [],
              visibility: 'public',
              thumbnail: null,
              customThumbnail: null,
              monetization: false,
              commentsEnabled: true,
              ratingsEnabled: true,
              language: 'en',
              scheduledDate: '',
              scheduledTime: ''
            });
          }}
          className="flex items-center space-x-2 px-6 py-2 border border-white/20 rounded-md hover:bg-surface-700 transition-colors duration-150"
        >
          <Icon name="Plus" size={16} />
          <span>Upload Another</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 'upload', label: 'Upload', icon: 'Upload' },
              { step: 'details', label: 'Details', icon: 'Edit' },
              { step: 'publish', label: 'Publish', icon: 'CheckCircle' }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-150 ${
                  uploadStep === item.step
                    ? 'border-primary bg-primary text-white'
                    : index < ['upload', 'details', 'publish'].indexOf(uploadStep)
                    ? 'border-success bg-success text-white' :'border-white/20 text-text-secondary'
                }`}>
                  <Icon name={item.icon} size={16} />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  uploadStep === item.step ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {item.label}
                </span>
                {index < 2 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    index < ['upload', 'details', 'publish'].indexOf(uploadStep)
                      ? 'bg-success' :'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {uploadStep === 'upload' && renderUploadStep()}
        {uploadStep === 'details' && renderDetailsStep()}
        {uploadStep === 'publish' && renderPublishStep()}
      </div>
    </div>
  );
};

export default VideoUploadStudio;