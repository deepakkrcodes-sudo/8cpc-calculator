"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b overflow-x-hidden">

      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>

          {/* Logo */}
          <Image
            src="/logo.png"
            alt="8th CPC Calculator"
            width={28}
            height={28}
            className="sm:w-8 sm:h-8"
          />

          {/* Title + Tagline */}
          <div className="flex flex-col leading-tight">

            {/* Responsive Title */}
            <span className="font-semibold text-gray-900 text-sm sm:text-lg">
              <span className="sm:hidden">8th CPC Calculator</span>
              <span className="hidden sm:inline">8th CPC Calculator</span>
            </span>

            {/* Tagline (desktop only) */}
            <span className="hidden md:block text-xs text-gray-500">
              Salary • Arrear • Pension
            </span>

          </div>

        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">

          <Link href="/" className="text-blue-600 font-semibold">
            Salary
          </Link>

          <Link href="/8th-cpc-arrear-calculator" className="text-gray-600 hover:text-black transition">
            Arrear
          </Link>

          <Link href="/8th-cpc-pension-calculator" className="text-gray-600 hover:text-black transition">
            Pension
          </Link>

          {/* Dropdown */}
          <div className="relative group">
            <button className="text-gray-600 hover:text-black transition">
              More
            </button>

            <div className="absolute right-0 hidden group-hover:block bg-white shadow-xl rounded-xl mt-3 w-56 p-2 border">
              {[
                { href: "/7th-cpc-calculator", label: "7th CPC Salary" },
                { href: "/7th-cpc-pay-matrix", label: "Pay Matrix" },
                { href: "/8th-cpc-pay-matrix", label: "8th Pay Matrix" },
                { href: "/ltc-planner", label: "LTC Planner" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="block px-3 py-2 hover:bg-gray-100 rounded-lg transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>


        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white text-gray-900 z-50 shadow-2xl transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 h-14 border-b bg-gray-50">
          <span className="font-semibold">Menu</span>
          <button onClick={closeMenu}>✕</button>
        </div>

        {/* Scrollable Content */}
        <div className="px-5 py-4 space-y-4 text-base overflow-y-auto h-[calc(100vh-56px)]">

          {/* Main */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400 uppercase">Main</p>

            <Link href="/" onClick={closeMenu} className="block py-2 px-2 rounded-lg hover:bg-gray-100 font-medium">
              Salary Calculator
            </Link>

            <Link href="/8th-cpc-arrear-calculator" onClick={closeMenu} className="block py-2 px-2 rounded-lg hover:bg-gray-100">
              Arrear Calculator
            </Link>

            <Link href="/8th-cpc-pension-calculator" onClick={closeMenu} className="block py-2 px-2 rounded-lg hover:bg-gray-100">
              Pension Calculator
            </Link>
          </div>

          {/* Tools */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400 uppercase">Tools</p>

            <Link href="/ltc-planner" onClick={closeMenu} className="block py-2 px-2 rounded-lg hover:bg-gray-100">
              LTC Planner
            </Link>

            <Link href="/pay-fixation-calculator" onClick={closeMenu} className="block py-2 px-2 rounded-lg hover:bg-gray-100">
              Pay Fixation
            </Link>

            <Link href="/8th-cpc-pay-matrix" onClick={closeMenu} className="block py-2 px-2 rounded-lg hover:bg-gray-100">
              Pay Matrix
            </Link>
          </div>

          {/* CTA */}
          <Link
            href="/"
            onClick={closeMenu}
            className="block text-center mt-6 bg-blue-600 text-white py-2 rounded-lg"
          >
            Start Calculation
          </Link>

        </div>
      </div>
    </header>
  );
}