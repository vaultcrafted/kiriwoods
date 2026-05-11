import { Link } from "@tanstack/react-router";
import { products } from "@/data/products";

export function FeaturedCatalog() {
  return (
    <section className="border-t border-border bg-surface noise">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-24">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="font-jp text-sm text-kiri-red mb-2">selezione</p>
            <h2 className="font-display text-4xl md:text-5xl">IN EVIDENZA</h2>
          </div>
          <Link
            to="/catalogo"
            className="text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-kiri-red transition-colors"
          >
            Vedi tutto →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {products.slice(0, 4).map((p) => (
            <Link
              key={p.slug}
              to="/prodotto/$slug"
              params={{ slug: p.slug }}
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden bg-background border border-border">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity rounded-sm bg-accent px-5 py-2 text-[10px] uppercase tracking-[0.25em] text-accent-foreground">
                    Vedi
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl tracking-wide leading-tight">
                    {p.title.toUpperCase()}
                  </h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    A5 · A4 · A3
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-kiri-red border border-kiri-red px-2 py-1 whitespace-nowrap">
                  {p.categoryLabel}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
