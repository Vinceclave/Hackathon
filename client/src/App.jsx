import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from 'notistack';  // Import Notistack
import AuthProvider from "./hooks/AuthProvider"; // Ensure this is the correct path
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard"; // Example component
import PrivateRoute from "./PrivateRoute";
import Register from "./components/auth/Register";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <div className="min-w-[320px] min-h-screen overflow-hidden">
      {/* Wrap your entire app with SnackbarProvider */}
      <SnackbarProvider maxSnack={3}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              {/* Other routes */}
            </Routes>
          </AuthProvider>
        </Router>
      </SnackbarProvider>
    </div>
  );
};

export default App;
