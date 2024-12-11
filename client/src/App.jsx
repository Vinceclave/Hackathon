import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import AuthProvider from "./hooks/AuthProvider";
import Login from "./components/auth/Login";
import Landing from "./pages/Landing";
import RoleBasedRoute from "./routes/RoleBasedRoute";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import BarberDashboard from "./components/dashboards/BarberDashboard";
import CustomerDashboard from "./components/dashboards/Customer";
import ManageMember from "./components/dashboards/admin/ManageMember";
import AddServices from "./components/dashboards/admin/AddServices";
import ViewAppointments from "./components/dashboards/admin/ViewAppointments";
import Register from "./components/auth/Register";
import AddSpecialization from "./components/dashboards/barber/AddSpecialization";

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

           {/* Admin Routes with Role Checking */}
           <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminDashboard />}>
                  {/* These nested routes will now render inside AdminDashboard's Outlet */}
                  <Route path="manage-member" element={<ManageMember />} />
                  <Route path="add-services" element={<AddServices />} />
                  <Route path="view-appointments" element={<ViewAppointments />} />
                  <Route index element={<div>Welcome to the Admin Dashboard</div>} />
                </Route>
              </Route>

              {/* Barber Routes with Role Checking */}
              <Route element={<RoleBasedRoute allowedRoles={['barber']} />}>
                <Route path="/barber" element={<BarberDashboard />}>
                  <Route path="add-specialization" element={<AddSpecialization />} />
                  <Route path="view-appointments" element={<ViewAppointments />} />
                  <Route index element={<div>Welcome to the Barber Dashboard</div>} />
                </Route>
              </Route>

              {/* Customer Routes with Role Checking */}
              <Route element={<RoleBasedRoute allowedRoles={['customer']} />}>
                <Route path="/customer" element={<CustomerDashboard />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </SnackbarProvider>
    </div>
  );
};

export default App;
