import { useUser, UserButton } from "@clerk/react-router";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ProfileCard from "../components/ProfileCard";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [minTime, setMinTime] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTime(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  if (!isLoaded || !minTime) {
    return <Loader />;
  }
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">Clerk Test</h1>

        {isSignedIn ? (
          <>
            <div className="flex items-center gap-3">
              <ProfileCard
                image={user?.imageUrl ?? ""}
                name={
                  user?.fullName ??
                  user?.primaryEmailAddress?.emailAddress ??
                  "unknow user"
                }
                role="Administrator"
              />
            </div>
          </>
        ) : (
          <div className="flex jutify-center gap-4">
            <a
              href="/sign-in"
              className="border px-4 py-2 rounded border-green-500 hover:bg-green-500 text-white"
            >
              Sign In
            </a>
            <a
              href="/sign-up"
              className="border px-4 py-2 rounded border-amber-500 hover:bg-amber-500 text-white"
            >
              Sign Up
            </a>
            <a
              href="/admin"
              className="border px-4 py-2 rounded border-blue-400 hover:bg-blue-400 text-white"
            >
              Admin Page
            </a>
            <a
              href="/about"
              className="border px-4 py-2 rounded border-cyan-400 hover:bg-cyan-400 text-white"
            >
              About page
            </a>
            <a
              href="/login"
              className="border px-4 py-2 rounded border-cyan-400 hover:bg-cyan-400 text-white"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </>
  );
}
