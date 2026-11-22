import { usePeticion } from './usePeticion'
import { obtenerDestino, invalidarDestino } from '../services/rest/destinosService'

// Hook que trae un destino por su id (API REST).
// Vuelve a consultar cuando cambia el id y devuelve null mientras no hay datos.
export function useDestino(id) {
    const { datos, cargando, error, reintentar } = usePeticion(
        () => obtenerDestino(id),
        () => invalidarDestino(id),
        [id]
    )
    return { destino: datos, cargando, error, reintentar }
}