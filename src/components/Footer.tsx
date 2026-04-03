

'use client';

import Link from "next/link";
import { Mail, MapPin, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-1">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* ===== BRAND ===== */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-black text-white">
              InternVibes
            </h2>

            <p className="text-gray-200 leading-relaxed">
              InternVibes is a curated platform helping students discover
              verified internships and job opportunities from trusted companies.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a
                  href="mailto:internvibesofficial@gmail.com"
                  className="hover:text-white transition"
                >
                  internvibesofficial@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-400" />
                <span>India</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.linkedin.com/company/internvibes"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/internvibes.live"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* ===== QUICK LINKS ===== */}
          <div>
            <h6 className="mb-5 text-white font-semibold">Quick Links</h6>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/internships" className="hover:text-white transition">Internships</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              {/* <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li> */}
            </ul>
          </div>

          {/* ===== FOR STUDENTS ===== */}
          <div>
            <h6 className="mb-5 text-white font-semibold">For Students</h6>
            <ul className="space-y-3">
              <li><Link href="/internships" className="hover:text-white transition">Browse Internships</Link></li>
              <li><Link href="/resources" className="hover:text-white transition">Career Resources</Link></li>
              <li><Link href="/interview-tips" className="hover:text-white transition">Interview Tips</Link></li>
              <li><Link href="/success-stories" className="hover:text-white transition">Success Stories</Link></li>
            </ul>
          </div>

          {/* ===== LEGAL ===== */}
          <div>
            <h6 className="mb-5 text-white font-semibold">Legal</h6>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              {/* <li><Link href="/disclaimer" className="hover:text-white transition">Disclaimer</Link></li> */}
            </ul>
          </div>

        </div>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <p className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} InternVibes. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
