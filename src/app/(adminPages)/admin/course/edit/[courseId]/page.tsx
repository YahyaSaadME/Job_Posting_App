/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import ClipLoader from 'react-spinners/ClipLoader';
import Link from "next/link";

const UpdateCourse = () => {
  const router = useRouter();
  const { courseId } = useParams();
  const { data: session, status }: any = useSession();
  const adminEmail =process.env.NEXT_PUBLIC_ADMIN
  const userEmail = session?.user?.email;

  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    link: "",
    thumbnail: "",
    duration: "",
    responsibilities: "", // New field
    courseContent: "",    // New field
    prerequisites: "",    // New field
    instructorName: "",   // New field
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) throw new Error("Failed to fetch course details");
        const data = await response.json();
        setCourse(data.data);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleFieldChange = (field: string, value: string | string[]) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setCourse((prev) => ({ ...prev, thumbnail: data.url }));
        setSuccess("Image uploaded successfully!");
      } else {
        setError(data.message || "Error uploading image");
      }
    } catch (error) {
      setError("An error occurred while uploading the image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });

      if (!response.ok) throw new Error("Failed to update course");
      router.push("/admin/course");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="container mx-auto p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Update Course</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={course.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={course.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={course.category}
            onChange={(e) => handleFieldChange("category", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={course.tags.join(", ")}
            onChange={(e) => handleFieldChange("tags", e.target.value.split(",").map(tag => tag.trim()))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Link</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={course.link}
            onChange={(e) => handleFieldChange("link", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Thumbnail</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full border rounded px-3 py-2"
          />
          {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
          {course.thumbnail && (
            <div className="mt-2">
              <img src={window.location.origin+"/images/"+course.thumbnail} alt="Thumbnail" className="w-full h-auto" />
              <button
                type="button"
                onClick={() => handleFieldChange("thumbnail", "")}
                className="mt-2 text-blue-500 underline"
              >
                Change Image
              </button>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Duration</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={course.duration}
            onChange={(e) => handleFieldChange("duration", e.target.value)}
          />
        </div>
        
        {/* New Fields */}
        <div>
          <label className="block text-sm font-medium mb-2">Responsibilities</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={course.responsibilities}
            onChange={(e) => handleFieldChange("responsibilities", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Course Content</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={course.courseContent}
            onChange={(e) => handleFieldChange("courseContent", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Prerequisites</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={course.prerequisites}
            onChange={(e) => handleFieldChange("prerequisites", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Instructors Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={course.instructorName}
            onChange={(e) => handleFieldChange("instructorName", e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
