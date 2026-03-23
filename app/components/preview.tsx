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

function formatarData(data: string) {
  if (!data) return "xx/xx";

  const d = new Date(data);

  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");

  return `${dia}/${mes}`;
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
      <div className="pl-6 py-1 bg-[#b6a36f] w-60 rounded-tr-2xl">
        <h2 className="text-xl text-white">Orçamento N° {safeData.numeroorc || "0000"}</h2>
      </div>
      
        <div className="">
          <div className="pl-6">
            <h2 className="text-base font-medium text-[#122b4e]  tracking-wider uppercase">
              DATAS: {formatarData(safeData.dataInicio)} a {formatarData(safeData.dataFim) || "xx/xx"}  
            </h2>

            <h2 className="text-base font-medium text-[#122b4e]  tracking-wider uppercase">
              ACOMODAÇÃO EM APARTAMENTO
            </h2>            
          </div>


          <div className="flex flex-col items-end mt-[-85px]">
            <div className="max-w-110">
              <h1 className="text-[65px] leading-none pr-4 text-[#b6a36f] uppercase font-bold">Hotéis</h1>
              <hr className="my-2 text-[#122b4e] border-2" />
              <div className="pl-6 py-1 mb-2 bg-[#b6a36f]  rounded-tr-2xl">
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
              {/* DETAKLHE BUSSÓLA */}
              <img
              src="/assets/Bussola.svg"
              alt=""
              className="absolute right-[-120px] top-[380px] w-[250px] opacity-55 pointer-events-none z-0"
              />

              {/* IMAGEM */}
              <div className="border border-5 border-[#122b4e] w-60 h-50 rounded-b-2xl rounded-tr-2xl">
              <img src={safeData.imagens[0] || "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_1280.jpg"}
              alt="" className="w-full h-full object-cover rounded-b-2xl rounded-tr-2xl relative top-[-15px] left-[15px]" />      
              </div>

              {/* TEXTO */}
              <div className="flex flex-col max-h-56 overflow-hidden">
                <h2 className="uppercase text-xl font-medium text-[#122b4e]">Conheça um pouco mais</h2>
                <ul className="text-[#122b4e] list-disc list-inside max-w-160  pr-4 text-justify">
                  <li>Apartamento perto de Praia de Copacabana</li>
                  <li>Características do quarto</li>
                     

                  {safeData.beneficios.map((beneficio, index) => (
                    <li key={index}>{beneficio}</li>
                  ))}
                </ul>                  
              </div>
            </div>

            {/* BLOCO 2*/}
            <div className="flex gap-10 pl-6 mt-8 ">

              {/* IMAGEM */}
              <div className="grid grid-cols-1 ">
                <div className="border border-5 border-[#b6a36f] w-102 h-60 rounded-b-2xl rounded-tr-2xl">
                  <img src={safeData.imagens[1] || "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_1280.jpg"}
                  alt="" className="w-full h-full object-cover rounded-b-2xl rounded-tr-2xl relative top-[-15px] left-[15px]" />      
                </div>                    
                <div className="flex gap-12 mt-10">
                  <div className="border border-5 border-[#122b4e] w-65 h-45 rounded-b-2xl rounded-tr-2xl">
                    <img src={safeData.imagens[2] || "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_1280.jpg"}
                    alt="" className="w-full h-full object-cover rounded-b-2xl rounded-tr-2xl relative top-[-15px] left-[15px]" />      
                  </div>

                  <div className="border border-5 border-[#122b4e] w-65 h-45 rounded-b-2xl rounded-tr-2xl">
                    <img src={safeData.imagens[3] || "https://cdn.pixabay.com/photo/2016/11/21/06/53/beautiful-natural-image-1844362_1280.jpg"}
                    alt="" className="w-full h-full object-cover rounded-b-2xl rounded-tr-2xl relative top-[-15px] left-[15px]" />      
                  </div>
                </div>          
              </div>

              {/* TEXTO */}
              <div className="flex flex-col max-h-114 overflow-hidden">
                <h2 className="uppercase text-xl font-medium text-[#122b4e]">Informações Adicionais</h2>
                <ul className="text-[#122b4e] list-disc list-inside max-w-110 pr-4 text-justify">
                  <li>Carregador, áreas para não fumantes e elevador</li>
                  <li>Características do quarto</li>
                  <li>Todos os quartos em Rio Habitat Alm,</li>

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