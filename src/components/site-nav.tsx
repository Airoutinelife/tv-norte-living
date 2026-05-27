import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import tuNorteLogo from "@/assets/tunorte-logo.jpg";

export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <img
      src={tuNorteLogo}
      alt="Tu Norte TV"
      className={className}
      width={240}
      height={120}
    />
  );
}

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center" aria-label="Tu Norte TV - Inicio">
          <Logo className="h-11 w-auto" />
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
            <Logo className="h-12 w-auto" />
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
            <li><a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
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