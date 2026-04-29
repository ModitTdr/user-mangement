import { createBrowserRouter } from "react-router";
import UserDashboard from "@/pages/UserDashboard";
import DashboardHome from "@/features/DashboardHome";
import App from "@/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <UserDashboard />,
      },
    ]
  },


]);

export default router;
