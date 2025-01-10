/* eslint-disable react/jsx-no-undef */

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import Image from "next/image";
//import Link from "next/navigation"
import { useRouter } from 'next/navigation';
const  UdemyCourseCard = () => {

  const [courses, setCourses] : any = useState<any>([])
 const router = useRouter()

  const openBlog = (id: string) => {
    router.push(`/free-courses/${id}`);
   
  };
    useEffect(() => {
      const getCourses = async () => {
        try {
        
          const response = await fetch('/api/courses/latestCourse');
          const data = await response.json();
          setCourses(Array.isArray(data.data) ? data.data : []);
      
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      };
      getCourses();
    }, []);

  console.log("course is" , courses)

  return (
    <div className=''>
    <div className="p-3 m-2 mt-10 ">
        <div className='flex pl-7 gap-14 mb-6'>
      <h2 className="text-2xl font-bold ">Courses </h2>
       <a href={"/free-courses"}> <p className="text-gray-500 text-lg mt-1">View All →</p></a>
      </div>
      <div className="flex flex-wrap gap-6 p-6 pt-1 cursor-pointer">
        {courses.map((course: {
          _id: any;
          duration: any;
          tags: any; thumbnail: any; title: any | string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; 
})  => (
          <>
         <div key= {course.title} className="bg-gray-50 max-sm:w-[16rem] md:w-[22rem] h-auto space-y-3 rounded-lg p-7 shadow-lg">
         <div className="flex justify-center mb-4">
                       <Image
                        src={`${window.location.origin}/images/${course.thumbnail}`}
                        alt={course.title}
                        className="w-full md:h-44 max-sm:h-auto rounded-md object-fill"
                        width={200}
                        height={150}
                      />
         </div>
         <div className=' flex gap-1 flex-wrap'>
          {course.tags.map((cat: string, index: React.Key | null | undefined) => (
                                         <span 
                                           key={index} 
                                           className="text-sm  bg-blue-100 text-blue-600 px-2 py-1 rounded"
                                         >
                                           {cat}
                                         </span>
                                       ))}
                 </div>
         <h3 className="text-lg font-bold mb-2 text-black hover:underline" onClick={() => openBlog(course._id)}>{course.title}</h3>
         <p className="text-gray-600">{course.description}</p>


         <p className="text-gray-900"> <span className='font-semibold'>Duration :</span> {course.duration}</p>
         <button className="text-blue-600 mt-4 font-sans  " onClick={() => openBlog(course._id)}> View course</button>
       </div>

       </>
        ))}
      </div>
    </div>
    </div>
  );
};

export default UdemyCourseCard;