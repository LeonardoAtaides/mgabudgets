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
    <div className="py-2">
      <div
        className="max-w-[1100px] mx-auto bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200"
        style={{ zoom: 0.7 }}
      >
        {/* Header */}
        <div className="bg-[#0b1b3b] p-6 text-white flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="text-2xl font-semibold leading-tight">
               Pacote de Viagem | {safeData.destino || <span className="placeholder">Destino</span>}
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
                {safeData.hotel || <span className="placeholder">Nome do hotel</span>} —{" "}
                  {safeData.periodo || <span className="placeholder">Período da estadia</span>}
              </strong>
            </div>

            <div className="p-4">

            {/* GALERIA */}
            <div className="mb-6">
              <div className="grid grid-cols-4 grid-rows-3 gap-2.5 h-[520px]">
                {(safeData.imagens && safeData.imagens.length > 0
                  ? safeData.imagens
                  : Array(7).fill(null)
                ).map((img, index) => (
                  <div
                    key={index}
                    className={`w-full h-full rounded-lg border border-gray-100 bg-gray-100 flex items-center justify-center text-gray-400 text-sm
                    ${index === 0 ? "col-span-2 row-span-2" : ""}
                    ${index === 5 ? "col-span-2 row-start-3 col-start-1" : ""}
                    ${index === 6 ? "col-span-2 row-start-3 col-start-3" : ""}
                    `}
                  >
                    {img ? (
                      <img
                        src={img}
                        alt={`Imagem ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      "Imagem"
                    )}
                  </div>
                ))}
              </div>
            </div>
            
              {/* INFORMAÇÕES + VALOR */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* HOTEL INFO */}
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="text-base tracking-wider uppercase text-[#0b1b3b] font-bold mb-3">
                    INFORMAÇÕES DO HOTEL
                  </div>

                  <div className="text-base text-gray-700 leading-relaxed">
                    {safeData.descricaoHotel}

                    {safeData.beneficios.length > 0 && (
                      <ul className="mt-3 pl-4 list-disc space-y-1">
                        {safeData.beneficios.map((beneficio, index) => (
                          <li key={index}>{beneficio}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>


              {/* Informações do Quarto */}

              <div className="border border-gray-300 rounded-lg p-4">
                <div className="text-base tracking-wider uppercase text-[#0b1b3b] font-bold mb-3">
                  Informações do Quarto
                </div>

                <div className="text-sm font-semibold text-white  px-2 py-1 rounded">
                  <div className="text-sm text-gray-700 leading-relaxed gap-4 flex flex-col">
                    <div>
                      <strong>
                        {safeData.quartos && safeData.quartos.length > 0 ? `Quarto${safeData.quartos.length > 1 ? "s" : ""}:`: "Quartos:"} 
                      </strong>{" "}
                      {safeData.quartos && safeData.quartos.length > 0
                        ? `${safeData.quartos.length}`
                        : <span className="placeholder">0</span>}
                    </div>   
                    <div>
                      <strong>
                        {safeData.viajantes? `Viajante${Number(safeData.viajantes) > 1 ? "s" : ""}:`: "Viajantes:"}
                      </strong>{" "}
                      {safeData.viajantes? `${Number(safeData.viajantes)}`: <span className="placeholder">0</span>}
                    </div>                    

                    <div><strong>Período:</strong> {safeData.periodo}</div>


                    <div><strong>Regime:</strong> {safeData.regime}</div>
                  </div>
                </div>
              </div>
            
            </div>

            {/* QUARTOS */}
            <div className="rounded-lg border border-gray-300 overflow-hidden mb-4">
              <div className="bg-[#fafbff] text-[#222] p-3 text-lg border-b border-gray-300">
                <strong>Quartos selecionados</strong>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {safeData.quartos.length > 0
                    ? safeData.quartos.map((quarto, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <div className="font-bold text-[#0b1b3b] mb-1.5 text-sm">
                            {quarto.nome || <span className="placeholder">Quarto A</span>}
                          </div>

                          <div className="text-sm text-gray-700 leading-relaxed">
                            <strong>Vista:</strong> {quarto.vista || <span className="placeholder">Cidade</span>} <br />
                            <strong>Cama:</strong> {quarto.cama || <span className="placeholder">Casal</span>} <br />
                            <strong>Tamanho:</strong> {quarto.tamanho || <span className="placeholder">30m²</span>} <br />
                            <strong>Incluso:</strong> {quarto.incluso || <span className="placeholder">Café da manhã</span>}
                          </div>
                        </div>
                      ))
                    : (
                        <div className="border border-gray-200 rounded-lg p-3 col-span-2">
                          <div className="font-bold text-[#0b1b3b] mb-1.5 text-sm">
                            <span className="placeholder">Quarto A</span>
                          </div>
                          <div className="text-sm text-gray-700 leading-relaxed">
                            <strong>Vista:</strong> <span className="placeholder">Cidade</span> <br />
                            <strong>Cama:</strong> <span className="placeholder">Casal</span> <br />
                            <strong>Tamanho:</strong> <span className="placeholder">30m²</span> <br />
                            <strong>Incluso:</strong> <span className="placeholder">Café da manhã</span>
                          </div>
                        </div>
                      )}
                </div>
              </div>
            </div>

            {/* VOOS */}
            <div className="rounded-lg border border-gray-300 overflow-hidden mb-4">
              <div className="bg-[#fafbff] text-[#222] p-3 text-lg border-b border-gray-300">
                <strong>
                  Voos
                  {safeData.voos.length > 0 ? (
                    <> {" — "} {safeData.voos[0].cia || <span className="placeholder">Teste</span>} {" — Em classe "} {safeData.voos[0].classe || <span className="placeholder">Econômica</span>}</>
                  ) : (
                    <> {" — "} <span className="placeholder">Cia Aérea</span> {" — Em classe "} <span className="placeholder">Econômica</span></>
                  )}
                </strong>
              </div>

              <div className="p-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm min-w-[780px]">
                  <thead>
                    <tr>
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
                    {safeData.voos.length > 0
                      ? safeData.voos.map((voo, index) => (
                          <tr key={index}>
                            <td className="p-2.5 border-t text-gray-500">{voo.cia || <span className="placeholder">Teste</span>}</td>
                            <td className="p-2.5 border-t text-gray-500">{voo.voo || <span className="placeholder">Teste</span>}</td>
                            <td className="p-2.5 border-t text-gray-500">{voo.saida || <span className="placeholder">Teste</span>}</td>
                            <td className="p-2.5 border-t text-gray-500">{voo.chegada || <span className="placeholder">Teste</span>}</td>
                            <td className="p-2.5 border-t text-gray-500">{voo.origem || <span className="placeholder">Teste</span>}</td>
                            <td className="p-2.5 border-t text-gray-500">{voo.destino || <span className="placeholder">Teste</span>}</td>
                            <td className="p-2.5 border-t text-gray-500">{voo.duracao || <span className="placeholder">Teste</span>}</td>
                          </tr>
                        ))
                      : (
                          <tr>
                            <td className="p-2.5 border-t text-gray-500"><span className="placeholder">Cia Aérea</span></td>
                            <td className="p-2.5 border-t text-gray-500"><span className="placeholder">Voo 000</span></td>
                            <td className="p-2.5 border-t text-gray-500"><span className="placeholder">00:00</span></td>
                            <td className="p-2.5 border-t text-gray-500"><span className="placeholder">00:00</span></td>
                            <td className="p-2.5 border-t text-gray-500"><span className="placeholder">Origem</span></td>
                            <td className="p-2.5 border-t text-gray-500"><span className="placeholder">Destino</span></td>
                            <td className="p-2.5 border-t text-gray-500"><span className="placeholder">00h00</span></td>
                          </tr>
                        )}
                  </tbody>
                </table>
              </div>
            </div>

              {/* Informações Adicionais */}
              {safeData.mostrarInfo && (
              <div className="rounded-lg border border-gray-300 overflow-hidden mb-4">
                <div className="bg-[#fafbff] text-[#222] p-3 text-lg border-b border-gray-300">
                  <strong>Informações Adicionais</strong>
                </div>

                <div className="border rounded-b-lg p-3">
                  <div className="text-sm text-gray-700 leading-relaxed gap-4 flex">
                    <div><strong>Período:</strong> {safeData.periodo}</div>
                    <div>
                      <strong>
                        {safeData.viajantes? `Viajante${Number(safeData.viajantes) > 1 ? "s" : ""}:`: "Viajantes:"}
                      </strong>{" "}
                      {safeData.viajantes? `${Number(safeData.viajantes)}`: <span className="placeholder">0</span>}
                    </div>
                    <div>
                      <strong>
                        {safeData.quartos && safeData.quartos.length > 0 ? `Quarto${safeData.quartos.length > 1 ? "s" : ""}:`: "Quartos:"} 
                      </strong>{" "}
                      {safeData.quartos && safeData.quartos.length > 0
                        ? `${safeData.quartos.length}`
                        : <span className="placeholder">0</span>}
                    </div>
                    <div><strong>Regime:</strong> {safeData.regime}</div>
                  </div>
                </div>
              </div>
              )}
              {/* RESUMO */}
              {safeData.mostrarResumo && (
              <div className="rounded-lg border border-gray-300 overflow-hidden mb-4">
                <div className="bg-[#fafbff] text-[#222] p-3 text-lg border-b border-gray-300">
                  <strong>Resumo</strong>
                </div>

                <div className="border border-dashed border-[#d4af37] bg-yellow-50 rounded-b-lg p-3">
                  <div className="text-sm text-gray-700 leading-relaxed flex gap-4">
                    <div><strong>Destino:</strong>{safeData.destino}</div>
                    <div><strong>Hotel:</strong>{safeData.hotel}</div>
                    <div><strong>Período:</strong>{safeData.periodo}</div>
                    <div>
                      <strong>Ocupação:</strong>{" "}
                      {Number(safeData.viajantes)} {pluralize(Number(safeData.viajantes), "viajante")} -{" "}
                      {safeData.quartos.length} {pluralize(safeData.quartos.length, "quarto")}
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>

        {/* VALOR */}
        <div className="">
          <div className="border border-gray-300 p-4">
          <div className="flex items-center justify-between mb-3">
          <div className="text-base tracking-wider uppercase text-[#0b1b3b] font-bold">
              VALOR
          </div>

          <div className="text-sm font-semibold text-white bg-[#0b1b3b] px-2 py-1 rounded">
              {safeData.moeda}
          </div>
          </div>

          <div className="text-2xl font-extrabold text-[#0b1b3b]">
                {formatarMoeda(Number(safeData.valorTotal || 0),safeData.moeda)}
          </div>

          <div className="text-sm text-gray-500 mt-1">
              Valor total do pacote por pessoa.
          </div>
          </div>                  
        </div>            
          </div>


        </div>




        {/* Footer */}
        <div className="bg-[#f6f7fb] p-4 border-t border-gray-200 text-sm text-gray-500 text-center">
          <span className="font-bold">Observações importantes:</span> Valores e disponibilidade sujeitos à confirmação no momento da reserva. Taxas locais e serviços extras (quando aplicáveis) podem ser cobrados diretamente pelo hotel. Horários dos voos sujeitos à confirmação e alterações pela companhia aérea.
        </div>
      </div>
    </div>
  );
};

export default HotelOrcamento;