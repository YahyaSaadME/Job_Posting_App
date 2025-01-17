/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Footer from "@/app/components/global/Footer";
import Navbar from "@/app/components/global/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const routes = useRouter();

  const fetchCategories = async (page: number) => {
    setError(null);
    try {
      setLoading(true);
      const response = await fetch(`/api/categories?page=${page}&limit=50`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data.categories);
      setCurrentPage(data.page);
      setTotalPages(data.pages);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <ClipLoader color={"#020617"} size={60} />
        </div>
      ) : (
        <div className="mt-24 mx-16">
          <div className='flex flex-wrap justify-center w-full'>
            <h2 className='text-3xl font-bold font-sans text-gray-400'>Categories</h2>
          </div>
          <div className="grid grid-cols-1 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mx-4 ">
            {categories.map((category: any, index) => (
              <div
                key={index}
                className="cursor-pointer p-4 rounded-md flex flex-col justify-between"
                style={{
                  backgroundImage: `url(${window.location.origin}/images/${category.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "200px",
                }}
              >
                <Link href={`/categories/${category.title}`}>
                  <div className="w-full">
                    <img
                      className="w-[40px] sm:w-[50px] md:w-[60px] mx-auto"
                      src={`${window.location.origin}/images/${category.icon}`}
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
          <Pagination categoriesPerPage={50} totalCategories={categories.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} />
        </div>
      )}
      <Footer />
    </div>
  );
}

const Pagination = ({ categoriesPerPage, totalCategories, paginate, nextPage, prevPage, currentPage }: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCategories / categoriesPerPage); i++) {
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
