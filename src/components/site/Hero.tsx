import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroWood from "@/assets/hero-wood.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden noise">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${heroWood})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background"
        aria-hidden="true"
      />
      {/* Red brush slash */}
      <div
        className="absolute -right-20 top-1/3 h-px w-[55%] bg-kiri-red opacity-80 rotate-[-8deg]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-32 grid md:grid-cols-12 gap-8 items-end w-full">
        <div className="md:col-span-9 lg:col-span-8 space-y-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-kiri-red" />
            <span className="font-jp text-sm text-muted-foreground">桐 — woods · art · design</span>
          </div>

          <h1 className="font-display text-[14vw] md:text-[8.5rem] lg:text-[10rem] leading-[0.85] text-foreground tracking-tight">
            ARTE
            <br />
            STAMPATA
            <br />
            <span className="text-kiri-red">SU LEGNO.</span>
          </h1>

          <p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
            Ogni tavola in betulla viene stampata al momento, nel nostro laboratorio.
            <span className="text-foreground"> Nessun magazzino. Nessuna serie.</span>
            {" "}Solo il tuo pezzo, unico.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/crea"
              className="group inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-4 text-xs uppercase tracking-[0.22em] font-medium text-accent-foreground transition-colors hover:bg-kiri-red-deep"
            >
              Crea la tua tavola
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-4 text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-foreground hover:bg-surface"
            >
              Esplora il catalogo
            </Link>
          </div>
        </div>

        <div className="md:col-span-3 lg:col-span-4 hidden md:block">
          <div className="space-y-2 text-right">
            <p className="font-jp text-xs text-muted-foreground">N° 001 — Edizione corrente</p>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Made in Italy<br />Livorno Ferraris
            </p>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground animate-pulse">
        scroll ↓
      </div>
    </section>
  );
}
