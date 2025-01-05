/* eslint-disable @next/next/no-img-element */


import Link from "next/link";
import React from "react";

const dummyData = [
    {
      id: 1,
      category: "Cisco",
      title: "Running Cisco CML in Proxmox",
      description: "For the past few years, I’ve been running all my virtual machines on VMware Workstation Pro, installed on Windows.",
      author: "Suresh Vina",
      date: "Dec 21, 2024",
      readTime: "3 min read",
      avatar: "https://tse4.mm.bing.net/th?id=OIP.AlIScK6urTegkZ178dAAGgHaHa&pid=Api&P=0&h=180",
    },
    {
      id: 2,
      category: "Networking",
      title: "Understanding SD-WAN Basics",
      description: "Discover the fundamentals of SD-WAN technology and its benefits for modern networking.",
      author: "John Doe",
      date: "Nov 15, 2024",
      readTime: "5 min read",
      avatar: "https://tse4.mm.bing.net/th?id=OIP.AlIScK6urTegkZ178dAAGgHaHa&pid=Api&P=0&h=180",
    },
    {
      id: 3,
      category: "Cloud",
      title: "Deploying Kubernetes on AWS",
      description: "A step-by-step guide to setting up Kubernetes clusters using Amazon Web Services.",
      author: "Jane Smith",
      date: "Oct 10, 2024",
      readTime: "6 min read",
      avatar: "https://tse4.mm.bing.net/th?id=OIP.AlIScK6urTegkZ178dAAGgHaHa&pid=Api&P=0&h=180",
    },
    {
      id: 4,
      category: "Virtualization",
      title: "Why Proxmox is Great for Home Labs",
      description: "Explore the advantages of using Proxmox for managing home lab environments effectively.",
      author: "Mike Ross",
      date: "Sep 5, 2024",
      readTime: "4 min read",
      avatar: "https://tse4.mm.bing.net/th?id=OIP.AlIScK6urTegkZ178dAAGgHaHa&pid=Api&P=0&h=180",
    },
    {
      id: 5,
      category: "Security",
      title: "Best Practices for Securing Virtual Machines",
      description: "Learn how to enhance the security of your virtualized infrastructure with these simple tips.",
      author: "Emily Clark",
      date: "Aug 18, 2024",
      readTime: "7 min read",
      avatar: "https://tse4.mm.bing.net/th?id=OIP.AlIScK6urTegkZ178dAAGgHaHa&pid=Api&P=0&h=180",
    }
  ];
  

const BlogCards = () => {
  return (
    <div className="p-3s m-2 mt-10">
       <div className='flex pl-9 gap-14 mb-8 '>
      <h2 className="text-2xl font-bold ">Blogs </h2> <Link href={"/blogs"}><p className="text-gray-500 text-lg md:mt-1">View All →</p></Link> 
      </div>
    <div className="p-6 pt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
         
      {dummyData.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition"
        >
          <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
            {item.category}
          </span>
          <h3 className="mt-4 text-lg font-bold text-gray-800">{item.title}</h3>
          <p className="mt-2 text-sm text-gray-600">{item.description}</p>
          <div className="flex items-center mt-4">
            <img
              src={item.avatar}
              alt={item.author}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">{item.author}</p>
              <p className="text-xs text-gray-500">
                {item.date} — {item.readTime}
              </p>
            </div>
          </div>
        </div>
      ))}
     
       
    </div>
  
    </div >
  );
};

export default BlogCards;
