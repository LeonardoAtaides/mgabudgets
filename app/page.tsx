"use client"

import { useState, useRef, useEffect  } from "react"
import HotelOrcamento from "./components/page"
import { BudgetsData } from "@/types/budgets"
import { Plus, X, Trash, FileText, Pencil} from "lucide-react"
import { useReactToPrint } from "react-to-print"

export default function Page() {
  const [mounted, setMounted] = useState(false)

  const [data, setData] = useState<BudgetsData>({
    destino: "",
    periodo: "",
    hotel: "",
    valorTotal: "",
    moeda: "BRL",
    descricaoHotel: "",
    beneficios: [],
    imagens: [],
    voos: [],
    quartos: [],
    mostrarResumo: true,
    mostrarInfo: true,
    viajantes:"",
    regime:""
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const saved = localStorage.getItem("orcamentoHotel")
    if (saved) {
      setData(JSON.parse(saved))
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem("orcamentoHotel", JSON.stringify(data))
  }, [data, mounted])


  const [beneficioInput, setBeneficioInput] = useState("")
  const [imagemInput, setImagemInput] = useState("")
  const [editandoBeneficio, setEditandoBeneficio] = useState<number | null>(null)
  const [editandoQuarto, setEditandoQuarto] = useState<number | null>(null)
  const [editandoVoo, setEditandoVoo] = useState<number | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: "Orcamento-Hotel",
  })
  const [novoVoo, setNovoVoo] = useState({
    cia: "",
    classe:"",
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
      classe:"",
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
      valorTotal: "",
      moeda: "BRL",
      descricaoHotel: "",
      beneficios: [],
      imagens: [],
      voos: [],
      quartos: [],
      mostrarResumo: true,
      mostrarInfo: true,
      viajantes:"",
      regime:"",
    })
  }

  function editarVoo(
  index: number,
  campo: keyof typeof novoVoo,
  valor: string
) {
  setData(prev => ({
    ...prev,
    voos: prev.voos.map((voo, i) =>
      i === index ? { ...voo, [campo]: valor } : voo
    )
  }))
}
function editarQuarto(
  index: number,
  campo: keyof typeof novoQuarto,
  valor: string
) {
  setData(prev => ({
    ...prev,
    quartos: prev.quartos.map((quarto, i) =>
      i === index ? { ...quarto, [campo]: valor } : quarto
    )
  }))
}


  if (!mounted) return null

  return (
    <div className="h-screen flex overflow-hidden">

      {/* EDITOR */}
      <div className="w-[380px] bg-[#ffffff] border-r border-gray-200 p-6 overflow-y-auto shadow-sm space-y-6 print:hidden">

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Editor de Orçamento
        </h2>


        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white p-2 rounded-full"
        >
          <FileText className="w-5 h-5"/>
        </button>  

        <button
          onClick={limparTudo}
          className="bg-red-600 text-white p-2 rounded-full"
        >
          <Trash className="w-5 h-5"/>
        </button>  
      </div>
 

        {/* DADOS BÁSICOS */}
        <div className="space-y-3">
          <input
            className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400"
            placeholder="Destino"
            value={data.destino}
            onChange={(e) => setData({ ...data, destino: e.target.value })}
          />

          <input
            className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400"
            placeholder="Hotel"
            value={data.hotel}
            onChange={(e) => setData({ ...data, hotel: e.target.value })}
          />

          <input
            className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400"
            placeholder="Período"
            value={data.periodo}
            onChange={(e) => setData({ ...data, periodo: e.target.value })}
          />

        {/* IMAGENS */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Imagens</h3>

          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400"
              placeholder="https://..."
              value={imagemInput}
              onChange={(e) => setImagemInput(e.target.value)}
            />
            <button
              onClick={adicionarImagem}
              className="bg-green-600 text-white px-3 rounded-lg"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>

          {data.imagens.map((img, index) => (
            <div key={index} className="flex justify-between items-center text-sm bg-gray-100 text-gray-400 p-2 rounded-lg">
              <span className="truncate w-[80%]">{img}</span>
              <button onClick={() => removerImagem(index)}>
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ))}
        </div>

          <h3 className="font-semibold text-gray-700">Informações e Valores</h3>

          <textarea
            className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400"
            placeholder="Descrição do hotel"
            value={data.descricaoHotel}
            onChange={(e) =>
              setData({ ...data, descricaoHotel: e.target.value })
            }
          />

        {/* BENEFÍCIOS */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Benefícios</h3>

          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 p-2 rounded-lg text-gray-400"
              value={beneficioInput}
              onChange={(e) => setBeneficioInput(e.target.value)}
            />
            <button
              onClick={adicionarBeneficio}
              className="bg-green-600 text-white px-3 rounded-lg"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>


        {data.beneficios.map((beneficio, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 p-2 rounded-lg gap-2"
          >
            {editandoBeneficio === index ? (
              <input
                autoFocus
                className="flex-1 bg-white border border-gray-300 p-1 rounded text-gray-600"
                value={beneficio}
                onChange={(e) =>
                  setData(prev => ({
                    ...prev,
                    beneficios: prev.beneficios.map((b, i) =>
                      i === index ? e.target.value : b
                    )
                  }))
                }
                onBlur={() => setEditandoBeneficio(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    e.currentTarget.blur() 
                  }
                }}
              />
            ) : (
              <span className="flex-1 text-gray-600">{beneficio}</span>
            )}

            <div className="flex gap-2">
              <button onClick={() => setEditandoBeneficio(index)}>
                <Pencil className="w-4 h-4 text-blue-500" />
              </button>

              <button onClick={() => removerBeneficio(index)}>
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
        </div>     
            
          <h3 className="font-semibold text-gray-700">Valor</h3>
          <div className="flex gap-2">
            <select
              className="border border-gray-300 p-2 rounded-lg text-gray-500"
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
              className="w-full border border-gray-300 p-2 rounded-lg text-gray-400"
              value={data.valorTotal}
              onChange={(e) =>
                setData({ ...data, valorTotal:(e.target.value) })
              }
            />
          </div>
        </div>




        {/* VOOS */}
        <div className="border-t pt-4 space-y-2">
          <h3 className="font-semibold text-gray-700">Voos</h3>

          {(Object.keys(novoVoo) as Array<keyof typeof novoVoo>).map((campo) => (
            <input
              key={campo}
              className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400"
              placeholder={campo}
              value={novoVoo[campo]}
              onChange={(e) =>
                setNovoVoo({ ...novoVoo, [campo]: e.target.value })
              }
            />
          ))}

          <button
            onClick={adicionarVoo}
            className="bg-green-600 text-white w-full py-2 rounded-lg flex gap-2 justify-center items-center"
          >
            <Plus className="w-5 h-5 text-white" /> Adicionar Voo
          </button>

          {data.voos.map((voo, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg space-y-2">

            {editandoVoo === index ? (
                <>
                {(Object.keys(voo) as Array<keyof typeof voo>).map((campo) => (
                  <input
                    key={campo}
                    autoFocus={campo === "cia"}
                    className="w-full bg-white border border-gray-300 p-2 rounded text-gray-600"
                    value={voo[campo]}
                    placeholder={campo}
                    onChange={(e) =>
                      editarVoo(index, campo, e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        setEditandoVoo(null)
                      }
                    }}
                  />
                ))}

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditandoVoo(null)}
                    className="flex-1 bg-blue-600 text-white py-1 rounded"
                  >
                    Salvar
                  </button>

                  <button
                    onClick={() => removerVoo(index)}
                    className="flex-1 bg-red-500 text-white py-1 rounded"
                  >
                    Remover
                  </button>
                </div>
              </>
            ) : (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {voo.cia} - {voo.voo}
                  </span>

                  <div className="flex gap-2">
                    <button onClick={() => setEditandoVoo(index)}>
                      <Pencil className="w-4 h-4 text-blue-500" />
                    </button>

                    <button onClick={() => removerVoo(index)}>
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        




        </div>

{/* Informações Adicionais */}
<label className="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    checked={data.mostrarInfo}
    onChange={(e) =>
      setData(prev => ({
        ...prev,
        mostrarInfo: e.target.checked
      }))
    }
    className="w-4 h-4 accent-blue-600"
  />
  <span className="text-sm font-medium text-gray-700">
    Exibir Informações Adicionais
  </span>
</label>

{data.mostrarInfo && (
  <div className="mt-3 space-y-3 border border-gray-200 p-3 rounded-lg bg-gray-50">
    
    <input
      className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400"
      placeholder="Viajantes"
      value={data.viajantes}
      onChange={(e) =>
        setData(prev => ({
          ...prev,
          viajantes: e.target.value
        }))
      }
    />

    <input
      className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400"
      placeholder="Regime (Ex: Café da manhã incluso)"
      value={data.regime}
      onChange={(e) =>
        setData(prev => ({
          ...prev,
          regime: e.target.value
        }))
      }
    />

  </div>
)}
        
        {/* QUARTOS */}
        <div className="border-t pt-4 space-y-2">
          <h3 className="font-semibold text-gray-700">Quartos</h3>

          {(Object.keys(novoQuarto) as Array<keyof typeof novoQuarto>).map((campo) => (
            <input
              key={campo}
              className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400"
              placeholder={campo}
              value={novoQuarto[campo]}
              onChange={(e) =>
                setNovoQuarto({ ...novoQuarto, [campo]: e.target.value })
              }
            />
          ))}

          <button
            onClick={adicionarQuarto}
            className="bg-green-600 text-white w-full py-2 rounded-lg flex gap-2 justify-center items-center"
          >
            <Plus className="w-5 h-5 text-white" /> Adicionar Quarto
          </button>

          {data.quartos.map((quarto, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg space-y-2">

              {editandoQuarto === index ? (
                <>
                  {(Object.keys(quarto) as Array<keyof typeof quarto>).map((campo) => (
                    <input
                      key={campo}
                      autoFocus={campo === "nome"}
                      className="w-full bg-white border border-gray-300 p-2 rounded text-gray-600"
                      value={quarto[campo]}
                      placeholder={campo}
                      onChange={(e) =>
                        editarQuarto(index, campo, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          setEditandoQuarto(null)
                        }
                      }}
                    />
                  ))}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditandoQuarto(null)}
                      className="flex-1 bg-blue-600 text-white py-1 rounded"
                    >
                      Salvar
                    </button>

                    <button
                      onClick={() => removerQuarto(index)}
                      className="flex-1 bg-red-500 text-white py-1 rounded"
                    >
                      Remover
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {quarto.nome}
                  </span>

                  <div className="flex gap-2">
                    <button onClick={() => setEditandoQuarto(index)}>
                      <Pencil className="w-4 h-4 text-blue-500" />
                    </button>

                    <button onClick={() => removerQuarto(index)}>
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.mostrarResumo}
            onChange={(e) =>
              setData({ ...data, mostrarResumo: e.target.checked })
            }
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-sm font-medium text-gray-700">
            Exibir Resumo
          </span>
        </label>


      </div>

      {/* PREVIEW */}
      <div className="flex-1 overflow-auto bg-gray-200 p-10">
        <div  ref={previewRef} className="flex justify-center ">
          <HotelOrcamento data={data} />
        </div>
      </div>

    </div>
  )
}