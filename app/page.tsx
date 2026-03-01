"use client"

import { useState } from "react"
import HotelOrcamento from "./HotelBudgets/page"
import { BudgetsData } from "@/types/budgets"

export default function Page() {
  const [data, setData] = useState<BudgetsData>({
    destino: "",
    periodo: "",
    hotel: "",
    valorTotal: 0,
    moeda: "BRL",
    descricaoHotel: "",
    beneficios: [],
    imagens: [],
    voos: [],
    quartos: []
  })

  const [beneficioInput, setBeneficioInput] = useState("")
  const [imagemInput, setImagemInput] = useState("")

  const [novoVoo, setNovoVoo] = useState({
    cia: "",
    voo: "",
    saida: "",
    chegada: "",
    origem: "",
    destino: "",
    duracao: ""
  })

  const [novoQuarto, setNovoQuarto] = useState({
    nome: "",
    vista: "",
    cama: "",
    tamanho: "",
    incluso: ""
  })

  function adicionarBeneficio() {
    if (!beneficioInput.trim()) return
    setData(prev => ({
      ...prev,
      beneficios: [...prev.beneficios, beneficioInput]
    }))
    setBeneficioInput("")
  }

  function removerBeneficio(index: number) {
    setData(prev => ({
      ...prev,
      beneficios: prev.beneficios.filter((_, i) => i !== index)
    }))
  }

  function adicionarImagem() {
    if (!imagemInput.trim()) return
    if (data.imagens.length >= 5) {
      alert("Máximo de 5 imagens permitidas.")
      return
    }
    setData(prev => ({
      ...prev,
      imagens: [...prev.imagens, imagemInput]
    }))
    setImagemInput("")
  }

  function removerImagem(index: number) {
    setData(prev => ({
      ...prev,
      imagens: prev.imagens.filter((_, i) => i !== index)
    }))
  }

  function adicionarVoo() {
    if (!novoVoo.cia || !novoVoo.voo) return

    setData(prev => ({
      ...prev,
      voos: [...prev.voos, novoVoo]
    }))

    setNovoVoo({
      cia: "",
      voo: "",
      saida: "",
      chegada: "",
      origem: "",
      destino: "",
      duracao: ""
    })
  }

  function removerVoo(index: number) {
    setData(prev => ({
      ...prev,
      voos: prev.voos.filter((_, i) => i !== index)
    }))
  }

  function adicionarQuarto() {
    if (!novoQuarto.nome) return

    setData(prev => ({
      ...prev,
      quartos: [...prev.quartos, novoQuarto]
    }))

    setNovoQuarto({
      nome: "",
      vista: "",
      cama: "",
      tamanho: "",
      incluso: ""
    })
  }

  function removerQuarto(index: number) {
    setData(prev => ({
      ...prev,
      quartos: prev.quartos.filter((_, i) => i !== index)
    }))
  }

  function limparTudo() {
    if (!confirm("Tem certeza que deseja limpar o orçamento?")) return

    setData({
      destino: "",
      periodo: "",
      hotel: "",
      valorTotal: 0,
      moeda: "BRL",
      descricaoHotel: "",
      beneficios: [],
      imagens: [],
      voos: [],
      quartos: []
    })
  }

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">

      {/* EDITOR */}
      <div className="w-[380px] bg-white border-r border-gray-200 p-6 overflow-y-auto shadow-sm space-y-6">

        <h2 className="text-xl font-semibold text-gray-800">
          Editor de Orçamento
        </h2>

        {/* DADOS BÁSICOS */}
        <div className="space-y-3">
          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Destino"
            value={data.destino}
            onChange={(e) => setData({ ...data, destino: e.target.value })}
          />

          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Hotel"
            value={data.hotel}
            onChange={(e) => setData({ ...data, hotel: e.target.value })}
          />

          <input
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Período"
            value={data.periodo}
            onChange={(e) => setData({ ...data, periodo: e.target.value })}
          />

          <div className="flex gap-2">
            <select
              className="border border-gray-300 p-2 rounded-lg"
              value={data.moeda}
              onChange={(e) =>
                setData({ ...data, moeda: e.target.value as "BRL" | "USD" })
              }
            >
              <option value="BRL">R$</option>
              <option value="USD">$</option>
            </select>

            <input
              type="number"
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Valor total"
              value={data.valorTotal}
              onChange={(e) =>
                setData({ ...data, valorTotal: Number(e.target.value) })
              }
            />
          </div>

          <textarea
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Descrição do hotel"
            value={data.descricaoHotel}
            onChange={(e) =>
              setData({ ...data, descricaoHotel: e.target.value })
            }
          />
        </div>

        {/* IMAGENS */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Imagens</h3>

          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 p-2 rounded-lg"
              placeholder="https://..."
              value={imagemInput}
              onChange={(e) => setImagemInput(e.target.value)}
            />
            <button
              onClick={adicionarImagem}
              className="bg-indigo-600 text-white px-3 rounded-lg"
            >
              +
            </button>
          </div>

          {data.imagens.map((img, index) => (
            <div key={index} className="flex justify-between items-center text-sm bg-gray-100 p-2 rounded-lg">
              <span className="truncate w-[80%]">{img}</span>
              <button onClick={() => removerImagem(index)} className="text-red-500">
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* BENEFÍCIOS */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Benefícios</h3>

          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 p-2 rounded-lg"
              value={beneficioInput}
              onChange={(e) => setBeneficioInput(e.target.value)}
            />
            <button
              onClick={adicionarBeneficio}
              className="bg-blue-600 text-white px-3 rounded-lg"
            >
              +
            </button>
          </div>

          {data.beneficios.map((beneficio, index) => (
            <div key={index} className="flex justify-between items-center text-sm bg-gray-100 p-2 rounded-lg">
              <span>{beneficio}</span>
              <button onClick={() => removerBeneficio(index)} className="text-red-500">
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* VOOS */}
        <div className="border-t pt-4 space-y-2">
          <h3 className="font-semibold text-gray-700">Voos</h3>

          {(Object.keys(novoVoo) as Array<keyof typeof novoVoo>).map((campo) => (
            <input
              key={campo}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder={campo}
              value={novoVoo[campo]}
              onChange={(e) =>
                setNovoVoo({ ...novoVoo, [campo]: e.target.value })
              }
            />
          ))}

          <button
            onClick={adicionarVoo}
            className="bg-green-600 text-white w-full py-2 rounded-lg"
          >
            Adicionar Voo
          </button>

          {data.voos.map((voo, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded-lg flex justify-between text-sm">
              <span>{voo.cia} - {voo.voo}</span>
              <button onClick={() => removerVoo(index)} className="text-red-500">
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* QUARTOS */}
        <div className="border-t pt-4 space-y-2">
          <h3 className="font-semibold text-gray-700">Quartos</h3>

          {(Object.keys(novoQuarto) as Array<keyof typeof novoQuarto>).map((campo) => (
            <input
              key={campo}
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder={campo}
              value={novoQuarto[campo]}
              onChange={(e) =>
                setNovoQuarto({ ...novoQuarto, [campo]: e.target.value })
              }
            />
          ))}

          <button
            onClick={adicionarQuarto}
            className="bg-purple-600 text-white w-full py-2 rounded-lg"
          >
            Adicionar Quarto
          </button>

          {data.quartos.map((quarto, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded-lg flex justify-between text-sm">
              <span>{quarto.nome}</span>
              <button onClick={() => removerQuarto(index)} className="text-red-500">
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={limparTudo}
          className="bg-red-600 text-white w-full py-2 rounded-lg mt-4"
        >
          Limpar Orçamento
        </button>
      </div>

      {/* PREVIEW */}
      <div className="flex-1 overflow-auto bg-gray-200 p-10">
        <div className="flex justify-center">
          <HotelOrcamento data={data} />
        </div>
      </div>

    </div>
  )
}