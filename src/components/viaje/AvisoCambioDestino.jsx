import { Link } from 'react-router'
import { useViajeStore } from '../../store/useViajeStore'
import { RUTAS } from '../../constants/rutas'

// Avisa cuando Mi viaje ya tiene opciones de otro destino
function AvisoCambioDestino({ destinoId }) {
    const destinoViaje = useViajeStore((estado) => estado.destino)

    if (!destinoViaje || destinoViaje.id === destinoId) return null

    return (
        <div role="note" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Tu viaje actual es a <strong>{destinoViaje.emoji} {destinoViaje.nombre}</strong>. Si agregas un vuelo u hotel de
            este destino, tu viaje anterior se reemplazará.{' '}
            <Link to={RUTAS.MI_VIAJE} className="font-semibold underline">Ver mi viaje</Link>
        </div>
    )
}

export default AvisoCambioDestino