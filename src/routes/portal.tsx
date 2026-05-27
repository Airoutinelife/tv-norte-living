import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Wifi, Receipt, Tv, Headphones, ArrowRight, Activity, Calendar, Download } from "lucide-react";

export const Route = createFileRoute("/portal")({
  component: PortalPage,
});

function PortalPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Hola,</p>
            <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">María 👋</h1>
            <p className="mt-2 text-muted-foreground">Tu hogar está conectado y funcionando perfecto.</p>
          </div>
          <Badge className="rounded-full bg-emerald-500/10 text-emerald-700 border-emerald-500/20 px-3 py-1.5">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Servicio activo
          </Badge>
        </div>

        {/* Hero cards */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2 rounded-3xl p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0">
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Wifi className="h-5 w-5" />
              <span className="text-sm font-medium">Tu Internet</span>
            </div>
            <p className="mt-4 text-7xl font-semibold tracking-tight">600 <span className="text-2xl font-normal text-primary-foreground/70">Mbps</span></p>
            <p className="mt-2 text-primary-foreground/80">Plan Familiar • Fibra simétrica</p>
            <div className="mt-8 grid grid-cols-3 gap-6 text-sm">
              <div><p className="text-primary-foreground/70">Descarga</p><p className="text-xl font-semibold">587 Mbps</p></div>
              <div><p className="text-primary-foreground/70">Carga</p><p className="text-xl font-semibold">601 Mbps</p></div>
              <div><p className="text-primary-foreground/70">Latencia</p><p className="text-xl font-semibold">8 ms</p></div>
            </div>
            <Button asChild variant="secondary" className="mt-8 rounded-full">
              <Link to="/velocidad">Test de velocidad <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </Card>

          <Card className="rounded-3xl p-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Receipt className="h-5 w-5" />
              <span className="text-sm font-medium">Próxima factura</span>
            </div>
            <p className="mt-4 text-5xl font-semibold tracking-tight">$89.900</p>
            <p className="mt-2 text-muted-foreground">Vence el 28 de mayo</p>
            <Progress value={62} className="mt-6" />
            <p className="mt-2 text-xs text-muted-foreground">Consumo del ciclo: 62%</p>
            <div className="mt-6 flex gap-2">
              <Button className="flex-1 rounded-full">Pagar ahora</Button>
              <Button variant="outline" size="icon" className="rounded-full"><Download className="h-4 w-4" /></Button>
            </div>
          </Card>
        </div>

        {/* Quick actions */}
        <h2 className="mt-16 text-2xl font-semibold tracking-tight">Accesos rápidos</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {([
            { icon: Activity, title: "Estado del servicio", desc: "Todo funcionando", to: "/soporte" as const },
            { icon: Calendar, title: "Mi instalación", desc: "Agendada lun 27, 10:00", to: "/soporte" as const },
            { icon: Tv, title: "Mi parrilla TV", desc: "120 canales HD", to: "/planes" as const },
            { icon: Headphones, title: "Soporte AI", desc: "Habla con WhatsApp", to: "/soporte" as const },
          ]).map(({ icon: Icon, title, desc, to }) => (
            <Link key={title} to={to} className="block">
              <Card className="group cursor-pointer rounded-3xl p-6 transition hover:shadow-lg hover:-translate-y-0.5 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent activity */}
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <Card className="rounded-3xl p-8">
            <h3 className="text-xl font-semibold">Últimas facturas</h3>
            <ul className="mt-6 divide-y divide-border">
              {[
                { m: "Abril 2026", v: "$89.900", s: "Pagada" },
                { m: "Marzo 2026", v: "$89.900", s: "Pagada" },
                { m: "Febrero 2026", v: "$84.900", s: "Pagada" },
              ].map((i) => (
                <li key={i.m} className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium">{i.m}</p>
                    <p className="text-sm text-muted-foreground">{i.s}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{i.v}</p>
                    <button className="text-sm text-primary">Descargar</button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="rounded-3xl p-8">
            <h3 className="text-xl font-semibold">Tu equipo en casa</h3>
            <ul className="mt-6 space-y-4">
              {[
                { n: "Router WiFi 6", st: "En línea" },
                { n: "Decodificador 4K Sala", st: "En línea" },
                { n: "Decodificador HD Alcoba", st: "Standby" },
              ].map((d) => (
                <li key={d.n} className="flex items-center justify-between rounded-2xl bg-secondary/50 p-4">
                  <span className="font-medium">{d.n}</span>
                  <span className="text-sm text-muted-foreground">{d.st}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-6 w-full rounded-full" asChild>
              <Link to="/soporte">Reportar un problema</Link>
            </Button>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}