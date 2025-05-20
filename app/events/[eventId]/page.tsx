"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/useUIStore";

type Event = {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  status: string;
  client: string;
  type: string;
  description: string;
};

export default function EventPage() {
  const params = useParams<{ eventId: string }>();
  const eventId = params.eventId;  const router = useRouter();
  const setCurrentPage = useUIStore((state) => state.setCurrentPage);
  const setSelectedEventId = useUIStore((state) => state.setSelectedEventId);
  
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/events/${eventId}`);
        
        if (!response.ok) {
          throw new Error("Falha ao carregar dados do evento");
        }
        
        const data = await response.json();
        setEvent(data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar evento:", err);
        setError("Não foi possível carregar os dados do evento");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEventData();
  }, [eventId]);
  
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#282A36] text-[#F8F8F2]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8BE9FD] mx-auto"></div>
          <p className="mt-4 text-lg">Carregando evento...</p>
        </div>
      </div>
    );
  }
  
  if (error || !event) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#282A36] text-[#F8F8F2]">
        <Card className="w-full max-w-md bg-[#21222C] border-[#44475A] text-[#F8F8F2]">
          <CardHeader>
            <CardTitle className="text-[#FF5555]">Erro ao carregar</CardTitle>
            <CardDescription className="text-[#6272A4]">
              {error || "Evento não encontrado"}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/events" className="w-full">
              <Button variant="outline" className="w-full">
                Voltar para lista de eventos
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="w-full min-h-screen bg-[#282A36] text-[#F8F8F2] p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#8BE9FD]">{event.name}</h1>
        <p className="text-lg text-[#6272A4]">{event.client}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-[#21222C] border-[#44475A] text-[#F8F8F2]">
          <CardHeader>
            <CardTitle className="text-[#F1FA8C]">Detalhes do Evento</CardTitle>
            <CardDescription className="text-[#6272A4]">
              Informações gerais sobre o evento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-[#6272A4]">Data e Hora</p>
              <p className="text-[#F8F8F2]">{event.date} às {event.time}</p>
            </div>
            <div>
              <p className="text-sm text-[#6272A4]">Local</p>
              <p className="text-[#F8F8F2]">{event.location}</p>
            </div>
            <div>
              <p className="text-sm text-[#6272A4]">Tipo</p>
              <p className="text-[#F8F8F2] capitalize">{event.type}</p>
            </div>
            <div>
              <p className="text-sm text-[#6272A4]">Status</p>
              <div className={`inline-block px-2 py-1 rounded-md text-sm ${
                event.status === "confirmado" 
                  ? "bg-green-900 text-green-100" 
                  : "bg-yellow-900 text-yellow-100"
              }`}>
                {event.status}
              </div>
            </div>
            <div>
              <p className="text-sm text-[#6272A4]">Descrição</p>
              <p className="text-[#F8F8F2]">{event.description}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#21222C] border-[#44475A] text-[#F8F8F2]">
          <CardHeader>
            <CardTitle className="text-[#BD93F9]">Briefing</CardTitle>
            <CardDescription className="text-[#6272A4]">
              Todas as informações para o planejamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[#F8F8F2]">
              Acesse o briefing completo do evento com todas as informações necessárias para a equipe.
            </p>
          </CardContent>          <CardFooter>
            <Button 
              className="w-full bg-[#6272A4] hover:bg-[#50587E]"              onClick={() => {
                setCurrentPage(3); // Navegar para a aba Briefing (índice 3)
                setSelectedEventId(eventId as string); // Definir o ID do evento selecionado
                router.push('/'); // Voltar à página inicial onde o componente MainWindow está renderizado
              }}
            >
              Acessar Briefing
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-[#21222C] border-[#44475A] text-[#F8F8F2]">
          <CardHeader>
            <CardTitle className="text-[#FF79C6]">Entregas</CardTitle>
            <CardDescription className="text-[#6272A4]">
              Arquivos e materiais do evento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[#F8F8F2]">
              Gerencie os arquivos de vídeo, áudio e outros materiais relacionados ao evento.
            </p>
          </CardContent>
          <CardFooter>
            <Link href={`/events/${eventId}/assets`} className="w-full">
              <Button className="w-full bg-[#FF79C6] hover:bg-[#DA68A8] text-white">
                Gerenciar Entregas
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
