"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, Save, Pencil, X, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/Account");
      return;
    }
    setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        showToast("success", "Profile updated successfully!");
        setEditing(false);
      } else {
        showToast("error", data.message || "Update failed");
      }
    } catch (err) {
      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1a1a2e] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const initials =
    `${user?.first_name?.[0] ?? ""}${user?.last_name?.[0] ?? ""}`.toUpperCase() || "U";

  return (
    <>
      <Navbar />

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all duration-300 ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <CheckCircle size={16} className={toast.type === "success" ? "text-emerald-600" : "text-red-600"} />
          {toast.msg}
        </div>
      )}

      <div className="min-h-screen bg-[#f7f5f2] pt-28 pb-16 px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');`}</style>

        <div className="max-w-xl mx-auto">

          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-[#e8e5e1] shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">

            {/* Card Header Banner */}
            <div className="h-24 bg-gradient-to-br from-[#1a1a2e] to-[#2d2d55] relative">
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #6366f1 0%, transparent 60%), radial-gradient(circle at 80% 20%, #818cf8 0%, transparent 50%)" }}
              />
            </div>

            <div className="px-8 pb-8 mt-10">
              {/* Avatar overlapping banner */}
              <div className="flex items-end justify-between -mt-10 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-[#1a1a2e] border-4 border-white flex items-center justify-center shadow-md">
                  <span className="text-white text-xl font-semibold" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    {initials}
                  </span>
                </div>

                {/* Edit toggle button */}
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#1a1a2e] border border-[#e0ddd9] rounded-[9px] bg-white hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-150"
                  >
                    <Pencil size={14} />
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#666] border border-[#e0ddd9] rounded-[9px] bg-white hover:text-red-500 hover:border-red-300 hover:bg-red-50/40 transition-all duration-150"
                  >
                    <X size={14} />
                    Cancel
                  </button>
                )}
              </div>

              {/* Name & email */}
              <div className="mb-7">
                <h2 className="text-2xl text-[#1a1a2e] font-semibold tracking-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-sm text-[#888] mt-0.5">{user.email}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#f0ede9] mb-7" />

              {/* Fields */}
              <div className="space-y-5">
                <FieldRow
                  icon={<User size={15} className="text-indigo-400" />}
                  label="First Name"
                  name="first_name"
                  value={user.first_name || ""}
                  editing={editing}
                  onChange={handleChange}
                />
                <FieldRow
                  icon={<User size={15} className="text-indigo-400" />}
                  label="Last Name"
                  name="last_name"
                  value={user.last_name || ""}
                  editing={editing}
                  onChange={handleChange}
                />
                <FieldRow
                  icon={<Mail size={15} className="text-indigo-400" />}
                  label="Email"
                  name="email"
                  value={user.email || ""}
                  editing={false}
                  onChange={handleChange}
                  locked
                />
                <FieldRow
                  icon={<Phone size={15} className="text-indigo-400" />}
                  label="Phone"
                  name="phone"
                  value={user.phone || ""}
                  editing={editing}
                  onChange={handleChange}
                />
              </div>

              {/* Save button */}
              {editing && (
                <div className="mt-8">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1a1a2e] text-white text-sm font-semibold rounded-[10px] transition-all duration-150 hover:bg-[#252545] hover:shadow-[0_4px_16px_rgba(26,26,46,0.2)] hover:-translate-y-px active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save size={15} />
                    )}
                    {saving ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Subtle footer note */}
          <p className="text-center text-xs text-[#aaa] mt-5">
            Your information is only used to personalize your experience.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

function FieldRow({
  icon,
  label,
  name,
  value,
  editing,
  onChange,
  locked = false,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  editing: boolean;
  onChange: (e: any) => void;
  locked?: boolean;
}) {
  const isDisabled = !editing || locked;

  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium text-[#888] uppercase tracking-wide mb-1.5">
        {icon}
        {label}
        {locked && (
          <span className="ml-auto text-[10px] font-normal normal-case text-[#bbb] tracking-normal">
            Cannot be changed
          </span>
        )}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        className={`w-full px-4 py-2.5 text-sm text-[#1a1a2e] border rounded-[9px] outline-none transition-all duration-150
          ${isDisabled
            ? "bg-[#faf9f7] border-[#ebe9e5] text-[#999] cursor-default"
            : "bg-white border-[#d5d2ce] focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
          }`}
      />
    </div>
  );
}