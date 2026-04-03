"use client";

import { useState, useMemo } from "react";
import { useEffect } from "react";
import InternshipCard from "@/components/InternshipCard";
import {
  Search,
  SlidersHorizontal,
  X,
  TrendingUp,
  Bookmark,
  MapPin,
  Briefcase,
  DollarSign,
  ExternalLink,
  ArrowRight,
  Plus,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  role: string;
  applyLink: string;
  platform: string;
  description: string;
  stipend: number;
  remote: boolean;
  duration?: string;
  skills?: string[];
  postedDays?: number;
}

const DEFAULT_PLATFORMS = ["Internshala", "Unstop", "Freshersworld"];
const DEFAULT_ROLES = ["Technology", "Marketing", "Finance", "Design"];
const DEFAULT_LOCATIONS = [
  "Remote",
  "Delhi",
  "Bangalore",
  "Mumbai",
  "Pune",
  "Hyderabad",
];
const DEFAULT_STIPEND_RANGES = [
  { label: "Any", min: 0, max: Infinity },
  { label: "₹1000–1500", min: 1000, max: 1500 },
  { label: "₹1500–2000", min: 1500, max: 2000 },
  { label: "₹2000+", min: 2000, max: Infinity },
];

// Role → gradient for card avatars
const ROLE_COLORS: Record<string, string> = {
  Technology: "linear-gradient(135deg,#6366f1,#818cf8)",
  Marketing: "linear-gradient(135deg,#f59e0b,#fbbf24)",
  Finance: "linear-gradient(135deg,#ef4444,#f87171)",
  Design: "linear-gradient(135deg,#a855f7,#c084fc)",
};

