'use client';

import Navbar from "./components/global/Navbar";
import HeroSection from "./components/homeScreen/HeroSection";
import DataSection from "./components/homeScreen/DataSection";
import ExploreJobs from "./components/homeScreen/ExploreJobsCards";

import BlogCards from "./components/homeScreen/BlogCards";
import UdemyCourseCard from "./components/homeScreen/UdemyCourseCard";
import Footer from "./components/global/Footer";

export default function Page() {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="mt-24"><HeroSection /></div>
      
      <DataSection />
      <ExploreJobs />
      <BlogCards />
      <UdemyCourseCard />
 
      <Footer />
    </div>
  );
}
