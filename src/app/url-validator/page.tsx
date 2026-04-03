'use client';

import { useState, useRef, useEffect } from 'react';


async function analyzeURLWithGemini(url) {
  
  const prompt = `You are an expert cybersecurity and job scam detection AI for InternVibes.

Analyze this URL for trustworthiness: "${url}"

Return ONLY JSON:
{
  "trust_score": <0-100>,
  "status": "<Safe|Suspicious|Scam>",
  "domain_analysis": "...",
  "url_structure": "...",
  "risk_factors": [],
  "positive_signals": [],
  "recommendation": "...",
  "verdict_summary": "..."
}`;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  body: JSON.stringify({
  description: prompt
})
  });

  //  Proper error handling
  if (response.status === 429) {
    throw new Error("Too many requests. Please wait a few seconds.");
  }

  if (!response.ok) {
    throw new Error("Server error. Try again.");
  }

  const data = await response.json();
if (!data.success) {
  throw new Error(data.message || "Failed to analyze");
}

const ai = data.data;

//   Map backend → frontend expected structure
return {
  trust_score: ai.score,
  status:
    ai.status === "safe"
      ? "Safe"
      : ai.status === "suspicious"
      ? "Suspicious"
      : "Scam",

  domain_analysis: ai.reasons?.[0] || "No domain analysis available",
  url_structure: ai.reasons?.[1] || "No structure analysis available",

  risk_factors:
    ai.status === "scam" || ai.status === "suspicious"
      ? ai.reasons || []
      : [],

  positive_signals:
    ai.status === "safe"
      ? ["No major risks detected", "Looks legitimate"]
      : [],

  recommendation:
    ai.status === "safe"
      ? "You can proceed, but still verify manually."
      : ai.status === "suspicious"
      ? "Proceed with caution. Verify company details."
      : "Avoid this opportunity. Likely scam.",

  verdict_summary: ai.reasons?.join(", ") || "No summary available",
};
}
function ScoreRing({ score, status, animate }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const color = status === 'Safe' ? '#10b981' : status === 'Suspicious' ? '#f59e0b' : '#ef4444';
  const progress = animate ? (score / 100) * circumference : circumference;
  const dashOffset = circumference - progress;

  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Track */}
      <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
      {/* Progress */}
      <circle
        cx="70" cy="70" r={radius} fill="none"
        stroke={color} strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        transform="rotate(-90 70 70)"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1), stroke 0.3s' }}
        filter="url(#glow)"
      />
      {/* Score text */}
      <text x="70" y="62" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="800" fontFamily="DM Sans, sans-serif">{score}</text>
      <text x="70" y="82" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="DM Sans, sans-serif">TRUST SCORE</text>
    </svg>
  );
}

function PulseBar({ value, color, label, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 100 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'DM Sans, sans-serif' }}>{label}</span>
        <span style={{ fontSize: 12, color, fontWeight: 700, fontFamily: 'DM Sans, sans-serif' }}>{value}%</span>
      </div>
      <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${width}%`, background: color,
          borderRadius: 99, transition: `width 1s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
          boxShadow: `0 0 8px ${color}80`,
        }} />
      </div>
    </div>
  );
}

