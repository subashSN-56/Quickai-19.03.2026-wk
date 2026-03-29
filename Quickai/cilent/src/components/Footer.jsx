import React from 'react';

export default function Footer() {
  return (
    <footer className="flex flex-col bg-slate-50 items-center justify-around w-full py-16 text-sm text-gray-800/70">
      <div className="flex items-center gap-8">
        {['Home', 'About', 'Services', 'Contact', 'Help'].map((item) => (
          <a
            key={item}
            href="#"
            className="font-medium text-gray-500 hover:text-black transition-all"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-4 mt-8 text-indigo-500">
        {/* Facebook */}
        <a href="#" aria-label="Facebook" className="hover:-translate-y-0.5 transition-all duration-300">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>

        {/* Instagram */}
        <a href="#" aria-label="Instagram" className="hover:-translate-y-0.5 transition-all duration-300">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a href="#" aria-label="LinkedIn" className="hover:-translate-y-0.5 transition-all duration-300">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>

        {/* Twitter */}
        <a href="#" aria-label="Twitter" className="hover:-translate-y-0.5 transition-all duration-300">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </svg>
        </a>

        {/* GitHub */}
        <a href="#" aria-label="GitHub" className="hover:-translate-y-0.5 transition-all duration-300">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            viewBox="0 0 24 24">
            <path d="M12 1C5.37 1 0 6.37 0 13a12 12 0 0 0 8 11.43c.59.11.8-.26.8-.57v-2.1c-3.34.73-4-1.41-4-1.41a3.15 3.15 0 0 0-1.3-1.72c-1.05-.72.08-.7.08-.7a2.5 2.5 0 0 1 1.84 1.24 2.57 2.57 0 0 0 3.5 1 2.57 2.57 0 0 1 .76-1.61c-2.66-.3-5.46-1.33-5.46-5.92a4.61 4.61 0 0 1 1.22-3.21 4.28 4.28 0 0 1 .12-3.17s1-.32 3.3 1.23a11.38 11.38 0 0 1 6 0C15 5.66 16 5.94 16 5.94a4.28 4.28 0 0 1 .12 3.17 4.61 4.61 0 0 1 1.22 3.21c0 4.61-2.8 5.61-5.47 5.91A2.89 2.89 0 0 1 14 21.14v2.72c0 .31.21.69.8.57A12 12 0 0 0 24 13c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      </div>

      <p className="mt-8 text-center">
        Copyright © 2025{' '}
        <a href="https://prebuiltui.com" className="text-indigo-500 hover:underline">
          QuickAI
        </a>. All rights reserved.
      </p>
    </footer>
  );
}
