import React from 'react';
import IMAGE1 from '../../../public/images/image1.jpg';
import IMAGE2 from '../../../public/images/image2.jpg';
import IMAGE3 from '../../../public/images/image3.jpg';

const Auth = () => {
  return (
    <div className="font-poppins relative overflow-hidden bg-[#f4f3ee] min-h-screen flex items-center justify-center p-5 lg:p-12">
      
      {/* Image 1: Positioned at top-left with rotation */}
      <div className="absolute -top-6 -left-6 sm:-top-6 sm:left-0 rotate-12 sm:rotate-6 md:rotate-12 lg:rotate-6 shadow-2xl transition-transform duration-500 transform hover:scale-105">
        <img src={IMAGE1} alt="Image 1" className="w-56 sm:w-72 md:w-80 lg:w-96 h-auto rounded-lg shadow-lg hover:shadow-2xl" />
      </div>

      {/* Image 3: Positioned at bottom-right with rotation */}
      <div className="absolute -bottom-4 -right-12 sm:-bottom-6 sm:-right-4 rotate-6 sm:rotate-12 md:rotate-6 lg:rotate-12 shadow-2xl transition-transform duration-500 transform hover:scale-105">
        <img src={IMAGE3} alt="Image 3" className="w-56 sm:w-72 md:w-80 lg:w-96 h-auto rounded-lg shadow-lg hover:shadow-2xl" />
      </div>

      {/* Main Content */}
      <header>
        <div></div>
      </header>

      <div className="text-center z-10 relative">
        {/* Title */}
        <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-800 leading-tight md:leading-snug lg:leading-normal mb-5">
          Trimly
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 leading-relaxed sm:leading-normal md:leading-loose lg:leading-loose mb-8">
          Your Personal Haircut Scheduling App
        </p>

        {/* Login Button */}
        <button className="mt-5 px-8 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105">
          Login
        </button>
      </div>
    </div>
  );
}

export default Auth;
