'use client'
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const UpdateCourse = () => {
  const router = useRouter();
  const { courseId } = useParams();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    link: "",
    thumbnail: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleFieldChange = (field: string, value: string) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Course</h1>
      {error && <p className="text-red-500">{error}</p>}
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
            onChange={(e:any) => handleFieldChange("tags", e.target.value.split(",").map((tag:any) => tag.trim()))}
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
            type="text"
            className="w-full border rounded px-3 py-2"
            value={course.thumbnail}
            onChange={(e) => handleFieldChange("thumbnail", e.target.value)}
          />
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