'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Heart,
  Users,
  ArrowRight,
  CheckCircle,
  XCircle,
  Lightbulb,
  Quote,
  Sparkles,
} from 'lucide-react';

const storySteps = [
  {
    icon: Search,
    title: 'The Endless Scroll',
    description: 'Scrolling through countless platforms with nothing to show.',
    accent: '#ef4444',
    accentLight: 'rgba(239,68,68,0.07)',
    accentBorder: 'rgba(239,68,68,0.15)',
  },
  {
    icon: XCircle,
    title: 'The Wall',
    description: 'Outdated listings, fake posts, dead ends everywhere.',
    accent: '#888',
    accentLight: 'rgba(120,120,120,0.07)',
    accentBorder: 'rgba(120,120,120,0.15)',
  },
  {
    icon: Lightbulb,
    title: 'The Spark',
    description: 'There had to be a better way to find real opportunities.',
    accent: '#f59e0b',
    accentLight: 'rgba(245,158,11,0.07)',
    accentBorder: 'rgba(245,158,11,0.15)',
  },
  {
    icon: Heart,
    title: 'intellivibes Born',
    description: 'A platform built for students, by students.',
    accent: '#6366f1',
    accentLight: 'rgba(99,102,241,0.08)',
    accentBorder: 'rgba(99,102,241,0.2)',
  },
];

