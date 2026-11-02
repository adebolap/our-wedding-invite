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
    headline: "Closer than the miles",
    pull: "It took time. It was worth every bit.",
    body: "A mutual friend put us in each other's path in November 2020. Even with distance between us, we kept finding our way to each other. It took time to become each other's favourite person. Then came the yes that made us one.",
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
      {
        when: "Early days",
        title: "Still getting to know",
        image: "/story-getting-to-know.jpg",
        alt: "Kelly and Seun sitting together on a sofa in the early days",
      },
      {
        when: "Almost there",
        title: "Just before the proposal",
        image: "/moment-4.jpg",
        alt: "Kelly and Seun cosy together at home",
      },
      {
        when: "The yes",
        title: "Finally to be one",
        image: "/story-finally-one.jpg",
        alt: "Kelly and Seun close together after saying yes",
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
    headline: "Pictures of us",
    body: "Scratch a favourite frame, then keep going through the days that still make us smile.",
    websiteLabel: "Visit our website",
    /** Set this to your couple site / gallery URL when ready. */
    websiteUrl: "",
    scratchImage: {
      src: "/moment-5.jpg",
      alt: "A forehead kiss on a bright afternoon",
    },
    chapters: [
      {
        title: "Trips we took",
        note: "Balcony selfies, boat rides, and sunny walks by the water.",
        images: [
          { src: "/moment-1.jpg", alt: "Balcony selfie above the city" },
          { src: "/moment-2.jpg", alt: "Smiling on a boat ride" },
          { src: "/moment-3.jpg", alt: "By the water in the sunshine" },
        ],
      },
      {
        title: "Ordinary days",
        note: "Sofa afternoons, quick kisses, flowers for no big reason.",
        images: [
          { src: "/moment-4.jpg", alt: "Together on the sofa at home" },
          { src: "/moment-5.jpg", alt: "A gelato-day kiss" },
          { src: "/moment-6.jpg", alt: "Park bench with a bouquet" },
          { src: "/moment-7.jpg", alt: "Kelly in the garden glow" },
        ],
      },
      {
        title: "After we said yes",
        note: "White linen, held hands, and that cannot-stop-smiling season.",
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
