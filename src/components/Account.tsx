"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Briefcase, User, Phone, ArrowRight, Loader2 } from "lucide-react";

export default function Account() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";

      const bodyData = isLogin
        ? { email, password }
        : {
            first_name: firstName,
            last_name: lastName,
            username: email.split("@")[0],
            phone,
            email,
            password,
          };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        }
      );

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = data.user.type === "admin" ? "/admin" : "/";
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f7f5f2;
        }

        /* LEFT PANEL */
        .auth-left {
          display: none;
          width: 42%;
          background: #1a1a2e;
          position: relative;
          overflow: hidden;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
        }

        @media (min-width: 900px) {
          .auth-left { display: flex; }
        }

        .auth-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.25) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 10%, rgba(168,85,247,0.15) 0%, transparent 50%);
        }

        .left-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .left-logo {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #fff;
          z-index: 1;
        }

        .left-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .left-logo-text {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          letter-spacing: -0.3px;
          color: #fff;
        }

        .left-content {
          position: relative;
          z-index: 1;
        }

        .left-headline {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(32px, 3vw, 44px);
          line-height: 1.15;
          color: #fff;
          margin-bottom: 20px;
        }

        .left-headline em {
          font-style: italic;
          color: #a5b4fc;
        }

        .left-desc {
          font-size: 15px;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          max-width: 300px;
        }

        .left-stats {
          display: flex;
          gap: 32px;
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 32px;
        }

        .stat-item { display: flex; flex-direction: column; gap: 4px; }

        .stat-number {
          font-family: 'DM Serif Display', serif;
          font-size: 28px;
          color: #fff;
        }

        .stat-label {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* RIGHT PANEL */
        .auth-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 24px;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
        }

        /* Mobile logo */
        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 36px;
        }

        @media (min-width: 900px) {
          .mobile-logo { display: none; }
        }

        .mobile-logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-logo-text {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: #1a1a2e;
        }

        .auth-heading {
          font-family: 'DM Serif Display', serif;
          font-size: 30px;
          color: #1a1a2e;
          margin-bottom: 6px;
          letter-spacing: -0.3px;
        }

        .auth-subheading {
          font-size: 14px;
          color: #888;
          margin-bottom: 32px;
        }

        /* Toggle tabs */
        .auth-tabs {
          display: flex;
          background: #efefed;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 28px;
          gap: 4px;
        }

        .auth-tab {
          flex: 1;
          padding: 9px;
          border: none;
          border-radius: 9px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          color: #888;
        }

        .auth-tab.active {
          background: #fff;
          color: #1a1a2e;
          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
        }

        /* Form */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 14px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .field label {
          font-size: 12.5px;
          font-weight: 500;
          color: #555;
          letter-spacing: 0.2px;
        }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 13px;
          color: #bbb;
          display: flex;
          align-items: center;
          pointer-events: none;
          transition: color 0.15s;
        }

        .input-wrap input {
          width: 100%;
          padding: 11px 14px 11px 38px;
          border: 1.5px solid #e5e3df;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1a1a2e;
          background: #fff;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .input-wrap input::placeholder { color: #c0bcb6; }

        .input-wrap input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        .input-wrap input:focus + .input-icon,
        .input-wrap:focus-within .input-icon {
          color: #6366f1;
        }

        /* Fix icon z-order */
        .input-wrap .input-icon { z-index: 1; }

        .toggle-pw {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: #bbb;
          display: flex;
          align-items: center;
          padding: 2px;
          transition: color 0.15s;
          z-index: 1;
        }

        .toggle-pw:hover { color: #6366f1; }

        /* Error */
        .error-box {
          background: #fff1f0;
          border: 1px solid #fecdca;
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 13.5px;
          color: #c0392b;
          margin-bottom: 16px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .error-dot {
          width: 6px;
          height: 6px;
          background: #e74c3c;
          border-radius: 50%;
          margin-top: 6px;
          flex-shrink: 0;
        }

        /* Submit */
        .submit-btn {
          width: 100%;
          padding: 13px 24px;
          background: #1a1a2e;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
          margin-top: 8px;
          letter-spacing: 0.2px;
        }

        .submit-btn:hover:not(:disabled) {
          background: #252545;
          box-shadow: 0 4px 16px rgba(26,26,46,0.25);
          transform: translateY(-1px);
        }

        .submit-btn:active:not(:disabled) { transform: translateY(0); }

        .submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .spinner {
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
          color: #ccc;
          font-size: 12px;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e8e5e1;
        }

        .terms {
          font-size: 12px;
          color: #aaa;
          text-align: center;
          margin-top: 20px;
          line-height: 1.6;
        }

        .terms a {
          color: #6366f1;
          text-decoration: none;
        }

        .terms a:hover { text-decoration: underline; }

        /* No icon input (for name fields) */
        .input-wrap.no-icon input {
          padding-left: 14px;
        }
      `}</style>

      <div className="auth-root">
        {/* Left decorative panel */}
        <div className="auth-left">
          <div className="left-grid" />
          <div className="left-logo">
            <div className="left-logo-icon">
              <Briefcase size={18} color="#fff" />
            </div>
            <span className="left-logo-text">InternVibes</span>
          </div>

          <div className="left-content">
            <h2 className="left-headline">
              Your career<br />
              starts with the<br />
              <em>right internship.</em>
            </h2>
            <p className="left-desc">
              Connect with top companies, build real skills, and launch your professional journey — all in one place.
            </p>
          </div>

          <div className="left-stats">
            <div className="stat-item">
              <span className="stat-number">1.2k+</span>
              <span className="stat-label">Listings</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Companies</span>
            </div>
            {/* <div className="stat-item">
              <span className="stat-number">92%</span>
              <span className="stat-label">Placement rate</span>
            </div> */}
          </div>
        </div>

        {/* Right form panel */}
        <div className="auth-right">
          <div className="auth-card">
            {/* Mobile-only logo */}
            <div className="mobile-logo">
              <div className="mobile-logo-icon">
                <Briefcase size={16} color="#fff" />
              </div>
              <span className="mobile-logo-text">InternVibes</span>
            </div>

            <h1 className="auth-heading">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="auth-subheading">
              {isLogin
                ? "Sign in to access your dashboard"
                : "Join thousands of students finding opportunities"}
            </p>

            {/* Toggle tabs */}
            <div className="auth-tabs">
              <button
                type="button"
                className={`auth-tab${isLogin ? " active" : ""}`}
                onClick={() => { setIsLogin(true); setError(""); }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`auth-tab${!isLogin ? " active" : ""}`}
                onClick={() => { setIsLogin(false); setError(""); }}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Register-only fields */}
              {!isLogin && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                    <div className="field" style={{ margin: 0 }}>
                      <label>First name</label>
                      <div className="input-wrap no-icon">
                        <input
                          type="text"
                          placeholder="Jane"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          autoComplete="given-name"
                        />
                      </div>
                    </div>
                    <div className="field" style={{ margin: 0 }}>
                      <label>Last name</label>
                      <div className="input-wrap no-icon">
                        <input
                          type="text"
                          placeholder="Smith"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          autoComplete="family-name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <label>Phone number</label>
                    <div className="input-wrap">
                      <span className="input-icon"><Phone size={15} /></span>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="field">
                <label>Email address</label>
                <div className="input-wrap">
                  <span className="input-icon"><Mail size={15} /></span>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="field">
                <label>Password</label>
                <div className="input-wrap">
                  <span className="input-icon"><Lock size={15} /></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={isLogin ? "Your password" : "Create a strong password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    style={{ paddingRight: 40 }}
                  />
                  <button
                    type="button"
                    className="toggle-pw"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="error-box">
                  <div className="error-dot" />
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={17} className="spinner" />
                    Please wait…
                  </>
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {!isLogin && (
              <p className="terms">
                By creating an account you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}