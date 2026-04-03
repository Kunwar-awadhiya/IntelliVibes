'use client';

import React, { useState } from 'react';
import { Search, MousePointer, TrendingUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Browse verified internships from top companies across multiple platforms — all curated in one place.',
    icon: Search,
    accent: '#6366f1',
    accentLight: 'rgba(99,102,241,0.08)',
    accentBorder: 'rgba(99,102,241,0.18)',
  },
  {
    number: '02',
    title: 'Apply',
    description: 'One-click application takes you directly to verified company portals. No middlemen, no friction.',
    icon: MousePointer,
    accent: '#0ea5e9',
    accentLight: 'rgba(14,165,233,0.08)',
    accentBorder: 'rgba(14,165,233,0.18)',
  },
  {
    number: '03',
    title: 'Grow',
    description: 'Build your portfolio, gain real experience, and accelerate your career trajectory from day one.',
    icon: TrendingUp,
    accent: '#10b981',
    accentLight: 'rgba(16,185,129,0.08)',
    accentBorder: 'rgba(16,185,129,0.18)',
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');

        .hiw-section {
          font-family: 'DM Sans', sans-serif;
          background: #f7f5f2;
          padding: 100px 0 96px;
          position: relative;
          overflow: hidden;
        }

        /* Subtle top separator */
        .hiw-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1.5px;
          background: #e8e5e1;
        }

        /* Faint grid pattern */
        .hiw-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .hiw-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .hiw-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 72px;
        }

        .hiw-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #f7f5f2;
          border: 1.5px solid #e5e3df;
          border-radius: 999px;
          padding: 5px 14px 5px 8px;
          margin-bottom: 20px;
        }

        .hiw-badge-num {
          width: 20px; height: 20px;
          background: #1a1a2e;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: #fff;
        }

        .hiw-badge span {
          font-size: 12.5px;
          font-weight: 500;
          color: #666;
        }

        .hiw-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(36px, 4.5vw, 52px);
          color: #1a1a2e;
          line-height: 1.1;
          letter-spacing: -0.5px;
          margin: 0 0 14px;
        }

        .hiw-heading em {
          font-style: italic;
          color: #6366f1;
        }

        .hiw-sub {
          font-size: 16px;
          color: #888;
          max-width: 380px;
          line-height: 1.65;
          margin: 0;
        }

        /* Steps grid */
        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          position: relative;
        }

        /* Connector line between cards */
        .hiw-connector {
          position: absolute;
          top: 68px;
          left: calc(33.33% - 12px);
          right: calc(33.33% - 12px);
          display: none;
          pointer-events: none;
          justify-content: space-between;
        }

        @media (min-width: 1024px) {
          .hiw-connector { display: flex; }
        }

        .hiw-connector-line {
          flex: 1;
          height: 1.5px;
          background: linear-gradient(90deg, #e5e3df 0%, #e5e3df 45%, transparent 100%);
          margin-top: 1px;
          position: relative;
        }

        .hiw-connector-line::after {
          content: '→';
          position: absolute;
          right: -10px;
          top: -9px;
          font-size: 12px;
          color: #ccc;
        }

        /* Card */
        .hiw-card {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 20px;
          padding: 28px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
          cursor: default;
        }

        .hiw-card:hover {
          transform: translateY(-3px);
        }

        /* Card top row */
        .hiw-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .hiw-step-num {
          font-family: 'DM Serif Display', serif;
          font-size: 36px;
          color: #ece9e4;
          line-height: 1;
          letter-spacing: -1px;
          transition: color 0.2s;
        }

        .hiw-card:hover .hiw-step-num {
          color: #d5d0c9;
        }

        .hiw-icon-wrap {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s;
        }

        .hiw-card:hover .hiw-icon-wrap {
          transform: scale(1.08);
        }

        /* Content */
        .hiw-card-content { flex: 1; }

        .hiw-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          color: #1a1a2e;
          margin: 0 0 10px;
          letter-spacing: -0.2px;
        }

        .hiw-card-desc {
          font-size: 14px;
          color: #888;
          line-height: 1.7;
          margin: 0;
        }

        /* Card footer */
        .hiw-card-footer {
          padding-top: 14px;
          border-top: 1px solid #f0ede9;
        }

        .hiw-learn-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1.5px solid;
          transition: background 0.15s, box-shadow 0.15s;
        }

        /* Bottom CTA strip */
        .hiw-cta {
          margin-top: 64px;
          background: #1a1a2e;
          border-radius: 20px;
          padding: 40px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          position: relative;
          overflow: hidden;
        }

        .hiw-cta::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 240px; height: 240px;
          background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
          pointer-events: none;
        }

        .hiw-cta-left { position: relative; z-index: 1; }

        .hiw-cta-title {
          font-family: 'DM Serif Display', serif;
          font-size: 26px;
          color: #fff;
          margin: 0 0 6px;
          letter-spacing: -0.3px;
        }

        .hiw-cta-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          margin: 0;
        }

        .hiw-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: #fff;
          color: #1a1a2e;
          border-radius: 11px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          white-space: nowrap;
          transition: box-shadow 0.15s, transform 0.1s;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }

        .hiw-cta-btn:hover {
          box-shadow: 0 6px 20px rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }

        @media (max-width: 1024px) {
          .hiw-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
        }

        @media (max-width: 640px) {
          .hiw-inner { padding: 0 20px; }
          .hiw-cta { flex-direction: column; align-items: flex-start; padding: 28px 24px; }
        }
      `}</style>

      <section id="how-it-works" className="hiw-section">
        <div className="hiw-inner">

          {/* Header */}
          <div className="hiw-header">
            <div className="hiw-badge">
              <div className="hiw-badge-num">3</div>
              <span>Simple steps to get started</span>
            </div>
            <h2 className="hiw-heading">
              How it <em>works</em>
            </h2>
            <p className="hiw-sub">
              From discovery to your first day — we make the process straightforward.
            </p>
          </div>

          {/* Steps */}
          <div className="hiw-grid">
            {/* Connector */}
            <div className="hiw-connector">
              <div className="hiw-connector-line" />
              <div style={{ width: 48 }} />
              <div className="hiw-connector-line" />
            </div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <div
                  key={step.number}
                  className="hiw-card"
                  style={{
                    borderColor: isActive ? step.accent : undefined,
                    boxShadow: isActive ? `0 8px 32px ${step.accentLight}` : undefined,
                  }}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Top row: big muted number + icon */}
                  <div className="hiw-card-top">
                    <span className="hiw-step-num">{step.number}</span>
                    <div
                      className="hiw-icon-wrap"
                      style={{ background: step.accentLight, border: `1.5px solid ${step.accentBorder}` }}
                    >
                      <Icon size={22} color={step.accent} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="hiw-card-content">
                    <h3 className="hiw-card-title">{step.title}</h3>
                    <p className="hiw-card-desc">{step.description}</p>
                  </div>

                  {/* Footer link */}
                  <div className="hiw-card-footer">
                    <a
                      href="/internships"
                      className="hiw-learn-btn"
                      style={{
                        color: step.accent,
                        borderColor: step.accentBorder,
                        background: step.accentLight,
                      }}
                    >
                      Learn more
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA strip */}
          <div className="hiw-cta">
            <div className="hiw-cta-left">
              <p className="hiw-cta-title">Ready to find your internship?</p>
              <p className="hiw-cta-sub">Join hundreds of students already using intellivibes.</p>
            </div>
            <a href="/internships" className="hiw-cta-btn">
              Browse Internships
              <ArrowRight size={16} />
            </a>
          </div>

        </div>
      </section>
    </>
  );
}