import React, { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider"; // Import the useAuth hook
import { Link } from "react-router-dom"; // Import Link for routing to register page
import InputField from "../common/InputField"; // Import the reusable InputField component
import Button from "../common/Button"; // Import the reusable Button component

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(""); // To track and show error message
  const [loading, setLoading] = useState(false); // To track loading state

  const { loginAction } = useAuth(); // Access loginAction from context

  

  const handleSubmitEvent = async (e) => {
    e.preventDefault();

    // Validate input fields before sending the API request
    if (!input.username || !input.password) {
      setError("Please provide both username and password.");
      return;
    }

    setLoading(true); // Start loading state
    setError(""); // Reset previous error message

    try {
      // Call the loginAction from context to handle login
      const result = await loginAction({
        username: input.username,
        userpass: input.password,
      });

      if (!result.success) {
        setError(result.message); // Display error message returned from loginAction
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmitEvent}
        className="w-full sm:w-96 p-8  space-y-6"
      >
        <h2 className="text-3xl font-primary text-center text-primary mb-4">Login Trimly</h2>

        {/* Username Input Field */}
        <InputField
          id="username"
          name="username"
          placeholder="Username"
          value={input.username}
          onChange={handleInput}
          error={input.username === "" && "Please enter a valid username."}
          ariaDescription="username-help"
          ariaInvalid={input.username === "" ? "true" : "false"}
        />

        {/* Password Input Field */}
        <InputField
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={input.password}
          onChange={handleInput}
          error={input.password === "" && "Your password should be more than 6 characters."}
          ariaDescription="password-help"
          ariaInvalid={input.password === "" ? "true" : "false"}
        />

        {/* Form-Level Error Message */}
        {error && <div className="text-center text-accent text-sm mt-2">{error}</div>}

        {/* Submit Button */}
        <Button isLoading={loading} disabled={loading}>
          Login
        </Button>

        {/* Registration Link */}
        <div className="text-center mt-4">
          <p className="text-muted">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
