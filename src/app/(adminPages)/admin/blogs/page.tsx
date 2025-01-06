/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const BlogsList = () => {
  const [blogs, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const routes = useRouter();
  const fetchCourses = async (page: number) => {
    setError(null);
    try {
      const response = await fetch(
        `/api/blogs?page=${page}&limit=5&search=${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      setCourses(data.data);
      setCurrentPage(data.page);
      setTotalPages(data.pages);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to page 1 when search changes
  };

  const handleDelete = async (blogId: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(`/api/blogs/${blogId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setCourses(blogs.filter((blog: any) => blog._id !== blogId));
        } else {
          const data = await response.json();
          setError(data.message || "Error deleting blog");
        }
      } catch (error) {
        setError("An error occurred while deleting the blog.");
      }
    }
  };

  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage,search]);

  return (
    <>
    <div className="container min-h-screen mx-auto mt-10 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Blog List</h1>
        <button
          onClick={(e) => routes.push("/admin/blogs/add")}
          className="bg-black p-2 text-white rounded-md"
        >
          Add Blogs
        </button>
      </div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by title or author..."
        className="w-full p-2 border rounded-md mb-4"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="table-auto w-full border-collapse border ">
        <thead>
          <tr>
            <th className="border  px-4 py-2">Title</th>
            <th className="border  px-4 py-2">Author</th>
            <th className="border  px-4 py-2">Category</th>
            <th className="border  px-4 py-2">Created At</th>
            <th className="border  px-4 py-2">Last Updated</th>
            <th className="border  px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog: any) => (
            <tr key={blog._id}>
              <td className="border  px-4 py-2">{blog.title}</td>
              <td className="border  px-4 py-2">{blog.author}</td>
              <td className="border  px-4 py-2">{blog.category}</td>
              <td className="border  px-4 py-2">
                {new Date(blog.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              <td className="border  px-4 py-2">
                {new Date(blog.updatedAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              <td className="border  px-4 py-2 text-center">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 m-1"
                  onClick={() => routes.push(`/admin/blogs/edit/${blog._id}`)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 mx-2 text-white px-4 py-1 rounded hover:bg-red-600 m-1"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
    </>

  );
};

export default BlogsList;
