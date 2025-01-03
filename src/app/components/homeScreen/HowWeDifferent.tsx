/* eslint-disable @next/next/no-img-element */
import React from "react";

const HowWeAreDifferent = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-gray-50 min-h-screen p-10">
      {/* Left Side: Image */}
      <div className="flex-1 flex items-center justify-center mb-10 lg:mb-0">
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.XdjG4P-4DMXKXgoQRFnxpQHaDT&pid=Api&P=0&h=180"
          alt="Team"
          className="w-full max-w-md lg:max-w-lg object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Right Side: Content */}
      <div className="flex-1 lg:pl-10 text-center lg:text-left">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          How we are different?
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Step into the world of cybersecurity excellence and advance your
          career with our specialized job portal. We connect skilled
          professionals with cutting-edge opportunities, offering personalized
          pathways to enhance your career trajectory in the dynamic field of
          digital security.
        </p>
        <ul className="space-y-4 mb-6">
          <li className="flex items-start">
            <span className="text-green-500 mr-3">
              &#10003;
            </span>
            <p>Curated listings only featuring jobs from top-tier Indian Companies and Startups</p>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-3">
              &#10003;
            </span>
            <p>Only Cybersecurity jobs, nothing else</p>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-3">
              &#10003;
            </span>
            <p>No outdated postings, daily refreshed job list</p>
          </li>
        </ul>
        <button className="px-6 py-3 bg-blue-700 text-white shadow hover:bg-blue-800 transition">
          Explore Jobs
        </button>
      </div>
    </div>
  );
};

export default HowWeAreDifferent;
