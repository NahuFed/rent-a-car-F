import React from "react";
import Home from "../pages/home/Home";
import Services from "../pages/home/Services";
import Contact from "../components/Contact";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserDashboard from "../pages/user/User-dashboard";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ConfirmPassword from "../pages/auth/ConfirmPassword";
import PrivateRoute from "./PrivateRoute";
import ManagePictures from "../pages/admin/components/car-pictures/ManagePictures";

// Rutas de administración adicionales
import AdminDashboard from "../pages/admin/Admin-dashboard";
import ManageCars from "../pages/admin/components/cars/ManageCars";
import PendingRents from "../pages/admin/components/rent-requests/PendingRents";
import AcceptedRents from "../pages/admin/components/rent-requests/AcceptedRents";
import RejectedRents from "../pages/admin/components/rent-requests/RejectedRents";
import BrowseCars from "../pages/user/components/Browse-cars";
import RentForm from "../pages/user/components/Rent-Form";

interface Route {
  path: string;
  element: React.ReactNode;
  isPrivate?: boolean;
  requiredRole?: string;
  children?: Route[];
}

const routes: Route[] = [
  { path: "/", element: <Home /> },
  { path: "/services", element: <Services /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/confirm-password", element: <ConfirmPassword /> },
  {
    path: "/user-dashboard",
    element: <PrivateRoute element={<UserDashboard />} requiredRole="user" />,
    isPrivate: true,
  },
  {
    path: "/browse-cars",
    element: <PrivateRoute element={<BrowseCars />} requiredRole="user" />,
  },
  {
    path: "/rent-form/:carId",
    element: <PrivateRoute element={<RentForm />} requiredRole="user" />,
  },

  {
    path: "/admin",
    element: <PrivateRoute element={<AdminDashboard />} requiredRole="admin" />,
    isPrivate: true,
    children: [
      { path: "cars", element: <ManageCars /> },
      { path: "cars/:id/pictures", element: <ManagePictures /> },
      { path: "/admin/rental-requests/pending", element: <PendingRents /> },
      { path: "/admin/rental-requests/accepted", element: <AcceptedRents /> },
      { path: "/admin/rental-requests/rejected", element: <RejectedRents /> },
    ],
  },
];

export default routes;
