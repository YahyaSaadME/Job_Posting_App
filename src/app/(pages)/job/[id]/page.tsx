/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import Navbar from "@/app/components/global/Navbar";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { IoTimeSharp } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";

interface Job {
  id: string;
  title: string;
  experience: string; // Years of experience requirement
  location: string[];
  jobType: string;
  yearsOfExperience: number;
  description: string;
  companyImgLink: string;
  category: string;
  company: string;
  companySummary: string;
  createdAt: string;
  updatedAt: string;
  link: string;
  Qualifications: string | string[];
  requirement: string | string[]; // Allow both string or array of strings
}

const Page = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const jobId = params.id;

  const [job, setJob] = useState<Job>();

  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/jobs/${jobId}`);
        const data = await response.json();

        setJob(data?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    getJobs();
  }, []);

  console.log(job);
  const { data: session } = useSession();
  const router = useRouter();
  function applyForJob(jobLink: string | undefined) {
    router.push(`${jobLink}`);
  }

  return (
    <div>
      <Navbar />

      <div className="mt-16 md:hidden ">
        {loading ? (
          <div className="flex  justify-center items-center h-screen w-full">
            <ClipLoader color={"#020617"} size={60} />
          </div>
        ) : (
          <div className="flex flex-col gap-4 bg-gray-100 min-h-screen ">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
              {/* Job Title */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                  src={job?.companyImgLink}
                  className="h-20 w-24 object-fill rounded"
                />
                <div>
                  <h1  className="text-2xl  sm:text-3xl font-bold text-gray-800">
                    {job?.title}
                  </h1>
                  <div className="flex flex-col sm:flex-row text-gray-600 mt-2">
                    <span className="inline-flex items-center mr-4">
                      <FaLocationDot className="mr-2" /> {job?.location}
                    </span>
                    <span className="inline-flex items-center">
                      <IoTimeSharp className="mr-2" /> {job?.jobType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <h2 className="text-lg sm:text-xl font-bold text-gray-700 mt-6">
                Job Description
              </h2>
              <p className="text-gray-600 mt-2">{job?.description}</p>

              {/* Responsibility */}
              <h2 className="text-lg sm:text-xl font-bold text-gray-700 mt-6">
                Responsibility
              </h2>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {Array.isArray(job?.requirement)
                  ? job?.requirement.map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))
                  : typeof job?.requirement === "string"
                  ? job?.requirement
                      .split(",")
                      .map((item, index) => <li key={index}>{item.trim()}</li>)
                  : null}
              </ul>

              {/* Qualifications */}
              <h2 className="text-lg sm:text-xl font-bold text-gray-700 mt-6">
                Qualifications
              </h2>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {Array.isArray(job?.Qualifications)
                  ? job?.Qualifications.map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))
                  : typeof job?.Qualifications === "string"
                  ? job?.Qualifications.split(",").map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))
                  : null}
              </ul>
            </div>

            {/* Job Summary and Company Summary */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 max-w-4xl mx-auto">
              <div className="bg-gray-100 p-4 rounded-md shadow-md flex-1">
                <h2 className="text-lg font-bold text-black">Job Summary</h2>
                <ul className="text-gray-600 mt-2">
                  {session?.user ? (
                    <button
                      className="bg-black text-white px-4 py-2 rounded mt-2 hover:bg-black"
                      onClick={() => applyForJob(job?.link)}
                    >
                      Apply Now
                    </button>
                  ) : (
                    <button
                      className="bg-black text-white px-4 py-2 rounded mt-2 hover:bg-black"
                      onClick={() => router.push("/signin")}
                    >
                      Sign In to Apply
                    </button>
                  )}
                  <li className="inline-flex items-center mt-2">
                    <IoTimeSharp className="mr-2" /> Job Type: {job?.jobType}
                  </li>
                  <li className="inline-flex items-center mt-2">
                    <FaLocationDot className="mr-2" /> Location: {job?.location}
                  </li>
                </ul>
              </div>

              <div className="bg-gray-100 p-4 rounded-md shadow-md flex-1">
                <h2 className="text-lg font-bold text-black">
                  Company Summary
                </h2>
                <p className="text-gray-600 mt-2">{job?.companySummary}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-sm:hidden md:mx-16  mt-16">
        {loading ? (
          <div className="flex  justify-center items-center h-screen w-full">
            <ClipLoader color={"#020617"} size={60} />
          </div>
        ) : (
          <div>
            <div className="flex gap-4 bg-gray-100 min-h-screen p-4">
              <div className="w-[95rem] flex flex-col gap-4 mx-auto bg-white shadow-md rounded-lg p-8 mt-4">
                {/* Job Title */}
                <div className="flex items-center gap-8">
                  <img
                    src={job?.companyImgLink}
                    className="h-20 w-24 object-fill  rounded "
                  />
                  <div className="pt-5">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      {job?.title}
                    </h1>

                    {/* Location and Job Type */}
                    <div>
                      <div className="text-gray-600 mb-4">
                        <p>
                          <span className="inline-flex items-center mr-4">
                            <FaLocationDot className="mr-2" />{" "}
                            {/* Adding margin-right to the icon */}
                            {job?.location}
                          </span>
                          <span className="inline-flex items-center mr-4">
                            <IoTimeSharp className="mr-2" /> {job?.jobType}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Job Description */}
                <h2 className="text-xl font-bold text-gray-700 mb-2">
                  Job Description
                </h2>
                <p className="text-gray-600 mb-4">{job?.description}</p>

                {/* Responsibility */}
                <h2 className="text-xl font-bold text-gray-700 mb-2">
                  Responsibility
                </h2>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {Array.isArray(job?.requirement)
                    ? job?.requirement.map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                      ))
                    : typeof job?.requirement === "string"
                    ? job?.requirement
                        .split(",")
                        .map((item, index) => (
                          <li key={index}>
                            {item.trim().replace(/^['"]|['"]$/g, "")}
                          </li>
                        ))
                    : null}
                </ul>

                {/* Qualifications */}
                <h2 className="text-xl font-bold text-gray-700 mb-2">
                  Qualifications
                </h2>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {Array.isArray(job?.Qualifications)
                    ? job?.Qualifications.map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                      ))
                    : typeof job?.Qualifications === "string"
                    ? job?.Qualifications.split(",").map((item, index) => (
                        <li key={index}>
                          {item.trim().replace(/^['"]|['"]$/g, "")}
                        </li>
                      ))
                    : null}
                </ul>
              </div>
              <div className="   ">
        
          </div>
              {/* Job Summary and Company Summary */}

              <div className="   ">
                <div className="grid grid-rows-1 md:grid-rows-1 gap-4 mt-4">
                <div className="bg-white p-4 w-[24rem] rounded-md shadow-md">
                    <h2 className="text-lg font-bold text-black mb-2">
                      Company Summary
                    </h2>
                    <p className="text-gray-600">{job?.companySummary}</p>
                  </div>
                  <div className="bg-white p-4 w-[24rem] rounded-md shadow-md">
          
                  
                  </div>
                  <div className="bg-white w-[24rem] p-4 rounded-md shadow-md">
                    <h2 className="text-lg font-bold text-black mb-2">
                      Job Summary
                    </h2>
                    <ul className="list-none  text-gray-600">
                      <br />
                      {session?.user ? (
                        <>
                          <button
                            className="bg-black  h-10 w-36  text-white px-4  rounded hover:bg-black transition-colors"
                            onClick={() => applyForJob(job?.link)}
                          >
                            Apply Now
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-black  h-10 w-48  text-white px-2 rounded hover:bg-black transition-colors"
                            onClick={() => router.push("/signin")}
                          >
                            Sign In to Apply
                          </button>
                        </>
                      )}
                      <br />
                      <br />
                      <li className="inline-flex items-center ml-1">
                        <IoTimeSharp className="mr-2" /> Job Type:{" "}
                        {job?.jobType}
                      </li>
                      <br />
                      <br />
                      <li className="inline-flex items-center ml-1">
                        <FaLocationDot className="mr-2" /> Location:{" "}
                        {job?.location}
                      </li>
                      <br />
                    </ul>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
          
        )}


      </div>
    </div>
  );
};

export default Page;
