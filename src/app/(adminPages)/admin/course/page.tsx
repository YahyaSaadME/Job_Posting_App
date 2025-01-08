/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const routes = useRouter();
  const fetchCourses = async (page: number) => {
    setError(null);
    try {
      const response = await fetch(
        `/api/courses?page=${page}&limit=5&search=${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
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

  const handleDelete = async (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await fetch(`/api/courses/${courseId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setCourses(courses.filter((course: any) => course._id !== courseId));
        } else {
          const data = await response.json();
          setError(data.message || "Error deleting course");
        }
      } catch (error) {
        setError("An error occurred while deleting the course.");
      }
    }
  };

  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage,search]);

  return (
    <div className="container min-h-screen mx-auto mt-10 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Course List</h1>
        <button
          onClick={(e) => routes.push("/admin/course/add")}
          className="bg-black p-2 text-white rounded-md"
        >
          Add Courses
        </button>
      </div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by title or category..."
        className="w-full p-2 border rounded-md mb-4"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="min-w-full table-auto border-collapse mb-6">
        <thead>
          <tr>
            <th className="border  px-4 py-2">Title</th>
            <th className="border  px-4 py-2">Description</th>
            <th className="border  px-4 py-2">Category</th>
            <th className="border  px-4 py-2">Duration</th>
            <th className="border  px-4 py-2">Created At</th>
            <th className="border  px-4 py-2">Last Updated</th>
            <th className="border  px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course: any) => (
            <tr key={course._id}>
              <td className="border  px-4 py-2">{course.title}</td>
              <td className="border  px-4 py-2">{course.description}</td>
              <td className="border  px-4 py-2">{course.category}</td>
              <td className="border  px-4 py-2">{course.duration}</td>
              <td className="border  px-4 py-2">
                {new Date(course.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              <td className="border  px-4 py-2">
                {new Date(course.updatedAt).toLocaleString("en-GB", {
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
                  onClick={() =>
                    routes.push(`/admin/course/edit/${course._id}`)
                  }
                >
                  Update
                </button>
                <button
                  className="bg-red-500 mx-2 text-white px-4 py-1 rounded hover:bg-red-600 m-1"
                  onClick={() => handleDelete(course._id)}
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
  );
};

export default CourseList;
