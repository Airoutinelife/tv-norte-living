import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Phone, Mail, Search, Brain, Receipt, Wifi, Tv } from "lucide-react";

export const Route = createFileRoute("/soporte")({
  component: Soporte,
});

const topics = [
  { icon: Wifi, t: "Mi internet va lento" },
  { icon: Tv, t: "No tengo señal de TV" },
  { icon: Receipt, t: "Dudas sobre mi factura" },
  { icon: Brain, t: "Configurar mi router" },
];

function Soporte() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">Estamos para ayudarte.</h1>
          <p className="mt-4 text-lg text-muted-foreground">Soporte humano + AI, 24 horas al día, 7 días a la semana.</p>
          <div className="mx-auto mt-8 flex max-w-2xl items-center gap-2 rounded-full border border-border bg-card px-5 py-3 shadow-sm">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input className="border-0 shadow-none focus-visible:ring-0 text-base" placeholder="Pregunta lo que necesites…" />
            <Button className="rounded-full">Preguntar</Button>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <Card className="rounded-3xl p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><MessageCircle className="h-6 w-6" /></div>
            <h3 className="mt-5 text-lg font-semibold">WhatsApp Inteligente</h3>
            <p className="mt-1 text-sm text-muted-foreground">Respuesta inmediata 24/7</p>
            <Button variant="outline" className="mt-5 rounded-full w-full">Abrir chat</Button>
          </Card>
          <Card className="rounded-3xl p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Phone className="h-6 w-6" /></div>
            <h3 className="mt-5 text-lg font-semibold">Línea directa</h3>
            <p className="mt-1 text-sm text-muted-foreground">01 8000 000 000</p>
            <Button variant="outline" className="mt-5 rounded-full w-full">Llamar</Button>
          </Card>
          <Card className="rounded-3xl p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Mail className="h-6 w-6" /></div>
            <h3 className="mt-5 text-lg font-semibold">Correo</h3>
            <p className="mt-1 text-sm text-muted-foreground">hola@tvnorte.co</p>
            <Button variant="outline" className="mt-5 rounded-full w-full">Escribir</Button>
          </Card>
        </div>

        <h2 className="mt-20 text-2xl font-semibold tracking-tight">Temas frecuentes</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map(({ icon: Icon, t }) => (
            <Card key={t} className="group cursor-pointer rounded-3xl p-6 transition hover:shadow-lg hover:-translate-y-0.5">
              <Icon className="h-6 w-6 text-primary" />
              <p className="mt-4 font-medium">{t}</p>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}