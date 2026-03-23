import { BudgetsData } from "@/types/budgets";
import {Mail, Phone} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

function formatarMoeda(valor: number, moeda: "BRL" | "USD") {
  return new Intl.NumberFormat(
    moeda === "BRL" ? "pt-BR" : "en-US",
    {
      style: "currency",
      currency: moeda
    }
  ).format(valor)
}

function pluralize(count: number, singular: string, plural?: string) {
  return count === 1 ? singular : plural || singular + "s";
}

const HotelOrcamento = ({ data }: { data: BudgetsData }) => {

    const safeData: BudgetsData = data || {
    destino: "",
    hotel: "",
    periodo: "",
    moeda: "BRL",
    valorTotal: 0,
    beneficios: [],
    voos: [],
    imagens: [],
    mostrarInfo: false,
    mostrarResumo: false,
    viajantes: 0,
    quartos: [],
    descricaoHotel: "",
    regime: ""
  };

  return (
    <div >
      <div
        className="w-[794px] min-h-[1123px] mx-auto bg-[#000000] overflow-hidden relative"
        style={{background: "url('/assets/fundo.png')"}}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <img
            className="h-12 w-auto ml-6"
            src="/assets/logoMga.png"
            alt="Logo"
          />
          <div className="flex justify-between gap-4 min-w-0 w-[90%] bg-[#0b1b3b] rounded-bl-full px-10 pt-3 py-8">
            <div className="text-base font-semibold leading-tight pl-8">
               <h4>Confira o orçamento que preparamos <br /> especialmente para você!</h4>
            </div>

            <div className="leading-tight">
               <p className="text-sm font-light">wwww.mgatour.com.br</p>
               <hr className="my-1"/>
               <p className="text-end text-xs">Brasília - DF, Brasil</p>
            </div>
          </div>
        </div>
        

      {/* Número de Orçamento */}
      <div className="pl-6 py-2 bg-[#b6a36f] w-60 rounded-tr-2xl">
        <h2 className="text-xl text-white">Orçamento N° {safeData.numeroorc || "0000"}</h2>
      </div>
      
        <div className="">
          <div className="pl-6">
            <h2 className="text-xl font-medium text-[#122b4e]  tracking-wider uppercase">
              DATAS: {safeData.dataInicio || "xx/xx"} a {safeData.dataFim || "xx/xx"}
            </h2>

            <h2 className="text-xl font-medium text-[#122b4e]  tracking-wider uppercase">
              ACOMODAÇÃO EM APARTAMENTO
            </h2>            
          </div>


          <div className="flex flex-col items-end mt-[-85px]">
            <div>
              <h1 className="text-[65px] leading-none pr-4 text-[#b6a36f] uppercase font-extrabold">Hotéis</h1>
              <hr className="my-2 text-[#122b4e] border-2" />
              <div className="pl-6 py-2 mb-2 bg-[#b6a36f]  rounded-tr-2xl">
                <h2 className="text-xl text-white uppercase">{safeData.cidade || "Nome da Cidade"}</h2>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end">
              <div className=" flex gap-2 pl-3 px-6 py-1 bg-[#122b4e] rounded-bl-lg items-end">
                <h2 className="text-base text-white uppercase">{safeData.hotel || "Nome do Hotel"}</h2>
                <p> {safeData.estrelas?.length ? safeData.estrelas : "⭐⭐⭐⭐⭐"}</p>
              </div>  
          </div>

          {/* GALERIA */}
          <div className="mt-6">
            {/* BLOCO */}
            <div className="flex gap-8 pl-6 ">
              <img
              src="/assets/Bussola.svg"
              alt=""
              className="absolute right-[-150px] top-[480px] w-[350px] opacity-65 pointer-events-none z-0"
              />

              {/* IMAGEM */}
              <div className="border border-5 border-[#122b4e] w-60 h-50 rounded-b-2xl rounded-tr-2xl">
              <img src={safeData.imagens[0] || "data:image/jpeg;base64,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"}
              alt="" className="w-60 h-50 rounded-b-2xl rounded-tr-2xl relative top-[-20px] left-[15px]" />      
              </div>

              {/* TEXTO */}
              <div className="flex flex-col max-h-90 overflow-hidden">
                <h2 className="uppercase text-xl font-medium text-[#122b4e]">Conheça um pouco mais</h2>
                <ul className="text-[#122b4e] list-disc list-inside max-w-160  pr-4 text-justify">
                  <li>Apartamento perto de Praia de Copacabana</li>
                  <li>Perto de Forte de Copacabana e Avenida Atlântica, Rio Habitakkkkkkkkkkkkt jjjjjjjAlmirante oferece muitas opções de comodidades. Os hóspedes podem ficar on-line com o Wi-Fi grátis nos quartos.
                  </li>
                  {safeData.beneficios.map((beneficio, index) => (
                    <li key={index}>{beneficio}</li>
                  ))}
                </ul>                  
              </div>
            </div>

            {/* BLOCO 2*/}
            <div className="flex gap-30 pl-6 mt-8 ">

              {/* IMAGEM */}
              <div className="grid grid-cols-1 ">
                <div className="border border-5 border-[#b6a36f] w-102 h-60 rounded-b-2xl rounded-tr-2xl">
                  <img src={safeData.imagens[1] || ""}
                  alt="" className="w-102 h-60 rounded-b-2xl rounded-tr-2xl relative top-[-20px] left-[15px]" />      
                </div>                    
                <div className="flex gap-12 mt-10">
                  <div className="border border-5 border-[#122b4e] w-45 h-45 rounded-b-2xl rounded-tr-2xl">
                    <img src={safeData.imagens[2] || ""}
                    alt="" className="w-42 h-45 rounded-b-2xl rounded-tr-2xl relative top-[-20px] left-[15px]" />      
                  </div>

                  <div className="border border-5 border-[#122b4e] w-45 h-45 rounded-b-2xl rounded-tr-2xl">
                    <img src={safeData.imagens[3] || ""}
                    alt="" className="w-45 h-45 rounded-b-2xl rounded-tr-2xl relative top-[-20px] left-[15px]" />      
                  </div>
                </div>          
              </div>

              {/* TEXTO */}
              <div className="flex flex-col max-h-170 overflow-hidden">
                <h2 className="uppercase text-xl font-medium text-[#122b4e]">Informações Adicionais</h2>
                <ul className="text-[#122b4e] list-disc list-inside max-w-110 pr-4 text-justify">
                  <li>Carregador, áreas para não fumantes e elevador</li>
                  <li>Características do quarto</li>
                  <li>Todos os quartos em Rio Habitat Almirante oferecem extras como ar-condicionado, além de comodidades como Wi-Fi grátis.
                  </li>
                  {safeData.beneficios.map((beneficio, index) => (
                    <li key={index}>{beneficio}</li>
                  ))}
                </ul>                  
              </div>
            </div>
          </div>
        </div>


        {/* Footer */}
        <div className="mt-5">
          <div className="flex justify-center gap-4">
            <span className="flex gap-2 text-[#122b4e] items-center">
              <Mail className="text-[#b6a36f] w-5 h-5" />
              <p>bsb@mgatour.com.br</p>
            </span>

            <span className="flex gap-2 text-[#122b4e] items-center">
              <Phone className="text-[#b6a36f] w-5 h-5" />
              <p>(61) 3263-2401</p>
            </span>

            <span className="flex gap-2 text-[#122b4e] items-center">
              <FaWhatsapp className="text-[#b6a36f] w-5 h-5" />
              <p>(61) 9 8150-6550</p>
            </span>

            <span className="flex gap-2 text-[#122b4e] items-center">
              <FaInstagram className="text-[#b6a36f] w-5 h-5" />
              <p>@mgatourbrazil</p>
            </span>
          </div>
          <div className="bg-[#122b4e] h-16 mt-2 text-sm text-gray-500 text-center">  
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default HotelOrcamento;