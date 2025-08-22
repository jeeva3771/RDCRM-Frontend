import React from 'react';
import { useLocation } from 'react-router-dom';
import AppSidebar from '../src/components/AppSidebar';
import AppHeader from '../src/components/AppHeader';

const ConditionalLayout = ({ children }) => {
 const location = useLocation();
  
  // Routes that should NOT show sidebar and header
  const authRoutes = ['/login', '/'];
  const isAuthRoute = authRoutes.includes(location.pathname);

  if (isAuthRoute) {
    // Auth pages - no sidebar/header
    return (
      <div className="">
        {children}
      </div>
    );
  }

  // Regular pages - with sidebar and header
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar - Fixed on the left */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-10">
        <AppSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Header - Fixed at the top of the main content */}
        <div className="fixed top-0 left-64 right-0 h-16 bg-white shadow-md z-10">
          <AppHeader />
        </div>

        {/* Content - Centered with padding to account for fixed header and sidebar */}
        <main className="pt-16 pl-4 pr-4 pb-4 min-h-screen flex justify-center">
          <div className="w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ConditionalLayout;