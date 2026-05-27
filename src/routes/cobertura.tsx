import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { CheckCircle2, MapPin, Sparkles } from "lucide-react";

export const Route = createFileRoute("/cobertura")({
  component: Cobertura,
});

function Cobertura() {
  const [done, setDone] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" /> Validación instantánea
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-6xl">¿Llegamos a tu hogar?</h1>
          <p className="mt-4 text-lg text-muted-foreground">Comprueba en 30 segundos si la fibra TV Norte está disponible en tu dirección.</p>
        </div>

        <Card className="mt-12 rounded-3xl p-8 md:p-10">
          {!done ? (
            <form
              className="grid gap-5 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <div className="md:col-span-2">
                <Label>Ciudad</Label>
                <Select defaultValue="barranquilla">
                  <SelectTrigger className="mt-2 h-12 rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="barranquilla">Barranquilla</SelectItem>
                    <SelectItem value="santa-marta">Santa Marta</SelectItem>
                    <SelectItem value="cartagena">Cartagena</SelectItem>
                    <SelectItem value="valledupar">Valledupar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Dirección</Label>
                <Input className="mt-2 h-12 rounded-xl" placeholder="Cra 45 # 80 - 12" required />
              </div>
              <div>
                <Label>Barrio</Label>
                <Input className="mt-2 h-12 rounded-xl" placeholder="El Prado" />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input className="mt-2 h-12 rounded-xl" placeholder="300 000 0000" required />
              </div>
              <div>
                <Label>Correo</Label>
                <Input className="mt-2 h-12 rounded-xl" type="email" placeholder="tu@correo.com" required />
              </div>
              <Button type="submit" size="lg" className="md:col-span-2 mt-2 h-12 rounded-full text-base">
                <MapPin className="mr-2 h-4 w-4" /> Validar cobertura ahora
              </Button>
            </form>
          ) : (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight">¡Tenemos cobertura!</h2>
              <p className="mt-3 text-muted-foreground">Podemos instalar fibra de hasta 1 Gbps en tu dirección esta misma semana.</p>
              <Button size="lg" className="mt-8 rounded-full h-12 px-7">Agendar instalación</Button>
            </div>
          )}
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}