import { mensajeDeError } from '../../services/errores'
import Boton from './Boton'

// Muestra un error comprensible y las acciones de recuperación disponibles.
function MensajeError({ error, titulo = 'Algo salió mal', acciones = [], compacto = false }) {
    if (compacto) {
        return (
            <div role="alert" className="flex flex-wrap items-center gap-2 text-sm text-red-700">
                <span>⚠️ {mensajeDeError(error)}</span>
                {acciones.map((accion) => (
                    <button
                        key={accion.texto}
                        type="button"
                        onClick={accion.onClick}
                        className="rounded-md border border-red-300 bg-white px-2 py-0.5 font-medium hover:bg-red-50"
                    >
                        {accion.texto}
                    </button>
                ))}
            </div>
        )
    }

    return (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-lg font-semibold text-red-800">{titulo}</p>
            <p className="mt-1 text-red-700">{mensajeDeError(error)}</p>
            {acciones.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                    {acciones.map((accion) => (
                        <Boton key={accion.texto} variante="peligro" onClick={accion.onClick}>
                            {accion.texto}
                        </Boton>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MensajeError