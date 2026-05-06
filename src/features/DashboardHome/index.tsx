import { Users, UserPlus, ShieldAlert, Activity } from "lucide-react";
import styles from './style.module.scss';
import StatCard from "./components/StatCard";
import { useFetch } from "@/hook/useFetch";
import { getUsers } from "../userManagement/services/userServices";
import LoadingPage from "@/pages/LoadingPage";
import Charts from "./components/Charts";
import type { PaginatedUsersResponse } from "../userManagement/components/UserList";

const DashboardHome = () => {
  const { data: users, isLoading } = useFetch<PaginatedUsersResponse>({ queryFn: getUsers });

  if (isLoading) return <LoadingPage />

  const activeUser = users?.data?.filter(
    (user) => user.status === "active"
  ) || [];
  const pendingUser = users?.data?.filter(
    (user) => user.status === "pending"
  ) || [];

  const stats = [
    {
      title: "Total Users",
      value: users?.items || 0,
      icon: <Users size={24} />,
      trend: { value: 12, isUp: true },
      color: "#4184f0ff"
    },
    {
      title: "New Users",
      value: 5,
      icon: <UserPlus size={24} />,
      trend: { value: 5, isUp: true },
      color: "#26d265ff"
    },
    {
      title: "Active Sessions",
      value: activeUser.length,
      icon: <Activity size={24} />,
      trend: { value: 2, isUp: false },
      color: "#a741f5ff"
    },
    {
      title: "Pending Requests",
      value: pendingUser.length,
      icon: <ShieldAlert size={24} />,
      trend: { value: 1, isUp: true },
      color: "#f2bb2fff"
    }
  ];

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={styles.dashboard}>
      <header className={styles.dashboard__header}>
        <div className={styles.dashboard__welcome}>
          <h1>Welcome back, Admin</h1>
          <p>{currentDate}</p>
        </div>
      </header>

      <section className={styles.dashboard__stats}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </section>

      <section className={styles.dashboard__charts}>
        <Charts stats={stats} >
          <h2>User Overview</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
        </Charts>
      </section>
    </div>
  );
};

export default DashboardHome;
