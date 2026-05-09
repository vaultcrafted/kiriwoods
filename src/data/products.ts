import p1 from "@/assets/prod-1.jpg";
import p2 from "@/assets/prod-2.jpg";
import p3 from "@/assets/prod-3.jpg";
import p4 from "@/assets/prod-4.jpg";
import p5 from "@/assets/prod-5.jpg";
import p6 from "@/assets/prod-6.jpg";

export type Category = "musica" | "anime" | "film" | "luoghi" | "eventi";

export type Product = {
  slug: string;
  title: string;
  category: Category;
  categoryLabel: string;
  image: string;
  description: string;
  basePrice: number; // A5 / 3mm
};

export const categories: { id: Category; label: string; tagline: string }[] = [
  { id: "musica", label: "Musica", tagline: "Album, vinili, riff." },
  { id: "anime", label: "Anime", tagline: "Tratti, kanji, sogni." },
  { id: "film", label: "Film & Serie", tagline: "Frame indimenticabili." },
  { id: "luoghi", label: "Luoghi", tagline: "Mappe, città, viaggi." },
  { id: "eventi", label: "Eventi", tagline: "Concerti, poster, date." },
];

export const products: Product[] = [
  { slug: "burl-map", title: "Burl Map", category: "luoghi", categoryLabel: "Luoghi", image: p1, description: "Cartografia astratta in toni di terra, stampata su betulla con bordo naturale.", basePrice: 28 },
  { slug: "yoru-no-mori", title: "Yoru no Mori", category: "anime", categoryLabel: "Anime", image: p2, description: "Illustrazione notturna con kanji a inchiostro. Ispirata al cinema d'animazione giapponese.", basePrice: 32 },
  { slug: "vinyl-spin", title: "Vinyl Spin", category: "musica", categoryLabel: "Musica", image: p3, description: "Omaggio al vinile. Cerchi concentrici, pattern grafici, rispetto per il suono.", basePrice: 30 },
  { slug: "neon-orbit", title: "Neon Orbit", category: "film", categoryLabel: "Film & Serie", image: p4, description: "Poster cinematografico stampato su tavola, colori saturi su grano caldo.", basePrice: 32 },
  { slug: "white-pine", title: "White Pine", category: "luoghi", categoryLabel: "Luoghi", image: p5, description: "Minimalismo pulito: la venatura del legno è il soggetto principale.", basePrice: 26 },
  { slug: "stage-light", title: "Stage Light", category: "eventi", categoryLabel: "Eventi", image: p6, description: "Memorabilia di un concerto. Catturato in stampa, fissato per sempre.", basePrice: 30 },
];

export const formats = [
  { id: "A5", label: "A5", dims: "14.8 × 21 cm", multiplier: 1 },
  { id: "A4", label: "A4", dims: "21 × 29.7 cm", multiplier: 1.6 },
  { id: "A3", label: "A3", dims: "29.7 × 42 cm", multiplier: 2.4 },
] as const;

export const thicknesses = [
  { id: "3mm", label: "3 mm", multiplier: 1 },
  { id: "5mm", label: "5 mm", multiplier: 1.25 },
] as const;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
