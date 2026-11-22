import { CACHE_TTL_MS, CACHE_MAX_ENTRADAS } from '../../constants/config'

// Función que crea un caché de promesas en memoria, cada entrada se guarda por clave,
// tiene un tiempo de vida (TTL), hay un máximo de entradas y se puede invalidar manualmente.
export function crearCachePromesas({ ttlMs = CACHE_TTL_MS, maxEntradas = CACHE_MAX_ENTRADAS } = {}) {
    const entradas = new Map()

    function obtener(clave, crearPromesa) {
        const entrada = entradas.get(clave)

        if (entrada && entrada.expiraEn > Date.now()) {
            return entrada.promesa
        }
        if (entrada) entradas.delete(clave)

        const promesa = crearPromesa()
        entradas.set(clave, { promesa, expiraEn: Date.now() + ttlMs })

        // Map mantiene el orden de inserción, la primera es la más antigua
        if (entradas.size > maxEntradas) {
            const claveMasAntigua = entradas.keys().next().value
            entradas.delete(claveMasAntigua)
        }

        // Si falla, se elimina si la entrada sigue siendo esta misma promesa
        promesa.catch(() => {
            if (entradas.get(clave)?.promesa === promesa) entradas.delete(clave)
        })

        return promesa
    }

    function invalidar(clave) {
        entradas.delete(clave)
    }

    function limpiar() {
        entradas.clear()
    }

    return { obtener, invalidar, limpiar }
}