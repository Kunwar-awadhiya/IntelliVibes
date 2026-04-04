"use client";

import { useState } from "react";
import { Shield, Search, AlertTriangle, CheckCircle, XCircle, Link2, Loader2, ArrowRight, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type AnalysisResult = {
  trustScore: number;
  status: "Safe" | "Suspicious" | "Scam";
  reason: string;
};

const STATUS_CONFIG = {
  Safe: {
    icon: CheckCircle,
    color: "#10b981",
    light: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
    label: "Safe",
  },
  Suspicious: {
    icon: AlertTriangle,
    color: "#f59e0b",
    light: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    label: "Suspicious",
  },
  Scam: {
    icon: XCircle,
    color: "#ef4444",
    light: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.2)",
    label: "Scam",
  },
};

export default function URLCheckerPage() {
  const [url, setUrl]         = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<AnalysisResult | null>(null);
  const [error, setError]     = useState("");

  const handleAnalyze = async () => {
    if (!url.trim()) { setError("Please enter a URL to check."); return; }
    try {
      setLoading(true); setError(""); setResult(null);
      const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/url-analyze/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cfg = result ? STATUS_CONFIG[result.status] : null;

  // Progress bar color based on score
  const barColor = result
    ? result.trustScore >= 70 ? "#10b981"
    : result.trustScore >= 40 ? "#f59e0b"
    : "#ef4444"
    : "#6366f1";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .uc-root {
          font-family: 'DM Sans', sans-serif;
          background: #f7f5f2;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* Blobs */
        .uc-blob {
          position: fixed; border-radius: 50%; filter: blur(90px);
          opacity: 0.1; pointer-events: none; z-index: 0;
        }
        .uc-blob-1 { width: 500px; height: 500px; background: #6366f1; top: -160px; right: -120px; }
        .uc-blob-2 { width: 380px; height: 380px; background: #a855f7; bottom: -80px; left: -80px; }

        /* Center content */
        .uc-center {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          position: relative;
          z-index: 1;
        }

        .uc-box {
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Header */
        .uc-header { text-align: center; }

        .uc-icon-wrap {
          width: 56px; height: 56px;
          background: #1a1a2e;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 18px;
        }

        .uc-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: #fff; border: 1.5px solid #e5e3df;
          border-radius: 999px; padding: 5px 14px 5px 8px;
          margin-bottom: 16px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }

        .uc-badge-dot {
          width: 20px; height: 20px;
          background: #1a1a2e; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }

        .uc-badge span { font-size: 12.5px; font-weight: 500; color: #666; }

        .uc-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(30px, 4vw, 42px);
          color: #1a1a2e; line-height: 1.1; letter-spacing: -0.5px;
          margin: 0 0 12px;
        }

        .uc-heading em { font-style: italic; color: #6366f1; }

        .uc-sub {
          font-size: 15px; color: #888; line-height: 1.65;
          max-width: 420px; margin: 0 auto;
        }

        /* Input card */
        .uc-input-card {
          background: #fff;
          border: 1.5px solid #e8e5e1;
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }

        .uc-input-label {
          font-size: 12px; font-weight: 700; letter-spacing: 0.8px;
          text-transform: uppercase; color: #aaa; margin-bottom: 10px;
        }

        .uc-input-row {
          display: flex; align-items: center;
          background: #f7f5f2; border: 1.5px solid #e5e3df;
          border-radius: 12px; overflow: hidden;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .uc-input-row:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        .uc-input-icon {
          padding: 0 14px; color: #bbb; display: flex; align-items: center; flex-shrink: 0;
          transition: color 0.15s;
        }

        .uc-input-row:focus-within .uc-input-icon { color: #6366f1; }

        .uc-input {
          flex: 1; padding: 13px 0; border: none; outline: none;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          color: #1a1a2e; background: transparent;
        }

        .uc-input::placeholder { color: #c0bcb6; }

        .uc-check-btn {
          margin: 5px; padding: 11px 22px;
          background: #1a1a2e; color: #fff; border: none;
          border-radius: 9px; font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; gap: 7px; flex-shrink: 0;
          transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
        }

        .uc-check-btn:hover:not(:disabled) {
          background: #252545;
          box-shadow: 0 4px 14px rgba(26,26,46,0.2);
          transform: translateY(-1px);
        }

        .uc-check-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .uc-spinner { animation: spin 0.75s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Error */
        .uc-error {
          display: flex; align-items: flex-start; gap: 9px;
          background: #fff1f0; border: 1.5px solid #fecdca;
          border-radius: 10px; padding: 11px 14px;
          font-size: 13.5px; color: #c0392b; margin-top: 12px;
        }

        /* Result card */
        .uc-result {
          background: #fff; border: 1.5px solid #e8e5e1;
          border-radius: 18px; overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          animation: fadeUp 0.4s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .uc-result-header {
          background: #1a1a2e; padding: 18px 22px;
          display: flex; align-items: center; gap: 11px;
          position: relative; overflow: hidden;
        }

        .uc-result-header::before {
          content: ''; position: absolute; top: -40px; right: -40px;
          width: 160px; height: 160px;
          background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
          pointer-events: none;
        }

        .uc-result-header-icon {
          width: 32px; height: 32px; background: rgba(99,102,241,0.25);
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; position: relative;
        }

        .uc-result-header-title {
          font-family: 'DM Serif Display', serif; font-size: 17px; color: #fff; position: relative;
        }

        .uc-result-body { padding: 22px; display: flex; flex-direction: column; gap: 18px; }

        /* Status badge */
        .uc-status-row {
          display: flex; align-items: center; gap: 14px;
          padding: 16px; border-radius: 12px; border: 1.5px solid;
        }

        .uc-status-icon-wrap {
          width: 42px; height: 42px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        .uc-status-label { font-size: 11px; font-weight: 700; letter-spacing: 0.6px; text-transform: uppercase; color: #aaa; margin-bottom: 3px; }
        .uc-status-val { font-family: 'DM Serif Display', serif; font-size: 20px; font-weight: 700; }

        /* Score section */
        .uc-score-section {}

        .uc-score-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 10px;
        }

        .uc-score-label { font-size: 13px; font-weight: 600; color: #555; }
        .uc-score-val {
          font-family: 'DM Serif Display', serif; font-size: 26px; color: #1a1a2e;
          line-height: 1;
        }

        .uc-bar-bg {
          width: 100%; height: 10px;
          background: #f0ede9; border-radius: 999px; overflow: hidden;
        }

        .uc-bar-fill {
          height: 100%; border-radius: 999px;
          transition: width 0.8s cubic-bezier(0.4,0,0.2,1);
        }

        .uc-bar-hints {
          display: flex; justify-content: space-between;
          margin-top: 6px; font-size: 11px; color: #ccc; font-weight: 500;
        }

        /* Reason */
        .uc-reason-card {
          background: #f7f5f2; border: 1.5px solid #e8e5e1;
          border-radius: 12px; padding: 14px 16px;
          display: flex; gap: 10px; align-items: flex-start;
        }

        .uc-reason-text { font-size: 14px; color: #555; line-height: 1.7; margin: 0; }

        /* Tips */
        .uc-tips {
          background: rgba(99,102,241,0.05); border: 1.5px solid rgba(99,102,241,0.15);
          border-radius: 12px; padding: 14px 16px;
        }

        .uc-tips-title {
          font-size: 12px; font-weight: 700; letter-spacing: 0.6px;
          text-transform: uppercase; color: #6366f1; margin-bottom: 8px;
        }

        .uc-tips-list { display: flex; flex-direction: column; gap: 6px; }

        .uc-tip-item { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: #666; line-height: 1.5; }
      `}</style>
      <Navbar/>
      <div className="uc-root">
        <div className="uc-blob uc-blob-1" />
        <div className="uc-blob uc-blob-2" />

        <div className="uc-center">
          <div className="uc-box">

            {/* Header */}
            <div className="uc-header">
              <div className="uc-icon-wrap">
                <Shield size={26} color="#fff" />
              </div>
              {/* <div className="uc-badge">
                <div className="uc-badge-dot"><Shield size={10} color="#fff" /></div>
                <span>Powered by AI analysis</span>
              </div> */}
              <h1 className="uc-heading">
                <em>Scam Checker</em>
              </h1>
              <p className="uc-sub">
                Paste any job or internship link to instantly verify if it's safe, suspicious, or a scam.
              </p>
            </div>

            {/* Input card */}
            <div className="uc-input-card">
              <p className="uc-input-label">Enter URL to analyse</p>
              <div className="uc-input-row">
                <span className="uc-input-icon"><Link2 size={17} /></span>
                <input
                  className="uc-input"
                  type="text"
                  placeholder="https://example.com/internship/apply"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  aria-label="URL to check"
                />
                <button
                  className="uc-check-btn"
                  onClick={handleAnalyze}
                  disabled={loading}
                >
                  {loading ? (
                    <><Loader2 size={16} className="uc-spinner" /> Analysing…</>
                  ) : (
                    <><Search size={15} /> Check URL</>
                  )}
                </button>
              </div>

              {error && (
                <div className="uc-error">
                  <XCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                  {error}
                </div>
              )}
            </div>

            {/* Result */}
            {result && cfg && (
              <div className="uc-result">
                <div className="uc-result-header">
                  <div className="uc-result-header-icon">
                    <Shield size={15} color="#a5b4fc" />
                  </div>
                  <span className="uc-result-header-title">Analysis Result</span>
                </div>

                <div className="uc-result-body">
                  {/* Status */}
                  <div
                    className="uc-status-row"
                    style={{ borderColor: cfg.border, background: cfg.light }}
                  >
                    <div className="uc-status-icon-wrap" style={{ background: cfg.light, border: `1.5px solid ${cfg.border}` }}>
                      <cfg.icon size={22} color={cfg.color} />
                    </div>
                    <div>
                      <div className="uc-status-label">Verdict</div>
                      <div className="uc-status-val" style={{ color: cfg.color }}>{result.status}</div>
                    </div>
                  </div>

                  {/* Trust score */}
                  <div className="uc-score-section">
                    <div className="uc-score-row">
                      <span className="uc-score-label">Trust Score</span>
                      <span className="uc-score-val" style={{ color: barColor }}>
                        {result.trustScore}<span style={{ fontSize: 14, color: "#aaa", fontFamily: "DM Sans" }}>/100</span>
                      </span>
                    </div>
                    <div className="uc-bar-bg">
                      <div
                        className="uc-bar-fill"
                        style={{ width: `${result.trustScore}%`, background: barColor }}
                      />
                    </div>
                    <div className="uc-bar-hints">
                      <span>0 — High risk</span>
                      <span>100 — Fully trusted</span>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="uc-reason-card">
                    <Info size={16} color="#6366f1" style={{ flexShrink: 0, marginTop: 2 }} />
                    <p className="uc-reason-text">{result.reason}</p>
                  </div>

                  {/* Tips */}
                  {result.status !== "Safe" && (
                    <div className="uc-tips">
                      <p className="uc-tips-title">Stay Safe — Tips</p>
                      <div className="uc-tips-list">
                        {[
                          "Never share personal documents before a verified offer letter.",
                          "Avoid paying any registration or training fees upfront.",
                          "Check the company's official website and LinkedIn page.",
                          "Look for HTTPS and a recognisable domain name.",
                        ].map((tip) => (
                          <div key={tip} className="uc-tip-item">
                            <AlertTriangle size={13} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Empty state hint */}
            {!result && !loading && (
              <p style={{ textAlign: "center", fontSize: 13, color: "#ccc" }}>
                Enter any job listing URL above and press <strong style={{ color: "#888" }}>Check URL</strong> or hit Enter.
              </p>
            )}

          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}