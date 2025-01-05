'use client'

import Navbar from "./components/global/Navbar";
import HeroSection from "./components/homeScreen/HeroSection";
import DataSection from "./components/homeScreen/DataSection";
import ExploreJobs from "./components/homeScreen/ExploreJobsCards"
import HowWeAreDifferent from "./components/homeScreen/HowWeDifferent";
import BlogCards from "./components/homeScreen/BlogCards";
import UdemyCourseCard from "./components/homeScreen/UdemyCourseCard";
import Footer from "./components/global/Footer";
export default function page() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] max-sm:overflow-y-hidden ">
      <Navbar/>
       <HeroSection/>
       <DataSection/>
       <ExploreJobs/>
       <BlogCards/>
       <UdemyCourseCard/>
       <HowWeAreDifferent/>
       <Footer/>
    </div>
  );
}
