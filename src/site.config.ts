/**
 * Wedding invite content — edit this file to personalize the site.
 * Sample details below are placeholders and should be replaced before sharing.
 */
export const site = {
  partners: {
    one: { first: "Amara", full: "Amara Okonkwo" },
    two: { first: "Seun", full: "Seun Adebola" },
  },
  monogram: "A & S",
  tagline: "Together with our families, we invite you to celebrate our marriage.",
  date: {
    label: "Saturday, 20 June 2026",
    iso: "2026-06-20T15:00:00+01:00",
    time: "3:00 in the afternoon",
  },
  venue: {
    name: "The Olive Courtyard",
    address: "14 Garden Lane, Lagos",
    mapUrl: "https://maps.google.com",
    note: "Ceremony outdoors, reception under the pavilion. Parking available on site.",
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
      time: "3:00 pm",
      title: "Ceremony",
      detail: "Join us as we exchange vows in the courtyard.",
    },
    {
      time: "4:30 pm",
      title: "Cocktails",
      detail: "Drinks, music, and golden-hour portraits.",
    },
    {
      time: "6:00 pm",
      title: "Dinner & dancing",
      detail: "A shared meal, toasts, and a night on the floor.",
    },
  ],
  rsvp: {
    headline: "Kindly reply by 1 May 2026",
    body: "Let us know if you can celebrate with us — and if you will bring a guest.",
    /** Optional: paste a Formspree / Getform endpoint to collect responses. */
    endpoint: "",
  },
  dressCode: "Garden formal — soft colors welcome",
  footerNote: "With love, Amara & Seun",
} as const

export type SiteConfig = typeof site
