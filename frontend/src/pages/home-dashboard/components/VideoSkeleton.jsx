import React from 'react'

const VideoSkeleton = () => {
  return (
      <div className="animate-pulse">
          <div className="aspect-video bg-surface rounded-md mb-3"></div>
          <div className="flex space-x-3">
              <div className="w-9 h-9 bg-surface rounded-full flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                  <div className="h-4 bg-surface rounded w-full"></div>
                  <div className="h-3 bg-surface rounded w-3/4"></div>
                  <div className="h-3 bg-surface rounded w-1/2"></div>
              </div>
          </div>
      </div>
  )
}

export default VideoSkeleton