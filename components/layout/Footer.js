"use client";

import Link from "next/link";

export default function Footer() {

  return (

    <footer className="mt-10 border-t bg-white">

      <div className="w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* TOP SECTION */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT: BRAND + DESCRIPTION */}
          <div className="space-y-2">

            <h3 className="text-sm font-semibold text-gray-800">
              8th CPC Calculator
            </h3>

            <p className="text-xs text-gray-500 leading-relaxed">
              A simple tool to estimate salary, pension and arrears under
              the upcoming 8th Pay Commission for Central Government employees.
            </p>

          </div>


          {/* RIGHT: LINKS */}
          <div className="flex md:justify-end">

            <div className="text-xs text-gray-600 space-y-1">

              <Link href="/privacy-policy" className="block hover:text-blue-600">
                Privacy Policy
              </Link>

              <Link href="/terms" className="block hover:text-blue-600">
                Terms of Use
              </Link>

              <Link href="/contact" className="block hover:text-blue-600">
                Contact
              </Link>

            </div>

          </div>

        </div>


        {/* DISCLAIMER */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">

          <p className="text-xs text-gray-500 leading-relaxed">

            <span className="font-medium text-gray-600">Disclaimer:</span>{" "}
            This calculator provides indicative estimates based on expected
            8th Pay Commission fitment factors and current pay rules. Actual
            salary, pension, or arrears may vary depending on official
            government notifications, pay fixation rules, DA revisions and
            tax adjustments. This tool is for informational purposes only.

          </p>

        </div>


        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 pt-2 border-t">

          <span>
            © 2026 8cpccalculator.com
          </span>

          <span className="mt-1 md:mt-0">
            Built for Govt Employees 🇮🇳
          </span>

        </div>

      </div>

    </footer>

  );

}