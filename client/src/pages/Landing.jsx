import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import landingImage from '../assets/landing-bg.png'
import { useAuth } from "../hooks/AuthProvider"; // Import the useAuth hook
import { useNavigate } from 'react-router-dom';


const Landing = () => {
  const { token } = useAuth(); // Access the token from context
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // If the user already has a token, redirect to dashboard
    if (token) {
      navigate("/dashboard"); // Redirect to dashboard
    }
  }, [token, navigate]); // Depend on `token` and `navigate`


  return (
    <div className="relative overflow-hidden flex justify-start items-center min-h-screen px-6 py-8 2xl:px-20">
      <div className="text-left max-w-md overflow-hidden">
        <h1 className="text-5xl font-bold mb-6 text-primary">Trimly</h1>
        <p className="text-lg text-gray-700 mb-8">
          Your Personal Haircut Scheduling App. Manage your appointments with ease and convenience.
        </p>

        {/* Primary CTA - Login Button */}
        <div className="mb-6">
          <Link
            to="/login"
            className="bg-primary text-white py-3 px-8 rounded-md text-lg font-medium hover:bg-accent transition"
          >
            Log in to your account
          </Link>
        </div>

        {/* Secondary CTA - Register for new users */}
        <div>
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <Link
            to="/register"
            className="text-primary text-lg font-medium hover:underline"
          >
            Sign up for free
          </Link>
        </div>
        <div>
        </div>
      </div>
      <div className="absolute translate-y-64 translate-x-48 sm:translate-y-96 xl:translate-x-96 sm:translate-x-72 rotate-45 transform transition-all duration-300 hover:scale-105 bg-transparent">
        <img src={landingImage} alt="Landing" className="lg:w-[80vw] rounded-lg" />
      </div>

    </div>
  );
};

export default Landing;
