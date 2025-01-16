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
      className="bg-gray-100 pt-16 lg:m-16 lg:mb-0  max-sm:m-6 mt-2 max-sm:flex-col-reverse max-sm:gap-8 rounded-lg py-16 px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between"
    >
      {/* Left Content */}
      <div className="lg:w-1/2 mb-10 lg:mb-0">
        <h2 className="text-4xl max-sm:text-3xl font-bold text-gray-900 mb-4">
        Cybersecurity Simplified

        </h2>
        <p className="text-gray-600 text-lg mb-6">
        Dive into the fascinating world of Cybersecurity, Network Security, Network and Cloud with easy-to-follow blogs, Jobs , Employee IT referrals and Courses.
        
        </p>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
        Ready to stay ahead in Cybersecurity?
        </h3>
        <p className="text-gray-600 text-lg mb-6">
        
        Sign up to SHIV INFOSEC for the latest updates.
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
          src={"https://www.packetswitch.co.uk/content/images/size/w1000/2024/08/hero-3-.png"}
          alt="Network Automation"
          width={500}
          height={500}
          className="max-w-full"
        />
      </div>
    </motion.section>
  );
};

export default HeroSection;
