export interface BudgetsData {
  destino: string
  periodo: string
  hotel: string
  valorTotal: number
  moeda: "BRL" | "USD"
  descricaoHotel: string
  beneficios: string[]

  imagens: string[]   // 👈 ADICIONE ISSO

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