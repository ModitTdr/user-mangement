import { createBrowserRouter } from "react-router";
import DashboardHome from "@/features/DashboardHome";
import AuthLayout from "@/features/Authentication";
import Login from "@/features/Authentication/components/LoginForm/Login";
import Register from "@/features/Authentication/components/RegisterForm/Register";
import UserDetails from "@/features/userManagement/components/UserDetails";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import NotAllowed from "@/pages/NotAllowed";
import UserManagement from "@/features/userManagement";
import UserList from "@/features/userManagement/components/UserList";

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <PrivateRoute allowedRoles={["ADMIN"]}>
        <UserManagement />
      </PrivateRoute >,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <UserList />,
      },
      {
        path: "users/:id",
        element: <UserDetails />,
      },
    ]
  },

  {
    element:
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>,
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
  },

  {
    path: '*',
    element: <NotAllowed />
  }


]);

export default router;
