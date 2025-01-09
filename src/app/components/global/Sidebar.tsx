import React from 'react';
import Link from 'next/link';
import { Plus, Eye } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
      <nav className="flex flex-col p-4 space-y-4">
        <Link href="/admin/add-job">
          <a className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <Plus />
            <span>Add Job</span>
          </a>
        </Link>
        <Link href="/admin/view-jobs">
          <a className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <Eye />
            <span>View Jobs</span>
          </a>
        </Link>
        <Link href="/admin/add-course">
          <a className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <Plus />
            <span>Add Course</span>
          </a>
        </Link>
        <Link href="/admin/view-courses">
          <a className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <Eye />
            <span>View Courses</span>
          </a>
        </Link>
        <Link href="/admin/add-blog">
          <a className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <Plus />
            <span>Add Blog</span>
          </a>
        </Link>
        <Link href="/admin/view-blogs">
          <a className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
            <Eye />
            <span>View Blogs</span>
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;