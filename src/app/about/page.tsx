'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Shield, TrendingUp, Heart, ArrowRight,
  Search, Filter, Share2, BarChart, Quote, CheckCircle, Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const workProcess = [
  {
    icon: Search,
    step: '01',
    title: 'Manual Sourcing',
    description: 'We manually source internships and jobs from LinkedIn, Internshala, Unstop, Cuvette, and Naukri.',
    accent: '#6366f1',
    accentLight: 'rgba(99,102,241,0.07)',
    accentBorder: 'rgba(99,102,241,0.18)',
  },
  {
    icon: Filter,
    step: '02',
    title: 'Quality Filtering',
    description: 'We filter out spam and expired listings to keep everything reliable and trustworthy.',
    accent: '#a855f7',
    accentLight: 'rgba(168,85,247,0.07)',
    accentBorder: 'rgba(168,85,247,0.18)',
  },
  {
    icon: Share2,
    step: '03',
    title: 'Multi-Platform Sharing',
    description: 'We post on Telegram and LinkedIn while integrating everything on our website for a seamless experience.',
    accent: '#0ea5e9',
    accentLight: 'rgba(14,165,233,0.07)',
    accentBorder: 'rgba(14,165,233,0.18)',
  },
  {
    icon: BarChart,
    step: '04',
    title: 'Continuous Improvement',
    description: 'We track engagement and continuously update listings based on real student feedback.',
    accent: '#10b981',
    accentLight: 'rgba(16,185,129,0.07)',
    accentBorder: 'rgba(16,185,129,0.18)',
  },
];

const trustFactors = [
  {
    icon: Shield,
    title: 'Curated Quality',
    description: 'Every internship is personally checked to ensure authenticity and relevance.',
    accent: '#10b981',
    accentLight: 'rgba(16,185,129,0.07)',
    accentBorder: 'rgba(16,185,129,0.18)',
  },
  {
    icon: Users,
    title: 'Community-Driven',
    description: '1,000+ interns sharing experiences, tips, and supporting each other every day.',
    accent: '#6366f1',
    accentLight: 'rgba(99,102,241,0.07)',
    accentBorder: 'rgba(99,102,241,0.18)',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'More than listings — resume tips, interview prep, and career resources included.',
    accent: '#a855f7',
    accentLight: 'rgba(168,85,247,0.07)',
    accentBorder: 'rgba(168,85,247,0.18)',
  },
];

