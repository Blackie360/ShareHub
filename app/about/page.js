import Nav from 'app/_component/Nav';
import React from 'react';

const AboutUs = () => {
  return (
   
    <div className="container mx-auto mt-10 p-4 md:p-6 bg-gray-100 rounded-md">
      <div className='bg-white'>
        <Nav />
      </div>
      <h2 className="text-3xl font-bold mb-4">About Us</h2>
      <p className="text-gray-700">
        CodeFlix is a  software company dedicated to delivering high-quality solutions. The software you are currently using was built by our talented developer, Blackie.
      </p>
      <p className="text-gray-700 mt-4">
        Connect with us:
        <span className="ml-2">
          <a className="text-blue-500 hover:underline" href="https://github.com/Blackie360" target="_blank" rel="noopener noreferrer">GitHub</a>
        </span>
        <span className="ml-2">
          <a className="text-blue-500 hover:underline" href="https://twitter.com/blackie_360" target="_blank" rel="noopener noreferrer">Twitter</a>
        </span>
        <span className="ml-2">
          <a className="text-blue-500 hover:underline" href="https://www.linkedin.com/in/felix-jumason-9b209a243/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </span>
      </p>
    </div>
  );
};

export default AboutUs;
