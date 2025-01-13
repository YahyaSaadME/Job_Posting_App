/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Navbar from '@/app/components/global/Navbar';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdWork } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { MdAccessTimeFilled } from 'react-icons/md';
import ClipLoader from "react-spinners/ClipLoader";
import { motion } from "framer-motion";

interface Job {
  id: string;
  title: any;
  experience: string;
  location: string[];
  jobType: string;
  yearsOfExperience: string;
  description: string;
  companyImgLink: any;
}

const Page = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [yearsOfExperience, setYearsOfExperience] = useState<string[]>([]);
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [loading , setLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    experience: '',
    category: '',
    company: '',
    yearsOfExperience: '',
    minExperience: '',
    maxExperience: '',
  });

  const filterVariants = {
    open: { height: "auto", opacity: 1, display: "block" },
    closed: { height: 0, opacity: 0, display: "none" },
  };

  // Fetch jobs
  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: new URL(window.location.href).searchParams?.get("category")||"" }));
  }, [])
  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
       // const query =  new URLSearchParams(filters as any).toString();
        
        
        const response = await fetch(`/api/jobs/all`);
        const data = await response.json();
        console.log(data)
        setJobs(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    getJobs();
  }, [filters]);
  

  // Generic fetch function
  const fetchData = async (url: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setter(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  useEffect(() => {
    fetchData('/api/fetch/categories', setCategories);
    fetchData('/api/fetch/companies', setCompanies);
    fetchData('/api/fetch/location', setLocations);
    fetchData('/api/fetch/experience', setYearsOfExperience);
    fetchData('/api/fetch/jobType', setJobTypes);
  }, []);

  const applyForJob = (jobId: string) => {
    router.push(`/job/${jobId}`);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredJobs: any = jobs.filter((job: any) => {
    return (
      (filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.type === '' || job.jobType.toLowerCase() === filters.type.toLowerCase()) &&
      (filters.experience === '' || job.yearsOfExperience === (filters.experience ? parseInt(filters.experience) : job.yearsOfExperience)) &&
      (filters.category === '' || job.category.toLowerCase().includes(filters.category.toLowerCase())) &&
      (filters.company === '' || job.company.toLowerCase().includes(filters.company.toLowerCase())) &&
      (filters.minExperience === '' || job.yearsOfExperience >= parseInt(filters.minExperience)) &&
      (filters.maxExperience === '' || job.yearsOfExperience <= parseInt(filters.maxExperience))
    );
  });

  return (
    <>
      <Navbar />
      <div className="max-sm:mt-20 max-sm:p-2">
       

        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={filterVariants}
          className="overflow-hidden md:block"
        >
          <div className="flex justify-between items-center mt-4 md:mt-0">
            <h2 className="text-xl font-bold text-gray-800">Filter</h2>
            <button
              onClick={() =>
                setFilters({
                  location: "",
                  type: "",
                  experience: "",
                  category: "",
                  company: "",
                  yearsOfExperience: "",
                  minExperience: "",
                  maxExperience: "",
                })
              }
              className="text-sm text-blue-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          {[{ label: "Category", name: "category", options: categories },
            { label: "Company", name: "company", options: companies },
            { label: "Location", name: "location", options: locations },
            { label: "Years of Experience", name: "yearsOfExperience", options: yearsOfExperience },
            { label: "Job Type", name: "type", options: jobTypes },
          ].map(({ label, name, options }) => (
            <div className="mt-4" key={name}>
              <label className="block text-sm font-semibold text-gray-800">{label}</label>
              <select
                name={name}
                onChange={handleFilterChange}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white"
              >
                <option value="" className="text-gray-500">
                  All {label}
                </option>
                {options.length > 0 ? (
                  options.map((option, index) => (
                    <option key={index} value={option} className="text-gray-700">
                      {option}
                    </option>
                  ))
                ) : (
                  <option className="text-gray-500">Loading {label.toLowerCase()}...</option>
                )}
              </select>
            </div>
          ))}

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-800">Min Experience</label>
            <input
              type="number"
              name="minExperience"
              value={filters.minExperience}
              onChange={handleFilterChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white"
              placeholder="Min Experience"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-800">Max Experience</label>
            <input
              type="number"
              name="maxExperience"
              value={filters.maxExperience}
              onChange={handleFilterChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white"
              placeholder="Max Experience"
            />
          </div>
        </motion.div>
      </div>

      <div className="min-h-screen mt-12 bg-gray-100 p-6 flex flex-col md:flex-row">
        <div className="w-full md:w-80 max-sm:hidden bg-white p-4 rounded-lg shadow-md mb-6 md:mb-0 max-sm:bg-gray-50">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Filter</h2>
            <button
              onClick={() =>
                setFilters({
                  location: '',
                  type: '',
                  experience: '',
                  category: '',
                  company: '',
                  yearsOfExperience: '',
                  minExperience: '',
                  maxExperience: '',
                })
              }
              className="text-sm text-blue-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          {[{ label: 'Category', name: 'category', options: categories },
            { label: 'Company', name: 'company', options: companies },
            { label: 'Location', name: 'location', options: locations },
            { label: 'Job Type', name: 'type', options: jobTypes },
          ].map(({ label, name, options }) => (
            <div className="mt-4" key={name}>
              <label className="block text-sm font-semibold text-gray-800">{label}</label>
              <select
                name={name}
                onChange={handleFilterChange}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white"
              >
                <option value="" className="text-gray-500">
                  All {label}
                </option>
                {options.length > 0 ? (
                  options.map((option, index) => (
                    <option key={index} value={option} className="text-gray-700">
                      {option}
                    </option>
                  ))
                ) : (
                  <option className="text-gray-500">Loading {label.toLowerCase()}...</option>
                )}
              </select>
            </div>
          ))}

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-800">Min Experience</label>
            <input
              type="number"
              name="minExperience"
              value={filters.minExperience}
              onChange={handleFilterChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white"
              placeholder="Min Experience"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-800">Max Experience</label>
            <input
              type="number"
              name="maxExperience"
              value={filters.maxExperience}
              onChange={handleFilterChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white"
              placeholder="Max Experience"
            />
          </div>
        </div>

        <div className="w-full flex-grow bg-white p-4 rounded-lg shadow-md">
        <button
          className="md:hidden flex items-center gap-2 text-blue-600 font-semibold"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.span
            initial={false}
            animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
          >
            ▼
          </motion.span>
          {isOpen ? "Hide Filters" : "Show Filters"}
        </button>
          {loading ? (
            <div className="flex justify-center items-center h-screen w-full">
              <ClipLoader color={"#2563eb"} size={60} />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job: {
                  companyImgLink: string | undefined;
                  title: React.ReactNode;
                  location: React.ReactNode;
                  jobType: React.ReactNode;
                  yearsOfExperience: React.ReactNode;
                  description: React.ReactNode;
                  company: string;
                  _id: string;
                }, index: React.Key | null | undefined) => (
                  <div
                    key={index}
                    className="border rounded-lg shadow-lg p-4 bg-white flex flex-col gap-4 md:flex-row items-start max-sm:p-3 max-sm:gap-3"
                  >
                            <img
         src={job?.companyImgLink}
         className='h-20 w-24 object-fill  rounded '
        />
                    <div className="flex flex-col gap-2 flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800 max-sm:text-lg">
                        {job.title} | {job.company}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-gray-600 max-sm:gap-2 max-sm:text-sm">
                        <div className="flex items-center gap-2">
                          <FaLocationDot className="text-blue-700 max-sm:text-base" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MdAccessTimeFilled className="text-blue-700 max-sm:text-base" />
                          <span>{job.jobType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MdWork className="text-blue-700 max-sm:text-base" />
                          <span>{job.yearsOfExperience} years</span>
                        </div>
                      </div>
                      <p className="text-gray-700 max-sm:text-sm">{job.description}</p>
                    </div>
                    <button
                      className="bg-blue-600 h-10 w-full md:w-36 text-white px-4 py-2 rounded hover:bg-blue-700 max-sm:h-9 max-sm:text-sm"
                      onClick={() => applyForJob(job._id)}
                    >
                      Apply
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-700">No jobs match your filters.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;