import Disponibilidad from '../ui/Disponibilidad'
import { formatoFecha, formatoPrecio } from '../../utils/formato'

// Tarjeta de un hotel con datos GraphQL.
function TarjetaHotel({ hotel, accion }) {
    return (
        <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h4 className="font-semibold text-slate-800">🏨 {hotel.nombre}</h4>
                    <p className="text-sm text-amber-500" aria-label={`${hotel.estrellas} estrellas`}>
                        {'★'.repeat(hotel.estrellas)}
                        <span className="text-slate-300">{'★'.repeat(5 - hotel.estrellas)}</span>
                    </p>
                </div>
                <Disponibilidad cantidad={hotel.habitacionesDisponibles} unidad="habitaciones" />
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                    <dt className="text-slate-500">Disponible desde</dt>
                    <dd className="font-medium">{formatoFecha(hotel.disponibleDesde)}</dd>
                </div>
                <div>
                    <dt className="text-slate-500">Hasta</dt>
                    <dd className="font-medium">{formatoFecha(hotel.disponibleHasta)}</dd>
                </div>
            </dl>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-lg font-bold text-sky-700">
                    {formatoPrecio(hotel.precioNoche)} <span className="text-xs font-normal text-slate-500">por noche</span>
                </p>
                {accion}
            </div>
        </article>
    )
}

export default TarjetaHotel