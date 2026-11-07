/**
 * Wedding invite content. Edit this file to personalize the site.
 */
export const site = {
  partners: {
    one: { first: "Kelly", full: "Kelly" },
    two: { first: "Seun", full: "Seun Adebola" },
  },
  monogram: "K & S",
  tagline: "We can't wait to celebrate our love with You.",
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
  /** Same proposal portrait as the hero, kept beside the verse. */
  gatheringImage: "/story-before-proposal.jpg",
  story: {
    headline: "He makes everything beautiful in His time",
    reference: "Ecclesiastes 3:11",
    chapters: [
      {
        when: "2020",
        title: "Hello, Kelly",
        image: "/story-2020-kelly.jpg",
        alt: "Kelly in 2020, before their story began together",
      },
      {
        when: "2020",
        title: "Hello, Seun",
        image: "/story-2020-seun.jpg",
        alt: "Seun in 2020, before their story began together",
      },
    ],
  },
  /** Timeline times pending final confirmation with the planner. */
  schedule: [
    {
      time: "4:00 pm",
      title: "Ceremony",
      detail: "We gather for the vows.",
    },
    {
      time: "5:00 pm",
      title: "Cocktails",
      detail: "Drinks and company before dinner.",
    },
    {
      time: "6:30 pm",
      title: "Dinner & dancing",
      detail: "The table, the toasts, the floor.",
    },
    {
      time: "10:45 pm",
      title: "Evening close",
      detail: "We wrap the night around here.",
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
  footerNote: "All our love, Kelly & Seun",
} as const

export type SiteConfig = typeof site
