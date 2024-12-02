import React from 'react';
import InputField from '../../../common/InputField';
import Button from '../../../common/Button';

const Step2 = ({
  userCredentials,
  formErrors,
  errorMessage,
  handleChange,
  handleStep2Submit,
  role,
  setStep,
}) => {

  // Handle the change for the checkboxes (schedule)
  const handleScheduleChange = (e) => {
    const { value, checked } = e.target;
    const newSchedule = checked
      ? [...userCredentials.schedule, value] // Add day to schedule if checked
      : userCredentials.schedule.filter(day => day !== value); // Remove day if unchecked
    
    handleChange({ target: { name: 'schedule', value: newSchedule } }); // Update the state
  };

  return (
    <form onSubmit={handleStep2Submit} className="space-y-6">
      {/* First Name */}
      <InputField
        id="firstname"
        name="firstname"
        type="text"
        placeholder="First Name"
        value={userCredentials.firstname}
        onChange={handleChange}
        error={formErrors.firstname}
        ariaDescription="firstname-error"
        ariaInvalid={formErrors.firstname ? 'true' : 'false'}
      />

      {/* Last Name */}
      <InputField
        id="lastname"
        name="lastname"
        type="text"
        placeholder="Last Name"
        value={userCredentials.lastname}
        onChange={handleChange}
        error={formErrors.lastname}
        ariaDescription="lastname-error"
        ariaInvalid={formErrors.lastname ? 'true' : 'false'}
      />

      {/* Conditional Phone Field for Customers */}
      {role === 'customer' && (
        <InputField
          id="phone"
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={userCredentials.phone}
          onChange={handleChange}
          error={formErrors.phone}
          ariaDescription="phone-error"
          ariaInvalid={formErrors.phone ? 'true' : 'false'}
        />
      )}

      {/* Conditional Schedule Field for Barbers */}
      {role === 'barber' && (
   <div className="mb-6">
   <label className="block text-lg font-medium text-primary mb-2">Schedule</label>
   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
     {/* Days of the week checkboxes */}
     {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
       <div key={day} className="flex items-center space-x-2">
         {/* Custom styled checkbox */}
         <input
           type="checkbox"
           id={day}
           name="schedule"
           value={day}
           checked={userCredentials.schedule.includes(day)} // Check if the day is selected
           onChange={handleScheduleChange}
           className="hidden"
         />
         <label
           htmlFor={day}
           className="flex items-center space-x-2 cursor-pointer text-sm select-none"
         >
           <span
             className={`w-6 h-6 border-2 rounded-md flex items-center justify-center ${
               userCredentials.schedule.includes(day)
                 ? 'bg-primary text-white border-primary'
                 : 'bg-white text-transparent border-muted'
             } transition-all duration-200`}
           >
             <svg
               className={`w-4 h-4 ${userCredentials.schedule.includes(day) ? 'opacity-100' : 'opacity-0'}`}
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
             >
               <path d="M20 6L9 17l-5-5" />
             </svg>
           </span>
           <span>{day}</span>
         </label>
       </div>
     ))}
   </div>
 
          {formErrors.schedule && (
            <div id="schedule-error" className="text-accent text-sm mt-1">
              {formErrors.schedule}
            </div>
          )}
        </div>
      )}

      {/* Display general error message if any */}
      {errorMessage && <p className="text-accent text-sm">{errorMessage}</p>}

      {/* Buttons for Back and Submit */}
      <div className="flex justify-between gap-4 mt-6">
        <Button type="button" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button type="submit">
          Register
        </Button>
      </div>
    </form>
  );
};

export default Step2;
