'use client'
// pages/about.tsx

import {useRouter} from "next/navigation"

import Footer from "@/app/components/global/Footer";
import Navbar from "@/app/components/global/Navbar";

export default function AboutUs() {
    const router = useRouter()
  return (
    <>
    <Navbar/>
    <div className="bg-white text-gray-900 min-h-screen py-10 mt-16  px-5">
      <div className="max-w-6xl px-14 bg-gray-50 mx-16">
        <header className="text-center  mb-10">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            Welcome to SHIV INFOSEC, your one-stop destination for everything cybersecurity.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">What We Offer</h2>
          <ul className="list-disc ml-5 space-y-3">
            <li>
              <span className="font-bold">Blogs:</span> Dive into expert insights, practical tips, and the latest trends in cybersecurity and network technologies.
            </li>
            <li>
              <span className="font-bold">Free Courses:</span> Upskill yourself with beginner-friendly and advanced courses on cybersecurity, network security, and cloud computing—completely free.
            </li>
            <li>
              <span className="font-bold">Jobs:</span> Explore a wide range of exclusive job opportunities in cybersecurity, network security, and cloud from top-tier companies and startups.
            </li>
            <li>
              <span className="font-bold">IT Referral Program:</span> Unlock unique opportunities through our IT referral network, helping you land roles that align with your skills and aspirations.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Why Choose SHIV INFOSEC?</h2>
          <ul className="list-disc ml-5 space-y-3">
            <li>
              <span className="font-bold">Specialized Focus:</span> Dedicated exclusively to cybersecurity, network security, and cloud technologies, ensuring high-quality content and opportunities.
            </li>
            <li>
              <span className="font-bold">Curated Resources:</span> Job listings, blogs, and courses are carefully selected and updated to provide only the most relevant and impactful information.
            </li>
            <li>
              <span className="font-bold">Empowering Careers:</span> From free learning resources to exclusive job listings and IT referrals, we help you achieve your career goals in the tech industry.
            </li>
          </ul>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-3">Browse Jobs</h2>
          <p className="text-gray-600 mb-5">
            Ready to take the next step in your career? Click below to browse jobs and explore exciting opportunities in the world of cybersecurity and beyond.
          </p>
          <button onClick = { () => router.push('/jobs')} className="bg-black text-white px-6 py-3 rounded-lg shadow">
            Browse Jobs
          </button>
        </section>
      </div>
    </div>
    <Footer/>
    </>
  );
}
