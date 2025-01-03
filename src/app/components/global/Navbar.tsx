/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useSession , signOut} from 'next-auth/react';
const Navbar = () => {
  const {data : session} = useSession()
  const handleLogout = () => {
    signOut({
      callbackUrl: "/", // Redirect to the homepage or any other URL after logout
    });
  };
  return (
 
        <header className="bg-white shadow-md">
          <div className="container mx-auto pl-4 flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <img
                src="https://storage.googleapis.com/cyberjobhunt/assets/CyberJobHunt.png" // Replace with your logo path
                alt="CyberJobHunt Logo"
                className="h-14"
              />
              {/* <span className="text-lg font-semibold text-gray-800">Cyber<span className="text-green-500">Job</span>Hunt</span> */}
            </div>

            <nav className="hidden md:flex items-center gap-3 space-x-6">
          <a href="/blog" className="text-gray-600 hover:text-gray-900">
            Blog
          </a>
          <a href="/udemyCourses" className="text-gray-600 hover:text-gray-900">
            Udemy Free Course
          </a>
          <a href="/companies" className="text-gray-600 hover:text-gray-900">
            Companies
          </a>
          <a href="/employee-it-referral" className="text-gray-600 hover:text-gray-900">
            Employee IT Referral
          </a>
        </nav>
    
            {/* Social Icons */}
            <div className="flex items-center gap-1 space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.225 0H1.771C.79 0 0 .792 0 1.767V22.23c0 .976.79 1.77 1.771 1.77H22.23c.976 0 1.77-.794 1.77-1.77V1.768C24 .792 23.206 0 22.225 0zM7.08 20.466H3.634V8.989H7.08v11.477zm-1.724-13.09c-1.167 0-2.116-.955-2.116-2.13s.95-2.12 2.117-2.12c1.167 0 2.116.949 2.116 2.12-.002 1.175-.95 2.13-2.117 2.13zm16.157 13.09h-3.45v-5.804c0-1.388-.025-3.17-1.93-3.17-1.93 0-2.23 1.506-2.23 3.068v5.906h-3.45V8.989h3.312v1.563h.048c.461-.872 1.588-1.794 3.272-1.794 3.5 0 4.148 2.306 4.148 5.308v6.4z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 7.075c-.817.363-1.692.609-2.612.718a4.493 4.493 0 0 0 1.983-2.48 9.016 9.016 0 0 1-2.862 1.093 4.516 4.516 0 0 0-7.69 4.109A12.803 12.803 0 0 1 3.203 5.15a4.48 4.48 0 0 0-.61 2.27c0 1.566.798 2.948 2.007 3.758a4.49 4.49 0 0 1-2.045-.566v.057a4.516 4.516 0 0 0 3.623 4.423 4.532 4.532 0 0 1-1.183.157c-.289 0-.57-.027-.845-.079a4.516 4.516 0 0 0 4.218 3.136 9.052 9.052 0 0 1-5.598 1.931c-.364 0-.722-.021-1.075-.062a12.797 12.797 0 0 0 6.917 2.025c8.303 0 12.841-6.875 12.841-12.843 0-.196-.004-.393-.014-.588A9.129 9.129 0 0 0 22 7.075z" />
                </svg>
              </a>
                 {/* WhatsApp */}
          <a href="https://wa.me/1234567890" className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.001 0C5.372 0 0 5.373 0 12c0 2.119.55 4.163 1.596 5.973l-1.62 5.934 6.112-1.602A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.628 0 12.001 0zm6.012 17.212c-.252.706-1.466 1.356-2.028 1.435-.518.071-1.072.128-4.514-1.445-3.794-1.778-6.226-5.889-6.414-6.161-.188-.273-1.532-2.055-1.532-3.922 0-1.867.956-2.789 1.296-3.167a1.455 1.455 0 0 1 1.032-.47c.126 0 .244.004.346.008.308.013.463.032.669.515.252.564.86 1.956.936 2.1.071.148.117.318.022.5-.104.196-.155.318-.309.499-.151.177-.318.396-.451.525-.151.143-.307.3-.132.594.177.308.789 1.293 1.695 2.092 1.158 1.006 2.138 1.343 2.449 1.474.31.127.472.106.65-.06.178-.166.758-.863.96-1.163.2-.299.404-.247.665-.148.26.1 1.645.775 1.924.917.28.142.467.212.535.333.072.122.072.704-.182 1.41z" />
            </svg>
          </a>

          {/* YouTube */}
          <a href="https://youtube.com" className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.02 3.02 0 0 0-2.132-2.133C19.637 3.5 12 3.5 12 3.5s-7.637 0-9.366.553a3.02 3.02 0 0 0-2.132 2.133C0 7.92 0 12 0 12s0 4.08.502 5.814a3.02 3.02 0 0 0 2.132 2.133c1.729.553 9.366.553 9.366.553s7.637 0 9.366-.553a3.02 3.02 0 0 0 2.132-2.133C24 16.08 24 12 24 12s0-4.08-.502-5.814zM9.745 15.568v-7.137l6.57 3.568-6.57 3.57z" />
            </svg>
          </a>

          {/* Telegram */}
          <a href="https://telegram.me/yourusername" className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.572 2.02a1.482 1.482 0 0 0-1.601-.16L2.632 10.02a1.485 1.485 0 0 0-.648 1.74 1.495 1.495 0 0 0 .992.944l2.984.896 1.119 3.346c.125.374.462.646.853.688.04.003.08.004.12.004a.989.989 0 0 0 .894-.553l1.75-3.442 4.415 3.177c.273.195.605.3.945.3.104 0 .209-.009.314-.028a1.495 1.495 0 0 0 1.183-1.146l3.73-15.245a1.485 1.485 0 0 0-.449-1.44zM9.11 13.065l-2.273-.682 9.088-6.517-6.815 7.2z" />
            </svg>
          </a>
            </div>
    
            {/* Button */}
            <div>

              {
              session?.user ? (<>
              
              <a
                href="#"
                className="bg-red-700 text-white px-10 py-6 font-bold  text-md hover:bg-red-800 transition"
             onClick={handleLogout} >
                Log Out →
              </a></>) : ( <><a
                href="#"
                className="bg-blue-600 text-white px-10 py-6 font-bold  text-md hover:bg-blue-700 transition"
              >
                Explore Jobs →
              </a></>)
              }
              
            </div>
          </div>
        </header>
      );
    };
    



export default Navbar