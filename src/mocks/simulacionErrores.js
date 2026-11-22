import { HttpResponse, delay } from 'msw'

// Módulo para demostraciones y pruebas: permite simular fallos
// sin modificar la capa de servicios.

// mayor al tiempo límite de la app
const DEMORA_LENTA_MS = 15000

function leerParametros() {
    const parametros = new URLSearchParams(window.location.search)
    return { simular: parametros.get('simular'), api: parametros.get('api') }
}

// Devuelve una respuesta simulada o undefined si no hay que simular nada
export async function aplicarSimulacion(tipoApi) {
    const { simular, api } = leerParametros()
    if (!simular) return undefined
    if (api && api !== tipoApi) return undefined

    switch (simular) {
        case '404':
            return HttpResponse.json({ mensaje: 'Recurso no encontrado (simulado)' }, { status: 404 })
        case '500':
            return HttpResponse.json({ mensaje: 'Error interno (simulado)' }, { status: 500 })
        case 'red':
            return HttpResponse.error()
        case 'lento':
            await delay(DEMORA_LENTA_MS)
            return undefined
        case 'json':
            return new HttpResponse('{ "datos": ', { headers: { 'Content-Type': 'application/json' } })
        case 'graphql':
            if (tipoApi !== 'graphql') return undefined
            return HttpResponse.json({ errors: [{ message: 'Error de GraphQL (simulado)' }] })
        default:
            return undefined
    }
}