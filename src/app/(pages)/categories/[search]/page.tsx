/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Footer from "@/app/components/global/Footer";
import Navbar from "@/app/components/global/Navbar";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CategoryPage() {
  interface IBlog {
    _id: string;
    title: string;
    author: string;
    category: string;
    thumbnail: string;
    tags: string[];
    likes: number;
    createdAt: string;
    updatedAt: string;
  }

  interface ICourse {
    _id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    link: string;
    thumbnail: string;
    duration: string;
    createdAt: string;
    updatedAt: string;
  }

  interface IJob {
    _id: string;
    company: string;
    location: string;
    title: string;
    description: string;
    requirement: string;
    category: string;
    yearsOfExperience: number;
    jobType: string;
    link: string;
    tags: string[];
    by: string | null;
    approved: boolean | null;
    createdAt: string;
    updatedAt: string;
  }

  interface ICategory {
    _id: string;
    title: string;
    desc: string;
    bg: string;
    icon: string;
    count: number;
  }
  const [category, setCategory] = useState<ICategory | null>(null);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { search } = useParams();

  const fetchCategories = async () => {
    setError(null);
    try {
      const response = await fetch(`/api/category?category=${search}`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategory(data.category);
      setBlogs(data.blogs.items);
      setCourses(data.courses.items);
      setJobs(data.jobs.items);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [search]);

  return (
    <div>
      <Navbar />
      {/* Category Section */}
      <section className="mt-24 ">
        <div className="flex justify-center items-center">
          <div className="max-w-xl md:h-[200px] p-4 md:flex justify-center md:mx-4 mx-0">
            <div className="md:mx-0 bg-gray-100 p-3 w-full h-full flex justify-center items-center rounded-md shadow-md">
              {category ? (
                <img
                  className="h-[80px] w-[80px]"
                  src={window.location.origin + "/images/" + category.icon}
                  alt=""
                />
              ) : (
                ""
              )}
            </div>
            <div className="md:mx-8 mt-4 md:mt-0">
              <h1 className="text-xl md:text-3xl font-bold text-left">
                {category?.title[0]?.toUpperCase()}
                {category?.title.slice(1)}
              </h1>
              <p className="text-justify my-2 text-gray-600">
                {category?.desc}
              </p>
              <p className="font-bold text-gray-800">{category?.count} posts</p>
            </div>
          </div>
        </div>
      </section>
      {/* Courses Section */}
      <section className="mt-8 md:mx-16">
        <Link
          className="flex items-center gap-2 mb-4"
          href={`/categories/${search}/course`}
        >
          <h2 className="text-2xl font-bold">Courses</h2>
          <ArrowUpRight />
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course._id} className="border w-80 rounded-md shadow-md">
              <img
                src={window.location.origin + "/images/" + course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mt-2">{course.title}</h3>
                <div className="flex items-cenyter gap-2  my-2">
                  <p className="text-gray-100 bg-blue-400 px-2 py-1 rounded-md w-fit text-xs ">
                    {course.category}
                  </p>
                  <div className="flex items-center">
                    <Clock className="mr-2" size={20} />
                    <p className="text-gray-600">{course.duration}</p>
                  </div>
                </div>
                <p className="text-gray-600 line-clamp-3">
                  {course.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Blogs Section */}
      <section className="mt-8 md:mx-16">
      <Link
          className="flex items-center gap-2 mb-4"
          href={`/categories/${search}/blog`}
        >
          <h2 className="text-2xl font-bold">Blogs</h2>
          <ArrowUpRight />
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="w-80 border rounded-md shadow-md">
              <img
                src={window.location.origin + "/images/" + blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mt-2">{blog.title}</h3>
                <div className="flex items-center my-2 gap-2">
                  <p className="text-gray-100 bg-blue-400 px-2 py-1 rounded-md w-fit text-xs ">
                    {blog.category}
                  </p>
                  <p className="text-gray-800 text-sm">By {blog.author}</p>
                </div>
                <p className="text-gray-600">{blog.likes} likes</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Jobs Section */}
      <section className="mt-8 md:mx-16">
      <Link
          className="flex items-center gap-2 mb-4"
          href={`/categories/${search}/course`}
        >
          <h2 className="text-2xl font-bold">Jobs</h2>
          <ArrowUpRight />
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div key={job._id} className="p-4 w-80  border rounded-md shadow-md">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-600">{job.location}</p>
              <p className="text-gray-600">
                {job.yearsOfExperience} years of experience
              </p>
              <p className="text-gray-600">{job.jobType}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
}
