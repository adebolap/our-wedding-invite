/**
 * Wedding invite content — edit this file to personalize the site.
 */
export const site = {
  partners: {
    one: { first: "Kelly", full: "Kelly" },
    two: { first: "Seun", full: "Seun Adebola" },
  },
  monogram: "K & S",
  tagline:
    "You're on the guest list — here's everything you need for our celebration.",
  date: {
    label: "Sunday, 29 November 2026",
    iso: "2026-11-29T16:00:00+01:00",
    time: "4:00 in the afternoon",
  },
  venue: {
    name: "Nómaada",
    address: "4b Musa Yar'Adua Street, Victoria Island, Lagos",
    mapUrl: "https://maps.google.com/?q=Nomaada+Restaurant+Victoria+Island+Lagos",
    note: "Join us at Nómaada for the celebration. Victoria Island — parking guidance will follow closer to the day.",
  },
  heroImage: "/hero.jpg",
  gatheringImage: "/gathering.jpg",
  venueImage: "/venue.jpg",
  story: {
    headline: "Two hearts, one long yes",
    body: "From sunlit balconies and boat rides to quiet sofas and golden-hour gardens, our story has always been made of small, ordinary wonders. Now we get to say yes — with you beside us — at Nómaada.",
  },
  schedule: [
    {
      time: "4:00 pm",
      title: "Ceremony",
      detail: "Join us as we exchange vows.",
    },
    {
      time: "5:00 pm",
      title: "Cocktails",
      detail: "Drinks, music, and golden-hour portraits.",
    },
    {
      time: "6:30 pm",
      title: "Dinner & dancing",
      detail: "A shared meal, toasts, and a night on the floor.",
    },
  ],
  moments: {
    headline: "Our love, in frames",
    body: "Scratch to open a favourite still — then wander through the chapters that brought us here.",
    websiteLabel: "Visit our website",
    /** Set this to your couple site / gallery URL when ready. */
    websiteUrl: "",
    scratchImage: {
      src: "/moment-5.jpg",
      alt: "A forehead kiss on a bright afternoon",
    },
    chapters: [
      {
        title: "Where we wandered",
        note: "Cities, water, and the wide open sky.",
        images: [
          { src: "/moment-1.jpg", alt: "Balcony selfie above the city" },
          { src: "/moment-2.jpg", alt: "Smiling on a boat ride" },
          { src: "/moment-3.jpg", alt: "By the water in the sunshine" },
        ],
      },
      {
        title: "Everyday tenderness",
        note: "Home light, soft afternoons, flowers in hand.",
        images: [
          { src: "/moment-4.jpg", alt: "Together on the sofa at home" },
          { src: "/moment-5.jpg", alt: "A gelato-day kiss" },
          { src: "/moment-6.jpg", alt: "Park bench with a bouquet" },
          { src: "/moment-7.jpg", alt: "Kelly in the garden glow" },
        ],
      },
      {
        title: "Becoming forever",
        note: "White linen, held hands, and the promise ahead.",
        images: [
          { src: "/moment-8.jpg", alt: "An embrace by the window" },
          { src: "/moment-10.jpg", alt: "Holding hands in the doorway" },
          { src: "/moment-9.jpg", alt: "A festive kiss under the lights" },
        ],
      },
    ],
  },
  dressCode: "Evening formal — soft neutrals and deep tones welcome",
  footerNote: "With love, Kelly & Seun",
} as const

export type SiteConfig = typeof site
