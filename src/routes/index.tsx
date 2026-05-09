import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Categories } from "@/components/site/Categories";
import { FeaturedCatalog } from "@/components/site/FeaturedCatalog";
import { CreateBanner } from "@/components/site/CreateBanner";
import { Values } from "@/components/site/Values";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "KIRI Art — Tavolette in legno stampate a mano" },
      { name: "description", content: "Bottega italiana di stampa DTF su betulla. Pezzi unici, su misura, fatti a mano." },
    ],
  }),
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <HowItWorks />
      <Categories />
      <FeaturedCatalog />
      <CreateBanner />
      <Values />
    </SiteShell>
  );
}
