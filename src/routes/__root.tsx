import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-jp text-kiri-red text-sm">404 — pagina perduta</p>
        <h1 className="mt-4 font-display text-7xl text-foreground">FUORI ROTTA</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Questa pagina non esiste, o l'abbiamo spostata nel laboratorio.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm bg-accent px-5 py-3 text-xs uppercase tracking-[0.2em] font-medium text-accent-foreground transition-colors hover:bg-kiri-red-deep"
          >
            Torna a casa
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl text-foreground">Qualcosa si è incrinato</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Errore inatteso. Riprova o torna alla home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-sm bg-accent px-4 py-2 text-xs uppercase tracking-[0.2em] text-accent-foreground hover:bg-kiri-red-deep"
          >
            Riprova
          </button>
          <a href="/" className="rounded-sm border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-foreground">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KIRI Art — Tavolette in legno stampate a mano" },
      { name: "description", content: "Bottega digitale italiana. Tavole in betulla stampate in DTF, su misura, pezzo per pezzo. Woods · art · design." },
      { name: "author", content: "KIRI Art" },
      { property: "og:title", content: "KIRI Art — Woods · Art · Design" },
      { property: "og:description", content: "Tavole in betulla stampate al momento. Nessun magazzino. Solo il tuo pezzo, unico." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Noto+Serif+JP:wght@300;400&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
