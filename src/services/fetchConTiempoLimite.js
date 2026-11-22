import { TIEMPO_LIMITE_MS } from '../constants/config'
import { ErrorApi } from './errores'
import { TIPOS_ERROR } from '../constants/mensajesError'

// Función asíncrona que envuelve fetch y le agrega un tiempo límite con AbortController.
// Si la petición tarda más de lo permitido se cancela, y los fallos se convierten en ErrorApi (TIEMPO o RED).
export async function fetchConTiempoLimite(url, opciones = {}, tiempoLimiteMs = TIEMPO_LIMITE_MS) {
    const controlador = new AbortController()
    let expiro = false

    const temporizador = setTimeout(() => {
        expiro = true
        controlador.abort()
    }, tiempoLimiteMs)

    // Si quien llama cancela, también cancelamos nuestra petición
    const senalExterna = opciones.signal
    const cancelarDesdeAfuera = () => controlador.abort()
    if (senalExterna) {
        if (senalExterna.aborted) controlador.abort()
        else senalExterna.addEventListener('abort', cancelarDesdeAfuera, { once: true })
    }

    try {
        return await fetch(url, { ...opciones, signal: controlador.signal })
    } catch (error) {
        if (expiro) {
            throw new ErrorApi(TIPOS_ERROR.TIEMPO, `Tiempo límite de ${tiempoLimiteMs} ms superado`)
        }
        if (error.name === 'AbortError') throw error // cancelación intencional
        throw new ErrorApi(TIPOS_ERROR.RED, error.message)
    } finally {
        clearTimeout(temporizador)
        senalExterna?.removeEventListener('abort', cancelarDesdeAfuera)
    }
}