"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface CommentMarkerProps {
  id: string
  time: number
  duration: number
  isResolved: boolean
  commentText: string
  onClick: (id: string, time: number) => void
  className?: string
}

export default function CommentMarker({
  id,
  time,
  duration,
  isResolved,
  commentText,
  onClick,
  className,
}: CommentMarkerProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Calculate position as percentage of total duration
  const position = duration > 0 ? (time / duration) * 100 : 0

  // Determine color based on resolved status
  const markerColor = isResolved ? "bg-success" : "bg-primary"

  // Format time for display (MM:SS)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "absolute h-full w-1.5 cursor-pointer transition-all",
              isHovered ? "w-2 -translate-x-0.5" : "",
              markerColor,
              className,
            )}
            style={{ left: `${position}%` }}
            onClick={() => onClick(id, time)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-comment-id={id}
          />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-1">
            <div className="font-medium">{formatTime(time)}</div>
            <p className="text-xs line-clamp-2">{commentText}</p>
            <div className="text-xs text-muted-foreground">{isResolved ? "Resolvido" : "Pendente"}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
