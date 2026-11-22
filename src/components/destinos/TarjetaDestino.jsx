import { Link } from 'react-router'
import { rutaDetalleDestino } from '../../constants/rutas'

// Tarjeta con la información de un destino (datos REST)
function TarjetaDestino({ destino }) {
    return (
        <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex h-32 items-center justify-center bg-gradient-to-br from-sky-100 to-sky-300 text-6xl" aria-hidden="true">
                {destino.emoji}
            </div>

            <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">{destino.pais}</p>
                <h3 className="text-xl font-bold text-slate-800">{destino.nombre}</h3>
                <p className="mt-1 text-sm text-slate-600">{destino.descripcion}</p>

                <p className="mt-4 text-xs font-semibold text-slate-500">Actividades populares</p>
                <ul className="mt-1 flex flex-wrap gap-1.5">
                    {destino.actividades.map((actividad) => (
                        <li key={actividad} className="rounded-full bg-sky-50 px-2 py-0.5 text-xs text-sky-800 ring-1 ring-sky-100">
                            {actividad}
                        </li>
                    ))}
                </ul>

                <Link
                    to={rutaDetalleDestino(destino.id)}
                    className="mt-5 inline-block rounded-lg bg-sky-600 px-4 py-2 text-center font-medium text-white hover:bg-sky-700"
                >
                    Ver vuelos y hoteles
                </Link>
            </div>
        </article>
    )
}

export default TarjetaDestino