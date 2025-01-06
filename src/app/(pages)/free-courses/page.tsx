/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
/* eslint-disable @next/next/no-img-element */
import Footer from "@/app/components/global/Footer";
import Navbar from "@/app/components/global/Navbar";
import React , {useState , useEffect} from "react";
import ClipLoader from 'react-spinners/ClipLoader';


const Page = () => {


  const [courses, setCourses] : any = useState<any>([])
  const [loading ,setLoading] = useState(false)


  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/courses');
        const data = await response.json();
        setCourses(Array.isArray(data.data) ? data.data : []);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    getCourses();
  }, []);
  return (
    <>
    <Navbar/>
    {loading ? (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color={"#2563eb"} size={60} />
      </div>
    ) : (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center"> Free Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: { id: React.Key | null | undefined; image: string | undefined; title: any |string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; link: string | undefined; }) => (
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
    )}
    <Footer/>
    </>
  );
};

export default Page;






