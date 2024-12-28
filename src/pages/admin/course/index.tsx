import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const routes = useRouter()
  const fetchCourses = async (page: number) => {
    setError(null);
    try {
      const response = await fetch(`/api/courses?page=${page}&limit=5`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      console.log(data);
      
      setCourses(data.data);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      
      setError((err as Error).message);
    }
  };

  const handleDelete = async (courseId: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(`/api/courses/${courseId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setCourses(courses.filter((course: any) => course._id !== courseId));
        } else {
          const data = await response.json();
          setError(data.message || "Error deleting job");
        }
      } catch (error) {
        setError("An error occurred while deleting the job.");
      }
    }
  };

  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold mb-4">Course List</h1>
      <button onClick={e=>routes.push("/admin/course/add")} className="bg-black p-2 text-white rounded-md">Add Courses</button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course:any) => (
            <tr key={course._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{course.title}</td>
              <td className="border border-gray-300 px-4 py-2">{course.description}</td>
              <td className="border border-gray-300 px-4 py-2">{course.category}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  onClick={() => routes.push(`/admin/course/edit/${course._id}`)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 mx-2 text-white px-4 py-1 rounded hover:bg-red-600"
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
