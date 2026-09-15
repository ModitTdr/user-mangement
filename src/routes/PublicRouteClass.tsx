import { useAuth } from "@/hook/useAuth";
import LoadingPage from "@/pages/LoadingPage";
import React, { Component } from "react";
import { Navigate } from "react-router";

interface PublicRouteProps {
  children: React.ReactNode;
  authData: { isAuthenticated: boolean, isLoading: boolean }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withProps(Component: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => {
    const { isAuthenticated, isLoading } = useAuth();
    return <Component {...props} authData={{ isAuthenticated, isLoading }} />
  }
}

class PublicRoute extends Component<PublicRouteProps> {
  constructor(props: PublicRouteProps) {
    super(props);
  }

  render() {
    const { isAuthenticated, isLoading } = this.props.authData
    if (isLoading) return <LoadingPage />

    if (isAuthenticated) return <Navigate to="/" />
    return <>{this.props.children}</>
  }

};

export default withProps(PublicRoute);