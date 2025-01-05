/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import heroImg  from "../../../../assets/heroImg.png"
import Link from "next/link";
const HeroSection = () => {
  return (
    <div className="relative bg-gray-900 mt-12 md:p-6 p-4 text-white h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src = {heroImg}// Replace with your image path in `public/`
          alt="Cybersecurity background"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
      </div>

      {/* Content */}
      <div className="relative bg-cover bg-center h-screen flex items-center justify-center">
    



  {/* Content */}
  <div className="text-center md:p-6 p-4 half-border flex flex-col items-start justify-center">
    <h1 className="md:text-5xl max-sm:mt-3 text-3xl font-bold text-white mb-2">
      Elevate Your 
       


    </h1>

    <h1 className="md:text-5xl  max-sm:hidden  text-3xl font-bold text-white mb-6">
     
       Cybersecurity Career


    </h1>
    <h1 className="md:text-5xl md:hidden  text-3xl font-bold text-white mb-3">
     
     Cybersecurity 


  </h1>
  <h1 className="md:text-5xl md:hidden  text-3xl font-bold text-white mb-6">
     
      Career


  </h1>
   
    <p className="md:text-2xl max-sm:hidden text-white mb-3">
      Discover a world of elite cybersecurity roles and connect with leading companies 
    </p>
    <p className="md:text-2xl max-sm:hidden text-white mb-14">
    driving digital protection forward.
    </p>
    <p className="md:text-2xl text-lg  md:hidden text-white mb-3">
      Discover a world of elite cybersecurity  

    roles and connect with leading companies 
 
    driving digital protection forward.
    </p>
   
  
   <Link href={"/jobs"}> <button className="bg-blue-600 h-14 w-48 text-white py-2 px-6 rounded-md hover:bg-blue-700">
      Browse Jobs
    </button>
    </Link>
  </div>
</div>


      {/* Logo */}
      <div className="absolute bottom-4 right-4">
        <Image
          src="https://storage.googleapis.com/cyberjobhunt/assets/CyberJobHunt2.png" // Replace with your logo path in `public/`
          alt="Logo"
          width={50}
          height={50}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default HeroSection;
