'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ArrowRight,
  Users,
  Building2,
  Briefcase,
  Zap,
  CheckCircle,
  MapPin,
} from 'lucide-react';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const searchSuggestions = [
    'Software Engineer',
    'Data Science',
    'UI/UX Design',
    'Marketing',
    'Finance',
  ];

  useEffect(() => {
    const current = searchSuggestions[currentWordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 120);
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 60);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % searchSuggestions.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/internships?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const stats = [
    { icon: Briefcase, label: 'Active Positions', value: '120+' },
    { icon: Building2, label: 'Partner Companies', value: '15+' },
    { icon: Users, label: 'Students Placed', value: '100+' },
  ];

  const features = [
    'Verified internships only',
    'Direct company applications',
    'Real-time updates',
    'Free forever',
  ];

  const recentListings = [
    { role: 'Frontend Developer', company: 'TechCorp', location: 'Remote', tag: 'New' },
    { role: 'Data Analyst', company: 'FinanceHub', location: 'New York', tag: 'Hot' },
    { role: 'Product Design', company: 'DesignCo', location: 'San Francisco', tag: 'New' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        .hero-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f7f5f2;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* ── Noise texture overlay ── */
        .hero-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* ── Decorative blobs ── */
        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          pointer-events: none;
        }

        .hero-blob-1 {
          width: 600px; height: 600px;
          background: #6366f1;
          top: -160px; left: -120px;
          animation: blobFloat 10s ease-in-out infinite alternate;
        }

        .hero-blob-2 {
          width: 500px; height: 500px;
          background: #a855f7;
          bottom: -100px; right: -100px;
          animation: blobFloat 14s ease-in-out infinite alternate-reverse;
        }

        @keyframes blobFloat {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 40px) scale(1.05); }
        }

        /* ── Nav ── */
        .hero-nav {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 48px;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .nav-logo-icon {
          width: 36px; height: 36px;
          background: #1a1a2e;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }

        .nav-logo-text {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: #1a1a2e;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
        }

        .nav-links a {
          font-size: 14px;
          font-weight: 500;
          color: #666;
          text-decoration: none;
          transition: color 0.15s;
        }

        .nav-links a:hover { color: #1a1a2e; }

        .nav-cta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-ghost {
          padding: 9px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #1a1a2e;
          background: none;
          border: 1.5px solid #ddd;
          border-radius: 10px;
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s;
          cursor: pointer;
        }

        .btn-ghost:hover { border-color: #6366f1; color: #6366f1; }

        .btn-primary {
          padding: 9px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          background: #1a1a2e;
          border: none;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
          cursor: pointer;
        }

        .btn-primary:hover {
          background: #252545;
          box-shadow: 0 4px 16px rgba(26,26,46,0.2);
          transform: translateY(-1px);
        }

        /* ── Hero body ── */
        .hero-body {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          align-items: center;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          padding: 60px 48px 80px;
          gap: 64px;
        }

        /* ── Left ── */
        .hero-left {
          flex: 1;
          min-width: 0;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1.5px solid #e5e3df;
          border-radius: 999px;
          padding: 6px 14px 6px 8px;
          margin-bottom: 28px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }

        .badge-dot {
          width: 22px; height: 22px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        .hero-badge span {
          font-size: 13px;
          font-weight: 500;
          color: #555;
        }

        .hero-badge strong { color: #6366f1; }

        .hero-headline {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(40px, 5vw, 62px);
          line-height: 1.1;
          color: #1a1a2e;
          margin-bottom: 20px;
          letter-spacing: -0.5px;
        }

        .hero-headline em {
          font-style: italic;
          color: #6366f1;
        }

        .hero-sub {
          font-size: 17px;
          color: #777;
          line-height: 1.7;
          max-width: 460px;
          margin-bottom: 36px;
        }

        /* Search bar */
        .search-wrap {
          position: relative;
          max-width: 520px;
          margin-bottom: 24px;
        }

        .search-inner {
          display: flex;
          align-items: center;
          background: #fff;
          border: 2px solid #e5e3df;
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }

        .search-inner:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
        }

        .search-icon {
          padding: 0 16px;
          color: #bbb;
          display: flex;
          align-items: center;
          flex-shrink: 0;
          transition: color 0.15s;
        }

        .search-inner:focus-within .search-icon { color: #6366f1; }

        .search-input {
          flex: 1;
          padding: 16px 0;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #1a1a2e;
          background: transparent;
        }

        .search-input::placeholder { color: #c0bcb6; }

        .search-divider {
          width: 1px;
          height: 24px;
          background: #e5e3df;
          flex-shrink: 0;
        }

        .search-location {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0 14px;
          font-size: 13.5px;
          color: #999;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .search-btn {
          margin: 5px;
          padding: 12px 22px;
          background: #1a1a2e;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background 0.15s;
          flex-shrink: 0;
        }

        .search-btn:hover { background: #252545; }

        /* Cursor blink */
        .cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: #6366f1;
          margin-left: 1px;
          vertical-align: middle;
          animation: blink 0.8s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Features */
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 24px;
          max-width: 380px;
          margin-bottom: 40px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: #666;
          font-weight: 500;
        }

        /* CTA buttons */
        .hero-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cta-primary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #1a1a2e;
          color: #fff;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.15s;
        }

        .cta-primary:hover {
          background: #252545;
          box-shadow: 0 6px 20px rgba(26,26,46,0.25);
          transform: translateY(-1px);
        }

        .cta-secondary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #fff;
          color: #1a1a2e;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          border: 1.5px solid #e5e3df;
          transition: all 0.15s;
        }

        .cta-secondary:hover {
          border-color: #6366f1;
          color: #6366f1;
        }

        /* ── Right panel ── */
        .hero-right {
          width: 420px;
          flex-shrink: 0;
          display: none;
          flex-direction: column;
          gap: 16px;
        }

        @media (min-width: 1024px) {
          .hero-right { display: flex; }
        }

        /* Job preview card */
        .preview-card {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
        }

        .preview-header {
          background: #1a1a2e;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .preview-header-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .preview-header-title {
          font-family: 'DM Serif Display', serif;
          font-size: 16px;
          color: #fff;
        }

        .preview-header-sub {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
        }

        .preview-new-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(99,102,241,0.25);
          border: 1px solid rgba(99,102,241,0.4);
          border-radius: 999px;
          padding: 4px 10px;
          font-size: 12px;
          color: #a5b4fc;
          font-weight: 500;
        }

        .pulse-dot {
          width: 6px; height: 6px;
          background: #6ee7b7;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }

        .preview-list {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .listing-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 10px;
          background: #fafaf9;
          border: 1px solid #f0ede9;
          transition: border-color 0.15s, background 0.15s;
          cursor: pointer;
        }

        .listing-row:hover { border-color: #c7d2fe; background: #f5f3ff; }

        .listing-avatar {
          width: 36px; height: 36px;
          border-radius: 8px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Serif Display', serif;
          font-size: 13px;
          color: #fff;
          flex-shrink: 0;
        }

        .listing-info { flex: 1; min-width: 0; }

        .listing-role {
          font-size: 13.5px;
          font-weight: 600;
          color: #1a1a2e;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .listing-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #999;
          margin-top: 2px;
        }

        .listing-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 999px;
        }

        .tag-new { background: #ecfdf5; color: #059669; }
        .tag-hot { background: #fff7ed; color: #ea580c; }

        /* Stats mini */
        .mini-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .mini-stat {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 14px;
          padding: 16px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .mini-stat-icon {
          width: 34px; height: 34px;
          background: #f0effe;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 8px;
        }

        .mini-stat-value {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #1a1a2e;
          line-height: 1;
          margin-bottom: 4px;
        }

        .mini-stat-label {
          font-size: 11px;
          color: #aaa;
          font-weight: 500;
        }

        /* ── Stats bar ── */
        .hero-stats {
          position: relative;
          z-index: 1;
          background: #f2;
          border-top: 1.5px solid #e8e5e1;
        }

        .stats-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 28px 48px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .stat-block {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          border-radius: 14px;
          border: 1.5px solid #e8e5e1;
          transition: border-color 0.2s, box-shadow 0.2s;
          cursor: default;
        }

        .stat-block:hover {
          border-color: #c7d2fe;
          box-shadow: 0 4px 16px rgba(99,102,241,0.08);
        }

        .stat-icon-wrap {
          width: 48px; height: 48px;
          background: #f0effe;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .stat-value {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: #1a1a2e;
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 13px;
          color: #aaa;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .hero-nav { padding: 20px 24px; }
          .nav-links { display: none; }
          .hero-body { padding: 40px 24px 60px; }
          .stats-inner { padding: 20px 24px; grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hero-root">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />

        {/* ── Hero body ── */}
        <div className="hero-body">
          {/* Left */}
          <div className="hero-left mt-10">
           

            <h1 className="hero-headline">
              Your dream<br />
              internship,<br />
              <em>starts here.</em>
            </h1>

            <p className="hero-sub">
              Discover verified internships from top companies. Curated, current, and completely free — built for students like you.
            </p>

            {/* Search */}
            <form className="search-wrap" onSubmit={handleSearch}>
              <div className="search-inner">
                <span className="search-icon"><Search size={18} /></span>
                <input
                  className="search-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`${displayText}\u200b`}
                  aria-label="Search internships"
                />
                <span className="cursor" />
                <div className="search-divider" />
                <span className="search-location">
                  <MapPin size={13} />
                  Remote / Any
                </span>
                <button type="submit" className="search-btn">
                  Search
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>

            {/* Features */}
            <div className="features-grid">
              {['Verified listings only', 'Direct company apply', 'Real-time updates', 'Free forever'].map((f) => (
                <div key={f} className="feature-item">
                  <CheckCircle size={15} color="#22c55e" />
                  {f}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-ctas">
              <Link href="/internships" className="cta-primary">
                Explore Opportunities
                <ArrowRight size={17} />
              </Link>
              <Link href="/about" className="cta-secondary">
                Learn More
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="hero-right">
            {/* Job listings preview card */}
            <div className="preview-card">
              <div className="preview-header">
                <div className="preview-header-left">
                  <span className="preview-header-title">Latest Internships</span>
                  <span className="preview-header-sub">Updated just now</span>
                </div>
                <div className="preview-new-badge">
                  <div className="pulse-dot" />
                  Live
                </div>
              </div>
              <div className="preview-list">
                {recentListings.map((item, i) => (
                  <div key={i} className="listing-row">
                    <div className="listing-avatar">
                      {item.company.slice(0, 2)}
                    </div>
                    <div className="listing-info">
                      <div className="listing-role">{item.role}</div>
                      <div className="listing-meta">
                        <span>{item.company}</span>
                        <span>·</span>
                        <MapPin size={10} />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <span className={`listing-tag ${item.tag === 'Hot' ? 'tag-hot' : 'tag-new'}`}>
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini stats */}
            <div className="mini-stats">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="mini-stat">
                  <div className="mini-stat-icon">
                    <Icon size={16} color="#6366f1" />
                  </div>
                  <div className="mini-stat-value">{value}</div>
                  <div className="mini-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="hero-stats">
          <div className="stats-inner">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="stat-block">
                <div className="stat-icon-wrap">
                  <Icon size={22} color="#6366f1" />
                </div>
                <div>
                  <div className="stat-value">{value}</div>
                  <div className="stat-label">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}