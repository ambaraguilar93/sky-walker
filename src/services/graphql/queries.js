import { gql } from '@apollo/client'

export const VUELOS_POR_DESTINO = gql`
  query VuelosPorDestino($destinoId: ID!) {
    vuelos(destinoId: $destinoId) {
      id
      destinoId
      aerolinea
      origen
      fechaSalida
      fechaRegreso
      precio
      asientosDisponibles
    }
  }
`

export const HOTELES_POR_DESTINO = gql`
  query HotelesPorDestino($destinoId: ID!) {
    hoteles(destinoId: $destinoId) {
      id
      destinoId
      nombre
      estrellas
      precioNoche
      disponibleDesde
      disponibleHasta
      habitacionesDisponibles
    }
  }
`