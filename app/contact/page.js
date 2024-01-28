import React from 'react';
import Nav from 'app/_component/Nav';

const ContactUs = () => {
  
  const email = 'codedblood22@gmail.com';
  const phone = '+254703198968';

  return (
    <div className="container mx-auto mt-10 p-4 md:p-6 bg-gray-100 rounded-md">
      <div className='bg-white'>
        <Nav />
      </div>
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <p className="text-gray-700">
        For any inquiries or assistance, please feel free to contact us. We are here to help you!
      </p>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Email:</p>
        <a href={`mailto:${email}`} className="text-blue-500 hover:underline">{email}</a>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Phone:</p>
        <a href={`tel:${phone}`} className="text-blue-500 hover:underline">{phone}</a>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-bold">Address:</p>
        <p className="text-gray-700">Kabarak, Nakuru, Kenya</p>
      </div>
    </div>
  );
};

export default ContactUs;
