import { NavLink } from 'react-router'
import { useDestinos } from '../../hooks/useDestinos'
import { rutaDetalleDestino } from '../../constants/rutas'
import Cargando from '../ui/Cargando'
import MensajeError from '../ui/MensajeError'

// Menú secundario con accesos directos a cada destino (datos de la API REST).
function BarraDestinos() {
    const { destinos, cargando, error, reintentar } = useDestinos()

    return (
        <nav aria-label="Accesos rápidos a destinos" className="border-b border-sky-100 bg-sky-50">
            <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto px-4 py-2">
                <span className="shrink-0 text-sm font-semibold text-sky-800">Destinos:</span>

                {cargando && <Cargando texto="Cargando destinos..." compacto />}

                {error && (
                    <MensajeError
                        error={error}
                        compacto
                        acciones={[{ texto: 'Recargar', onClick: reintentar }]}
                    />
                )}

                {!cargando && !error && (
                    <ul className="flex gap-2">
                        {destinos.map((destino) => (
                            <li key={destino.id} className="shrink-0">
                                <NavLink
                                    to={rutaDetalleDestino(destino.id)}
                                    className={({ isActive }) =>
                                        `block rounded-full px-3 py-1 text-sm transition ${isActive
                                            ? 'bg-sky-600 text-white'
                                            : 'bg-white text-sky-800 ring-1 ring-sky-200 hover:bg-sky-100'
                                        }`
                                    }
                                >
                                    {destino.emoji} {destino.nombre}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default BarraDestinos