import p1 from "@/assets/prod-1.jpg";
import p2 from "@/assets/prod-2.jpg";
import p3 from "@/assets/prod-3.jpg";
import p4 from "@/assets/prod-4.jpg";
import p5 from "@/assets/prod-5.jpg";
import p6 from "@/assets/prod-6.jpg";
 
export type Category = "musica" | "anime" | "film" | "luoghi" | "eventi";
 
export type FormatId = "A5" | "A4" | "A3";
export type ThicknessId = "5mm" | "10mm";
 
export type Product = {
  slug: string;
  title: string;
  category: Category;
  categoryLabel: string;
  image: string;
  description: string;
};
 
export const categories: { id: Category; label: string; tagline: string }[] = [
  { id: "musica", label: "Musica", tagline: "Album, vinili, riff." },
  { id: "anime", label: "Anime", tagline: "Tratti, kanji, sogni." },
  { id: "film", label: "Film & Serie", tagline: "Frame indimenticabili." },
  { id: "luoghi", label: "Luoghi", tagline: "Mappe, città, viaggi." },
  { id: "eventi", label: "Eventi", tagline: "Concerti, poster, date." },
];
 
export const products: Product[] = [
  { slug: "burl-map", title: "Burl Map", category: "luoghi", categoryLabel: "Luoghi", image: p1, description: "Cartografia astratta in toni di terra, stampata su betulla con bordo naturale." },
  { slug: "yoru-no-mori", title: "Yoru no Mori", category: "anime", categoryLabel: "Anime", image: p2, description: "Illustrazione notturna con kanji a inchiostro. Ispirata al cinema d'animazione giapponese." },
  { slug: "vinyl-spin", title: "Vinyl Spin", category: "musica", categoryLabel: "Musica", image: p3, description: "Omaggio al vinile. Cerchi concentrici, pattern grafici, rispetto per il suono." },
  { slug: "neon-orbit", title: "Neon Orbit", category: "film", categoryLabel: "Film & Serie", image: p4, description: "Poster cinematografico stampato su tavola, colori saturi su grano caldo." },
  { slug: "white-pine", title: "White Pine", category: "luoghi", categoryLabel: "Luoghi", image: p5, description: "Minimalismo pulito: la venatura del legno è il soggetto principale." },
  { slug: "stage-light", title: "Stage Light", category: "eventi", categoryLabel: "Eventi", image: p6, description: "Memorabilia di un concerto. Catturato in stampa, fissato per sempre." },
];
 
export const formats = [
  { id: "A5", label: "A5", dims: "14.8 × 21 cm" },
  { id: "A4", label: "A4", dims: "21 × 29.7 cm" },
  { id: "A3", label: "A3", dims: "29.7 × 42 cm" },
] as const;
 
export const thicknesses = [
  { id: "5mm", label: "5 mm" },
  { id: "10mm", label: "10 mm" },
] as const;
 
// Matrice prezzi ufficiale KIRI Art (in euro, IVA inclusa)
export const PRICING: Record<FormatId, Record<ThicknessId, number>> = {
  A5: { "5mm": 10, "10mm": 12 },
  A4: { "5mm": 15, "10mm": 17 },
  A3: { "5mm": 20, "10mm": 22 },
};
 
// Prezzo minimo del listino (per il "da €X" nel catalogo)
export const MIN_PRICE = 10;
 
export function getPrice(format: FormatId, thickness: ThicknessId): number {
  return PRICING[format][thickness];
}
 
export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
