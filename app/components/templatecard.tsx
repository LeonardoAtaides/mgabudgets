"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"

interface TemplateCardProps extends React.ComponentProps<"div"> {
  title: string
  description: string
  icon: LucideIcon
  color: string
  onClick?: () => void
}

export function TemplateCard({
  title,
  description,
  icon: Icon,
  color,
  className = "",
  onClick,
  ...props
}: TemplateCardProps) {
  return (
    <div
      data-slot="card"
      onClick={onClick}
      className={`group cursor-pointer overflow-hidden transition-all duration-300 
      hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 
     hover:border-pr/50 
      bg-white/20 text-card-foreground flex flex-col rounded-xl border shadow-sm 
      ${className}`}
      {...props}
    >
      {/* Content */}
      <div data-slot="card-content" className="p-0">
        {/* Preview */}
        <div
          className={`h-40 flex items-center justify-center relative overflow-hidden ${color}`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
          <Icon className="w-16 h-16 text-foreground/80 group-hover:scale-110 transition-transform duration-300" />
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="leading-none font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}