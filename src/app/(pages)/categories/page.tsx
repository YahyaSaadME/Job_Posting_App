/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Navbar from "@/app/components/global/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function page() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  //   const [search, setSearch] = useState("");
  const routes = useRouter();

  const fetchCategories = useCallback(async (page: number) => {
    setError(null);
    try {
      const response = await fetch(
        `/api/categories?page=${page}&limit=20`
        // `/api/categories?page=${page}&limit=5&search=${search}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      console.log(data);
      
      setCategories(data.categories);
      setCurrentPage(data.page);
      setTotalPages(data.pages);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);
  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage, fetchCategories]);
  return (
    <div>
      <Navbar />
      <div className="mt-24">
        <h1 className="text-xl md:text-3xl font-bold text-center">
          Categories
        </h1>
        <div className="grid grid-cols-6 mx-4 gap-4 mt-4">
          {categories.map((category: any, index) => (
            <div
            key={index}
            className="cursor-pointer p-4 rounded-md"
              style={{
                backgroundImage: `url(${
                  window.location.origin + "/images/" + category.bg
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Link
                href={`/categories/${category.title}`}>
                <div className="w-full">
                  <Image
                    className="w-[60px]"
                    src={window.location.origin + "/images/" + category.icon}
                    alt={category.title}
                    width={40}
                    height={40}
                  />
                  <div className="flex justify-between mt-10">
                    <h2 className="font-semibold md:text-lg text-white">
                      {category.title}
                    </h2>
                    <h3 className="font-semibold md:text-lg text-white">
                      {category.count}+
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
