// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// const AddJobPage = () => {
//   const router = useRouter();
//   const [uid, setuid] = useState<string>("6777b98bde4abe31a6d4990a");
//   const { data: session, status } = useSession();
//   const [formData, setFormData] = useState({
//     company: "",
//     location: "",
//     title: "",
//     description: "",
//     requirement: "",
//     category: "",
//     yearsOfExperience: 0,
//     jobType: "",
//     link: "",
//     tags: "",
//   });
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccessMessage("");

//     try {
//       const response = await fetch("/api/itreferral", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert tags to array of strings
//           by: uid,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setSuccessMessage("Job added successfully!");
//         router.push("/itreferral");
//       } else {
//         setError(data.message || "Error adding job");
//       }
//     } catch (error) {
//       setError("An error occurred while adding the job.");
//     }
//   };

//   useEffect(() => {
//     if (status === "authenticated") {
//       setuid(session?.user?.id as string);
//     }
//   }, [session]);
//   return (
//     <div className="max-w-xl mx-auto p-4 bg-white">
//       <h2 className="text-2xl font-bold">Add Job</h2>

//       {error && <p className="text-red-600">{error}</p>}
//       {successMessage && <p className="text-green-600">{successMessage}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4 mt-6">
//         <div className="space-y-2">
//           <label htmlFor="title" className="block font-medium">
//             Title
//           </label>
//           <input
//             id="title"
//             name="title"
//             type="text"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="description" className="block font-medium">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="company" className="block font-medium">
//             Company
//           </label>
//           <input
//             id="company"
//             name="company"
//             type="text"
//             value={formData.company}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="location" className="block font-medium">
//             Location
//           </label>
//           <input
//             id="location"
//             name="location"
//             type="text"
//             value={formData.location}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="requirement" className="block font-medium">
//             Requirement
//           </label>
//           <textarea
//             id="requirement"
//             name="requirement"
//             value={formData.requirement}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="category" className="block font-medium">
//             Category
//           </label>
//           <input
//             id="category"
//             name="category"
//             type="text"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="yearsOfExperience" className="block font-medium">
//             Years of Experience
//           </label>
//           <input
//             id="yearsOfExperience"
//             name="yearsOfExperience"
//             type="number"
//             value={formData.yearsOfExperience}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="jobType" className="block font-medium">
//             Job Type
//           </label>
//           <input
//             id="jobType"
//             name="jobType"
//             type="text"
//             value={formData.jobType}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="link" className="block font-medium">
//             Link
//           </label>
//           <input
//             id="link"
//             name="link"
//             type="text"
//             value={formData.link}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="tags" className="block font-medium">
//             Tags
//           </label>
//           <input
//             id="tags"
//             name="tags"
//             type="text"
//             value={formData.tags}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         >
//           Add Job
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddJobPage;
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AddJobPage = () => {
  const router = useRouter();
  const [uid, setuid] = useState<string>("6777b98bde4abe31a6d4990a");
  const { data: session, status } = useSession();
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
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/itreferral", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert tags to array of strings
          by: uid,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Job added successfully!");
        router.push("/itreferral");
      } else {
        setError(data.message || "Error adding job");
      }
    } catch (error) {
      setError("An error occurred while adding the job.");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      setuid(session?.user?.id as string);
    }
  }, [session]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Add Job</h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {["title", "description", "company", "location", "requirement", "category", "jobType", "link", "tags"].map((field, index) => (
          <div key={index} className="space-y-2">
            <label htmlFor={field} className="block font-medium text-gray-700">
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            <input
              id={field}
              name={field}
              type={field === "tags" ? "text" : field === "yearsOfExperience" ? "number" : "text"}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-xl hover:bg-blue-700 transition duration-300"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJobPage;
