import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { categories, products } from "@/data/products";

export const Route = createFileRoute("/catalogo")({
  component: CatalogPage,
  head: () => ({
    meta: [
      { title: "Catalogo — KIRI Art" },
      { name: "description", content: "Tutte le tavole in betulla stampate dalla bottega KIRI. Musica, anime, film, luoghi, eventi." },
    ],
  }),
});

function CatalogPage() {
  const [active, setActive] = useState<string>("tutti");
  const filtered = active === "tutti" ? products : products.filter((p) => p.category === active);

  return (
    <SiteShell>
      <PageHeader
        eyebrow="カタログ — il catalogo"
        title="CATALOGO"
        intro="Una selezione viva, che cambia. Ogni pezzo viene stampato dopo l'ordine."
        noise
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8 pb-24">
        <div className="flex flex-wrap gap-2 mb-10 border-y border-border py-5">
          {[{ id: "tutti", label: "Tutti" }, ...categories.map((c) => ({ id: c.id, label: c.label }))].map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border transition-colors ${
                active === c.id ? "border-kiri-red text-kiri-red" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              to="/prodotto/$slug"
              params={{ slug: p.slug }}
              className="group"
            >
              <div className="aspect-square overflow-hidden bg-surface border border-border">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="font-display text-xl mt-3 tracking-wide">{p.title.toUpperCase()}</h3>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{p.categoryLabel} · da €{p.basePrice}</p>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
