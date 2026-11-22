import { obtenerJson } from './httpCliente'
import { crearCachePromesas } from '../cache/cachePromesas'

const cache = crearCachePromesas()

const CLAVE_LISTA = 'destinos'
const claveDestino = (id) => `destino:${id}`

export function obtenerDestinos() {
    return cache.obtener(CLAVE_LISTA, () => obtenerJson('/destinos'))
}

export function obtenerDestino(id) {
    return cache.obtener(claveDestino(id), () => obtenerJson(`/destinos/${encodeURIComponent(id)}`))
}

export function invalidarDestinos() {
    cache.invalidar(CLAVE_LISTA)
}

export function invalidarDestino(id) {
    cache.invalidar(claveDestino(id))
}