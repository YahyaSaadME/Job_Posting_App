/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Footer from '@/app/components/global/Footer';
import Navbar from '@/app/components/global/Navbar';
import { useRouter } from 'next/navigation';
import React, { useState , useEffect} from 'react'
import ClipLoader from 'react-spinners/ClipLoader';
import Image from "next/image"
import { motion } from 'framer-motion';
const page = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blogs, setBlogs] : any = useState<any>([])
  const [loading ,setLoading] = useState(false)
  
  const router = useRouter()
    useEffect(() => {
      const getBlogs = async () => {
        try {
          setLoading(true)
          const response = await fetch('/api/blogs');
          const data = await response.json();
          setBlogs(Array.isArray(data.data) ? data.data : []);
          setLoading(false)
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      };
      getBlogs();
    }, []);

    console.log(blogs)


    const openBlog = (id: string) => {
      router.push(`/blog/${id}`);
     
    };
  return (
    <>
   <Navbar/>
    <div className="p-3 m-2 mt-20">
    
    {loading ? (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color={"#2563eb"} size={60} />
      </div>
    ) : (

   <><div className='flex flex-wrap justify-center w-full'>
              <h2 className='text-3xl  font-bold font-sans text-gray-400'> Blogs</h2>
            </div>
            
            <div className="p-8 pt-1 grid grid-cols-1 lg:mx-16 max-sm:mx-2 mt-8 sm:grid-cols-2 md:grid-cols-3 gap-10" >
                    
                 {blogs.map((item : any) => (
                   <motion.div
                   onClick={() => openBlog(item._id)}
                   key={item._id.toString()}
                   initial={{ y: 50, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ duration: 0.5, ease: "easeOut" }}
                   className="bg-white shadow-md p-6 max-w-sm border border-gray-200"
               >
                       <Image
                                                                    src={`${window.location.origin}/images/${item.thumbnail}`}
                                                                    alt={item.title}
                                                                    className="w-full md:h-44 max-sm:h-auto  object-fill"
                                                                    width={200}
                                                                    height={150}
                                                                  />
                   <div className='flex gap-3 flex-wrap mt-6'>
                       {item.tags.map((cat: string, index: number) => (
                           <span key={index} className="bg-pink-100 text-pink-600 text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">
                               {cat}
                           </span>
                       ))}
                   </div>
                   <h2 className="text-2xl font-bold text-gray-900 mb-2 cursor-pointer hover:underline" onClick={() => router.push(`/blog/${item._id}`)}>
                       {item.title}
                   </h2>
                   <p className="text-gray-600 mb-4">{item.tableOfContent[0].description.slice(0, 100)}...</p>
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
                blogs.length <= 0 ? (< p className='text-center h-screen w-full mt-44 ml-[22.3rem]'> not published any blog yet</p>) : (console.log("blogs "))
               }
              </div></>

  )}</div>
   
 <Footer/>
 </>
  )
}

export default page


{/* <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
{blogs.map((item: any) => (
    <motion.div
        key={item._id.toString()}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white shadow-md rounded-lg p-6 max-w-sm border border-gray-200"
    >
            <Image
                                                         src={`${window.location.origin}/images/${item.thumbnail}`}
                                                         alt={item.title}
                                                         className="w-full md:h-44 max-sm:h-auto rounded-md object-fill"
                                                         width={200}
                                                         height={150}
                                                       />
        <div className='flex gap-3 flex-wrap'>
            {item.tags.map((cat: string, index: number) => (
                <span key={index} className="bg-pink-100 text-pink-600 text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">
                    {cat}
                </span>
            ))}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 cursor-pointer hover:underline" onClick={() => router.push(`/blog/${item._id}`)}>
            {item.title}
        </h2>
        <p className="text-gray-600 mb-4">{item.tableOfContent[0].description.slice(0, 100)}...</p>
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
    </motion.div> */}