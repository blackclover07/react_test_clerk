import { useClerk, useAuth } from "@clerk/react-router";
import { useNavigate } from "react-router-dom";
interface ProfileCardProps {
  image: string;
  name: string;
  role: string;
}

export default function ProfileCard({ image, name, role }: ProfileCardProps) {
  const clerk = useClerk();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const showToken = async () => {
    const token = await getToken();
    console.log("JWT TOKEN", token);

    const response = await fetch("http://127.0.0.1:8000/api/auth/sync-user/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Backend Error:", data);
    } else {
      console.log("Success:", data);
    }
    if (data.role == "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="m-10 max-w-sm">
      <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
        <div className="relative mx-auto w-36 rounded-full">
          <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
          <img
            className="mx-auto h-auto w-full rounded-full"
            src={image}
            alt=""
          />
        </div>
        <p className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
          {name}
        </p>
        <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
          {role}
        </h3>
        <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
          placeat!
        </p>
        <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
          <li className="flex items-center py-3 text-sm">
            <span>Status</span>
            <span className="ml-auto">
              <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                Open for side gigs
              </span>
            </span>
          </li>
          <li className="flex items-center py-3 text-sm">
            <span>Joined On</span>
            <span className="ml-auto">Apr 08, 2022</span>
          </li>
        </ul>
        <div className="flex justify-center m-3 gap-2">
          <div className="flex items-center justify-center text-slate-900 text-sm font-semibold border border-slate-300 divide-x divide-slate-300 bg-white rounded-md overflow-visible mt-6 w-max mx-auto dark:text-slate-50 dark:bg-neutral-800 dark:border-neutral-700 dark:divide-neutral-700">
            <button
              type="button"
              className="px-3.5 py-2 flex items-center gap-2 transition-colors rounded-l-[5px] cursor-pointer hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-neutral-700"
              onClick={() => clerk.openUserProfile()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-[18px] fill-current overflow-visible"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  d="M253.414 103.434c48.556 0 87.919 40.52 87.919 90.505s-39.363 90.505-87.919 90.505-87.919-40.521-87.919-90.505 39.363-90.505 87.919-90.505m0 36.202c-28.324 0-51.717 24.081-51.717 54.303s23.393 54.303 51.717 54.303 51.717-24.081 51.717-54.303-23.393-54.303-51.717-54.303"
                  data-original="#000000"
                />
                <path
                  d="M253.414 0c139.957 0 253.414 113.457 253.414 253.414 0 94.285-51.491 176.544-127.886 220.19-35.728 20.575-77.036 32.582-121.104 33.199l-4.423.025C113.457 506.828 0 393.371 0 253.414S113.457 0 253.414 0m-23.676 346.505c-46.331 0-87.479 29.378-102.607 73.008l-2.339 7.571c35.919 27.232 80.165 42.893 126.504 43.522l5.709-.009c38.24-.62 74.079-11.122 105.072-29.064l19.977-13.243-2.237-6.866c-14.371-44.046-55.062-74.052-101.239-74.901zm23.676-310.303c-119.963 0-217.212 97.249-217.212 217.212 0 57.493 22.337 109.77 58.807 148.624 21.668-55.072 74.965-91.735 134.73-91.735h46.831c59.905 0 113.311 36.835 134.885 92.121 36.686-38.892 59.172-91.325 59.172-149.01-.001-119.963-97.25-217.212-217.213-217.212"
                  data-original="#000000"
                />
              </svg>
              Profile
            </button>
            <button
              type="button"
              onClick={() => clerk.signOut()}
              className="px-3.5 py-2 flex items-center gap-2 transition-colors cursor-pointer hover:bg-red-100 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-[18px] fill-current overflow-visible"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M10 17l5-5-5-5v3H3v4h7v3z" />
                <path d="M20 3H12v2h8v14h-8v2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
              </svg>
              Sign Out
            </button>
            <button
              type="button"
              onClick={showToken}
              className="px-3.5 py-2 flex items-center gap-2 transition-colors cursor-pointer hover:bg-red-100 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-[18px] fill-current overflow-visible"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M10 17l5-5-5-5v3H3v4h7v3z" />
                <path d="M20 3H12v2h8v14h-8v2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
              </svg>
              show
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
