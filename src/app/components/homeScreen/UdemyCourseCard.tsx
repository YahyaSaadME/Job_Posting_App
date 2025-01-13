/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

  import React, { useEffect, useState } from 'react';
   import Image from "next/image";
    import { useRouter } from 'next/navigation';
     import ClipLoader from 'react-spinners/ClipLoader'; 
     const UdemyCourseCard = () => { const [courses, setCourses] = useState([]);
       const [loading, setLoading] = useState(true); 
       const openBlog = (id: string) => { router.push(`/free-courses/${id}`); };
       const router = useRouter(); useEffect(() => { const getCourses = async () => { try { const response = await fetch('/api/courses/latestCourse'); const data = await response.json(); setCourses(Array.isArray(data.data) ? data.data : []); setLoading(false); } catch (error) { console.error('Error fetching courses:', error); setLoading(false); } }; getCourses(); }, []); if (loading) { return ( <div className="flex justify-center items-center h-screen w-full"> <ClipLoader color={"#2563eb"} size={60} /> </div> ); }
  return (
    <div className=''>
    <div className="p-3 m-2 mt-10 ">
        <div className='flex pl-7 gap-14 mb-6'>
      <h2 className="text-2xl font-bold ">Courses </h2>
       <a href={"/free-courses"}> <p className="text-gray-500 text-lg mt-1">View All →</p></a>
      </div>
      <div className="flex flex-wrap gap-12 p-6 pt-1 cursor-pointer">
        {courses.map((course: any)  => (
      
         <div     key={course._id.toString()} className="bg-gray-100 max-sm:w-[16rem] md:w-[22rem] h-auto space-y-3 rounded-lg p-7 shadow-lg">
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

     
        ))}
      </div>
    </div>
    </div>
  );
};

export default UdemyCourseCard;