
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { RiWhatsappFill } from "react-icons/ri";
import Link from "next/link";
import { toast ,  ToastContainer  } from 'react-toastify';


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
      
      <div className="container mx-auto  flex justify-between  items-center h-16">
        {/* Logo */}
        <Link href="/">
          <img
            src="https://storage.googleapis.com/cyberjobhunt/assets/CyberJobHunt.png"
            alt="CyberJobHunt Logo"
            className="h-14"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-9">
          <Link href="/blogs" className="text-gray-600 hover:text-gray-900">
            Blog
          </Link>
          <Link href="/free-courses" className="text-gray-600 hover:text-gray-900">
            Free Course
          </Link>
          <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
            Jobs
          </Link>
          <Link href="/categories" className="text-gray-600 hover:text-gray-900">
          Categories
          </Link>
          <Link href="/itReferralJobs" className="text-gray-600 hover:text-gray-900">
            Employee IT Referral
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-6">
        <Link href="https://www.linkedin.com/company/shivinfosec/" className="text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.225 0H1.771C.79 0 0 .792 0 1.767V22.23c0 .976.79 1.77 1.771 1.77H22.23c.976 0 1.77-.794 1.77-1.77V1.768C24 .792 23.206 0 22.225 0zM7.08 20.466H3.634V8.989H7.08v11.477zm-1.724-13.09c-1.167 0-2.116-.955-2.116-2.13s.95-2.12 2.117-2.12c1.167 0 2.116.949 2.116 2.12-.002 1.175-.95 2.13-2.117 2.13zm16.157 13.09h-3.45v-5.804c0-1.388-.025-3.17-1.93-3.17-1.93 0-2.23 1.506-2.23 3.068v5.906h-3.45V8.989h3.312v1.563h.048c.461-.872 1.588-1.794 3.272-1.794 3.5 0 4.148 2.306 4.148 5.308v6.4z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 7.075c-.817.363-1.692.609-2.612.718a4.493 4.493 0 0 0 1.983-2.48 9.016 9.016 0 0 1-2.862 1.093 4.516 4.516 0 0 0-7.69 4.109A12.803 12.803 0 0 1 3.203 5.15a4.48 4.48 0 0 0-.61 2.27c0 1.566.798 2.948 2.007 3.758a4.49 4.49 0 0 1-2.045-.566v.057a4.516 4.516 0 0 0 3.623 4.423 4.532 4.532 0 0 1-1.183.157c-.289 0-.57-.027-.845-.079a4.516 4.516 0 0 0 4.218 3.136 9.052 9.052 0 0 1-5.598 1.931c-.364 0-.722-.021-1.075-.062a12.797 12.797 0 0 0 6.917 2.025c8.303 0 12.841-6.875 12.841-12.843 0-.196-.004-.393-.014-.588A9.129 9.129 0 0 0 22 7.075z" />
                </svg>
              </Link>
                 {/* WhatsApp */}
          <Link href="https://www.whatsapp.com/channel/0029VaaglnXChq6ViYgA240B" className="text-gray-600 hover:text-gray-900">
           <RiWhatsappFill className="text-2xl"/>
          </Link>

          {/* YouTube */}
          <Link href="https://youtube.com" className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.02 3.02 0 0 0-2.132-2.133C19.637 3.5 12 3.5 12 3.5s-7.637 0-9.366.553a3.02 3.02 0 0 0-2.132 2.133C0 7.92 0 12 0 12s0 4.08.502 5.814a3.02 3.02 0 0 0 2.132 2.133c1.729.553 9.366.553 9.366.553s7.637 0 9.366-.553a3.02 3.02 0 0 0 2.132-2.133C24 16.08 24 12 24 12s0-4.08-.502-5.814zM9.745 15.568v-7.137l6.57 3.568-6.57 3.57z" />
            </svg>
          </Link>

          {/* Telegram */}
          <Link href="https://t.me/ShivInfoSec" className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.572 2.02a1.482 1.482 0 0 0-1.601-.16L2.632 10.02a1.485 1.485 0 0 0-.648 1.74 1.495 1.495 0 0 0 .992.944l2.984.896 1.119 3.346c.125.374.462.646.853.688.04.003.08.004.12.004a.989.989 0 0 0 .894-.553l1.75-3.442 4.415 3.177c.273.195.605.3.945.3.104 0 .209-.009.314-.028a1.495 1.495 0 0 0 1.183-1.146l3.73-15.245a1.485 1.485 0 0 0-.449-1.44zM9.11 13.065l-2.273-.682 9.088-6.517-6.815 7.2z" />
            </svg>
          </Link>
                  {session ? (
          <button
            onClick={handleLogout}
            className="block bg-red-500 text-white px-10 py-5   hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
                href="/signin"
                className="bg-blue-600 text-white px-10 py-5 font-bold  text-md hover:bg-blue-700 transition"
              >
            Log In
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
        className="md:hidden bg-white flex flex-col gap-2 shadow-lg px-4 py-6"
      >
        <Link href="/blogs" className="block text-gray-600 hover:text-gray-900 mb-2">
          Blog
        </Link>
        <Link href="/free-courses" className="block text-gray-600 hover:text-gray-900 mb-2">
          Free Course
        </Link>
        <Link href="/categories" className="block text-gray-600 hover:text-gray-900 mb-2">
        Categories
        </Link>
        <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
            Jobs
          </Link>
        <Link href="/itReferralJobs" className="block text-gray-600 hover:text-gray-900 mb-4">
          Employee IT Referral
        </Link>

        <div className=" md:hidden flex items-center space-x-6">
        <Link href="https://www.linkedin.com/company/shivinfosec/" className="text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.225 0H1.771C.79 0 0 .792 0 1.767V22.23c0 .976.79 1.77 1.771 1.77H22.23c.976 0 1.77-.794 1.77-1.77V1.768C24 .792 23.206 0 22.225 0zM7.08 20.466H3.634V8.989H7.08v11.477zm-1.724-13.09c-1.167 0-2.116-.955-2.116-2.13s.95-2.12 2.117-2.12c1.167 0 2.116.949 2.116 2.12-.002 1.175-.95 2.13-2.117 2.13zm16.157 13.09h-3.45v-5.804c0-1.388-.025-3.17-1.93-3.17-1.93 0-2.23 1.506-2.23 3.068v5.906h-3.45V8.989h3.312v1.563h.048c.461-.872 1.588-1.794 3.272-1.794 3.5 0 4.148 2.306 4.148 5.308v6.4z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 7.075c-.817.363-1.692.609-2.612.718a4.493 4.493 0 0 0 1.983-2.48 9.016 9.016 0 0 1-2.862 1.093 4.516 4.516 0 0 0-7.69 4.109A12.803 12.803 0 0 1 3.203 5.15a4.48 4.48 0 0 0-.61 2.27c0 1.566.798 2.948 2.007 3.758a4.49 4.49 0 0 1-2.045-.566v.057a4.516 4.516 0 0 0 3.623 4.423 4.532 4.532 0 0 1-1.183.157c-.289 0-.57-.027-.845-.079a4.516 4.516 0 0 0 4.218 3.136 9.052 9.052 0 0 1-5.598 1.931c-.364 0-.722-.021-1.075-.062a12.797 12.797 0 0 0 6.917 2.025c8.303 0 12.841-6.875 12.841-12.843 0-.196-.004-.393-.014-.588A9.129 9.129 0 0 0 22 7.075z" />
                </svg>
              </Link>
                 {/* WhatsApp */}
          <Link href="https://www.whatsapp.com/channel/0029VaaglnXChq6ViYgA240B" className="text-gray-600 hover:text-gray-900">
         <RiWhatsappFill className="text-2xl"/>
          </Link>

          {/* YouTube */}
          <Link href="https://youtube.com" className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.02 3.02 0 0 0-2.132-2.133C19.637 3.5 12 3.5 12 3.5s-7.637 0-9.366.553a3.02 3.02 0 0 0-2.132 2.133C0 7.92 0 12 0 12s0 4.08.502 5.814a3.02 3.02 0 0 0 2.132 2.133c1.729.553 9.366.553 9.366.553s7.637 0 9.366-.553a3.02 3.02 0 0 0 2.132-2.133C24 16.08 24 12 24 12s0-4.08-.502-5.814zM9.745 15.568v-7.137l6.57 3.568-6.57 3.57z" />
            </svg>
          </Link>

          {/* Telegram */}
          <Link href="https://t.me/ShivInfoSec" className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.572 2.02a1.482 1.482 0 0 0-1.601-.16L2.632 10.02a1.485 1.485 0 0 0-.648 1.74 1.495 1.495 0 0 0 .992.944l2.984.896 1.119 3.346c.125.374.462.646.853.688.04.003.08.004.12.004a.989.989 0 0 0 .894-.553l1.75-3.442 4.415 3.177c.273.195.605.3.945.3.104 0 .209-.009.314-.028a1.495 1.495 0 0 0 1.183-1.146l3.73-15.245a1.485 1.485 0 0 0-.449-1.44zM9.11 13.065l-2.273-.682 9.088-6.517-6.815 7.2z" />
            </svg>
          </Link>
          






          
        </div>
        {session ? (
          <button
            onClick={handleLogout}
            className="block bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link href="/signin" className="block bg-blue-600 text-white px-4 py-2 text-center mt-4 rounded-md hover:bg-blue-600">
           Log In
          </Link>
        )}
      </motion.div>
    </header>
  );
};

export default Navbar;
