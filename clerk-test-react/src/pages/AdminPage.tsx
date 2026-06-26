import {
  Search,
  Bell,
  Users,
  DollarSign,
  BookOpen,
  Activity,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "12,450",
      change: "+12.5%",
      icon: Users,
    },
    {
      title: "Revenue",
      value: "$48,200",
      change: "+8.2%",
      icon: DollarSign,
    },
    {
      title: "Courses",
      value: "532",
      change: "+15.1%",
      icon: BookOpen,
    },
    {
      title: "Activity",
      value: "89%",
      change: "+3.4%",
      icon: Activity,
    },
  ];

  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      name: "Sarah Smith",
      email: "sarah@example.com",
      role: "Instructor",
      status: "Active",
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Student",
      status: "Active",
    },
    {
      name: "Emma Wilson",
      email: "emma@example.com",
      role: "Student",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-white/5 blur-[180px]" />
        <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-zinc-500/10 blur-[180px]" />
      </div>

      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-zinc-900 bg-black">
        <div className="p-8">
          <h1 className="text-3xl font-bold tracking-tight">EduAdmin</h1>
          <p className="text-sm text-zinc-500 mt-1">Learning Platform</p>
        </div>

        <nav className="px-4 flex-1">
          {[
            "Dashboard",
            "Users",
            "Courses",
            "Instructors",
            "Analytics",
            "Revenue",
            "Settings",
          ].map((item, index) => (
            <button
              key={item}
              className={`w-full text-left px-5 py-3 rounded-2xl mb-2 transition-all duration-200 ${
                index === 0
                  ? "bg-white text-black font-semibold"
                  : "text-zinc-400 hover:bg-zinc-950 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="p-4">
          <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-4">
            <p className="text-sm text-zinc-400">Current Plan</p>
            <h3 className="mt-2 text-lg font-semibold">Enterprise</h3>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Navbar */}
        <header className="flex h-20 items-center justify-between border-b border-zinc-900 px-8">
          <div className="flex items-center gap-3 rounded-2xl border border-zinc-900 bg-zinc-950 px-4 py-3">
            <Search size={18} className="text-zinc-500" />
            <input
              type="text"
              placeholder="Search users, courses..."
              className="bg-transparent outline-none placeholder:text-zinc-500"
            />
          </div>

          <div className="flex items-center gap-6">
            <Bell
              size={20}
              className="cursor-pointer text-zinc-400 hover:text-white"
            />

            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="h-11 w-11 rounded-full border border-zinc-800"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <section className="p-8">
          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-5xl font-bold tracking-tight">
              Welcome Back 👋
            </h2>

            <p className="mt-3 text-lg text-zinc-500">
              Here's what's happening with your platform today.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-3xl border border-zinc-900 bg-zinc-950 p-7 transition-all hover:border-zinc-700 hover:-translate-y-1"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-zinc-500">{stat.title}</p>

                    <h3 className="mt-3 text-4xl font-bold">{stat.value}</h3>

                    <p className="mt-3 text-sm text-emerald-400">
                      {stat.change} this month
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900">
                    <stat.icon size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Middle Section */}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {/* Analytics Card */}
            <div className="lg:col-span-2 rounded-3xl border border-zinc-900 bg-zinc-950 p-6">
              <h3 className="text-xl font-semibold">Platform Analytics</h3>

              <div className="mt-8 flex h-64 items-end gap-4">
                {[35, 60, 40, 85, 55, 95, 70].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-xl bg-gradient-to-t from-white/30 to-white"
                    style={{
                      height: `${height}%`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="rounded-3xl border border-zinc-900 bg-zinc-950 p-6">
              <h3 className="text-xl font-semibold">Recent Activity</h3>

              <div className="mt-6 space-y-5">
                {[
                  "New user registered",
                  "Course published",
                  "Payment received",
                  "Instructor added",
                  "Review submitted",
                ].map((activity) => (
                  <div key={activity} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-white" />

                    <p className="text-sm text-zinc-300">{activity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950">
            <div className="border-b border-zinc-900 p-6">
              <h3 className="text-xl font-semibold">Recent Users</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-900 text-zinc-500">
                    <th className="p-5 text-left font-medium">Name</th>
                    <th className="p-5 text-left font-medium">Email</th>
                    <th className="p-5 text-left font-medium">Role</th>
                    <th className="p-5 text-left font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.email}
                      className="border-b border-zinc-900 transition hover:bg-zinc-900/50"
                    >
                      <td className="p-5">{user.name}</td>

                      <td className="p-5 text-zinc-400">{user.email}</td>

                      <td className="p-5">{user.role}</td>

                      <td className="p-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            user.status === "Active"
                              ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                              : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
