/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import Navbar from "@/app/components/global/Navbar";
import Footer from "@/app/components/global/Footer";
import { FaLocationDot } from "react-icons/fa6";
import {useRouter} from "next/navigation"
import { MdAccessTimeFilled, MdWork } from "react-icons/md";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter()
  // const [showDialog, setShowDialog] = useState<boolean>(false);
  // const [selectedJob, setSelectedJob] = useState<any>(null);
  // const [uid, setUid]: any = useState<any>("");
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   mobileNo: "",
  //   resumeLink: "",
  //   currentCompany: "",
  //   noticePeriod: "",
  // });

  // Fetch all jobs when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const req = await fetch(`/api/itRefJobApprovel/true`);
        const res = await req.json();
        setJobs(res.data);
        setFilteredJobs(res.data); // Initially, show all jobs
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // const fetchUser = async (uid: string) => {
  //   try {
  //     setLoading(true);
  //     const req = await fetch(`/api/user`, {
  //       method: "POST",
  //       body: JSON.stringify({ id: uid }),
  //     });
  //     const res = await req.json();
  //     console.log(res);
      
  //     setFormData((prev) => ({ ...prev, email: res?.email || "" }));
  //     setFormData((prev) => ({ ...prev, email: res?.name || "" }));
  //     setFormData((prev) => ({ ...prev, email: res?.number || "" }));
  //     setFormData((prev) => ({ ...prev, email: res?.resume || "" }));
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  // // Filter jobs based on the search term
  // useEffect(() => {
  //   const filtered = jobs.filter((job) =>
  //     `${job.title} ${job.companyName} ${job.location}`
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredJobs(filtered);
  // }, [searchTerm, jobs]);

  // // Handle Apply button click
  // const handleApplyClick = async (job: any) => {
  //   setSelectedJob(job);
  //   setUid(job?._id);
  //   await fetchUser(job?._id);
  //   setShowDialog(true);
  //   setLoading(false);
  // };

  // // Close the dialog
  // const handleCloseDialog = () => {
  //   setLoading(false);
  //   setShowDialog(false);
  //   setSelectedJob(null);
  //   setFormData({
  //     name: "",
  //     email: "",
  //     mobileNo: "",
  //     resumeLink: "",
  //     currentCompany: "",
  //     noticePeriod: "",
  //   });
  // };
  // console.log(uid);
  // // Handle form input change
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // // Handle form submission
  // const handleSubmit = async (jobId: any): Promise<void> => {
  //   try {
  //     const response = await fetch(`/api/itreferral/${jobId}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: formData.name,
  //         email: formData.email,
  //         mobile: formData.mobileNo,
  //         resume: formData.resumeLink,
  //         currentCompany: formData.currentCompany || "",
  //         noticePeriod: formData.noticePeriod || "",
  //       }),
  //     });

  //     const result = await response.json();

  //     if (result.ok) {
  //       toast("you have sucessfully applied ");
  //       handleCloseDialog();
  //     } else {
  //       console.log("error");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     console.log("An error occurred while submitting the application.");
  //   }
  // };

  const applyForJob = (jobId: string) => {
    router.push(`/itReferralJobs/${jobId}`);
  };


  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="bg-white text-black md:mx-16 min-h-screen mt-16 flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col px-5 md:flex-row justify-between items-center bg-gray-100 p-6 md:p-8">
          <div className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            It Referral Jobs
          </div>
          <Link href="/itreferral">
            <button className="bg-black hover:bg-black text-white font-semibold py-4 px-8 rounded-full transition duration-300">
              Post Jobs as It Referral / Dashboard
            </button>
          </Link>
        </div>

        {/* Search Section */}
        <div className="flex justify-center mt-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jobs by title, company, or location..."
            className="w-full mx-8 p-2 border rounded-md"
          />
        </div>

        {/* Main Content Section */}
        <div className="p-6 md:p-8">
          {loading ? (
            <div className="flex justify-center items-center h-screen w-full">
              <ClipLoader color="#020617" size={60} />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs?.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <div
                    key={index}
                    className="border rounded-lg shadow-lg p-4 bg-white flex flex-col gap-4 md:flex-row items-start max-sm:p-3 max-sm:gap-3"
                  >
                    <div className="flex flex-col gap-2 flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800 max-sm:text-lg">
                        {job.title} | {job.companyName}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-gray-600 max-sm:gap-2 max-sm:text-sm">
                        <div className="flex items-center gap-2">
                          <FaLocationDot className="text-black max-sm:text-base" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MdAccessTimeFilled className="text-black max-sm:text-base" />
                          <span>{job.jobType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MdWork className="text-black max-sm:text-base" />
                          <span>{job.yearsOfExperience} years</span>
                        </div>
                        <div className="flex text-green-500 items-center gap-2">
                       
                          <span>Applied by <span className="font-bold ">{job.applicants.length}</span> applicants</span>
                        </div>
                      </div>
                      <p className="text-gray-700 max-sm:text-sm">
                        {job.description}
                      </p>
                    </div>
                    <button
                      className="bg-black h-10 w-full md:w-36 text-white px-4 py-2 rounded hover:bg-black max-sm:h-9 max-sm:text-sm"
                      onClick={() => applyForJob(job._id)}
                    >
                      Apply
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-700">
                  No jobs match your filters.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {/* <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="tel"
              name="mobileNo"
              placeholder="Mobile Number"
              value={formData.mobileNo}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="url"
              name="resumeLink"
              placeholder="Resume Link (Google Drive)"
              value={formData.resumeLink}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="currentCompany"
              placeholder="Current Company (Optional)"
              value={formData.currentCompany}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="noticePeriod"
              placeholder="Notice Period (Optional)"
              value={formData.noticePeriod}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              onClick={() => handleSubmit(uid)}
            >
              Submit Application
            </button>
          </form>
        </DialogContent>
      </Dialog> */}

      <Footer />
    </>
  );
};

export default Page;
