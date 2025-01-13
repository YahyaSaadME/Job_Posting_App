/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
/* eslint-disable @next/next/no-img-element */
import Footer from "@/app/components/global/Footer";
import Navbar from "@/app/components/global/Navbar";
import Image from "next/image";
import React , {useState , useEffect} from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { useRouter } from "next/navigation";

const Page = () => {


  const [courses, setCourses] : any = useState<any>([])
  const [loading ,setLoading] = useState(false)

 const router = useRouter()

  const openBlog = (id: string) => {
    router.push(`/free-courses/${id}`);
   
  };
  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/courses');
        const data = await response.json();
        setCourses(Array.isArray(data.data) ? data.data : []);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    getCourses();
  }, []);
  return (
    <>
    <Navbar/>

    {loading ? (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color={"#2563eb"} size={60} />
      </div>
    ) : (
    <div className="  px-14 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-6 text-center"> Free Courses</h1>
           <div className="flex flex-wrap  gap-8 p-2 pt-1 cursor-pointer">
             {courses.map((course: {
               _id: string;
               id: any ;
               duration: any;
               tags: any; thumbnail: any; title: any | string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; 
     })  => (
               <>
              <div onClick={() => openBlog(course._id)} key={courses._id} className="bg-gray-50  w-[22rem] h-auto space-y-3 rounded-lg p-7 shadow-lg">
              <div className="flex justify-center mb-4">
                            <Image
                             src={`${window.location.origin}/images/${course.thumbnail}`}
                             alt={course.title}
                             className="w-full h-44 rounded-md object-fill"
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
                      
              <h3 className="text-lg font-bold mb-2 text-black">{course.title}</h3>
              <p className="text-gray-600">{course.description}</p>
     
     
              <p className="text-gray-900"> <span className='font-semibold'>Duration :</span> {course.duration}</p>
     
            </div>
            </>
             ))}
           
         {
                courses.length <= 0 ? (< p className='text-center h-screen w-full mt-44'> not published any course yet</p>) : (console.log("blogs "))
               }
      </div>
     
    </div>
    )}
    <Footer/>
    </>
  );
};

export default Page;







