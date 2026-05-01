"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const toolsRef = useRef(null);


  useEffect(() => {
    function handleClickOutside(event) {
      if (
        toolsRef.current &&
        !toolsRef.current.contains(event.target)
      ) {
        setToolsOpen(false);
      }
    }

    if (toolsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toolsOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setToolsOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // ✅ YOUR TOOLS ARRAY
  const tools = [
    { title: "8th CPC Arrear", icon: "💰", link: "/8th-cpc-arrear-calculator", highlight: true },
    { title: "8th CPC Salary", icon: "🧮", link: "/", highlight: true },
    { title: "8th CPC Pension", icon: "👴", link: "/8th-cpc-pension-calculator", highlight: true },
    { title: "8th CPC Pension Arrear", icon: "💵", link: "/8th-cpc-pension-arrear", highlight: true },
    { title: "LTC Planner", icon: "✈️", link: "/ltc-planner" },
    { title: "Pay Fixation", icon: "📌", link: "/pay-fixation-calculator" },
    { title: "8th CPC Matrix", icon: "📈", link: "/8th-cpc-pay-matrix" },
    { title: "7th CPC Salary", icon: "📊", link: "/7th-cpc-calculator" },
    { title: "7th CPC Pension", icon: "💼", link: "/7th-cpc-pension-calculator" },
    { title: "7th CPC Matrix", icon: "📋", link: "/7th-cpc-pay-matrix" }
  ];

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b">

        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={28} height={28} />
            <span className="font-semibold text-gray-900">
              8th CPC Calculator
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">

            <Link href="/" className="text-blue-600 font-semibold">
              Salary
            </Link>

            <Link href="/8th-cpc-arrear-calculator">
              Arrear
            </Link>

            <Link href="/8th-cpc-pension-calculator">
              Pension
            </Link>

            <div ref={toolsRef} className="relative">

              {/* TOOLS BUTTON */}
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className="text-gray-700 hover:text-black"
              >
                All Tools ▾
              </button>

              

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
      </header>

      {/* ✅ DESKTOP TOOLS PANEL */}
      {toolsOpen && (
        <div className="fixed top-14 left-0 w-full bg-gray-50/95 backdrop-blur-md border-b border-gray-200 shadow-xl z-[9999]">
          <div className="max-w-7xl mx-auto p-4 grid grid-cols-2 md:grid-cols-4 gap-3">

            {tools.map((tool, i) => (
              <Link
                key={i}
                href={tool.link}
                onClick={() => setToolsOpen(false)}
                className={`p-3 rounded-lg border transition ${tool.highlight
                  ? "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
                  : "bg-indigo-50 text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{tool.icon}</span>
                  <span>{tool.title}</span>
                </div>
              </Link>
            ))}

          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[9999] ${menuOpen ? "block" : "hidden"}`}>

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={closeMenu}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-gray-50 shadow-2xl transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >

          {/* Header */}
          <div className="flex justify-between items-center px-4 h-14 border-b">
            <span className="font-semibold">Menu</span>
            <button onClick={closeMenu}>✕</button>
          </div>

          {/* CONTENT */}
          <div className="px-5 py-4 space-y-3 overflow-y-auto h-[calc(100vh-56px)]">

            {tools.map((tool, i) => (
              <Link
                key={i}
                href={tool.link}
                onClick={closeMenu}
                className={`block p-2 rounded-lg ${tool.highlight ? "bg-blue-50 font-medium" : ""
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span>{tool.icon}</span>
                  <span>{tool.title}</span>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </div>

    </>
  );
}