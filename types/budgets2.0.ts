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
  dataAereoIni: string
  dataAereoFim: string
  aeroportoSaida: string
  aeroportoChegada: string


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