/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
/* eslint-disable @next/next/no-img-element */
import Footer from "@/app/components/global/Footer";
import Navbar from "@/app/components/global/Navbar";
import Image from "next/image";
import React , {useState , useEffect} from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
    <div className="  px-8 mt-20 ">
     <div className='flex flex-wrap  justify-center w-full'>
              <h2 className='text-3xl  font-bold font-sans text-gray-400'> Free Courses</h2>
            </div>
           <div className="flex flex-wrap lg:mx-16 max-sm:mx-2 gap-8 p-2 pt-1 cursor-pointer ">
             {courses.map((item: any
)  => (
      <motion.div
      onClick={() => openBlog(item._id)}
      key={item._id.toString()}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white shadow-md p-3 w-[20rem]  mt-12 border border-gray-200"
  >
          <Image
                                                       src={`${window.location.origin}/images/${item.thumbnail}`}
                                                       alt={item.title}
                                                       className="w-full md:h-44  mt-8 max-sm:h-auto  object-fill"
                                                       width={200}
                                                       height={150}
                                                     />
      <div className='flex gap-3 flex-wrap mt-10'>
          {item.tags.map((cat: string, index: number) => (
              <span key={index} className="bg-pink-100 text-pink-600 text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">
                  {cat}
              </span>
          ))}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 cursor-pointer hover:underline" onClick={() => router.push(`/blog/${item._id}`)}>
          {item.title}
      </h2>
      <p className="text-gray-600 mb-4">{item?.description?.slice(0, 100)}...</p>
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
              </div>
          </div>
      </div>
  </motion.div> 
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







