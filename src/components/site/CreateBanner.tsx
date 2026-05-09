import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CreateBanner() {
  return (
    <section className="relative overflow-hidden noise">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-32 md:py-40 relative">
        <div
          className="absolute -left-10 top-1/2 h-px w-[120%] bg-kiri-red opacity-70 rotate-[-4deg]"
          aria-hidden="true"
        />
        <div className="relative max-w-4xl">
          <p className="font-jp text-sm text-kiri-red mb-4">su misura</p>
          <h2 className="font-display text-[12vw] md:text-[7rem] lg:text-[9rem] leading-[0.85]">
            HAI UN'IDEA?
            <br />
            <span className="text-muted-foreground">LA STAMPIAMO</span>
            <br />
            <span className="text-kiri-red">NOI.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base text-muted-foreground leading-relaxed">
            Carica il tuo file, scegli formato e spessore, scrivici l'idea.
            Ti rispondiamo entro 24h con un preventivo personalizzato.
          </p>
          <div className="mt-10">
            <Link
              to="/crea"
              className="group inline-flex items-center gap-3 rounded-sm bg-accent px-8 py-5 text-xs uppercase tracking-[0.25em] font-medium text-accent-foreground transition-colors hover:bg-kiri-red-deep"
            >
              Inizia a creare
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
