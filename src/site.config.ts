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
    note: "We gather at Nómaada on Victoria Island.",
  },
  heroImage: "/hero.jpg",
  gatheringImage: "/gathering.jpg",
  venueImage: "/venue.jpg",
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
      {
        when: "Early days",
        title: "Still getting to know",
        image: "/story-getting-to-know.jpg",
        alt: "Kelly and Seun together in the car in golden light",
      },
      {
        when: "Almost there",
        title: "Just before the proposal",
        image: "/story-before-proposal.jpg",
        alt: "Kelly and Seun together with a bouquet after the proposal",
      },
      {
        when: "The yes",
        title: "Finally to be one",
        image: "/story-finally-one.jpg",
        alt: "Kelly and Seun in a quiet white-linen embrace",
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
    headline: "From then to yes",
    body: "Scratch a favourite frame, then follow the same path as our story: finding our way, growing into favourites, and choosing forever.",
    websiteLabel: "Visit our website",
    /** Set this to your couple site / gallery URL when ready. */
    websiteUrl: "",
    scratchImage: {
      src: "/moment-5.jpg",
      alt: "A close laugh together on a park bench",
    },
    chapters: [
      {
        title: "Closer than the miles",
        note: "Even with distance between us, we kept finding our way to each other.",
        images: [
          { src: "/moment-1.jpg", alt: "By the ocean together" },
          { src: "/moment-2.jpg", alt: "A golden-hour selfie in the car" },
          { src: "/moment-3.jpg", alt: "A kiss under the leafy arch" },
        ],
      },
      {
        title: "Still getting to know",
        note: "It took time to become each other's favourite person.",
        images: [
          { src: "/moment-4.jpg", alt: "A cheek kiss by the archway" },
          { src: "/moment-5.jpg", alt: "Laughing together on a park bench" },
          { src: "/moment-6.jpg", alt: "Close with a bouquet in the park" },
          { src: "/moment-7.jpg", alt: "A playful mirror-room selfie" },
        ],
      },
      {
        title: "Finally to be one",
        note: "Then came the yes that made forever feel easy.",
        images: [
          { src: "/moment-8.jpg", alt: "A quiet embrace in white" },
          { src: "/moment-10.jpg", alt: "A kiss under the leafy arch" },
          { src: "/moment-9.jpg", alt: "Held close after the yes" },
        ],
      },
    ],
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
