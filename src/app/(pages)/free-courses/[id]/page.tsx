/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
/* eslint-disable @next/next/no-img-element */
import Footer from "@/app/components/global/Footer";
import Navbar from "@/app/components/global/Navbar";
import Image from "next/image";
import React , {useState , useEffect} from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Page = () => {
  const router = useRouter();
  const [courseData, setCourses] : any = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [relCourse, setRelCourse] = useState<any>();

  const pathname = usePathname();
  const courseId : any = pathname?.split('/').pop();
  console.log(courseId);

  const handleRelatedBlog = async (id: string) => {
    try {
      setLoading(true);
      const req = await fetch(`/api/catRelatedCourse/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const res = await req.json();
      if (req.ok) {
        setRelCourse(res.data);
      }
      setLoading(false);
    } catch (e) {
      console.error('Error fetching related courses:', e);
    }
  };

  const openBlog = (id: string) => {
    router.push(`/blog/${id}`);
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/getCoursById/${courseId}`);
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    getCourses();
    handleRelatedBlog(courseId);
  }, []);


  return (
    <>
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <ClipLoader color={"#020617"} size={60} />
        </div>
      ) : (
        <>
          <div className="container mx-auto md:px-8 p-2 w-[65%] flex justify-center md:py-8 mt-16">
            <div key={courseData.title} className="bg-gray-50 md:p-6 space-y-4 rounded-lg shadow-md">
              <div className="flex justify-center items-center m-2 p-4">
                <Image 
                  src={`${window.location.origin}/images/${courseData?.thumbnail}`} 
                  className="w-[33rem] h-[16rem] rounded-md shadow-md" 
                  alt="img" 
                  width={200} 
                  height={100} 
                />
              </div>
              <div className='flex gap-3 md:mx-16 flex-wrap'>
                
                      <span className="bg-pink-100 text-pink-600 text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">
                        {courseData.tags}
                      </span>
                    
                  </div>
              <div className="md:p-6 p-2 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">{courseData.title}</h2>
                <p className="text-md text-gray-600">{courseData.description}</p>

                <div className="border-t flex gap-6 pt-4">
                  <div className="text-lg text-gray-700">Category:</div>
                  <p className="text-md mt-1font-sans text-gray-500">{courseData.category}</p>
                </div>

                <div className="border-t flex gap-6 pt-4">
                  <div className="text-lg text-gray-700">Duration:</div>
                  <p className="text-md mt-1 font-sans text-gray-500">{courseData.duration}</p>
                </div>

                <div className="border-t  flex gap-6 pt-4">
                  <div className="text-lg text-gray-700">Instructor:</div>
                  <p className="text-md mt-1 font-sans text-gray-500">{courseData.instructorName}</p>
                </div>

              

          </div>
        
            
            </div>

          </div> 
          <div className="flex flex-col items-center gap-6 justify-center">
          <div className="md:py-8 md:px-8 p-2 space-y-4 w-[60%] bg-gray-50   rounded-lg shadow-md">
                  <strong className="text-lg text-gray-700">Responsibilities:</strong>
                  <p className="text-sm font-sans text-gray-500">{courseData.responsibilities}</p>
                </div>
                <div className=" space-y-4 w-[60%] md:py-8 md:px-8 p-2  bg-gray-50   rounded-lg shadow-md">
                <strong className="text-lg text-gray-700">Prerequisites:</strong>
                <p className="text-sm font-sans text-gray-500">{courseData.prerequisites}</p>
              </div>

              <div className="md:py-8 md:px-8 p-2  space-y-4 w-[60%]  bg-gray-50   rounded-lg shadow-md">
                <strong className="text-lg text-gray-700">Course Content:</strong>
                <p className="text-sm font-sans text-gray-500">{courseData.courseContent}</p>
              </div>

              </div>
              <div className="flex justify-center items-center m-8 p-6">
                <Link href={`${courseData.link}`}>
                  <button className="bg-black h-12 w-60 text-white py-2 px-6 text-xl font-sans rounded-md shadow-md">
                    Learn More
                  </button>
                </Link>
              </div>
          <div className="md:m-12 max-sm:m-2">
            <h2 className="text-2xl text-gray-400 font-sans font-semibold">More Related Courses</h2>

            <div className="p-6 pt-1 flex flex-wrap mt-8 gap-6">
              {relCourse && relCourse.length > 0 ? (
                relCourse.map((item: any) => (
                  <motion.div
                    onClick={() => openBlog(item._id)}
                    key={item._id.toString()}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white shadow-md p-4 max-w-sm border border-gray-200"
                  >
                    <div className="flex gap-3 flex-wrap">
                      {item.tags.map((cat: string, index: number) => (
                        <span key={index} className="bg-pink-100 text-pink-600 text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 cursor-pointer hover:underline" onClick={() => router.push(`/blog/${item._id}`)}>
                      {item.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{item.description.slice(0, 100)}...</p>
                    <div className="flex items-center mt-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src={"https://tse2.mm.bing.net/th?id=OIP.YoTUWMoKovQT0gCYOYMwzwHaHa&pid=Api&P=0&h=180"}
                          alt="Author Avatar"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-900">Admin</p>
                          <p className="text-sm text-gray-500">Created at: {new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center h-screen w-full mt-44">No related courses published yet.</p>
              )}
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Page;
