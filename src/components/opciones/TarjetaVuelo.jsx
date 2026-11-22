import Disponibilidad from '../ui/Disponibilidad'
import { formatoFecha, formatoPrecio } from '../../utils/formato'

// Tarjeta de un vuelo con datos GraphQL.
function TarjetaVuelo({ vuelo, accion }) {
    return (
        <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h4 className="font-semibold text-slate-800">✈️ {vuelo.aerolinea}</h4>
                    <p className="text-sm text-slate-500">Desde {vuelo.origen}</p>
                </div>
                <Disponibilidad cantidad={vuelo.asientosDisponibles} unidad="asientos" />
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                    <dt className="text-slate-500">Ida</dt>
                    <dd className="font-medium">{formatoFecha(vuelo.fechaSalida)}</dd>
                </div>
                <div>
                    <dt className="text-slate-500">Regreso</dt>
                    <dd className="font-medium">{formatoFecha(vuelo.fechaRegreso)}</dd>
                </div>
            </dl>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-lg font-bold text-sky-700">
                    {formatoPrecio(vuelo.precio)} <span className="text-xs font-normal text-slate-500">ida y vuelta</span>
                </p>
                {accion}
            </div>
        </article>
    )
}

export default TarjetaVuelo