import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Project, Comment, Annotation, Asset, VideoVersion, VideoDeliverable } from '@/types/project';

interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  comments: Comment[];
  annotations: Annotation[];
  assets: Asset[];
  isLoading: boolean;
}

interface ProjectsStore extends ProjectsState {
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, projectData: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  createProject: (data: Omit<Project, "id">) => void;
  addVideoVersion: (file: File, deliverableId?: string) => Promise<void>;
  
  // Comentários
  addComment: (comment: Comment) => void;
  updateComment: (id: string, commentData: Partial<Comment>) => void;
  deleteComment: (id: string) => void;
  resolveComment: (id: string, resolved: boolean) => void;
  
  // Anotações
  addAnnotation: (annotation: Annotation) => void;
  updateAnnotation: (id: string, annotationData: Partial<Annotation>) => void;
  deleteAnnotation: (id: string) => void;
  
  // Assets
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, assetData: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
}

export const useProjectsStore = create<ProjectsStore>()(
  persist(
    (set) => ({
      projects: [],
      currentProject: null,
      comments: [],
      annotations: [],
      assets: [],
      isLoading: false,
      
      setProjects: (projects) => set({ projects }),
      setCurrentProject: (currentProject) => set({ currentProject }),
      addProject: (project) => set((state) => ({ 
        projects: [...state.projects, project] 
      })),
      
      // Nova implementação do createProject
      createProject: (data) => set((state) => {
        const newId = Date.now().toString();  // gera um ID simples (timestamp)
        // Se nenhum vídeo foi fornecido, inicializa com um deliverable padrão
        const initialVideos: VideoDeliverable[] = data.videos && data.videos.length > 0
          ? data.videos
          : [{ id: `${newId}-vid1`, title: "Vídeo 1", versions: [] }];
        
        const newProject: Project = {
          id: newId,
          ...data,
          videos: initialVideos,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        return { 
          projects: [...state.projects, newProject],
          currentProject: newProject 
        };
      }),
      
      updateProject: (id, projectData) => set((state) => ({
        projects: state.projects.map(project => 
          project.id === id ? { ...project, ...projectData } : project
        ),
        currentProject: state.currentProject?.id === id 
          ? { ...state.currentProject, ...projectData } 
          : state.currentProject
      })),
      
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter(project => project.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject
      })),
      
      // Nova implementação de addVideoVersion
      addVideoVersion: async (file, deliverableId) => set((state) => {
        if (!state.currentProject) return {};
        
        // Identifica o deliverable alvo (usa o primeiro vídeo caso não seja especificado)
        const deliverables = state.currentProject.videos;
        if (!deliverables.length) return {};
        
        const targetDeliverable = deliverableId 
          ? deliverables.find(d => d.id === deliverableId)
          : deliverables[0];
        
        if (!targetDeliverable) return {};
        
        // Cria uma URL temporária para o arquivo (simulação de upload)
        const fileUrl = URL.createObjectURL(file);
        
        // Cria objeto da nova versão
        const newVersionNumber = targetDeliverable.versions.length + 1;
        const newVersion: VideoVersion = {
          id: `${targetDeliverable.id}-v${newVersionNumber}`,
          name: `v${newVersionNumber}`,
          url: fileUrl,
          uploadedAt: new Date()
        };
        
        // Atualiza o deliverable com a nova versão
        const updatedDeliverables = deliverables.map(d =>
          d.id === targetDeliverable.id
            ? { ...d, versions: [...d.versions, newVersion] }
            : d
        );
        
        // Atualiza o projeto com os novos deliverables
        const updatedProject = {
          ...state.currentProject,
          videos: updatedDeliverables,
          updatedAt: new Date().toISOString()
        };
        
        return {
          currentProject: updatedProject,
          projects: state.projects.map(p => 
            p.id === updatedProject.id ? updatedProject : p
          )
        };
      }),
      
      // Gerenciamento de Comentários
      addComment: (comment) => set((state) => ({
        comments: [...state.comments, comment]
      })),
      updateComment: (id, commentData) => set((state) => ({
        comments: state.comments.map(comment => 
          comment.id === id ? { ...comment, ...commentData } : comment
        )
      })),
      deleteComment: (id) => set((state) => ({
        comments: state.comments.filter(comment => comment.id !== id)
      })),
      resolveComment: (id, resolved) => set((state) => ({
        comments: state.comments.map(comment =>
          comment.id === id ? { ...comment, resolved } : comment
        )
      })),
      
      // Gerenciamento de Anotações
      addAnnotation: (annotation) => set((state) => ({
        annotations: [...state.annotations, annotation]
      })),
      updateAnnotation: (id, annotationData) => set((state) => ({
        annotations: state.annotations.map(annotation => 
          annotation.id === id ? { ...annotation, ...annotationData } : annotation
        )
      })),
      deleteAnnotation: (id) => set((state) => ({
        annotations: state.annotations.filter(annotation => annotation.id !== id)
      })),
      
      // Gerenciamento de Assets
      addAsset: (asset) => set((state) => ({
        assets: [...state.assets, asset]
      })),
      updateAsset: (id, assetData) => set((state) => ({
        assets: state.assets.map(asset => 
          asset.id === id ? { ...asset, ...assetData } : asset
        )
      })),
      deleteAsset: (id) => set((state) => ({
        assets: state.assets.filter(asset => asset.id !== id)
      }))
    }),
    {
      name: 'projects-storage',
      partialize: (state) => ({
        projects: state.projects,
        currentProject: state.currentProject,
      }),
    }
  )
);
