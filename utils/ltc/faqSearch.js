export function searchFAQ(query, data) {
  if (!query) return [];

  const q = query.toLowerCase();

  return data.flatMap((section) =>
    section.faqs.filter((item) =>
      item.q.toLowerCase().includes(q) ||
      item.a.toLowerCase().includes(q)
    )
  );
}