import React from 'react';
import { AppContent, AppSidebar, AppHeader } from '../src/components/index';
import { DefaultLayoutControllerProps } from '../src/controller/DefaultLayoutController';

// View component
const DefaultLayoutView: React.FC<DefaultLayoutControllerProps> = () => {
  return (
    // <div className="bg-gray-100 flex h-screen font-sans">
    //   <AppSidebar />
    //   <div className="ml-64 flex-1 mb-[10vh]">
    //     <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
    //   </div>
    // </div>
  );
};

export default DefaultLayoutView;