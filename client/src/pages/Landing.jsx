import React from "react";
import { FaCheckSquare } from "react-icons/fa"; // Example of an icon from react-icons
import bgLogo from '../assets/Human-Logo 1.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const LandingPage = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle navigation
  const handleButtonClick = () => {
    navigate('/register'); // Navigate to the register page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="self-center flex flex-col lg:flex-row items-center justify-between w-full max-w-[1200px] mx-auto space-y-12 lg:space-y-0">
        {/* Left Section */}
        <div className="text-left max-w-xl w-full space-y-6">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-4">
            Communi<span className="uppercase">Tap</span>
          </h1>
          <p className="text-2xl text-gray-600 mb-6">
            Helping the neighborhood with fun tasks
          </p>
          <button 
            onClick={handleButtonClick} // Handle button click
            className="px-8 py-3 bg-blue-600 text-white text-xl font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
          >
            Take a task now!
          </button>

          <div className="space-y-4 mt-8">
            <div className="flex items-center text-2xl text-gray-700">
              <FaCheckSquare className="mr-3 text-green-500 text-xl" />
              <span>Help to level up your skills</span>
            </div>
            <div className="flex items-center text-2xl text-gray-700">
              <FaCheckSquare className="mr-3 text-green-500 text-xl" />
              <span>Tap and pass the completed task</span>
            </div>
            <div className="flex items-center text-2xl text-gray-700">
              <FaCheckSquare className="mr-3 text-green-500 text-xl" />
              <span>Earn rewards for your efforts!</span>
            </div>
          </div>
        </div>

        {/* Right Section with Image */}
        <div className="self-stretch flex-1 relative">
          <img 
            className="h-[200%] -mb-72" 
            src={bgLogo} 
            alt="background logo" 
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
