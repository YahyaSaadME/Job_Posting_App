/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Footer from "@/app/components/global/Footer";
import Navbar from "@/app/components/global/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from 'react-icons/ai';
import { motion } from 'framer-motion';
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";

export default function Page() {
  type TableOfContentItem = {
    title: string;
    description: string;
    imageLink: string;
    videoLink: string;
    _id: string;
  };

  type Blog = {
    author: string;
    category: string;
    createdAt: string;
    tableOfContent: TableOfContentItem[];
    title: string;
    likes: number;
    thumbnail: string;
    _id: string;
  };

  const router = useRouter();
  const [id, setId] = useState("");
  const [data, setData] = useState<Blog>();
  const [BlogBar, setBlogBar] = useState<number>();
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [relBlog, setRelBlog] = useState<any>();

  const handleBlog = async (id: string) => {
    try {
      setLoading(true);
      const req = await fetch(`/api/blogs/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const res = await req.json();
      if (req.ok) {
        setData(res.data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleRelatedBlog = async (id: string) => {
    try {
      setLoading(true);
      const req = await fetch(`/api/catRelatedBlogs/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const res = await req.json();
      if (req.ok) {
        setRelBlog(res.data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const openBlog = (id: string) => {
    router.push(`/blog/${id}`);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    if (window.location.pathname) {
      const ID = window.location.pathname.replace("/blog/", "");
      setId(ID);
      handleBlog(ID);
      handleRelatedBlog(ID);
    }

    window.addEventListener("scroll", () => {
      const maxScrollY =
        document.documentElement.scrollHeight - window.innerHeight;
      setBlogBar((window.scrollY / maxScrollY) * 100);
    });
  }, []);

  const handleLike = async () => {
    try {
      let like = data && data.likes ? data.likes + 1 : 1;
      if (liked === true) {
        like = data && data.likes ? data.likes - 1 : 0;
      }
      const req = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: data?._id, likes: like }),
      });
      const res = await req.json();
      setData((prev) => (prev ? { ...prev, likes: like ?? 0 } : prev));
      setLiked(!liked);
    } catch (e) {}
  };

  console.log("rel blog", relBlog);

  return (
    <>
      <div>
        <div
          className="h-1 bg-blue-600 fixed top-0 left-0 z-30"
          style={{ width: `${BlogBar}%` }}
        ></div>
        <Navbar />

        {loading ? (
          <div className="flex justify-center items-center h-screen w-full">
            <ClipLoader color={"#020617"} size={60} />
          </div>
        ) : (
          <div className="flex min-h-screen px-6 w-full mt-20">
            <div className="lg:w-1/3 flex justify-end mt-2"></div>
            <div className="w-full lg:w-2/3 px-4 mt-4 space-y-4">
              <h1 className="text-3xl font-bold">{data?.title}</h1>
              <p className="font-medium text-md">
                {data?.author} -{" "}
                <span className="font-medium text-xs">
                  {data?.createdAt
                    ? new Date(data.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </span>
              </p>
              {data?.thumbnail ? (
                <Image
                  src={`${window.location.origin}/images/${data?.thumbnail}`}
                  className="w-full rounded-md shadow-md"
                  alt="img"
                  width={200}
                  height={100}
                />
              ) : (
                ""
              )}
              <div className="flex flex-col absolute max-sm:left-80 max-sm:bottom-[30rem] left-56 items-start max-h-fit">
                {/* Likes Count */}
                <span className="text-gray-600">{data?.likes}</span>

                {/* Like Button */}
                <motion.div
                  className={`p-4 border-2 rounded-full shadow-md cursor-pointer bg-white text-gray-400 ${
                    liked ? "border-blue-600" : "border-gray-600"
                  }`}
                  animate={{
                    scale: liked ? 1.25 : 1,
                    color: liked ? "#3b82f6" : "#9ca3af",
                  }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => handleLike()}
                >
                  <AiFillHeart size={24} />
                </motion.div>
              </div>

              <div>
                {data?.tableOfContent.map(
                  (item: TableOfContentItem, index: number) => (
                    <div className="my-5" key={index} id={item._id}>
                      <h2 className="font-bold text-md md:text-xl my-2">
                        {item.title}
                      </h2>
                      <p
                        className="font-normal my-2 text-justify"
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      ></p>
                      {item.imageLink ? (
                        <img
                          src={`${window.location.origin}/images/${item.imageLink}`}
                          className="my-2 w-full p-8 h-72 rounded-md"
                        />
                      ) : (
                        ""
                      )}
                      {item.videoLink ? (
                        <div
                          className="relative w-full my-2"
                          style={{ paddingBottom: "56.25%" }}
                        >
                          <iframe
                            src={item.videoLink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full rounded-md shadow-md"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="hidden lg:block w-1/3">
              <div className="py-4 border-2 border-gray-200 mx-2 w-[19rem] rounded-lg shadow-md sticky top-20">
                <h4 className="font-bold px-6 pb-4 text-lg">Table of Content</h4>
                <hr className="w-full" />
                <ul className="px-6">
                  {data?.tableOfContent.map(
                    (item: TableOfContentItem, index: number) => (
                      <div className="my-3" key={index}>
                        <li
                          className="font-normal cursor-pointer"
                          onClick={(e: any) => scrollToSection(item._id)}
                        >
                          {item.title}
                        </li>
                      </div>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
        <div className="m-12">
          <h2 className="text-2xl text-gray-400 font-sans font-semibold">
            More Related Blogs
          </h2>

          <div className="p-6 pt-1 grid grid-cols-1 mt-8 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {relBlog && relBlog.length > 0 ? (
  relBlog.map((item: any) => (
    <motion.div
      onClick={() => openBlog(item._id)}
      key={item._id.toString()}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white shadow-md p-4 max-w-sm border border-gray-200"
    >
      {/* <Image
        src={`${window.location.origin}/images/${item.thumbnail}`}
        alt={item.title}
        className="w-full md:h-44 max-sm:h-auto  object-fill"
        width={200}
        height={150}
      /> */}
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
            <p className="text-sm text-gray-500"> created at : {new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  ))
) : (
  <p className="text-center h-screen w-full mt-44">
    No related blogs published yet.
  </p>
)}

</div>

  </div>
 
        <Footer/>
    </div>
    </>
  );
}
