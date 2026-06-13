import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Phone, Mail, Search, Brain, Receipt, Wifi, Tv, X } from "lucide-react";

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
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (!document.getElementById('n8n-chat-script-soporte')) {
      // Limpiar el historial en caché para que no recupere el mensaje en inglés antiguo
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('n8n-chat')) {
          localStorage.removeItem(key);
        }
      });

      const script = document.createElement('script');
      script.type = 'module';
      script.id = 'n8n-chat-script-soporte';
      script.innerHTML = `
        import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
        createChat({
          webhookUrl: 'https://vmi3345591.contaboserver.net/webhook/2e7caeca-c246-442f-910b-7d14e7e9a013/chat',
          target: '#n8n-chat-container',
          mode: 'fullscreen',
          showWelcomeScreen: false,
          initialMessages: [
            'Estoy conectado al sistema para ayudarte de inmediato con facturas, soporte técnico o ventas. ¿En qué te puedo ayudar hoy?'
          ],
          i18n: {
            en: {
              title: '¡Hola! Soy tu asistente inteligente de TV Norte. 🤖',
              subtitle: 'Estamos aquí para ayudarte 24/7.',
              getStarted: 'Nueva conversación',
              inputPlaceholder: 'Escribe tu pregunta aquí...',
            }
          }
        });
      `;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">Estamos para ayudarte.</h1>
          <p className="mt-4 text-lg text-muted-foreground">Soporte humano + AI, 24 horas al día, 7 días a la semana.</p>
          
          <div className={`mx-auto mt-8 w-full max-w-3xl rounded-3xl border border-border shadow-2xl overflow-hidden bg-background text-left transition-all animate-in fade-in zoom-in-95 ${chatOpen ? 'flex flex-col h-[650px]' : 'hidden'}`}>
            {/* Cabecera Premium del Chat */}
            <div className="bg-primary px-6 py-4 flex items-center justify-between text-primary-foreground shrink-0 shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-left leading-tight">Asistente Inteligente</h3>
                  <p className="text-xs text-primary-foreground/80 text-left">TV Norte Smart Living</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground hover:bg-white/20 hover:text-white rounded-full transition-colors" 
                onClick={() => setChatOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Contenedor donde N8N inyectará el chat en modo fullscreen */}
            <div id="n8n-chat-container" className="w-full flex-1 relative bg-slate-50/50"></div>
          </div>
          
          {!chatOpen && (
            <div 
              className="mx-auto mt-8 flex max-w-2xl items-center gap-2 rounded-full border border-border bg-card px-5 py-3 shadow-sm cursor-text hover:border-primary/50 transition-colors animate-in fade-in"
              onClick={() => setChatOpen(true)}
            >
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input 
                className="border-0 shadow-none focus-visible:ring-0 text-base pointer-events-none" 
                placeholder="Pregunta lo que necesites…" 
                readOnly
              />
              <Button className="rounded-full pointer-events-none">Preguntar</Button>
            </div>
          )}
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <Card className="rounded-3xl p-8 text-center transition-all hover:shadow-md">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366]/10 text-[#25D366]"><MessageCircle className="h-6 w-6" /></div>
            <h3 className="mt-5 text-lg font-semibold">WhatsApp Inteligente</h3>
            <p className="mt-1 text-sm text-muted-foreground">Respuesta inmediata 24/7</p>
            <Button asChild variant="outline" className="mt-5 rounded-full w-full hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors">
              <a href="https://wa.me/573212181839?text=Hola,%20necesito%20ayuda%20con%20mi%20servicio%20de%20TV%20Norte." target="_blank" rel="noopener noreferrer">
                Abrir chat
              </a>
            </Button>
          </Card>
          <Card className="rounded-3xl p-8 text-center transition-all hover:shadow-md">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Phone className="h-6 w-6" /></div>
            <h3 className="mt-5 text-lg font-semibold">Línea directa</h3>
            <p className="mt-1 text-sm text-muted-foreground">+57 333 033 3696 ext 8</p>
            <Button asChild variant="outline" className="mt-5 rounded-full w-full hover:bg-primary hover:text-white transition-colors">
              <a href="tel:+573330333696,8">
                Llamar
              </a>
            </Button>
          </Card>
          <Card className="rounded-3xl p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Mail className="h-6 w-6" /></div>
            <h3 className="mt-5 text-lg font-semibold">Correo</h3>
            <p className="mt-1 text-sm text-muted-foreground">hola@tunorte.co</p>
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