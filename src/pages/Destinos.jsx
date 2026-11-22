import { useMemo, useState } from 'react'
import { useDestinos } from '../hooks/useDestinos'
import { useTituloPagina } from '../hooks/useTituloPagina'
import ListaDestinos from '../components/destinos/ListaDestinos'
import FiltroDestinos from '../components/destinos/FiltroDestinos'
import Cargando from '../components/ui/Cargando'
import MensajeError from '../components/ui/MensajeError'
import EstadoVacio from '../components/ui/EstadoVacio'
import Boton from '../components/ui/Boton'

// Normaliza texto para buscar sin importar mayúsculas ni tildes
const normalizar = (texto) => texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

function Destinos() {
    useTituloPagina('Destinos')
    const { destinos, cargando, error, reintentar } = useDestinos()
    const [busqueda, setBusqueda] = useState('')
    const [pais, setPais] = useState('')

    const paises = useMemo(
        () => [...new Set(destinos.map((d) => d.pais))].sort((a, b) => a.localeCompare(b, 'es')),
        [destinos]
    )

    const destinosFiltrados = useMemo(() => {
        const termino = normalizar(busqueda.trim())
        return destinos.filter((destino) => {
            const coincidePais = !pais || destino.pais === pais
            const textoDestino = normalizar(
                [destino.nombre, destino.pais, destino.descripcion, ...destino.actividades].join(' ')
            )
            return coincidePais && (!termino || textoDestino.includes(termino))
        })
    }, [destinos, busqueda, pais])

    const limpiarFiltros = () => {
        setBusqueda('')
        setPais('')
    }

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-sky-800">Destinos</h1>
                <p className="mt-1 text-slate-600">Elige un destino para ver sus vuelos y hoteles disponibles.</p>
            </header>

            {cargando && <Cargando texto="Cargando destinos..." />}

            {error && (
                <MensajeError
                    error={error}
                    titulo="No pudimos cargar los destinos"
                    acciones={[{ texto: 'Reintentar', onClick: reintentar }]}
                />
            )}

            {!cargando && !error && (
                <>
                    <FiltroDestinos
                        busqueda={busqueda}
                        onBusquedaChange={setBusqueda}
                        pais={pais}
                        onPaisChange={setPais}
                        paises={paises}
                    />

                    <p className="text-sm text-slate-500" aria-live="polite">
                        {destinosFiltrados.length} de {destinos.length} destinos
                    </p>

                    {destinosFiltrados.length > 0 ? (
                        <ListaDestinos destinos={destinosFiltrados} />
                    ) : (
                        <EstadoVacio titulo="No encontramos destinos con esos filtros" descripcion="Prueba con otra búsqueda o país.">
                            <Boton onClick={limpiarFiltros}>Limpiar filtros</Boton>
                        </EstadoVacio>
                    )}
                </>
            )}
        </div>
    )
}

export default Destinos