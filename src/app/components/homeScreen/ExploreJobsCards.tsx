import Link from 'next/link';
import { FaCloud } from "react-icons/fa";

const JobRoles = () => {
  const jobRoles = [
    {
      title: "GRC Profile",
      count: 22,
      icon: "shield", 
    },
    {
      title: "SOC Operations",
      count: 8,
      icon: "grid", 
    },
    {
      title: "Security Support",
      count: 3,
      icon: "cloud", 
    },
    {
      title: "Penetration Testing",
      count: 8,
      icon: "code", 
    },
    {
      title: "Security Sales",
      count: 3,
      icon: "chart-bar", 
    },
    {
      title: "Cloud Security",
      count: 19,
      icon: "clipboard-check", 
    },
    {
      title: "Security Engineering",
      count: 25,
      icon: "user", 
    },
    {
      title: "DevSecOps",
      count: 2,
      icon: "cog", 
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  "> 
      <h1 className="text-3xl font-bold mb-11">Explore Job Roles</h1> 

      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-12">
        {jobRoles.map((role) => (
            <>
           
          <Link href={`/jobs/?category=${role.title}`} key={role.title} className="flex flex-col items-center justify-center bg-white border shadow-xl  text-blue-600 rounded-md p-8"> 
          <FaCloud className='text-5xl text-blue-600'/>
            <span className={`material-icons text-3xl mb-2 ${role.icon}`}>
              {/* Replace with actual Material Icons */}
            </span>
            <h3 className="text-lg font-semibold">{role.title}</h3>
            <span>{role.count} Jobs</span>
          </Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default JobRoles;