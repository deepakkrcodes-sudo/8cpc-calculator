"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* LOGO + TITLE */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          
          <Image
            src="/logo.png"
            alt="8th CPC Calculator"
            width={34}
            height={34}
          />

          <div className="flex flex-col leading-tight">
            
            {/* Title visible on all screens */}
            <span className="text-base sm:text-lg font-semibold text-gray-900 truncate max-w-[160px] sm:max-w-none">
              8th CPC Calculator
            </span>

            

          </div>

        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">

          <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
            Salary
          </Link>

          <Link href="/8th-cpc-arrear" className="text-gray-600 hover:text-blue-600 transition">
            Arrear
          </Link>

          <Link href="/8th-cpc-pension-calculator" className="text-gray-600 hover:text-blue-600 transition">
            Pension
          </Link>

          {/* DROPDOWN */}
          <div className="relative group">
            <button className="text-gray-600 hover:text-blue-600 transition">
              More ▾
            </button>

            <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 w-56 p-2 border">
              
              {[
                { href: "/7th-cpc-calculator", label: "7th CPC Salary" },
                { href: "/7th-cpc-pay-matrix", label: "7th CPC Pay Matrix" },
                { href: "/7th-cpc-pension", label: "7th CPC Pension" },
                { href: "/8th-cpc-pay-matrix", label: "8th CPC Pay Matrix" },
                { href: "/8th-cpc-pension-arrear", label: "Pension Arrear" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="block px-3 py-2 hover:bg-gray-100 rounded transition"
                >
                  {item.label}
                </Link>
              ))}

            </div>
          </div>

        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 text-xl"
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm px-4 py-3 space-y-1 text-sm">

          {[
            { href: "/", label: "8th CPC Salary" },
            { href: "/8th-cpc-arrear", label: "8th CPC Arrear" },
            { href: "/8th-cpc-pension-calculator", label: "8th CPC Pension" },
          ].map((item, i) => (
            <Link key={i} href={item.href} onClick={closeMenu} className="block py-2">
              {item.label}
            </Link>
          ))}

          <hr />

          {[
            { href: "/7th-cpc-calculator", label: "7th CPC Salary" },
            { href: "/7th-cpc-pay-matrix", label: "7th CPC Pay Matrix" },
            { href: "/7th-cpc-pension", label: "7th CPC Pension" },
            { href: "/8th-cpc-pay-matrix", label: "8th CPC Pay Matrix" },
            { href: "/8th-cpc-pension-arrear", label: "Pension Arrear" },
            { href: "/pay-fixation-calculator", label: "Pay Fixation" },
            { href: "/ltc-calculator", label: "LTC Calculator" },
          ].map((item, i) => (
            <Link key={i} href={item.href} onClick={closeMenu} className="block py-2">
              {item.label}
            </Link>
          ))}

        </div>
      )}
    </header>
  );
}