/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import Link from "next/link";

const HowWeAreDifferent = () => {
  return (
    <div id="about" className="flex flex-col lg:flex-row items-center justify-between bg-gray-50 min-h-screen p-10">
      {/* Left Side: Image */}
      <div className="flex-1 flex items-center justify-center mb-10 lg:mb-0">
        <div className="mt-12 p-9 w-full">
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <div className="relative w-full h-56">
              <Image
                src="/images/3.jpg"
                alt="Image 1"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="relative w-full h-56">
              <Image
                src="/images/2.jpg"
                alt="Image 2"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="relative w-full h-56">
              <Image
                src="/images/4.jpg"
                alt="Image 3"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="relative w-full h-56">
              <Image
                src="/images/1.jpg"
                alt="Image 4"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Content */}
      <div className="flex-1 lg:pl-10 text-center lg:text-left">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          How we are different?
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          At Shiv InfoSec, we specialize in connecting cybersecurity professionals with the best opportunities while providing resources to grow their careers.
        </p>
        <ul className="space-y-4 mb-6">
          <li className="flex items-start">
            <span className="text-green-500 mr-3">✔</span>
            <p>
              Curated Listings: Discover jobs from top-tier Indian companies and startups, carefully selected for relevance and quality.
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-3">✔</span>
            <p>
              Daily Updates: Say goodbye to outdated postings! Our listings are refreshed daily to keep you updated with the latest opportunities.
            </p>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-3">✔</span>
            <p>
              Beyond Jobs: Access insightful blogs, free courses, and exclusive employee referral opportunities, all designed to help you excel in the dynamic field of cybersecurity.
            </p>
          </li>
        </ul>
        <p className="text-gray-600 mb-6 leading-relaxed">
          With our personalized approach and industry-specific focus, we aim to redefine how professionals grow and succeed in cybersecurity. Lets grow together.
        </p>
        <Link href="/jobs">
          <div className="px-6 py-3 bg-blue-700 text-white shadow hover:bg-blue-800 transition">
            Explore Jobs
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HowWeAreDifferent;
