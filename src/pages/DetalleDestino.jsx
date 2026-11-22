import { Link, useNavigate, useParams } from 'react-router'
import { useDestino } from '../hooks/useDestino'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { RUTAS } from '../constants/rutas'
import { clasificarError } from '../services/errores'
import Cargando from '../components/ui/Cargando'
import MensajeError from '../components/ui/MensajeError'
import OpcionesVuelos from '../components/opciones/OpcionesVuelos'
import OpcionesHoteles from '../components/opciones/OpcionesHoteles'
import AvisoCambioDestino from '../components/viaje/AvisoCambioDestino'

function DetalleDestino() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { destino, cargando, error, reintentar } = useDestino(id)
    useTituloPagina(destino?.nombre ?? 'Destino')

    if (cargando) return <Cargando texto="Cargando destino..." />

    if (error) {
        const noExiste = clasificarError(error).status === 404
        const volver = { texto: 'Volver a destinos', onClick: () => navigate(RUTAS.DESTINOS) }
        return (
            <MensajeError
                error={error}
                titulo={noExiste ? 'Destino no encontrado' : 'No pudimos cargar el destino'}
                acciones={noExiste ? [volver] : [{ texto: 'Reintentar', onClick: reintentar }, volver]}
            />
        )
    }

    if (!destino) return null

    return (
        <div className="space-y-8">
            <Link to={RUTAS.DESTINOS} className="text-sm font-medium text-sky-700 hover:underline">
                ← Volver a destinos
            </Link>

            {/* Información del destino (REST) */}
            <section className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center">
                <div
                    className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-sky-300 text-6xl"
                    aria-hidden="true"
                >
                    {destino.emoji}
                </div>
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">{destino.pais}</p>
                    <h1 className="text-3xl font-bold text-slate-800">{destino.nombre}</h1>
                    <p className="mt-1 text-slate-600">{destino.descripcion}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                        {destino.actividades.map((actividad) => (
                            <li key={actividad} className="rounded-full bg-sky-50 px-3 py-1 text-sm text-sky-800 ring-1 ring-sky-100">
                                {actividad}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <AvisoCambioDestino destinoId={destino.id} />

            {/* Opciones de viaje (GraphQL) */}
            <div className="grid gap-8 lg:grid-cols-2">
                <OpcionesVuelos destino={destino} />
                <OpcionesHoteles destino={destino} />
            </div>
        </div>
    )
}

export default DetalleDestino