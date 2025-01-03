import { useRouter } from "next/router";
import React, { useState } from "react";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tableOfContent, setTableOfContent] = useState([
    { title: "", description: "", imageLink: "", videoLink: "" },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, tableOfContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to add course");
      }

      const data = await response.json();
      setSuccess("Course added successfully!");
      setTitle("");
      setDescription("");
      setCategory("");
      setTableOfContent([
        { title: "", description: "", imageLink: "", videoLink: "" },
      ]);
      router.push("/admin/course")
    } catch (err) {
      setError((err as Error).message);
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
                required
                className="w-full border border-gray-300 p-2 rounded mb-2"
              />
              <label className="block text-sm font-medium mb-1">Section Description:</label>
              <textarea
                value={section.description}
                onChange={(e) =>
                  handleTableChange(index, "description", e.target.value)
                }
                required
                className="w-full border border-gray-300 p-2 rounded mb-2"
              />
              <label className="block text-sm font-medium mb-1">Image Link:</label>
              <input
                type="text"
                value={section.imageLink}
                onChange={(e) =>
                  handleTableChange(index, "imageLink", e.target.value)
                }
                className="w-full border border-gray-300 p-2 rounded mb-2"
              />
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
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
