import { Navigate } from "react-router-dom";

import { ReactNode } from "react";
import { useUserStore } from "../Context/context";

interface Props {
  children: ReactNode;
  role?: string[];
}

const PrivateRoute: React.FC<Props> = ({ children, role = [] }) => {
  const { userAuth, userRole } = useUserStore();
  
  if (!userAuth?.email) {
    return <Navigate replace to="/" />;
  }
  if (!userAuth || !userRole || !role.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export { PrivateRoute };