import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories, products } from "@/data/products";

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-5 md:px-8 py-24">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="font-jp text-sm text-kiri-red mb-2">カテゴリー</p>
          <h2 className="font-display text-4xl md:text-5xl">CATEGORIE</h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-xs">
          Cinque mondi. Lo stesso legno.
        </p>
      </div>

      {/* Mobile: scroll orizzontale · Desktop: 5 colonne uguali */}
      <div className="flex md:grid md:grid-cols-5 gap-3 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none -mx-5 px-5 md:mx-0 md:px-0 pb-2 md:pb-0 scrollbar-hide">
        {categories.map((c) => {
          const cover = products.find((p) => p.category === c.id)?.image;
          return (
            <Link
              key={c.id}
              to="/catalogo"
              className="group relative overflow-hidden rounded-sm border border-border bg-surface aspect-[3/4] flex-shrink-0 w-[75vw] sm:w-[55vw] md:w-auto snap-start"
            >
              {cover && (
                <img
                  src={cover}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:opacity-70 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0 bg-kiri-red opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-30" />
              <div className="relative h-full flex flex-col justify-end p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">
                  0{categories.indexOf(c) + 1}
                </p>
                <h3 className="font-display text-3xl md:text-4xl tracking-wide leading-none">
                  {c.label.toUpperCase()}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">{c.tagline}</p>
                <ArrowRight className="absolute top-5 right-5 h-5 w-5 text-foreground translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
