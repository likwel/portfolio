/* Dates au format "AAAA-MM" (ou "AAAA") → libellés localisés */

const parse = (value) => {
  const [y, m] = String(value).split("-").map(Number);
  return { y, m: m || null };
};

export function formatMonth(value, language) {
  const { y, m } = parse(value);
  if (!m) return String(y);
  const label = new Intl.DateTimeFormat(language === "fr" ? "fr-FR" : "en-GB", { month: "short", year: "numeric" })
    .format(new Date(y, m - 1, 1));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatPeriod(start, end, language, t) {
  const from = formatMonth(start, language);
  const to = end ? formatMonth(end, language) : t("present");
  return from === to ? from : `${from} — ${to}`;
}

/* Durée inclusive, ex. "2 ans 7 mois" ; null si les mois ne sont pas connus */
export function formatDuration(start, end, t) {
  const a = parse(start);
  const now = new Date();
  const b = end ? parse(end) : { y: now.getFullYear(), m: now.getMonth() + 1 };
  if (!a.m || !b.m) return null;

  const months = (b.y - a.y) * 12 + (b.m - a.m) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [
    years && `${years} ${t(years > 1 ? "durYears" : "durYear")}`,
    rest && `${rest} ${t(rest > 1 ? "durMonths" : "durMonth")}`,
  ].filter(Boolean).join(" ");
}
