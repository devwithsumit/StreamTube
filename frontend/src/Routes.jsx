import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import TopHeader from "components/ui/TopHeader";
import SidebarNavigation from "components/ui/SidebarNavigation";

// Page imports
import HomeDashboard from "pages/home-dashboard";
import VideoWatchPage from "pages/video-watch-page";
import VideoUploadStudio from "pages/video-upload-studio";
import ChannelProfilePage from "pages/channel-profile-page";
import SearchResultsPage from "pages/search-results-page";
import UserAuthentication from "pages/user-authentication";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <div className="min-h-screen bg-background">
          <TopHeader />
          <SidebarNavigation />
          <main className="lg:ml-60 pt-16">
            <RouterRoutes>
              <Route path='/' element={<HomeDashboard />} />
              <Route path="/home-dashboard" element={<HomeDashboard />} />
              <Route path="/video-watch-page" element={<VideoWatchPage />} />
              <Route path="/video-upload-studio" element={<VideoUploadStudio />} />
              <Route path="/channel-profile-page" element={<ChannelProfilePage />} />
              <Route path="/search-results-page" element={<SearchResultsPage />} />
              <Route path="/user-authentication" element={<UserAuthentication />} />
            </RouterRoutes>
          </main>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;