/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const courses = [
  {
    id: 1,
    title: 'BGP',
    description: 'My goal is to make BGP easy to understand by using simple examples that everyone can understand and follow.',
    icon: 'network-wired' 
  },
  {
    id: 2,
    title: 'Docker',
    description: 'Gentle introduction to Docker and what problems does it solve for you. This course is specifically designed for complete beginners.',
    icon: 'ship'
  },
  {
    id: 3,
    title: 'Netmiko',
    description: 'Introduction to Netmiko Python Library and How You Can Use It to Automate Your Network with Real-World Examples and Labs.',
    icon: 'python'
  },
  {
    id: 4,
    title: 'Network CI/CD',
    description: 'Introduction to Network CI/CD pipelines with super simple examples and clear explanations (in progress)',
    icon: 'infinity'
  },
];

const CourseCard = ({ title, description }: any) => {
  return (
    <div className="bg-blue-100 rounded-lg p-7 shadow-lg">
      <div className="flex justify-center mb-4">
        <img 
        src='https://www.packetswitch.co.uk/content/images/size/w100/2024/03/python.png'
        /> 
      </div>
      <h3 className="text-lg font-bold mb-2 text-black">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const  UdemyCourseCard = () => {
  return (
    <div className="container mx-auto py-16 p-10">
        <div className='flex  gap-14 mb-8'>
      <h2 className="text-2xl font-bold ">Courses </h2> <p className="text-gray-500 text-lg">View All →</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} /> 
        ))}
      </div>
    </div>
  );
};

export default UdemyCourseCard;