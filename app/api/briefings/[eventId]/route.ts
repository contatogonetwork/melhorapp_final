import { NextRequest, NextResponse } from 'next/server';

// Simulação de banco de dados - em ambiente real, isso estaria em um banco de dados
const mockBriefings: Record<string, any> = {
  // Exemplo de dados pré-preenchidos para o evento "123"
  "123": {
    eventId: "123",
    eventDate: "2025-05-30",
    startTime: "14:00",
    endTime: "18:00",
    eventLocation: "Centro de Eventos XYZ",
    hasCredentialing: "sim",
    accessLocation: "Entrada Principal",
    credentialingStart: "13:00",
    credentialingEnd: "14:30",
    credentialingResponsible: "1", // ID de um usuário
    eventAccessLocation: "Portão 3",
    hasMediaRoom: "sim",
    mediaRoomLocation: "Sala 204, 2º andar",
    hasInternet: "sim",
    internetLogin: "evento_midia",
    internetPassword: "XYZ123",
    generalInfo: "Este é um evento de grande porte, aguardamos cerca de 500 participantes."
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    // Usar await para acessar params.eventId conforme requerido pelo Next.js
    const eventId = await params.eventId;
    
    // Buscar dados - em um ambiente real, isso viria do banco de dados
    const briefing = mockBriefings[eventId];
    
    if (!briefing) {
      return NextResponse.json(
        { error: 'Briefing não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(briefing, { status: 200 });
  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { status: 500 }
    );
  }
}
