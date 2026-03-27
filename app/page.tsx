"use client"

import { useState, useRef, useEffect  } from "react"
import Hoteis from "./components/previewhotel"
import Aereo from "./components/previewaereo"
import { BudgetsData } from "@/types/budgets"
import { Plus,PlaneTakeoff, X, Trash, FileText, Pencil, ChevronDown, TicketsPlane, Hotel, Plane, BedDouble, ArrowUpToLine, BadgeInfo} from "lucide-react"
import { useReactToPrint } from "react-to-print"
import { Credits } from "./components/credits"
import { ConfirmModal } from "./components/modal"
import { InfoModal } from "./components/infomodal"
import Info from "./components/previewinfo"

export default function Page() {
  const [mounted, setMounted] = useState(false)

  const [data, setData] = useState<BudgetsData>({
    numeroorc: "",
    dataInicio: "",
    dataFim: "",
    estrelas: 1,
    hotel: "",
    beneficios: [],    
    infoadc: [],
    descricaodata: "",
    valorAereo: 0,
    dataAereoIni: "",
    dataAereoFim: "",
    pacote: "Valor total por pessoa",
    imagens: [],
    voos: [],
    mostrarOu: true,
    mostrarInfo: true,
    mostrarformapag: true,
    aeroportoSaida: "",
    aeroportoChegada: "",
    cidadeSaida: "",
    cidadeChegada: "",
    infoadd: [],
    validadeorc: "",
    cidade:"",
    parcelas: 0,
    ouIndex: 0,
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
  const [infoAddInput, setInfoAddInput] = useState("")
  const [dadosBasicosAberto, setDadosBasicosAberto] = useState(true);
  const [aereoAberto, setAereoAberto] = useState(true);
  const [infoAberto, setInfoAberto] = useState(true);
  const [imagemInput, setImagemInput] = useState("")
  const [editandoBeneficio, setEditandoBeneficio] = useState<number | null>(null)
  const [editandoInfoAdc, setEditandoInfoAdc] = useState<number | null>(null)
  const [editandoInfoAdd, setEditandoInfoAdd] = useState<number | null>(null)
  const [infoModal, setInfoModal] = useState({ mostrar: false, mensagem: "" });
  const [editandoVoo, setEditandoVoo] = useState<number | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: "Orcamento-Hotel",
  })
  const [novoVoo, setNovoVoo] = useState({
    cia: "",
    numvoo: 0,
    saida: "",
    chegada: "",
    origem: "",
    destino: "",
    durcon: "",
    esc: "",
    equipe: "",
    duracao: ""
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

      function adicionarInfoAdd() {
    if (!infoAddInput.trim()) return
    setData(prev => ({
      ...prev,
      infoadd: [...prev.infoadd, infoAddInput]
    }))
    setInfoAddInput("")
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

    function removerInfoAdd(index: number) {
    setData(prev => ({
      ...prev,
      infoadd: prev.infoadd.filter((_, i) => i !== index)
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
    if (!novoVoo.cia || !novoVoo.numvoo) return

    setData(prev => ({
      ...prev,
      voos: [...prev.voos, novoVoo]
    }))

    setNovoVoo({
      cia: "",
      numvoo: 0,
      saida: "",
      chegada: "",
      origem: "",
      destino: "",
      durcon: "",
      esc: "",
      equipe: "",
      duracao: ""
    })
  }

  function removerVoo(index: number) {
    setData(prev => ({
      ...prev,
      voos: prev.voos.filter((_, i) => i !== index)
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
      hotel: "",
      beneficios: [],
      infoadc: [],
      descricaodata: "",
      valorAereo: 0,
      dataAereoIni: "",
      dataAereoFim: "",
      imagens: [],
      voos: [],
      pacote: "Valor total por pessoa",
      mostrarOu: true,
      mostrarInfo: true,
      mostrarformapag: true,
      aeroportoSaida: "",
      aeroportoChegada: "",
      cidadeSaida: "",
      cidadeChegada: "",
      infoadd: [],
      validadeorc: "",
      cidade:"",
      parcelas: 0,
      ouIndex: 0,
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
      <div className="w-[380px] bg-[#ffffff] border-r border-gray-200 p-6 overflow-y-auto shadow-sm space-y-6 print:hidden  ">

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
          </div>
        </div>
      </div>

      {/* AÉREO - SEÇÃO EXPANSÍVEL */}
      <div className="space-y-2 ">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setAereoAberto(prev => !prev)}
        >
          <span className="flex gap-2 justify-center items-center text-gray-700">
            <Plane className="w-5 h-5" />
            <h3 className="font-semibold text-gray-700">AÉREO</h3></span>
          
          <span
            className={`text-gray-500 transition-transform duration-300 ${
              aereoAberto ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDown />
          </span>
        </div>

        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            aereoAberto ? "max-h-350 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="">
            <h3 className="font-semibold text-gray-700">Cidade - UF</h3>
            {/* CIDADE - UF, DIA - MÊS - ANO */}
            <input
              className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              placeholder="Cidade - UF XX de Mês de XXXX"
              value={data.descricaodata}
              onChange={(e) => setData({ ...data, descricaodata: e.target.value })}
            />
          </div>

          {/* VOOS - SEÇÃO EXPANSÍVEL */}
          <div className="pt-4 space-y-2">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setVooModalAberto(prev => !prev)}
            > 
              <span className="flex gap-2 justify-center items-center text-gray-700">
                <PlaneTakeoff className="w-5 h-5" />
                <h3 className="font-semibold text-gray-700">Voos</h3> 
              </span>
              
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
                          {voo.cia} 
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

            {/* DESCRIÇÃO DO VOO */}
            <h3 className="font-semibold text-gray-700">Descrição do Voo</h3>

            <h6 className="font-semibold text-gray-700 text-sm mb-1">Dados de Ida</h6>
            <input
            type="date"
            className="w-full border border-gray-300 p-2 rounded-lg text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            value={data.dataAereoIni || ""}
            onChange={(e) =>
            setData({ ...data, dataAereoIni: e.target.value })
            }
            /> 

            <input
            className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            placeholder="Nome da Cidade"
            value={data.cidadeSaida}
            onChange={(e) => setData({ ...data, cidadeSaida: e.target.value })}
            />

            <input
            className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            placeholder="Aeroporto de Saída"
            value={data.aeroportoSaida}
            onChange={(e) => setData({ ...data, aeroportoSaida: e.target.value })}
            />

            <h6 className="font-semibold text-gray-700 text-sm mb-1">Dados de Volta</h6>
            <input
            type="date"
            className="w-full border border-gray-300 p-2 rounded-lg text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            value={data.dataAereoFim || ""}
            onChange={(e) =>
              setData({ ...data, dataAereoFim: e.target.value })
            }
            />

            <input
            className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            placeholder="Aeroporto de chegada"
            value={data.aeroportoChegada}
            onChange={(e) => setData({ ...data, aeroportoChegada: e.target.value })}
            />


            <input
            className="w-full border border-gray-300 p-2 rounded-lg placeholder:text-gray-400 text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            placeholder="Cidade"
            value={data.cidadeChegada}
            onChange={(e) => setData({ ...data, cidadeChegada: e.target.value })}
            />

            {/* VALOR */}
            <div>
              <h3 className="font-semibold text-gray-700">Valores</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="w-full border border-gray-300 p-2 rounded-lg text-gray-400 transition-all duration-200 focus:border-gr ay-400 focus:ring-1 focus:ring-gray-400"
                  value={data.valorAereo || ""}
                  onChange={(e) =>
                    setData({ ...data, valorAereo: Number(e.target.value) })
                  }
                />
              </div>          
            </div>

            <div>
              <div className="flex gap-2"> 
                {/* TIPO */}
                <select
                  className="border w-full border-gray-300 p-2 rounded-lg text-gray-500 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  value={data.pacote}
                  onChange={(e) =>
                    setData({
                      ...data,
                      pacote: e.target.value as "Valor total por pessoa" | "Valor total do pacote",
                    })
                  }
                >
                  <option value="Valor total do pacote">Pacote</option>
                  <option value="Valor total por pessoa">Pacote por pessoa</option>
                </select>

                {/* PARCELAS */}
                <select
                  className="border border-gray-300 p-2 rounded-lg text-gray-500 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  value={data.parcelas || 1}
                  onChange={(e) =>
                    setData({
                      ...data,
                      parcelas: Number(e.target.value),
                    })
                  }
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}x
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INFORMAÇÕES - SEÇÃO EXPANSÍVEL */}
      <div className="space-y-2 ">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setInfoAberto(prev => !prev)}
        >
          <span className="flex gap-2 justify-center items-center text-gray-700">
            <BadgeInfo className="w-5 h-5" />
            <h3 className="font-semibold text-gray-700">INFORMAÇÕES</h3></span>
          
          <span
            className={`text-gray-500 transition-transform duration-300 ${
              infoAberto ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDown />
          </span>
        </div>

        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            infoAberto ? "max-h-350 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
            {/* INFORMAÇÕES ADICIONAIS */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                placeholder="Digite as informações"
                  className="flex-1 border border-gray-300 p-2 rounded-lg text-gray-400 transition-all duration-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  value={infoAddInput}
                  onChange={(e) => setInfoAddInput(e.target.value)}
                />
                <button
                  onClick={adicionarInfoAdd}
                  className="bg-green-600 text-white px-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button> 
              </div>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.mostrarOu}
                  onChange={(e) => {
                    const checked = e.target.checked;

                    setData(prev => ({
                      ...prev,
                      mostrarOu: checked,
                      ouIndex: checked ? prev.infoadd.length - 1 : null
                    }));
                  }}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">
                  Condição Adversa
                </span>
              </label> 
              {data.infoadd.map((infoadd, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded-lg gap-2 transition-all duration-200 hover:bg-gray-200"
                >
                  {editandoInfoAdd === index ? (
                    <input
                      autoFocus
                      className="flex-1 bg-white border border-gray-300 p-1 rounded text-gray-600 transition-all duration-200  focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                      value={infoadd}
                      onChange={(e) =>
                        setData(prev => ({
                          ...prev,
                          infoadd: prev.infoadd.map((b, i) =>
                            i === index ? e.target.value : b
                          )
                        }))
                      }
                      onBlur={() => setEditandoInfoAdd(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          e.currentTarget.blur() 
                        }
                      }}
                    />
                  ) : (
                    <span className="flex-1 text-gray-600">{infoadd}</span>
                  )}

                  <div className="flex gap-2">
                    <button onClick={() => setEditandoInfoAdd(index)}>
                      <Pencil className="w-4 h-4 text-blue-500" />
                    </button>
                    <button onClick={() => removerInfoAdd(index)}>
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <h6 className="font-semibold text-gray-700 text-sm mb-1 mt-2">Válidade do Orçamento</h6>
            <input
              type="date"
              className="w-full border border-gray-300 p-2 rounded-lg text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              value={data.validadeorc || ""}
              onChange={(e) =>
                setData({ ...data, validadeorc: e.target.value })
              }
            />            
        </div>
      </div>  
    </div>

      {/* PREVIEWS */}
      <div className="flex-1 overflow-auto bg-gray-200 p-10"
       style={{zoom: 0.8}}>
        
        <div  ref={previewRef} className="flex flex-col justify-center ">
          <Hoteis data={data} />
          <Aereo data={data} />
          <Info data={data} />
        </div>
      </div>

    </div>
  )
}