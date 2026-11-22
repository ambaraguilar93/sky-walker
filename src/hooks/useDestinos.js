import { usePeticion } from './usePeticion'
import { obtenerDestinos, invalidarDestinos } from '../services/rest/destinosService'

// Hook que trae la lista completa de destinos (API REST).
// Se consulta una sola vez al montar (sin dependencias) y devuelve [] mientras no hay datos.
export function useDestinos() {
    const { datos, cargando, error, reintentar } = usePeticion(obtenerDestinos, invalidarDestinos, [])
    return { destinos: datos ?? [], cargando, error, reintentar }
}