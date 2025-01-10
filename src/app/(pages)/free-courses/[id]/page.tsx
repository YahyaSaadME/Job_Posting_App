/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
/* eslint-disable @next/next/no-img-element */
import Footer from "@/app/components/global/Footer";
import Navbar from "@/app/components/global/Navbar";
import Image from "next/image";
import React , {useState , useEffect} from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { useRouter } from "next/navigation";
const Page = () => {

  const router = useRouter()
  const [courseData, setCourses] : any = useState<any>([])
  const [loading ,setLoading] = useState(false)
  const [relCourse , setRelCourse] = useState<any>();

  const pathname = usePathname()
  const courseId : any= pathname?.split('/').pop();
console.log(courseId)

const handleRelatedBlog = async (id: string) => {
  try {
    setLoading(true)
    const req = await fetch(`/api/catRelatedCourse/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const res = await req.json();
    if (req.ok) {
      setRelCourse(res.data);
    }
    setLoading(false)
  } catch (e) {}
};
console.log(relCourse)
const openBlog = (id: string) => {
  router.push(`/blog/${id}`);
 
};
  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/getCoursById/${courseId}`);
        console.log(response)
        const data = await response.json();
        console.log(data,"data")
        setCourses(data);

        setLoading(false)
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    getCourses();
    handleRelatedBlog(courseId)
  }, []);

  console.log(courseData)
  return (
    <>
    <Navbar/>

    {loading ? (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color={"#2563eb"} size={60} />
      </div>
    ) : (
      <>
    <div className="container mx-auto px-8 w-[60%] flex justify-center py-8 mt-16">
     
    
            <div
              key={courseData.title}
              className="bg-gray-50 p-6  space-y-4"
            >
   <div className="flex justify-center items-center m-2 p-4">
  <Image 
    src={`${window.location.origin}/images/${courseData?.thumbnail}`} 
    className="w-[33rem] h-[16rem] rounded-md shadow-md" 
    alt="img" 
    width={200} 
    height={100} 
  />
</div>

            <div className="p-6   space-y-4">
  <h2 className="text-2xl font-semibold text-gray-800">{courseData.title}</h2>
  <p className="text-sm text-gray-600">{courseData.description}</p>

  <div className="border-t pt-4">
    <strong className="text-lg text-gray-700">Category:</strong>
    <p className="text-sm text-gray-500">{courseData.category}</p>
  </div>

  <div className="border-t pt-4">
    <strong className="text-lg text-gray-700">Duration:</strong>
    <p className="text-sm text-gray-500">{courseData.duration}</p>
  </div>

  <div className="border-t pt-4">
    <strong className="text-lg text-gray-700">Instructor:</strong>
    <p className="text-sm text-gray-500">{courseData.instructorName}</p>
  </div>

  <div className="border-t pt-4">
    <strong className="text-lg text-gray-700">Responsibilities:</strong>
    <p className="text-sm text-gray-500">{courseData.responsibilities}</p>
  </div>

  <div className="border-t pt-4">
    <strong className="text-lg text-gray-700">Prerequisites:</strong>
    <p className="text-sm text-gray-500">{courseData.prerequisites}</p>
  </div>

  <div className="border-t pt-4">
    <strong className="text-lg text-gray-700">Course Content:</strong>
    <p className="text-sm text-gray-500">{courseData.courseContent}</p>
  </div>

  <div className="border-t pt-4">
    <strong className="text-lg text-gray-700">Tags:</strong>
    <p className="text-sm text-gray-500">{courseData.tags}</p>
  </div>
</div>

<div className="flex justify-center items-center m-8 p-6">
  <Link href={`${courseData.link}`}>
    <button className="bg-blue-600 h-12 w-60 text-white py-2 px-6 text-xl font-sans hover:bg-blue-700">
      Learn More
    </button>
  </Link>
</div>

            </div>
          
{/*        
                <div className="min-h-screen bg-gray-50 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg overflow-hidden">
        <Image
             src={`${window.location.origin}/images/${courseData.thumbnail}`}
          alt={courseData.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
        />
         {/* {courseData.tags.map((cat: string, index: React.Key | null | undefined) => (
                                                      <span 
                                                        key={index} 
                                                        className="text-sm m-2 mt-6 bg-blue-100 text-blue-600 px-2 py-1 rounded"
                                                      >
                                                        {cat}
                                                      </span>
                                                    ))} */}
        {/* <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{courseData.title}</h1>
          <p className="text-sm text-black mb-2">
            Category: <span className="text-black">{courseData.category}</span>
          </p>
          <p className="text-sm text-black mb-2">
            Duration: <span className="text-black">{courseData.duration}</span>
          </p>
          <p className="text-black mb-4">{courseData.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
     
          </div>
          <a
            href={courseData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500"
          >
         Learn more
          </a>
        </div>
      </div>
    </div>
             */}

     </div> 
                <div
                className=" md:m-12 max-sm:m-2 "
               >
               <h2 className='text-2xl text-gray-400 font-sans font-semibold'> More Related Course</h2>
               
               <div className="p-6 pt-1 flex flex-wrap mt-8  gap-6">
                 {relCourse && relCourse.length > 0 ? (
                   relCourse.map((course : any) => (
                     <div onClick={() => openBlog(course._id)} key={course._id} className="bg-gray-50 max-sm:w-[16rem] md:w-[22rem]  h-auto space-y-3 rounded-lg p-7 shadow-lg">
                                  <div className="flex justify-center mb-4">
                                                <Image
                                                 src={`${window.location.origin}/images/${course.thumbnail}`}
                                                 alt={course.title}
                                                 className="w-full h-44 rounded-md object-fill"
                                                 width={200}
                                                 height={150}
                                               />
                                  </div>
                                    <div className=' flex gap-1 flex-wrap'>
                                           {course.tags.map((cat: string, index: React.Key | null | undefined) => (
                                                                          <span 
                                                                            key={index} 
                                                                            className="text-sm  bg-blue-100 text-blue-600 px-2 py-1 rounded"
                                                                          >
                                                                            {cat}
                                                                          </span>
                                                                        ))}
                                                  </div>
                                          
                                  <h3 className="text-lg font-bold mb-2 text-black">{course.title}</h3>
                                  <p className="text-gray-600">{course.description}</p>
                         
                         
                                  <p className="text-gray-900"> <span className='font-semibold'>Duration :</span> {course.duration}</p>
                         
                                </div>
                   ))
                 ) : (
                   <p className="text-center h-screen w-full mt-44">
                     No related course published yet.
                   </p>
                 )}
               </div>
               
                 </div>
                 </>

    )}
    <Footer/>
    </>
  );
};

export default Page;







