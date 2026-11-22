import { http, HttpResponse } from 'msw/http'
import { graphql } from 'msw/graphql'
import { destinos } from './data/destinos'
import { vuelos } from './data/vuelos'
import { hoteles } from './data/hoteles'
import { aplicarSimulacion } from './simulacionErrores'

// Backend simulado con MSW. Responde a la API REST (destinos) y a la API GraphQL
// (vuelos y hoteles por destino). Antes de responder revisa si hay un error simulado en la URL.

// ---------- API REST: destinos ----------
const handlersRest = [
    // Listar todos los destinos
    http.get('/api/destinos', async () => {
        const simulada = await aplicarSimulacion('rest')
        if (simulada) return simulada

        return HttpResponse.json(destinos)
    }),

    // Obtener un destino por id
    http.get('/api/destinos/:id', async ({ params }) => {
        const simulada = await aplicarSimulacion('rest')
        if (simulada) return simulada

        const destino = destinos.find((d) => d.id === params.id)
        if (!destino) {
            return HttpResponse.json(
                { mensaje: `No existe el destino "${params.id}"` },
                { status: 404 }
            )
        }
        return HttpResponse.json(destino)
    }),
]

// ---------- API GraphQL: vuelos y hoteles ----------
const apiGraphql = graphql.link('/graphql')

// __typename permite que el caché de Apollo identifique cada objeto.
const handlersGraphql = [
    apiGraphql.query('VuelosPorDestino', async ({ variables }) => {
        const simulada = await aplicarSimulacion('graphql')
        if (simulada) return simulada

        const resultado = vuelos
            .filter((v) => v.destinoId === variables.destinoId)
            .map((v) => ({ __typename: 'Vuelo', ...v }))

        return HttpResponse.json({ data: { vuelos: resultado } })
    }),

    apiGraphql.query('HotelesPorDestino', async ({ variables }) => {
        const simulada = await aplicarSimulacion('graphql')
        if (simulada) return simulada

        const resultado = hoteles
            .filter((h) => h.destinoId === variables.destinoId)
            .map((h) => ({ __typename: 'Hotel', ...h }))

        return HttpResponse.json({ data: { hoteles: resultado } })
    }),
]

export const handlers = [...handlersRest, ...handlersGraphql]