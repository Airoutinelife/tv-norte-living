import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/planes")({
  component: Planes,
});

const planes = [
  { name: "Esencial", speed: "300", price: "69.900", perks: ["TV HD 80 canales", "WiFi 6 incluido", "Soporte 24/7"] },
  { name: "Familiar", speed: "600", price: "89.900", perks: ["TV HD 120 canales", "WiFi 6 + extensor", "Streaming Premium", "Diagnóstico AI"], featured: true },
  { name: "Smart Pro", speed: "1000", price: "119.900", perks: ["TV 4K 180 canales", "Mesh WiFi 6E", "Streaming Total", "Voice Assistant"] },
];

function Planes() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="text-center">
          <Badge variant="outline" className="rounded-full">Planes</Badge>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
            Televisión e internet bajo premisas de calidad.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Tarifas equitativas, fibra 100% al hogar y soporte humano respaldado con IA.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {planes.map((p) => (
            <Card key={p.name} className={`relative rounded-3xl p-8 ${p.featured ? "border-primary shadow-2xl ring-2 ring-primary/20" : "border-border/60"}`}>
              {p.featured && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent text-accent-foreground">Más elegido</Badge>}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-semibold tracking-tight">{p.speed}</span>
                <span className="text-lg text-muted-foreground">Mbps</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">desde <span className="font-semibold text-foreground">${p.price}</span> /mes</p>
              <ul className="mt-6 space-y-3 text-sm">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {perk}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 w-full rounded-full" variant={p.featured ? "default" : "outline"}>
                <Link to="/cobertura">Lo quiero</Link>
              </Button>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}