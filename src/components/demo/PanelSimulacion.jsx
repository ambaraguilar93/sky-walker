import { useState } from 'react'
import { useSimulacion } from '../../hooks/useSimulacion'
import { OPCIONES_SIMULACION, OPCIONES_API } from '../../constants/simulacion'
import Boton from '../ui/Boton'

// Demostración que permite simular errores de las APIs sin escribir la URL a mano.
// Se muestra plegado en el footer para no molestar al usuario.
function PanelSimulacion() {
    const { simular, api, aplicar, desactivar } = useSimulacion()
    const [apiElegida, setApiElegida] = useState(api)

    const elegir = (valor) => aplicar(valor, valor === 'graphql' ? 'graphql' : apiElegida)

    return (
        <details className="mx-auto mt-3 max-w-xl text-left" open={simular !== ''}>
            <summary className="cursor-pointer text-center font-medium text-slate-600 hover:text-slate-800">
                🧪 Simular errores (demo)
            </summary>

            <div className="mt-3 space-y-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="flex items-center gap-2">
                    <label htmlFor="api-simulacion" className="text-slate-700">Afectar a:</label>
                    <select
                        id="api-simulacion"
                        value={apiElegida}
                        onChange={(e) => setApiElegida(e.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-2 py-1"
                    >
                        {OPCIONES_API.map((opcion) => (
                            <option key={opcion.valor} value={opcion.valor}>{opcion.texto}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Boton variante={simular === '' ? 'primario' : 'neutro'} tamano="sm" onClick={desactivar}>
                        Sin errores
                    </Boton>
                    {OPCIONES_SIMULACION.map((opcion) => (
                        <Boton
                            key={opcion.valor}
                            variante={simular === opcion.valor ? 'primario' : 'neutro'}
                            tamano="sm"
                            onClick={() => elegir(opcion.valor)}
                        >
                            {opcion.texto}
                        </Boton>
                    ))}
                </div>
            </div>
        </details>
    )
}

export default PanelSimulacion