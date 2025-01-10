/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
/* eslint-disable @next/next/no-img-element */
import Footer from "@/app/components/global/Footer";
import Navbar from "@/app/components/global/Navbar";
import Image from "next/image";
import React , {useState , useEffect} from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { usePathname } from 'next/navigation'

const Page = () => {


  const [courses, setCourses] : any = useState<any>([])
  const [loading ,setLoading] = useState(false)

  const pathname = usePathname()
  const courseId = pathname?.split('/').pop();
console.log(courseId)

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/getCoursById/${courseId}`);
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
    <div className="container mx-auto px-4 py-8 mt-16">
     
           <div className="">
             {courses.map((courseData: {
                 category: any;
                 link: string | undefined;
               _id: string;
               id: any ;
               duration: any;
               tags: any; thumbnail: any; title: any | string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; 
     })  => (
               <>
                <div className="min-h-screen bg-gray-50 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg overflow-hidden">
        <Image
             src={`${window.location.origin}/images/${courseData.thumbnail}`}
          alt={courseData.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
        />
         {courseData.tags.map((cat: string, index: React.Key | null | undefined) => (
                                                      <span 
                                                        key={index} 
                                                        className="text-sm m-2 mt-6 bg-blue-100 text-blue-600 px-2 py-1 rounded"
                                                      >
                                                        {cat}
                                                      </span>
                                                    ))}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{courseData.title}</h1>
          <p className="text-sm text-black mb-2">
            Category: <span className="text-black">{courseData.category}</span>
          </p>
          <p className="text-sm text-black mb-2">
            Duration: <span className="text-black">{courseData.duration}</span>
          </p>
          <p className="text-black mb-4">{courseData.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
     
          </div>
          <a
            href={courseData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500"
          >
         Learn more
          </a>
        </div>
      </div>
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







