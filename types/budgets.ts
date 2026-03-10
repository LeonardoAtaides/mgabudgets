export interface BudgetsData {
  destino: string
  periodo: string
  hotel: string
  valorTotal: string
  moeda: "BRL" | "USD"
  descricaoHotel: string
  descricaoInfo: string
  descricaoExtra: string
  beneficios: string[]
  mostrarResumo: boolean
  mostrarInfo: boolean
  imagens: string[]  
  viajantes: string
  regime: string

  voos: {
    cia: string
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