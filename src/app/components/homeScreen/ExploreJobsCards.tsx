/* eslint-disable @next/next/no-img-element */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { motion } from "framer-motion";
import Image from "next/image";



  const Tags = () => { 


    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);
    //   const [search, setSearch] = useState("");
    const routes = useRouter();
  
    const fetchCategories = async (page: number) => {
      setError(null);
      try {
        setLoading(true)
        const response = await fetch(
          `/api/categories/latest`
          // `/api/categories?page=${page}&limit=5&search=${search}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.categories);
        setCurrentPage(data.page);
        setTotalPages(data.pages);
        setLoading(false)
      } catch (err) {
        setError((err as Error).message);
      }
    };
    useEffect(() => {
      fetchCategories(currentPage);
    }, [currentPage]);
               if (loading) { return ( <div className="flex justify-center items-center h-screen w-full"> <ClipLoader color={"#020617"} size={60} /> </div> ); }

    return (
      <div className=" lg:mx-16 mt-8">
      <div className='flex gap-14 mb-8'>
          <h2 className="text-3xl font-bold font-sans text-gray-400">Tags</h2>
          <Link href={"/blogs"}>
              <p className="text-gray-500 text-lg md:mt-2">View All →</p>
          </Link>
      </div>
      <div className="pt-1 flex-wrap gap-4 ">
                    <motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mx-4 mt-4">
  {categories.map((category: any, index) => (
    <div
      key={index}
      className="cursor-pointer p-4 rounded-md flex flex-col justify-between"
      style={{
        backgroundImage: `url(${
          window.location.origin + "/images/" + category.bg
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "200px",
      }}
    >
      <Link href={`/categories/${category.title}`}>
        <div className="w-full">
          <img
            className="w-[40px] sm:w-[50px] md:w-[60px] mx-auto"
            src={window.location.origin + "/images/" + category.icon}
            alt={category.title}
          />
          <div className="flex justify-between items-center mt-6 sm:mt-8">
            <h2 className="font-semibold text-sm sm:text-base md:text-lg text-white">
              {category.title}
            </h2>
            <h3 className="font-semibold text-sm sm:text-base md:text-lg text-white">
              {category.count}+
            </h3>
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>
                    </motion.div>
               </div>
               </div>
          
    );
};

export default Tags;



