/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Footer from '@/app/components/global/Footer';
import Navbar from '@/app/components/global/Navbar';
import { useRouter } from 'next/navigation';
import React, { useState , useEffect, Key} from 'react'
import ClipLoader from 'react-spinners/ClipLoader';
import Image from 'next/image';
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
      {
        console.log(blogs)
      }
   <Navbar/>
    <div className="p-3 m-2 mt-20">
    
    {loading ? (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color={"#2563eb"} size={60} />
      </div>
    ) : (

   <><div className='flex justify-center w-full'>
              <h2 className='text-3xl font-sans font-bold'> Blogs</h2>
            </div><div className="p-6 pt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {blogs.map((item: {
                  createdAt: any;
                  updatedAt: any;
                  thumbnail: string | any;
                  _id: Key | any | undefined; id: React.Key | null | undefined; category: any |string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; avatar: string | undefined; author: any | string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; date: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; readTime: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined;
                }) => (
                 

                  <div
                    key={item._id}
                    onClick={() => openBlog(item._id)}
                    className="bg-gray-100 rounded-lg mt-6 shadow-md p-5 hover:shadow-lg transition"
                  >
                     <Image
                     src={`${window.location.origin}/images/${item.thumbnail}`}
                        alt={item.author}
                        width={200}
                        height={150}
                        className="w-full h-40 object-fill rounded-md"/>
 <div className="flex flex-wrap gap-2  p-4">
                        {item.category.split(',').map((cat: string, index: React.Key | null | undefined) => (
                      <span 
                        key={index} 
                        className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded"
                      >
                        {cat.trim()}
                      </span>
                    ))}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-gray-800">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                    <div className="flex items-center mt-4">
                     
                    <div>
  <p className="text-sm font-semibold text-gray-800">{item.author}</p>
  <p className="text-xs text-gray-500">
    {new Date(item.createdAt).toISOString().split('T')[0]} — {new Date(item.updatedAt).toISOString().split('T')[0]}
  </p>
</div>

                    </div>
                  </div>
                ))}
    
               {
                blogs.length <= 0 ? (< p className='text-center h-screen w-full mt-44'> not published any blog yet</p>) : (console.log("blogs "))
               }
              </div></>

  )}</div>
   
 <Footer/>
 </>
  )
}

export default page


