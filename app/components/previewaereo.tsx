import { BudgetsData } from "@/types/budgets";
import {Mail, Phone} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

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
      valordesc: ""
  };

function formatarMoeda(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function formatarData(data: string) {
  if (!data) return "xx/xx";

  const d = new Date(data);

  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");

  return `${dia}/${mes}`;
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
            <div className="w-full min-w-[794px] text-[13px] bg-white px-2 py-2 rounded-2xl">

              {/* HEADER */}
              <div className="grid grid-cols-[80px_70px_130px_130px_60px_60px_90px_40px_60px_60px] text-[#222]  ">
                <div className="px-2 py-2 font-semibold text-center">Cia</div>
                <div className="px-2 py-2 font-semibold text-center">Voo</div>
                <div className="px-2 py-2 font-semibold text-center">Saída</div>
                <div className="px-2 py-2 font-semibold text-center">Chegada</div>
                <div className="px-2 py-2 font-semibold text-center">Origem</div>
                <div className="px-2 py-2 font-semibold text-center">Destino</div>
                <div className="px-2 py-2 font-semibold text-center">Dur. Con.</div>
                <div className="px-2 py-2 font-semibold text-center">Esc.</div>
                <div className="px-2 py-2 font-semibold text-center">Equip.</div>
                <div className="px-2 py-2 font-semibold text-center">Dur.</div>
              </div>

              {/* BODY */}
              <div className="space-y-[4px]">
                {(safeData.voos && safeData.voos.length > 0
                  ? safeData.voos
                  : Array(1).fill({})
                ).map((voo, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[80px_70px_130px_130px_60px_60px_90px_40px_60px_60px] items-center bg-[#DEDEDE] rounded-md h-[42px] "
                  >
                    {/* CIA */}
                    <div className="px-2">
                      <div className="bg-[#e9e9e9] h-[26px] rounded-md flex items-center justify-center">
                        <span className="text-gray-800 font-bold text-[12px] uppercase">
                          {voo.cia || "CIA"}
                        </span>
                      </div>
                    </div>

                    <div className="px-2 text-gray-700 border-l text-center">{voo.numvoo || "0000"}</div>
                    <div className="px-2 text-gray-700 border-l text-center">{voo.saida || "XX Mês 00:00h"}</div>
                    <div className="px-2 text-gray-700 border-l text-center">{voo.chegada || "XX Mês 00:30h"}</div>
                    <div className="px-2 text-gray-700 border-l text-center">{voo.origem || "UF"}</div>
                    <div className="px-2 text-gray-700 border-l text-center">{voo.destino || "DES"}</div>
                    <div className="px-2 text-gray-700 border-l text-center">{voo.durcon || "--"}</div>
                    <div className="px-2 text-gray-700 border-l text-center">{voo.esc || "0"}</div>
                    <div className="px-2 text-gray-700 border-l text-center">{voo.equipe || "--"}</div>
                    <div className="px-2 text-gray-700 border-l text-center">{voo.duracao || "00:00"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
         {/* DESCRIÇÃO DO DIA  */}
        <div className="flex px-6 mt-12">
          <h2 className="text-[#122b4e] text-lg font-bold"> Ida dia {formatarData(safeData.dataAereoIni)} saindo de {safeData.cidadeSaida || "(Cidade)"} para o Aeroporto de {safeData.aeroportoSaida || "(Aeroporto)"}, Volta dia {formatarData(safeData.dataAereoFim)} saindo do Aeroporto {safeData.aeroportoChegada || "(Aeroporto)"} para {safeData.cidadeChegada || "(Cidade)"}.
          </h2>
        </div>

        <div className="mt-10 px-6">
          <h2 className="text-[#122b4e] text-lg font-bold"> Companhaia Aérea: {safeData.voos[0]?.cia?.toUpperCase() || "CIA"}</h2>
        </div>
        

        <div className="mt-14">
          <ul className="text-xl text-[#122b4e] px-6 space-y-2">
            {safeData.hoteis.map((hotel, index) => (
              <li key={index}>
                {hotel.pacote}{" "}
                <strong>
                  (Hospedagem: Hotel {hotel.hotel}){" "}
                  {formatarMoeda(hotel.valorAereo)}
                </strong>{" "}
                parcelado em {hotel.parcelas}x.
              </li>
            ))}
          </ul>
        </div>


        <div className="mt-14">
          <p className="text-xl text-[#122b4e] px-6">
           Formas de pagamento: <strong>Pix ou cartão de crédito (sujeito a taxas administrativas)</strong>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto ">
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