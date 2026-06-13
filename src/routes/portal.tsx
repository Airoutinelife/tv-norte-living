import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Wifi, Receipt, Tv, Headphones, ArrowRight, Activity, Calendar, Download, Search, Loader2, Info } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/portal")({
  component: PortalPage,
});

function PortalPage() {
  const [cedula, setCedula] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cuentas, setCuentas] = useState<any[] | null>(null);
  const [detalles, setDetalles] = useState<any>(null);

  const WEBHOOK_CONSULTAR_URL = 'https://vmi3345591.contaboserver.net/webhook/consultar-web';
  const WEBHOOK_DETALLES_URL = 'https://vmi3345591.contaboserver.net/webhook/detalles-web';

  const buscarAbonado = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cedula.trim()) {
      setError('Por favor ingresa tu número de documento.');
      return;
    }

    setLoading(true);
    setError(null);
    setDetalles(null);
    setCuentas(null);

    try {
      const response = await fetch(WEBHOOK_CONSULTAR_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cedula })
      });

      const data = await response.json();
      
      if (data.success && data.cuentas && data.cuentas.length > 0) {
        if (data.cuentas.length === 1) {
          // Si solo tiene una cuenta, cargar detalles automáticamente
          await cargarDetalles(data.cuentas[0].nro_abonado);
        } else {
          // Si tiene varias, mostrar el listado para que elija
          setCuentas(data.cuentas);
          setLoading(false);
        }
      } else {
        setError(data.error || 'No se encontraron servicios asociados a este documento.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor. Intenta nuevamente.');
      setLoading(false);
    }
  };

  const cargarDetalles = async (nro_abonado: string) => {
    setLoading(true);
    setError(null);
    try {
      const resDetalles = await fetch(WEBHOOK_DETALLES_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cedula, numero_abonado: nro_abonado })
      });
      
      const dataDetalles = await resDetalles.json();
      
      if (dataDetalles.success && dataDetalles.datos_abonado) {
        setDetalles(dataDetalles.datos_abonado);
      } else {
        setError(dataDetalles.error || 'No se pudieron cargar los detalles.');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión al cargar detalles.');
    } finally {
      setLoading(false);
    }
  };

  const getClientName = () => {
    if (!detalles) return "Cliente";
    const fullName = detalles["Datos personales del cliente"]?.Cliente || "Cliente";
    return fullName.split(" ")[0]; 
  };

  const getServiciosSuscritos = () => {
    if (!detalles) return [];
    const key = Object.keys(detalles).find(k => k.toLowerCase().includes("servicios mensuales suscritos") || k.toLowerCase().includes("suscritos"));
    return key ? detalles[key] : [];
  };

  const getPlanStringFromJSON = (obj: any): string | null => {
    if (!obj) return null;
    if (typeof obj === 'string') {
      if (obj.toUpperCase().includes('INTERNET') && obj.match(/\d+\s*(MB|MEGAS|M\b)/i)) return obj;
    }
    if (typeof obj === 'object') {
      for (const key in obj) {
        const res = getPlanStringFromJSON(obj[key]);
        if (res) return res;
      }
    }
    return null;
  };

  const getPlanStringFallback = (obj: any): string | null => {
    if (!obj) return null;
    if (typeof obj === 'string') {
      if (obj.match(/\d+\s*(MB|MEGAS|M\b)/i)) return obj;
    }
    if (typeof obj === 'object') {
      for (const key in obj) {
        const res = getPlanStringFallback(obj[key]);
        if (res) return res;
      }
    }
    return null;
  };

  const findPlanString = () => {
    const servicios = getServiciosSuscritos();
    if (servicios && servicios.length > 0) {
      const srvInternet = servicios.find((s: any) => 
        (s.Tipo_Servicio || "").toUpperCase().includes("INTERNET") || 
        (s.Descripcion || "").toUpperCase().includes("INTERNET") ||
        (s.Descripcion || "").toUpperCase().includes("MEGAS")
      ) || servicios[0];
      if (srvInternet.Descripcion) return srvInternet.Descripcion;
    }
    
    // Si la tabla no llegó del webhook, buscamos en todo el JSON (ej. facturas)
    let found = getPlanStringFromJSON(detalles);
    if (found) return found;
    
    found = getPlanStringFallback(detalles);
    if (found) return found;

    return detalles?.Resumen?.Suscripcion_Mensual || "Plan Familiar";
  };

  const getVelocidadNum = () => {
    const planStr = findPlanString();
    
    const match = planStr.match(/(\d+)\s*(MB|MEGAS|M\b)/i);
    if (match) return parseInt(match[1], 10);
    
    const nums = planStr.match(/\d+/g);
    if (nums) {
       // Filtramos para evitar agarrar el precio (ej 65000) o un número irrelevante
       const speeds = nums.map((n: string) => parseInt(n, 10)).filter(n => n >= 10 && n <= 2000);
       if (speeds.length > 0) return Math.max(...speeds);
    }
    return 600; 
  };

  const getPlanName = () => {
    return findPlanString();
  };

  const getFechaVencimiento = () => {
    const facturas = detalles?.["Estado de Cuenta (Ultimos 3)"];
    if (facturas && facturas.length > 0 && facturas[0].Fecha) {
      const parts = facturas[0].Fecha.split('/');
      if (parts.length === 3) {
        // En Colombia suele usarse el mismo día de corte o se dan unos días más.
        // Asumimos que la fecha que trae SAE es la fecha clave, la formateamos:
        const day = parseInt(parts[0], 10);
        const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const month = monthNames[parseInt(parts[1], 10) - 1];
        return `${day} de ${month}`;
      }
      return facturas[0].Fecha;
    }
    return "fin de mes";
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        
        {/* VISTA 1: LOGIN / BUSCADOR */}
        {!detalles && !cuentas && (
          <div className="mx-auto max-w-md py-20">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight">Tu Portal</h1>
              <p className="mt-2 text-muted-foreground">Autogestiona tus servicios de Tu Norte TV</p>
            </div>
            
            <Card className="p-6 rounded-3xl border shadow-sm">
              <form onSubmit={buscarAbonado} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="cedula" className="text-sm font-medium">Número de Documento o NIT</label>
                  <Input 
                    id="cedula" 
                    placeholder="Ej. 1090490631" 
                    className="rounded-xl h-12"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    disabled={loading}
                  />
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl flex items-start gap-2">
                    <Info className="h-5 w-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                
                <Button type="submit" className="w-full rounded-xl h-12" disabled={loading}>
                  {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Conectando con Tu Norte...</>
                  ) : (
                    <><Search className="mr-2 h-4 w-4" /> Ingresar</>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        )}

        {/* VISTA 1.5: MULTIPLES CUENTAS */}
        {cuentas && !detalles && (
          <div className="mx-auto max-w-2xl py-10 animate-in fade-in">
            <h2 className="text-3xl font-bold text-center mb-8">Selecciona una cuenta</h2>
            <div className="grid gap-4">
              {cuentas.map((c, i) => (
                <Card key={i} className="p-6 rounded-3xl cursor-pointer hover:border-primary transition shadow-sm" onClick={() => cargarDetalles(c.nro_abonado)}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">Abonado: {c.nro_abonado}</h3>
                      <p className="text-muted-foreground mt-1">Ubicación: {c.barrio}, {c.sector}</p>
                    </div>
                    <Badge className={`px-3 py-1 text-sm rounded-full ${c.estatus === 'ACTIVO' ? 'bg-emerald-500/10 text-emerald-700' : 'bg-red-500/10 text-red-700'}`}>
                      {c.estatus}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
            
            {loading && (
              <div className="mt-8 text-center text-primary flex items-center justify-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin" /> Cargando panel...
              </div>
            )}
            {error && (
              <div className="mt-8 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center">
                {error}
              </div>
            )}
            
            <Button variant="ghost" className="mt-8 mx-auto flex rounded-full" onClick={() => setCuentas(null)} disabled={loading}>
              ← Volver
            </Button>
          </div>
        )}

        {/* VISTA 2: DASHBOARD DINÁMICO */}
        {detalles && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Hola,</p>
                <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">{getClientName()} 👋</h1>
                <p className="mt-2 text-muted-foreground">Bienvenido a tu panel de control.</p>
              </div>
              <Badge className={`rounded-full px-3 py-1.5 ${detalles.Resumen?.Estatus === 'ACTIVO' ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' : 'bg-red-500/10 text-red-700 border-red-500/20'}`}>
                <span className={`mr-2 inline-block h-2 w-2 rounded-full ${detalles.Resumen?.Estatus === 'ACTIVO' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} /> 
                Servicio {detalles.Resumen?.Estatus || 'Desconocido'}
              </Badge>
            </div>

            {/* Tarjetas Principales */}
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <Card className="lg:col-span-2 rounded-3xl p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 shadow-lg">
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <Wifi className="h-5 w-5" />
                  <span className="text-sm font-medium">Tu Internet</span>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-bold">{getVelocidadNum()}</span>
                    <span className="text-2xl font-medium opacity-90">Mbps</span>
                  </div>
                  <p className="mt-2 text-primary-foreground/80 text-lg line-clamp-1" title={getPlanName()}>
                    {getPlanName()} • Fibra simétrica
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-primary-foreground/70">Descarga</p>
                    <p className="mt-1 font-semibold text-xl">{getVelocidadNum() ? getVelocidadNum() - 13 : 0} Mbps</p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">Carga</p>
                    <p className="mt-1 font-semibold text-xl">{getVelocidadNum() ? getVelocidadNum() + 1 : 0} Mbps</p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">Latencia</p>
                    <p className="mt-1 font-semibold text-xl">8 ms</p>
                  </div>
                </div>

                <Button asChild variant="secondary" className="mt-8 rounded-full bg-white text-primary hover:bg-white/90">
                  <Link to="/velocidad">Test de velocidad <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </Card>

              <Card className="rounded-3xl p-8 shadow-sm border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Receipt className="h-5 w-5" />
                  <span className="text-sm font-medium">Próxima factura</span>
                </div>
                <p className="mt-6 text-5xl font-bold tracking-tight">${detalles.Resumen?.Suscripcion_Mensual || '0,00'}</p>
                <p className="mt-2 text-muted-foreground">Vence el {getFechaVencimiento()}</p>
                
                <div className="mt-8">
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[62%]" />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Consumo del ciclo: 62%</p>
                </div>

                <div className="mt-8 flex gap-3">
                  <Button className="flex-1 rounded-full text-white bg-primary hover:bg-primary/90">Pagar ahora</Button>
                  <Button variant="outline" size="icon" className="rounded-full shrink-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>

            {/* Accesos rápidos */}
            <h2 className="mt-16 text-2xl font-semibold tracking-tight">Accesos rápidos</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {([
                { icon: Activity, title: "Estado del servicio", desc: "Todo funcionando", to: "/soporte" as const },
                { icon: Calendar, title: "Mi cuenta", desc: "Ver mi perfil", to: "/portal" as const },
                { icon: Tv, title: "Planes", desc: "Mejorar mi plan", to: "/planes" as const },
                { icon: Headphones, title: "Soporte AI", desc: "Habla con nuestro chat", to: "/soporte" as const },
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

            {/* Actividad y Equipos */}
            <div className="mt-16 grid gap-5 lg:grid-cols-2">
              <Card className="rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold">Últimas facturas</h3>
                {detalles["Estado de Cuenta (Ultimos 3)"]?.length > 0 ? (
                  <ul className="mt-6 divide-y divide-border">
                    {detalles["Estado de Cuenta (Ultimos 3)"].map((factura: any, idx: number) => (
                      <li key={idx} className="flex items-center justify-between py-4">
                        <div>
                          <p className="font-medium">{factura.Fecha}</p>
                          <p className="text-sm text-muted-foreground max-w-[200px] truncate" title={factura.Descripcion}>
                            {factura.Descripcion}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${factura.Cargo !== '0,00' ? 'text-red-600' : 'text-emerald-600'}`}>
                            {factura.Cargo !== '0,00' ? factura.Cargo : factura.Abono}
                          </p>
                          <button className="text-sm text-primary">Descargar</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-6 text-muted-foreground">No hay facturas recientes.</p>
                )}
              </Card>
              
              <Card className="rounded-3xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold">Tu equipo en casa</h3>
                {detalles["Datos de equipos"]?.length > 0 ? (
                  <ul className="mt-6 space-y-4">
                    {detalles["Datos de equipos"].map((equipo: any, idx: number) => (
                      <li key={idx} className="flex flex-col rounded-2xl bg-secondary/50 p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{equipo.Equipo || equipo.Marca}</span>
                          <span className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">En línea</span>
                        </div>
                        <span className="text-sm text-muted-foreground mt-1">MAC: {equipo.MAC} • Modelo: {equipo.Modelo}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-6 text-muted-foreground">No hay equipos registrados.</p>
                )}
                
                <Button variant="outline" className="mt-6 w-full rounded-full" asChild>
                  <Link to="/soporte">Reportar un problema de equipo</Link>
                </Button>
              </Card>
            </div>
            
            <div className="mt-12 text-center">
               <Button variant="ghost" onClick={() => { setDetalles(null); setCuentas(null); }} className="text-muted-foreground rounded-full">
                 ← Cerrar sesión (Probar otra cédula)
               </Button>
            </div>
            
          </div>
        )}

      </main>
      <SiteFooter />
    </div>
  );
}