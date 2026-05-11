import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/catalogo", label: "Catalogo", match: ["/catalogo", "/prodotto"] },
  { to: "/crea", label: "Crea Ora", match: ["/crea"] },
  { to: "/storia", label: "Storia", match: ["/storia"] },
  { to: "/contatti", label: "Contatti", match: ["/contatti"] },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

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
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="KIRI Art home"
          aria-current={isHome ? "page" : undefined}
        >
         <img
            src="/logo-kiri2.png"
            alt="KIRI Art — woods · art · design"
            className="h-9 md:h-10 w-auto transition-opacity group-hover:opacity-80"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => {
            const active = n.match.some((m) => pathname === m || pathname.startsWith(`${m}/`));
            return (
              <Link
                key={n.to}
                to={n.to}
                aria-current={active ? "page" : undefined}
                className={`relative text-xs uppercase tracking-[0.22em] transition-colors hover:text-foreground after:absolute after:left-0 after:-bottom-1.5 after:h-px after:bg-kiri-red after:transition-all after:duration-300 ${
                  active
                    ? "text-foreground after:w-full"
                    : "text-muted-foreground after:w-0 hover:after:w-full hover:after:bg-border"
                }`}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -left-3 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-kiri-red"
                  />
                )}
                {n.label}
              </Link>
            );
          })}
        </nav>

        <button
          aria-label="Apri menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden rounded-sm border border-border p-2"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="flex flex-col px-5 py-4">
            {nav.map((n) => {
              const active = n.match.some((m) => pathname === m || pathname.startsWith(`${m}/`));
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 py-3 text-sm uppercase tracking-[0.22em] transition-colors ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-px transition-all ${active ? "w-6 bg-kiri-red" : "w-3 bg-border"}`}
                  />
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
