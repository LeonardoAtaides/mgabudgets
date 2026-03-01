import React from "react";
import { BudgetsData } from "@/types/budgets";

function formatarMoeda(valor: number, moeda: "BRL" | "USD") {
  return new Intl.NumberFormat(
    moeda === "BRL" ? "pt-BR" : "en-US",
    {
      style: "currency",
      currency: moeda
    }
  ).format(valor)
}

const HotelOrcamento = ({ data }: { data: BudgetsData }) => {
  return (
    <div>
      <div
        className="max-w-[1100px] mx-auto bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200"
        style={{ zoom: 0.65 }}
      >
        {/* Header */}
        <div className="bg-[#0b1b3b] p-6 text-white flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="text-2xl font-semibold leading-tight">
              Hospedagem | {data.destino}
            </div>
          </div>

          <img
            className="h-16"
            src="/assets/logoMga.png"
            alt="Logo"
          />
        </div>

        <div className="p-6 bg-white">
          <h2 className="text-xl font-semibold mb-6 text-[#0b1b3b] border-l-4 border-[#d4af37] pl-2.5 tracking-wider uppercase">
            Detalhes da hospedagem
          </h2>

          <div className="rounded-lg border border-gray-300 overflow-hidden">
            <div className="bg-[#fafbff] text-[#222] p-3 text-lg border-b border-gray-300">
              <strong>
                {data.hotel} — {data.periodo}
              </strong>
            </div>

            <div className="p-4">

            {/* GALERIA */}
            {data.imagens && data.imagens.length > 0 && (
            <div className="mb-6">
                <div className="grid grid-cols-4 grid-rows-2 gap-2.5 h-[280px]">
                {data.imagens.map((img, index) => (
                    <img
                    key={index}
                    src={img}
                    alt={`Imagem ${index + 1}`}
                    className={`w-full h-full object-cover rounded-lg border border-gray-100 ${
                        index === 0 ? "col-span-2 row-span-2" : ""
                    }`}
                    />
                ))}
                </div>
            </div>
)}
              {/* INFORMAÇÕES + VALOR */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* HOTEL INFO */}
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="text-base tracking-wider uppercase text-[#0b1b3b] font-bold mb-3">
                    INFORMAÇÕES DO HOTEL
                  </div>

                  <div className="text-base text-gray-700 leading-relaxed">
                    {data.descricaoHotel}

                    {data.beneficios.length > 0 && (
                      <ul className="mt-3 pl-4 list-disc space-y-1">
                        {data.beneficios.map((beneficio, index) => (
                          <li key={index}>{beneficio}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* VALOR */}
                <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                <div className="text-base tracking-wider uppercase text-[#0b1b3b] font-bold">
                    VALOR
                </div>

                <div className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {data.moeda}
                </div>
                </div>

                <div className="text-2xl font-extrabold text-[#0b1b3b]">
                    {formatarMoeda(data.valorTotal, data.moeda)}
                </div>

                <div className="text-sm text-gray-500 mt-1">
                    Valor total do pacote por pessoa.
                </div>
                </div>
            </div>

              {/* VOOS */}
              {data.voos.length > 0 && (
                <div className="rounded-lg border border-gray-300 overflow-hidden mb-4">
                  <div className="bg-[#fafbff] text-[#222] p-3 text-lg border-b border-gray-300">
                    <strong>Voos
                    {data.voos.length > 0 && (<> {" — "} {data.voos[0].cia} {" — Em classe "}{data.voos[0].classe} </>)}</strong>
                  </div>

                  <div className="p-4 overflow-x-auto">
                    <table className="w-full border-collapse text-sm min-w-[780px]">
                      <thead>
                        <tr className="">
                          <th className="text-left p-2.5 text-[#222]">Cia</th>
                          <th className="text-left p-2.5 text-[#222]">Voo</th>
                          <th className="text-left p-2.5 text-[#222]">Saída</th>
                          <th className="text-left p-2.5 text-[#222]">Chegada</th>
                          <th className="text-left p-2.5 text-[#222]">Origem</th>
                          <th className="text-left p-2.5 text-[#222]">Destino</th>
                          <th className="text-left p-2.5 text-[#222]">Duração</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.voos.map((voo, index) => (
                          <tr key={index}>
                            <td className="p-2.5 border-t text-gray-500">{voo.cia}</td>
                            <td className="p-2.5 border-t text-gray-500">{voo.voo}</td>
                            <td className="p-2.5 border-t text-gray-500">{voo.saida}</td>
                            <td className="p-2.5 border-t text-gray-500">{voo.chegada}</td>
                            <td className="p-2.5 border-t text-gray-500">{voo.origem}</td>
                            <td className="p-2.5 border-t text-gray-500">{voo.destino}</td>
                            <td className="p-2.5 border-t text-gray-500">{voo.duracao}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* QUARTOS */}
              {data.quartos.length > 0 && (
                <div className="rounded-lg border border-gray-300 overflow-hidden mb-4">
                  <div className="bg-[#fafbff] text-[#222] p-3 text-lg border-b border-gray-300">
                    <strong>Quartos selecionados</strong>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {data.quartos.map((quarto, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-3"
                        >
                          <div className="font-bold text-[#0b1b3b] mb-1.5 text-sm">
                            {quarto.nome}
                          </div>

                          <div className="text-sm text-gray-700 leading-relaxed">
                            <strong>Vista:</strong> {quarto.vista} <br />
                            <strong>Cama:</strong> {quarto.cama} <br />
                            <strong>Tamanho:</strong> {quarto.tamanho} <br />
                            <strong>Incluso:</strong> {quarto.incluso}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* RESUMO */}
              <div className="rounded-lg border border-gray-300 overflow-hidden mb-4">
                <div className="bg-[#fafbff] text-[#222] p-3 text-lg border-b border-gray-300">
                  <strong>Resumo</strong>
                </div>

                <div className="border border-dashed border-[#d4af37] bg-yellow-50 rounded-b-lg p-3">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    <strong>Destino:</strong> {data.destino} <br />
                    <strong>Hotel:</strong> {data.hotel} <br />
                    <strong>Período:</strong> {data.periodo} <br />
                    <strong>Quartos:</strong> {data.quartos.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f6f7fb] p-4 border-t border-gray-200 text-sm text-gray-500">
          <span className="font-bold">Observações importantes:</span> Valores e disponibilidade sujeitos à confirmação no momento da reserva. Taxas locais e serviços extras (quando aplicáveis) podem ser cobrados diretamente pelo hotel. Horários dos voos sujeitos à confirmação e alterações pela companhia aérea.
        </div>
      </div>
    </div>
  );
};

export default HotelOrcamento;