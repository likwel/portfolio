/*
 * Certifications affichées dans la section Formation (et transmises au chatbot).
 * Le bloc reste masqué tant que la liste est vide. Du plus récent au plus ancien.
 *
 *   name         intitulé officiel (non traduit)
 *   issuer       organisme émetteur
 *   platform     plateforme de formation (optionnel)
 *   date         "AAAA-MM" (date de délivrance)
 *   credentialId identifiant (optionnel)
 *   url          lien de vérification (optionnel)
 *   skills       compétences associées : { fr: [...], en: [...] } (optionnel)
 */
export const CERTIFICATIONS = [
  {
    name: "Qualitative Data Management and Analysis for Monitoring and Evaluation (M&E)",
    issuer: "IDEAL · USAID",
    platform: "Kaya",
    date: "2026-09",
    credentialId: "5520601211EA",
    url: "https://kayaconnect.org/pluginfile.php/1/tool_certificate/issues/1790522431/5520601211EA.pdf",
    skills: {
      fr: ["Analyse qualitative", "Suivi-évaluation (M&E)"],
      en: ["Qualitative analysis", "Monitoring & Evaluation"],
    },
  },
  {
    name: "FIELD Introduction to MEAL",
    issuer: "Save the Children",
    platform: "Kaya",
    date: "2026-09",
    url: "https://openbadgefactory.com/obv3/credentials/ff2afe8634286360a75c96c91a00e6c607c7281b",
    skills: {
      fr: ["MEAL", "Suivi", "Évaluation", "Redevabilité"],
      en: ["MEAL", "Monitoring", "Evaluation", "Accountability"],
    },
  },
  {
    name: "English for Science, Technology, Engineering, and Mathematics (STEM) MOOC",
    issuer: "U.S. Department of State · OPEN",
    platform: "FHI 360",
    date: "2024-03",
    url: "https://badges.parchment.com/public/assertions/P6Az-wGXTFCJIcxKqkeaLw",
    skills: {
      fr: ["Anglais professionnel", "STEM"],
      en: ["Professional English", "STEM"],
    },
  },
];
