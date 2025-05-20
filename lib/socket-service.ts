import { io, type Socket } from "socket.io-client"
import type { Comment } from "@/components/video/comment-markers-timeline"
import type { Annotation } from "@/components/video/annotation-canvas"

// Tipos para os eventos do socket
export interface ServerToClientEvents {
  userJoined: (user: CollaborationUser) => void
  userLeft: (userId: string) => void
  userCursorMoved: (userId: string, position: { x: number; y: number }) => void
  userIsTyping: (userId: string, isTyping: boolean) => void
  commentAdded: (comment: Comment) => void
  commentUpdated: (comment: Comment) => void
  commentDeleted: (commentId: string) => void
  annotationStarted: (userId: string, annotation: Annotation) => void
  annotationUpdated: (userId: string, annotation: Annotation) => void
  annotationCompleted: (annotation: Annotation) => void
  annotationDeleted: (annotationId: string) => void
  videoSeeked: (userId: string, time: number) => void
  videoPlayPause: (userId: string, isPlaying: boolean) => void
  initialState: (data: CollaborationState) => void
}

export interface ClientToServerEvents {
  joinSession: (sessionId: string, user: CollaborationUser) => void
  leaveSession: () => void
  moveCursor: (position: { x: number; y: number }) => void
  setTyping: (isTyping: boolean) => void
  addComment: (comment: Comment) => void
  updateComment: (comment: Comment) => void
  deleteComment: (commentId: string) => void
  startAnnotation: (annotation: Annotation) => void
  updateAnnotation: (annotation: Annotation) => void
  completeAnnotation: (annotation: Annotation) => void
  deleteAnnotation: (annotationId: string) => void
  seekVideo: (time: number) => void
  playPauseVideo: (isPlaying: boolean) => void
  requestInitialState: () => void
}

export interface CollaborationUser {
  id: string
  name: string
  avatar?: string
  color: string
  role: string
}

export interface CollaborationState {
  users: CollaborationUser[]
  comments: Comment[]
  annotations: Annotation[]
  currentTime?: number
  isPlaying?: boolean
}

class SocketService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null
  private connected = false

  // Inicializar a conexão com o servidor Socket.IO
  connect(serverUrl: string = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001") {
    if (this.connected) return

    this.socket = io(serverUrl, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    this.socket.on("connect", () => {
      console.log("Conectado ao servidor de colaboração")
      this.connected = true
    })

    this.socket.on("disconnect", () => {
      console.log("Desconectado do servidor de colaboração")
      this.connected = false
    })

    return this.socket
  }

  // Desconectar do servidor
  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.connected = false
    }
  }

  // Entrar em uma sessão de colaboração
  joinSession(sessionId: string, user: CollaborationUser) {
    if (!this.socket) return
    this.socket.emit("joinSession", sessionId, user)
  }

  // Sair da sessão de colaboração
  leaveSession() {
    if (!this.socket) return
    this.socket.emit("leaveSession")
  }

  // Mover o cursor
  moveCursor(position: { x: number; y: number }) {
    if (!this.socket) return
    this.socket.emit("moveCursor", position)
  }

  // Definir estado de digitação
  setTyping(isTyping: boolean) {
    if (!this.socket) return
    this.socket.emit("setTyping", isTyping)
  }

  // Adicionar um comentário
  addComment(comment: Comment) {
    if (!this.socket) return
    this.socket.emit("addComment", comment)
  }

  // Atualizar um comentário
  updateComment(comment: Comment) {
    if (!this.socket) return
    this.socket.emit("updateComment", comment)
  }

  // Excluir um comentário
  deleteComment(commentId: string) {
    if (!this.socket) return
    this.socket.emit("deleteComment", commentId)
  }

  // Iniciar uma anotação
  startAnnotation(annotation: Annotation) {
    if (!this.socket) return
    this.socket.emit("startAnnotation", annotation)
  }

  // Atualizar uma anotação em progresso
  updateAnnotation(annotation: Annotation) {
    if (!this.socket) return
    this.socket.emit("updateAnnotation", annotation)
  }

  // Completar uma anotação
  completeAnnotation(annotation: Annotation) {
    if (!this.socket) return
    this.socket.emit("completeAnnotation", annotation)
  }

  // Excluir uma anotação
  deleteAnnotation(annotationId: string) {
    if (!this.socket) return
    this.socket.emit("deleteAnnotation", annotationId)
  }

  // Buscar no vídeo
  seekVideo(time: number) {
    if (!this.socket) return
    this.socket.emit("seekVideo", time)
  }

  // Reproduzir/pausar o vídeo
  playPauseVideo(isPlaying: boolean) {
    if (!this.socket) return
    this.socket.emit("playPauseVideo", isPlaying)
  }

  // Solicitar o estado inicial da sessão
  requestInitialState() {
    if (!this.socket) return
    this.socket.emit("requestInitialState")
  }

  // Obter o socket atual
  getSocket() {
    return this.socket
  }

  // Verificar se está conectado
  isConnected() {
    return this.connected
  }
}

// Exportar uma instância singleton
export const socketService = new SocketService()