export default function AllInternshipsPage() {
  const [search, setSearch] = useState("");
  const [platforms, setPlatforms] = useState<string[]>(DEFAULT_PLATFORMS);
  const [roles, setRoles] = useState<string[]>(DEFAULT_ROLES);
  const [locations, setLocations] = useState<string[]>(DEFAULT_LOCATIONS);
  const [stipendRanges, setStipendRanges] = useState(DEFAULT_STIPEND_RANGES);

  const [selectedPlatform, setSelectedPlatform] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [stipendRange, setStipendRange] = useState(DEFAULT_STIPEND_RANGES[0]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sortBy, setSortBy] = useState<
    "recent" | "stipend-high" | "stipend-low"
  >("recent");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [savedInternships, setSavedInternships] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"all" | "saved">("all");

  const [newLocation, setNewLocation] = useState("");
  const [newPlatform, setNewPlatform] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newStipendMin, setNewStipendMin] = useState("");
  const [newStipendMax, setNewStipendMax] = useState("");
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [showAddPlatform, setShowAddPlatform] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showAddStipend, setShowAddStipend] = useState(false);

  const [internships, setInternships] = useState<Internship[]>([]);
  const [loadingInternships, setLoadingInternships] = useState(true);

  const router = useRouter();

  const handleApplyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const token = localStorage.getItem("token");

    if (!token) {
      e.preventDefault();
      router.push("/Account");
    }
  };

  const toggle = (
    value: string,
    state: string[],
    setState: (v: string[]) => void,
  ) => {
    setState(
      state.includes(value)
        ? state.filter((i) => i !== value)
        : [...state, value],
    );
  };

  const addLocation = () => {
    if (newLocation.trim() && !locations.includes(newLocation.trim())) {
      setLocations([...locations, newLocation.trim()]);
      setNewLocation("");
      setShowAddLocation(false);
    }
  };
  const addPlatform = () => {
    if (newPlatform.trim() && !platforms.includes(newPlatform.trim())) {
      setPlatforms([...platforms, newPlatform.trim()]);
      setNewPlatform("");
      setShowAddPlatform(false);
    }
  };
  const addRole = () => {
    if (newRole.trim() && !roles.includes(newRole.trim())) {
      setRoles([...roles, newRole.trim()]);
      setNewRole("");
      setShowAddRole(false);
    }
  };
  const addStipendRange = () => {
    const min = parseInt(newStipendMin);
    const max = newStipendMax === "" ? Infinity : parseInt(newStipendMax);
    if (
      !isNaN(min) &&
      min >= 0 &&
      (max === Infinity || (!isNaN(max) && max > min))
    ) {
      const label = max === Infinity ? `₹${min}+` : `₹${min}–${max}`;
      if (!stipendRanges.some((r) => r.label === label)) {
        setStipendRanges([...stipendRanges, { label, min, max }]);
        setNewStipendMin("");
        setNewStipendMax("");
        setShowAddStipend(false);
      }
    }
  };

  const removeCustom = (
    type: "location" | "platform" | "role",
    value: string,
  ) => {
    if (type === "location") {
      setLocations(locations.filter((l) => l !== value));
      setSelectedLocation(selectedLocation.filter((l) => l !== value));
    }
    if (type === "platform") {
      setPlatforms(platforms.filter((p) => p !== value));
      setSelectedPlatform(selectedPlatform.filter((p) => p !== value));
    }
    if (type === "role") {
      setRoles(roles.filter((r) => r !== value));
      setSelectedRole(selectedRole.filter((r) => r !== value));
    }
  };

  const removeStipend = (label: string) => {
    if (label !== "Any") {
      setStipendRanges(stipendRanges.filter((s) => s.label !== label));
      if (stipendRange.label === label)
        setStipendRange(DEFAULT_STIPEND_RANGES[0]);
    }
  };

  const toggleSave = (id: string) =>
    setSavedInternships((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const clearAll = () => {
    setSelectedPlatform([]);
    setSelectedRole([]);
    setSelectedLocation([]);
    setStipendRange(DEFAULT_STIPEND_RANGES[0]);
    setRemoteOnly(false);
    setSearch("");
  };

  const activeCount =
    selectedPlatform.length +
    selectedRole.length +
    selectedLocation.length +
    (stipendRange.label !== "Any" ? 1 : 0) +
    (remoteOnly ? 1 : 0);

  const results = useMemo(() => {
    let list = internships.filter((i) => {
      const q = search.toLowerCase();
      return (
        (i.title.toLowerCase().includes(q) ||
          i.company.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)) &&
        (selectedPlatform.length === 0 ||
          selectedPlatform.includes(i.platform)) &&
        (selectedRole.length === 0 || selectedRole.includes(i.role)) &&
        (selectedLocation.length === 0 ||
          selectedLocation.includes(i.location)) &&
        i.stipend >= stipendRange.min &&
        i.stipend <= stipendRange.max &&
        (!remoteOnly || i.remote) &&
        (viewMode === "all" || savedInternships.includes(i.id))
      );
    });
    if (sortBy === "recent")
      list.sort((a, b) => (a.postedDays || 0) - (b.postedDays || 0));
    if (sortBy === "stipend-high") list.sort((a, b) => b.stipend - a.stipend);
    if (sortBy === "stipend-low") list.sort((a, b) => a.stipend - b.stipend);
    return list;
  }, [
    internships,
    search,
    selectedPlatform,
    selectedRole,
    selectedLocation,
    stipendRange,
    remoteOnly,
    sortBy,
    viewMode,
    savedInternships,
  ]);

  // ── Inline card (replaces InternshipCard for this page) ──────────────────────
  const InternCard = ({
    intern,
    index,
  }: {
    intern: Internship;
    index: number;
  }) => {
    const isSaved = savedInternships.includes(intern.id);
    const gradient =
      ROLE_COLORS[intern.role] ?? "linear-gradient(135deg,#6366f1,#a855f7)";
    return (
      <div className="iv-icard">
        <div className="iv-icard-top">
          <div className="iv-icard-avatar" style={{ background: gradient }}>
            {intern.company.slice(0, 2).toUpperCase()}
          </div>
          <div className="iv-icard-info">
            <span className="iv-icard-company">{intern.company}</span>
            <span className="iv-icard-platform">{intern.platform}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {intern.postedDays !== undefined && intern.postedDays <= 2 && (
              <span className="iv-tag iv-tag-new">New</span>
            )}
            <button
              className={`iv-save-btn${isSaved ? " saved" : ""}`}
              onClick={() => toggleSave(intern.id)}
              aria-label={isSaved ? "Unsave" : "Save"}
            >
              <Bookmark size={15} />
            </button>
          </div>
        </div>

        <h3 className="iv-icard-title">{intern.title}</h3>
        <p className="iv-icard-desc">{intern.description}</p>

        {intern.skills && (
          <div className="iv-skills">
            {intern.skills.map((s) => (
              <span key={s} className="iv-skill">
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="iv-icard-meta">
          <span className="iv-meta-item">
            <MapPin size={12} />
            {intern.location}
          </span>
          {intern.duration && (
            <span className="iv-meta-item">
              <Briefcase size={12} />
              {intern.duration}
            </span>
          )}
          <span className="iv-meta-item iv-stipend">
            <DollarSign size={12} />₹{intern.stipend.toLocaleString()}/mo
          </span>
        </div>

        <div className="iv-icard-footer">
          <a
            href={intern.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="iv-btn-apply"
            onClick={handleApplyClick}
          >
            Apply Now <ExternalLink size={13} />
          </a>

          <button
            className="iv-btn-apply"
            onClick={() => router.push(`/internships/${intern.id}`)}
          >
            View Details <ArrowRight size={13} />
          </button>
        </div>
      </div>
    );
  };

  const parseStipend = (stipendStr: string) => {
    if (!stipendStr || stipendStr.toLowerCase().includes("not")) return 0;

    // extract all numbers
    const nums = stipendStr.match(/\d[\d,]*/g);

    if (!nums || nums.length === 0) return 0;

    // take the first number → MIN stipend
    const min = parseInt(nums[0].replace(/,/g, ""), 10);

    return min || 0;
  };

  // ── Filter panel ─────────────────────────────────────────────────────────────
  const FilterPanel = () => (
    <div className="fp-root">
      {activeCount > 0 && (
        <button className="fp-clear" onClick={clearAll}>
          <X size={14} /> Clear all ({activeCount})
        </button>
      )}

      {/* Remote toggle */}
      <div className="fp-remote" onClick={() => setRemoteOnly(!remoteOnly)}>
        <div className={`fp-checkbox${remoteOnly ? " checked" : ""}`}>
          {remoteOnly && <CheckCircle size={14} color="#fff" />}
        </div>
        <MapPin size={14} color="#6366f1" />
        <span>Remote only</span>
      </div>

      <FPSection title="Stipend" icon={<DollarSign size={14} />}>
        {stipendRanges.map((r) => (
          <div key={r.label} className="fp-radio-row">
            <label className="fp-radio-label">
              <input
                type="radio"
                name="stipend"
                checked={stipendRange.label === r.label}
                onChange={() => setStipendRange(r)}
              />
              {r.label}
            </label>
            {r.label !== "Any" &&
              !DEFAULT_STIPEND_RANGES.some((d) => d.label === r.label) && (
                <button
                  className="fp-remove"
                  onClick={() => removeStipend(r.label)}
                >
                  <X size={12} />
                </button>
              )}
          </div>
        ))}
        {!showAddStipend ? (
          <button
            className="fp-add-btn"
            onClick={() => setShowAddStipend(true)}
          >
            <Plus size={13} /> Custom range
          </button>
        ) : (
          <div className="fp-add-form">
            <input
              className="fp-input"
              type="number"
              placeholder="Min (e.g. 2500)"
              value={newStipendMin}
              onChange={(e) => setNewStipendMin(e.target.value)}
            />
            <input
              className="fp-input"
              type="number"
              placeholder="Max (blank = no limit)"
              value={newStipendMax}
              onChange={(e) => setNewStipendMax(e.target.value)}
            />
            <div className="fp-add-actions">
              <button className="fp-btn-save" onClick={addStipendRange}>
                Add
              </button>
              <button
                className="fp-btn-cancel"
                onClick={() => {
                  setShowAddStipend(false);
                  setNewStipendMin("");
                  setNewStipendMax("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </FPSection>

      <FPSection title="Platforms">
        {platforms.map((p) => (
          <div key={p} className="fp-check-row">
            <label className="fp-check-label">
              <input
                type="checkbox"
                checked={selectedPlatform.includes(p)}
                onChange={() =>
                  toggle(p, selectedPlatform, setSelectedPlatform)
                }
              />
              {p}
            </label>
            {!DEFAULT_PLATFORMS.includes(p) && (
              <button
                className="fp-remove"
                onClick={() => removeCustom("platform", p)}
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
        {!showAddPlatform ? (
          <button
            className="fp-add-btn"
            onClick={() => setShowAddPlatform(true)}
          >
            <Plus size={13} /> Add platform
          </button>
        ) : (
          <div className="fp-add-form">
            <input
              className="fp-input"
              placeholder="Platform name"
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPlatform()}
              autoFocus
            />
            <div className="fp-add-actions">
              <button className="fp-btn-save" onClick={addPlatform}>
                Add
              </button>
              <button
                className="fp-btn-cancel"
                onClick={() => {
                  setShowAddPlatform(false);
                  setNewPlatform("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </FPSection>

      {/* <FPSection title="Roles" icon={<Briefcase size={14} />}>
        {roles.map((r) => (
          <div key={r} className="fp-check-row">
            <label className="fp-check-label">
              <input
                type="checkbox"
                checked={selectedRole.includes(r)}
                onChange={() => toggle(r, selectedRole, setSelectedRole)}
              />
              {r}
            </label>
            {!DEFAULT_ROLES.includes(r) && (
              <button
                className="fp-remove"
                onClick={() => removeCustom("role", r)}
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
        {!showAddRole ? (
          <button className="fp-add-btn" onClick={() => setShowAddRole(true)}>
            <Plus size={13} /> Add role
          </button>
        ) : (
          <div className="fp-add-form">
            <input
              className="fp-input"
              placeholder="Role name"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addRole()}
              autoFocus
            />
            <div className="fp-add-actions">
              <button className="fp-btn-save" onClick={addRole}>
                Add
              </button>
              <button
                className="fp-btn-cancel"
                onClick={() => {
                  setShowAddRole(false);
                  setNewRole("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </FPSection> */}

      {/* <FPSection title="Location" icon={<MapPin size={14} />}>
        {locations.map((l) => (
          <div key={l} className="fp-check-row">
            <label className="fp-check-label">
              <input
                type="checkbox"
                checked={selectedLocation.includes(l)}
                onChange={() =>
                  toggle(l, selectedLocation, setSelectedLocation)
                }
              />
              {l}
            </label>
            {!DEFAULT_LOCATIONS.includes(l) && (
              <button
                className="fp-remove"
                onClick={() => removeCustom("location", l)}
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
        {!showAddLocation ? (
          <button
            className="fp-add-btn"
            onClick={() => setShowAddLocation(true)}
          >
            <Plus size={13} /> Add location
          </button>
        ) : (
          <div className="fp-add-form">
            <input
              className="fp-input"
              placeholder="City name"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addLocation()}
              autoFocus
            />
            <div className="fp-add-actions">
              <button className="fp-btn-save" onClick={addLocation}>
                Add
              </button>
              <button
                className="fp-btn-cancel"
                onClick={() => {
                  setShowAddLocation(false);
                  setNewLocation("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </FPSection> */}
    </div>
  );

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/internships`,
        );
        const data = await res.json();
        // console.log(data.data);
        if (res.ok) {
          const mapped = data.data.map((i: any) => ({
            id: i._id,
            title: i.title,
            company: i.company,
            location: i.location || "Not Mentioned",
            role: "General",
            applyLink: i.applyLink,
            platform: i.platform || "Unknown",
            description:
              i.description?.slice(0, 150) || "No description available.",

            // stipend: parseInt(i.stipend.replace(/[^0-9]/g, "")) || 0,
            stipend: parseStipend(i.stipend),

            remote:
              i.location?.toLowerCase().includes("home") ||
              i.location?.toLowerCase().includes("remote"),

            duration: i.duration || "Not specified",
            skills: i.skills || [],

            // postedAt → convert to postedDays
            postedDays: (() => {
              if (!i.postedAt) return 7;
              const days =
                (Date.now() - new Date(i.postedAt).getTime()) /
                (1000 * 60 * 60 * 24);
              return Math.floor(days);
            })(),
          }));

          setInternships(mapped);
        } else {
          console.error("Failed:", data);
        }
      } catch (err) {
        console.error("Error fetching internships:", err);
      } finally {
        setLoadingInternships(false);
      }
    };

    fetchInternships();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .ai-root {
          font-family: 'DM Sans', sans-serif;
          background: #f7f5f2;
          min-height: 100vh;
        }

        /* ── Hero ── */
        .ai-hero {
          background: #1a1a2e;
          padding: 108px 0 52px;
          position: relative;
          overflow: hidden;
        }

        .ai-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .ai-hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        .ai-hero-blob-1 { width: 520px; height: 520px; background: rgba(99,102,241,0.18); top: -180px; right: -100px; }
        .ai-hero-blob-2 { width: 360px; height: 360px; background: rgba(168,85,247,0.12); bottom: -80px; left: -60px; }

        .ai-hero-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
        }

        .ai-hero-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(34px, 4.5vw, 52px);
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.5px;
          margin: 0 0 20px;
          text-align: center;
        }

        .ai-hero-heading em { font-style: italic; color: #a5b4fc; }

        /* Search bar */
        .ai-search-wrap {
          max-width: 620px;
          margin: 0 auto;
        }

        .ai-search-inner {
          display: flex;
          align-items: center;
          background: #fff;
          border: 2px solid #e5e3df;
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .ai-search-inner:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99,102,241,0.15);
        }

        .ai-search-icon {
          padding: 0 16px;
          color: #bbb;
          display: flex; align-items: center; flex-shrink: 0;
          transition: color 0.15s;
        }

        .ai-search-inner:focus-within .ai-search-icon { color: #6366f1; }

        .ai-search-input {
          flex: 1;
          padding: 15px 0;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #1a1a2e;
          background: transparent;
        }

        .ai-search-input::placeholder { color: #c0bcb6; }

        /* ── Body layout ── */
        .ai-body {
          max-width: 1280px;
          margin: 0 auto;
          padding: 32px 48px 80px;
          display: grid;
          grid-template-columns: 288px 1fr;
          gap: 28px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .ai-body { grid-template-columns: 1fr; }
          .ai-sidebar { display: none; }
          .ai-hero-inner { padding: 0 24px; }
          .ai-body { padding: 24px 20px 60px; }
        }

        /* ── Sidebar ── */
        .ai-sidebar {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 18px;
          padding: 22px;
          position: sticky;
          top: 88px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }

        .ai-sidebar-title {
          display: flex;
          align-items: center;
          gap: 9px;
          font-family: 'DM Serif Display', serif;
          font-size: 18px;
          color: #1a1a2e;
          margin-bottom: 20px;
        }

        /* ── Filter panel ── */
        .fp-root { display: flex; flex-direction: column; gap: 4px; }

        .fp-clear {
          display: flex;
          align-items: center;
          gap: 7px;
          width: 100%;
          padding: 9px 14px;
          background: rgba(99,102,241,0.06);
          border: 1.5px solid rgba(99,102,241,0.2);
          border-radius: 9px;
          font-size: 13px;
          font-weight: 600;
          color: #6366f1;
          cursor: pointer;
          margin-bottom: 8px;
          transition: background 0.15s;
        }

        .fp-clear:hover { background: rgba(99,102,241,0.1); }

        .fp-remote {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 11px 13px;
          background: rgba(99,102,241,0.05);
          border: 1.5px solid rgba(99,102,241,0.14);
          border-radius: 10px;
          cursor: pointer;
          font-size: 13.5px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 4px;
          transition: background 0.15s;
          user-select: none;
        }

        .fp-remote:hover { background: rgba(99,102,241,0.09); }

        .fp-checkbox {
          width: 18px; height: 18px;
          border-radius: 5px;
          border: 2px solid #d0cec9;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.15s, background 0.15s;
          flex-shrink: 0;
        }

        .fp-checkbox.checked {
          border-color: #6366f1;
          background: #6366f1;
        }

        /* Filter section */
        .fps-wrap { margin-top: 6px; }

        .fps-title {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #aaa;
          margin: 14px 0 8px;
        }

        .fp-radio-row, .fp-check-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 2px;
        }

        .fp-radio-label, .fp-check-label {
          display: flex;
          align-items: center;
          gap: 9px;
          flex: 1;
          padding: 7px 10px;
          border-radius: 8px;
          font-size: 13.5px;
          color: #555;
          cursor: pointer;
          transition: background 0.12s, color 0.12s;
        }

        .fp-radio-label:hover, .fp-check-label:hover {
          background: #f7f5f2;
          color: #1a1a2e;
        }

        .fp-radio-label input, .fp-check-label input {
          accent-color: #6366f1;
          flex-shrink: 0;
        }

        .fp-remove {
          width: 24px; height: 24px;
          border: none;
          background: transparent;
          color: #ccc;
          display: flex; align-items: center; justify-content: center;
          border-radius: 6px;
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
          flex-shrink: 0;
        }

        .fp-remove:hover { color: #ef4444; background: rgba(239,68,68,0.07); }

        .fp-add-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 100%;
          padding: 8px 10px;
          margin-top: 6px;
          border: 1.5px dashed #d5d0c9;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 500;
          color: #999;
          background: transparent;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }

        .fp-add-btn:hover { border-color: #6366f1; color: #6366f1; }

        .fp-add-form {
          background: #f7f5f2;
          border: 1.5px solid #e5e3df;
          border-radius: 10px;
          padding: 12px;
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .fp-input {
          width: 100%;
          padding: 8px 11px;
          border: 1.5px solid #e5e3df;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #1a1a2e;
          outline: none;
          background: #fff;
          transition: border-color 0.15s;
        }

        .fp-input:focus { border-color: #6366f1; }

        .fp-add-actions { display: flex; gap: 8px; }

        .fp-btn-save {
          flex: 1; padding: 7px;
          background: #1a1a2e; color: #fff;
          border: none; border-radius: 7px;
          font-size: 13px; font-weight: 600; cursor: pointer;
          transition: background 0.15s;
        }

        .fp-btn-save:hover { background: #252545; }

        .fp-btn-cancel {
          flex: 1; padding: 7px;
          background: #e8e5e1; color: #555;
          border: none; border-radius: 7px;
          font-size: 13px; font-weight: 500; cursor: pointer;
          transition: background 0.15s;
        }

        .fp-btn-cancel:hover { background: #ddd8d1; }

        /* ── Main content ── */
        .ai-main {}

        /* Toolbar */
        .ai-toolbar {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 16px;
          padding: 16px 20px;
          margin-bottom: 20px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .ai-view-tabs {
          display: flex;
          background: #f7f5f2;
          border-radius: 10px;
          padding: 3px;
          gap: 3px;
        }

        .ai-tab {
          padding: 7px 16px;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          background: transparent;
          color: #888;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background 0.15s, color 0.15s, box-shadow 0.15s;
        }

        .ai-tab.active {
          background: #fff;
          color: #1a1a2e;
          font-weight: 600;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }

        .ai-tab-badge {
          background: #6366f1;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 999px;
          min-width: 18px;
          text-align: center;
        }

        .ai-toolbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ai-mobile-filter-btn {
          display: none;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          background: #f7f5f2;
          border: 1.5px solid #e8e5e1;
          border-radius: 9px;
          font-size: 13.5px;
          font-weight: 500;
          color: #555;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }

        @media (max-width: 1024px) {
          .ai-mobile-filter-btn { display: flex; }
        }

        .ai-mobile-filter-btn:hover { border-color: #6366f1; color: #6366f1; }

        .ai-sort-select {
          padding: 8px 14px;
          background: #f7f5f2;
          border: 1.5px solid #e8e5e1;
          border-radius: 9px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #555;
          cursor: pointer;
          outline: none;
          transition: border-color 0.15s;
        }

        .ai-sort-select:focus { border-color: #6366f1; }

        .ai-results-count {
          border-top: 1px solid #f0ede9;
          margin-top: 12px;
          padding-top: 12px;
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13.5px;
          color: #888;
          width: 100%;
        }

        .ai-results-count strong { color: #1a1a2e; }

        /* Grid */
        .ai-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 840px) {
          .ai-grid { grid-template-columns: 1fr; }
        }

        /* Empty state */
        .ai-empty {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 18px;
          padding: 72px 32px;
          text-align: center;
        }

        .ai-empty-icon {
          width: 64px; height: 64px;
          background: #f7f5f2;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
        }

        .ai-empty h3 {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #1a1a2e;
          margin: 0 0 8px;
        }

        .ai-empty p { font-size: 14px; color: #aaa; margin: 0 0 20px; }

        .ai-empty-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 22px;
          background: #1a1a2e;
          color: #fff;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background 0.15s;
        }

        .ai-empty-btn:hover { background: #252545; }

        /* ── Internship card ── */
        .iv-icard {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: default;
        }

        .iv-icard:hover {
          border-color: #c7d2fe;
          box-shadow: 0 6px 24px rgba(99,102,241,0.09);
          transform: translateY(-2px);
        }

        .iv-icard-top {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .iv-icard-avatar {
          width: 38px; height: 38px;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Serif Display', serif;
          font-size: 13px;
          color: #fff;
          flex-shrink: 0;
        }

        .iv-icard-info { flex: 1; min-width: 0; }

        .iv-icard-company {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #1a1a2e;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .iv-icard-platform { font-size: 11.5px; color: #aaa; }

        .iv-tag {
          font-size: 11px;
          font-weight: 700;
          padding: 2px 9px;
          border-radius: 999px;
        }

        .iv-tag-new { background: #ecfdf5; color: #059669; }

        .iv-save-btn {
          width: 32px; height: 32px;
          border: 1.5px solid #e8e5e1;
          border-radius: 8px;
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #bbb;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
          flex-shrink: 0;
        }

        .iv-save-btn:hover { border-color: #6366f1; color: #6366f1; }
        .iv-save-btn.saved { border-color: #6366f1; color: #6366f1; background: rgba(99,102,241,0.07); }

        .iv-icard-title {
          font-family: 'DM Serif Display', serif;
          font-size: 17px;
          color: #1a1a2e;
          margin: 0;
          letter-spacing: -0.2px;
          line-height: 1.25;
        }

        .iv-icard-desc {
          font-size: 13px;
          color: #888;
          line-height: 1.65;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .iv-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .iv-skill {
          font-size: 11.5px;
          font-weight: 500;
          color: #6366f1;
          background: rgba(99,102,241,0.07);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 999px;
          padding: 2px 10px;
        }

        .iv-icard-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .iv-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: #999;
        }

        .iv-stipend {
          color: #059669;
          font-weight: 600;
          background: #ecfdf5;
          border-radius: 999px;
          padding: 2px 9px 2px 6px;
        }

        .iv-icard-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 4px;
          border-top: 1px solid #f0ede9;
        }

        .iv-btn-apply {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
          justify-content: center;
          padding: 9px 14px;
          background: #1a1a2e;
          color: #fff;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.15s, box-shadow 0.15s;
        }

        .iv-btn-apply:hover { background: #252545; box-shadow: 0 4px 12px rgba(26,26,46,0.18); }

        .iv-btn-platform {
          font-size: 12px;
          font-weight: 500;
          color: #aaa;
          white-space: nowrap;
        }

        /* Mobile filter drawer */
        .ai-drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 100;
          backdrop-filter: blur(2px);
        }

        .ai-drawer {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 100%;
          max-width: 340px;
          background: #fff;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .ai-drawer-header {
          position: sticky;
          top: 0;
          background: #fff;
          border-bottom: 1.5px solid #e8e5e1;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 1;
        }

        .ai-drawer-header-title {
          font-family: 'DM Serif Display', serif;
          font-size: 19px;
          color: #1a1a2e;
        }

        .ai-drawer-close {
          width: 34px; height: 34px;
          border: 1.5px solid #e5e3df;
          border-radius: 8px;
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #555;
          transition: border-color 0.15s, color 0.15s;
        }

        .ai-drawer-close:hover { border-color: #6366f1; color: #6366f1; }

        .ai-drawer-body { padding: 20px; }
      `}</style>
      <Navbar />
      <div className="ai-root">
        {/* Hero */}
        <div className="ai-hero">
          <div className="ai-hero-blob ai-hero-blob-1" />
          <div className="ai-hero-blob ai-hero-blob-2" />
          <div className="ai-hero-inner">
            <h1 className="ai-hero-heading">
              Discover your <em>dream internship.</em>
            </h1>
            <div className="ai-search-wrap">
              <div className="ai-search-inner">
                <span className="ai-search-icon">
                  <Search size={18} />
                </span>
                <input
                  className="ai-search-input"
                  type="text"
                  placeholder="Search by role, company, or skill…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search internships"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="ai-body">
          {/* Sidebar */}
          <aside className="ai-sidebar">
            <div className="ai-sidebar-title">
              <SlidersHorizontal size={18} color="#6366f1" />
              Filters
            </div>
            <FilterPanel />
          </aside>

          {/* Main */}
          <main className="ai-main">
            {/* Toolbar */}
            <div className="ai-toolbar">
              <div className="ai-view-tabs">
                <button
                  className={`ai-tab${viewMode === "all" ? " active" : ""}`}
                  onClick={() => setViewMode("all")}
                >
                  All Internships
                </button>
                <button
                  className={`ai-tab${viewMode === "saved" ? " active" : ""}`}
                  onClick={() => setViewMode("saved")}
                >
                  <Bookmark size={14} />
                  Saved
                  {savedInternships.length > 0 && (
                    <span className="ai-tab-badge">
                      {savedInternships.length}
                    </span>
                  )}
                </button>
              </div>

              <div className="ai-toolbar-right">
                <button
                  className="ai-mobile-filter-btn"
                  onClick={() => setShowMobileFilters(true)}
                >
                  <SlidersHorizontal size={14} />
                  Filters
                  {activeCount > 0 && (
                    <span className="ai-tab-badge">{activeCount}</span>
                  )}
                </button>
                <select
                  className="ai-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="recent">Most Recent</option>
                  <option value="stipend-high">Highest Stipend</option>
                  <option value="stipend-low">Lowest Stipend</option>
                </select>
              </div>

              <div className="ai-results-count">
                <TrendingUp size={15} color="#6366f1" />
                <strong>{results.length}</strong>
                {viewMode === "saved"
                  ? " saved internships"
                  : " internships found"}
              </div>
            </div>

            {/* Grid or empty */}
            {results.length === 0 ? (
              <div className="ai-empty">
                <div className="ai-empty-icon">
                  <Search size={28} color="#ccc" />
                </div>
                <h3>No internships found</h3>
                <p>
                  {viewMode === "saved"
                    ? "You haven't saved any internships yet. Browse and bookmark your favourites!"
                    : "Try adjusting your filters or search terms."}
                </p>
                {activeCount > 0 && viewMode !== "saved" && (
                  <button className="ai-empty-btn" onClick={clearAll}>
                    <X size={15} /> Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="ai-grid">
                {results.map((intern, i) => (
                  <InternCard key={intern.id} intern={intern} index={i} />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Mobile filter drawer */}
        {showMobileFilters && (
          <div
            className="ai-drawer-overlay"
            onClick={() => setShowMobileFilters(false)}
          >
            <div className="ai-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="ai-drawer-header">
                <span className="ai-drawer-header-title">Filters</span>
                <button
                  className="ai-drawer-close"
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X size={17} />
                </button>
              </div>
              <div className="ai-drawer-body">
                <FilterPanel />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

// Small helper component for filter sections
function FPSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="fps-wrap">
      <div className="fps-title">
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}
