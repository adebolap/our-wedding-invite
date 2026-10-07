/**
 * Wedding invite content — edit this file to personalize the site.
 */
export const site = {
  partners: {
    one: { first: "Kelly", full: "Kelly" },
    two: { first: "Seun", full: "Seun Adebola" },
  },
  monogram: "K & S",
  tagline: "Together with our families, we invite you to celebrate our marriage.",
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
    headline: "A quiet yes that grew louder",
    body: "What began as long walks and longer conversations became a promise we are ready to keep. We cannot wait to gather the people who shaped us and begin the next chapter together.",
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
  rsvp: {
    headline: "Kindly reply by 1 November 2026",
    body: "Let us know if you can celebrate with us — and if you will bring a guest.",
    /** Optional: paste a Formspree / Getform endpoint to collect responses. */
    endpoint: "",
  },
  dressCode: "Garden formal — soft colors welcome",
  footerNote: "With love, Kelly & Seun",
} as const

export type SiteConfig = typeof site
