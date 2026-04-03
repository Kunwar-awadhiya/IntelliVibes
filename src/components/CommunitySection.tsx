'use client';

import React, { useState, useEffect } from 'react';
import { Send, Users, Linkedin, ArrowRight, Globe, Zap, MessageCircle } from 'lucide-react';

const benefits = [
  {
    title: 'Daily Career Updates',
    description: 'Get the latest internship opportunities and career tips delivered every day.',
    icon: Zap,
    accent: '#6366f1',
    accentLight: 'rgba(99,102,241,0.07)',
    accentBorder: 'rgba(99,102,241,0.18)',
  },
  {
    title: 'Global Network',
    description: 'Connect with talented interns and job seekers from all around the world.',
    icon: Globe,
    accent: '#a855f7',
    accentLight: 'rgba(168,85,247,0.07)',
    accentBorder: 'rgba(168,85,247,0.18)',
  },
  {
    title: 'Peer Support',
    description: 'Get help, share experiences, and grow together with your peers.',
    icon: MessageCircle,
    accent: '#10b981',
    accentLight: 'rgba(16,185,129,0.07)',
    accentBorder: 'rgba(16,185,129,0.18)',
  },
];

export default function CommunitySection() {
  const [activeCard, setActiveCard] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slight delay so the fade-in is noticeable on mount
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % benefits.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');

        .cs-section {
          font-family: 'DM Sans', sans-serif;
          background: #f7f5f2;
          padding: 100px 0 96px;
          position: relative;
          overflow: hidden;
        }

        .cs-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1.5px;
          background: #e8e5e1;
        }

        /* Blobs */
        .cs-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.1;
          pointer-events: none;
        }
        .cs-blob-1 { width: 500px; height: 500px; background: #6366f1; top: -160px; left: -120px; }
        .cs-blob-2 { width: 400px; height: 400px; background: #a855f7; bottom: -100px; right: -100px; }

        .cs-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        /* Header */
        .cs-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .cs-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #fff;
          border: 1.5px solid #e5e3df;
          border-radius: 999px;
          padding: 5px 14px 5px 8px;
          margin-bottom: 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }

        .cs-badge-icon {
          width: 20px; height: 20px;
          background: #1a1a2e;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        .cs-badge span {
          font-size: 12.5px;
          font-weight: 500;
          color: #666;
        }

        .cs-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(36px, 4.5vw, 52px);
          color: #1a1a2e;
          line-height: 1.1;
          letter-spacing: -0.5px;
          margin: 0 0 14px;
        }

        .cs-heading em {
          font-style: italic;
          color: #6366f1;
        }

        .cs-sub {
          font-size: 16px;
          color: #888;
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* Cards grid */
        .cs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 56px;
        }

        @media (max-width: 960px) {
          .cs-grid { grid-template-columns: 1fr; max-width: 480px; margin-left: auto; margin-right: auto; }
          .cs-inner { padding: 0 20px; }
        }

        /* Benefit card */
        .cs-card {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 18px;
          padding: 26px 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
          cursor: default;
        }

        .cs-card:hover { transform: translateY(-2px); }

        .cs-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cs-card-icon {
          width: 44px; height: 44px;
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s;
        }

        .cs-card:hover .cs-card-icon { transform: scale(1.08); }

        .cs-active-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s;
          animation: pulse-dot 1.6s ease-in-out infinite;
        }

        .cs-active-dot.shown { opacity: 1; }

        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }

        .cs-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: #1a1a2e;
          margin: 0;
          letter-spacing: -0.2px;
        }

        .cs-card-desc {
          font-size: 14px;
          color: #888;
          line-height: 1.7;
          margin: 0;
        }

        /* CTA block */
        .cs-cta-block {
          background: #1a1a2e;
          border-radius: 20px;
          padding: 44px 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 28px;
          position: relative;
          overflow: hidden;
        }

        .cs-cta-block::before {
          content: '';
          position: absolute;
          top: -80px; left: 50%;
          transform: translateX(-50%);
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%);
          pointer-events: none;
        }

        .cs-cta-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(26px, 3vw, 36px);
          color: #fff;
          margin: 0;
          position: relative;
          letter-spacing: -0.3px;
        }

        .cs-cta-heading em {
          font-style: italic;
          color: #a5b4fc;
        }

        .cs-cta-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.45);
          max-width: 360px;
          line-height: 1.65;
          margin: -12px 0 0;
          position: relative;
        }

        .cs-cta-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          position: relative;
        }

        .cs-btn-tg {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 28px;
          background: #fff;
          color: #1a1a2e;
          border-radius: 12px;
          font-weight: 700;
          font-size: 14.5px;
          text-decoration: none;
          border: none;
          transition: box-shadow 0.15s, transform 0.1s;
        }

        .cs-btn-tg:hover {
          box-shadow: 0 6px 20px rgba(255,255,255,0.18);
          transform: translateY(-1px);
        }

        .cs-btn-tg:active { transform: translateY(0); }

        .cs-btn-li {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 28px;
          background: transparent;
          color: rgba(255,255,255,0.8);
          border: 1.5px solid rgba(255,255,255,0.18);
          border-radius: 12px;
          font-weight: 600;
          font-size: 14.5px;
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }

        .cs-btn-li:hover {
          border-color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.06);
          color: #fff;
        }

        /* Member count strip */
        .cs-member-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
        }

        .cs-avatars {
          display: flex;
        }

        .cs-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 2px solid #1a1a2e;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: #fff;
          margin-left: -8px;
        }

        .cs-avatar:first-child { margin-left: 0; }

        .cs-member-text {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
        }

        .cs-member-text strong { color: rgba(255,255,255,0.7); }
      `}</style>

      <section className="cs-section" id="community">
        <div className="cs-blob cs-blob-1" />
        <div className="cs-blob cs-blob-2" />

        <div
          className="cs-inner"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          {/* Header */}
          <div className="cs-header">
            <div className="cs-badge">
              <div className="cs-badge-icon">
                <Users size={11} color="#fff" />
              </div>
              <span>1,000+ members and growing</span>
            </div>
            <h2 className="cs-heading">
              Join our <em>community</em>
            </h2>
            <p className="cs-sub">
              Connect with like-minded students and professionals accelerating their careers together.
            </p>
          </div>

          {/* Benefit cards */}
          <div className="cs-grid">
            {benefits.map((b, index) => {
              const Icon = b.icon;
              const isActive = activeCard === index;

              return (
                <div
                  key={index}
                  className="cs-card"
                  style={{
                    borderColor: isActive ? b.accent : undefined,
                    boxShadow: isActive ? `0 8px 28px ${b.accentLight}` : undefined,
                  }}
                  onMouseEnter={() => setActiveCard(index)}
                >
                  <div className="cs-card-top">
                    <div
                      className="cs-card-icon"
                      style={{ background: b.accentLight, border: `1.5px solid ${b.accentBorder}` }}
                    >
                      <Icon size={20} color={b.accent} />
                    </div>
                    <div
                      className={`cs-active-dot${isActive ? ' shown' : ''}`}
                      style={{ background: b.accent }}
                    />
                  </div>
                  <h3 className="cs-card-title">{b.title}</h3>
                  <p className="cs-card-desc">{b.description}</p>
                </div>
              );
            })}
          </div>

          {/* CTA block */}
          <div className="cs-cta-block">
            <h3 className="cs-cta-heading">
              Ready to <em>connect?</em>
            </h3>
            <p className="cs-cta-sub">
              Join our Telegram and LinkedIn communities — stay ahead of the curve, every day.
            </p>

            <div className="cs-cta-buttons">
              <a
                href="https://t.me/InternVibes"
                target="_blank"
                rel="noopener noreferrer"
                className="cs-btn-tg"
                aria-label="Join Telegram Community"
              >
                <Send size={16} />
                Join Telegram
                <ArrowRight size={15} />
              </a>
              <a
                href="https://linkedin.com/company/internvibes/"
                target="_blank"
                rel="noopener noreferrer"
                className="cs-btn-li"
                aria-label="Follow on LinkedIn"
              >
                <Linkedin size={16} color="#60a5fa" />
                Follow on LinkedIn
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Social proof strip */}
            <div className="cs-member-strip">
              <div className="cs-avatars">
                {[
                  { initials: 'AK', bg: '#6366f1' },
                  { initials: 'SR', bg: '#a855f7' },
                  { initials: 'MJ', bg: '#10b981' },
                  { initials: 'PL', bg: '#f59e0b' },
                  { initials: 'RV', bg: '#ef4444' },
                ].map((a) => (
                  <div key={a.initials} className="cs-avatar" style={{ background: a.bg }}>
                    {a.initials}
                  </div>
                ))}
              </div>
              <span className="cs-member-text">
                <strong>1,000+ students</strong> already inside
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}