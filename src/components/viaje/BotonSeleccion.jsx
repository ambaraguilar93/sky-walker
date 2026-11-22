import Boton from '../ui/Boton'

// Botón para agregar o quitar una opción de Mi viaje
function BotonSeleccion({ seleccionado, disponible, onAgregar, onQuitar }) {
    if (seleccionado) {
        return (
            <Boton variante="exito" tamano="sm" onClick={onQuitar} aria-pressed="true" title="Quitar de mi viaje">
                ✓ En mi viaje
            </Boton>
        )
    }

    return (
        <Boton tamano="sm" onClick={onAgregar} disabled={!disponible} aria-pressed="false">
            {disponible ? '+ Agregar a mi viaje' : 'Sin disponibilidad'}
        </Boton>
    )
}

export default BotonSeleccion