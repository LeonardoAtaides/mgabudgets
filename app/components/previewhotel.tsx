import { BudgetsData } from "@/types/budgets2.0";
import {Mail, Phone} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Star } from "lucide-react";
import { HotelData } from "@/types/hotel";


function formatarData(data: string) {
  if (!data) return "xx/xx";

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}`;
}

const Hoteis = ({ data }: { data: BudgetsData }) => {
      const safe: BudgetsData = data || {
      numeroorc: "",
  };

  const listaHoteis = data?.hoteis?.length
    ? data.hoteis
    : [];

  return (
    <>
      {listaHoteis.map((hotelData: HotelData, i: number) => {

        const safeData = {
          dataInicio: hotelData.dataInicio || "",
          dataFim: hotelData.dataFim || "",
          hotel: hotelData.hotel || "",
          cidade: hotelData.cidade || "",
          estrelas: hotelData.estrelas || 1,
          imagens: hotelData.imagens || [],
          beneficios: hotelData.beneficios || [],
          infoadc: hotelData.infoadc || []
        };

        const imagens = (safeData.imagens && safeData.imagens.length > 0
          ? safeData.imagens
          : Array(4).fill(null)
        );


  return (
    <div key={i} >
      <div
        className="w-[794px] h-[1123px] mx-auto bg-[#000000] overflow-hidden relative"
        style= {{ backgroundImage: "url('/assets/fundo.webp')",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <img
            className="h-12 w-auto ml-6"
            src="/assets/logoMga.png"
            alt="Logo"
          />
          <div className="flex justify-between gap-4 min-w-0 w-[90%] bg-[#0b1b3b] rounded-bl-full px-10 pt-3 py-8 text-white">
            <div className="text-base font-semibold leading-tight pl-8 ">
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
        <h2 className="text-xl text-white">Orçamento N° {safe.numeroorc || "0000"}</h2>
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
              <div className=" flex  gap-2 pl-3 px-6 py-1 bg-[#122b4e] rounded-bl-lg items-center">
                <h2 className="text-base text-white uppercase max-w-[380px] truncate">{safeData.hotel || "Nome do Hotel"}</h2>
                <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={16}
                    className={
                      n <= (safeData.estrelas || 5)
                        ? "fill-white text-white"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              </div>  
          </div>

          {/* GALERIA */}
          <div className="mt-6">
            {/* BLOCO */}
            <div className="flex gap-8 pl-6 ">
              {/* DETALHE BUSSÓLA */}
              <img
              src="/assets/Bussola.svg"
              alt=""
              className="absolute right-[-120px] top-[380px] w-[250px] opacity-55 pointer-events-none z-0"
              />

              {/* IMAGEM */}
              <div className="border border-5 border-[#122b4e] w-60 h-50 rounded-b-2xl rounded-tr-2xl">
              {imagens[0] ? (
                <img src={imagens[0]}
                  className="w-full h-full object-cover rounded-b-2xl rounded-tr-2xl relative top-[-15px] left-[15px]" />
              ) : null}    
              </div>

              {/* TEXTO */}
              <div className="flex flex-col w-160 max-h-56 overflow-hidden">
                <h2 className="uppercase text-xl font-medium text-[#122b4e]">Conheça um pouco mais</h2>
                <ul className="text-[#122b4e] list-disc list-inside max-w-160  pr-4 text-justify">
                  {safeData.beneficios.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>                  
              </div>
            </div>

            {/* BLOCO 2*/}
            <div className="flex gap-10 pl-6 mt-8 ">

              {/* IMAGEM */}
              <div className="grid grid-cols-1 ">
                <div className="border border-5 border-[#b6a36f] w-102 h-60 rounded-b-2xl rounded-tr-2xl">
                  {imagens[1] ? (
                    <img src={imagens[1]}

                      className="w-full h-full object-cover rounded-b-2xl rounded-tr-2xl relative top-[-15px] left-[15px]" />
                  ) : null}
                </div>                    
                <div className="flex gap-12 mt-10">
                  <div className="border border-5 border-[#122b4e] w-65 h-45 rounded-b-2xl rounded-tr-2xl">
                    {imagens[2] ? (
                      <img src={imagens[2]}
                        alt=""
                        className="w-full h-full object-cover rounded-b-2xl rounded-tr-2xl relative top-[-15px] left-[15px]" />
                    ) : null}
                  </div>

                  <div className="border border-5 border-[#122b4e] w-65 h-45 rounded-b-2xl rounded-tr-2xl">
                    {imagens[3] ? (
                      <img src={imagens[3]}
                        alt=""
                        className="w-full h-full object-cover rounded-b-2xl rounded-tr-2xl relative top-[-15px] left-[15px]" />
                    ) : null}
                  </div>
                </div>          
              </div>

              {/* TEXTO */}
              <div className="flex flex-col w-110 max-h-114 overflow-hidden">
                <h2 className="uppercase text-xl font-medium text-[#122b4e]">Informações Adicionais</h2>
                <ul className="text-[#122b4e] list-disc list-inside max-w-110 pr-4 text-justify">
                  {safeData.infoadc.map((info: string, i: number) => (
                    <li key={i}>{info}</li>
                  ))}
                </ul>                  
              </div>
            </div>
          </div>
        </div>


        {/* Footer */}
        <div className="mt-6">
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
      })}
    </>
  );
};

export default Hoteis;