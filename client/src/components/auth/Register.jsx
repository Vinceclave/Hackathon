import React, { useState } from 'react';
import { useAuth } from "../../hooks/AuthProvider"; // Import the useAuth hook
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import StepNavigation from '../auth/register/StepNavigation';
import RoleSelection from '../auth/register/RoleSelection';
import Step1 from '../auth/register/steps/StepOne';
import Step2 from '../auth/register/steps/StepTwo';

const Register = () => {
  const [step, setStep] = useState(0); // Track the current step of the form
  const [role, setRole] = useState(''); // Store the role (Barber or Customer)
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: '', // Specific to Customers
    schedule: '', // Specific to Barbers
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: '',
    schedule: '',
  });

  const { registerAction } = useAuth(); // Access loginAction from context

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure the value is treated as a string and trim it
    setUserCredentials((prevState) => ({
      ...prevState,
      [name]: value ? value.trim() : value, // Check if value is not null or undefined before trimming
    }));
  };

  // Handle role selection
  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setUserCredentials({
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      phone: '',
      schedule: '',
    }); // Clear the form fields for the selected role
    setStep(1); // Move to the next step after selecting a role
  };

  // Handle step 1 (username and password)
  const handleStep1Submit = (e) => {
    e.preventDefault();
    const { username, password } = userCredentials;

    // Trim and validate the username and password
    let errors = { username: '', password: '' };
    if (!username.trim()) {
      errors.username = 'Username is required!';
    } else if (username.length < 3 || username.length > 30) {
      errors.username = 'Username must be between 3 and 30 characters!';
    }
    if (!password.trim()) {
      errors.password = 'Password is required!';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long!';
    }

    // If there are validation errors, set them and return early
    if (errors.username || errors.password) {
      setFormErrors(errors);
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setErrorMessage('');
    setFormErrors({ username: '', password: '' }); // Clear previous errors
    setStep(2); // Move to step 2
  };

  // Handle step 2 (additional info based on role)
  const handleStep2Submit = (e) => {
    e.preventDefault();
    const { firstname, lastname, phone, schedule } = userCredentials;

    // Validate the step 2 fields based on the selected role
    let errors = { firstname: '', lastname: '', phone: '', schedule: '' };

    if (!firstname || !lastname) {
      if (!firstname) errors.firstname = 'First Name is required!';
      if (!lastname) errors.lastname = 'Last Name is required!';
    }

    if (role === 'customer') {
      if (!phone) {
        errors.phone = 'Phone number is required for Customers!';
      } else if (!/^\d{10}$/.test(phone)) {
        errors.phone = 'Phone number must be 10 digits!';
      }
    }

    if (role === 'barber') {
      if (!schedule) errors.schedule = 'Schedule is required for Barbers!';
    }

    if (Object.values(errors).some((error) => error !== '')) {
      setFormErrors(errors);
      setErrorMessage('Please fill in all required fields!');
      return;
    }

    setErrorMessage('');
    setFormErrors({ firstname: '', lastname: '', phone: '', schedule: '' });
    handleRegistration(); // Proceed to registration completion
  };

  // Handle registration submission
  const handleRegistration = () => {
    registerAction({ ...userCredentials, role });
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='w-full sm:w-96 p-8  space-y-6'>
        <h2 className="text-3xl font-primary text-center text-primary mb-4">Register Trimly</h2>

        {/* Step navigation numbering */}
        <StepNavigation step={step} />

        {/* Role Selection */}
        {step === 0 && <RoleSelection handleRoleSelection={handleRoleSelection} />}

        {/* Step 1 (Username and Password) */}
        {step === 1 && (
          <Step1
            userCredentials={userCredentials}
            formErrors={formErrors}
            errorMessage={errorMessage}
            handleChange={handleChange}
            handleStep1Submit={handleStep1Submit}
            setStep={setStep}
          />
        )}

        {/* Step 2 (Additional Info) */}
        {step === 2 && (
          <Step2
            userCredentials={userCredentials}
            formErrors={formErrors}
            errorMessage={errorMessage}
            handleChange={handleChange}
            handleStep2Submit={handleStep2Submit}
            setStep={setStep}
            role={role}
          />
        )}

        <div className="text-center mt-4">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-accent">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
