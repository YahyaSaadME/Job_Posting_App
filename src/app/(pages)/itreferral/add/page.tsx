/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";

const AddJobPage = () => {
  const router = useRouter();

  const { data: session, status:s } = useSession();
  const [uid , setUid] = useState<any>('6777b98bde4abe31a6d4990a')

  const [formData, setFormData] = useState({
    title : "",
    description : "",
    companyName: "", 
    jobType : "",
    yearsOfExperience: "",
    location: "",
    qualification: "",
    by: ""
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
  useEffect(() => {
    setUid(session?.user?.id)
   }, [session])
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
          by: session?.user?.id
         
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


  if (s === 'loading') {
    return   <div className="flex justify-center items-center h-screen w-full">
    <ClipLoader color={"#020617"} size={60} />
  </div>
  }

  // Unauthorized page for non-job posters
  if (session?.user?.type === 'jobSeeker') {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 text-black">
        <div className="bg-red-400 p-6 rounded-md shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
          <p>This page is for job posters as (It Referral) only. Please create an account to access the features.</p>
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
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Add Job</h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {["title", "description", "companyName", "location", "qualification", "jobType", "yearsOfExperience"].map((field, index) => (
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
              className={`${field === "description" ? "h-56" : "h-auto"} w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}

              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3 bg-black text-white rounded-lg font-semibold text-xl  transition duration-300"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJobPage;
