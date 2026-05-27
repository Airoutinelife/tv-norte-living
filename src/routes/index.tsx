import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import {
  Sparkles,
  Brain,
  Receipt,
  Activity,
  Wrench,
  MessageCircle,
  Mic,
  ArrowRight,
  Wifi,
  Tv,
  Shield,
  Zap,
  CheckCircle2,
} from "lucide-react";
import heroFamily from "@/assets/hero-family.jpg";
import heroLoop from "@/assets/hero-loop.mp4.asset.json";
import remoteWork from "@/assets/remote-work.jpg";
import fiber from "@/assets/fiber.jpg";
import streaming from "@/assets/streaming.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const aiCards = [
  { icon: Brain, title: "Diagnóstico Inteligente", desc: "Detectamos y resolvemos fallas antes de que las notes.", soon: false },
  { icon: Receipt, title: "Facturación AI", desc: "Entiende tu factura en segundos con explicaciones claras.", soon: false },
  { icon: Activity, title: "Estado del Servicio", desc: "Monitoreo en tiempo real de tu conexión y tu zona.", soon: false },
  { icon: Wrench, title: "Mi Instalación", desc: "Agenda, sigue y califica tu instalación desde el celular.", soon: false },
  { icon: MessageCircle, title: "WhatsApp Inteligente", desc: "Soporte conversacional 24/7 que entiende a tu familia.", soon: false },
  { icon: Mic, title: "Voice Assistant", desc: "Habla con Tu Norte TV: cambia tu plan o pide soporte por voz.", soon: true },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-16 pb-24 md:grid-cols-2 md:pt-24 md:pb-32">
          <div>
            <Badge variant="secondary" className="rounded-full bg-accent/10 text-accent border-accent/20 px-3 py-1 font-medium">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Smart Living • 2026
            </Badge>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
              Más velocidad.
              <br />
              Más cobertura.
              <br />
              <span className="text-primary">Más tecnología.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Internet de fibra, televisión y servicios inteligentes diseñados para tu familia. Simple. Hermoso. Rápido.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full h-12 px-7 text-base">
                <Link to="/cobertura">Validar Cobertura <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-7 text-base">
                <Link to="/portal">Portal Clientes</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full h-12 px-7 text-base">
                <Link to="/soporte">Support Center</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Sin permanencia</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Instalación 24h</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/15 via-accent/10 to-transparent blur-2xl" />
            <video
              src={heroLoop.url}
              poster={heroFamily}
              autoPlay
              loop
              muted
              playsInline
              aria-label="Familia disfrutando Tu Norte TV en casa"
              className="w-full rounded-[2rem] shadow-2xl ring-1 ring-black/5 object-cover aspect-[16/11]"
            />
            <Card className="absolute -bottom-6 -left-6 w-56 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Wifi className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Velocidad ahora</p>
                  <p className="text-lg font-semibold">940 Mbps</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border/60 bg-secondary/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">
          {[
            { k: "+500K", v: "familias conectadas" },
            { k: "99.9%", v: "uptime de red" },
            { k: "24/7", v: "soporte humano + AI" },
            { k: "4.8★", v: "satisfacción cliente" },
          ].map((s) => (
            <div key={s.v}>
              <p className="text-3xl font-semibold tracking-tight">{s.k}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI CARDS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Badge variant="outline" className="rounded-full">Inteligencia Tu Norte TV</Badge>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Tu hogar, más inteligente.</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Servicios potenciados por inteligencia artificial para que todo simplemente funcione.
            </p>
          </div>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiCards.map(({ icon: Icon, title, desc, soon }) => (
            <Link
              key={title}
              to={soon ? "/soporte" : "/portal"}
              className="group relative block overflow-hidden rounded-3xl border border-border/60 bg-card p-6 transition hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              {soon ? (
                <Badge className="absolute right-5 top-5 bg-accent text-accent-foreground rounded-full">Próximamente</Badge>
              ) : (
                <div className="mt-5 flex items-center gap-1 text-sm font-medium text-primary">
                  Explorar <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="md:col-span-1">
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Hecho para tu familia.</h2>
              <p className="mt-4 text-muted-foreground">
                Streaming sin cortes, trabajo remoto sin frustraciones y la fibra más estable del norte.
              </p>
            </div>
            <div className="md:col-span-2 grid gap-5 sm:grid-cols-2">
              <Card className="overflow-hidden rounded-3xl border-border/60 p-0">
                <img src={streaming} alt="Streaming en familia" loading="lazy" width={1200} height={900} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-primary"><Tv className="h-5 w-5" /><span className="text-xs font-medium uppercase tracking-wider">Streaming</span></div>
                  <h3 className="mt-2 text-2xl font-semibold">Películas y series 4K en familia.</h3>
                </div>
              </Card>
              <Card className="overflow-hidden rounded-3xl border-border/60 p-0">
                <img src={remoteWork} alt="Trabajo remoto" loading="lazy" width={1200} height={900} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-primary"><Zap className="h-5 w-5" /><span className="text-xs font-medium uppercase tracking-wider">Remote Work</span></div>
                  <h3 className="mt-2 text-2xl font-semibold">Videollamadas estables. Cero excusas.</h3>
                </div>
              </Card>
              <Card className="overflow-hidden rounded-3xl border-border/60 p-0 sm:col-span-2">
                <img src={fiber} alt="Fibra óptica" loading="lazy" width={1200} height={900} className="h-56 w-full object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-primary"><Wifi className="h-5 w-5" /><span className="text-xs font-medium uppercase tracking-wider">Fibra Óptica</span></div>
                  <h3 className="mt-2 text-2xl font-semibold">100% fibra hasta tu hogar. Hasta 1 Gbps simétrico.</h3>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <Badge variant="outline" className="rounded-full">Planes</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Elige el plan que mueve tu hogar.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { name: "Esencial", speed: "300", price: "69.900", perks: ["TV HD 80 canales", "WiFi 6 incluido", "Soporte 24/7"] },
            { name: "Familiar", speed: "600", price: "89.900", perks: ["TV HD 120 canales", "WiFi 6 + extensor", "Streaming Premium", "Diagnóstico AI"], featured: true },
            { name: "Smart Pro", speed: "1000", price: "119.900", perks: ["TV 4K 180 canales", "Mesh WiFi 6E", "Streaming Total", "Voice Assistant"] },
          ].map((p) => (
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
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary p-10 text-primary-foreground md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">¿Listo para cambiar a Tu Norte TV?</h2>
              <p className="mt-4 max-w-md text-primary-foreground/80">Valida cobertura en 30 segundos y agenda tu instalación al día siguiente.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild size="lg" variant="secondary" className="rounded-full h-12 px-7 text-base">
                <Link to="/cobertura">Validar Cobertura</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-7 text-base border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/soporte">Hablar con soporte</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
