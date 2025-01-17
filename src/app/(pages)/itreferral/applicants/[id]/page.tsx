/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { usePathname , useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Import useSession
import ClipLoader from 'react-spinners/ClipLoader';
import Link from 'next/link';

interface Applicant {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  resume: string;
  currentCompany: string;
  noticePeriod: string;
}


const ApplicantTable = ({ jobId }: { jobId: string }) => {
   

const router = useRouter()

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { data: session, status } = useSession(); // Get session data
 

  // Redirect to sign-in page if user is not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch(`/api/itreferral/applicants/${jobId}`);
        if (!response.ok) 
          {
            console.log('Failed to fetch applicants');
          }
        const data = await response.json();
        setApplicants(data);
      } catch (err) {
        setError('Failed to load applicants.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (loading) return <div className="flex justify-center items-center h-screen w-full">
  <ClipLoader color={"#020617"} size={60} />
</div>
  if (error) return <p>{error}</p>;
  if (session?.user?.type === 'jobSeeker') {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 text-black">
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
    );
  }
  return (
    <div className="overflow-x-auto">
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className="px-4 py-2 border-b border-gray-200">Name</th>
          <th className="px-4 py-2 border-b border-gray-200">Email</th>
          <th className="px-4 py-2 border-b border-gray-200">Mobile</th>
          <th className="px-4 py-2 border-b border-gray-200">Resume</th>
          <th className="px-4 py-2 border-b border-gray-200">Current Company</th>
          <th className="px-4 py-2 border-b border-gray-200">Notice Period</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {applicants.map((applicant) => (
          <tr key={applicant._id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b border-gray-200">{applicant.name}</td>
            <td className="px-4 py-2 border-b border-gray-200">{applicant.email}</td>
            <td className="px-4 py-2 border-b border-gray-200">{applicant.mobile}</td>
            <td className="px-4 py-2 border-b border-gray-200">
              <a href={applicant.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Resume</a>
            </td>
            <td className="px-4 py-2 border-b border-gray-200">{applicant.currentCompany}</td>
            <td className="px-4 py-2 border-b border-gray-200">{applicant.noticePeriod}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

const JobApplicantsPage = () => {
 
  const pathname = usePathname()
  const jobId : any= pathname?.split('/').pop();
console.log(jobId)
const router = useRouter()

  if (!jobId) return <p>Loading job details...</p>;

  return (
    <div className="p-6">
   <h1 className="text-2xl font-bold mb-4">Applicants for Job ID:ID: {jobId}</h1>
      <ApplicantTable jobId={jobId as string} />
    </div>
  );
};

export default JobApplicantsPage;
