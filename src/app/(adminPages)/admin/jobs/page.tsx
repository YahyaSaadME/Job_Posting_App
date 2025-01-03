'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddJob = () => {
  const [formData, setFormData] = useState({
    company: "",
    location: "",
    title: "",
    description: "",
    requirement: "",
    category: "",
    yearsOfExperience: 0,
    link: "",
    jobType: "",
<<<<<<< HEAD:src/pages/admin/jobs/add.tsx
    tags: "", // Add tags field
=======
    qualifications: "", // New field
    companySummary: "", 
    companyImgLink : ""
>>>>>>> fdd7102a363bdd0178cc9ee5f58a221b7238e883:src/app/(adminPages)/admin/jobs/page.tsx
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} with value: ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map(tag => tag.trim()), // Convert tags to array of strings
          by: null,
          approved: true,
        }),
      });
      console.log("Form Data:", formData);
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Error adding job");
      } else {
        const data = await response.json();
        console.log(data);
        setSuccessMessage("Job added successfully!");
        router.push("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while adding the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white">
      <h2 className="text-2xl font-bold">Add Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        {error && <p className="text-red-600 ">{error}</p>}

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
<<<<<<< HEAD:src/pages/admin/jobs/add.tsx
=======
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
        <label htmlFor="location" className="block font-medium">
            company image link
          </label>
        <input
  id="companyImgLink"
  name="companyImgLink" // Matches formData.companyImgLink
  type="text"
  value={formData.companyImgLink}
  onChange={handleChange}
  className="w-full p-2 border rounded-md"
  required
/>

        <div className="space-y-2">
>>>>>>> fdd7102a363bdd0178cc9ee5f58a221b7238e883:src/app/(adminPages)/admin/jobs/page.tsx
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

<<<<<<< HEAD:src/pages/admin/jobs/add.tsx
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

        <div className="text-start">
=======


        {/* Qualifications Field */}
        <div className="space-y-2">
          <label htmlFor="qualifications" className="block font-medium">
            Qualifications
          </label>
          <textarea
            id="qualifications"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows={4}
            required
          />
        </div>

        {/* Company Summary Field */}
        <div className="space-y-2">
          <label htmlFor="companySummary" className="block font-medium">
            Company Summary
          </label>
          <textarea
            id="companySummary"
            name="companySummary"
            value={formData.companySummary}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows={4}
            required
          />
        </div>

        <div className="text-center">
>>>>>>> fdd7102a363bdd0178cc9ee5f58a221b7238e883:src/app/(adminPages)/admin/jobs/page.tsx
          <button
            type="submit"
            className="w-fit p-2 px-4 mt-4 text-white bg-green-500 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Adding Job..." : "Add Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;