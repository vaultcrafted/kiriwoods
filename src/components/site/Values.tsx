const values = [
  {
    kanji: "産",
    title: "Made in Italy",
    text: "Laboratorio artigianale a Livorno Ferraris (VC). Lavoriamo a vista, ogni pezzo passa dalle nostre mani.",
  },
  {
    kanji: "印",
    title: "Stampa DTF su betulla",
    text: "Tecnica DTF (Direct-to-Film) su tavole di betulla baltica selezionata. Inchiostri resistenti, finitura matte.",
  },
  {
    kanji: "唯",
    title: "Pezzi unici",
    text: "Niente magazzino, niente serie. Stampiamo solo dopo che hai ordinato. Il tuo pezzo non esiste prima di te.",
  },
];

export function Values() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-24 grid md:grid-cols-3 gap-px bg-border">
        {values.map((v) => (
          <div key={v.title} className="bg-background p-8 md:p-10">
            <span className="font-jp text-6xl text-kiri-red leading-none not-italic">{v.kanji}</span>
            <h3 className="font-display text-3xl mt-8 tracking-wide">{v.title.toUpperCase()}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
