export interface Project {
  id: string;
  title: string;
  description?: string;
  clientId: string;
  editorId: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'review' | 'approved' | 'completed';
  videoUrl?: string;
  thumbnailUrl?: string;
  deadline?: string;
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
