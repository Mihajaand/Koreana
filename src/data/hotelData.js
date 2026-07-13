// Données de l'hôtel — centralisées ici pour être faciles à modifier
// (extraites du document hotel_chambre.docx)

export const hotel = {
  name: "Koreana",
  baseline: "Hôtel — Talatamaty, Antananarivo",
  address: "Lot 131G Amboropotsy, Talatamaty, Antananarivo",
  phone: "+261 34 40 477 77",
  phoneHref: "tel:+261344047777",
  email: "koreana131@gmail.com",
  facebook: "https://web.facebook.com/profile.php?id=61581186059152",

};

export const services = [
  { id: "wifi", label: "Wifi" },
  { id: "clim", label: "Climatiseur" },
  { id: "tv", label: "TV" },
  { id: "blanchisserie", label: "Blanchisserie" },
  { id: "coffre", label: "Coffre" },
  { id: "parking", label: "Parking discret & sécurisé" },
  { id: "eauchaude", label: "Eau chaude" },
  { id: "restaurant", label: "Restaurant" },
];

// Catégories de chambres avec leurs tarifs (en Ariary)
export const roomCategories = [
  {
    id: "standard",
    name: "Standard",
    rooms: 9,
    tagline: "L'essentiel, confortable et bien pensé",
    description:
      "Nos chambres Standard offrent tout le nécessaire pour un séjour agréable : literie soignée, climatisation et salle d'eau privée, dans une ambiance sobre et chaleureuse.",
    pricing: {
      dayUse: 180000,
      nightWithBreakfast1p: 220000,
      nightWithBreakfast2p: 240000,
    },
  },
  {
    id: "appartement",
    name: "Appartement",
    rooms: 8,
    tagline: "Plus d'espace pour plus de liberté",
    description:
      "Pensé pour les séjours prolongés ou les voyageurs en quête d'espace, l'Appartement propose un cadre spacieux avec coin salon, alliant confort et intimité.",
    pricing: {
      dayUse: 280000,
      nightWithBreakfast1p: 300000,
      nightWithBreakfast2p: 320000,
    },
  },
];

export const formatAr = (amount) =>
  `${amount.toLocaleString("fr-FR").replace(/,/g, " ")} Ar`;
