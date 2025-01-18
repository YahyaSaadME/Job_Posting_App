/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';
import { useSession } from 'next-auth/react';
import ClipLoader from 'react-spinners/ClipLoader';
import Link from 'next/link';

const Page = () => {
  const { data: session, status }: any = useSession();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN
  const userEmail = session?.user?.email;
console.log(userEmail , adminEmail)
  if (status === 'loading') {
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}</h1>
      <p>You are authenticated and can view this page.</p>

      <div className="flex flex-col px-5 md:flex-row justify-between items-center bg-blue-100 p-6 md:p-8">
          <div className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">admin protected route</div>
          <Link href="/admin/course">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-md transition duration-300">
     for courses  
            </button>
          </Link>
        </div>
        <div className="flex flex-col px-5 md:flex-row justify-between items-center bg-blue-100 p-6 md:p-8">
          <div className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">admin protected route</div>
          <Link href="/admin/blogs">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-md transition duration-300">
        for blogs
            </button>
          </Link>
        </div>
        <div className="flex flex-col px-5 md:flex-row justify-between items-center bg-blue-100 p-6 md:p-8">
          <div className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">admin protected route</div>
          <Link href="/admin/itRefJobs">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-md transition duration-300">
             for approve it referral jobs
            </button>
          </Link>
        </div>
        <div className="flex flex-col px-5 md:flex-row justify-between items-center bg-blue-100 p-6 md:p-8">
          <div className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">admin protected route</div>
          <Link href="/admin/jobs">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-md transition duration-300">
              for jobs
            </button>
          </Link>
        </div>
        <div className="flex flex-col px-5 md:flex-row justify-between items-center bg-blue-100 p-6 md:p-8">
          <div className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">admin protected route</div>
          <Link href="/admin/categories">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-md transition duration-300">
         for creating categories
            </button>
          </Link>
        </div>
    </div>
  );
};

export default Page;
