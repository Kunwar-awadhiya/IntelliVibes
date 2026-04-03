"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Bookmark,
  Briefcase,
  User,
  LogOut,
  Eye,
  MapPin,
  Building2,
} from "lucide-react";

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      router.push("/Account");
      return;
    }

    const parsed = JSON.parse(stored);

    if (parsed.type === "admin") {
      router.push("/admin");
      return;
    }

    setUser(parsed);
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl border-r border-gray-200 flex flex-col">

        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {user.first_name || user.name}
          </h2>
          <p className="text-xs text-gray-500">Student Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <SidebarBtn icon={<LayoutDashboard size={20} />} label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <SidebarBtn icon={<Bookmark size={20} />} label="Saved Internships"
            active={activeTab === "saved"}
            onClick={() => setActiveTab("saved")}
          />
          <SidebarBtn icon={<Briefcase size={20} />} label="Applied Internships"
            active={activeTab === "applied"}
            onClick={() => setActiveTab("applied")}
          />
          <SidebarBtn icon={<User size={20} />} label="Profile"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              router.push("/");
            }}
            className="flex items-center gap-2 w-full py-2.5 px-4 rounded-xl border-2 border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all font-medium text-gray-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* DASHBOARD OVERVIEW */}
        {activeTab === "dashboard" && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard Overview
              </h1>

              <button
                onClick={() => router.push("/internships")}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Browse Internships
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Saved Internships" value="3" />
              <StatCard title="Applied Internships" value="5" />
              <StatCard title="Interviews Scheduled" value="1" />
            </div>
          </>
        )}

        {activeTab === "saved" && (
          <InternshipTable title="Saved Internships" />
        )}

        {activeTab === "applied" && (
          <InternshipTable title="Applied Internships" />
        )}

        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-xl">
            <h2 className="text-xl font-bold mb-6">Profile Info</h2>
            <p><strong>Name:</strong> {user.first_name || user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}

      </main>
    </div>
  );
}

function SidebarBtn({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
        active
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function InternshipTable({ title }: any) {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Internship
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Location
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <p className="font-semibold text-gray-900">
                  Frontend Developer Intern
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Tech Corp</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Remote</span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
