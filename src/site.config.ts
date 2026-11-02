/**
 * Wedding invite content. Edit this file to personalize the site.
 */
export const site = {
  partners: {
    one: { first: "Kelly", full: "Kelly" },
    two: { first: "Seun", full: "Seun Adebola" },
  },
  monogram: "K & S",
  tagline: "You are already part of our joy. Here is the day we make forever official.",
  date: {
    label: "Sunday, 29 November 2026",
    iso: "2026-11-29T16:00:00+01:00",
    time: "4:00 in the afternoon",
  },
  venue: {
    name: "Nómaada",
    address: "4b Musa Yar'Adua Street, Victoria Island, Lagos",
    mapUrl: "https://maps.google.com/?q=Nomaada+Restaurant+Victoria+Island+Lagos",
    note: "We gather at Nómaada on Victoria Island. Parking notes will follow closer to the day.",
  },
  heroImage: "/hero.jpg",
  gatheringImage: "/gathering.jpg",
  venueImage: "/venue.jpg",
  story: {
    headline: "A love written across two continents",
    pull: "We found each other early. We chose each other fully.",
    body: "In November 2020, a mutual friend brought us onto the same screen. Years of late calls, shared laughter, and steady care followed. In May 2025, friendship tipped into love. Between Nigeria and Belgium we kept finding our way to each other, until Belgium became home, and forever became the plan.",
    milestones: [
      {
        when: "November 2020",
        what: "A friend introduced us online",
      },
      {
        when: "May 2025",
        what: "Friendship became love",
      },
      {
        when: "Nigeria & Belgium",
        what: "Visits that closed the distance",
      },
      {
        when: "Belgium",
        what: "Home, side by side",
      },
    ],
  },
  schedule: [
    {
      time: "4:00 pm",
      title: "Ceremony",
      detail: "Vows, joy, and the start of forever.",
    },
    {
      time: "5:00 pm",
      title: "Cocktails",
      detail: "Music, golden light, and sweet company.",
    },
    {
      time: "6:30 pm",
      title: "Dinner & dancing",
      detail: "A long table, warm toasts, and a night that moves.",
    },
  ],
  moments: {
    headline: "A love you can feel",
    body: "Scratch open a favourite frame, then wander through the moments that made us us.",
    websiteLabel: "Visit our website",
    /** Set this to your couple site / gallery URL when ready. */
    websiteUrl: "",
    scratchImage: {
      src: "/moment-5.jpg",
      alt: "A forehead kiss on a bright afternoon",
    },
    chapters: [
      {
        title: "Miles we crossed",
        note: "Cities, water, and the wide sky between us.",
        images: [
          { src: "/moment-1.jpg", alt: "Balcony selfie above the city" },
          { src: "/moment-2.jpg", alt: "Smiling on a boat ride" },
          { src: "/moment-3.jpg", alt: "By the water in the sunshine" },
        ],
      },
      {
        title: "Soft days",
        note: "Home light, quiet afternoons, flowers in hand.",
        images: [
          { src: "/moment-4.jpg", alt: "Together on the sofa at home" },
          { src: "/moment-5.jpg", alt: "A gelato-day kiss" },
          { src: "/moment-6.jpg", alt: "Park bench with a bouquet" },
          { src: "/moment-7.jpg", alt: "Kelly in the garden glow" },
        ],
      },
      {
        title: "This promise",
        note: "White linen, held hands, forever in view.",
        images: [
          { src: "/moment-8.jpg", alt: "An embrace by the window" },
          { src: "/moment-10.jpg", alt: "Holding hands in the doorway" },
          { src: "/moment-9.jpg", alt: "A festive kiss under the lights" },
        ],
      },
    ],
  },
  dressCode: "Evening formal. Soft neutrals and deep tones welcome.",
  footerNote: "All our love, Kelly & Seun",
} as const

export type SiteConfig = typeof site
