
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  DollarSign,
  ArrowRight,
  ExternalLink,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  role: string;
  applyLink: string;
  platform: string;
  description: string;
  stipend: string;
  postedAt?: string;
}

function getInitials(company: string) {
  return company.slice(0, 2).toUpperCase();
}

function InternshipCardLocal({
  internship,
  index,
  visible,
}: {
  internship: Internship;
  index: number;
  visible: boolean;
}) {
  const router = useRouter();

  const handleApplyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const token = localStorage.getItem("token");
    if (!token) {
      e.preventDefault();
      router.push("/Account");
    }
  };

  return (
    <div
      className="iv-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.4s ease ${index * 80}ms`,
      }}
    >
      <div className="iv-card-header">
        <div className="iv-avatar">{getInitials(internship.company)}</div>
        <div className="iv-header-info">
          <span className="iv-company">{internship.company}</span>
          <span className="iv-platform">{internship.platform}</span>
        </div>
      </div>

      <h3 className="iv-title">{internship.title}</h3>
      <p className="iv-desc">{internship.description}</p>

      <div className="iv-meta">
        <span className="iv-meta-item">
          <MapPin size={13} />
          {internship.location}
        </span>

        <span className="iv-meta-item iv-stipend">
          <DollarSign size={13} />
          {internship.stipend}
        </span>
      </div>

      <div className="iv-footer">
        <a
          href={internship.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="iv-apply-btn"
          onClick={handleApplyClick}
        >
          Apply
          <ExternalLink size={13} />
        </a>

        <Link href={`/internships/${internship.id}`} className="iv-details-btn">
          Details
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

export default function InternshipList() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState(new Set<number>());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 🔥 FETCH API
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/internships`,
        );
        const data = await res.json();

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
              i.description?.slice(0, 120) || "No description available",
            stipend: i.stipend || "Not specified",
            postedAt: i.postedAt,
          }));

          // ✅ sort by latest
          const sorted = mapped.sort(
            (a: any, b: any) =>
              new Date(b.postedAt || 0).getTime() -
              new Date(a.postedAt || 0).getTime(),
          );

          // ✅ only latest 6
          setInternships(sorted.slice(0, 6));
        }
      } catch (err) {
        console.error("Error fetching internships:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  // 🔥 animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            setVisibleCards((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.1 },
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [internships.length]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');

        .iv-section {
          font-family: 'DM Sans', sans-serif;
          background: #f7f5f2;
          padding: 100px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .iv-section::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .iv-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
        }

        /* Section header */
        .iv-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 56px;
          gap: 24px;
        }

        .iv-header-left {}

        .iv-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #fff;
          border: 1.5px solid #e5e3df;
          border-radius: 999px;
          padding: 5px 13px 5px 8px;
          margin-bottom: 16px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }

        .iv-badge-icon {
          width: 20px; height: 20px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        .iv-badge span {
          font-size: 12.5px;
          font-weight: 500;
          color: #666;
        }

        .iv-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(34px, 4vw, 50px);
          color: #1a1a2e;
          line-height: 1.1;
          letter-spacing: -0.5px;
          margin: 0 0 10px;
        }

        .iv-heading em {
          font-style: italic;
          color: #6366f1;
        }

        .iv-sub {
          font-size: 16px;
          color: #888;
          max-width: 420px;
          line-height: 1.6;
          margin: 0;
        }

        .iv-view-all-top {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px 22px;
          background: #fff;
          border: 1.5px solid #e5e3df;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #1a1a2e;
          text-decoration: none;
          white-space: nowrap;
          transition: border-color 0.15s, color 0.15s, box-shadow 0.15s;
          flex-shrink: 0;
        }

        .iv-view-all-top:hover {
          border-color: #6366f1;
          color: #6366f1;
          box-shadow: 0 2px 12px rgba(99,102,241,0.1);
        }

        /* Grid */
        .iv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 1024px) {
          .iv-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .iv-inner { padding: 0 20px; }
          .iv-grid { grid-template-columns: 1fr; }
          .iv-header { flex-direction: column; align-items: flex-start; }
          .iv-view-all-top { align-self: flex-start; }
        }

        /* Card */
        .iv-card {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 18px;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: default;
        }

        .iv-card:hover {
          border-color: #c7d2fe;
          box-shadow: 0 8px 32px rgba(99,102,241,0.1);
          transform: translateY(-2px);
        }

        .iv-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .iv-avatar {
          width: 42px; height: 42px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Serif Display', serif;
          font-size: 14px;
          color: #fff;
          flex-shrink: 0;
        }

        .iv-header-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .iv-company {
          font-size: 13.5px;
          font-weight: 600;
          color: #1a1a2e;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .iv-platform {
          font-size: 11.5px;
          color: #aaa;
        }

        .iv-role-tag {
          font-size: 11px;
          font-weight: 600;
          color: #6366f1;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 999px;
          padding: 3px 10px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .iv-title {
          font-family: 'DM Serif Display', serif;
          font-size: 18px;
          color: #1a1a2e;
          line-height: 1.25;
          margin: 0;
          letter-spacing: -0.2px;
        }

        .iv-desc {
          font-size: 13.5px;
          color: #888;
          line-height: 1.65;
          margin: 0;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .iv-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .iv-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          color: #999;
        }

        .iv-stipend {
          color: #059669;
          font-weight: 600;
          background: #ecfdf5;
          border-radius: 999px;
          padding: 2px 10px 2px 6px;
        }

        /* Card footer */
        .iv-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 4px;
          border-top: 1px solid #f0ede9;
        }

        .iv-apply-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
          justify-content: center;
          padding: 9px 16px;
          background: #1a1a2e;
          color: #fff;
          border-radius: 9px;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.15s, box-shadow 0.15s;
        }

        .iv-apply-btn:hover {
          background: #252545;
          box-shadow: 0 4px 14px rgba(26,26,46,0.2);
        }

        .iv-details-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 9px 14px;
          background: transparent;
          color: #888;
          border: 1.5px solid #e5e3df;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s;
          white-space: nowrap;
        }

        .iv-details-btn:hover {
          border-color: #6366f1;
          color: #6366f1;
        }

        /* Bottom CTA */
        .iv-bottom {
          margin-top: 56px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .iv-bottom-cta {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 14px 32px;
          background: #1a1a2e;
          color: #fff;
          border-radius: 13px;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
        }

        .iv-bottom-cta:hover {
          background: #252545;
          box-shadow: 0 6px 20px rgba(26,26,46,0.22);
          transform: translateY(-1px);
        }

        .iv-bottom-cta:active { transform: translateY(0); }

        .iv-bottom-hint {
          font-size: 13px;
          color: #bbb;
        }

        .iv-bottom-hint strong {
          color: #888;
        }
      `}</style>

      <section className="iv-section">
        <div className="iv-inner">
          {/* Header */}
          <div className="iv-header">
            <div>
              <h2 className="iv-heading">
                Latest <em>Internships</em>
              </h2>
              <p className="iv-sub">
                Recently added opportunities you shouldn't miss.
              </p>
            </div>

            <Link href="/internships" className="iv-view-all-top">
              View All
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Loading */}
          {loading ? (
            <p>Loading internships...</p>
          ) : (
            <div className="iv-grid">
              {internships.map((internship, index) => (
                <div
                  key={internship.id}
                  data-index={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                >
                  <InternshipCardLocal
                    internship={internship}
                    index={index}
                    visible={visibleCards.has(index)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Bottom */}
          <div className="iv-bottom">
            <Link href="/internships" className="iv-bottom-cta">
              Explore All
              <TrendingUp size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
