import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">N</div>
          <span className="text-lg font-semibold tracking-tight">TV Norte</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link to="/" className="hover:text-foreground transition">Inicio</Link>
          <Link to="/cobertura" className="hover:text-foreground transition">Cobertura</Link>
          <Link to="/portal" className="hover:text-foreground transition">Portal Clientes</Link>
          <Link to="/soporte" className="hover:text-foreground transition">Soporte</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/portal">Ingresar</Link>
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">N</div>
            <span className="text-lg font-semibold">TV Norte</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Conectamos familias del norte con la mejor fibra, televisión y tecnología inteligente.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Servicios</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Internet Fibra</li>
            <li>Televisión HD</li>
            <li>Smart Home</li>
            <li>Empresas</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Soporte</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/soporte">Centro de ayuda</Link></li>
            <li><Link to="/portal">Mi cuenta</Link></li>
            <li>WhatsApp</li>
            <li>Estado del servicio</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Contacto</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Línea 24/7: 01 8000 000</li>
            <li>hola@tvnorte.co</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} TV Norte Smart Living. Todos los derechos reservados.
      </div>
    </footer>
  );
}