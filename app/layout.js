import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "8th CPC Salary Calculator (Tentative)",
  description:
    "Calculate tentative 8th Pay Commission salary and compare with current 7th CPC salary.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">

        <Header />

        <main className="max-w-md mx-auto px-4 py-4">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}