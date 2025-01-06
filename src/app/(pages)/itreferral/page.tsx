/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [search, setsearch] = useState<string>("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [uid, setuid] = useState<string>("6777b98bde4abe31a6d4990a");
  const [status, setstatus] = useState<boolean | null | undefined>(undefined);

  const { data: session, status:s } = useSession();

  const handleSearch = async (page: number = 1) => {
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
    handleSearch();
  }, [search,status]);

  useEffect(() => {
    if (s === "authenticated") {
      setuid(session?.user?.id as string);
    }
  }, [session]);

  const handlePageChange = (page: number) => {
    handleSearch(page);
  };

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

  return (
    <div className="p-6">
      <div className="flex mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          placeholder="Search by title or company..."
          className="w-full p-2 border rounded shadow-md"
        />
        <button
          onClick={(e) => router.push("/itreferral/add")}
          className="bg-blue-500 ml-2 w-[100px] text-white rounded-md px-1 py-3 shaodow-md"
        >
          Add Job
        </button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Tags</th>
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
                {job.description}
              </td>
              <td className="py-2 px-4 border text-center">{job.category}</td>
              <td className="py-2 px-4 border text-center">
                {job.tags.join(", ")}
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
  );
}
