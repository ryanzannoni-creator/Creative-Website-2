export const STORE_URL = "https://merch.google/";
export const STICKER_URL = `${import.meta.env.BASE_URL}img/builder-sticker.png`;
export const navigation = [
  { label: "Made for builders", href: "#hero" },
  { label: "Make your mark", href: "#value" },
  { label: "Why it belongs", href: "#benefits" },
  { label: "The Builder Pack", href: "#pack" },
  { label: "For campus clubs", href: "#clubs" },
];
export const benefits = [
  {
    title: "Show what you do",
    text: "Not just another brand logo. It tells people you're a coder, designer, or maker before you say a word.",
    icon: "</>",
    color: "green",
  },
  {
    title: "Fits your sticker stack",
    text: "Looks good on laptops, water bottles, and phone cases next to the rest of your collection.",
    icon: "↗",
    color: "blue",
  },
  {
    title: "Rep the builder community",
    text: "Made for the people at hackathons, late night lab sessions, and club meetings.",
    icon: "*",
    color: "red",
  },
] as const;
