/**
 * Wedding invite content. Edit this file to personalize the site.
 */
export const site = {
  partners: {
    one: { first: "Kelly", full: "Kelly" },
    two: { first: "Seun", full: "Seun Adebola" },
  },
  monogram: "K & S",
  tagline: "We can't wait to celebrate with you.",
  date: {
    label: "Sunday, 29 November 2026",
    iso: "2026-11-29T16:00:00+01:00",
    time: "4:00 in the afternoon",
  },
  venue: {
    name: "Nómaada",
    address: "4b Musa Yar'Adua Street, Victoria Island, Lagos",
    mapUrl: "https://maps.google.com/?q=Nomaada+Restaurant+Victoria+Island+Lagos",
  },
  heroImage: "/hero.jpg",
  /** Ocean portrait beside the verse. */
  gatheringImage: "/gathering.jpg",
  story: {
    headline: "He makes everything beautiful in His time",
    reference: "Ecclesiastes 3:11",
  },
  schedule: [
    {
      time: "4:00 pm",
      title: "Beginning",
      detail: "Guests arrive as the day opens.",
    },
    {
      time: "5:00 pm",
      title: "Vow ceremony",
      detail: "The vows begin.",
    },
    {
      time: "7:15 pm",
      title: "Dinner",
      detail: "A shared meal to begin the evening.",
    },
    {
      time: "9:15 pm",
      title: "First dance",
      detail: "Cake, then we take the floor.",
    },
    {
      time: "10:30 pm",
      title: "Dance to the night",
      detail: "The floor stays open as we celebrate on.",
    },
  ],
  moments: {
    headline: "Pictures of us",
    body: "Scratch a favourite frame to reveal a moment we love.",
    websiteLabel: "Visit our website",
    /** Set this to your couple site / gallery URL when ready. */
    websiteUrl: "",
    scratchImage: {
      src: "/moment-5.jpg",
      alt: "A close laugh together on a park bench",
    },
  },
  dressCode: "Theme and colour cocktail",
  colourCocktail: [
    { name: "Muted sage", hex: "#697350" },
    { name: "Soft beige", hex: "#d9bfa6" },
    { name: "Burgundy", hex: "#4a2028" },
    { name: "Gold", hex: "#cbb25e" },
    { name: "Terracotta", hex: "#cb8351" },
    { name: "Purple", hex: "#4d0664" },
  ],
  colourPaletteImage: "/colour-palette.jpg",
  styleGuide: {
    prompt: "Dress code ideas",
    lede: "Pick a look for her or for him from our style guide.",
    themeLine: "Glamour chic · A-list · Colour cocktail",
    outdoorNote:
      "We'll be celebrating outdoors from 4pm into the evening, so dress for the warm Lagos air. Choose light, breathable fabrics like linen, cotton and chiffon. A light layer will be welcome once the sun sets.",
    dos: [
      "Wear colour — bold, soft, or both",
      "Mix shades, tones and prints",
      "Keep it elegant and polished",
    ],
    donts: [
      "All-white or all-black looks",
      "Casual wear, denim or trainers",
      "Heavy fabrics that trap the heat",
    ],
    forHer: {
      label: "For her",
      image: "/style-guide/for-her.jpg",
      alt: "Style inspiration board for ladies",
    },
    forHim: {
      label: "For him",
      image: "/style-guide/for-him.jpg",
      alt: "Style inspiration board for gentlemen",
    },
    overviewImage: "/style-guide/colour-cocktail.jpg",
    pdf: "/KS-style-guide.pdf",
  },
  footerNote: "All our love",
} as const

export type SiteConfig = typeof site
