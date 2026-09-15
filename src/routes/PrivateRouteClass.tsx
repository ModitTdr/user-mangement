import { useAuth } from "@/hook/useAuth";
import LoadingPage from "@/pages/LoadingPage";
import { Component } from "react";
import { Navigate } from "react-router";

interface PrivateRouteProps {
  children: React.ReactNode;
  authData: { isAuthenticated: boolean, isLoading: boolean }
  allowedRoles?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withProps(Component: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => {
    const auth = useAuth();
    if (!auth.isLoading)
      return <Component {...props} authData={auth} />
  }
}

class PrivateRoute extends Component<PrivateRouteProps> {
  constructor(props: PrivateRouteProps) {
    super(props)
  }

  render() {
    const { isAuthenticated, isLoading } = this.props.authData;
    // const allowedRoles = this.props.allowedRoles;
    if (isLoading) return <LoadingPage />

    if (!isAuthenticated) return <Navigate to="/login" />

    // if (allowedRoles && !allowedRoles.includes(user?.role))
    //   return <Navigate to="/login" />

    return <>{this.props.children}</>
  }
}

export default withProps(PrivateRoute);