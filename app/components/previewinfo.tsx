import { BudgetsData } from "@/types/budgets";
import {Mail, Phone} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Info = ({ data }: { data: BudgetsData }) => {

    const safeData: BudgetsData = data || {
      numeroorc: "",
      dataInicio: "",
      dataFim: "",
      hotel: "",
      cidade: "",
      estrelas: 1,
      imagens: [] ,
      beneficios: [],
      infoadc: [],
      cia: "",
      numvoo: 0,
      saida: "",
      chegada: "",
      origem: "",
      destino: "",
      durcon: "",
      esc: "",
      equipe: "",
      duracao: "",
      descricaodata: "",
      cidadeSaida: "",
      valorAereo: 0,
      dataAereoIni: "",
      dataAereoFim: "",
      valordesc: "",
      mostrarOu: false
  };


function formatarData(data: string) {
  if (!data) return "xx/xx/xxxx";

  const d = new Date(data);

  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const ano = d.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

  return (
    <div >
      <div
        className="w-[794px] h-[1123px]  mx-auto bg-[#000000] overflow-hidden flex flex-col "
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
          <div className="flex flex-col items-center mt-16">
            <div className="max-w-110">
              <h1 className="text-[40px] leading-none pr-4 text-[#b6a36f] uppercase font-bold">Informações</h1>
            </div>
          </div>

          <div className="flex flex-col items-end ">
            <div className="max-w-110">
              <hr className="my-2 w-[298px] text-[#122b4e] border-2" />
            </div>
          </div>
          <div className="flex w-full justify-end">
              <div className=" flex  gap-2 pl-3 px-6 py-1 bg-[#122b4e] rounded-bl-lg items-center">
                <h2 className="text-base text-white uppercase max-w-[450px] truncate">{safeData.descricaodata || "Cidade - UF XX de Mês de XXXX"}</h2>
              </div>  
          </div>
        </div>
        
        {/* DESCRIÇÃO DO DIA  */}
        <div className="mt-10">
          <h2 className="text-lg text-[#122b4e] pl-6 font-bold">O pacote incluiu: </h2>
        </div>

        <div className="px-10 w-full">
          <div className="flex flex-col max-h-84 overflow-hidden">
            
            <ul className="text-[#122b4e] list-disc list-inside text-justify text-lg">
              
              {safeData.infoadd.map((infoadd, index) => (
                <li key={index}>{infoadd}</li>
              ))}

              {safeData.mostrarOu && (
                <div>
                  <p>OU</p>
                  
                  {safeData.infoadd.map((infoadd, index) => (
                <li key={index}>{infoadd}</li>
              ))}        
                </div>

              )}

            </ul>
          </div>
        </div>
        
          <div className="mt-10 px-6">
            <p className="text-[#122b4e] text-lg">
            <strong>Observação importante:</strong>
            Valores, disponibilidade e condições, sujeito a confirmação no momento da reserva.
            </p>
          </div>

          <div className=" flex mt-10 px-6 justify-end">
            <p className="text-[#ee1e3c] text-lg uppercase w-90">
            APENAS COTADO, NADA RESERVADO. ORÇAMENTO VÁLIDO ATÉ {formatarData(safeData.validadeorc)}
            </p>
          </div>
        {/* Footer */}
        <div className="mt-auto ">
          <div className="text-[#122b4e] mb-10 pl-6 font-bold">
            <h2>Atenciosamente</h2>
            <h2>MGA TOUR.</h2>
          </div>
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

export default Info;