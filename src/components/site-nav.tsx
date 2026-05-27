import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="tn-grad" x1="0" y1="64" x2="64" y2="0">
          <stop offset="0%" stopColor="oklch(0.55 0.18 255)" />
          <stop offset="100%" stopColor="oklch(0.78 0.14 210)" />
        </linearGradient>
      </defs>
      {/* N strokes */}
      <path
        d="M10 54 L10 14 L22 14 L42 40 L42 14 L54 14 L54 54 L42 54 L22 28 L22 54 Z"
        fill="url(#tn-grad)"
      />
      {/* Upward arrow */}
      <path
        d="M44 22 L58 8 L58 18 L48 28 Z M58 8 L48 8 L52 4 L62 4 L62 14 Z"
        fill="url(#tn-grad)"
      />
      {/* Drops */}
      <circle cx="14" cy="58" r="1.6" fill="url(#tn-grad)" />
      <circle cx="20" cy="60" r="1.2" fill="url(#tn-grad)" opacity=".7" />
      <circle cx="26" cy="58" r="1.6" fill="url(#tn-grad)" />
    </svg>
  );
}

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-9 w-9" />
          <span className="text-lg font-semibold tracking-tight">Tu Norte TV</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link to="/" className="hover:text-foreground transition">Inicio</Link>
          <Link to="/planes" className="hover:text-foreground transition">Planes</Link>
          <Link to="/cobertura" className="hover:text-foreground transition">Cobertura</Link>
          <Link to="/velocidad" className="hover:text-foreground transition">Test de Velocidad</Link>
          <Link to="/pqr" className="hover:text-foreground transition">PQR</Link>
          <Link to="/soporte" className="hover:text-foreground transition">Soporte</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/portal">Clientes</Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link to="/cobertura">Validar cobertura</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Logo className="h-9 w-9" />
            <span className="text-lg font-semibold">Tu Norte TV</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Conectamos familias del norte con la mejor fibra, televisión y tecnología inteligente.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Servicios</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/planes">Internet Fibra</Link></li>
            <li><Link to="/planes">Televisión HD</Link></li>
            <li><Link to="/velocidad">Test de Velocidad</Link></li>
            <li><Link to="/cobertura">Cobertura</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Atención al Cliente</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/soporte">Centro de ayuda</Link></li>
            <li><Link to="/pqr">Radicar PQR</Link></li>
            <li><Link to="/portal">Mi cuenta</Link></li>
            <li>WhatsApp</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Contacto</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Línea 24/7: 01 8000 000</li>
            <li>hola@tunorte.co</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Tu Norte TV — Smart Living. Todos los derechos reservados.
      </div>
    </footer>
  );
}