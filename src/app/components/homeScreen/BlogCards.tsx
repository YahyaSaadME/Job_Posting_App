/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { motion } from "framer-motion";
import Image from "next/image";

const BlogCards = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
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

    return (
        <div className="p-3 lg:mx-16 max-sm:mx-2 mt-8">
            <div className='flex gap-14 mb-8'>
                <h2 className="text-3xl font-bold font-sans text-gray-400">Blogs</h2>
                <Link href={"/blogs"}>
                    <p className="text-gray-500 text-lg md:mt-2">View All →</p>
                </Link>
            </div>
            <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {blogs.map((item: any) => (
                    <motion.div
                        key={item._id.toString()}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-white shadow-md rounded-lg p-6 max-w-sm border border-gray-200"
                    >
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
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BlogCards;
