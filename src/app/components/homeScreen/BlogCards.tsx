/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import Image from "next/image"
const BlogCards = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await fetch('/api/blogs/latestBlogs');
                const data = await response.json();
                setBlogs(Array.isArray(data.data) ? data.data : []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };
        getBlogs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <ClipLoader color={"#2563eb"} size={60} />
            </div>
        );
    }
    
      console.log(blogs)
    

    return (
        <div className="p-3 m-2 mt-10">
       
            <div className='flex pl-9 gap-14 mb-8'>
                <h2 className="text-2xl font-bold">Blogs</h2>
                <Link href={"/blogs"}><p className="text-gray-500 text-lg md:mt-1">View All →</p></Link>
            </div>
            <div className="p-6 pt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {blogs.map((item : any) => (
                    <div key={item._id.toString()}
                    className="bg-gray-100 rounded-lg cursor-pointer shadow-md p-5 hover:shadow-lg transition">
                        <div className="flex justify-center mb-4">
                                             <Image
                                              src={`${window.location.origin}/images/${item.thumbnail}`}
                                              alt={item.title}
                                              className="w-full md:h-44 max-sm:h-auto rounded-md object-fill"
                                              width={200}
                                              height={150}
                                            />
                               </div>
                        <div className='flex gap-3 flex-wrap'>
                            {item.tags.map((cat : any, index : any) => (
                                <span key={index} className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-gray-800 hover:underline" onClick={() => router.push(`/blog/${item._id}`)}>{item.title}</h3>
                        <p className="mt-2 text-sm text-gray-600">{item.tableOfContent[0].description}</p>
                        <div className="flex items-center mt-4">
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{item.author}</p>
                            </div>
                        </div>
                        <button className="text-blue-600 mt-4 font-sans" onClick={() => router.push(`/blog/${item._id}`)}>View Blog</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogCards;
