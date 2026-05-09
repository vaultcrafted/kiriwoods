import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/contatti")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contatti — KIRI Art" },
      { name: "description", content: "Scrivici. Bottega KIRI a Livorno Ferraris (VC)." },
    ],
  }),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-20 grid md:grid-cols-2 gap-16">
        <div>
          <p className="font-jp text-sm text-kiri-red mb-3">contatti — 連絡</p>
          <h1 className="font-display text-6xl md:text-7xl leading-none">SCRIVICI.</h1>
          <p className="mt-6 text-base text-muted-foreground max-w-md">
            Per ordini speciali, collaborazioni, o solo per dirci ciao. Rispondiamo in giornata.
          </p>

          <dl className="mt-12 space-y-6 text-sm">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Laboratorio</dt>
              <dd className="font-display text-xl mt-1">Via dell'Arte 12<br />13046 Livorno Ferraris (VC)</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</dt>
              <dd className="mt-1"><a href="mailto:hello@kiri.art" className="hover:text-kiri-red">hello@kiri.art</a></dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Orari</dt>
              <dd className="mt-1">Lun–Ven · 9:00 — 18:00</dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="space-y-4 border border-border p-8 bg-surface"
        >
          {sent ? (
            <p className="font-display text-2xl text-kiri-red">GRAZIE. TI RISPONDIAMO PRESTO.</p>
          ) : (
            <>
              <input required placeholder="Nome" className="w-full bg-background border border-border p-3 text-sm focus:outline-none focus:border-kiri-red" />
              <input required type="email" placeholder="Email" className="w-full bg-background border border-border p-3 text-sm focus:outline-none focus:border-kiri-red" />
              <textarea required rows={6} placeholder="Il tuo messaggio" className="w-full bg-background border border-border p-3 text-sm focus:outline-none focus:border-kiri-red resize-none" />
              <button className="w-full bg-accent text-accent-foreground py-4 text-xs uppercase tracking-[0.25em] hover:bg-kiri-red-deep transition-colors">
                Invia
              </button>
            </>
          )}
        </form>
      </section>
    </SiteShell>
  );
}
