import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

const nav = [
  { to: "/catalogo", label: "Catalogo" },
  { to: "/crea", label: "Crea Ora" },
  { to: "/storia", label: "Storia" },
  { to: "/contatti", label: "Contatti" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link to="/" className="flex items-center gap-2 group" aria-label="KIRI Art home">
          <span className="font-display text-2xl tracking-wider transition-colors group-hover:text-kiri-red">
            KIRI
          </span>
          <span className="hidden sm:inline font-jp text-[10px] text-muted-foreground tracking-wider">
            woods · art · design
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            IT / EN
          </span>
          <button
            aria-label="Le mie richieste"
            className="rounded-sm border border-border p-2 text-foreground transition-colors hover:border-kiri-red hover:text-kiri-red"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
          <button
            aria-label="Apri menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden rounded-sm border border-border p-2"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="flex flex-col px-5 py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
