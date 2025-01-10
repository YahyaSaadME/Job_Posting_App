import React, { useEffect, useState } from 'react';

const DataSection = () => {
  const [loading, setLoading] = useState(false);
  const [userCount, setUserCount] = useState<number>(0);  // Initialize with 0
  const [companyCount, setCompanyCount] = useState<number>(0); // Initialize with 0
  const [jobCount, setJobCount] = useState<number>(0); // Initialize with 0

  useEffect(() => {
    setLoading(true);
    async function fetchUserCount() {
      try {
        const response = await fetch("/api/fetch/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setLoading(false);
        if (response.ok && result.success) {
          setUserCount(result.data.count || 0); // Ensure a default value of 0
        } else {
          console.error("Error fetching user count:", result.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error during API call:", error);
        setLoading(false);  // Set loading to false if there's an error
      }
    }

    fetchUserCount();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchCompanyCount() {
      try {
        const response = await fetch("/api/fetch/howCompanies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setLoading(false);
        if (response.ok && result.success) {
          setCompanyCount(result.data.count || 0); // Ensure a default value of 0
        } else {
          console.error("Error fetching company count:", result.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error during API call:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    }

    fetchCompanyCount();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchJobCount() {
      try {
        const response = await fetch("/api/fetch/howJobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setLoading(false);
        if (response.ok && result.success) {
          setJobCount(result.data.count || 0); // Ensure a default value of 0
        } else {
          console.error("Error fetching job count:", result.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error during API call:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    }

    fetchJobCount();
  }, []);

  return (
    <div>
      {/* Stats Section */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 gap-8 text-center">
          <div>
            <h2 className="text-4xl max-sm:text-2xl font-bold text-blue-500">
              {loading ? 'Loading...' : userCount}
            </h2>
            <p className="mt-2 text-lg max-sm:text-md">Users</p>
          </div>
          <div>
            <h2 className="text-4xl max-sm:text-2xl font-bold text-blue-500">
              {loading ? 'Loading...' : companyCount}
            </h2>
            <p className="mt-2 text-lg max-sm:text-md">Companies</p>
          </div>
          <div>
            <h2 className="text-4xl max-sm:text-2xl font-bold text-blue-500">
              {loading ? 'Loading...' : jobCount}
            </h2>
            <p className="mt-2 text-lg max-sm:text-md">Jobs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSection;
