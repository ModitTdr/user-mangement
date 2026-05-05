import { createBrowserRouter } from "react-router";
import UserDashboard from "@/pages/UserDashboard";
import DashboardHome from "@/features/DashboardHome";
import AuthLayout from "@/features/Authentication";
import Login from "@/features/Authentication/components/LoginForm/Login";
import Register from "@/features/Authentication/components/RegisterForm/Register";
import App from "@/App";
import { RouteGuard } from "./RouteGuards";
import UserDetails from "@/features/userManagement/components/UserDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <RouteGuard type="protected">
        <App />
      </RouteGuard>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <UserDashboard />,
      },
      {
        path: "users/:id",
        element: <UserDetails />,
      },
    ]
  },

  {
    element:
      <RouteGuard type="public">
        <AuthLayout />
      </RouteGuard>,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  }


]);

export default router;
