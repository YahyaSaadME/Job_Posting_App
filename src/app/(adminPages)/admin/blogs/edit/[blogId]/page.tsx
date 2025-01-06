"use client"
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const UpdateBlog = () => {
  const router = useRouter();
  const { blogId } = useParams();

  const [blog, setBlog] = useState({
    title: "",
    author: "",
    category: "",
    thumbnail: "",
    tags: "",
    tableOfContent: [{ title: "", description: "", imageLink: "", videoLink: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;
      try {
        const response = await fetch(`/api/blogs/${blogId}`);
        if (!response.ok) throw new Error("Failed to fetch blog details");
        const data = await response.json();
        setBlog({
          ...data.data,
          tags: data.data.tags.join(", "), // Convert tags array to comma-separated string
        });
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleFieldChange = (field: string, value: string) => {
    setBlog((prev) => ({ ...prev, [field]: value }));
  };

  const handleTableOfContentChange = (
    index: number,
    field: keyof typeof blog.tableOfContent[0],
    value: string
  ) => {
    setBlog((prev) => {
      const updatedTableOfContent = [...prev.tableOfContent];
      updatedTableOfContent[index] = {
        ...updatedTableOfContent[index],
        [field]: value,
      };
      return { ...prev, tableOfContent: updatedTableOfContent };
    });
  };

  const addTableOfContent = () => {
    setBlog((prev) => ({
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
    setBlog((prev) => ({ ...prev, tableOfContent: updatedTableOfContent }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
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
        if (index !== undefined) {
          handleTableOfContentChange(index, "imageLink", data.url); // Assuming the API returns the filename
        } else {
          setBlog((prev) => ({ ...prev, thumbnail: data.url })); // Assuming the API returns the filename
        }
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
    <div className="container mx-auto p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Update Blog</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
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
            type="file"
            onChange={(e) => handleImageUpload(e)}
            className="w-full border rounded px-3 py-2"
          />
          {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
          {blog.thumbnail && (
            <div className="mt-2">
              <img src={window.location.origin + "/images/" + blog.thumbnail} alt="Thumbnail" className="w-full h-auto" />
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
              <div className="grid grid-cols-2 gap-4 border rounded p-2 mb-2">
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
                  type="file"
                  className="flex-1 border rounded px-3 py-2"
                  onChange={(e) => handleImageUpload(e, index)}
                />
                {item.imageLink && (
                  <div className="mt-2">
                    <img src={window.location.origin + "/images/" + item.imageLink} alt="Section Image" className="w-full h-auto" />
                    <button
                      type="button"
                      onClick={() => handleTableOfContentChange(index, "imageLink", "")}
                      className="mt-2 text-blue-500 underline"
                    >
                      Change Image
                    </button>
                  </div>
                )}
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

export default UpdateBlog;