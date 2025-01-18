/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.section
      initial={{ y: -50, opacity: 0 }} // Start position (upward)
      animate={{ y: 0, opacity: 1 }} // End position (natural position)
      transition={{ duration: 0.8, ease: "easeOut" }} // Animation duration
      className="bg-gray-100 pt-6 lg:m-16 lg:mb-0  max-sm:m-6 mt-2 max-sm:flex-col-reverse max-sm:gap-8 rounded-lg py-4 px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between"
    >
      {/* Left Content */}
      <div className="lg:w-1/2 mb-10 lg:mb-0">
        <h2 className="text-4xl max-sm:text-3xl font-bold text-gray-900 mb-4">
        Cybersecurity Made Simple
        </h2>
        <p className="text-gray-600 text-lg mb-6">
        Explore the dynamic world of Cybersecurity, Network Security, Network, and Cloud with insightful blogs, free courses, IT referral opportunities, and top job listings
        
        </p>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
        Ready to elevate your career in Cybersecurity?
        </h3>
        <p className="text-gray-600 text-lg mb-6">
        
        Click below to *browse jobs* and discover your next opportunity!
        </p>
        <Link href={"/jobs"}>
          <button className="bg-black text-gray-100 font-bold py-3 px-6 w-60 rounded-full hover:bg-zinc-950">
           Browse Jobs
          </button>
        </Link>
      </div>

      {/* Right Image */}
      <div className="lg:w-1/2 flex items-center justify-center">
        <Image
          src="/images/hero.svg"
          alt="Network Automation"
          width={500}
          height={300}
          className="max-w-full h-96"
        />
      </div>
    </motion.section>
  );
};

export default HeroSection;
