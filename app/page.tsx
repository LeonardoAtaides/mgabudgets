"use client"

import { useState, useRef, useEffect  } from "react"
import HotelOrcamento from "./components/preview"
import { BudgetsData } from "@/types/budgets"
import { Plus, X, Trash, FileText, Pencil, ChevronDown, ChevronUp} from "lucide-react"
import { useReactToPrint } from "react-to-print"
import { Credits } from "./components/credits"


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

  const [vooModalAberto, setVooModalAberto] = useState(false);
  const [beneficioInput, setBeneficioInput] = useState("")
  const [dadosBasicosAberto, setDadosBasicosAberto] = useState(true);
  const [imagemInput, setImagemInput] = useState("")
  const [editandoBeneficio, setEditandoBeneficio] = useState<number | null>(null)
  const [quartoModalAberto, setQuartoModalAberto] = useState(false)
  const conteudoQuartoRef = useRef<HTMLDivElement>(null)
  const [editandoQuarto, setEditandoQuarto] = useState<number | null>(null)
  const [editandoVoo, setEditandoVoo] = useState<number | null>(null)
  const [editandoInfo, setEditandoInfo] = useState(false);
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

function editarInfo(campo: "viajantes" | "regime", valor: string) {
  setData(prev => ({
    ...prev,
    [campo]: valor
  }))
}


  if (!mounted) return null

  return (
    <div className="h-screen flex overflow-hidden">
      <Credits  />

      {/* EDITOR */}
      <div className="w-[380px] bg-[#ffffff] border-r border-gray-200 p-6 overflow-y-auto shadow-sm space-y-6 print:hidden">

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Editor de Orçamento
        </h2>


        <button
          onClick={handlePrint}
          className="bg-green-500 text-white p-2 rounded-full"
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
 

      {/* DADOS BÁSICOS - SEÇÃO EXPANSÍVEL */}
      <div className="space-y-2">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setDadosBasicosAberto(prev => !prev)}
        >
          <h3 className="font-semibold text-gray-700">Dados Básicos</h3>
          <span
            className={`text-gray-500 transition-transform duration-300 ${
              dadosBasicosAberto ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDown />
          </span>
        </div>

        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            dadosBasicosAberto ? "max-h-200 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-2 space-y-3">
            <input
              className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="Destino"
              value={data.destino}
              onChange={(e) => setData({ ...data, destino: e.target.value })}
            />
            <input
              className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="Hotel"
              value={data.hotel}
              onChange={(e) => setData({ ...data, hotel: e.target.value })}
            />
            <input
              className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="Período"
              value={data.periodo}
              onChange={(e) => setData({ ...data, periodo: e.target.value })}
            />

            {/* IMAGENS */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Imagens</h3>
              <div className="flex gap-2">
                <input
                  className="flex-1 border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  placeholder="https://..."
                  value={imagemInput}
                  onChange={(e) => setImagemInput(e.target.value)}
                />
                <button
                  onClick={adicionarImagem}
                  className="bg-green-600 text-white px-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
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

            {/* DESCRIÇÃO */}
            <textarea
              className="w-full border p-2 border-gray-300 mb-0 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-blue-500 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
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
                  className="flex-1 border border-gray-300 p-2 rounded-lg text-gray-400 transition-all duration-200 focus:border-blue-500 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  value={beneficioInput}
                  onChange={(e) => setBeneficioInput(e.target.value)}
                />
                <button
                  onClick={adicionarBeneficio}
                  className="bg-green-600 text-white px-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>

              {data.beneficios.map((beneficio, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded-lg gap-2 transition-all duration-200 hover:bg-gray-200"
                >
                  {editandoBeneficio === index ? (
                    <input
                      autoFocus
                      className="flex-1 bg-white border border-gray-300 p-1 rounded text-gray-600 transition-all duration-200 focus:border-blue-500 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
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

            {/* VALOR */}
            <div>
              <h3 className="font-semibold text-gray-700">Valor</h3>
              <div className="flex gap-2">
                <select
                  className="border border-gray-300 p-2 rounded-lg text-gray-500 transition-all duration-200 focus:border-gr ay-400 focus:ring-1 focus:ring-gray-400"
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
                  className="w-full border border-gray-300 p-2 rounded-lg text-gray-400 transition-all duration-200 focus:border-gr ay-400 focus:ring-1 focus:ring-gray-400"
                  value={data.valorTotal}
                  onChange={(e) =>
                    setData({ ...data, valorTotal:(e.target.value) })
                  }
                />
              </div>          
            </div>
          </div>
        </div>
      </div>


      {/* VOOS - SEÇÃO EXPANSÍVEL */}
      <div className="border-t pt-4 space-y-2">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setVooModalAberto(prev => !prev)}
        >
          <h3 className="font-semibold text-gray-700">Voos</h3>
          <span
            className={`text-gray-500 transition-transform duration-300 ${
              vooModalAberto ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDown />
          </span>
        </div>

        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            vooModalAberto ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-2 space-y-2">
            {(Object.keys(novoVoo) as Array<keyof typeof novoVoo>).map((campo) => (
              <input
                key={campo}
                className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                placeholder={campo}
                value={novoVoo[campo]}
                onChange={(e) => setNovoVoo({ ...novoVoo, [campo]: e.target.value })}
              />
            ))}

            <button
              onClick={adicionarVoo}
              className="bg-green-600 text-white w-full py-2 rounded-lg flex gap-2 justify-center items-center hover:bg-green-700 transition-colors duration-200"
            >
              <Plus className="w-5 h-5 text-white" /> Adicionar Voo
            </button>

            {data.voos.map((voo, index) => (
              <div
                key={index}
                className="bg-gray-100 p-3 rounded-lg space-y-2 transition-all duration-200 hover:bg-gray-200"
              >
                {editandoVoo === index ? (
                  <>
                    {(Object.keys(voo) as Array<keyof typeof voo>).map((campo) => (
                      <input
                        key={campo}
                        autoFocus={campo === "cia"}
                        className="w-full bg-white border border-gray-300 p-2 rounded text-gray-600 transition-all duration-200  focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                        value={voo[campo]}
                        placeholder={campo}
                        onChange={(e) => editarVoo(index, campo, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            setEditandoVoo(null);
                          }
                        }}
                      />
                    ))}

                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditandoVoo(null)}
                        className="flex-1 bg-green-500 text-white py-1 rounded hover:bg-green-700 transition-colors duration-200"
                      >
                        Salvar
                      </button>

                      <button
                        onClick={() => removerVoo(index)}
                        className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition-colors duration-200"
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
        </div>
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
          <div className="bg-gray-100 p-3 rounded-lg space-y-2">

            {editandoInfo ? (
              <>
                {(["viajantes", "regime"] as const).map((campo) => (
                  <input
                    key={campo}
                    autoFocus={campo === "viajantes"}
                    className="w-full bg-white border border-gray-300 p-2 rounded text-gray-600"
                    value={data[campo]}
                    placeholder={`Informe ${campo}`}
                    onChange={(e) => editarInfo(campo, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        setEditandoInfo(false)
                      }
                    }}
                  />
                ))}

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditandoInfo(false)}
                    className="flex-1 bg-green-500 text-white py-1 rounded"
                  >
                    Salvar
                  </button>

                  <button
                    onClick={() => {
                      setData(prev => ({
                        ...prev,
                        viajantes: "",
                        regime: ""
                      }))
                      setEditandoInfo(false)
                    }}
                    className="flex-1 bg-red-500 text-white py-1 rounded"
                  >
                    Remover
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {data.viajantes || data.regime ? (
                    <>
                      <div>Viajantes: {data.viajantes || "-"}</div>
                      <div>Regime: {data.regime || "-"}</div>
                    </>
                  ) : (
                    "Sem informações"
                  )}
                </span>

                <div className="flex gap-2">
                  <button onClick={() => setEditandoInfo(true)}>
                    <Pencil className="w-4 h-4 text-blue-500" />
                  </button>

                  <button
                    onClick={() =>
                      setData(prev => ({
                        ...prev,
                        viajantes: "",
                        regime: ""
                      }))
                    }
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* QUARTOS - SEÇÃO EXPANSÍVEL */}
        <div className="border-t pt-4 space-y-2">
          {/* Título clicável */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setQuartoModalAberto(prev => !prev)}
          >
            <h3 className="font-semibold text-gray-700">Quartos</h3>
            <span
              className={`text-gray-500 transition-transform duration-300 ${
                quartoModalAberto ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronDown />
            </span>
          </div>

          {/* Conteúdo expansível */}
          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
              quartoModalAberto ? "max-h-350 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-2 space-y-2">
              {/* Inputs para novo quarto */}
              {(Object.keys(novoQuarto) as Array<keyof typeof novoQuarto>).map((campo) => (
                <input
                  key={campo}
                  className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  placeholder={campo}
                  value={novoQuarto[campo]}
                  onChange={(e) =>
                    setNovoQuarto({ ...novoQuarto, [campo]: e.target.value })
                  }
                />
              ))}

              <button
                onClick={adicionarQuarto}
                className="bg-green-600 text-white w-full py-2 rounded-lg flex gap-2 justify-center items-center hover:bg-green-700 transition-colors duration-200"
              >
                <Plus className="w-5 h-5 text-white" /> Adicionar Quarto
              </button>

              {/* Lista de quartos existentes */}
              {data.quartos.map((quarto, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-3 rounded-lg space-y-2 transition-all duration-200 hover:bg-gray-200"
                >
                  {editandoQuarto === index ? (
                    <>
                      {(Object.keys(quarto) as Array<keyof typeof quarto>).map((campo) => (
                        <input
                          key={campo}
                          autoFocus={campo === "nome"}
                          className="w-full bg-white border border-gray-300 p-2 rounded text-gray-600 transition-all duration-200 focus:border-blue-500 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
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
                          className="flex-1 bg-green-500 text-white py-1 rounded hover:bg-green-700 transition-colors duration-200"
                        >
                          Salvar
                        </button>

                        <button
                          onClick={() => removerQuarto(index)}
                          className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition-colors duration-200"
                        >
                          Remover
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{quarto.nome}</span>

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
          </div>
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