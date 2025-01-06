/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState("");
  const [tableOfContent, setTableOfContent] = useState([
    { title: "", description: "", imageLink: "", videoLink: "" },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const router = useRouter();

  const handleAddSection = () => {
    setTableOfContent([
      ...tableOfContent,
      { title: "", description: "", imageLink: "", videoLink: "" },
    ]);
  };

  const handleTableChange = (index: number, key: string, value: string) => {
    const updatedContent = [...tableOfContent];
    updatedContent[index][key as keyof (typeof updatedContent)[0]] = value;
    setTableOfContent(updatedContent);
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
          handleTableChange(index, "imageLink", data.url); // Assuming the API returns the filename
        } else {
          setThumbnail(data.url); // Assuming the API returns the filename
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
    setSuccess(null);

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          author,
          category,
          thumbnail,
          tags: tags.split(",").map(tag => tag.trim()),
          tableOfContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add blog");
      }

      const data = await response.json();
      setSuccess("Blog added successfully!");
      setTitle("");
      setAuthor("");
      setCategory("");
      setThumbnail("");
      setTags("");
      setTableOfContent([
        { title: "", description: "", imageLink: "", videoLink: "" },
      ]);
      router.push("/admin/blogs");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Blog</h1>
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
          <label className="block text-sm font-medium mb-1">Author:</label>
          <textarea
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
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
          <label className="block text-sm font-medium mb-1">Thumbnail:</label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e)}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {uploading && <p className="text-blue-500 mt-2">Uploading...</p>}
          {thumbnail && (
            <div className="mt-2">
              <img src={window.location.origin + "/images/" + thumbnail} alt="Thumbnail" className="w-full h-auto" />
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
          <label className="block text-sm font-medium mb-1">Tags (comma separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Table of Content:</h3>
          {tableOfContent.map((section, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
              <label className="block text-sm font-medium mb-1">Section Title:</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  handleTableChange(index, "title", e.target.value)
                }
                className="w-full border border-gray-300 p-2 rounded mb-2"
              />
              <label className="block text-sm font-medium mb-1">Section Description:</label>
              <textarea
                value={section.description}
                onChange={(e) =>
                  handleTableChange(index, "description", e.target.value)
                }
                className="w-full border border-gray-300 p-2 rounded mb-2"
              />
              <label className="block text-sm font-medium mb-1">Image Link:</label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, index)}
                className="w-full border border-gray-300 p-2 rounded mb-2"
              />
              {section.imageLink && (
                <div className="mt-2">
                  <img src={window.location.origin + "/images/" + section.imageLink} alt="Section Image" className="w-full h-auto" />
                  <button
                    type="button"
                    onClick={() => handleTableChange(index, "imageLink", "")}
                    className="mt-2 text-blue-500 underline"
                  >
                    Change Image
                  </button>
                </div>
              )}
              <label className="block text-sm font-medium mb-1">Video Link:</label>
              <input
                type="text"
                value={section.videoLink}
                onChange={(e) =>
                  handleTableChange(index, "videoLink", e.target.value)
                }
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSection}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Section
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;