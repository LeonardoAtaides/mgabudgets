import React from 'react';

const HotelOrcamento = () => {
  return (
    <div className="bg-gray-100 py-10">
      {/* Wrapper principal com zoom equivalente */}
      <div className="max-w-[1100px] mx-auto bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200" style={{ zoom: 0.65 }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0b1b3b] to-[#1b1c1f] p-6 text-white flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5 min-w-0">

            <div className="text-2xl font-semibold leading-tight">Hospedagem | Ushuaia, Tierra del Fuego </div>
          </div>
          <img 
            className="h-16" 
            src="https://mgatourcorp.com/wp-content/uploads/2024/04/MIV_MGA_2-24-e1729800489767.png" 
            alt="Logo"
          />
        </div>

        {/* Content */}
        <div className="p-6 bg-white">
          <h2 className="text-xl font-semibold mb-6 text-[#0b1b3b] border-l-4 border-[#d4af37] pl-2.5 tracking-wider uppercase">
            Detalhes da hospedagem
          </h2>
          
          {/* Segment Card */}
          <div className="rounded-lg border border-gray-300 overflow-hidden">
            <div className="bg-[#fafbff] text-[#222] p-3 text-lg border-b border-gray-300">
              <strong>Las Hayas Resort Hotel — 10 a 17 de abril</strong>
            </div>
            
            <div className="p-4">
              {/* Gallery */}
              <div className="mb-4">
                <div className="grid grid-cols-4 grid-rows-2 gap-2.5 h-[280px]">
                  <img 
                    className="col-span-2 row-span-2 w-full h-full object-cover rounded-lg border border-gray-100" 
                    src="https://blog.blablacar.com.br/wp-content/uploads/2024/09/jalapao-to.webp" 
                    alt="Foto Grande"
                  />
                  <img 
                    className="col-span-1 row-span-1 w-full h-full object-cover rounded-lg border border-gray-100" 
                    src="https://luapousada.com.br/wp-content/uploads/2022/03/saiba-mais-sobre-a-praia-bonita-em-barra-de-sao-miguel-al.jpg" 
                    alt="Foto Pequena 1"
                  />
                  <img 
                    className="col-span-1 row-span-1 w-full h-full object-cover rounded-lg border border-gray-100" 
                    src="https://luapousada.com.br/wp-content/uploads/2022/03/saiba-mais-sobre-a-praia-bonita-em-barra-de-sao-miguel-al.jpg" 
                    alt="Foto Pequena 2"
                  />
                  <img 
                    className="col-span-1 row-span-1 w-full h-full object-cover rounded-lg border border-gray-100" 
                    src="https://luapousada.com.br/wp-content/uploads/2022/03/saiba-mais-sobre-a-praia-bonita-em-barra-de-sao-miguel-al.jpg" 
                    alt="Foto Pequena 3"
                  />
                  <img 
                    className="col-span-1 row-span-1 w-full h-full object-cover rounded-lg border border-gray-100" 
                    src="https://luapousada.com.br/wp-content/uploads/2022/03/saiba-mais-sobre-a-praia-bonita-em-barra-de-sao-miguel-al.jpg" 
                    alt="Foto Pequena 4"
                  />
                </div>
              </div>

              {/* Info Grid - Hotel Info e Valor lado a lado */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* INFORMAÇÕES DO HOTEL Card */}
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="text-base tracking-wider uppercase text-[#0b1b3b] font-bold mb-3">
                    INFORMAÇÕES DO HOTEL
                  </div>
                  <div className="text-base text-gray-700 leading-relaxed">
                    Hospedagem em Ushuaia (Tierra del Fuego), em região de natureza exuberante e com cenários panorâmicos.
                    <ul className="mt-3 pl-4 list-disc space-y-1">
                      <li>Café da manhã incluído</li>
                      <li>Ambientes internos aconchegantes e áreas de convivência</li>
                      <li>Experiência ideal para quem busca conforto e paisagens de montanha</li>
                    </ul>
                  </div>
                </div>

                {/* VALOR Card - COM TODAS AS INFORMAÇÕES */}
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="text-base tracking-wider uppercase text-[#0b1b3b] font-bold mb-3">
                    VALOR
                  </div>
                  <div className="text-base text-gray-700 space-y-2">

                    
                    <div className=" border-gray-200">
                      <div className="text-2xl font-extrabold text-[#0b1b3b]">USD 3.912</div>
                      <div className="text-sm text-gray-500 mt-1">Valor total do pacote por pessoa.</div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Voos Card */}
              <div className="rounded-lg border border-gray-300 overflow-hidden mb-4">
                <div className="bg-[#fafbff] text-[#222] p-3 text-lg border-b border-gray-300">
                  <strong>Voos — Aerolíneas Argentinas — Em classe Premium Economy</strong>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full border-collapse text-sm min-w-[780px]">
                    <thead>
                      <tr>
                        <th className="text-left p-2.5 border-b border-gray-200 font-bold text-gray-800">Cia</th>
                        <th className="text-left p-2.5 border-b border-gray-200 font-bold text-gray-800">Voo</th>
                        <th className="text-left p-2.5 border-b border-gray-200 font-bold text-gray-800">Saída</th>
                        <th className="text-left p-2.5 border-b border-gray-200 font-bold text-gray-800">Chegada</th>
                        <th className="text-left p-2.5 border-b border-gray-200 font-bold text-gray-800">Origem</th>
                        <th className="text-left p-2.5 border-b border-gray-200 font-bold text-gray-800">Destino</th>
                        <th className="text-left p-2.5 border-b border-gray-200 font-bold text-gray-800">Duração</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">Aerolíneas Argentinas</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">AR 1241</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">10/abr • 06:50</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">10/abr • 09:50</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">GRU (São Paulo)</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">AEP (Buenos Aires)</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">05:10</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">Aerolíneas Argentinas</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">AR 1884</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">10/abr • 15:00</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">10/abr • 18:40</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">AEP (Buenos Aires)</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">USH (Ushuaia)</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">—</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">Aerolíneas Argentinas</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">AR 1875</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">17/abr • 09:30</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">17/abr • 13:00</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">USH (Ushuaia)</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">AEP (Buenos Aires)</td>
                        <td className="p-2.5 border-b border-gray-100 text-gray-700">—</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-gray-700">Aerolíneas Argentinas</td>
                        <td className="p-2.5 text-gray-700">AR 1250</td>
                        <td className="p-2.5 text-gray-700">17/abr • 16:40</td>
                        <td className="p-2.5 text-gray-700">17/abr • 19:25</td>
                        <td className="p-2.5 text-gray-700">AEP (Buenos Aires)</td>
                        <td className="p-2.5 text-gray-700">GRU (São Paulo)</td>
                        <td className="p-2.5 text-gray-700">03:40</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quartos Card */}
              <div className="rounded-lg border border-gray-300 overflow-hidden mb-4">
                <div className="bg-[#fafbff] text-[#222] p-3 text-lg border-b border-gray-300">
                  <strong>Quartos selecionados</strong>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="font-bold text-[#0b1b3b] mb-1.5 text-sm">Quarto 1 — Quarto Triplo</div>
                      <div className="text-sm text-gray-700 leading-relaxed">
                        <strong>Vista:</strong> Montanha<br />
                        <strong>Cama:</strong> 3 camas de solteiro<br />
                        <strong>Tamanho:</strong> 33 m²<br />
                        <strong>Incluso:</strong> Café da manhã
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="font-bold text-[#0b1b3b] mb-1.5 text-sm">Quarto 2 — Quarto Família</div>
                      <div className="text-sm text-gray-700 leading-relaxed">
                        <strong>Vista:</strong> Montanha<br />
                        <strong>Cama:</strong> 1 cama king<br />
                        <strong>Tamanho:</strong> 45 m²<br />
                        <strong>Incluso:</strong> Café da manhã
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="font-bold text-[#0b1b3b] mb-1.5 text-sm">Quarto 3 — Suíte Júnior</div>
                      <div className="text-sm text-gray-700 leading-relaxed">
                        <strong>Vista:</strong> Montanha<br />
                        <strong>Cama:</strong> 1 cama king<br />
                        <strong>Tamanho:</strong> 45 m²<br />
                        <strong>Incluso:</strong> Café da manhã
                      </div>
                    </div>


                  </div>
                </div>
              </div>

              {/* Resumo */}
              <div className="rounded-lg border border-gray-300 overflow-hidden mb-4 ">
                <div className="bg-[#fafbff] text-[#222] p-3 text-lg border-b border-gray-300">
                  <strong>Resumo</strong>
                </div>
                  <div className=" w-full border-collapse text-sm min-w-[780px] border border-dashed border-[#d4af37] bg-yellow-50 rounded-b-lg p-3">
                    <div className="p-3">
                      <div className="text-sm text-gray-700 leading-relaxed">
                        <strong>Destino:</strong> Ushuaia (Tierra del Fuego)<br />
                        <strong>Hotel:</strong> Las Hayas Resort Hotel<br />
                        <strong>Período:</strong> 10 a 17 de abril<br />
                        <strong>Ocupação:</strong> 5 viajantes • 3 quartos
                      </div>
                    </div>
                  </div>
              </div>
              
            </div>
          </div>
        </div>


        {/* Footer */}
        <div className="bg-[#f6f7fb] p-4 border-t border-gray-200 text-sm text-gray-500">
          <div><strong>Observações importantes:</strong> Valores e disponibilidade sujeitos à confirmação no momento da reserva. Taxas locais e serviços extras (quando aplicáveis) podem ser cobrados diretamente pelo hotel. Horários dos voos sujeitos à confirmação e alterações pela companhia aérea.</div>
        </div>
      </div>
    </div>
  );
};

export default HotelOrcamento;