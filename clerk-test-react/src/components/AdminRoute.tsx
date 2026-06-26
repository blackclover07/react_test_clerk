import { Navigate } from "react-router-dom";
import { useRole } from "./Authcontext";
import Loader from "./Loader";

interface Props {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: Props) {
  const { role } = useRole();

  // Role not loaded yet
  if (role === null) {
    return <Loader />;
  }

  // Not an admin
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
