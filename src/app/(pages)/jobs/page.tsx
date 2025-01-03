/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Navbar from '@/app/components/global/Navbar';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdWork } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";

interface Job {
  title: string;
  experience: string;
  location: string[];
  jobType: string;
  yearsOfExperience: string;
  description: string;
  companyImgLink : string
}

const Page = () => {
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    experience: '',
  });

 



  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
  
        if (Array.isArray(data.data)) {
          setJobs(data.data); // Set the jobs array
        } else {
          console.error("API response does not contain an array:", data);
          setJobs([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]); // Fallback to empty array
      }
    };
  
    getJobs();
  }, []);
  const applyForJob = () => {
    router.push(`job/`);
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.location === '' || job.location.includes(filters.location)) &&
      (filters.type === '' || job.jobType === filters.type) &&
      (filters.experience === '' || job.experience === filters.experience)
    );
  });
  console.log(filteredJobs)

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 flex">
        {/* Filter Section */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800">Filter</h2>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select a location</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Delhi">Delhi</option>
              <option value="Noida">Noida</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select a job type</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
              <option value="Full-time">Full-time</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            <select
              name="experience"
              value={filters.experience}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select experience</option>
              <option value="6 to 9 years">6 to 9 years</option>
              <option value="3 to 5 years">3 to 5 years</option>
              <option value="4 to 7 years">4 to 7 years</option>
              <option value="2 to 4 years">2 to 4 years</option>
              <option value="5 to 8 years">5 to 8 years</option>
            </select>
          </div>
        </div>

        <div className="container mx-auto p-6">
  <div className="grid grid-cols-1 gap-6">
    {filteredJobs.map((job, index) => (
      <div
        key={index}
        className="border rounded-lg shadow-lg p-6 bg-white flex flex-col space-y-4"
      >
        <img
         src={job.companyImgLink}
        />
        {/* Job Title */}
        <h3 className="text-2xl font-semibold text-gray-800">
          {job.title} | {job.location}
        </h3>

        {/* Job Details */}
        <div className="flex flex-wrap gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <FaLocationDot className="text-blue-700" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdAccessTimeFilled className="text-blue-700" />
            <span>{job.jobType}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdWork className="text-blue-700" />
            <span>{job.yearsOfExperience} years</span>
          </div>
        </div>

        {/* Job Description */}
        <p className="text-gray-700">{job.description}</p>

        {/* Apply Button */}
        <div className="flex justify-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={applyForJob}
          >
            Apply Now
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </>
  );
};

export default Page;
