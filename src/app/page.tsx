'use client';

import { useState, useEffect } from "react";
import Navbar from "./components/global/Navbar";
import HeroSection from "./components/homeScreen/HeroSection";
import DataSection from "./components/homeScreen/DataSection";
import ExploreJobs from "./components/homeScreen/ExploreJobsCards";
import HowWeAreDifferent from "./components/homeScreen/HowWeDifferent";
import BlogCards from "./components/homeScreen/BlogCards";
import UdemyCourseCard from "./components/homeScreen/UdemyCourseCard";
import Footer from "./components/global/Footer";
import ClipLoader from 'react-spinners/ClipLoader';

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call or data fetching
    const fetchData = async () => {
      try {
        // Add your API calling logic here
        // For example:
        // const response = await fetch('/api/data');
        // const data = await response.json();

        // Simulating delay for API call (replace this with actual API fetching)
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Simulate 2 seconds delay
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color={"#2563eb"} size={60} />
      </div>
    );
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)] max-sm:overflow-y-hidden">
      <Navbar />
      <HeroSection />
      <DataSection />
      <ExploreJobs />
      <BlogCards />
      <UdemyCourseCard />
      <HowWeAreDifferent />
      <Footer />
    </div>
  );
}
