'use client'

import Navbar from "./components/global/Navbar";
import HeroSection from "./components/homeScreen/HeroSection";
import DataSection from "./components/homeScreen/DataSection";
import ExploreJobs from "./components/homeScreen/ExploreJobsCards"
export default function page() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Navbar/>
       <HeroSection/>
       <DataSection/>
       <ExploreJobs/>
    </div>
  );
}
