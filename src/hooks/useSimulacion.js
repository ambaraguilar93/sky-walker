import { OPCIONES_SIMULACION, OPCIONES_API } from '../constants/simulacion'

// Lee la simulación activa desde la URL y permite cambiarla.
export function useSimulacion() {
    const parametros = new URLSearchParams(window.location.search)
    const simular = parametros.get('simular') ?? ''
    const api = parametros.get('api') ?? ''

    const aplicar = (nuevoSimular, nuevaApi = '') => {
        const url = new URL(window.location.href)
        url.searchParams.delete('simular')
        url.searchParams.delete('api')
        if (nuevoSimular) url.searchParams.set('simular', nuevoSimular)
        if (nuevoSimular && nuevaApi) url.searchParams.set('api', nuevaApi)
        window.location.assign(url.toString())
    }

    const textoSimulacion = OPCIONES_SIMULACION.find((o) => o.valor === simular)?.texto ?? simular
    const textoApi = OPCIONES_API.find((o) => o.valor === api)?.texto ?? api

    return {
        simular,
        api,
        activa: simular !== '',
        textoSimulacion,
        textoApi,
        aplicar,
        desactivar: () => aplicar(''),
    }
}