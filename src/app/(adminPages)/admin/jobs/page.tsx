/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import ClipLoader from 'react-spinners/ClipLoader';
import Link from "next/link";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setstatus] = useState<boolean | null | undefined>(undefined);
  const router = useRouter();
  const { data: session, status:s }: any = useSession();
  const adminEmail ="shivinfosec15@gmail.com"
  const userEmail = session?.user?.email;
  
  const fetchJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/jobs/all?page=${page}&search=${search}&status=${status}`
      );
      const data = await response.json();
      if (response.ok) {
        setJobs(data.data);
        setTotalPages(data.pages);
        setPage(data.page);
      } else {
        setError(data.message || "Failed to load jobs");
      }
    } catch (error) {
      setError("An error occurred while fetching jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, search, status]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 when search changes
  };

  const handleDelete = async (jobId: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(`/api/jobs/${jobId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setJobs(jobs.filter((job: any) => job._id !== jobId));
        } else {
          const data = await response.json();
          setError(data.message || "Error deleting job");
        }
      } catch (error) {
        setError("An error occurred while deleting the job.");
      }
    }
  };
  const handleApproval = async (jobId: string, status: boolean | null) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        body: JSON.stringify({ _id: jobId, approved: status }),
      });
      if (response.ok) {
        fetchJobs();
      } else {
        const data = await response.json();
        setError(data.message || "Error updating job");
      }
    } catch (error) {
      setError("An error occurred while updating the job.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (jobId: string) => {
    router.push(`/admin/jobs/edit/${jobId}`);
  };
  if (s === 'loading') {
    return (
    <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#2563eb" size={60} />
    </div>
    );
}

if (!session) {
    return (
    <div className="flex justify-center items-center h-screen w-full">
        <p className="text-red-600">You need to be authenticated to view this page.</p>
    </div>
    );
}

if (userEmail !== adminEmail) {
    return (
    <div className="flex mt-16 mb-6 flex-col justify-center items-center h-screen bg-gray-50 text-black">
        <div className="bg-red-400 p-6 rounded-md shadow-md text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
        <p>This page is a protected route for admin only. You cant access the features.</p>
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
    <div className="container min-h-screen mx-auto mt-10 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
        <button
          onClick={() => router.push("/admin/jobs/add")}
          className="p-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Add Job
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by title or company..."
        className="w-full p-2 border rounded-md mb-4"
      />

      {error && <p className="text-red-600">{error}</p>}

      <table className="min-w-full table-auto border-collapse mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Company</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">By</th>
            <th className="px-4 py-2 border">
              <select
                name="Status"
                id=""
                className="w-fit"
                onChange={(e) => {
                  setstatus(
                    e.target.value as unknown as boolean | null | undefined
                  );
                }}
              >
                <option value="undefined">All</option>
                <option value="true">Approved</option>
                <option value="false">Pending</option>
                <option value="null">Declined</option>
              </select>
            </th>
            <th className="px-4 py-2 border max-w-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.length > 0 ? (
            jobs.map((job: any) => (
              <tr key={job._id}>
                <td className="px-4 py-2 border text-justify">{job.title}</td>
                <td className="px-4 py-2 border text-justify">{job.company}</td>
                <td className="px-4 py-2 border text-center">{job.location}</td>
                <td className="px-4 py-2 border text-center">{job.category}</td>
                <td className="px-4 py-2 border text-center">
                  {!job.by ? "Admin" : job.by}
                </td>
                <td className="px-4 py-2 border text-center">
                  {job.approved === true
                    ? "Approved"
                    : job.approved === false
                    ? "Pending"
                    : "Declined"}
                </td>
                <td className="px-4 py-2 border max-w-sm text-center">
                  <button
                    onClick={() =>
                      handleApproval(
                        job._id,
                        job.approved === true ? null : true
                      )
                    }
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                  >
                    {job.approved === true ? "Decline" : "Approve"}
                  </button>
                  <button
                    onClick={() => handleEdit(job._id)}
                    className="bg-blue-500  mx-2 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-500 mx-2 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {loading ? <p className="text-center py-4">Loading...</p> : ""}

      <div className="flex justify-between items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          disabled={page === 1}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Jobs;
