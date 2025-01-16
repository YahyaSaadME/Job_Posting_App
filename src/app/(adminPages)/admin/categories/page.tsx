/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import ClipLoader from 'react-spinners/ClipLoader';
import Link from "next/link";

const CategoriesList = () => {
  const { data: session, status }: any = useSession();
  const router = useRouter();
  const adminEmail ="shivinfosec15@gmail.com"
  const userEmail = session?.user?.email;
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const routes = useRouter();

  const fetchCategories = async (page: number) => {
    setError(null);
    try {
      const response = await fetch(
        `/api/categories?page=${page}&limit=5&search=${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data.categories);
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

  const handleDelete = async (categoryId: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(`/api/categories/${categoryId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setCategories(categories.filter((category: any) => category._id !== categoryId));
        } else {
          const data = await response.json();
          setError(data.message || "Error deleting category");
        }
      } catch (error) {
        setError("An error occurred while deleting the category.");
      }
    }
  };

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage, search]);
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#2563eb" size={60} />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p className="text-red-600">You need to be authenticated to view this page.</p>
      </div>
    );
  }

  if (userEmail !== adminEmail) {
    return (
      <div className="flex mt-16 mb-6 flex-col justify-center items-center h-screen bg-gray-50 text-black">
        <div className="bg-red-400 p-6 rounded-md shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
          <p>This page is a protected route for admin only. You cant access the features.</p>
        </div>
   <Link href={"/sign-up"}>
          <div className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300">
            Sign Up
          </div>
        </Link>
      </div>
    );
  }
  return (
    <>
      <div className="container min-h-screen mx-auto mt-10 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Category List</h1>
          <button
            onClick={() => routes.push("/admin/categories/add")}
            className="bg-black p-2 text-white rounded-md"
          >
            Add Category
          </button>
        </div>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by title..."
          className="w-full p-2 border rounded-md mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Background</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Count</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category: any) => (
              <tr key={category._id}>
                <td className="border px-4 py-2 text-justify">{category.title}</td>
                <td className="border px-4 py-2 text-justify">{category.desc}</td>
                <td className="border px-4 py-2"><div className="flex justify-center items-center"><img className="w-[100px]" src={window.location.origin+"/images/"+category.bg} alt="" /> </div></td>
                <td className="border px-4 py-2"><div className="flex justify-center items-center"><img className="w-[80px]" src={window.location.origin+"/images/"+category.icon} alt=""/></div></td>
                <td className="border px-4 py-2 text-center">{category.count}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 m-1"
                    onClick={() => routes.push(`/admin/categories/edit/${category._id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 mx-2 text-white px-4 py-1 rounded hover:bg-red-600 m-1"
                    onClick={() => handleDelete(category._id)}
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

export default CategoriesList;