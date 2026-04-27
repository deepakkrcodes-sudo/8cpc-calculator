"use client";

import { useState } from "react";
import { FAQ_DATA } from "./faqData";

export default function LTCAirFAQSection() {
  const [search, setSearch] = useState("");

  const filtered = FAQ_DATA.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow p-4 mt-6">

      {/* HEADER */}
      <h2 className="text-xl font-semibold mb-4">
        ✈️ LTC Air Travel FAQ (LTC-80, Eligibility & Rules)
      </h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search (e.g. LTC-80, Air India, J&K, eligibility)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4"
      />

      {/* FAQ LIST */}
      <div className="space-y-3">
        {(search ? filtered : FAQ_DATA).map((f, i) => (
          <FAQItem key={i} faq={f} />
        ))}
      </div>
    </div>
  );
}

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg p-3">
      <div
        className="font-medium cursor-pointer flex justify-between"
        onClick={() => setOpen(!open)}
      >
        {faq.q}
        <span>{open ? "−" : "+"}</span>
      </div>

      {open && (
        <div className="text-sm text-gray-600 mt-2">
          {faq.a}
        </div>
      )}
    </div>
  );
}