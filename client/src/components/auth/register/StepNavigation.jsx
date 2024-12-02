import React from 'react'

const StepNavigation = ({ step }) => {
    return (
      <div className="flex justify-center mb-6">
        <div
          className={`w-10 h-10 flex items-center justify-center border-2 border-primary rounded-full mx-2 text-white font-semibold transition-all duration-300 ease-in-out ${step === 0 ? 'bg-primary scale-110' : 'bg-gray-300 text-gray-700'}`}
        >
          1
        </div>
        <div
          className={`w-10 h-10 flex items-center justify-center border-2 border-primary rounded-full mx-2 text-white font-semibold transition-all duration-300 ease-in-out ${step === 1 ? 'bg-primary scale-110' : 'bg-gray-300 text-gray-700'}`}
        >
          2
        </div>
        <div
          className={`w-10 h-10 flex items-center justify-center border-2 border-primary rounded-full mx-2 text-white font-semibold transition-all duration-300 ease-in-out ${step === 2 ? 'bg-primary scale-110' : 'bg-gray-300 text-gray-700'}`}
        >
          3
        </div>
      </div>
    );
  };
  
  export default StepNavigation;
  