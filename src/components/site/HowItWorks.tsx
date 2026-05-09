const steps = [
  { n: "01", title: "Scegli", text: "Dal catalogo, o porti la tua idea." },
  { n: "02", title: "Personalizza", text: "Formato, spessore, finitura." },
  { n: "03", title: "Stampiamo", text: "DTF su betulla, a mano, in laboratorio." },
  { n: "04", title: "Ricevi", text: "Il tuo pezzo unico, spedito ovunque." },
];

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-20">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-jp text-sm text-kiri-red mb-2">手仕事 — il processo</p>
            <h2 className="font-display text-4xl md:text-5xl">COME FUNZIONA</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Quattro passaggi. Niente intermediari, niente magazzino.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {steps.map((s) => (
            <div
              key={s.n}
              className="bg-surface p-8 group hover:bg-surface-elevated transition-colors relative"
            >
              <span className="font-display text-5xl text-kiri-red">{s.n}</span>
              <h3 className="font-display text-2xl mt-6 tracking-wide">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              <div className="absolute bottom-4 right-4 h-px w-0 bg-kiri-red transition-all duration-500 group-hover:w-12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
