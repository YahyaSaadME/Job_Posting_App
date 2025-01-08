/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const EditJob = () => {
  const router = useRouter();
  const { jobId } = useParams();

  const [formData, setFormData] = useState({
    company: "",
    location: "",
    title: "",
    description: "",
    requirement: "",
    category: "",
    yearsOfExperience: 0,
    jobType: "",
    link: "",
    tags: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (jobId) {
      const fetchJob = async () => {
        try {
          const response = await fetch(`/api/jobs/${jobId}`);
          const data = await response.json();
          console.log(data);

          if (response.ok) {
            setFormData(data.data);
          } else {
            setError(data.message || "Failed to fetch job");
          }
        } catch (error) {
          console.log(error);

          setError("An error occurred while fetching job.");
        } finally {
          setLoading(false);
        }
      };
      fetchJob();
    }
  }, [jobId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map(tag => tag.trim()), // Convert tags to array of strings
        }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push("/admin/jobs");
      } else {
        setError(data.message || "Error updating job");
      }
    } catch (error) {
      setError("An error occurred while updating job.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white">
      <h2 className="text-2xl font-bold">Edit Job</h2>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div className="space-y-2">
          <label htmlFor="company" className="block font-medium">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="block font-medium">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="title" className="block font-medium">
            Job Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="link" className="block font-medium">
            Job Link
          </label>
          <input
            id="link"
            name="link"
            type="text"
            value={formData.link}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="requirement" className="block font-medium">
            Requirements
          </label>
          <textarea
            id="requirement"
            name="requirement"
            value={formData.requirement}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="yearsOfExperience" className="block font-medium">
            Years of Experience
          </label>
          <input
            id="yearsOfExperience"
            name="yearsOfExperience"
            type="number"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="jobType" className="block font-medium">
            Job Type
          </label>
          <input
            id="jobType"
            name="jobType"
            type="text"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tags" className="block font-medium">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full p-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Updating Job..." : "Update Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJob;