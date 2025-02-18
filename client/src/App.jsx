import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import AuthProvider from "./hooks/AuthProvider";
import Login from "./components/auth/Login";
import Landing from "./pages/Landing";
import Register from "./components/auth/Register";


const App = () => {
  return (
    <div className="min-w-[320px] min-h-screen overflow-hidden">
      <SnackbarProvider maxSnack={3}>
        <Router>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

            </Routes>
          </AuthProvider>
        </Router>
      </SnackbarProvider>
    </div>
  );
};

export default App;
