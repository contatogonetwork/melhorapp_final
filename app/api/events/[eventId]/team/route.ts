import { NextRequest, NextResponse } from 'next/server';

// Simulação de banco de dados - em ambiente real, isso estaria em um banco de dados
const mockTeamMembers: Record<string, any[]> = {
  "123": [
    { id: "1", name: "Maria Silva", role: "Coordenadora" },
    { id: "2", name: "João Santos", role: "Operador de Câmera" },
    { id: "3", name: "Ana Souza", role: "Produtora" },
    { id: "4", name: "Carlos Pereira", role: "Editor de Vídeo" },
    { id: "5", name: "Fernanda Lima", role: "Assistente de Produção" }
  ],
  "456": [
    { id: "6", name: "Ricardo Gomes", role: "Diretor" },
    { id: "7", name: "Luciana Costa", role: "Coordenadora" },
    { id: "8", name: "Paulo Oliveira", role: "Operador de Câmera" },
    { id: "9", name: "Mariana Santos", role: "Designer" }
  ]
};

export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { eventId } = params;
    
    // Buscar dados - em um ambiente real, isso viria do banco de dados
    const teamMembers = mockTeamMembers[eventId] || [];
    
    return NextResponse.json(teamMembers, { status: 200 });
  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { status: 500 }
    );
  }
}
