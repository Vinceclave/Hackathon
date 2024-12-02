import React, { useContext, createContext, useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.token) {
      setToken(userData.token);
      setRole(userData.role);
      setUser(userData.username);
    }
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const authPages = ["/login", "/register"];

    if (userData && userData.token) {
      if (authPages.includes(location.pathname)) {
        navigate("/dashboard");
      }
    } else if (!userData || !userData.token) {
      if (!authPages.includes(location.pathname) && location.pathname !== "/") {
        navigate("/login");
      }
    }
  }, [navigate, location.pathname]);

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
      console.log(res);

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
        navigate("/dashboard");
        return { success: true };
      }

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
    localStorage.removeItem("userData"); // Remove the user data from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, token, role, loginAction, registerAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
