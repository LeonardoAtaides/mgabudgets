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
        <div className=" text-white flex items-center justify-between gap-4 mb-10">
          <img
            className="h-18 w-auto ml-6"
            src="/assets/logoMga.png"
            alt="Logo"
          />
          <div className="flex justify-between gap-4 min-w-0 w-[70%] bg-[#0b1b3b] border rounded-bl-full px-10 pt-3 py-8">
            <div className="text-xl font-semibold leading-tight pl-8">
               <h4>Conﬁra o orçamento que preparamos <br /> especialmente para você!</h4>
            </div>

            <div className="leading-tight">
               <p className="text-lg font-light">wwww.mgatour.com.br</p>
               <hr className="my-1"/>
               <p className="text-end text-xs">Brasília - DF, Brasil</p>
            </div>
          </div>
        </div>

      {/* Número de Orçamento */}
      <div className="pl-6 py-2 bg-[#b6a36f] w-60 rounded-tr-2xl">
        <h2 className="text-xl text-white">Orçamento N° {safeData.numeroorc || "0000"}</h2>
      </div>
      
        <div className=" bg-white">
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
              <h1 className="text-[65px] leading-none  text-[#b6a36f] uppercase font-extrabold">Hotéis</h1>
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
            <div className="flex gap-12 pl-6">
              <div className="border border-4 border-gray-800 w-90 h-90 rounded-b-2xl rounded-tr-2xl">
                        <img src="https://img.freepik.com/fotos-gratis/por-do-sol-no-arroz-fazenda-campo-tailandia_1150-17920.jpg?semt=ais_hybrid&w=740&q=80"
              alt="" className="w-90 h-90 rounded-b-2xl rounded-tr-2xl relative top-[-15px] left-[15px]" />      
              </div>


              <div className="flex flex-col">
                <h2 className="uppercase text-xl font-medium text-[#122b4e]">Conheça um pouco mais</h2>
                <ul className="text-[#122b4e] list-disc list-inside">
                  <li>Apartamento perto de Praia de Copacabana</li>
                  {safeData.beneficios.map((beneficio, index) => (
                    <li key={index}>{beneficio}</li>
                  )) 
                  && <li className="text-gray-500 italic">Nenhum benefício cadastrado</li>}
                </ul>                  
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="mt-2">




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
                      <th className="text-left p-2.5 text-[#222]">Data</th>
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
                            <td className="p-2.5 border-t text-gray-500">{voo.data || <span className="placeholder">Teste</span>}</td>
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
                            <td className="p-2.5 border-t text-gray-500"><span className="placeholder">xx/xx/xxxx</span></td>
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
                    <div className="text-base text-gray-700 leading-relaxed text-justify">
                    {safeData.descricaoInfo}
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
          </div>

          <div className="text-2xl font-extrabold text-[#0b1b3b]">
               {safeData.moeda} {formatarMoeda(Number(safeData.valorTotal || 0),safeData.moeda)}
          </div>

          <div className="text-sm text-gray-500 mt-1">
              Valor total do {safeData.valordesc}.
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