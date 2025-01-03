"use client"
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const UpdateCourse = () => {
  const router = useRouter();
  const { blogId } = useParams();

  const [blog, setCourse] = useState({
    title: "",
    author: "",
    category: "",
    thumbnail: "",
    tags: "",
    tableOfContent: [{ title: "", description: "", imageLink: "", videoLink: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!blogId) return;
      try {
        const response = await fetch(`/api/blogs/${blogId}`);
        if (!response.ok) throw new Error("Failed to fetch blog details");
        const data = await response.json();
        setCourse({
          ...data.data,
          tags: data.data.tags.join(", "), // Convert tags array to comma-separated string
        });
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchCourse();
  }, [blogId]);

  const handleFieldChange = (field: string, value: string) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleTableOfContentChange = (
    index: number,
    field: keyof typeof blog.tableOfContent[0],
    value: string
  ) => {
    setCourse((prev) => {
      const updatedTableOfContent = [...prev.tableOfContent];
      updatedTableOfContent[index] = {
        ...updatedTableOfContent[index],
        [field]: value,
      };
      return { ...prev, tableOfContent: updatedTableOfContent };
    });
  };

  const addTableOfContent = () => {
    setCourse((prev) => ({
      ...prev,
      tableOfContent: [
        ...prev.tableOfContent,
        { title: "", description: "", imageLink: "", videoLink: "" },
      ],
    }));
  };

  const removeTableOfContent = (index: number) => {
    const updatedTableOfContent = [...blog.tableOfContent];
    updatedTableOfContent.splice(index, 1);
    setCourse((prev) => ({ ...prev, tableOfContent: updatedTableOfContent }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...blog,
          tags: blog.tags.split(",").map(tag => tag.trim()), // Convert comma-separated string to array
        }),
      });

      if (!response.ok) throw new Error("Failed to update blog");
      router.push("/admin/blogs");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Blog</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={blog.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Author</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={blog.author}
            onChange={(e) => handleFieldChange("author", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={blog.category}
            onChange={(e) => handleFieldChange("category", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Thumbnail</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={blog.thumbnail}
            onChange={(e) => handleFieldChange("thumbnail", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={blog.tags}
            onChange={(e) => handleFieldChange("tags", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Table of Content</label>
          {blog.tableOfContent?.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Title"
                  className="flex-1 border rounded px-3 py-2"
                  value={item.title}
                  onChange={(e) => handleTableOfContentChange(index, "title", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="flex-1 border rounded px-3 py-2"
                  value={item.description}
                  onChange={(e) => handleTableOfContentChange(index, "description", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Image Link"
                  className="flex-1 border rounded px-3 py-2"
                  value={item.imageLink}
                  onChange={(e) => handleTableOfContentChange(index, "imageLink", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Video Link"
                  className="flex-1 border rounded px-3 py-2"
                  value={item.videoLink}
                  onChange={(e) => handleTableOfContentChange(index, "videoLink", e.target.value)}
                />
                <button
                  type="button"
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  onClick={() => removeTableOfContent(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={addTableOfContent}
          >
            Add Table of Content
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;