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

  cidadeSaida: string
  cidadeChegada: string
  valorAereo: number
  dataAereoIni: string
  dataAereoFim: string
  aeroportoSaida: string
  aeroportoChegada: string
  pacote: "Valor total por pessoa" | "Valor total do pacote"
  parcelas: number
// -------------------------------------//

// Informações
  infoadd: string[]
  validadeorc: string

// Modais
  mostrarOu: boolean
  ouIndex: number | null
  mostrarInfo: boolean
  mostrarformapag: boolean
   




}