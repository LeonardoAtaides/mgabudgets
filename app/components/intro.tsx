"use client"

import { useEffect, useState } from "react"

interface IntroScreenProps {
  onComplete: () => void
}

export function IntroScreen({ onComplete }: IntroScreenProps) {

  const [showDeveloper, setShowDeveloper] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const devTimer = setTimeout(() => setShowDeveloper(true), 1500)
    
    // Animação da barra de progresso
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 30) // 30ms * 50 = 1500ms para completar

    const completeTimer = setTimeout(() => onComplete(), 3500)

    return () => {
      clearTimeout(devTimer)
      clearTimeout(completeTimer)
      clearInterval(interval)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-[#122B4E] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6 w-full max-w-md px-4">
        {/* Logo / Nome do Sistema */}
        <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white whitespace-nowrap">
            Budgetly Tour        
            </h1>
        </div>

        {/* Linha Animada */}
        <div className="w-full mt-4">
          <div className="relative w-full h-1 bg-blue-900/30 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-white to-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Efeito de brilho na barra */}
              <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white/30 to-transparent transform skew-x-20 animate-shimmer"></div>
            </div>
          </div>
          

        </div>

        {/* Desenvolvedor */}
        <p
          className={`text-sm text-blue-200/70 transition-all duration-700 ${
            showDeveloper ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          Desenvolvido por{" "}
          <span className="text-white font-medium">Ataídes Dev</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-20deg);
          }
          100% {
            transform: translateX(200%) skewX(-20deg);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}