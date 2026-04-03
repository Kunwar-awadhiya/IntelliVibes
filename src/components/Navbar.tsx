"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Briefcase, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Internships", href: "/internships" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');

        .nav-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.25s, box-shadow 0.25s, border-color 0.25s;
          background: rgba(247, 245, 242, 0.92);
          
        }

        .nav-root.scrolled {
          background: rgba(247, 245, 242, 0.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1.5px solid #e8e5e1;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
        }

        .nav-root.top {
          background: rgba(247, 245, 242, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-bottom: 1.5px solid transparent;
        }

        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nav-logo-icon {
          width: 36px;
          height: 36px;
          background: #1a1a2e;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }

        .nav-logo:hover .nav-logo-icon {
          transform: scale(1.08);
        }

        .nav-logo-text {
          font-family: 'DM Serif Display', serif;
          font-size: 20px;
          color: #1a1a2e;
          letter-spacing: -0.2px;
        }

        /* Desktop links */
        .nav-links {
         display: flex;
         justify-content: center;
         gap: 34px;
         list-style: none;
         margin: 0;
         padding: 0;
        }


        .nav-link {
          position: relative;
          padding: 7px 14px;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          text-decoration: none;
          border-radius: 8px;
          transition: color 0.15s, background 0.15s;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 14px;
          right: 14px;
          height: 1.5px;
          background: #6366f1;
          border-radius: 999px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.2s ease;
        }

        .nav-link:hover {
          color: #1a1a2e;
          background: rgba(99, 102, 241, 0.06);
        }

        .nav-link:hover::after {
          transform: scaleX(1);
        }

        /* CTA buttons */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-ghost {
          padding: 8px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #1a1a2e;
          background: transparent;
          border: 1.5px solid #ddd;
          border-radius: 9px;
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
          cursor: pointer;
        }

        .btn-ghost:hover {
          border-color: #6366f1;
          color: #6366f1;
          background: rgba(99, 102, 241, 0.04);
        }

        .btn-primary {
          padding: 8px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          background: #1a1a2e;
          border: none;
          border-radius: 9px;
          text-decoration: none;
          transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
          cursor: pointer;
        }

        .btn-primary:hover {
          background: #252545;
          box-shadow: 0 4px 14px rgba(26, 26, 46, 0.22);
          transform: translateY(-1px);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        /* Mobile hamburger */
        .mobile-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          background: transparent;
          border: 1.5px solid #e5e3df;
          border-radius: 9px;
          cursor: pointer;
          color: #1a1a2e;
          transition: border-color 0.15s, background 0.15s;
        }

        .mobile-toggle:hover {
          border-color: #6366f1;
          background: rgba(99, 102, 241, 0.05);
          color: #6366f1;
        }

        /* Mobile drawer */
        .mobile-drawer {
          overflow: hidden;
          transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s;
          background: #f7f5f2;
          border-top: 1.5px solid #e8e5e1;
        }

        .mobile-drawer.open {
          max-height: 400px;
          opacity: 1;
        }

        .mobile-drawer.closed {
          max-height: 0;
          opacity: 0;
        }

        .mobile-drawer-inner {
          padding: 12px 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-link {
          display: block;
          padding: 11px 14px;
          font-size: 15px;
          font-weight: 500;
          color: #555;
          text-decoration: none;
          border-radius: 10px;
          transition: color 0.15s, background 0.15s;
        }

        .mobile-link:hover {
          color: #1a1a2e;
          background: rgba(99, 102, 241, 0.07);
        }

        .mobile-divider {
          height: 1px;
          background: #e8e5e1;
          margin: 8px 0;
        }

        .mobile-cta-row {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .mobile-cta-row .btn-ghost,
        .mobile-cta-row .btn-primary {
          flex: 1;
          text-align: center;
          padding: 11px;
        }

        @media (max-width: 768px) {
          .nav-inner { padding: 0 20px; }
          .nav-links { display: none; }
          .nav-actions { display: none; }
          .mobile-toggle { display: flex; }
        }
      `}</style>

      <nav className="nav-root scrolled">
        <div className="nav-inner">
          {/* Logo */}
          {/* <Link href="/" className="nav-logo">
            <div className="nav-logo-icon">
              <Briefcase size={17} color="#fff" />
            </div>
            <span className="nav-logo-text">intellivibes</span>
          </Link> */}
          <Link href="/" className="nav-logo">
            <Image
              src="/images/ivlogo01-removebg-preview.png"
              alt="intellivibes Logo"
              width={140}
              height={40}
              className="h-18 w-auto"
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="nav-links">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="nav-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="nav-actions">
            {!user ? (
              <>
                <Link href="/Account" className="btn-ghost">
                  Sign In
                </Link>
                <Link href="/Account" className="btn-primary">
                  Get Started
                </Link>
              </>
            ) : (
              <div style={{ position: "relative" }}>
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "#1a1a2e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                >
                  <User size={18} />
                </div>

                {showDropdown && (
                  <div className="absolute right-0 top-[54px] z-50 w-44 bg-white border border-[#e8e5e1] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.08)] p-2 animate-dropdown">
                    {/* Arrow */}
                    <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-[#e8e5e1] rotate-45" />

                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#444] rounded-lg transition-all duration-150 hover:bg-indigo-500/[0.08] hover:text-indigo-600"
                    >
                      <User size={15} />
                      Profile
                    </Link>

                    <Link
                      href="/internships"
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#444] rounded-lg transition-all duration-150 hover:bg-indigo-500/[0.08] hover:text-indigo-600"
                    >
                      <Briefcase size={15} />
                      Internships
                    </Link>

                    <div className="h-px bg-[#eee] my-1.5" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#444] rounded-lg transition-all duration-150 hover:bg-red-50 hover:text-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`mobile-drawer ${isOpen ? "open" : "closed"}`}>
          {/* Mobile drawer */}
          <div className={`mobile-drawer ${isOpen ? "open" : "closed"}`}>
            <div className="mobile-drawer-inner">
              {/* ✅ NAV LINKS FIRST */}
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="mobile-link"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}

              <div className="mobile-divider" />

              {!user ? (
                <div className="mobile-cta-row">
                  <Link
                    href="/Account"
                    className="btn-ghost"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/Account"
                    className="btn-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <Link
                    href="/profile"
                    className="mobile-link"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    href="/internships"
                    className="mobile-link"
                    onClick={() => setIsOpen(false)}
                  >
                    Internships
                  </Link>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="mobile-link"
                    style={{
                      textAlign: "left",
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
