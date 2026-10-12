import dhoopImage from "@/assets/kashya-dhoop.jpg";
import samraniImage from "@/assets/kashya-samrani.jpg";

export type Product = {
  id: string;
  name: string;
  weight?: string;
  category: string;
  description: string;
  price?: number;
  image: string;
  imageAlt: string;
  status?: "preview";
};

export const products: Product[] = [
  {
    id: "dhoopsticks-jar-130g",
    name: "Dhoopsticks Jar",
    weight: "130 g",
    category: "Dhoop",
    description: "A considered format for an everyday dhoop ritual.",
    price: 349,
    image: dhoopImage,
    imageAlt: "Dhoop sticks arranged in a ceramic vessel in warm morning light",
  },
  {
    id: "dhoopsticks-pouch-150g",
    name: "Dhoopsticks Pouch",
    weight: "150 g",
    category: "Dhoop",
    description: "A simple refill format for a familiar daily practice.",
    price: 150,
    image: dhoopImage,
    imageAlt: "Natural brown dhoop sticks on handmade paper",
  },
  {
    id: "samrani-cup-200g",
    name: "Samrani Cup",
    weight: "200 g",
    category: "Camphor & Naturals",
    description: "Traditional samrani cups, presented for a modern home.",
    price: 299,
    image: samraniImage,
    imageAlt: "Terracotta samrani cups with aromatic resin in soft sunlight",
  },
  {
    id: "botanical-incense-preview",
    name: "Botanical Incense Sticks",
    category: "Incense Sticks",
    description: "A future addition to the KASHYA aromatic collection.",
    image: dhoopImage,
    imageAlt: "Botanical incense sticks styled with brass and greenery",
    status: "preview",
  },
  {
    id: "home-fragrance-preview",
    name: "Home Fragrance Ritual",
    category: "Home Fragrance",
    description: "An aromatic home object currently being considered.",
    image: samraniImage,
    imageAlt: "Warm ritual objects arranged in a quiet Indian interior",
    status: "preview",
  },
];

export const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;