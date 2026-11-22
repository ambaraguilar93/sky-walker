import { useState } from 'react'
import { useViajeStore } from '../store/useViajeStore'

// Si existe otro destino, pide confirmación antes de ejecutar la acción.
export function useConfirmarCambioDestino(destino) {
    const destinoViaje = useViajeStore((estado) => estado.destino)
    const [accionPendiente, setAccionPendiente] = useState(null)

    const ejecutarOConfirmar = (accion) => {
        if (destinoViaje && destinoViaje.id !== destino.id) {
            // se guarda la función para ejecutarla al confirmar
            setAccionPendiente(() => accion)
        } else {
            accion()
        }
    }

    const confirmar = () => {
        accionPendiente?.()
        setAccionPendiente(null)
    }

    const cancelar = () => setAccionPendiente(null)

    return {
        ejecutarOConfirmar,
        confirmacion: {
            abierta: accionPendiente !== null,
            destinoActual: destinoViaje,
            destinoNuevo: destino,
            confirmar,
            cancelar,
        },
    }
}