import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/pqr")({
  component: PQR,
});

function PQR() {
  const [submitted, setSubmitted] = useState(false);
  const [radicado] = useState(
    () => "TN-" + Math.floor(100000 + Math.random() * 900000),
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-6xl">
            Radica tu PQR
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Peticiones, Quejas, Reclamos y Recursos — respuesta en menos de 15 días hábiles.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "100% confidencial", d: "Tus datos están protegidos por ley." },
            { icon: Clock, t: "Respuesta oportuna", d: "Trazabilidad por número de radicado." },
            { icon: CheckCircle2, t: "Sin filas, sin papeles", d: "Todo el proceso 100% en línea." },
          ].map(({ icon: Icon, t, d }) => (
            <Card key={t} className="rounded-3xl p-6">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-10 rounded-3xl p-8 md:p-10">
          {submitted ? (
            <div className="text-center py-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight">
                Recibimos tu solicitud
              </h2>
              <p className="mt-3 text-muted-foreground">
                Tu número de radicado es
              </p>
              <p className="mt-2 text-2xl font-semibold text-primary">{radicado}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Te contactaremos al correo registrado en máximo 15 días hábiles.
              </p>
              <Button
                className="mt-8 rounded-full"
                onClick={() => setSubmitted(false)}
              >
                Radicar otra solicitud
              </Button>
            </div>
          ) : (
            <form
              className="grid gap-5 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold tracking-tight">Formulario PQR</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Todos los campos son obligatorios.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tipo">Tipo de solicitud</Label>
                <Select defaultValue="peticion">
                  <SelectTrigger id="tipo" className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="peticion">Petición</SelectItem>
                    <SelectItem value="queja">Queja</SelectItem>
                    <SelectItem value="reclamo">Reclamo</SelectItem>
                    <SelectItem value="recurso">Recurso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="doc">Documento de identidad</Label>
                <Input id="doc" required className="rounded-xl" placeholder="1.234.567.890" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre completo</Label>
                <Input id="nombre" required className="rounded-xl" placeholder="Tu nombre" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" required className="rounded-xl" placeholder="tu@correo.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tel">Teléfono</Label>
                <Input id="tel" required className="rounded-xl" placeholder="+57 300 000 0000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contrato">Número de contrato (opcional)</Label>
                <Input id="contrato" className="rounded-xl" placeholder="TN-000000" />
              </div>
              <div className="md:col-span-2 grid gap-2">
                <Label htmlFor="asunto">Asunto</Label>
                <Input id="asunto" required className="rounded-xl" placeholder="Resume tu solicitud" />
              </div>
              <div className="md:col-span-2 grid gap-2">
                <Label htmlFor="msg">Descripción detallada</Label>
                <Textarea
                  id="msg"
                  required
                  rows={6}
                  className="rounded-xl"
                  placeholder="Cuéntanos con el mayor detalle posible…"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" size="lg" className="rounded-full px-8">
                  Radicar solicitud
                </Button>
              </div>
            </form>
          )}
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}