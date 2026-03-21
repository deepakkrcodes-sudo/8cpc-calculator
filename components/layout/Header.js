"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <header className="bg-white border-b shadow-sm sticky top-0 z-50">

      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">

          <Image
            src="/logo.png"
            alt="8th CPC Calculator"
            width={36}
            height={36}
          />

          <div className="hidden sm:flex flex-col leading-tight">

            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              8th CPC Calculator
            </span>

            <span className="text-xs text-gray-500">
              Salary | Pension | Arrear Tools | Pay Fixation
            </span>

          </div>

        </Link>


        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">

          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Salary
          </Link>

          <Link href="/8th-cpc-arrear" className="text-gray-600 hover:text-blue-600">
            Arrear
          </Link>

          <Link href="/8th-cpc-pension-calculator" className="text-gray-600 hover:text-blue-600">
            Pension
          </Link>

          {/* DROPDOWN */}
          <div className="relative group">

            <button className="text-gray-600 hover:text-blue-600">
              More ▾
            </button>

            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 w-56 p-2">

              <Link href="/7th-cpc-calculator" className="block px-3 py-2 hover:bg-gray-100 rounded">
                7th CPC Salary
              </Link>

              <Link href="/7th-cpc-pay-matrix" className="block px-3 py-2 hover:bg-gray-100 rounded">
                7th CPC Pay Matrix
              </Link>

              <Link href="/7th-cpc-pension" className="block px-3 py-2 hover:bg-gray-100 rounded">
                7th CPC Pension
              </Link>

              <Link href="/8th-cpc-pay-matrix" className="block px-3 py-2 hover:bg-gray-100 rounded">
                8th CPC Pay Matrix
              </Link>

              <Link href="/8th-cpc-pension-arrear" className="block px-3 py-2 hover:bg-gray-100 rounded">
                Pension Arrear
              </Link>

            </div>

          </div>

        </nav>


        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          ☰
        </button>

      </div>


      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="md:hidden bg-white border-t shadow-sm px-4 py-3 space-y-2 text-sm">

          <Link href="/" className="block py-2">
            8th CPC Salary
          </Link>

          <Link href="/8th-cpc-arrear" className="block py-2">
            8th CPC Arrear
          </Link>

          <Link href="/8th-cpc-pension-calculator" className="block py-2">
            8th CPC Pension
          </Link>

          <hr />

          <Link href="/7th-cpc-calculator" className="block py-2">
            7th CPC Salary
          </Link>

          <Link href="/7th-cpc-pay-matrix" className="block py-2">
            7th CPC Pay Matrix
          </Link>

          <Link href="/7th-cpc-pension" className="block py-2">
            7th CPC Pension
          </Link>

          <Link href="/8th-cpc-pay-matrix" className="block py-2">
            8th CPC Pay Matrix
          </Link>

          <Link href="/8th-cpc-pension-arrear" className="block py-2">
            Pension Arrear
          </Link>

          <Link href="/pay-fixation-calculator" className="block py-2">
            Pay Fixation
          </Link>

        </div>

      )}

    </header>

  );

}