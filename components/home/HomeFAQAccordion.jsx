"use client";

import { useState } from "react";

export default function HomeFAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `home-faq-panel-${index}`;
        const buttonId = `home-faq-button-${index}`;

        return (
          <div
            key={faq.question}
            className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-semibold text-gray-900 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <span>{faq.question}</span>
              <span
                aria-hidden="true"
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-lg leading-none transition ${
                  isOpen
                    ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 bg-white text-gray-500"
                }`}
              >
                {isOpen ? "-" : "+"}
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-all duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="border-t border-gray-100 px-4 py-3 text-sm leading-relaxed text-gray-700">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
