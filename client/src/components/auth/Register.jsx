import React, { useState } from 'react';

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle role selection
  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setStep(1); // Move to the next step after selecting a role
  };

  // Handle step 1 (username and password)
  const handleStep1Submit = (e) => {
    e.preventDefault();
    const { username, password } = userCredentials;

    // Validate the username and password
    let errors = { username: '', password: '' };
    if (!username) {
      errors.username = 'Username is required!';
    }
    if (!password) {
      errors.password = 'Password is required!';
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

    // Validate the step 2 fields
    let errors = { firstname: '', lastname: '', phone: '', schedule: '' };

    if (!firstname || !lastname || !phone || (role === 'barber' && !schedule)) {
      if (!firstname) errors.firstname = 'First Name is required!';
      if (!lastname) errors.lastname = 'Last Name is required!';
      if (!phone) errors.phone = 'Phone number is required!';
      if (role === 'barber' && !schedule) errors.schedule = 'Schedule is required for Barbers!';
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
    console.log('Registering user with:', { ...userCredentials, role });
    alert('Registration successful!');
  };

  return (
    <div className="font-poppins p-6">
      <h2 className="font-bold text-4xl lg:text-5xl mb-6 text-center">Register Trimly</h2>

      {step === 0 && (
        <div className="role-selection mb-6">
          <h3 className="text-xl mb-4">Please select your role:</h3>
          <div className="role-buttons flex justify-center gap-4">
            <button
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
              onClick={() => handleRoleSelection('barber')}
            >
              Barber
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
              onClick={() => handleRoleSelection('customer')}
            >
              Customer
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleStep1Submit} className="space-y-6">
          <div>
            <input
              type="text"
              id="username"
              name="username"
              value={userCredentials.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {formErrors.username && (
              <p className="text-red-700 text-xs mt-1">{formErrors.username}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={userCredentials.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {formErrors.password && (
              <p className="text-red-700 text-xs mt-1">{formErrors.password}</p>
            )}
          </div>

          {errorMessage && <p className="text-red-700 text-xs text-center mt-2">{errorMessage}</p>}

          <div className="flex justify-between">
            <button
              type="button"
              className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition duration-300"
              onClick={() => setStep(0)} // Go back to role selection
            >
              Back
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Next
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleStep2Submit} className="space-y-6">
          <div>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={userCredentials.firstname}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {formErrors.firstname && (
              <p className="text-red-700 text-xs mt-1">{formErrors.firstname}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={userCredentials.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {formErrors.lastname && (
              <p className="text-red-700 text-xs mt-1">{formErrors.lastname}</p>
            )}
          </div>
          {role === 'customer' && (
            <div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userCredentials.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {formErrors.phone && (
              <p className="text-red-700 text-xs mt-1">{formErrors.phone}</p>
            )}
          </div>

          )}
          

          {role === 'barber' && (
            <div>
              <input
                type="text"
                id="schedule"
                name="schedule"
                value={userCredentials.schedule}
                onChange={handleChange}
                placeholder="Schedule (e.g., Monday to Friday)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {formErrors.schedule && (
                <p className="text-red-700 text-xs mt-1">{formErrors.schedule}</p>
              )}
            </div>
          )}

          {errorMessage && <p className="text-red-700 text-xs text-center mt-2">{errorMessage}</p>}

          <div className="flex justify-between">
            <button
              type="button"
              className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition duration-300"
              onClick={() => setStep(1)} // Go back to the previous step
            >
              Back
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
