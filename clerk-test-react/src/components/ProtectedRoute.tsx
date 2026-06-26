import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/react-router";
import { useEffect, useState, useRef } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useRole } from "./Authcontext";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [minTime, setMinTime] = useState(false);
  const hasSynced = useRef(false);
  const { role, setRole } = useRole();
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTime(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const syncUser = async () => {
      try {
        const token = await getToken();
        console.log(token);
        console.log(isLoaded);
        console.log(isSignedIn);

        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/sync-user/",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log("Role", response.data.role);
        setRole(response.data.role);
      } catch (error: any) {
        console.log("Status", error.response?.status);
        console.log("Data", error.response?.data);
        console.log(error);
      }
    };

    if (isLoaded && isSignedIn && minTime && !hasSynced.current) {
      hasSynced.current = true;
      setTimeout(() => {
        syncUser();
      }, 1000);
    }
  }, [isLoaded, isSignedIn, minTime, getToken]);

  if (!isLoaded || !minTime) {
    return <Loader />;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}