export default function OurStory() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [currentStoryStep, setCurrentStoryStep] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target.getAttribute('data-element');
            if (el) setVisibleElements((prev) => new Set([...prev, el]));
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = sectionRef.current?.querySelectorAll('[data-element]');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryStep((prev) => (prev + 1) % storySteps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const vis = (key: string, delay = 0) => ({
    style: {
      opacity: visibleElements.has(key) ? 1 : 0,
      transform: visibleElements.has(key) ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    },
    'data-element': key,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');

        .os-section {
          font-family: 'DM Sans', sans-serif;
          background: #f7f5f2;
          padding: 100px 0 96px;
          position: relative;
          overflow: hidden;
        }

        .os-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1.5px;
          background: #e8e5e1;
        }

        /* Blob accents */
        .os-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.12;
          pointer-events: none;
        }

        .os-blob-1 { width: 480px; height: 480px; background: #6366f1; top: -120px; right: -120px; }
        .os-blob-2 { width: 360px; height: 360px; background: #a855f7; bottom: -80px; left: -80px; }

        .os-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .os-header {
          text-align: center;
          margin-bottom: 72px;
        }

        .os-badge {
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

        .os-badge-icon {
          width: 20px; height: 20px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        .os-badge span {
          font-size: 12.5px;
          font-weight: 500;
          color: #666;
        }

        .os-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(36px, 4.5vw, 52px);
          color: #1a1a2e;
          line-height: 1.1;
          letter-spacing: -0.5px;
          margin: 0 0 14px;
        }

        .os-heading em {
          font-style: italic;
          color: #6366f1;
        }

        .os-sub {
          font-size: 16px;
          color: #888;
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* Two-col layout */
        .os-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        @media (max-width: 960px) {
          .os-grid { grid-template-columns: 1fr; max-width: 600px; margin: 0 auto; }
          .os-inner { padding: 0 20px; }
        }

        /* Quote blocks */
        .os-quote-block {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 16px;
          padding: 24px;
          position: relative;
        }

        .os-quote-block + .os-quote-block { margin-top: 16px; }

        .os-quote-icon {
          width: 32px; height: 32px;
          background: rgba(99,102,241,0.08);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
        }

        .os-quote-text {
          font-size: 15px;
          color: #555;
          line-height: 1.75;
          margin: 0;
        }

        .os-quote-text strong {
          color: #6366f1;
          font-weight: 700;
        }

        /* Left accent bar */
        .os-quote-block.accented {
          border-left: 3px solid #6366f1;
          padding-left: 22px;
        }

        /* Right column */
        .os-right {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Journey card */
        .os-journey-card {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 18px;
          overflow: hidden;
        }

        .os-journey-header {
          padding: 18px 22px;
          border-bottom: 1.5px solid #f0ede9;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .os-journey-title {
          font-family: 'DM Serif Display', serif;
          font-size: 18px;
          color: #1a1a2e;
        }

        .os-progress-dots {
          display: flex;
          gap: 5px;
        }

        .os-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #e5e3df;
          transition: background 0.3s, transform 0.3s;
        }

        .os-dot.active {
          background: #6366f1;
          transform: scale(1.3);
        }

        .os-journey-list {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .os-step-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 11px;
          border: 1.5px solid transparent;
          transition: border-color 0.3s, background 0.3s;
        }

        .os-step-row.active {
          border-color: var(--accent-border);
          background: var(--accent-light);
        }

        .os-step-icon {
          width: 38px; height: 38px;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background 0.3s;
        }

        .os-step-info { flex: 1; min-width: 0; }

        .os-step-title {
          font-size: 13.5px;
          font-weight: 600;
          color: #1a1a2e;
        }

        .os-step-desc {
          font-size: 12px;
          color: #aaa;
          margin-top: 1px;
        }

        .os-step-check {
          flex-shrink: 0;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .os-step-row.active .os-step-check { opacity: 1; }

        /* Mission card */
        .os-mission {
          background: #1a1a2e;
          border-radius: 18px;
          padding: 28px;
          position: relative;
          overflow: hidden;
        }

        .os-mission::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%);
          pointer-events: none;
        }

        .os-mission-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 10px;
        }

        .os-mission-title {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          color: #fff;
          margin: 0 0 12px;
          position: relative;
        }

        .os-mission-text {
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          margin: 0 0 22px;
          position: relative;
        }

        .os-mission-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          background: #fff;
          color: #1a1a2e;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13.5px;
          text-decoration: none;
          transition: box-shadow 0.15s, transform 0.1s;
          position: relative;
        }

        .os-mission-cta:hover {
          box-shadow: 0 4px 16px rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }
      `}</style>

      <section ref={sectionRef} className="os-section" id="our-story">
        <div className="os-blob os-blob-1" />
        <div className="os-blob os-blob-2" />

        <div className="os-inner">

          {/* Header */}
          <div className="os-header" {...vis('header')}>
            <div className="os-badge">
              <div className="os-badge-icon">
                <Sparkles size={11} color="#fff" />
              </div>
              <span>Our journey</span>
            </div>
            <h2 className="os-heading">
              Our <em>story</em>
            </h2>
            <p className="os-sub">
              From frustration to innovation — how intellivibes came to life.
            </p>
          </div>

          {/* Body */}
          <div className="os-grid">

            {/* LEFT — quote blocks */}
            <div>
              <div {...vis('para1')}>
                <div className="os-quote-block">
                  <div className="os-quote-icon">
                    <Quote size={15} color="#6366f1" />
                  </div>
                  <p className="os-quote-text">
                    I was endlessly scrolling through LinkedIn, Cuvette, Naukri, and countless other platforms, hoping to find genuine internships. But every time, I hit the same walls — outdated listings, fake posts, and opportunities that felt too good to be true.
                  </p>
                </div>
              </div>

              <div style={{ height: 16 }} />

              <div {...vis('para2', 100)}>
                <div className="os-quote-block">
                  <p className="os-quote-text">
                    After yet another fruitless search, I realized there had to be a better way — a simple, trustworthy hub where students could discover real, verified opportunities without the noise.
                  </p>
                </div>
              </div>

              <div style={{ height: 16 }} />

              <div {...vis('para3', 200)}>
                <div className="os-quote-block accented">
                  <p className="os-quote-text">
                    That spark became <strong>intellivibes</strong> — a platform dedicated to connecting students with verified internships so no one has to waste time chasing dead ends.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — journey + mission */}
            <div className="os-right">

              {/* Journey card */}
              <div {...vis('timeline', 80)}>
                <div className="os-journey-card">
                  <div className="os-journey-header">
                    <span className="os-journey-title">The Journey</span>
                    <div className="os-progress-dots">
                      {storySteps.map((_, i) => (
                        <div key={i} className={`os-dot${currentStoryStep === i ? ' active' : ''}`} />
                      ))}
                    </div>
                  </div>

                  <div className="os-journey-list">
                    {storySteps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = currentStoryStep === index;

                      return (
                        <div
                          key={index}
                          className={`os-step-row${isActive ? ' active' : ''}`}
                          style={{
                            '--accent-light': step.accentLight,
                            '--accent-border': step.accentBorder,
                          } as React.CSSProperties}
                        >
                          <div
                            className="os-step-icon"
                            style={{ background: isActive ? step.accentLight : '#f7f5f2' }}
                          >
                            <Icon size={17} color={isActive ? step.accent : '#bbb'} />
                          </div>
                          <div className="os-step-info">
                            <div className="os-step-title">{step.title}</div>
                            <div className="os-step-desc">{step.description}</div>
                          </div>
                          <div className="os-step-check">
                            <CheckCircle size={16} color={step.accent} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mission card */}
              <div {...vis('mission', 160)}>
                <div className="os-mission">
                  <p className="os-mission-label">Our Mission</p>
                  <h3 className="os-mission-title">Built for students,<br />by students.</h3>
                  <p className="os-mission-text">
                    To eliminate the frustration of job hunting by providing a curated, verified platform where students can discover genuine opportunities — effortlessly.
                  </p>
                  <a
                    href="https://t.me/intellivibes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="os-mission-cta"
                  >
                    <Users size={15} />
                    Join Our Community
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}