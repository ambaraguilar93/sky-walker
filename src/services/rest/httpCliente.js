import { API_REST_URL } from '../../constants/config'
import { TIPOS_ERROR } from '../../constants/mensajesError'
import { ErrorApi } from '../errores'
import { fetchConTiempoLimite } from '../fetchConTiempoLimite'

// Hace un GET a la API REST y devuelve el JSON.
export async function obtenerJson(ruta, opciones = {}) {
    const respuesta = await fetchConTiempoLimite(`${API_REST_URL}${ruta}`, opciones)

    if (!respuesta.ok) {
        throw new ErrorApi(TIPOS_ERROR.HTTP, `HTTP ${respuesta.status} en ${ruta}`, respuesta.status)
    }

    try {
        return await respuesta.json()
    } catch {
        throw new ErrorApi(TIPOS_ERROR.DATOS, `JSON inválido en ${ruta}`)
    }
}