"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [Blogs, setBlogs] = useState([]);
  const [Courses, setCourses] = useState([]);
  useEffect(() => {
    const get = async () => {
      const req = await fetch("/api/latest");
      const res = await req.json();
      setBlogs(res.blogs);
      setCourses(res.courses);
    };
    get();
  }, []);

  return (
    <footer className=" text-gray-900 py-10 mt-16  border-t border-y-4 border-gray-950 pt-10  mx-16">
      {/* Footer Container */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-14">
        {/* Brand / Subscription */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Shiv InfoSec</h2>
          <p className="text-gray-600 mb-4">
            A collection of articles focusing on Networking, Cloud, and
            Automation.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-l-lg border border-gray-300 w-full"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-2 rounded-r-lg font-semibold hover:bg-gray-700"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-xl font-bold mb-4">Latest Blogs</h4>
          <ul className="space-y-2">
            {Blogs.map((item: any, index: number) => (
              <li key={index} className="hover:text-gray-700 cursor-pointer">
                <Link href={`/blog/${item?._id}`}>{item?.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Latest Course</h4>
          <ul className="space-y-2">
            {Courses.map((item: any, index: number) => (
              <li key={index} className="hover:text-gray-700 cursor-pointer">
                <Link href={`/free-courses/${item?._id}`}>{item?.title}</Link>
              </li>
            ))}
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
