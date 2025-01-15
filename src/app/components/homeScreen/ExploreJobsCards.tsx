
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { motion } from "framer-motion";
import Image from "next/image";



  const Tags = () => { 
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true); 
    const openBlog = (id: string) => { router.push(`/free-courses/${id}`); };
    const router = useRouter();
     useEffect(() => 
      { const getCourses = async () => { try
        { const response = await fetch('/api/courses/latestCourse');
           const data = await response.json();
            setCourses(Array.isArray(data.data) ? data.data : []);
             setLoading(false); } 
             catch (error) { console.error('Error fetching courses:', error);
               setLoading(false); } }; getCourses(); }, []); 
               if (loading) { return ( <div className="flex justify-center items-center h-screen w-full"> <ClipLoader color={"#2563eb"} size={60} /> </div> ); }

    return (
      <div className="p-3 mx-16 mt-8">
      <div className='flex gap-14 mb-8'>
          <h2 className="text-3xl font-bold font-sans text-gray-400">Tags</h2>
          <Link href={"/blogs"}>
              <p className="text-gray-500 text-lg md:mt-2">View All →</p>
          </Link>
      </div>
      <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <motion.div>
              
                    </motion.div>
               </div>
               </div>
          
    );
};

export default Tags;
