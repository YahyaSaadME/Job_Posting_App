import React from 'react';
import Sidebar from './global/Sidebar';

import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;