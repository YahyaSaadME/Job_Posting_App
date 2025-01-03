"use client";
import Navbar from "@/app/components/global/Navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
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

  const handleBlog = async (id: string) => {
    try {
      const req = await fetch(`/api/blogs/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const res = await req.json();
      if (req.ok) {
        setdata(res.data);
      }
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
      const ID = window.location.pathname.replace("/blog/", "");
      setId(ID);
      handleBlog(ID);
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

  return (
    <div>
      <div
        className="h-1 bg-blue-600 fixed top-0 left-0 z-30"
        style={{ width: `${BlogBar}%` }}
      ></div>
      <Navbar />
      <div className="flex min-h-screen px-6 w-full mt-20">
        <div className="lg:w-1/3 flex justify-end mt-2">
          <div className="flex flex-col items-center max-h-fit">
            <span className="text-gray-600">{data?.likes}</span>
            <div
              className={`p-4 border-2 shadow-md cursor-pointer border-gray-900 max-h-fit rounded-full ${
                liked ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={(e) => {
                handleLike();
              }}
            >
              <AiFillLike />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 px-4">
          <h1 className="text-2xl font-bold">{data?.title}</h1>
          <p className="font-medium text-md">
            {data?.author} -{" "}
            <span className="font-medium text-xs">
              {data?.createdAt
                ? new Date(data.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Date not available"}
            </span>
          </p>
          {
            data?.thumbnail?
            <img src={data?.thumbnail} className="w-full rounded-md shadow-md" alt="" />:""
          }
          
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
                    <img src={item.imageLink} className="my-2 rounded-md shadow-md" />
                  ) : (
                    ""
                  )}
                  {item.videoLink ? (
                    <div
                      className="relative w-full my-2"
                      style={{ paddingBottom: "56.25%" }}
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/UrsmFxEIp5k`}
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
          <div className="py-4 border-2 border-gray-200 mx-2 max-w-1/4 min-w-1/3 w-1/4 rounded-lg shadow-md fixed top-20 right-0">
            <h4 className="font-bold px-6 pb-4 text-lg ">Table of Content</h4>
            <hr className="w-full" />
            <ul className="px-6">
              {data?.tableOfContent.map(
                (item: TableOfContentItem, index: number) => (
                  <div className="my-3" key={index}>
                    <li
                      className="font-normal cursor-pointer"
                      onClick={(e) => scrollToSection(item._id)}
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
    </div>
  );
}
