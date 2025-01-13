/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import Navbar from "@/app/components/global/Navbar";
import Footer from "@/app/components/global/Footer";

export default function Page() {
  const router = useRouter();
  const [search, setsearch] = useState<string>("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [uid, setUid] = useState<string>("");
  const [status, setstatus] = useState<boolean | null | undefined>(undefined);

  const { data: session, status:s }:any = useSession();


  const handleSearch = async (page: number = 1) => {
    if (!uid) {
      console.log("UID is not available yet.");
      return; // Don't make API call if UID is not set
    }

    try {
      const req = await fetch(
        `/api/itreferral?uid=${uid}&search=${search}&page=${page}&status=${status}`
      );
      const res = await req.json();
      setJobs(res.data);
      setCurrentPage(res.pagination.currentPage);
      setTotalPages(res.pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      setUid(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (uid) {
      handleSearch();
    }
  }, [search, status, uid]); // Ensure `uid` is included in dependencies

  const handlePageChange = (page: number) => {
    handleSearch(page);
  };

  console.log("jobs", jobs);
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/itreferral/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        handleSearch(currentPage);
      } else {
        console.log("Error deleting job");
      }
    } catch (error) {
      console.log("An error occurred while deleting the job.");
    }
  };
  if (s === 'loading') {
    return   <div className="flex justify-center items-center h-screen w-full">
    <ClipLoader color={"#2563eb"} size={60} />
  </div>
  }
  if (!session) {
    router.push('/signin')
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p className="text-red-600">You need to be authenticated to view this page.</p>
      </div>
    );
  }

  // Unauthorized page for non-job posters
  if (session?.user?.type === 'jobSeeker') {
    return (
      <>
      <Navbar/>
      <div className="flex  mt-16 mb-6 flex-col justify-center items-center h-screen bg-gray-50 text-black">
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
      <Footer/>
      </>
    );
  }

  return (

    <>


{/* 
    {
      session?.user?.type = ""
    } */}
    <Navbar/>
    <div className="p-6 mt-10 mb-6">
      <div className='flex flex-wrap justify-center w-full m-6 '>
              <h2 className='text-3xl font-sans font-bold'> IT Referral Job Posting Page </h2>
            </div>
      <div className="flex mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          placeholder="Search by title or company..."
          className="w-full p-2 border rounded shadow-md"
        />
        <button
          onClick={(e: any) => router.push("/itreferral/add")}
          className="bg-blue-500 ml-2 w-[100px] text-white rounded-md px-1 py-3 shaodow-md"
        >
          Add Job
        </button>

      </div>
      <div className=" m-5">
      <h1>Welcome, {session?.user?.name}!</h1>
      <p>Email: {session?.user?.email}</p>
    </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Company</th>
        
            <th className="py-2 px-4 border"><select name="Status" id="" className="w-fit" onChange={e=>{setstatus(e.target.value as unknown as boolean | null | undefined);}}>
                <option value="undefined">All</option>
                <option value="true">Approved</option>
                <option value="false">Pending</option>
                <option value="null">Declined</option>
              </select></th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td className="py-2 px-4 border text-justify">{job.title}</td>
              <td className="py-2 px-4 border text-justify">
                {job.companyName}
              </td>
            
         
              <td className="py-2 px-4 border text-center">
                {job.approved == true
                  ? "Approved"
                  : job.approved == null
                  ? "Declined"
                  : "Pending"}
              </td>
              <td className="py-2 px-4 border text-center">
                <button
                  onClick={() => router.push(`/itreferral/${job._id}`)}
                  className="bg-yellow-500 text-white rounded-md px-2 py-1 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-white rounded-md px-2 py-1"
                >
                  Delete
                </button>
                <button
                  onClick={() => router.push(`/itreferral/applicants/${job._id}`)}
                  className="bg-green-500 text-white rounded-md px-2 py-1 mr-2"
                >
                  View applicants
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
}
