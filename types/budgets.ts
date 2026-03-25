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

// Dados Aéreo
 descricaodata: string
  voos: {
    cia: string
    numvoo: number
    saida: string
    chegada: string
    origem: string
    destino: string
    durcon: string
    esc: string
    equipe: string
    duracao: string
  }[]
  descricaoaereo: string
  valorAereo: number


  destino: string
  periodo: string
  valorTotal: string
  moeda: "R$" | "$"
  descricaoHotel: string
  descricaoInfo: string
  descricaoExtra: string
  
  mostrarResumo: boolean
  mostrarInfo: boolean
   
  viajantes: string
  regime: string
  valordesc: "pacote" | "pacote por pessoa"



  quartos: {
    nome: string
    vista: string
    cama: string
    tamanho: string
    incluso: string
  }[]
}