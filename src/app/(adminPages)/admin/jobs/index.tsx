/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const fetchJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/jobs?page=${page}&search=${search}`);
      const data = await response.json();
      if (response.ok) {
        setJobs(data.data);
        setTotalPages(data.totalPages);
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
  }, [page, search]);

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

  const handleEdit = (jobId: string) => {
    router.push(`/admin/jobs/edit/${jobId}`);
  };

  return (
    <div className="container min-h-screen mx-auto mt-10 p-6">
     <div className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold mb-4">Job Listings</h1>
      <button onClick={()=>router.push("/admin/jobs/add")} className="p-2 bg-black text-white rounded-md hover:bg-gray-800">
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
            <th className="px-4 py-2 border">Company</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : jobs?.length > 0 ? (
            jobs.map((job: any) => (
              <tr key={job._id}>
                <td className="px-4 py-2 border">{job.company}</td>
                <td className="px-4 py-2 border">{job.title}</td>
                <td className="px-4 py-2 border">{job.location}</td>
                <td className="px-4 py-2 border">{job.category}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleEdit(job._id)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="text-red-600 hover:underline"
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
