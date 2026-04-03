"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Briefcase, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  UserCheck,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

// Mock Data
const mockInternships = [
  { id: 1, title: "Full Stack Developer Intern", company: "Tech Corp", location: "San Francisco, CA", status: "Active", applicants: 45, salary: "$2000/mo", posted: "2 days ago", type: "Remote" },
  { id: 2, title: "UI/UX Design Intern", company: "Creative Studios", location: "New York, NY", status: "Active", applicants: 32, salary: "$1800/mo", posted: "5 days ago", type: "Hybrid" },
  { id: 3, title: "Data Science Intern", company: "Analytics Inc", location: "Austin, TX", status: "Pending", applicants: 28, salary: "$2200/mo", posted: "1 week ago", type: "On-site" },
  { id: 4, title: "Marketing Intern", company: "Brand Agency", location: "Los Angeles, CA", status: "Active", applicants: 56, salary: "$1500/mo", posted: "3 days ago", type: "Remote" },
  { id: 5, title: "Backend Developer Intern", company: "CloudTech", location: "Seattle, WA", status: "Closed", applicants: 67, salary: "$2100/mo", posted: "2 weeks ago", type: "Remote" },
  { id: 6, title: "Product Management Intern", company: "StartupXYZ", location: "Boston, MA", status: "Pending", applicants: 19, salary: "$1900/mo", posted: "4 days ago", type: "Hybrid" },
];

const mockUsers = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", role: "Student", joined: "Jan 15, 2024", applications: 5, status: "Active" },
  { id: 2, name: "Michael Chen", email: "m.chen@email.com", role: "Student", joined: "Jan 18, 2024", applications: 8, status: "Active" },
  { id: 3, name: "Emily Rodriguez", email: "emily.r@email.com", role: "Recruiter", joined: "Dec 10, 2023", applications: 0, status: "Active" },
  { id: 4, name: "James Wilson", email: "j.wilson@email.com", role: "Student", joined: "Jan 22, 2024", applications: 3, status: "Inactive" },
  { id: 5, name: "Priya Sharma", email: "priya.s@email.com", role: "Student", joined: "Jan 20, 2024", applications: 12, status: "Active" },
];

