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
    iso: "2026-11-29T17:00:00+01:00",
    time: "5:00 in the afternoon",
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
  schedule: [
    {
      time: "5:00 pm",
      title: "The vow ceremony",
      detail: "We gather for the vows.",
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
      title: "Taco time",
      detail: "The afterparty meal, and the celebration goes on.",
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
    prompt: "Need inspiration on what to wear?",
    lede: "Choose for her or for him to open look ideas from our style guide.",
    themeLine: "Glamour chic · A-list · Colour cocktail",
    outdoorNote:
      "We'll be celebrating outdoors from 5pm into the evening, so dress for the warm Lagos air. Choose light, breathable fabrics like linen, cotton and chiffon. A light layer will be welcome once the sun sets.",
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
  footerNote: "All our love, Kelly & Seun",
} as const

export type SiteConfig = typeof site
