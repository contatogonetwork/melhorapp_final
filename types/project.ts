// Phase interface - Para Timeline
export interface Phase {
  name: string;
  plannedStart: Date;
  plannedEnd: Date;
  completed: boolean;
}

// Task interface - Para sistema de workflow
export type TaskStatus = 'pending' | 'completed';
export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

// VideoVersion interface - Para Sistema de Versões
export interface VideoVersion {
  id: string;
  name: string;       // ex: "v1", "v2", "Final"
  url: string;        // URL do arquivo de vídeo
  thumbnailUrl?: string;
  uploadedAt: Date;
}

// VideoDeliverable interface - Para Sistema de Versões
export type DeliverableStatus = 'editing' | 'ready_for_review' | 'changes_requested' | 'approved';
export interface VideoDeliverable {
  id: string;
  title: string;
  versions: VideoVersion[];
  status?: DeliverableStatus;
  comments?: Comment[];
}

export interface Project {
  id: string;
  title: string;
  name: string;  // Adicionamos para compatibilidade com o novo sistema
  description?: string;
  clientId: string;
  editorId: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'review' | 'approved' | 'completed';
  videoUrl?: string;
  thumbnailUrl?: string;
  deadline?: string;
  
  // Novos campos para as funcionalidades
  eventDate?: Date;
  finalDueDate?: Date;
  timeline: Phase[];
  videos: VideoDeliverable[];
  tasks?: Task[];  // Adicionado para o sistema de tarefas
}

export interface Comment {
  id: string;
  projectId: string;
  userId: string;
  timestamp: number; // timestamp no vídeo em segundos
  content: string;
  createdAt: string;
  resolved: boolean;
  replies?: Comment[];
}

export interface Annotation {
  id: string;
  projectId: string;
  userId: string;
  timestamp: number; // timestamp no vídeo em segundos
  path: string; // SVG path ou dados do desenho
  color: string;
  createdAt: string;
}

export interface Asset {
  id: string;
  projectId: string;
  name: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  thumbnailUrl?: string;
  createdAt: string;
  uploadedBy: string;
}
