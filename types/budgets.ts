export interface BudgetsData {

// Dados do orçamento Hotel
  numeroorc: string
  dataInicio: string
  dataFim: string
  hotel: string
  cidade: string
  estrelas: number
  imagens: string[] 
  beneficios: string[]
  infoadc: string[]
// -----------------------//

  destino: string
  periodo: string
  valorTotal: string
  moeda: "BRL" | "USD"
  descricaoHotel: string
  descricaoInfo: string
  descricaoExtra: string
  
  mostrarResumo: boolean
  mostrarInfo: boolean
   
  viajantes: string
  regime: string
  valordesc: "pacote" | "pacote por pessoa"

  voos: {
    cia: string
    data: string
    classe: string
    voo: string
    saida: string
    chegada: string
    origem: string
    destino: string
    duracao: string
  }[]

  quartos: {
    nome: string
    vista: string
    cama: string
    tamanho: string
    incluso: string
  }[]
}