import { HotelData } from "./hotel"

export interface BudgetsData {
  numeroorc: string
  hoteis: HotelData[]
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