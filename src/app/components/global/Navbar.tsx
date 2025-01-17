
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FaWhatsappSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import Link from "next/link";
import { toast ,  ToastContainer  } from 'react-toastify';
import { FaLinkedin } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // Framer Motion variants for the toggle menu
  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  const handleLogout = () => {
  
    signOut({ callbackUrl: "/" });
    toast("loged out !!")
  };

  return (
    <header className="bg-white shadow-md fixed z-20 w-full  top-0 left-0 h-16">
< ToastContainer />
      
      <div className="    flex justify-between  max-sm:justify-between mx-4 items-center h-16">
        {/* Logo */}
        
        <div>
        <Link href="/">
       <h1 className=" font-bold text-2xl hover:text-gray-800">Shiv InfoSec</h1>
        </Link>
        </div>
   <div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/blogs" className="text-gray-900  text-md font-bold hover:underline hover:text-gray-600">
            Blog
          </Link>
          <Link href="/free-courses" className="text-gray-900  hover:underline text-md font-bold hover:text-gray-600">
            Free Course
          </Link>
          <Link href="/jobs" className="text-gray-900  text-md  hover:underline font-bold hover:text-gray-600">
            Jobs
          </Link>
          <Link href="/categories" className="text-gray-900 hover:underline text-md font-bold hover:text-gray-600">
          Categories
          </Link>
          <Link href="/itReferralJobs" className="text-gray-900 hover:underline text-md font-bold hover:text-gray-600">
            Employee IT Referral
          </Link>
        </nav>
        </div>
        {/* Social Icons */}
       
        <div className="hidden md:flex items-center space-x-4">
        <Link href="https://www.linkedin.com/company/shivinfosec/" className="text-blue-700 hover:text-blue-800">
            <FaLinkedin className="text-3xl"/>
              </Link>
              <Link href="#" className="text-zinc-950 hover:text-black">
                <FaTwitterSquare className="text-3xl"/>
              </Link>
                 {/* WhatsApp */}
          <Link href="https://www.whatsapp.com/channel/0029VaaglnXChq6ViYgA240B" className="text-green-600 hover:text-green-800">
           <FaWhatsappSquare className="text-3xl"/>
          </Link>

          {/* YouTube */}
          <Link href="https://youtube.com" className="text-red-600 hover:text-red-700">
           <IoLogoYoutube className="text-3xl"/>
          </Link>

          {/* Telegram */}
          <Link href="https://t.me/ShivInfoSec" className="text-sky-600 hover:text-sky-800">
           <FaTelegram className="text-3xl"/>
          </Link>
          </div>

          <div className="hidden md:flex">
                  {session ? (
          <button
            onClick={handleLogout}
           className="bg-black text-gray-100 font-sans py-3 px-6  w-28 rounded-full hover:bg-zinc-950"
          >
            Logout
          </button>
        ) : (
          <Link
                href="/signin"
           className="bg-black text-gray-100 font-sans py-3 px-4 w-28 text-center rounded-full hover:bg-zinc-950"
              >
            Sign In
              </Link>
        )}


</div>




          
      

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>

      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="md:hidden bg-white   flex flex-col gap-6 shadow-lg px-4 py-6"
      >
           <Link href="/blogs" className="text-gray-900  text-md font-sans hover:text-gray-600">
            Blog
          </Link>
          <Link href="/free-courses" className="text-gray-900  text-md font-sans hover:text-gray-600">
            Free Course
          </Link>
          <Link href="/jobs" className="text-gray-900  text-md font-sans hover:text-gray-600">
            Jobs
          </Link>
          <Link href="/categories" className="text-gray-900  text-md font-sans hover:text-gray-600">
          Categories
          </Link>
          <Link href="/itReferralJobs" className="text-gray-900  text-md font-sans hover:text-gray-600">
            Employee IT Referral
          </Link>

        <div className=" md:hidden flex items-center space-x-6">
        <Link href="https://www.linkedin.com/company/shivinfosec/" className="text-blue-700 hover:text-blue-800">
            <FaLinkedin className="text-3xl"/>
              </Link>
              <Link href="#" className="text-zinc-950 hover:text-black">
                <FaTwitterSquare className="text-3xl"/>
              </Link>
                 {/* WhatsApp */}
          <Link href="https://www.whatsapp.com/channel/0029VaaglnXChq6ViYgA240B" className="text-green-600 hover:text-green-800">
           <FaWhatsappSquare className="text-3xl"/>
          </Link>

          {/* YouTube */}
          <Link href="https://youtube.com" className="text-red-600 hover:text-red-700">
           <IoLogoYoutube className="text-3xl"/>
          </Link>

          {/* Telegram */}
          <Link href="https://t.me/ShivInfoSec" className="text-sky-600 hover:text-sky-800">
           <FaTelegram className="text-3xl"/>
          </Link>
          






          
        </div>
        {session ? (
          <button
            onClick={handleLogout}
              className="bg-black text-gray-100 font-bold py-3 px-6  w-full rounded-xl hover:bg-zinc-950"
          >
            Logout
          </button>
        ) : (
          <Link href="/signin"
              className="bg-black text-gray-100 font-bold py-3 px-6  w-full rounded-xl hover:bg-zinc-950">
           Sign In
          </Link>
        )}
      </motion.div>
    </header>
  );
};

export default Navbar;
