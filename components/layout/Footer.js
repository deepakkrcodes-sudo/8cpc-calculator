"use client";

import Link from "next/link";

export default function Footer() {

  return (

    <footer className="mt-8 border-t border-gray-200 bg-white">
      <div className="max-w-md mx-auto px-4 py-6 text-center space-y-3">

        <p className="text-xs text-gray-500 leading-relaxed">
          Disclaimer: This calculator provides tentative salary estimates
          based on expected 8th Pay Commission fitment factors and current
          pay rules. Actual arrears may vary due to factors including Pay
          Fixation, exact DA announcements, tax adjustments and government
          orders. This tool is for informational purposes only and not for
          official use.
        </p>

        {/* Policy Links */}
        <div className="mt-4 text-xs text-gray-600 text-center">

          <Link href="/privacy-policy" className="hover:text-blue-600">
            Privacy Policy
          </Link>

          <span className="mx-2 text-gray-400">|</span>

          <Link href="/terms" className="hover:text-blue-600">
            Terms of Use
          </Link>

          <span className="mx-2 text-gray-400">|</span>

          <Link href="/contact" className="hover:text-blue-600">
            Contact
          </Link>

        </div>

        <p className="text-xs text-gray-400 mt-4">
          © 2026 8cpccalculator.com
        </p>

      </div>

    </footer>

  );

}