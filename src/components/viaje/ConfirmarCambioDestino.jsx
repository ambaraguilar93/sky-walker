import ModalConfirmacion from '../ui/ModalConfirmacion'

// Modal que pregunta si se reemplaza el viaje actual por el nuevo destino
function ConfirmarCambioDestino({ abierta, destinoActual, destinoNuevo, confirmar, cancelar }) {
    return (
        <ModalConfirmacion
            abierto={abierta}
            titulo="¿Reemplazar tu viaje?"
            textoConfirmar={`Sí, cambiar a ${destinoNuevo.nombre}`}
            textoCancelar={`No, mantener ${destinoActual?.nombre ?? 'mi viaje'}`}
            onConfirmar={confirmar}
            onCancelar={cancelar}
        >
            {destinoActual && (
                <p>
                    Tu viaje actual es a <strong>{destinoActual.emoji} {destinoActual.nombre}</strong>. Si continúas, se
                    quitarán el vuelo y el hotel elegidos y tu viaje pasará a ser a{' '}
                    <strong>{destinoNuevo.emoji} {destinoNuevo.nombre}</strong>.
                </p>
            )}
        </ModalConfirmacion>
    )
}

export default ConfirmarCambioDestino