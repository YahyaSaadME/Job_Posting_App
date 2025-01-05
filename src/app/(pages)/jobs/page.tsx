'use client';

import Navbar from '@/app/components/global/Navbar';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdWork } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { MdAccessTimeFilled } from 'react-icons/md';

interface Job {
  id: string;
  title: string;
  experience: string;
  location: string[];
  jobType: string;
  yearsOfExperience: string;
  description: string;
  companyImgLink: string;
}

const Page = () => {
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [yearsOfExperience, setYearsOfExperience] = useState<string[]>([]);
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    experience: '',
    category: '',
    company: '',
    yearsOfExperience: '',
  });

  // Fetch jobs
  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        setJobs(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    getJobs();
  }, []);

  // Generic fetch function
  const fetchData = async (url: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setter(data.data || []);
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

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };


  const filteredJobs: any = jobs.filter((job: any) => {
    return (
      (filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.type === '' || job.jobType.toLowerCase() === filters.type.toLowerCase()) &&
      (filters.experience === '' || job.yearsOfExperience === (filters.experience ? parseInt(filters.experience) : job.yearsOfExperience)) &&
      (filters.category === '' || job.category.toLowerCase().includes(filters.category.toLowerCase())) &&
      (filters.company === '' || job.company.toLowerCase().includes(filters.company.toLowerCase()))
    );
  });
  
  
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 flex">
        {/* Filter Section */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
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
              })
            }
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Reset Filters
          </button>

          {[
            { label: 'Category', name: 'category', options: categories },
            { label: 'Company', name: 'company', options: companies },
            { label: 'Location', name: 'location', options: locations },
            { label: 'Years of Experience', name: 'yearsOfExperience', options: yearsOfExperience },
            { label: 'Job Type', name: 'type', options: jobTypes },
          ].map(({ label, name, options }) => (
            <div className="mt-4" key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <select
                name={name}
                onChange={handleFilterChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">All {label}</option>
                {options.length > 0
                  ? options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))
                  : <option>Loading {label.toLowerCase()}...</option>}
              </select>
            </div>
          ))}
        </div>

        {/* Job Listings Section */}
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job: { companyImgLink: string | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; location: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; jobType: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; yearsOfExperience: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; id: string; }, index: React.Key | null | undefined) => (
                <div key={index} className="border rounded-lg shadow-lg p-6 bg-white flex items-start gap-6 space-y-2">
                  <img src={job.companyImgLink} className="h-14 w-16 object-fill mt-8 rounded" alt="Company Logo" />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {job.title} | {job.location}
                    </h3>
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
                    <p className="text-gray-700">{job.description}</p>
                  </div>
                  <button
                    className="bg-blue-600 h-10 w-36 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => applyForJob(job.id)}
                  >
                    Apply Now
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-700">No jobs match your filters.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
