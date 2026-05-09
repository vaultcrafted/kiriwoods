import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/storia")({
  component: StoryPage,
  head: () => ({
    meta: [
      { title: "Storia — KIRI Art" },
      { name: "description", content: "Da Livorno Ferraris, una bottega artigiana che stampa arte su tavolette di betulla." },
    ],
  }),
});

function StoryPage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-5 md:px-8 py-20 noise">
        <p className="font-jp text-sm text-kiri-red mb-3">桐 — la storia</p>
        <h1 className="font-display text-6xl md:text-7xl leading-none">UN ALBERO,<br /><span className="text-muted-foreground">UNA STAMPA,</span><br /><span className="text-kiri-red">UN PEZZO.</span></h1>

        <div className="prose prose-invert max-w-none mt-12 space-y-6 text-base text-muted-foreground leading-relaxed">
          <p className="text-foreground text-xl leading-relaxed">
            KIRI nasce in un piccolo laboratorio a Livorno Ferraris, in provincia di Vercelli. Una stampante DTF, tavole di betulla baltica, e l'idea che nessun pezzo debba essere uguale a un altro.
          </p>
          <p>
            "Kiri" in giapponese è l'albero della paulownia: leggero, resistente, considerato sacro. Il nome è un richiamo a quella tradizione di rispetto per il legno. La pennellata rossa nel logo, invece, viene dall'urgenza. Dall'arte di strada. Dal tratto che lascia il pennello quando non puoi tornare indietro.
          </p>
          <p>
            Stampiamo solo dopo che hai ordinato. Non abbiamo magazzino. Non abbiamo serie. Ogni tavola ha le sue venature, ogni stampa è il punto di incontro tra il tuo file e quel particolare pezzo di legno.
          </p>
          <p className="font-display text-3xl text-foreground tracking-wide pt-4">
            "OGNI NODO È UN'IMPERFEZIONE.<br /><span className="text-kiri-red">OGNI IMPERFEZIONE È UNA FIRMA.</span>"
          </p>
        </div>
      </article>
    </SiteShell>
  );
}
