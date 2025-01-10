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
import { AiFillLike } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
export default function page() {
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
  const [id, setId] = useState("");
  const [data, setdata] = useState<Blog>();
  const [BlogBar, setBlogBar] = useState<number>();
  const [liked, setLiked] = useState<boolean>(false);
 const [loading ,setLoading] = useState(false)

  const handleBlog = async (id: string) => {
    try {
      setLoading(true)
      const req = await fetch(`/api/blogs/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const res = await req.json();
      if (req.ok) {
        setdata(res.data);
      }
      setLoading(false)
    } catch (e) {}
  };
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  useEffect(() => {
    if (window.location.pathname) {
      setLoading(true)
      const ID = window.location.pathname.replace("/blog/", "");
      setId(ID);
      handleBlog(ID);
      setLoading(false)
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
      setdata((prev) => (prev ? { ...prev, likes: like ?? 0 } : prev));
      setLiked(!liked);
    } catch (e) {}
  };
  
    console.log(data)
  
  return (
 
    <div>
  
      <div
        className="h-1 bg-blue-600 fixed top-0 left-0 z-30"
        style={{ width: `${BlogBar}%` }}
      ></div>
      <Navbar />
  
      {loading ? (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color={"#2563eb"} size={60} />
      </div>
    ) : (
      <div className="flex min-h-screen px-6 w-full mt-20">
        <div className="lg:w-1/3 flex justify-end mt-2">
     
        </div>
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
  :  (<></>)
}


            </span>
          </p>
          {
            data?.thumbnail?
            <Image src={`${window.location.origin}/images/${data?.thumbnail}`} className="w-full rounded-md shadow-md" alt="img"   width={200}
            height={100}/>:""
          }
               <div className="flex flex-col absolute left-56 items-start max-h-fit">
            <span className="text-gray-600">{data?.likes}</span>
            <div
              className={`p-4 border-2 shadow-md cursor-pointer  max-h-fit rounded-full ${
                liked ? " text-blue-600 border-blue-700 bg-white" : "bg-white text-gray-400 border-gray-600"
              }`}
              onClick={(e: any) => {
                handleLike();
              }}
            >
              <AiFillLike />
            </div>
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
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></p>
                  {item.imageLink ? (
                    <img               src={`${window.location.origin}/images/${item.imageLink}`}
                    className="my-2 w-full p-8 h-72 rounded-md " />
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
  <div className="py-4 border-2 border-gray-200 mx-2  w-[19rem] rounded-lg shadow-md sticky top-20">
    <h4 className="font-bold px-6 pb-4 text-lg">Table of Content</h4>
    <hr className="w-full" />
    <ul className="px-6">
      {data?.tableOfContent.map((item: TableOfContentItem, index: number) => (
        <div className="my-3" key={index}>
          <li
            className="font-normal cursor-pointer"
            onClick={(e: any) => scrollToSection(item._id)}
          >
            {item.title}
          </li>
        </div>
      ))}
    </ul>
  </div>
</div>

       
      </div>
     
    )}
        <Footer/>
    </div>
  );
}
