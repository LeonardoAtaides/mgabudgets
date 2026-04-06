export interface HotelData {
  dataInicio: string
  dataFim: string
  hotel: string
  cidade: string
  estrelas: number
  imagens: string[]
  beneficios: string[]
  infoadc: string[]

  // Valores Hotel
  valorAereo: number
  pacote: "Valor total por pessoa" | "Valor total do pacote"
  parcelas: number
}