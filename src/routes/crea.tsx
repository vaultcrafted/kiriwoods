import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Upload } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { categories, formats, getPrice, thicknesses } from "@/data/products";

export const Route = createFileRoute("/crea")({
  component: CreatePage,
  head: () => ({
    meta: [
      { title: "Crea Ora — KIRI Art" },
      { name: "description", content: "Configura la tua tavola in betulla. Carica un file, scegli formato e spessore, raccontaci la tua idea." },
    ],
  }),
});

function CreatePage() {
  const [format, setFormat] = useState<(typeof formats)[number]["id"]>("A4");
  const [thickness, setThickness] = useState<(typeof thicknesses)[number]["id"]>("5mm");
  const [type, setType] = useState("foto");
  const [cat, setCat] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const price = useMemo(() => {
    return getPrice(format, thickness);
  }, [format, thickness]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-2xl px-5 pt-40 pb-32 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent text-accent-foreground mb-8">
            <Check className="h-7 w-7" />
          </div>
          <p className="font-jp text-sm text-kiri-red mb-3">ありがとう — grazie</p>
          <h1 className="font-display text-5xl md:text-6xl">RICHIESTA RICEVUTA</h1>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            Abbiamo ricevuto la tua idea. Ti rispondiamo entro 24h con un preventivo personalizzato.
            <br />Nel frattempo, fai un giro sul nostro Instagram.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-10 inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 text-xs uppercase tracking-[0.25em] hover:border-foreground"
          >
            ← Nuova richiesta
          </button>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <PageHeader
        eyebrow="su misura — 注文"
        title={
          <>
            CREA<br />
            <span className="text-muted-foreground">LA TUA</span><br />
            <span className="text-kiri-red">TAVOLA.</span>
          </>
        }
        intro="Carica un file, scegli i dettagli, raccontaci l'idea. Ti rispondiamo con preventivo entro 24h."
        noise
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8 pb-32 grid lg:grid-cols-3 gap-10">
        <form onSubmit={onSubmit} className="lg:col-span-2 space-y-12">
          <Step n="01" title="Formato">
            <div className="grid grid-cols-3 gap-3">
              {formats.map((f) => (
                <button
                  type="button"
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`relative border p-5 text-left transition-all ${
                    format === f.id ? "border-kiri-red bg-surface" : "border-border hover:border-foreground"
                  }`}
                >
                  <div
                    className="bg-foreground/15 mb-3 mx-auto"
                    style={{
                      width: f.id === "A5" ? 32 : f.id === "A4" ? 50 : 70,
                      height: f.id === "A5" ? 46 : f.id === "A4" ? 72 : 100,
                    }}
                  />
                  <span className="block font-display text-2xl">{f.label}</span>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{f.dims}</span>
                </button>
              ))}
            </div>
          </Step>

          <Step n="02" title="Spessore">
            <div className="grid grid-cols-2 gap-3">
              {thicknesses.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setThickness(t.id)}
                  className={`border p-5 transition-all ${
                    thickness === t.id ? "border-kiri-red bg-surface" : "border-border hover:border-foreground"
                  }`}
                >
                  <div className="mb-3 flex items-end justify-center gap-1">
                    <div className="bg-foreground/30 w-12" style={{ height: t.id === "5mm" ? 8 : 16 }} />
                  </div>
                  <span className="font-display text-2xl">{t.label}</span>
                </button>
              ))}
            </div>
          </Step>

          <Step n="03" title="Tipologia">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "foto", label: "Foto / Immagine" },
                { id: "art", label: "Illustrazione" },
                { id: "logo", label: "Logo / Branding" },
                { id: "testo", label: "Testo / Tipografia" },
                { id: "altro", label: "Altro" },
              ].map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.18em] border transition-colors ${
                    type === t.id ? "border-kiri-red text-kiri-red" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Step>

          <Step n="04" title="Categoria di riferimento (opzionale)">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setCat(cat === c.id ? null : c.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.18em] border transition-colors ${
                    cat === c.id ? "border-kiri-red text-kiri-red" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </Step>

          <Step n="05" title="Carica il tuo file">
            <label
              htmlFor="file"
              className="block border-2 border-dashed border-border p-10 text-center cursor-pointer hover:border-kiri-red transition-colors"
            >
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
              {file ? (
                <>
                  <p className="font-display text-xl">{file.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB · clicca per cambiare
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-foreground">Trascina qui o clicca per caricare</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-2">
                    JPG · PNG · PDF · AI · PSD · max 25MB
                  </p>
                </>
              )}
              <input
                id="file"
                type="file"
                accept="image/*,.pdf,.ai,.psd"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </Step>

          <Step n="06" title="Note per il designer">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              placeholder="Spiegaci la tua idea, eventuali modifiche, riferimenti, link..."
              className="w-full bg-surface border border-border p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-kiri-red transition-colors resize-none"
            />
          </Step>

          <Step n="07" title="I tuoi dati">
            <div className="grid md:grid-cols-2 gap-3">
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" className="bg-surface border border-border p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-kiri-red" />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="bg-surface border border-border p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-kiri-red" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefono (opzionale)" className="md:col-span-2 bg-surface border border-border p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-kiri-red" />
            </div>
          </Step>

          <button
            type="submit"
            className="group w-full inline-flex items-center justify-center gap-3 bg-accent px-6 py-5 text-xs uppercase tracking-[0.25em] font-medium text-accent-foreground hover:bg-kiri-red-deep transition-colors"
          >
            Invia richiesta
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        {/* Sticky summary */}
        <aside className="lg:sticky lg:top-24 self-start space-y-4 border border-border bg-surface p-6 noise">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Riepilogo</p>
          <div className="aspect-[3/4] bg-background border border-border flex items-center justify-center relative">
            <div
              className="bg-foreground/10 border border-border"
              style={{
                width: format === "A5" ? 80 : format === "A4" ? 120 : 160,
                height: format === "A5" ? 113 : format === "A4" ? 170 : 226,
              }}
            />
            <span className="absolute bottom-3 right-3 font-display text-3xl text-kiri-red">{format}</span>
          </div>

          <dl className="space-y-3 text-sm pt-2 border-t border-border">
            <Row k="Formato" v={format} />
            <Row k="Spessore" v={thickness} />
            <Row k="Tipologia" v={type} />
            {cat && <Row k="Categoria" v={cat} />}
            {file && <Row k="File" v="✓ caricato" />}
          </dl>

          <div className="border-t border-border pt-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Stima base</p>
            <p className="font-display text-4xl text-foreground mt-1">€{price.toFixed(0)}</p>
            <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
              Stima indicativa. Il prezzo finale dipende da complessità del file e finiture.
            </p>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-8">
      <div className="flex items-baseline gap-4 mb-5">
        <span className="font-display text-2xl text-kiri-red">{n}</span>
        <h2 className="font-display text-2xl tracking-wide">{title.toUpperCase()}</h2>
      </div>
      {children}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
      <dd className="font-display text-lg capitalize">{v}</dd>
    </div>
  );
}
