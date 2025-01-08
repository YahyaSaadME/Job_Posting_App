'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [link, setLink] = useState("");
  const [thumbnail, setThumbnail] = useState("image-1736147122488.png");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const router = useRouter();

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
      console.log(data);
      
      if (response.ok) {
        setThumbnail(data.url);
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
    setSuccess(null);

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, tags, link, thumbnail, duration }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Error adding course");
      } else {
        setSuccess("Course added successfully!");
        router.push("/admin/course");
      }
    } catch (error) {
      setError("An error occurred while adding the course.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Course</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tags:</label>
          <input
            type="text"
            value={tags.join(", ")}
            onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Link:</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Thumbnail:</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
          {thumbnail && (
            <div className="mt-2">
              <img src={window.location.origin+"/images/"+thumbnail} alt="Thumbnail" className="w-full h-auto" />
              <button
                type="button"
                onClick={() => setThumbnail("")}
                className="mt-2 text-blue-500 underline"
              >
                Change Image
              </button>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Duration:</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;