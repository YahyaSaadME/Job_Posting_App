import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const DataSection = () => {
    const [loading, setLoading] = useState(true);
    const [userCount, setUserCount] = useState(0);
    const [companyCount, setCompanyCount] = useState(0);
    const [jobCount, setJobCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/fetch/users");
                const result = await response.json();
                if (response.ok && result.success) {
                    setUserCount(result.data.count || 0);
                } else {
                    console.error("Error fetching user count:", result.message || "Unknown error");
                }
            } catch (error) {
                console.error("Error during API call:", error);
            }
        };

        const fetchCompanyCount = async () => {
            try {
                const response = await fetch("/api/fetch/howCompanies");
                const result = await response.json();
                if (response.ok && result.success) {
                    setCompanyCount(result.data.count || 0);
                } else {
                    console.error("Error fetching company count:", result.message || "Unknown error");
                }
            } catch (error) {
                console.error("Error during API call:", error);
            }
        };

        const fetchJobCount = async () => {
            try {
                const response = await fetch("/api/fetch/howJobs");
                const result = await response.json();
                if (response.ok && result.success) {
                    setJobCount(result.data.count || 0);
                } else {
                    console.error("Error fetching job count:", result.message || "Unknown error");
                }
            } catch (error) {
                console.error("Error during API call:", error);
            }
        };

        fetchData();
        fetchCompanyCount();
        fetchJobCount();
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <ClipLoader color={"#020617"} size={60} />
            </div>
        );
    }

    return (
        <div>
            <div className="bg-gray-100 text-black mt-4 py-1 lg:mx-16 max-sm:mx-4 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 gap-8 text-center">
                    <div>
                        <h2 className="text-2xl max-sm:text-2xl font-bold text-black">
                            {userCount}
                        </h2>
                        <p className=" text-lg max-sm:text-md">Users</p>
                    </div>
                    <div>
                        <h2 className="text-2xl max-sm:text-2xl font-bold text-black">
                            {companyCount}
                        </h2>
                        <p className="text-lg max-sm:text-md">Companies</p>
                    </div>
                    <div>
                        <h2 className="text-2xl max-sm:text-2xl font-bold text-black">
                            {jobCount}
                        </h2>
                        <p className=" text-lg max-sm:text-md">Jobs</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataSection;
