"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  MapPin, Briefcase, DollarSign, ExternalLink, ArrowLeft,
  Clock, Bookmark, Share2, CheckCircle, Building2, Globe,
} from "lucide-react";

const ROLE_COLORS: Record<string, string> = {
  Technology: "linear-gradient(135deg,#6366f1,#818cf8)",
  Marketing:  "linear-gradient(135deg,#f59e0b,#fbbf24)",
  Finance:    "linear-gradient(135deg,#ef4444,#f87171)",
  Design:     "linear-gradient(135deg,#a855f7,#c084fc)",
  Default:    "linear-gradient(135deg,#6366f1,#a855f7)",
};

export default function InternshipDetails() {
  const { id } = useParams();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [intern, setIntern]   = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved]     = useState(false);
  const [copied, setCopied]   = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res  = await fetch(`${API_URL}/internships/${id}`);
        const json = await res.json();
        setIntern(json.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const gradient = ROLE_COLORS[intern?.role] ?? ROLE_COLORS.Default;

  const perks = [
    "Flexible working hours",
    "Certificate of completion",
    "Mentorship from senior professionals",
    "Letter of recommendation on request",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .id-root { font-family: 'DM Sans', sans-serif; background: #f7f5f2; min-height: 100vh; }

        .id-loading {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 14px;
          background: #f7f5f2;
        }
        .id-spinner {
          width: 40px; height: 40px; border-radius: 50%;
          border: 3px solid #e8e5e1; border-top-color: #6366f1;
          animation: spin 0.75s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .id-loading p { font-size: 14px; color: #aaa; margin: 0; }

        .id-page {
          max-width: 1280px; margin: 0 auto;
          padding: 36px 48px 96px;
          display: grid; grid-template-columns: 1fr 320px;
          gap: 28px; align-items: start;
        }
        @media (max-width: 1024px) {
          .id-page { grid-template-columns: 1fr; padding: 24px 20px 72px; }
          .id-sidebar { order: -1; }
        }

        .id-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 22px; font-size: 13.5px;
        }
        .id-breadcrumb a {
          display: flex; align-items: center; gap: 6px; color: #888;
          text-decoration: none; font-weight: 500; transition: color 0.15s;
        }
        .id-breadcrumb a:hover { color: #6366f1; }
        .id-breadcrumb-sep { color: #ddd; }
        .id-breadcrumb-cur {
          color: #1a1a2e; font-weight: 500;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px;
        }

        /* Hero card */
        .id-hero {
          background: #fff; border: 1.5px solid #e8e5e1;
          border-radius: 20px; overflow: hidden; margin-bottom: 20px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.05);
        }
        .id-hero-banner { height: 86px; position: relative; overflow: hidden; }
        .id-hero-banner-grid {
          position: absolute; inset: 0; opacity: 0.15;
          background-image:
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .id-hero-company-row {
          position: relative; padding: 0 28px;
          margin-top: -28px; margin-bottom: 18px;
          display: flex; align-items: flex-end; justify-content: space-between;
        }
        .id-avatar {
          width: 56px; height: 56px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Serif Display', serif; font-size: 18px; color: #fff;
          border: 3px solid #fff; flex-shrink: 0;
          box-shadow: 0 2px 12px rgba(0,0,0,0.14);
        }
        .id-hero-btns { display: flex; align-items: center; gap: 8px; padding-bottom: 4px; }
        .id-icon-btn {
          width: 36px; height: 36px; border: 1.5px solid #e8e5e1;
          border-radius: 9px; background: #fff; cursor: pointer; color: #aaa;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }
        .id-icon-btn:hover { border-color: #6366f1; color: #6366f1; }
        .id-icon-btn.on { border-color: #6366f1; color: #6366f1; background: rgba(99,102,241,0.08); }
        .id-icon-btn.ok { border-color: #22c55e; color: #22c55e; background: rgba(34,197,94,0.07); }

        .id-hero-body { padding: 0 28px 28px; }
        .id-role-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(99,102,241,0.07); border: 1px solid rgba(99,102,241,0.18);
          border-radius: 999px; padding: 3px 12px;
          font-size: 12px; font-weight: 600; color: #6366f1; margin-bottom: 12px;
        }
        .id-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(26px, 3.5vw, 38px);
          color: #1a1a2e; line-height: 1.12; letter-spacing: -0.4px; margin: 0 0 8px;
        }
        .id-company {
          font-size: 15px; font-weight: 600; color: #666;
          margin: 0 0 22px; display: flex; align-items: center; gap: 7px;
        }
        .id-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 26px; }
        .id-chip {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 999px;
          background: #f7f5f2; border: 1.5px solid #e8e5e1;
          font-size: 13px; font-weight: 500; color: #555;
        }
        .id-chip.green  { color: #059669; background: #ecfdf5; border-color: rgba(16,185,129,0.2); }
        .id-chip.indigo { color: #6366f1; background: rgba(99,102,241,0.07); border-color: rgba(99,102,241,0.18); }
        .id-apply-btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 32px; background: #1a1a2e; color: #fff;
          border-radius: 12px; font-weight: 700; font-size: 15px; text-decoration: none;
          transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
        }
        .id-apply-btn:hover {
          background: #252545; box-shadow: 0 6px 20px rgba(26,26,46,0.22); transform: translateY(-1px);
        }
        .id-copy-hint { font-size: 13px; color: #22c55e; margin-top: 12px; }

        /* Content card */
        .id-card {
          background: #fff; border: 1.5px solid #e8e5e1;
          border-radius: 20px; padding: 30px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04); margin-bottom: 20px;
        }
        .id-sec-label {
          font-size: 11px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; color: #aaa; margin-bottom: 10px;
        }
        .id-sec-title {
          font-family: 'DM Serif Display', serif;
          font-size: 20px; color: #1a1a2e; margin: 0 0 14px; letter-spacing: -0.2px;
        }
        .id-desc { font-size: 15px; color: #666; line-height: 1.82; margin: 0; }
        .id-hr { height: 1px; background: #f0ede9; margin: 26px 0; border: none; }
        .id-skills { display: flex; flex-wrap: wrap; gap: 8px; }
        .id-skill {
          font-size: 13px; font-weight: 500; color: #6366f1;
          background: rgba(99,102,241,0.07); border: 1.5px solid rgba(99,102,241,0.16);
          border-radius: 999px; padding: 5px 14px; transition: background 0.15s;
        }
        .id-skill:hover { background: rgba(99,102,241,0.13); }
        .id-perks { display: flex; flex-direction: column; gap: 10px; }
        .id-perk { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #555; line-height: 1.5; }

        /* Sidebar */
        .id-sidebar { display: flex; flex-direction: column; gap: 18px; position: sticky; top: 96px; }
        .id-scard {
          background: #fff; border: 1.5px solid #e8e5e1;
          border-radius: 18px; overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .id-scard-head {
          background: #1a1a2e; padding: 17px 20px;
          display: flex; align-items: center; gap: 11px;
        }
        .id-scard-head-icon {
          width: 30px; height: 30px; background: rgba(99,102,241,0.25);
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
        }
        .id-scard-head-title { font-family: 'DM Serif Display', serif; font-size: 16px; color: #fff; }
        .id-scard-body { padding: 12px; }
        .id-det-row {
          display: flex; align-items: center; gap: 11px;
          padding: 10px; border-radius: 10px; border: 1.5px solid transparent;
          transition: background 0.15s, border-color 0.15s;
        }
        .id-det-row:hover { background: #f7f5f2; border-color: #f0ede9; }
        .id-det-icon {
          width: 34px; height: 34px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .id-det-label { font-size: 11.5px; color: #aaa; font-weight: 500; margin-bottom: 2px; }
        .id-det-val { font-size: 13.5px; font-weight: 600; color: #1a1a2e; }

        /* CTA card */
        .id-cta {
          background: #1a1a2e; border-radius: 18px; padding: 26px;
          position: relative; overflow: hidden;
        }
        .id-cta::before {
          content: ''; position: absolute; top: -50px; right: -50px;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
          pointer-events: none;
        }
        .id-cta-label {
          font-size: 11px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 8px; position: relative;
        }
        .id-cta-title {
          font-family: 'DM Serif Display', serif; font-size: 20px; color: #fff;
          margin: 0 0 8px; position: relative;
        }
        .id-cta-title em { font-style: italic; color: #a5b4fc; }
        .id-cta-sub {
          font-size: 13px; color: rgba(255,255,255,0.45);
          line-height: 1.65; margin: 0 0 20px; position: relative;
        }
        .id-cta-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 12px 20px; background: #fff; color: #1a1a2e;
          border-radius: 11px; font-weight: 700; font-size: 14px; text-decoration: none;
          transition: box-shadow 0.15s, transform 0.1s; position: relative; border: none; cursor: pointer;
        }
        .id-cta-btn:hover { box-shadow: 0 6px 18px rgba(255,255,255,0.15); transform: translateY(-1px); }
        .id-platform-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.07); border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 999px; padding: 5px 13px;
          font-size: 12.5px; font-weight: 500; color: rgba(255,255,255,0.45);
          margin-top: 12px; position: relative;
        }
        .id-back-link {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 18px;
          background: #fff; border: 1.5px solid #e8e5e1; border-radius: 12px;
          font-size: 14px; font-weight: 500; color: #555; text-decoration: none;
          transition: border-color 0.15s, color 0.15s;
        }
        .id-back-link:hover { border-color: #6366f1; color: #6366f1; }
      `}</style>

      <div className="id-root">
        <Navbar />

        {loading || !intern ? (
          <div className="id-loading">
            <div className="id-spinner" />
            <p>Loading internship details…</p>
          </div>
        ) : (
          <div className="id-page">

            {/* ── MAIN ── */}
            <div>
              {/* Breadcrumb */}
              <div className="id-breadcrumb">
                <Link href="/internships">
                  <ArrowLeft size={14} /> All Internships
                </Link>
                <span className="id-breadcrumb-sep">/</span>
                <span className="id-breadcrumb-cur">{intern.title}</span>
              </div>

              {/* Hero card */}
              <div className="id-hero">
                <div className="id-hero-banner" style={{ background: gradient }}>
                  <div className="id-hero-banner-grid" />
                </div>

                <div className="id-hero-company-row">
                  <div className="id-avatar" style={{ background: gradient }}>
                    {intern.company?.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="id-hero-btns">
                    <button
                      className={`id-icon-btn${saved ? " on" : ""}`}
                      onClick={() => setSaved(!saved)}
                      aria-label={saved ? "Unsave" : "Save"}
                    >
                      <Bookmark size={15} />
                    </button>
                    <button
                      className={`id-icon-btn${copied ? " ok" : ""}`}
                      onClick={handleShare}
                      aria-label="Share"
                    >
                      <Share2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="id-hero-body">
                  {intern.role && <div className="id-role-pill">{intern.role}</div>}
                  <h1 className="id-title">{intern.title}</h1>
                  <p className="id-company">
                    <Building2 size={16} color="#aaa" />
                    {intern.company}
                  </p>

                  <div className="id-chips">
                    <span className="id-chip"><MapPin size={14} />{intern.location}</span>
                    {intern.duration && <span className="id-chip"><Clock size={14} />{intern.duration}</span>}
                    {intern.stipend && <span className="id-chip green"><DollarSign size={14} />{intern.stipend}</span>}
                    {intern.remote  && <span className="id-chip indigo"><Globe size={14} />Remote</span>}
                    {intern.platform && <span className="id-chip"><Briefcase size={14} />{intern.platform}</span>}
                  </div>

                  <a href={intern.applyLink} target="_blank" rel="noopener noreferrer" className="id-apply-btn">
                    Apply Now <ExternalLink size={15} />
                  </a>

                  {copied && <p className="id-copy-hint">Link copied to clipboard!</p>}
                </div>
              </div>

              {/* About card */}
              <div className="id-card">
                <p className="id-sec-label">Overview</p>
                <h2 className="id-sec-title">About the Internship</h2>
                <p className="id-desc">{intern.description || "No description available."}</p>

                {intern.skills?.length > 0 && (
                  <>
                    <hr className="id-hr" />
                    <p className="id-sec-label">Skills Required</p>
                    <div className="id-skills">
                      {intern.skills.map((s: string) => (
                        <span key={s} className="id-skill">{s}</span>
                      ))}
                    </div>
                  </>
                )}

                <hr className="id-hr" />
                <p className="id-sec-label">Perks &amp; Benefits</p>
                <div className="id-perks">
                  {perks.map((p) => (
                    <div key={p} className="id-perk">
                      <CheckCircle size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: 1 }} />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="id-sidebar mt-11">

              {/* Details card */}
              <div className="id-scard">
                <div className="id-scard-head">
                  <div className="id-scard-head-icon">
                    <Briefcase size={14} color="#a5b4fc" />
                  </div>
                  <span className="id-scard-head-title">Internship Details</span>
                </div>
                <div className="id-scard-body">
                  {([
                    { icon: <Building2 size={15} color="#6366f1" />, bg: "rgba(99,102,241,0.08)",  label: "Company",  val: intern.company },
                    { icon: <MapPin     size={15} color="#0ea5e9" />, bg: "rgba(14,165,233,0.08)",  label: "Location", val: intern.location },
                    { icon: <DollarSign size={15} color="#10b981" />, bg: "rgba(16,185,129,0.08)",  label: "Stipend",  val: intern.stipend ?? "Not specified" },
                    { icon: <Clock      size={15} color="#f59e0b" />, bg: "rgba(245,158,11,0.08)",  label: "Duration", val: intern.duration ?? "Not specified" },
                    { icon: <Globe      size={15} color="#a855f7" />, bg: "rgba(168,85,247,0.08)",  label: "Type",     val: intern.remote ? "Remote" : "On-site" },
                    { icon: <Briefcase  size={15} color="#ef4444" />, bg: "rgba(239,68,68,0.08)",   label: "Platform", val: intern.platform ?? "—" },
                  ] as const).map(({ icon, bg, label, val }) => (
                    <div key={label} className="id-det-row">
                      <div className="id-det-icon" style={{ background: bg }}>{icon}</div>
                      <div>
                        <div className="id-det-label">{label}</div>
                        <div className="id-det-val">{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="id-cta">
                <p className="id-cta-label">Ready to apply?</p>
                <h3 className="id-cta-title">Take the<br /><em>next step.</em></h3>
                <p className="id-cta-sub">
                  Great internships fill up fast. Apply directly on {intern.platform ?? "the company portal"}.
                </p>
                <a href={intern.applyLink} target="_blank" rel="noopener noreferrer" className="id-cta-btn">
                  Apply Now <ExternalLink size={15} />
                </a>
                {intern.platform && (
                  <div className="id-platform-badge">
                    <Globe size={13} /> via {intern.platform}
                  </div>
                )}
              </div>

              {/* Back link */}
              <Link href="/internships" className="id-back-link">
                <ArrowLeft size={15} /> Back to all internships
              </Link>
            </div>

          </div>
        )}

        <Footer />
      </div>
    </>
  );
}