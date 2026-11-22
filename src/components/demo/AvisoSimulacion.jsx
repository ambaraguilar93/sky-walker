import { useSimulacion } from '../../hooks/useSimulacion'
import Boton from '../ui/Boton'

// Aviso visible bajo el header mientras hay una simulación de errores activa
function AvisoSimulacion() {
    const { activa, textoSimulacion, textoApi, desactivar } = useSimulacion()

    if (!activa) return null

    return (
        <div role="status" className="border-b border-amber-200 bg-amber-50">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-sm text-amber-900">
                <span>
                    ⚠️ Simulación activa: <strong>{textoSimulacion}</strong> · <strong>{textoApi}</strong>
                </span>
                <Boton variante="neutro" tamano="sm" onClick={desactivar} className="bg-white">
                    Desactivar
                </Boton>
            </div>
        </div>
    )
}

export default AvisoSimulacion