const recentActivity = [
  { id: 1, user: "Sarah Johnson", action: "applied to", target: "Full Stack Developer Intern", time: "5 min ago", type: "application" },
  { id: 2, user: "Tech Corp", action: "posted", target: "Backend Developer Intern", time: "2 hours ago", type: "post" },
  { id: 3, user: "Michael Chen", action: "was accepted for", target: "UI/UX Design Intern", time: "3 hours ago", type: "acceptance" },
  { id: 4, user: "Emily Rodriguez", action: "updated", target: "Marketing Intern", time: "5 hours ago", type: "update" },
  { id: 5, user: "Admin", action: "approved", target: "Data Science Intern", time: "1 day ago", type: "approval" },
];

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      router.push("/Account");
      return;
    }

    const parsed = JSON.parse(stored);

    if (parsed.type !== "admin") {
      router.push("/");
      return;
    }

    setUser(parsed);
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl border-r border-gray-200 flex flex-col">
        
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">intellivibes</h2>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
              activeTab === "dashboard"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("post")}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
              activeTab === "post"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <PlusCircle size={20} />
            <span className="font-medium">Post Internship</span>
          </button>

          <button
            onClick={() => setActiveTab("manage")}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
              activeTab === "manage"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Briefcase size={20} />
            <span className="font-medium">Manage Internships</span>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
              activeTab === "users"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users size={20} />
            <span className="font-medium">Users</span>
          </button>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-xl">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          
          <button
            onClick={() => {
              localStorage.removeItem("mockUser");
              router.push("/");
            }}
            className="w-full py-2.5 rounded-xl border-2 border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all font-medium text-gray-700"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="p-8">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
              {/* <p className="text-gray-600">Welcome back! Here's what's happening with intellivibes today.</p> */}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              
              {/* Total Internships */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="flex items-center text-green-600 text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    12%
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">Total Internships</h3>
                <p className="text-3xl font-bold text-gray-900">125</p>
                <p className="text-xs text-gray-500 mt-2">+15 this month</p>
              </div>

              {/* Active Postings */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="flex items-center text-green-600 text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    8%
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">Active Postings</h3>
                <p className="text-3xl font-bold text-gray-900">89</p>
                <p className="text-xs text-gray-500 mt-2">71% of total</p>
              </div>

              {/* Pending Approvals */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="flex items-center text-red-600 text-sm font-medium">
                    <ArrowDownRight className="w-4 h-4" />
                    3%
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">Pending Approvals</h3>
                <p className="text-3xl font-bold text-gray-900">8</p>
                <p className="text-xs text-gray-500 mt-2">Needs attention</p>
              </div>

              {/* Total Users */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="flex items-center text-green-600 text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    24%
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">Total Users</h3>
                <p className="text-3xl font-bold text-gray-900">342</p>
                <p className="text-xs text-gray-500 mt-2">+67 this month</p>
              </div>
            </div>

            {/* Charts and Activity */}
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                  <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
                </div>
                
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'application' ? 'bg-blue-100' :
                        activity.type === 'post' ? 'bg-green-100' :
                        activity.type === 'acceptance' ? 'bg-purple-100' :
                        activity.type === 'update' ? 'bg-orange-100' :
                        'bg-gray-100'
                      }`}>
                        {activity.type === 'application' && <UserCheck className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'post' && <PlusCircle className="w-5 h-5 text-green-600" />}
                        {activity.type === 'acceptance' && <CheckCircle className="w-5 h-5 text-purple-600" />}
                        {activity.type === 'update' && <Edit className="w-5 h-5 text-orange-600" />}
                        {activity.type === 'approval' && <CheckCircle className="w-5 h-5 text-gray-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-semibold">{activity.user}</span>
                          {' '}{activity.action}{' '}
                          <span className="font-semibold">{activity.target}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                
                {/* Application Stats */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium opacity-90">Total Applications</h3>
                    <TrendingUp className="w-5 h-5 opacity-80" />
                  </div>
                  <p className="text-4xl font-bold mb-2">1,247</p>
                  <p className="text-sm opacity-80">+189 this week</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex justify-between text-sm">
                      <span className="opacity-80">Acceptance Rate</span>
                      <span className="font-semibold">23%</span>
                    </div>
                  </div>
                </div>

                {/* Top Companies */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-4">Top Companies</h3>
                  <div className="space-y-3">
                    {['Tech Corp', 'Creative Studios', 'CloudTech'].map((company, idx) => (
                      <div key={company} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{company}</p>
                        </div>
                        <Building2 className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post Internship Tab */}
        {activeTab === "post" && (
          <div className="p-8">
            <div className="max-w-3xl">
              
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Post New Internship</h1>
                <p className="text-gray-600">Fill in the details to create a new internship posting.</p>
              </div>

              {/* Form */}
              <form className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Internship Title *</label>
                    <input
                      type="text"
                      placeholder="e.g., Frontend Developer Intern"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                    <input
                      type="text"
                      placeholder="e.g., Tech Corp"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                    <input
                      type="text"
                      placeholder="e.g., San Francisco, CA"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Work Type *</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all">
                      <option>Remote</option>
                      <option>Hybrid</option>
                      <option>On-site</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Salary Range *</label>
                    <input
                      type="text"
                      placeholder="e.g., $2000/month"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Duration *</label>
                    <input
                      type="text"
                      placeholder="e.g., 3 months"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea
                    placeholder="Describe the internship role, responsibilities, and requirements..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all resize-none"
                    rows={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements</label>
                  <textarea
                    placeholder="List the required skills and qualifications..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all resize-none"
                    rows={4}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Post Internship
                  </button>
                  <button
                    type="button"
                    className="px-8 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Save as Draft
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Manage Internships Tab */}
        {activeTab === "manage" && (
          <div className="p-8">
            
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Internships</h1>
              <p className="text-gray-600">View and manage all internship postings.</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[300px] relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search internships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                  />
                </div>
                <button className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 font-medium text-gray-700">
                  <Filter className="w-5 h-5" />
                  Filter
                </button>
              </div>
            </div>

            {/* Internships Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Internship</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applicants</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Posted</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockInternships.map((internship) => (
                      <tr key={internship.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">{internship.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Building2 className="w-3.5 h-3.5 text-gray-400" />
                              <p className="text-sm text-gray-600">{internship.company}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{internship.location}</span>
                          </div>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                            {internship.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            internship.status === 'Active' ? 'bg-green-100 text-green-700' :
                            internship.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {internship.status === 'Active' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {internship.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                            {internship.status === 'Closed' && <XCircle className="w-3 h-3 mr-1" />}
                            {internship.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold text-gray-900">{internship.applicants}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{internship.posted}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                              <Edit className="w-4 h-4 text-blue-600" />
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="p-8">
            
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
              <p className="text-gray-600">Manage all registered users on the platform.</p>
            </div>

            {/* User Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">342</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">289</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">New This Month</p>
                    <p className="text-2xl font-bold text-gray-900">67</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applications</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {user.name[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'Student' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">{user.joined}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">{user.applications}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {user.status === 'Active' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Profile">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="More Options">
                              <MoreVertical className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}