import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { formats, getProduct, products, thicknesses } from "@/data/products";

export const Route = createFileRoute("/prodotto/$slug")({
  component: ProductPage,
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.title} — KIRI Art` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.title} — KIRI Art` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-display text-5xl">PRODOTTO NON TROVATO</h1>
        <Link to="/catalogo" className="mt-8 inline-block text-xs uppercase tracking-[0.25em] text-kiri-red">
          ← Torna al catalogo
        </Link>
      </div>
    </SiteShell>
  ),
  errorComponent: ({ error }) => (
    <SiteShell>
      <div className="px-5 py-20 text-center text-sm text-muted-foreground">{error.message}</div>
    </SiteShell>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [format, setFormat] = useState<(typeof formats)[number]["id"]>("A4");
  const [thickness, setThickness] = useState<(typeof thicknesses)[number]["id"]>("3mm");
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState<string | null>("dettagli");

  const price = useMemo(() => {
    const fm = formats.find((f) => f.id === format)!.multiplier;
    const tm = thicknesses.find((t) => t.id === thickness)!.multiplier;
    return product.basePrice * fm * tm;
  }, [product, format, thickness]);

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-10">
        <nav className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/catalogo" className="hover:text-foreground">Catalogo</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 grid md:grid-cols-2 gap-10 lg:gap-16 pb-24">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden bg-surface border border-border noise">
            <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[product.image, product.image, product.image, product.image].map((src, i) => (
              <button
                key={i}
                className="relative aspect-square bg-surface border border-border overflow-hidden hover:border-kiri-red transition-colors"
              >
                <img src={src} alt="" className="h-full w-full object-cover opacity-70" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-kiri-red border border-kiri-red px-2 py-1">
            {product.categoryLabel}
          </span>
          <h1 className="font-display text-5xl md:text-6xl mt-5 leading-none tracking-wide">
            {product.title.toUpperCase()}
          </h1>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Format */}
          <div className="mt-10">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">Formato</p>
            <div className="grid grid-cols-3 gap-2">
              {formats.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`relative border p-4 text-left transition-all ${
                    format === f.id
                      ? "border-kiri-red bg-surface"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  <span className="block font-display text-2xl">{f.label}</span>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">
                    {f.dims}
                  </span>
                  {format === f.id && (
                    <Check className="absolute top-2 right-2 h-3 w-3 text-kiri-red" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Thickness */}
          <div className="mt-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">Spessore</p>
            <div className="grid grid-cols-2 gap-2">
              {thicknesses.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setThickness(t.id)}
                  className={`border p-4 transition-all ${
                    thickness === t.id
                      ? "border-kiri-red bg-surface"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  <span className="font-display text-2xl">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & price */}
          <div className="mt-8 flex items-end justify-between gap-6 border-t border-border pt-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Quantità</p>
              <div className="mt-2 inline-flex items-center border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:text-kiri-red">−</button>
                <span className="px-4 font-display text-xl">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 hover:text-kiri-red">+</button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Prezzo</p>
              <p className="font-display text-5xl text-foreground mt-1">
                €{(price * qty).toFixed(0)}
              </p>
            </div>
          </div>

          <button className="mt-6 group w-full inline-flex items-center justify-center gap-3 bg-accent px-6 py-5 text-xs uppercase tracking-[0.25em] font-medium text-accent-foreground hover:bg-kiri-red-deep transition-colors">
            Ordina ora
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <ul className="mt-5 grid grid-cols-2 gap-3 text-[11px] text-muted-foreground">
            <li className="border border-border p-3">⏱ Stampato in 5–7 giorni</li>
            <li className="border border-border p-3">📦 Spedizione gratuita</li>
          </ul>

          {/* Accordion */}
          <div className="mt-8 border-t border-border">
            {[
              { id: "dettagli", title: "Dettagli", body: "Tavola in betulla baltica, spessore selezionato. Stampa DTF a colori pieni, finitura matte. Bordi naturali non levigati." },
              { id: "materiali", title: "Materiali", body: "Legno di betulla certificato FSC. Inchiostri DTF a base acqua, resistenti alla luce. Nessuna vernice di finitura." },
              { id: "spedizione", title: "Spedizione & Resi", body: "Spedizione tracciata in 24/48h dopo la produzione. Consegna in Italia 1–2 giorni, EU 3–5 giorni. Resi entro 14 giorni." },
            ].map((a) => (
              <div key={a.id} className="border-b border-border">
                <button
                  onClick={() => setOpenAcc(openAcc === a.id ? null : a.id)}
                  className="w-full flex items-center justify-between py-5 text-left text-xs uppercase tracking-[0.25em]"
                >
                  {a.title}
                  <span className="text-kiri-red">{openAcc === a.id ? "−" : "+"}</span>
                </button>
                {openAcc === a.id && (
                  <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{a.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-20">
          <h2 className="font-display text-3xl md:text-4xl mb-10">POTREBBE PIACERTI</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/prodotto/$slug"
                params={{ slug: p.slug }}
                className="group"
              >
                <div className="aspect-square overflow-hidden bg-background border border-border">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="font-display text-lg mt-3 tracking-wide">{p.title.toUpperCase()}</h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{p.categoryLabel}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
