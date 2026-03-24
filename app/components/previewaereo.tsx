import { BudgetsData } from "@/types/budgets";
import {Mail, Phone} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Star } from "lucide-react";


function formatarData(data: string) {
  if (!data) return "xx/xx";

  const d = new Date(data);

  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");

  return `${dia}/${mes}`;
}

const Aereo = ({ data }: { data: BudgetsData }) => {

    const safeData: BudgetsData = data || {
      numeroorc: "",
      dataInicio: "",
      dataFim: "",
      hotel: "",
      cidade: "",
      estrelas: 1,
      imagens: [] ,
      beneficios: [],
      infoadc: []
  };
const imagens = (safeData.imagens && safeData.imagens.length > 0
  ? safeData.imagens
  : Array(4).fill(null)
)
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
          <div className="flex flex-col items-end mt-[-10px]">
            <div className="max-w-110">
              <h1 className="text-[65px] leading-none pr-4 text-[#b6a36f] uppercase font-bold">Aéreo</h1>
              <hr className="my-2 text-[#122b4e] border-2" />
            </div>
          </div>
          <div className="flex w-full justify-end">
              <div className=" flex  gap-2 pl-3 px-6 py-1 bg-[#122b4e] rounded-bl-lg items-center">
                <h2 className="text-base text-white uppercase max-w-[450px] truncate">{safeData.descricaodata || "Cidade - UF XX de Mês de XXXX"}</h2>
              </div>  
          </div>

          {/* COMPANHIA AÉREA */}
          <div className="mt-6">
            {/* QUADRO DE DADOS */}

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

export default Aereo;