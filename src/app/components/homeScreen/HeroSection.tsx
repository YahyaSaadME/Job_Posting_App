/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import Link from "next/link";


const HeroSection = () => {
  return (
    <div className="relative bg-gray-900 mt-12 p-9  text-white h-[88vh] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
  <Image
    src="/images/heroimg.jpg"
    alt="Cybersecurity background"
    layout="fill"
    objectFit="fill" /* Ensures the image fills the container proportionally */
    className="opacity-50"
  />
  <div className="absolute inset-0 bg-black/30"></div> {/* Adds a semi-transparent dark overlay */}
</div>

      {/* Content */}
      <div className="relative md:pr-32 max-sm:p-7 bg-cover bg-center h-screen flex mt-6 items-center justify-center">
    



  {/* Content */}
  <div className="text-center md:p-8 max-sm:p-6 half-border flex flex-col items-start justify-center">

    
    <h1 className="md:text-[4rem] max-sm:mt-3 text-3xl font-bold text-white mb-8 max-sm:mb-3">
      Elevate Your 
       


    </h1>

    <h1 className="md:text-[4rem] max-sm:hidden  text-3xl font-bold text-white mb-9 max-sm:mb-3">
     
       Cybersecurity Career


    </h1>
    <h1 className="md:text-5xl md:hidden  text-3xl font-bold text-white mb-2">
     
     Cybersecurity 


  </h1>
  <h1 className="md:text-5xl md:hidden  text-3xl font-bold text-white mb-6">
     
      Career


  </h1>
   
    <p className="md:text-2xl max-sm:hidden text-gray-300 mb-3 max-sm:mb-2">
      Discover a world of elite cybersecurity roles and connect with leading companies 
    </p>
    <p className="md:text-2xl max-sm:hidden text-gray-300 mb-12 max-sm:mb-6">
    driving digital protection forward.
    </p>
    <p className="md:text-2xl text-lg  md:hidden text-gray-300 mb-3 max-sm:mb-3">
      Discover a world of elite cybersecurity  

    roles and connect with leading companies 
 
    driving digital protection forward.
    </p>
   
  
   <Link href={"/jobs"}> <button className="bg-blue-600 h-14 w-48 text-white py-2 px-6 text-xl font-sans hover:bg-blue-700">
      Browse Jobs
    </button>
    </Link>
  </div>
</div>


    
    </div>
  );
};

export default HeroSection;
