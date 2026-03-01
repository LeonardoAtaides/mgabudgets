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
    <div className="flex gap-6 p-6 bg-[#F2F3F4] min-h-screen">

      {/* FORMULÁRIO */}
      <div className="w-1/3 bg-[#07132b] text-white p-6 rounded-xl shadow-md overflow-y-auto max-h-screen space-y-4">

        <h2 className="text-xl font-bold">Editar Orçamento</h2>

        <input
          className="w-full border p-2 rounded text-black"
          placeholder="Destino"
          value={data.destino}
          onChange={(e) => setData({ ...data, destino: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded text-black"
          placeholder="Hotel"
          value={data.hotel}
          onChange={(e) => setData({ ...data, hotel: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded text-black"
          placeholder="Período"
          value={data.periodo}
          onChange={(e) => setData({ ...data, periodo: e.target.value })}
        />

        <div className="flex gap-2">
          <select
            className="border p-2 rounded text-black"
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
            className="w-full border p-2 rounded text-black"
            placeholder="Valor total"
            value={data.valorTotal}
            onChange={(e) =>
              setData({ ...data, valorTotal: Number(e.target.value) })
            }
          />
        </div>

        <textarea
          className="w-full border p-2 rounded text-black"
          placeholder="Descrição do hotel"
          value={data.descricaoHotel}
          onChange={(e) =>
            setData({ ...data, descricaoHotel: e.target.value })
          }
        />

        {/* IMAGENS */}
        <div>
          <h3 className="font-semibold">Adicionar Imagem (URL)</h3>
          <div className="flex gap-2">
            <input
              className="flex-1 border p-2 rounded text-black"
              placeholder="https://..."
              value={imagemInput}
              onChange={(e) => setImagemInput(e.target.value)}
            />
            <button
              onClick={adicionarImagem}
              disabled={data.imagens.length >= 5}
              className="bg-indigo-600 px-3 rounded"
            >
              +
            </button>
          </div>

          {data.imagens.map((img, index) => (
            <div key={index} className="flex justify-between items-center text-sm mt-2 bg-white text-black p-2 rounded">
              <span className="truncate w-[80%]">{img}</span>
              <button onClick={() => removerImagem(index)} className="text-red-500">
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* BENEFÍCIOS */}
        <div>
          <h3 className="font-semibold">Adicionar Benefício</h3>
          <div className="flex gap-2">
            <input
              className="flex-1 border p-2 rounded text-black"
              value={beneficioInput}
              onChange={(e) => setBeneficioInput(e.target.value)}
            />
            <button onClick={adicionarBeneficio} className="bg-blue-600 px-3 rounded">
              +
            </button>
          </div>

          {data.beneficios.map((beneficio, index) => (
            <div key={index} className="flex justify-between items-center text-sm mt-2 bg-white text-black p-2 rounded">
              <span>{beneficio}</span>
              <button onClick={() => removerBeneficio(index)} className="text-red-500">
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* VOOS */}
        <div className="border-t pt-4">
          <h3 className="font-semibold">Adicionar Voo</h3>

          {(Object.keys(novoVoo) as Array<keyof typeof novoVoo>).map((campo) => (
            <input
              key={campo}
              className="w-full border p-2 rounded mt-2 text-black"
              placeholder={campo}
              value={novoVoo[campo]}
              onChange={(e) =>
                setNovoVoo({ ...novoVoo, [campo]: e.target.value })
              }
            />
          ))}

          <button onClick={adicionarVoo} className="bg-green-600 w-full py-2 rounded mt-2">
            Adicionar Voo
          </button>

          {data.voos.map((voo, index) => (
            <div key={index} className="mt-2 bg-white text-black p-2 rounded flex justify-between text-sm">
              <span>{voo.cia} - {voo.voo}</span>
              <button onClick={() => removerVoo(index)} className="text-red-500">
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* QUARTOS */}
        <div className="border-t pt-4">
          <h3 className="font-semibold">Adicionar Quarto</h3>

          {(Object.keys(novoQuarto) as Array<keyof typeof novoQuarto>).map((campo) => (
            <input
              key={campo}
              className="w-full border p-2 rounded mt-2 text-black"
              placeholder={campo}
              value={novoQuarto[campo]}
              onChange={(e) =>
                setNovoQuarto({ ...novoQuarto, [campo]: e.target.value })
              }
            />
          ))}

          <button onClick={adicionarQuarto} className="bg-purple-600 w-full py-2 rounded mt-2">
            Adicionar Quarto
          </button>

          {data.quartos.map((quarto, index) => (
            <div key={index} className="mt-2 bg-white text-black p-2 rounded flex justify-between text-sm">
              <span>{quarto.nome}</span>
              <button onClick={() => removerQuarto(index)} className="text-red-500">
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={limparTudo}
          className="bg-red-600 w-full py-2 rounded mt-4"
        >
          Limpar Orçamento
        </button>

      </div>

      {/* PREVIEW */}
      <div className="w-2/3">
        <HotelOrcamento data={data} />
      </div>
    </div>
  )
}