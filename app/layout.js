import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "8th CPC Salary Calculator (2026) | 7th vs 8th Pay Commission",

  description:
    "Calculate expected 8th Pay Commission salary, arrears, and pay matrix comparison with this free 8th CPC calculator for central government employees.",

  keywords: [
    "8th CPC calculator",
    "8th pay commission salary calculator",
    "7th vs 8th pay commission salary",
    "8th CPC arrear calculator",
    "central government salary calculator",
    "8th CPC fitment factor",
    "pay matrix calculator"
  ],

  authors: [{ name: "Deepak Kumar" }],
  creator: "Deepak Kumar",

  metadataBase: new URL("https://8cpccalculator.com"),

  alternates: {
    canonical: "https://8cpccalculator.com"
  },

  openGraph: {
    title: "8th CPC Salary Calculator",
    description:
      "Free 8th Pay Commission salary and arrear calculator for government employees.",
    url: "https://8cpccalculator.com",
    siteName: "8CPC Calculator",
    locale: "en_IN",
    type: "website",
    images: [
    {
      url: "/logo.png",
      width: 512,
      height: 512
    }
  ]
  },

  twitter: {
    card: "summary_large_image",
    title: "8th CPC Salary Calculator",
    description:
      "Calculate your expected 8th Pay Commission salary and arrears instantly."
  },

  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className="bg-gray-50 text-gray-900">

        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "8th CPC Salary Calculator",
              url: "https://8cpccalculator.com",
              applicationCategory: "FinanceApplication",
              operatingSystem: "All",
              description:
                "Online calculator for estimating 8th Pay Commission salary and arrears."
            })
          }}
        />

        <Header />

        <main className="max-w-md mx-auto px-4 py-4">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}