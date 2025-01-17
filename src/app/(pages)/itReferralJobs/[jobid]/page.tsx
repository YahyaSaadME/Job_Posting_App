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

import { IoTimeSharp } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Footer from "@/app/components/global/Footer";
import { toast, ToastContainer } from "react-toastify";
interface Job {
  _id: string;
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
  qualification : string;
  Qualifications: string | string[];
  requirement: string | string[]; // Allow both string or array of strings
}




const Page = () => {
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [job, setJob] = useState<Job>();
    const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false); 
  const [uid, setUid]: any = useState<any>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    resumeLink: "",
    currentCompany: "",
    noticePeriod: "",
  });



  useEffect(() => {  
    const url = window.location.href;
    const idFromUrl: any = url.split('/').pop();
    setJobId(idFromUrl);
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const req = await fetch(`/api/itreferral/getItRefById/${jobId}`);
        const res = await req.json();
        setJob(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobs();
    }
  }, [jobId]);

    
  const fetchUser = async (uid: string) => {
    try {
      setLoading(true);
      const req = await fetch(`/api/user`, {
        method: "POST",
        body: JSON.stringify({ id: uid }),
      });
      const res = await req.json();
      setFormData((prev) => ({
        ...prev,
        email: res?.email || "",
        name: res?.name || "",
        mobileNo: res?.number || "",
        resumeLink: res?.resume || "",
      }));
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };
  


  const handleApplyClick = async (job: any) => {
  
  
    // Proceed if the job hasn't been applied for
    setSelectedJob(job);
    setUid(job?._id);
    await fetchUser(job?._id); // Assuming this fetches some necessary user data
  
    setShowDialog(true); // Show the dialog for applying
  
    
  
    setLoading(false); // Stop loading state (if applicable)
  };
  
  // Close the dialog
  const handleCloseDialog = () => {
    setLoading(false);
    setShowDialog(false);
    setSelectedJob(null);
    setFormData({
      name: "",
      email: "",
      mobileNo: "",
      resumeLink: "",
      currentCompany: "",
      noticePeriod: "",
    });
  };
  console.log(uid);
  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (uid: string, e: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    setSubmitting(true);
    try {
      const response = await fetch(`/api/itreferral/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobileNo,
          resume: formData.resumeLink,
          currentCompany: formData.currentCompany || "",
          noticePeriod: formData.noticePeriod || "",
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success("You have successfully applied!");
        handleCloseDialog();
      } else {
        handleCloseDialog();
        toast.error(result.message || "An error occurred.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the application.");
    } finally {
      setSubmitting(false);
    }
  };
  
  
  const { data: session } = useSession();
  const router = useRouter();


  return (
    <div>
      <Navbar />
    
      <div className="mt-16 md:hidden ">
      <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>

        {loading ? (
          <div className="flex  justify-center items-center h-screen w-full">
            <ClipLoader color={"#020617"} size={60} />
          </div>
        ) : (
          <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
              {/* Job Title */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
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

            
              <h2 className="text-lg sm:text-xl font-bold text-gray-700 mt-6">
                Qualifications
              </h2>
              <p className="text-gray-600 mb-4">{job?.qualification}</p>     
            </div>

            {/* Job Summary and Company Summary */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4  max-w-4xl mx-auto">
              <div className=" p-14 rounded-md shadow-md flex-1 space-x-5">
                <h2 className="text-lg font-bold text-black">Apply to this job</h2>
    
                  {session?.user ? (
                    <button
                      className={`bg-black text-white px-4 py-2 rounded mt-2 hover:bg-black `}
                      onClick={() => handleApplyClick(job?._id)}
                    >
                      {`Apply Now`}
                    </button>
                  ) : (
                    <button
                      className="bg-black text-white px-4 py-2 rounded mt-2 hover:bg-black"
                      onClick={() => router.push("/signin")}
                    >
                      Sign In to Apply
                    </button>
                  )}
                
                
              </div>

       
            </div>
          </div>
        )}
      </div>

      <div className="max-sm:hidden bg-white md:mx-16 mt-16">
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


                {/* Qualifications */}
                <h2 className="text-xl font-bold text-gray-700 mb-2">
                  Qualifications
                </h2>
                <p className="text-gray-600 mb-4">{job?.qualification}</p>     
              </div>
              {/* Job Summary and Company Summary */}

              <div className="   ">
                <div className="grid grid-rows-1 md:grid-rows-1 gap-4 mt-4">
               
                  <div className="bg-white w-[24rem] p-4 rounded-md shadow-md">
                    <h2 className="text-lg font-bold text-black mb-2">
                    Apply for job
                    </h2>
            
                      <br />
                      {session?.user ? (
                        <>
                          <button
                            className="bg-black  h-10 w-36  text-white px-4  rounded hover:bg-black transition-colors"
                            onClick={() => handleApplyClick(job?._id)}
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
                    
           
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
         <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {job?.title}</DialogTitle>
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
            <div className="flex justify-center">

              {
                submitting ? (<button
                  onClick={(e :any) => handleSubmit(uid, e)}
                  disabled={loading}
                  className="bg-black text-white px-8 py-2 rounded disabled:opacity-50"
                >
                  Processing...
                </button>) : (<button
  onClick={(e :any) => handleSubmit(uid, e)}
  disabled={loading}
  className="bg-black text-white px-8 py-2 rounded disabled:opacity-50"
>
  Submit Application
</button>)
              }
            
</div>
          </form>
        </DialogContent>
      </Dialog>
      <Footer/>
    </div>
  );

}
export default Page;
