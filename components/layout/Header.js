"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {

  return (

    <header className="bg-white border-b shadow-sm sticky top-0 z-50">

      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">

        {/* Left: Logo + Name */}
        <Link href="/" className="flex items-center gap-2">

          <Image
            src="/logo.png"
            alt="8th CPC Calculator"
            width={36}
            height={36}
          />

          {/* App Name */}
          <div className="flex flex-col leading-tight">

            <span className="font-semibold text-blue-1000 text-md">
              8th CPC Calculator
            </span>

            <span className="text-sm text-gray-500">
              Salary & Arrear Estimator
            </span>

          </div>

        </Link>


        {/* Right: Navigation */}
        <div className="flex gap-3 text-sm">

          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Salary
          </Link>

          <Link
            href="/arrear-calculator"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Arrear
          </Link>

        </div>

      </div>

    </header>

  );

}