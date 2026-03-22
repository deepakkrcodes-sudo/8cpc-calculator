"use client";

import { useState } from "react";
import { FAQ_DATA } from "@/utils/ltc/faqData";
import { searchFAQ } from "@/utils/ltc/faqSearch";

export default function FAQSection() {
  const [active, setActive] = useState("NEW_RECRUIT");
  const [search, setSearch] = useState("");

  const results = searchFAQ(search, FAQ_DATA);

  return (
    <div className="bg-white rounded-xl shadow p-4 mt-6">

      {/* HEADER */}
      <h2 className="text-xl font-semibold mb-4">
        📚 LTC FAQ Guide
      </h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search your question... (e.g. flight, family, block)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4"
      />

      {/* SEARCH RESULTS */}
      {search && (
        <div className="space-y-3 mb-4">
          {results.length === 0 && (
            <div className="text-sm text-gray-500">
              No matching FAQ found
            </div>
          )}

          {results.map((f, i) => (
            <FAQItem key={i} faq={f} />
          ))}
        </div>
      )}

      {/* CATEGORY TABS */}
      {!search && (
        <>
          <div className="flex gap-2 flex-wrap mb-4">
            {FAQ_DATA.map((sec) => (
              <button
                key={sec.category}
                onClick={() => setActive(sec.category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  active === sec.category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {sec.icon} {sec.title}
              </button>
            ))}
          </div>

          {/* FAQ LIST */}
          <div className="space-y-3">
            {FAQ_DATA.find((s) => s.category === active)?.faqs.map((f, i) => (
              <FAQItem key={i} faq={f} />
            ))}
          </div>
        </>
      )}
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