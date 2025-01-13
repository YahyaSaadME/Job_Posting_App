/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
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

  const [items, setItems] = useState<IBlog[] | ICourse[] | IJob[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { search, type } = useParams();

  const fetchCategories = async (page: number) => {
    setError(null);
    try {
      const response = await fetch(`/api/category/take?category=${search}&type=${type}&page=${page}&limit=20`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      console.log(data);
      
      setItems(data.items);
      setTotalPages(data.pages);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchCategories(page);
  }, [search, type, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <Navbar />
      {/* Items Section */}
      <section className="mt-24 mx-8">
          <h1 className="text-center text-xl md:text-4xl text-center font-bold my-4">{typeof type === 'string' ? type.charAt(0).toUpperCase() + type.slice(1) : ''}s</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {items.map((item: IBlog | ICourse | IJob) => (
            <div key={item._id} className="border rounded-md shadow-md">
              {type === "course" && (
                <>
                  <img
                    src={window.location.origin + "/images/" + (item as ICourse).thumbnail}
                    alt={(item as ICourse).title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mt-2">{(item as ICourse).title}</h3>
                    <div className="flex items-center gap-2 my-2">
                      <p className="text-gray-100 bg-blue-400 px-2 py-1 rounded-md w-fit text-xs ">
                        {(item as ICourse).category}
                      </p>
                      <div className="flex items-center">
                        <Clock className="mr-2" size={20} />
                        <p className="text-gray-600">{(item as ICourse).duration}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 line-clamp-3">{(item as ICourse).description}</p>
                  </div>
                </>
              )}
              {type === "blog" && (
                <>
                  <img
                    src={window.location.origin + "/images/" + (item as IBlog).thumbnail}
                    alt={(item as IBlog).title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mt-2">{(item as IBlog).title}</h3>
                    <div className="flex items-center my-2 gap-2">
                      <p className="text-gray-100 bg-blue-400 px-2 py-1 rounded-md w-fit text-xs ">
                        {(item as IBlog).category}
                      </p>
                      <p className="text-gray-800 text-sm">By {(item as IBlog).author}</p>
                    </div>
                    <p className="text-gray-600">{(item as IBlog).likes} likes</p>
                  </div>
                </>
              )}
              {type === "job" && (
                <div className="p-4">
                  <h3 className="text-xl font-bold">{(item as IJob).title}</h3>
                  <p className="text-gray-600">{(item as IJob).company}</p>
                  <p className="text-gray-600">{(item as IJob).location}</p>
                  <p className="text-gray-600">{(item as IJob).yearsOfExperience} years of experience</p>
                  <p className="text-gray-600">{(item as IJob).jobType}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 mx-2">{page} of {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}