import { useViajeStore, contarElementos } from '../../store/useViajeStore'

// Contador de opciones guardadas en Mi viaje.
function ContadorViaje() {
    const vuelo = useViajeStore((estado) => estado.vuelo)
    const hotel = useViajeStore((estado) => estado.hotel)
    const cantidad = contarElementos(vuelo, hotel)

    if (cantidad === 0) return null

    return (
        <span
            className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-xs font-bold text-slate-900"
            aria-label={`${cantidad} ${cantidad === 1 ? 'opción guardada' : 'opciones guardadas'}`}
        >
            {cantidad}
        </span>
    )
}

export default ContadorViaje