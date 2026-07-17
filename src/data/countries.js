// Génère l'URL du drapeau en ligne via FlagCDN (https://flagcdn.com)
// w40 = largeur 40px (tu peux mettre w20, w80, w160... selon la taille voulue)
export const getFlagUrl = (countryCode) =>
  `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

// Les 10 premiers pays affichés en priorité dans la liste
const topCountries = [
  { code: "KR", name: "Corée du Sud", dial: "+82" },
  { code: "MG", name: "Madagascar", dial: "+261" },     // Malagasy
  { code: "FR", name: "France", dial: "+33" },
  { code: "GB", name: "Royaume-Uni", dial: "+44" },     // Anglais
  { code: "DE", name: "Allemagne", dial: "+49" },
  { code: "ES", name: "Espagne", dial: "+34" },
  { code: "US", name: "États-Unis", dial: "+1" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "BE", name: "Belgique", dial: "+32" },
  { code: "IT", name: "Italie", dial: "+39" },
];

// Reste des pays (ordre alphabétique), sans doublons avec topCountries
const otherCountries = [
  { code: "CH", name: "Suisse", dial: "+41" },
  { code: "NL", name: "Pays-Bas", dial: "+31" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "MU", name: "Maurice", dial: "+230" },
  { code: "RE", name: "Réunion", dial: "+262" },
  { code: "ZA", name: "Afrique du Sud", dial: "+27" },
  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "MA", name: "Maroc", dial: "+212" },
  { code: "TN", name: "Tunisie", dial: "+216" },
  { code: "SN", name: "Sénégal", dial: "+221" },
  { code: "CI", name: "Côte d'Ivoire", dial: "+225" },
  { code: "EG", name: "Égypte", dial: "+20" },
  { code: "AE", name: "Émirats arabes unis", dial: "+971" },
  { code: "CN", name: "Chine", dial: "+86" },
  { code: "JP", name: "Japon", dial: "+81" },
  { code: "IN", name: "Inde", dial: "+91" },
  { code: "SG", name: "Singapour", dial: "+65" },
  { code: "TH", name: "Thaïlande", dial: "+66" },
  { code: "AU", name: "Australie", dial: "+61" },
  { code: "BR", name: "Brésil", dial: "+55" },
  { code: "RU", name: "Russie", dial: "+7" },
  { code: "TR", name: "Turquie", dial: "+90" },
  { code: "SE", name: "Suède", dial: "+46" },
  { code: "NO", name: "Norvège", dial: "+47" },
  { code: "DK", name: "Danemark", dial: "+45" },
  { code: "AT", name: "Autriche", dial: "+43" },
  { code: "GR", name: "Grèce", dial: "+30" },
];

export const countries = [...topCountries, ...otherCountries].map((c) => ({
  ...c,
  flag: getFlagUrl(c.code),
}));