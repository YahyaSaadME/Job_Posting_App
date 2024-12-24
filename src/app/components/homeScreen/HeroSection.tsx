/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import heroImg  from "../../../../assets/heroImg.png"
const HeroSection = () => {
  return (
    <div className="relative bg-gray-900 text-white h-screen flex items-center justify-center">
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
  {/* Green Half Border */}
  <div className="absolute top-0 left-0 w-36 h-80 border-l-4 border-t-4 border-green-500"></div>

  {/* Content */}
  <div className="text-center px-6">
    <h1 className="text-4xl font-bold text-white mb-4">
      Elevate Your Cybersecurity Career
    </h1>
    <p className="text-lg text-white mb-8">
      Discover a world of elite cybersecurity roles and connect with leading companies driving digital protection forward.
    </p>
    <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
      Browse Jobs
    </button>
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
