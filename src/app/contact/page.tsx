'use client';

import { useState, useRef } from 'react';
import {
  Mail, MapPin, Users, Send, CheckCircle,
  MessageCircle, Linkedin, ArrowRight, Loader2, Phone,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'internvibesofficial@gmail.com',
    href: 'mailto:internvibesofficial@gmail.com',
    accent: '#6366f1',
    accentLight: 'rgba(99,102,241,0.07)',
    accentBorder: 'rgba(99,102,241,0.18)',
  },
  {
    icon: MessageCircle,
    title: 'Telegram',
    content: '@InternVibes',
    href: 'https://t.me/InternVibes',
    accent: '#0ea5e9',
    accentLight: 'rgba(14,165,233,0.07)',
    accentBorder: 'rgba(14,165,233,0.18)',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    content: '/company/internvibes',
    href: 'https://linkedin.com/company/internvibes',
    accent: '#2563eb',
    accentLight: 'rgba(37,99,235,0.07)',
    accentBorder: 'rgba(37,99,235,0.18)',
  },
  {
    icon: MapPin,
    title: 'Location',
    content: 'India',
    href: null,
    accent: '#10b981',
    accentLight: 'rgba(16,185,129,0.07)',
    accentBorder: 'rgba(16,185,129,0.18)',
  },
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: name,
          to_name: 'Kunwar',
          from_email: email,
          to_email: 'internvibesofficial@gmail.com',
          message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setSubmitted(false), 6000);
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        setIsSubmitting(false);
        setError('Something went wrong. Please try again.');
      });
  };

  return (
    <>
    <Navbar/>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');

        .ct-root {
          font-family: 'DM Sans', sans-serif;
          background: #f7f5f2;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Hero ── */
        .ct-hero {
          background: #1a1a2e;
          position: relative;
          overflow: hidden;
          padding: 100px 0 80px;
        }

        .ct-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .ct-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        .ct-blob-1 { width: 500px; height: 500px; background: rgba(99,102,241,0.2); top: -160px; right: -80px; }
        .ct-blob-2 { width: 360px; height: 360px; background: rgba(168,85,247,0.14); bottom: -80px; left: -60px; }

        .ct-hero-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .ct-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          padding: 5px 14px 5px 8px;
          margin-bottom: 22px;
        }

        .ct-hero-badge-icon {
          width: 20px; height: 20px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        .ct-hero-badge span {
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
        }

        .ct-hero-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(38px, 5.5vw, 64px);
          color: #fff;
          line-height: 1.08;
          letter-spacing: -1px;
          margin: 0 0 18px;
        }

        .ct-hero-heading em { font-style: italic; color: #a5b4fc; }

        .ct-hero-sub {
          font-size: 17px;
          color: rgba(255,255,255,0.45);
          max-width: 440px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── Body ── */
        .ct-body {
          max-width: 1280px;
          margin: 0 auto;
          padding: 64px 48px 96px;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .ct-body { grid-template-columns: 1fr; }
          .ct-body { padding: 48px 24px 72px; }
          .ct-hero-inner { padding: 0 24px; }
        }

        /* ── Form card ── */
        .ct-form-card {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 22px;
          padding: 40px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }

        .ct-form-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 32px;
        }

        .ct-form-icon {
          width: 44px; height: 44px;
          background: #1a1a2e;
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .ct-form-title {
          font-family: 'DM Serif Display', serif;
          font-size: 24px;
          color: #1a1a2e;
          margin: 0;
          letter-spacing: -0.2px;
        }

        .ct-form-subtitle {
          font-size: 13px;
          color: #aaa;
          margin: 3px 0 0;
        }

        /* Inputs */
        .ct-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        @media (max-width: 600px) {
          .ct-row { grid-template-columns: 1fr; }
          .ct-form-card { padding: 24px; }
        }

        .ct-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .ct-field label {
          font-size: 12.5px;
          font-weight: 500;
          color: #555;
          letter-spacing: 0.2px;
        }

        .ct-input-wrap {
          position: relative;
        }

        .ct-input,
        .ct-textarea {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid #e5e3df;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1a1a2e;
          background: #fff;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
        }

        .ct-input::placeholder,
        .ct-textarea::placeholder { color: #c0bcb6; }

        .ct-input:focus,
        .ct-textarea:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        .ct-textarea {
          resize: none;
          min-height: 130px;
          line-height: 1.6;
        }

        /* Submit button */
        .ct-submit {
          width: 100%;
          padding: 13px 24px;
          background: #1a1a2e;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
          margin-top: 8px;
        }

        .ct-submit:hover:not(:disabled) {
          background: #252545;
          box-shadow: 0 6px 20px rgba(26,26,46,0.22);
          transform: translateY(-1px);
        }

        .ct-submit:active:not(:disabled) { transform: translateY(0); }

        .ct-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .spinner { animation: spin 0.8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* Success & error */
        .ct-success {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #f0fdf4;
          border: 1.5px solid #bbf7d0;
          border-radius: 12px;
          padding: 14px 16px;
          margin-top: 14px;
        }

        .ct-success p {
          font-size: 14px;
          color: #166534;
          line-height: 1.5;
          margin: 0;
        }

        .ct-error {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: #fff1f0;
          border: 1px solid #fecdca;
          border-radius: 10px;
          padding: 11px 14px;
          margin-top: 12px;
          font-size: 13.5px;
          color: #c0392b;
        }

        /* ── Sidebar ── */
        .ct-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Info card */
        .ct-info-card {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }

        .ct-info-header {
          background: #1a1a2e;
          padding: 20px 22px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ct-info-header-icon {
          width: 36px; height: 36px;
          background: rgba(99,102,241,0.25);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
        }

        .ct-info-header-text {
          font-family: 'DM Serif Display', serif;
          font-size: 17px;
          color: #fff;
        }

        .ct-info-list {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ct-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 11px;
          border: 1.5px solid transparent;
          transition: border-color 0.2s, background 0.2s;
          text-decoration: none;
          cursor: default;
        }

        a.ct-info-row { cursor: pointer; }

        a.ct-info-row:hover {
          background: var(--accent-light);
          border-color: var(--accent-border);
        }

        .ct-info-icon {
          width: 38px; height: 38px;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s;
        }

        a.ct-info-row:hover .ct-info-icon { transform: scale(1.08); }

        .ct-info-title {
          font-size: 12px;
          font-weight: 600;
          color: #aaa;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }

        .ct-info-content {
          font-size: 13.5px;
          font-weight: 500;
          color: #1a1a2e;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .ct-info-arrow {
          opacity: 0;
          transition: opacity 0.15s;
          margin-left: 2px;
        }

        a.ct-info-row:hover .ct-info-arrow { opacity: 1; }

        /* Response time card */
        .ct-response-card {
          background: #1a1a2e;
          border-radius: 18px;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .ct-response-card::before {
          content: '';
          position: absolute;
          top: -50px; right: -50px;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
          pointer-events: none;
        }

        .ct-response-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 8px;
        }

        .ct-response-title {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: #fff;
          margin: 0 0 8px;
          position: relative;
        }

        .ct-response-text {
          font-size: 13.5px;
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
          margin: 0;
          position: relative;
        }

        .ct-response-dots {
          display: flex;
          gap: 6px;
          margin-top: 16px;
          position: relative;
        }

        .ct-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
        }
      `}</style>

      <div className="ct-root">
        {/* Hero */}
        <div className="ct-hero">
          <div className="ct-blob ct-blob-1" />
          <div className="ct-blob ct-blob-2" />
          <div className="ct-hero-inner">
            <div className="ct-hero-badge">
              <div className="ct-hero-badge-icon">
                <Mail size={11} color="#fff" />
              </div>
              <span>We'd love to hear from you</span>
            </div>
            <h1 className="ct-hero-heading">
              Let's <em>connect</em><br />and build together.
            </h1>
            <p className="ct-hero-sub">
              Have a question, feedback, or want to partner with InternVibes? We're just a message away.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="ct-body">

          {/* Form */}
          <div className="ct-form-card">
            <div className="ct-form-header">
              <div className="ct-form-icon">
                <Send size={18} color="#fff" />
              </div>
              <div>
                <h2 className="ct-form-title">Send us a message</h2>
                <p className="ct-form-subtitle">We typically respond within 24 hours.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="ct-row">
                <div className="ct-field" style={{ margin: 0 }}>
                  <label>Your name</label>
                  <input
                    className="ct-input"
                    type="text"
                    placeholder="Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="ct-field" style={{ margin: 0 }}>
                  <label>Email address</label>
                  <input
                    className="ct-input"
                    type="email"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="ct-field">
                <label>Message</label>
                <textarea
                  className="ct-textarea"
                  placeholder="Tell us how we can help, or share your feedback..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="ct-error">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e74c3c', flexShrink: 0, marginTop: 6 }} />
                  {error}
                </div>
              )}

              <button type="submit" className="ct-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 size={17} className="spinner" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              {submitted && (
                <div className="ct-success">
                  <CheckCircle size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: 1 }} />
                  <p>
                    <strong>Message sent!</strong> Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Sidebar */}
          <div className="ct-sidebar">

            {/* Contact info card */}
            <div className="ct-info-card">
              <div className="ct-info-header">
                <div className="ct-info-header-icon">
                  <Users size={16} color="#a5b4fc" />
                </div>
                <span className="ct-info-header-text">Connect with us</span>
              </div>

              <div className="ct-info-list">
                {contactInfo.map((info, i) => {
                  const Icon = info.icon;
                  const Tag = info.href ? 'a' : 'div';
                  const props: any = info.href
                    ? { href: info.href, target: '_blank', rel: 'noopener noreferrer' }
                    : {};

                  return (
                    <Tag
                      key={i}
                      {...props}
                      className="ct-info-row"
                      style={{
                        '--accent-light': info.accentLight,
                        '--accent-border': info.accentBorder,
                      } as React.CSSProperties}
                    >
                      <div
                        className="ct-info-icon"
                        style={{
                          background: info.accentLight,
                          border: `1.5px solid ${info.accentBorder}`,
                        }}
                      >
                        <Icon size={17} color={info.accent} />
                      </div>
                      <div>
                        <div className="ct-info-title">{info.title}</div>
                        <div className="ct-info-content">
                          {info.content}
                          {info.href && <ArrowRight size={12} className="ct-info-arrow" color={info.accent} />}
                        </div>
                      </div>
                    </Tag>
                  );
                })}
              </div>
            </div>

            {/* Response time card */}
            <div className="ct-response-card">
              <p className="ct-response-label">Response time</p>
              <h3 className="ct-response-title">We reply fast.</h3>
              <p className="ct-response-text">
                Most messages are answered within 24 hours. For urgent queries, reach us directly on Telegram.
              </p>
              <div className="ct-response-dots">
                {[
                  { color: '#6366f1', label: 'Email — 24h' },
                  { color: '#0ea5e9', label: 'Telegram — 2h' },
                  { color: '#10b981', label: 'LinkedIn — 48h' },
                ].map((d) => (
                  <div
                    key={d.label}
                    title={d.label}
                    className="ct-dot"
                    style={{ background: d.color }}
                  />
                ))}
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginLeft: 6 }}>
                  Avg. response indicators
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    <Footer/>
    </>
  );
}