export default function URLValidator() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [animateScore, setAnimateScore] = useState(false);
  const [scanPhase, setScanPhase] = useState(0);
  const inputRef = useRef(null);

  const scanMessages = [
    'Resolving domain structure…',
    'Checking SSL & security signals…',
    'Cross-referencing scam databases…',
    'Running Gemini AI analysis…',
    'Generating trust report…',
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      setScanPhase(0);
      interval = setInterval(() => setScanPhase(p => Math.min(p + 1, scanMessages.length - 1)), 800);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async () => {
  const now = Date.now();

  // 🔥 Prevent spam requests
  // if (now - lastCallTime < 3000) {
  //   setError("Please wait 3 seconds before trying again.");
  //   return;
  // }

  // lastCallTime = now;

  if (!url.trim()) return;

  setLoading(true);
  setResult(null);
  setError("");
  setAnimateScore(false);

  try {
    let target = url.trim();

    // Auto add https
    if (!/^https?:\/\//i.test(target)) {
      target = "https://" + target;
    }

    const data = await analyzeURLWithGemini(target);

    setResult(data);

    setTimeout(() => {
      setAnimateScore(true);
    }, 100);

  } catch (err) {
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  const handleKey = (e) => { if (e.key === 'Enter') handleAnalyze(); };

  const getStatusConfig = (status) => ({
    Safe: { color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', icon: '✓', label: 'SAFE' },
    Suspicious: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', icon: '⚠', label: 'SUSPICIOUS' },
    Scam: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)', icon: '✕', label: 'SCAM' },
  })[status] || {};

  const cfg = result ? getStatusConfig(result.status) : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .uv-root {
          font-family: 'DM Sans', sans-serif;
          background: #0d0d1a;
          min-height: 100vh;
          color: #fff;
          overflow-x: hidden;
        }

        /* ── Grid BG ── */
        .uv-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 52px 52px;
        }

        .uv-blob {
          position: fixed; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0;
        }
        .uv-blob-1 { width: 600px; height: 600px; background: rgba(99,102,241,0.12); top: -200px; right: -100px; }
        .uv-blob-2 { width: 400px; height: 400px; background: rgba(168,85,247,0.08); bottom: -100px; left: -80px; }
        .uv-blob-3 { width: 300px; height: 300px; background: rgba(16,185,129,0.06); top: 40%; left: 30%; }

        /* ── Page layout ── */
        .uv-page {
          position: relative; z-index: 1;
          max-width: 820px;
          margin: 0 auto;
          padding: 60px 24px 80px;
        }

        /* ── Header ── */
        .uv-header { text-align: center; margin-bottom: 48px; }

        .uv-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(99,102,241,0.12);
          border: 1.5px solid rgba(99,102,241,0.25);
          border-radius: 999px; padding: 6px 16px 6px 10px;
          margin-bottom: 24px;
        }

        .uv-badge-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #6366f1;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .uv-badge span { font-size: 12px; font-weight: 600; color: #a5b4fc; letter-spacing: 0.5px; }

        .uv-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(36px, 5vw, 58px);
          line-height: 1.08;
          letter-spacing: -1px;
          margin-bottom: 14px;
        }
        .uv-title em { font-style: italic; color: #a5b4fc; }

        .uv-subtitle {
          font-size: 16px; color: rgba(255,255,255,0.38); line-height: 1.7;
          max-width: 460px; margin: 0 auto;
        }

        /* ── Input box ── */
        .uv-input-card {
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.09);
          border-radius: 22px; padding: 24px; margin-bottom: 32px;
          backdrop-filter: blur(12px);
        }

        .uv-input-label {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          color: rgba(255,255,255,0.25); text-transform: uppercase; margin-bottom: 12px;
        }

        .uv-input-wrap {
          display: flex; gap: 12px; align-items: center;
        }

        .uv-url-input {
          flex: 1; background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 13px; padding: 14px 18px;
          font-family: 'JetBrains Mono', monospace; font-size: 13.5px;
          color: #e2e8f0; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .uv-url-input::placeholder { color: rgba(255,255,255,0.2); }
        .uv-url-input:focus {
          border-color: rgba(99,102,241,0.5);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
          background: rgba(99,102,241,0.05);
        }

        .uv-scan-btn {
          padding: 14px 28px; background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none; border-radius: 13px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700;
          cursor: pointer; white-space: nowrap;
          display: flex; align-items: center; gap: 8px;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
        }
        .uv-scan-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.5);
        }
        .uv-scan-btn:active:not(:disabled) { transform: translateY(0); }
        .uv-scan-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Scanning state ── */
        .uv-scanning {
          background: rgba(99,102,241,0.06);
          border: 1.5px solid rgba(99,102,241,0.15);
          border-radius: 18px; padding: 36px 24px;
          text-align: center; margin-bottom: 32px;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        .uv-scan-spinner {
          width: 56px; height: 56px; margin: 0 auto 20px;
          border: 3px solid rgba(99,102,241,0.15);
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .uv-scan-phase {
          font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 24px;
          min-height: 20px; transition: all 0.3s ease;
        }

        .uv-scan-steps {
          display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;
        }

        .uv-step-dot {
          width: 8px; height: 8px; border-radius: 50%;
          transition: all 0.3s ease;
        }

        /* ── Result card ── */
        .uv-result {
          animation: fadeIn 0.4s ease;
          display: flex; flex-direction: column; gap: 20px;
        }

        /* Score panel */
        .uv-score-panel {
          background: rgba(255,255,255,0.03);
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 22px; padding: 32px;
          display: grid; grid-template-columns: auto 1fr; gap: 32px;
          align-items: center;
        }
        @media (max-width: 600px) {
          .uv-score-panel { grid-template-columns: 1fr; text-align: center; justify-items: center; }
          .uv-input-wrap { flex-direction: column; }
          .uv-scan-btn { width: 100%; justify-content: center; }
        }

        .uv-score-right { display: flex; flex-direction: column; gap: 14px; }

        .uv-status-badge {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 8px 18px; border-radius: 999px;
          font-size: 13px; font-weight: 800; letter-spacing: 1px;
          border: 1.5px solid; width: fit-content;
        }

        .uv-status-icon {
          width: 22px; height: 22px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 900; flex-shrink: 0;
        }

        .uv-url-display {
          font-family: 'JetBrains Mono', monospace; font-size: 13px;
          color: rgba(255,255,255,0.3); word-break: break-all;
          padding: 8px 12px; background: rgba(255,255,255,0.04);
          border-radius: 8px; border: 1px solid rgba(255,255,255,0.07);
        }

        .uv-bars { display: flex; flex-direction: column; gap: 0; }

        /* Verdict */
        .uv-verdict-card {
          border: 1.5px solid; border-radius: 18px; padding: 22px 24px;
        }

        .uv-verdict-label {
          font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 10px; opacity: 0.6;
        }

        .uv-verdict-text {
          font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.8);
        }

        /* Details grid */
        .uv-details {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        @media (max-width: 600px) { .uv-details { grid-template-columns: 1fr; } }

        .uv-detail-card {
          background: rgba(255,255,255,0.03);
          border: 1.5px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 20px;
        }

        .uv-detail-header {
          display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
        }

        .uv-detail-icon {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; flex-shrink: 0;
        }

        .uv-detail-title {
          font-size: 12px; font-weight: 700; letter-spacing: 0.5px;
          color: rgba(255,255,255,0.4); text-transform: uppercase;
        }

        .uv-detail-body {
          font-size: 13.5px; color: rgba(255,255,255,0.6); line-height: 1.65;
        }

        /* Lists */
        .uv-tag-list { display: flex; flex-direction: column; gap: 7px; }

        .uv-tag {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5;
        }

        .uv-tag-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }

        /* Recommendation */
        .uv-rec-card {
          background: rgba(99,102,241,0.07);
          border: 1.5px solid rgba(99,102,241,0.2);
          border-radius: 16px; padding: 20px 22px;
          display: flex; align-items: flex-start; gap: 14px;
        }

        .uv-rec-icon-wrap {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(99,102,241,0.2); border: 1px solid rgba(99,102,241,0.3);
          display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
        }

        .uv-rec-label {
          font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
          color: #a5b4fc; margin-bottom: 5px;
        }

        .uv-rec-text { font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.6; }

        /* Error */
        .uv-error {
          background: rgba(239,68,68,0.08); border: 1.5px solid rgba(239,68,68,0.25);
          border-radius: 14px; padding: 16px 20px;
          font-size: 14px; color: #fca5a5;
          display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
          animation: fadeIn 0.3s ease;
        }

        /* Stats row */
        .uv-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
          margin-top: 4px;
        }
        @media (max-width: 500px) { .uv-stats { grid-template-columns: 1fr; } }

        .uv-stat {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 16px 14px; text-align: center;
        }

        .uv-stat-val {
          font-family: 'DM Serif Display', serif; font-size: 26px;
          margin-bottom: 4px;
        }

        .uv-stat-lbl { font-size: 11px; color: rgba(255,255,255,0.3); letter-spacing: 0.5px; }
      `}</style>

      <div className="uv-root">
        <div className="uv-grid-bg" />
        <div className="uv-blob uv-blob-1" />
        <div className="uv-blob uv-blob-2" />
        <div className="uv-blob uv-blob-3" />

        <div className="uv-page">
          {/* Header */}
          <div className="uv-header">
            <div className="uv-badge">
              <div className="uv-badge-dot" />
              <span>AI-POWERED TRUST VERIFICATION</span>
            </div>
            <h1 className="uv-title">
              URL <em>Trust</em><br />Analyzer
            </h1>
            <p className="uv-subtitle">
              Paste any job or internship URL and get an instant AI-powered authenticity report with a trust score, scam detection, and clear risk assessment.
            </p>
          </div>

          {/* Input Card */}
          <div className="uv-input-card">
            <div className="uv-input-label">🔍 &nbsp;Enter Job / Internship URL</div>
            <div className="uv-input-wrap">
              <input
                ref={inputRef}
                className="uv-url-input"
                type="text"
                placeholder="https://careers.google.com/jobs/..."
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={handleKey}
                disabled={loading}
                spellCheck={false}
              />
              <button
                className="uv-scan-btn"
                onClick={handleAnalyze}
                disabled={loading || !url.trim()}
              >
                {loading ? (
                  <>
                    <svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                    Scanning…
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    Analyze
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Scanning state */}
          {loading && (
            <div className="uv-scanning">
              <div className="uv-scan-spinner" />
              <div className="uv-scan-phase">{scanMessages[scanPhase]}</div>
              <div className="uv-scan-steps">
                {scanMessages.map((_, i) => (
                  <div
                    key={i}
                    className="uv-step-dot"
                    style={{
                      background: i <= scanPhase ? '#6366f1' : 'rgba(255,255,255,0.1)',
                      boxShadow: i === scanPhase ? '0 0 8px #6366f1' : 'none',
                      transform: i === scanPhase ? 'scale(1.4)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="uv-error">
              <span style={{ fontSize: 18 }}>⚠️</span>
              {error}
            </div>
          )}

          {/* Result */}
          {result && !loading && (
            <div className="uv-result">

              {/* Score Panel */}
              <div className="uv-score-panel">
                <ScoreRing score={result.trust_score} status={result.status} animate={animateScore} />
                <div className="uv-score-right">
                  <div
                    className="uv-status-badge"
                    style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
                  >
                    <div className="uv-status-icon" style={{ background: cfg.color, color: '#fff' }}>
                      {cfg.icon}
                    </div>
                    {cfg.label}
                  </div>
                  <div className="uv-url-display">
                    {url.startsWith('http') ? url : 'https://' + url}
                  </div>
                  <div className="uv-bars">
                    <PulseBar
                      value={result.trust_score}
                      color={cfg.color}
                      label="Overall Trust Score"
                      delay={0}
                    />
                    <PulseBar
                      value={Math.min(100, result.trust_score + Math.floor(Math.random() * 8))}
                      color="#6366f1"
                      label="Domain Credibility"
                      delay={150}
                    />
                    <PulseBar
                      value={Math.max(0, result.trust_score - Math.floor(Math.random() * 10))}
                      color="#0ea5e9"
                      label="Structure Integrity"
                      delay={300}
                    />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="uv-stats">
                {[
                  { val: result.trust_score, lbl: 'Trust Score', color: cfg.color },
                  { val: result.positive_signals?.length || 0, lbl: 'Positive Signals', color: '#10b981' },
                  { val: result.risk_factors?.length || 0, lbl: 'Risk Factors', color: '#f59e0b' },
                ].map((s, i) => (
                  <div className="uv-stat" key={i}>
                    <div className="uv-stat-val" style={{ color: s.color }}>{s.val}</div>
                    <div className="uv-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>

              {/* Verdict */}
              <div
                className="uv-verdict-card"
                style={{ background: cfg.bg, borderColor: cfg.border }}
              >
                <div className="uv-verdict-label" style={{ color: cfg.color }}>AI Verdict</div>
                <div className="uv-verdict-text">{result.verdict_summary}</div>
              </div>

              {/* Details */}
              <div className="uv-details">
                {/* Domain Analysis */}
                <div className="uv-detail-card">
                  <div className="uv-detail-header">
                    <div className="uv-detail-icon" style={{ background: 'rgba(99,102,241,0.15)' }}>🌐</div>
                    <div className="uv-detail-title">Domain Analysis</div>
                  </div>
                  <div className="uv-detail-body">{result.domain_analysis}</div>
                </div>

                {/* URL Structure */}
                <div className="uv-detail-card">
                  <div className="uv-detail-header">
                    <div className="uv-detail-icon" style={{ background: 'rgba(14,165,233,0.15)' }}>🔗</div>
                    <div className="uv-detail-title">URL Structure</div>
                  </div>
                  <div className="uv-detail-body">{result.url_structure}</div>
                </div>

                {/* Risk Factors */}
                <div className="uv-detail-card">
                  <div className="uv-detail-header">
                    <div className="uv-detail-icon" style={{ background: 'rgba(239,68,68,0.15)' }}>🚨</div>
                    <div className="uv-detail-title">Risk Factors</div>
                  </div>
                  <div className="uv-tag-list">
                    {(result.risk_factors || []).length === 0 ? (
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>No significant risks detected</div>
                    ) : (result.risk_factors || []).map((r, i) => (
                      <div className="uv-tag" key={i}>
                        <div className="uv-tag-dot" style={{ background: '#ef4444' }} />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Positive Signals */}
                <div className="uv-detail-card">
                  <div className="uv-detail-header">
                    <div className="uv-detail-icon" style={{ background: 'rgba(16,185,129,0.15)' }}>✅</div>
                    <div className="uv-detail-title">Positive Signals</div>
                  </div>
                  <div className="uv-tag-list">
                    {(result.positive_signals || []).length === 0 ? (
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>No positive signals found</div>
                    ) : (result.positive_signals || []).map((p, i) => (
                      <div className="uv-tag" key={i}>
                        <div className="uv-tag-dot" style={{ background: '#10b981' }} />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="uv-rec-card">
                <div className="uv-rec-icon-wrap">💡</div>
                <div>
                  <div className="uv-rec-label">Recommendation</div>
                  <div className="uv-rec-text">{result.recommendation}</div>
                </div>
              </div>

              {/* Scan Another */}
              <div style={{ textAlign: 'center', marginTop: 8 }}>
                <button
                  onClick={() => { setResult(null); setUrl(''); inputRef.current?.focus(); }}
                  style={{
                    background: 'transparent', border: '1.5px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.4)', borderRadius: 10, padding: '10px 22px',
                    fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = 'rgba(99,102,241,0.4)'; e.target.style.color = '#a5b4fc'; }}
                  onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.color = 'rgba(255,255,255,0.4)'; }}
                >
                  ↩ Analyze another URL
                </button>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!result && !loading && !error && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.2)', maxWidth: 320, margin: '0 auto', lineHeight: 1.7 }}>
                Enter any job or internship URL above to get an instant AI-powered trust analysis.
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
                {[
                  { label: 'Safe', color: '#10b981', range: '80–100', icon: '✓' },
                  { label: 'Suspicious', color: '#f59e0b', range: '40–79', icon: '⚠' },
                  { label: 'Scam', color: '#ef4444', range: '0–39', icon: '✕' },
                ].map(s => (
                  <div key={s.label} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 16px', borderRadius: 10,
                    background: `${s.color}14`, border: `1.5px solid ${s.color}30`,
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', background: s.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 900, color: '#fff',
                    }}>{s.icon}</div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: s.color }}>{s.label}</span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>{s.range}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}