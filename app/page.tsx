"use client"

import { useState, useRef, useEffect  } from "react"
import Hoteis from "./components/previewhotel"
import Aereo from "./components/previewaereo"
import { BudgetsData } from "@/types/budgets"
import { Plus,Star, X, Trash, FileText, Pencil, ChevronDown, TicketsPlane, Hotel, Plane, BedDouble, ArrowUpToLine} from "lucide-react"
import { useReactToPrint } from "react-to-print"
import { Credits } from "./components/credits"
import { ConfirmModal } from "./components/modal"
import { InfoModal } from "./components/infomodal"



export default function Page() {
  const [mounted, setMounted] = useState(false)

  const [data, setData] = useState<BudgetsData>({
    numeroorc: "",
    dataInicio: "",
    dataFim: "",
    estrelas: 1,
    destino: "",
    periodo: "",
    hotel: "",
    beneficios: [],    
    infoadc: [],
    descricaodata: "",
    valorTotal: "",
    moeda: "BRL",
    valordesc: "pacote",
    descricaoHotel: "",
    descricaoInfo: "",
    descricaoExtra: "",
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

  const [modalAberto, setModalAberto] = useState(false);
  const [vooModalAberto, setVooModalAberto] = useState(false);
  const [beneficioInput, setBeneficioInput] = useState("")
  const [infoAdcInput, setInfoAdcInput] = useState("")
  const [dadosBasicosAberto, setDadosBasicosAberto] = useState(true);
  const [imagemInput, setImagemInput] = useState("")
  const [editandoBeneficio, setEditandoBeneficio] = useState<number | null>(null)
  const [editandoInfoAdc, setEditandoInfoAdc] = useState<number | null>(null)
  const [infoModal, setInfoModal] = useState({ mostrar: false, mensagem: "" });
  const [quartoModalAberto, setQuartoModalAberto] = useState(false)
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
    data: "",
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

    function adicionarInfoAdc() {
    if (!infoAdcInput.trim()) return
    setData(prev => ({
      ...prev,
      infoadc: [...prev.infoadc, infoAdcInput]
    }))
    setInfoAdcInput("")
  }

  function removerBeneficio(index: number) {
    setData(prev => ({
      ...prev,
      beneficios: prev.beneficios.filter((_, i) => i !== index)
    }))
  }

  function removerInfoAdc(index: number) {
    setData(prev => ({
      ...prev,
      infoadc: prev.infoadc.filter((_, i) => i !== index)
    }))
  }

function adicionarImagem() {
  if (!imagemInput.trim()) return;

  if (data.imagens.length >= 7) {
    setInfoModal({ mostrar: true, mensagem: "Máximo de 7 imagens permitidas." });
    return;
  }

  setData((prev) => ({
    ...prev,
    imagens: [...prev.imagens, imagemInput],
  }));
  setImagemInput("");
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
      data: "",
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

 function abrirModal() {
    setModalAberto(true);
  }

  function confirmarLimpeza() {
    setData({
      numeroorc: "",
      dataInicio: "",
      dataFim: "",
      estrelas: 1,
      destino: "",
      periodo: "",
      hotel: "",
      beneficios: [],
      infoadc: [],
      descricaodata: "",
      valorTotal: "",
      moeda: "BRL",
      valordesc: "pacote",
      descricaoHotel: "",
      descricaoInfo: "",
      descricaoExtra: "",
      imagens: [],
      voos: [],
      quartos: [],
      mostrarResumo: true,
      mostrarInfo: true,
      viajantes: "",
      regime: "",
    });
    setModalAberto(false);
  }

  function cancelarLimpeza() {
    setModalAberto(false);
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

function subirImagemLocal(e: React.ChangeEvent<HTMLInputElement>) {
  const files = e.target.files
  if (!files) return

  const novasImagens = Array.from(files).map(file =>
    URL.createObjectURL(file)
  )

  const total = data.imagens.length + novasImagens.length

  if (total > 7) {
    setInfoModal({ mostrar: true, mensagem: "Máximo de 7 imagens permitidas." })
    return
  }

  setData(prev => ({
    ...prev,
    imagens: [...prev.imagens, ...novasImagens]
  }))
}

  if (!mounted) return null

  return (
    <div className="h-screen flex overflow-hidden">
      <Credits  />

      <InfoModal
  mensagem={infoModal.mensagem}
  mostrar={infoModal.mostrar}
  onClose={() => setInfoModal({ ...infoModal, mostrar: false })}
/>

      {/* EDITOR */}
      <div className="w-[380px] bg-[#ffffff] border-r border-gray-200 p-6 overflow-y-auto shadow-sm space-y-6 print:hidden ">

      <div className="flex justify-between items-center">
        <div className="flex gap-2 text-gray-800">
         <TicketsPlane/>
        <h2 className="text-xl font-semibold text-gray-800">
          Budgetly Tour
        </h2>       
        </div>


      <div className="flex gap-2">
        <button
          onClick={handlePrint}
          className="bg-orange-500 text-white p-2 rounded-full"
        >
          <FileText className="w-5 h-5"/>
        </button> 
        <ConfirmModal
        mensagem="Tem certeza que deseja limpar o orçamento?"
        mostrar={modalAberto}
        onConfirm={confirmarLimpeza}
        onCancel={cancelarLimpeza}
      /> 

        <button
          onClick={abrirModal}
          className="bg-red-600 text-white p-2 rounded-full"
        >
          <Trash className="w-5 h-5"/>
        </button>          
      </div>

      </div>
 

      {/* HOTÉIS - SEÇÃO EXPANSÍVEL */}
      <div className="space-y-2">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setDadosBasicosAberto(prev => !prev)}
        >
          <span className="flex gap-2 justify-center items-center text-gray-700">
            <Hotel className="w-5 h-5" />
            <h3 className="font-semibold text-gray-700">HOTÉIS</h3></span>
          
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
            dadosBasicosAberto ? "max-h-350 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {/* NÚMERO DO ORÇAMENTO */}
          <div className="mt-2 space-y-3">
            <input
              className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="Núm do Orçamento"
              type="text"
              inputMode="numeric"
              maxLength={4}
              pattern="\d{4}"
              value={data.numeroorc}
              onChange={(e) => {
                const valor = e.target.value.replace(/\D/g, ""); 
                setData({ ...data, numeroorc: valor.slice(0, 4) });
  }}
            />

            {/* DATAS*/}
            <div className="flex gap-1 justify-between ">
            <input
                type="date"
                className="w-36 border border-gray-300 p-2 rounded-lg text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                value={data.dataInicio || ""}
                onChange={(e) =>
                  setData({ ...data, dataInicio: e.target.value })
                }
              />

              <input
                type="date"
                className="w-36 border border-gray-300 p-2 rounded-lg text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                value={data.dataFim || ""}
                onChange={(e) =>
                  setData({ ...data, dataFim: e.target.value })
                }
              />
            </div>

            {/* NOME DA CIDADE */}
            <input
              className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="Cidade"
              value={data.cidade}
              onChange={(e) => setData({ ...data, cidade: e.target.value })}
            />

            {/* NOME DO HOTEL */}
            <input
              className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="Hotel"
              value={data.hotel}
              onChange={(e) => setData({ ...data, hotel: e.target.value })}
            />
            {/* QUANTIDADE DE ESTRELAS */}
              <input
                type="number"
                min={1}
                max={5}
                placeholder="Quantidade de Estrelas (1 a 5)"
                className="w-full border border-gray-300 p-2 rounded-lg text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                value={data.estrelas || ""}
                onChange={(e) => {
                  let valor = Number(e.target.value);

                  if (isNaN(valor)) valor = 1;
                  if (valor > 5) valor = 5;
                  if (valor < 1) valor = 1;

                  setData({ ...data, estrelas: valor });
                }}
              />

            {/* CONHEÇA UM POUCO MAIS */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Conheça mais</h3>
              <div className="flex gap-2">
                <input
                  placeholder="digite os benefícios"
                  className="flex-1 border border-gray-300 p-2 rounded-lg text-gray-400 transition-all duration-200  focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
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
                      className="flex-1 bg-white border border-gray-300 p-1 rounded text-gray-600 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
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


            {/* INFORMAÇÕES ADICIONAIS */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Informações Adicionais</h3>
              <div className="flex gap-2">
                <input
                placeholder="Digite as informações"
                  className="flex-1 border border-gray-300 p-2 rounded-lg text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  value={infoAdcInput}
                  onChange={(e) => setInfoAdcInput(e.target.value)}
                />
                <button
                  onClick={adicionarInfoAdc}
                  className="bg-green-600 text-white px-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>

              {data.infoadc.map((infoadc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded-lg gap-2 transition-all duration-200 hover:bg-gray-200"
                >
                  {editandoInfoAdc === index ? (
                    <input
                      autoFocus
                      className="flex-1 bg-white border border-gray-300 p-1 rounded text-gray-600 transition-all duration-200  focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                      value={infoadc}
                      onChange={(e) =>
                        setData(prev => ({
                          ...prev,
                          infoadc: prev.infoadc.map((b, i) =>
                            i === index ? e.target.value : b
                          )
                        }))
                      }
                      onBlur={() => setEditandoInfoAdc(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          e.currentTarget.blur() 
                        }
                      }}
                    />
                  ) : (
                    <span className="flex-1 text-gray-600">{infoadc}</span>
                  )}

                  <div className="flex gap-2">
                    <button onClick={() => setEditandoInfoAdc(index)}>
                      <Pencil className="w-4 h-4 text-blue-500" />
                    </button>
                    <button onClick={() => removerInfoAdc(index)}>
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
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
                  className="bg-green-600 text-white px-2.5 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>

              <div className="flex gap-2">
                <label className="bg-blue-600 text-white px-2.5 rounded-lg cursor-pointer hover:bg-blue-700 flex items-center">
                  <ArrowUpToLine className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={subirImagemLocal}
                    className="hidden"
                  />
                </label>
            </div>        
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



            {/* VALOR */}
            <div>
              <h3 className="font-semibold text-gray-700">Valor</h3>
              <div className="flex gap-2">
                <select
                  className="border border-gray-300 p-2 rounded-lg text-gray-500 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 accent-[#0B1B3B]"
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

            <div>
              <h3 className="font-semibold text-gray-700">Descrição do pacote</h3>
              <div className="flex gap-2">
                <select
                  className="border border-gray-300 p-2 rounded-lg text-gray-500 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 accent-[#0B1B3B]"
                  value={data.valordesc}
                  onChange={(e) =>
                    setData({ ...data, valordesc: e.target.value as "pacote" | "pacote por pessoa" })
                  }
                >
                  <option value="pacote">Pacote</option>
                  <option value="pacote por pessoa">Pacote por pessoa</option>
                </select>
              </div>          
            </div>
          </div>
        </div>
      </div>

      {/* AÉREO - SEÇÃO EXPANSÍVEL */}
      <div className="space-y-2">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setDadosBasicosAberto(prev => !prev)}
        >
          <span className="flex gap-2 justify-center items-center text-gray-700">
            <Plane className="w-5 h-5" />
            <h3 className="font-semibold text-gray-700">AÉREO</h3></span>
          
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
            dadosBasicosAberto ? "max-h-350 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-2 space-y-3">
            {/* CIDADE - UF, DIA - MÊS - ANO */}
            <input
              className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="Cidade"
              value={data.descricaodata}
              onChange={(e) => setData({ ...data, descricaodata: e.target.value })}
            />



            {/* CONHEÇA UM POUCO MAIS */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Conheça mais</h3>
              <div className="flex gap-2">
                <input
                  placeholder="digite os benefícios"
                  className="flex-1 border border-gray-300 p-2 rounded-lg text-gray-400 transition-all duration-200  focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
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
                      className="flex-1 bg-white border border-gray-300 p-1 rounded text-gray-600 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
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


            {/* INFORMAÇÕES ADICIONAIS */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Informações Adicionais</h3>
              <div className="flex gap-2">
                <input
                placeholder="Digite as informações"
                  className="flex-1 border border-gray-300 p-2 rounded-lg text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  value={infoAdcInput}
                  onChange={(e) => setInfoAdcInput(e.target.value)}
                />
                <button
                  onClick={adicionarInfoAdc}
                  className="bg-green-600 text-white px-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>

              {data.infoadc.map((infoadc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded-lg gap-2 transition-all duration-200 hover:bg-gray-200"
                >
                  {editandoInfoAdc === index ? (
                    <input
                      autoFocus
                      className="flex-1 bg-white border border-gray-300 p-1 rounded text-gray-600 transition-all duration-200  focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                      value={infoadc}
                      onChange={(e) =>
                        setData(prev => ({
                          ...prev,
                          infoadc: prev.infoadc.map((b, i) =>
                            i === index ? e.target.value : b
                          )
                        }))
                      }
                      onBlur={() => setEditandoInfoAdc(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          e.currentTarget.blur() 
                        }
                      }}
                    />
                  ) : (
                    <span className="flex-1 text-gray-600">{infoadc}</span>
                  )}

                  <div className="flex gap-2">
                    <button onClick={() => setEditandoInfoAdc(index)}>
                      <Pencil className="w-4 h-4 text-blue-500" />
                    </button>
                    <button onClick={() => removerInfoAdc(index)}>
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
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
                  className="bg-green-600 text-white px-2.5 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>

              <div className="flex gap-2">
                <label className="bg-blue-600 text-white px-2.5 rounded-lg cursor-pointer hover:bg-blue-700 flex items-center">
                  <ArrowUpToLine className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={subirImagemLocal}
                    className="hidden"
                  />
                </label>
            </div>        
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



            {/* VALOR */}
            <div>
              <h3 className="font-semibold text-gray-700">Valor</h3>
              <div className="flex gap-2">
                <select
                  className="border border-gray-300 p-2 rounded-lg text-gray-500 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 accent-[#0B1B3B]"
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

            <div>
              <h3 className="font-semibold text-gray-700">Descrição do pacote</h3>
              <div className="flex gap-2">
                <select
                  className="border border-gray-300 p-2 rounded-lg text-gray-500 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 accent-[#0B1B3B]"
                  value={data.valordesc}
                  onChange={(e) =>
                    setData({ ...data, valordesc: e.target.value as "pacote" | "pacote por pessoa" })
                  }
                >
                  <option value="pacote">Pacote</option>
                  <option value="pacote por pessoa">Pacote por pessoa</option>
                </select>
              </div>          
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* PREVIEW */}
      <div className="flex-1 overflow-auto bg-gray-200 p-10"
       style={{zoom: 0.8}}>
        
        <div  ref={previewRef} className="flex flex-col justify-center ">
          <Hoteis data={data} />
          <Aereo data={data} />
        </div>
      </div>

    </div>
  )
}