export default function AboutPage() {
  const [activeProcess, setActiveProcess] = useState(0);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProcess((prev) => (prev + 1) % workProcess.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.getAttribute('data-key');
            if (key) setVisible((prev) => new Set([...prev, key]));
          }
        });
      },
      { threshold: 0.12 }
    );
    const els = sectionRef.current?.querySelectorAll('[data-key]');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const v = (key: string, delay = 0) => ({
    'data-key': key,
    style: {
      opacity: visible.has(key) ? 1 : 0,
      transform: visible.has(key) ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    },
  });

  return (
    <>
    <Navbar/>
    
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');

        .ab-root {
          font-family: 'DM Sans', sans-serif;
          background: #f7f5f2;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Section shared ── */
        .ab-section {
          padding: 96px 0;
          position: relative;
        }

        .ab-section + .ab-section {
          border-top: 1.5px solid #e8e5e1;
        }

        .ab-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .ab-inner { padding: 0 20px; }
          .ab-section { padding: 72px 0; }
        }

        /* ── Shared badge ── */
        .ab-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #fff;
          border: 1.5px solid #e5e3df;
          border-radius: 999px;
          padding: 5px 14px 5px 8px;
          margin-bottom: 18px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }

        .ab-badge-icon {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #1a1a2e;
          display: flex; align-items: center; justify-content: center;
        }

        .ab-badge span {
          font-size: 12.5px;
          font-weight: 500;
          color: #666;
        }

        /* ── Shared heading ── */
        .ab-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(34px, 4vw, 50px);
          color: #1a1a2e;
          line-height: 1.1;
          letter-spacing: -0.5px;
          margin: 0 0 14px;
        }

        .ab-heading em { font-style: italic; color: #6366f1; }

        .ab-sub {
          font-size: 16px;
          color: #888;
          line-height: 1.65;
          margin: 0;
        }

        /* ── HERO ── */
        .ab-hero {
          background: #1a1a2e;
          position: relative;
          overflow: hidden;
          padding: 120px 0 100px;
        }

        .ab-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .ab-hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        .ab-hero-blob-1 { width: 560px; height: 560px; background: rgba(99,102,241,0.22); top: -180px; right: -120px; }
        .ab-hero-blob-2 { width: 400px; height: 400px; background: rgba(168,85,247,0.15); bottom: -100px; left: -80px; }

        .ab-hero-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .ab-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          padding: 5px 14px 5px 8px;
          margin-bottom: 24px;
        }

        .ab-hero-badge-icon {
          width: 20px; height: 20px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        .ab-hero-badge span {
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
        }

        .ab-hero-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(42px, 6vw, 72px);
          color: #fff;
          line-height: 1.08;
          letter-spacing: -1px;
          margin: 0 0 20px;
        }

        .ab-hero-heading em {
          font-style: italic;
          color: #a5b4fc;
        }

        .ab-hero-sub {
          font-size: 18px;
          color: rgba(255,255,255,0.5);
          max-width: 560px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }

        .ab-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 28px;
          background: #fff;
          color: #1a1a2e;
          border-radius: 11px;
          font-weight: 700;
          font-size: 14.5px;
          text-decoration: none;
          transition: box-shadow 0.15s, transform 0.1s;
        }

        .ab-hero-cta:hover {
          box-shadow: 0 6px 20px rgba(255,255,255,0.15);
          transform: translateY(-1px);
        }

        /* ── STORY ── */
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .story-grid { grid-template-columns: 1fr; }
        }

        .story-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #6366f1;
          margin-bottom: 12px;
        }

        .story-quote {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 16px;
          padding: 24px;
          position: relative;
        }

        .story-quote + .story-quote { margin-top: 14px; }

        .story-quote.accented { border-left: 3px solid #6366f1; padding-left: 22px; }

        .story-quote-icon {
          width: 28px; height: 28px;
          background: rgba(99,102,241,0.08);
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 12px;
        }

        .story-quote p {
          font-size: 14.5px;
          color: #666;
          line-height: 1.75;
          margin: 0;
        }

        .story-quote p strong { color: #6366f1; font-weight: 700; }

        /* Story right: founder card */
        .founder-card {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .founder-avatar {
          width: 60px; height: 60px;
          background: #1a1a2e;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
        }

        .founder-name {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #1a1a2e;
          margin: 0 0 4px;
        }

        .founder-role {
          font-size: 13px;
          color: #aaa;
          font-weight: 500;
        }

        .founder-divider {
          height: 1px;
          background: #f0ede9;
        }

        .founder-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .founder-stat {
          text-align: center;
          padding: 14px 10px;
          background: #fafaf9;
          border: 1px solid #f0ede9;
          border-radius: 11px;
        }

        .founder-stat-val {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #1a1a2e;
          line-height: 1;
          margin-bottom: 4px;
        }

        .founder-stat-label {
          font-size: 11px;
          color: #aaa;
          font-weight: 500;
        }

        /* ── HOW WE WORK ── */
        .process-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        @media (max-width: 720px) {
          .process-grid { grid-template-columns: 1fr; }
        }

        .process-card {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 18px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
          cursor: default;
        }

        .process-card:hover { transform: translateY(-2px); }

        .process-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .process-step-num {
          font-family: 'DM Serif Display', serif;
          font-size: 34px;
          color: #ece9e4;
          line-height: 1;
          letter-spacing: -1px;
          transition: color 0.2s;
        }

        .process-card.active .process-step-num { color: #d5d0c9; }

        .process-icon {
          width: 44px; height: 44px;
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s;
        }

        .process-card:hover .process-icon { transform: scale(1.08); }

        .process-title {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: #1a1a2e;
          margin: 0;
          letter-spacing: -0.2px;
        }

        .process-desc {
          font-size: 13.5px;
          color: #888;
          line-height: 1.7;
          margin: 0;
        }

        /* ── TRUST ── */
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        @media (max-width: 840px) {
          .trust-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
        }

        .trust-card {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 18px;
          padding: 26px 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: default;
        }

        .trust-card:hover { transform: translateY(-2px); }

        .trust-icon {
          width: 44px; height: 44px;
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
        }

        .trust-title {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: #1a1a2e;
          margin: 0;
        }

        .trust-desc {
          font-size: 13.5px;
          color: #888;
          line-height: 1.7;
          margin: 0;
        }

        /* ── CTA STRIP ── */
        .ab-cta {
          background: #1a1a2e;
          border-radius: 22px;
          padding: 52px 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 24px;
          position: relative;
          overflow: hidden;
        }

        .ab-cta::before {
          content: '';
          position: absolute;
          top: -80px; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%);
          pointer-events: none;
        }

        .ab-cta-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(28px, 3.5vw, 40px);
          color: #fff;
          margin: 0;
          position: relative;
          letter-spacing: -0.4px;
        }

        .ab-cta-heading em { font-style: italic; color: #a5b4fc; }

        .ab-cta-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.45);
          max-width: 400px;
          line-height: 1.65;
          margin: -8px 0 0;
          position: relative;
        }

        .ab-cta-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          position: relative;
        }

        .ab-cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: #fff;
          color: #1a1a2e;
          border-radius: 11px;
          font-weight: 700;
          font-size: 14.5px;
          text-decoration: none;
          transition: box-shadow 0.15s, transform 0.1s;
        }

        .ab-cta-btn-primary:hover {
          box-shadow: 0 6px 20px rgba(255,255,255,0.15);
          transform: translateY(-1px);
        }

        .ab-cta-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 11px;
          font-weight: 600;
          font-size: 14.5px;
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }

        .ab-cta-btn-ghost:hover {
          border-color: rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.05);
          color: #fff;
        }

        @media (max-width: 640px) {
          .ab-cta { padding: 36px 24px; }
          .ab-hero-inner { padding: 0 20px; }
        }
      `}</style>

      <div className="ab-root" ref={sectionRef}>

        {/* ── HERO ── */}
        <div className="ab-hero">
          <div className="ab-hero-blob ab-hero-blob-1" />
          <div className="ab-hero-blob ab-hero-blob-2" />
          <div className="ab-hero-inner" {...v('hero')}>
            <div className="ab-hero-badge">
              <div className="ab-hero-badge-icon">
                <Sparkles size={11} color="#fff" />
              </div>
              <span>Our mission &amp; story</span>
            </div>
            <h1 className="ab-hero-heading">
              Built for students,<br />
              <em>by students.</em>
            </h1>
            <p className="ab-hero-sub">
              We connect talented students with authentic internship opportunities — filtering the noise so you only see what's real.
            </p>
            <a href="/internships" className="ab-hero-cta">
              Browse Internships
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* ── OUR STORY ── */}
        <div className="ab-section">
          <div className="ab-inner">
            <div className="story-grid">
              {/* Left: quotes */}
              <div {...v('story-left')}>
                <p className="story-label">Founder's note</p>
                <h2 className="ab-heading" style={{ marginBottom: 28 }}>
                  Our <em>story</em>
                </h2>

                <div className="story-quote">
                  <div className="story-quote-icon">
                    <Quote size={14} color="#6366f1" />
                  </div>
                  <p>
                    I was endlessly scrolling through LinkedIn, Cuvette, Naukri, and countless other platforms, hoping to find genuine internships. But every time, I hit the same walls — outdated listings, fake posts, and opportunities that felt too good to be true.
                  </p>
                </div>

                <div className="story-quote" style={{ marginTop: 14 }}>
                  <p>
                    After yet another fruitless search, I realized there had to be a better way — a simple, trustworthy hub where students could discover real, verified opportunities without the noise.
                  </p>
                </div>

                <div className="story-quote accented" style={{ marginTop: 14 }}>
                  <p>
                    That spark became <strong>intellivibes</strong> — a platform dedicated to connecting students with verified internships so no one has to waste time chasing dead ends.
                  </p>
                </div>
              </div>

              {/* Right: founder stats card */}
              <div {...v('story-right', 100)}>
                <div className="founder-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div className="founder-avatar">
                      <Heart size={26} color="#fff" />
                    </div>
                    <div>
                      <p className="founder-name">intellivibes</p>
                      <p className="founder-role">Founded with a mission to help students</p>
                    </div>
                  </div>
                  <div className="founder-divider" />
                  <div className="founder-stats">
                    {[
                      { val: '120+', label: 'Active listings' },
                      { val: '15+', label: 'Partner companies' },
                      { val: '1k+', label: 'Community members' },
                    ].map((s) => (
                      <div key={s.label} className="founder-stat">
                        <div className="founder-stat-val">{s.val}</div>
                        <div className="founder-stat-label">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="founder-divider" />
                  {['Verified listings only', 'Direct company applications', 'Free forever'].map((f) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5, color: '#555', fontWeight: 500 }}>
                      <CheckCircle size={15} color="#22c55e" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── HOW WE WORK ── */}
        <div className="ab-section" style={{ background: '#fff' }}>
          <div className="ab-inner">
            <div  {...v('how-header')}>
              <div className="ab-badge">
                <div className="ab-badge-icon">
                  <Filter size={11} color="#fff" />
                </div>
                <span>Our process</span>
              </div>
              <h2 className="ab-heading">
                How we <em>work</em>
              </h2>
              <p className="ab-sub" style={{ maxWidth: 400, margin: '0 auto' }}>
                A systematic approach to deliver only the best, verified opportunities to you.
              </p>
            </div>

            <div className="process-grid" {...v('how-grid')}>
              {workProcess.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeProcess === index;

                return (
                  <div
                    key={index}
                    className={`process-card${isActive ? ' active' : ''}`}
                    style={{
                      borderColor: isActive ? step.accent : undefined,
                      boxShadow: isActive ? `0 8px 28px ${step.accentLight}` : undefined,
                    }}
                    onMouseEnter={() => setActiveProcess(index)}
                  >
                    <div className="process-card-top">
                      <span className="process-step-num">{step.step}</span>
                      <div
                        className="process-icon"
                        style={{ background: step.accentLight, border: `1.5px solid ${step.accentBorder}` }}
                      >
                        <Icon size={20} color={step.accent} />
                      </div>
                    </div>
                    <h3 className="process-title">{step.title}</h3>
                    <p className="process-desc">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── WHY TRUST US ── */}
        <div className="ab-section">
          <div className="ab-inner">
            <div  {...v('trust-header')}>
              <div className="ab-badge">
                <div className="ab-badge-icon">
                  <Shield size={11} color="#fff" />
                </div>
                <span>Why choose us</span>
              </div>
              <h2 className="ab-heading">
                Why trust <em>intellivibes?</em>
              </h2>
            </div>

            <div className="trust-grid" {...v('trust-grid')}>
              {trustFactors.map((factor, index) => {
                const Icon = factor.icon;
                return (
                  <div
                    key={index}
                    className="trust-card"
                    style={{ transitionDelay: `${index * 80}ms` }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = factor.accent;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px ${factor.accentLight}`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '';
                      (e.currentTarget as HTMLElement).style.boxShadow = '';
                    }}
                  >
                    <div
                      className="trust-icon"
                      style={{ background: factor.accentLight, border: `1.5px solid ${factor.accentBorder}` }}
                    >
                      <Icon size={20} color={factor.accent} />
                    </div>
                    <h3 className="trust-title">{factor.title}</h3>
                    <p className="trust-desc">{factor.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="ab-section" style={{ background: '#fff' }}>
          <div className="ab-inner">
            <div {...v('cta')}>
              <div className="ab-cta">
                <h3 className="ab-cta-heading">
                  Ready to find your <em>internship?</em>
                </h3>
                <p className="ab-cta-sub">
                  Join thousands of students who never miss a great opportunity.
                </p>
                <div className="ab-cta-buttons">
                  <a href="/internships" className="ab-cta-btn-primary">
                    Browse Internships
                    <ArrowRight size={16} />
                  </a>
                  <a href="/contact" className="ab-cta-btn-ghost">
                    Get in Touch
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    <Footer/>
    </>
  );
}