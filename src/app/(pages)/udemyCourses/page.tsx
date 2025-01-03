'use client'
/* eslint-disable @next/next/no-img-element */
import Footer from "@/app/components/global/Footer";
import Navbar from "@/app/components/global/Navbar";
import React from "react";

const Page = () => {
  const courses = [
    {
      id: 1,
      image: "https://tse4.mm.bing.net/th?id=OIP.aviU0Ltx5UIOzXK5Kk25kQHaEc&pid=Api&P=0&h=180",
      title: "Introduction to Web Development",
      description: "Learn the basics of web development, including HTML, CSS, and JavaScript.",
      link: "/courses/web-development",
    },
    {
      id: 2,
      image: "https://tse4.mm.bing.net/th?id=OIP.aviU0Ltx5UIOzXK5Kk25kQHaEc&pid=Api&P=0&h=180",
      title: "React for Beginners",
      description: "A beginner-friendly guide to building interactive UIs using React.js.",
      link: "/courses/react-for-beginners",
    },
    {
      id: 3,
      image: "https://tse1.mm.bing.net/th?id=OIP._2VK1iXtPR7SDrWonCjWHwHaEI&pid=Api&P=0&h=180",
      title: "Mastering Python",
      description: "Dive deep into Python programming and explore data analysis, web development, and more.",
      link: "/courses/mastering-python",
    },
    {
      id: 4,
      image: "https://tse1.mm.bing.net/th?id=OIP.Up3tQBKx2Enrl3ut5nbcJQHaE8&pid=Api&P=0&h=180",
      title: "Data Structures and Algorithms",
      description: "Build a strong foundation in DSA with hands-on coding challenges and examples.",
      link: "/courses/dsa",
    },
    {
      id: 5,
      image: "https://tse3.mm.bing.net/th?id=OIP.GRaDRB4QrTB7BkVVe2MVcAHaDt&pid=Api&P=0&h=180",
      title: "Machine Learning Essentials",
      description: "Understand the fundamentals of machine learning and work on real-world projects.",
      link: "/courses/machine-learning",
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Udemy Free Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-fill"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{course.title}</h2>
              <p className="text-gray-600 mt-2">{course.description}</p>
              <a
                href={course.link}
                className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Page;
