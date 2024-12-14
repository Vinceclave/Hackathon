import React, { useContext, createContext, useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  // On initial page load, check localStorage for user token and role
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    
    if (userData?.token) {
      setToken(userData.token);
      setRole(userData.role);
      setUser(userData.username);
      
      // Redirect user based on role if not already on a role-specific page
      if (!location.pathname.startsWith(`/${userData.role}`)) {
        handleRedirection(userData.role);
      }
    }
    
    setIsLoading(false);
  }, [navigate, location]);

  const handleRedirection = (userRole) => {
    switch (userRole) {
      case "admin":
        navigate("/admin");
        break;
      case "barber":
        navigate("/barber");
        break;
      case "customer":
        navigate("/customer");
        break;
      default:
        navigate("/login");
    }
  };

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
        const userData = {
          token: res.token,
          username: res.username,
          userID: res.userID,
          role: res.userType,
          isAdmin: res.isAdmin,
        };

        setUser(res.username);
        setToken(res.token);
        setRole(res.userType);

        localStorage.setItem("userData", JSON.stringify(userData));
        enqueueSnackbar("Login successful!", { variant: "success" });

        // Redirect based on role upon successful login
        handleRedirection(res.userType);
        return { success: true };
      }

      return { success: false, message: res.message || "Login failed. Please try again." };
    } catch (err) {
      console.error("Login failed:", err);
      enqueueSnackbar("An error occurred. Please try again later.", { variant: "error" });
      return { success: false, message: "An error occurred." };
    }
  };

  const registerAction = async (data) => {
    const { username, password: userpass, role: userType, firstname, lastname, phone: phonenum, schedule } = data;
    console.log(data);
    try {
      const response = await fetch("http://localhost:5015/register", {
        method: "POST",
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
          schedule,
        }),
      });
      const res = await response.json();
      if (response.ok) {
        enqueueSnackbar("Registration successful!", { variant: "success" });
        navigate("/login");
        console.log("Registration successful", res.message);
      } else {
        enqueueSnackbar(`Registration failed: ${res.message}`, { variant: "error" });
        console.error("Registration failed:", res.message);
      }
    } catch (e) {
      enqueueSnackbar(`An error occurred: ${e.message}`, { variant: "error" });
      console.error("An error occurred:", e);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    setRole(null);
    localStorage.removeItem("userData");
    navigate("/login");
    enqueueSnackbar("Logged out successfully!", { variant: "info" });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      role, 
      registerAction,
      loginAction, 
      logOut,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;