/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */


import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";



const BlogCards = () => {

    const [blogs, setBlogs] : any = useState<any>([])
   // const [loading ,setLoading] = useState(false)
    
    const router = useRouter()
      useEffect(() => {
        const getBlogs = async () => {
          try {
       //     setLoading(true)
            const response = await fetch('/api/blogs/latestBlogs');
            const data = await response.json();
            setBlogs(Array.isArray(data.data) ? data.data : []);
         //   setLoading(false)
          } catch (error) {
            console.error('Error fetching jobs:', error);
          }
        };
        getBlogs();
      }, []);
  
      console.log("blog is " , blogs)
  
  
      const openBlog = (id : string) => {
        router.push(`/blog/${id}`);
       
      };

  return (
    <div className="p-3 m-2 mt-10">
       <div className='flex pl-9 gap-14 mb-8 '>
      <h2 className="text-2xl font-bold ">Blogs </h2> <Link href={"/blogs"}><p className="text-gray-500 text-lg md:mt-1">View All →</p></Link> 
      </div>
    <div className="p-6 pt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" >
         
      {blogs.map((item: {
        _id: string;
        tableOfContent: any;
        tags: any; id: React.Key | null; category: string; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; avatar: string | undefined; author: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; date: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; readTime: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; 
}) => (
        <div
          key={item.id}
          
          className="bg-gray-50 rounded-lg  cursor-pointer  shadow-md p-5 hover:shadow-lg transition" 
        
        >
   <div className=' flex gap-3 flex-wrap'>
          {item.tags.map((cat: string, index: React.Key | null | undefined) => (
                                         <span 
                                           key={index} 
                                           className="text-sm  bg-blue-100 text-blue-600 px-2 py-1 rounded"
                                         >
                                           {cat}
                                         </span>
                                       ))}
                 </div>
        
          <h3 className="mt-4 text-lg font-bold text-gray-800 hover:underline" onClick={() => openBlog(item._id)}>{item.title}</h3>
          <p className="mt-2 text-sm text-gray-600">{item.tableOfContent[0].description}</p>
          <div className="flex items-center mt-4">
        
            <div>
              <p className="text-sm font-semibold text-gray-800">  {item.author}</p>
           
            </div>
          
          </div>
          <div>
      <button className="text-blue-600 mt-4 font-sans  " onClick={() => openBlog(item._id)}> View Blog</button>
    </div>
        </div>
      ))}
     
       
    </div>
  
    </div >
  );
};

export default BlogCards;
