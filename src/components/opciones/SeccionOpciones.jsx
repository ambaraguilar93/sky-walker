import Cargando from '../ui/Cargando'
import MensajeError from '../ui/MensajeError'
import EstadoVacio from '../ui/EstadoVacio'
import Boton from '../ui/Boton'

// Estructura para las secciones de vuelos y hoteles
function SeccionOpciones({ titulo, icono, cargando, error, elementos, onActualizar, textoVacio, renderElemento }) {
    return (
        <section aria-labelledby={`titulo-${titulo}`} className="space-y-3">
            <div className="flex items-center justify-between gap-2">
                <h2 id={`titulo-${titulo}`} className="text-xl font-bold text-slate-800">
                    {icono} {titulo}
                </h2>
                <Boton variante="secundario" tamano="sm" onClick={onActualizar} disabled={cargando}>
                    ↻ Actualizar disponibilidad
                </Boton>
            </div>

            {cargando && <Cargando texto={`Buscando ${titulo.toLowerCase()}...`} />}

            {!cargando && error && (
                <MensajeError
                    error={error}
                    titulo={`No pudimos cargar los ${titulo.toLowerCase()}`}
                    acciones={[{ texto: 'Reintentar', onClick: onActualizar }]}
                />
            )}

            {!cargando && !error && elementos.length === 0 && (
                <EstadoVacio icono="🗓️" titulo={textoVacio} descripcion="Prueba con otro destino o vuelve más adelante." />
            )}

            {!cargando && !error && elementos.length > 0 && (
                <ul className="space-y-3">
                    {elementos.map((elemento) => (
                        <li key={elemento.id}>{renderElemento(elemento)}</li>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default SeccionOpciones