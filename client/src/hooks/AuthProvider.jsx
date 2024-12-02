import { useContext, createContext, useState } from "react";
import { useSnackbar } from "notistack"; // Import useSnackbar ho
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Hook for displaying notifications

  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:5015/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (res.token) {
        setUser(res.username); // Set user data from API response
        setToken(res.token); // Set the token
        localStorage.setItem("site", res.token); // Store token in localStorage
        enqueueSnackbar("Login successful!", { variant: "success" }); // Success notification 
        navigate("/dashboard"); // Redirect to the dashboard
        return { success: true };
      }

      // Return error message if login fails
      return { success: false, message: res.message || "Login failed. Please try again." };
    } catch (err) {
      console.error("Login failed:", err);
      return { success: false, message: "An error occurred. Please try again later." };
    }
  };

  const registerAction = async (data) => {
    const { username, password: userpass, role: userType, firstname, lastname, phone: phonenum, schedule } = data;
    console.log(data);
  
    try {
      const response = await fetch("http://localhost:5015/register", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          userpass,
          userType,
          firstname,
          lastname,
          phonenum,
          schedule
        }),
      });
  
      const res = await response.json();
  
      // Handle response success and failure with Snackbar
      if (response.ok) {
        // Success case
        enqueueSnackbar('Registration successful!', { variant: 'success' });
        navigate("/login"); // Redirect to the dashboard
        console.log("Registration successful", res.message);
      } else {
        // Failure case
        enqueueSnackbar(`Registration failed: ${res.message}`, { variant: 'error' });
        console.error("Registration failed:", res.message);
      }
    } catch (e) {
      // Error case
      enqueueSnackbar(`An error occurred: ${e.message}`, { variant: 'error' });
      console.error("An error occurred:", e);
    }
  };
  
  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site"); // Remove the token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAction, registerAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

