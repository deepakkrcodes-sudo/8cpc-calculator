"use client";

import { useState } from "react";
import { FAQ_DATA } from "./faqData";


export default function LTCMasterFAQ() {
  const [active, setActive] = useState("BASICS");
  const [search, setSearch] = useState("");

  const results = FAQ_DATA.flatMap((sec) =>
    sec.faqs.filter(
      (f) =>
        f.q.toLowerCase().includes(search.toLowerCase()) ||
        f.a.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-xl shadow p-4 mt-6">

      <h2 className="text-xl font-semibold mb-4">
        📚 Complete LTC FAQ Guide
      </h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search LTC questions (e.g. block year, air travel, claim)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4"
      />

      {/* SEARCH RESULTS */}
      {search && (
        <div className="space-y-3">
          {results.length === 0 && (
            <div className="text-sm text-gray-500">No results found</div>
          )}
          {results.map((f, i) => (
            <FAQItem key={i} faq={f} />
          ))}
        </div>
      )}

      {/* TABS */}
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
        <div className="text-sm text-gray-600 mt-2 leading-relaxed">
          {faq.a}
        </div>
      )}
    </div>
  );
}