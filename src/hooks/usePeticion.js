import { useCallback, useEffect, useState } from 'react'

// Hook genérico para consultas REST.
// Maneja los estados cargando / error / datos con useState
// y lanza la consulta con useEffect cuando cambian sus dependencias.
export function usePeticion(obtener, invalidar, dependencias = []) {
    const [datos, setDatos] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const [intento, setIntento] = useState(0)

    useEffect(() => {
        let vigente = true // evita que una respuesta obsoleta actualice la vista
        setCargando(true)
        setError(null)

        obtener()
            .then((resultado) => {
                if (vigente) setDatos(resultado)
            })
            .catch((err) => {
                if (vigente) {
                    setDatos(null) // no se conservan datos de una consulta anterior
                    setError(err)
                }
            })
            .finally(() => {
                if (vigente) setCargando(false)
            })

        return () => {
            vigente = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencias, intento])

    // Invalida el caché y vuelve a consultar
    const reintentar = useCallback(() => {
        invalidar()
        setIntento((n) => n + 1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencias)

    return { datos, cargando, error, reintentar }
}