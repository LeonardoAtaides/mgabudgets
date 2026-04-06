"use client"

import { useEffect, useState } from "react"
import { FileText, LayoutTemplate, Plane } from "lucide-react"
import { TemplateCard } from "./components/templatecard"
import { IntroScreen } from "./components/intro"
import { useRouter } from "next/navigation"

const templates = [
  {
    id: "simple",
    title: "Modelo 1",
    description: "Modelo básico com itens, quantidades e valores",
    icon: FileText,
    color: "bg-primary/20",
    route: "/orcamento1"
  },
  {
    id: "detailed",
    title: "Modelo 2",
    description: "Modelo completo com descrições, impostos e condições",
    icon: LayoutTemplate,
    color: "bg-accent/20",
    route: "/orcamento2"
  },
]

const motivationalPhrases = [
  "Transforme sonhos em destinos!",
  "Cada viagem começa com um bom orçamento!",
  "Vamos realizar mais um sonho de viagem!",
  "O mundo espera pelo seu cliente!",
  "Novas aventuras começam aqui!",
  "Bora vender mais uma experiência incrível!",
]

export default function Page() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const router = useRouter()


  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % motivationalPhrases.length)
        setIsAnimating(false)
      }, 400)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />
  }

  return (
    <div className="min-h-screen bg-[#122B4E]">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <Plane className="w-4 h-4 text-[#122B4E]" />
            </div>
            <span className="font-bold text-lg text-foreground">
              Budgetly <span className="text-primary">Tour</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="h-[52px] md:h-[58px] overflow-hidden mb-3">
            <h2
              className={`text-3xl md:text-4xl font-bold text-foreground transition-all duration-400 ${
                isAnimating
                  ? "-translate-y-full opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              {motivationalPhrases[currentPhrase]}
            </h2>
          </div>

          <p className="text-muted-foreground max-w-md mx-auto">
            Selecione o modelo ideal para o seu cliente
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
          {templates.map((template, index) => (
            <div
              key={template.id}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <TemplateCard
                title={template.title}
                description={template.description}
                icon={template.icon}
                color={template.color}
                onClick={() => router.push(template.route)}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-90">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Desenvolvido por{" "}
            <a href="https://ataidesdev.com.br" target="_blank" rel="noopener noreferrer" className="text-primary font-medium">
              Ataídes Dev</a>
          </p>
        </div>
      </footer>
    </div>
  )
}