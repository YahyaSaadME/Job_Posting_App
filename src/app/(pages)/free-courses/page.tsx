/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
/* eslint-disable @next/next/no-img-element */
import Footer from "@/app/components/global/Footer";
import Navbar from "@/app/components/global/Navbar";
import Image from "next/image";
import React , { useState , useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Page = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(12);

  const router = useRouter();

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/courses');
        const data = await response.json();
        setCourses(Array.isArray(data.data) ? data.data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    getCourses();
  }, []);

  const openBlog = (id: string) => {
    router.push(`/free-courses/${id}`);
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <ClipLoader color={"#020617"} size={60} />
        </div>
      ) : (
        <div className="px-8 mt-20">
          <div className='flex flex-wrap justify-center w-full'>
            <h2 className='text-3xl font-bold font-sans text-gray-400'>Free Courses</h2>
          </div>
          <div className="flex flex-wrap lg:mx-24 md:mx-24 max-sm:mx-2 gap-10 p-2 pt-1 cursor-pointer">
            {currentCourses.map((item: any) => (
              <motion.div
                onClick={() => openBlog(item._id)}
                key={item._id.toString()}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white shadow-md p-4 w-[18rem] mt-12 border border-gray-200"
              >
                <Image
                  src={`${window.location.origin}/images/${item.thumbnail}`}
                  alt={item.title}
                  className="w-full md:h-44  mb-4 p-0 max-sm:h-auto object-fill"
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
                {/* <p className="text-gray-600 mb-4">{item?.description?.slice(0, 100)}...</p> */}
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
                      <p className="text-sm text-gray-500">created at: {new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {courses.length <= 0 && (<p className='text-center h-screen w-full mt-44'>No courses published yet.</p>)}
          </div>
          <Pagination coursesPerPage={coursesPerPage} totalCourses={courses.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} />
        </div>
      )}
      <Footer />
    </>
  );
};

const Pagination = ({ coursesPerPage, totalCourses, paginate, nextPage, prevPage, currentPage }: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center items-center gap-6 mt-8">
      <ul className='pagination flex gap-8'>
        <li className='page-item'>
          <button onClick={prevPage} className='page-link bg-gray-300 text-gray-700 px-4 py-2 rounded-l hover:bg-gray-400 disabled:opacity-50' disabled={currentPage === 1}>
            Previous
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className='page-item mt-2'>
            <a onClick={() => paginate(number)} className={`page-link px-4 py-2 border-t border-b border-gray-300 hover:bg-gray-200 ${currentPage === number ? 'bg-gray-200' : ''}`}>
              {number}
            </a>
          </li>
        ))}
        <li className='page-item'>
          <button onClick={nextPage} className='page-link bg-gray-300 text-gray-700 px-4 py-2 rounded-r hover:bg-gray-400 disabled:opacity-50' disabled={currentPage === pageNumbers.length}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Page;
