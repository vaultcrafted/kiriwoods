import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface mt-32 noise">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-5xl text-foreground">K</span>
            <span className="font-jp text-xs text-muted-foreground">woods · art · design</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Bottega italiana di stampa DTF su betulla. Pezzi unici, fatti a mano,
            spediti dal nostro laboratorio.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 pt-2 max-w-sm"
          >
            <input
              type="email"
              required
              placeholder="la-tua@email.com"
              className="flex-1 bg-transparent border-b border-border px-1 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-kiri-red transition-colors"
            />
            <button className="text-xs uppercase tracking-[0.2em] text-foreground hover:text-kiri-red transition-colors">
              Iscriviti →
            </button>
          </form>
        </div>

        <FooterCol title="Shop" links={[
          { to: "/catalogo", label: "Catalogo" },
          { to: "/crea", label: "Crea Ora" },
        ]} />
        <FooterCol title="Info" links={[
          { to: "/storia", label: "Storia" },
          { to: "/contatti", label: "Contatti" },
        ]} />
        <FooterCol title="Legali" links={[
          { to: "/", label: "Privacy" },
          { to: "/", label: "Cookie" },
          { to: "/", label: "Termini" },
        ]} />

        <div className="md:col-span-2 flex md:flex-col gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-kiri-red transition-colors"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col md:flex-row justify-between gap-2 text-[11px] text-muted-foreground">
          <span>© {new Date().getFullYear()} KIRI Art — Laboratorio in Livorno Ferraris (VC)</span>
          <span>P.IVA IT00000000000</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div className="md:col-span-2">
      <h4 className="font-display text-sm tracking-[0.25em] text-foreground mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
