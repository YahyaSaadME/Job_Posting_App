/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// Define types for Blogs and Courses
type Blog = {
  _id: string;
  title: string;
};

type Course = {
  _id: string;
  title: string;
};

const Footer = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]); // Use defined Blog type
  const [courses, setCourses] = useState<Course[]>([]); // Use defined Course type
  const [error, setError] = useState<string | null>(null); // Error state for fetch failure

  useEffect(() => {
    const get = async () => {
      try {
        const req = await fetch("/api/latest");
        
        // Check for HTTP errors
        if (!req.ok) {
          setError(`Failed to fetch data. Status: ${req.status}`);
          return;
        }
        
        // Try parsing JSON response
        const res = await req.json();
        
        // Check if response data exists
        if (!res.blogs || !res.courses) {
          setError("No blogs or courses available.");
          return;
        }
        
        setBlogs(res.blogs);
        setCourses(res.courses);
      } catch (err) {
        setError("Failed to load the latest blogs and courses.");
        console.error("Error fetching data:", err);
      }
    };

    get();
  }, []);

  return (
    <footer className="text-gray-900 py-10 mt-16 border-t border-y-4 border-gray-950 pt-10 mx-16">
      {/* Footer Container */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-14">
        {/* Brand / Subscription */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Shiv InfoSec</h2>
       
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-xl font-bold mb-4">Top Blogs</h4>
          <ul className="space-y-2">
            {error ? (
              <li className="text-red-500">{error}</li>
            ) : blogs.length > 0 ? (
              blogs.map((item) => (
                <li key={item._id} className="hover:text-gray-700 cursor-pointer">
                  <Link href={`/blog/${item._id}`}>{item.title}</Link>
                </li>
              ))
            ) : (
              <li>No blogs available</li>
            )}
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Latest Course</h4>
          <ul className="space-y-2">
            {error ? (
              <li className="text-red-500">{error}</li>
            ) : courses.length > 0 ? (
              courses.map((item) => (
                <li key={item._id} className="hover:text-gray-700 cursor-pointer">
                  <Link href={`/free-courses/${item._id}`}>{item.title}</Link>
                </li>
              ))
            ) : (
              <li>No courses available</li>
            )}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t border-gray-300 pt-4">
        <p>© 2025 Shiv InfoSec.</p>
      </div>
    </footer>
  );
};

export default Footer;
