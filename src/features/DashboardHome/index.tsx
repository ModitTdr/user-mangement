import { Users, UserPlus, ShieldAlert, Activity } from "lucide-react";
import styles from './style.module.scss';
import StatCard from "./components/StatCard";
import { useFetch } from "@/hook/useFetch";
import { getUsers } from "../userManagement/services/userServices";
import type { UserFormValues } from "../userManagement/schema/formValidation";
import LoadingPage from "@/pages/LoadingPage";
import Charts from "./components/Charts";

const DashboardHome = () => {
  const { data: users, isLoading } = useFetch<UserFormValues[]>({ queryFn: getUsers });

  const stats = [
    {
      title: "Total Users",
      value: users?.length || 0,
      icon: <Users size={24} />,
      trend: { value: 12, isUp: true },
      color: "#4184f0ff"
    },
    {
      title: "New Users",
      value: "4",
      icon: <UserPlus size={24} />,
      trend: { value: 5, isUp: true },
      color: "#26d265ff"
    },
    {
      title: "Active Sessions",
      value: "100",
      icon: <Activity size={24} />,
      trend: { value: 2, isUp: false },
      color: "#a741f5ff"
    },
    {
      title: "Pending Requests",
      value: "42",
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

  if (isLoading) {
    return <LoadingPage />
  }

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
        <Charts stats={stats} />
      </section>
    </div>
  );
};

export default DashboardHome;