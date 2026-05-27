import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge, ArrowDownToLine, ArrowUpFromLine, Activity } from "lucide-react";

export const Route = createFileRoute("/velocidad")({
  component: Velocidad;
});

function Velocidad() {
  const [state, setState] = useState<"idle" | "testing" | "done">("idle");
  const [result, setResult] = useState({ down: 0, up: 0, ping: 0 });

  const start = () => {
    setState("testing");
    setResult({ down: 0, up: 0, ping: 0 });
    let d = 0;
    const target = { down: 612 + Math.random() * 200, up: 480 + Math.random() * 120, ping: 8 + Math.random() * 6 };
    const id = setInterval(() => {
      d += 4;
      setResult({
        down: Math.min(target.down, (target.down * d) / 100),
        up: Math.min(target.up, (target.up * d) / 100),
        ping: Math.round(target.ping),
      });
      if (d >= 100) {
        clearInterval(id);
        setState("done");
      }
    }, 80);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
            Test de Velocidad
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Mide tu conexión Tu Norte TV en segundos.
          </p>
        </div>

        <Card className="mt-12 rounded-[2.5rem] p-10 md:p-14 text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-xl">
            <Gauge className={`h-14 w-14 ${state === "testing" ? "animate-spin" : ""}`} />
          </div>
          <p className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">
            {state === "idle" && "Listo para medir"}
            {state === "testing" && "Midiendo tu conexión…"}
            {state === "done" && "Resultado"}
          </p>
          <div className="mt-6 flex items-baseline justify-center gap-2">
            <span className="text-7xl font-semibold tracking-tight tabular-nums">
              {result.down.toFixed(0)}
            </span>
            <span className="text-2xl text-muted-foreground">Mbps</span>
          </div>

          <Button
            size="lg"
            onClick={start}
            disabled={state === "testing"}
            className="mt-8 rounded-full h-12 px-10 text-base"
          >
            {state === "idle" && "Iniciar test"}
            {state === "testing" && "Midiendo…"}
            {state === "done" && "Repetir test"}
          </Button>
        </Card>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <Card className="rounded-3xl p-6">
            <ArrowDownToLine className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Descarga</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums">{result.down.toFixed(0)} <span className="text-base text-muted-foreground font-normal">Mbps</span></p>
          </Card>
          <Card className="rounded-3xl p-6">
            <ArrowUpFromLine className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Subida</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums">{result.up.toFixed(0)} <span className="text-base text-muted-foreground font-normal">Mbps</span></p>
          </Card>
          <Card className="rounded-3xl p-6">
            <Activity className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Ping</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums">{result.ping} <span className="text-base text-muted-foreground font-normal">ms</span></p>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}