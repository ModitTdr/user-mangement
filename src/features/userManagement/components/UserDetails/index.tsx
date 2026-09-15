import { Component } from "react";
import type { ComponentType } from "react";
import styles from "./style.module.scss";
import { useNavigate, useParams } from "react-router";
import type { Params } from "react-router";
import { getUserById } from "../../services/userServices";
import LoadingPage from "@/pages/LoadingPage";
import { Card, CardBody } from "@/components/ui/Card";
import type { UserFormValues } from "../../schema/formValidation";
import {
  Mail,
  Phone,
  User as UserIcon,
  Shield,
  ChevronLeft,
} from "lucide-react";
import DetailCard from "../DetailCard";
import Button from "@/components/ui/Button";

function withParams<T extends { params: Params }>(Component: ComponentType<T>) {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();

    return <Component {...(props as T)} params={params} navigate={navigate} />;
  };
}

interface UserState {
  user: UserFormValues | null;
  loading: boolean;
}

class UserDetails extends Component<{ params: { id: string }, navigate: (path: number) => void }, UserState> {
  constructor(props: { params: { id: string }, navigate: (path: number) => void }) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  async componentDidMount() {
    const userId = this.props.params.id;
    setTimeout(async () => {
      try {
        const res = await getUserById(userId);
        if (!res) throw new Error("Failed to fetch user");
        this.setState({ user: res, loading: false });
      } catch (error) {
        console.error(error);
        this.setState({ loading: false });
      }
    }, 500);
  }

  render() {
    const { user, loading } = this.state;
    if (loading) return <LoadingPage />;
    if (!user) {
      return (
        <div className={styles.errorContainer}>
          <h2>User not found</h2>
          <p>The user you are looking for does not exist or has been removed.</p>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <Button onClick={() => this.props.navigate(-1)} variant="outline" size="icon">
          <ChevronLeft size={18} />
        </Button>
        <div className={styles.userDetails}>
          <aside>
            <Card className={styles.profileCard}>
              <CardBody className={styles.profileCard__body}>
                <div className={styles.profileCard__photoPlaceholder}>
                  <UserIcon size={64} strokeWidth={1} />
                </div>
                <h1 className={styles.profileCard__userName}>
                  {user.firstName} {user.lastName}
                </h1>
                <p className={styles.profileCard__userHandle}>
                  @{user.username}
                </p>
                <div className={styles.profileCard__statusBadge} data-status={user.status}>
                  {user.status}
                </div>

                <div className={styles.profileCard__basicInfo}>
                  <div className={styles.profileCard__basicInfo__items}>
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                  <div className={styles.profileCard__basicInfo__items}>
                    <Phone size={16} />
                    <span>{user.phone}</span>
                  </div>
                  <div className={styles.profileCard__basicInfo__items}>
                    <Shield size={16} />
                    <span>{user.role}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </aside>

          <main>
            <section className={styles.infoGrid}>
              <DetailCard
                title="Personal Information"
                details={[
                  { label: "Gender", value: user.gender },
                  { label: "Date of Birth", value: new Date(user.dateOfBirth).toLocaleDateString() },
                  { label: "Marital Status", value: user.maritalStatus },
                ]}
              />

              <DetailCard
                title="Professional Details"
                details={[
                  { label: "Occupation", value: user.occupation },
                  { label: "Experience" },
                ]}
              />

              <DetailCard
                title="Current Address"
                className={styles.fullWidth}
                details={[
                  { value: user.address },
                ]}
              />
            </section>
          </main>
        </div>
      </div>
    );
  }
}


export default withParams(UserDetails);