import { createBrowserRouter } from "react-router";
import App from "../App";
import UserDashboard from "@/pages/UserDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    element: <UserDashboard />,
  },

]);

export default router;
