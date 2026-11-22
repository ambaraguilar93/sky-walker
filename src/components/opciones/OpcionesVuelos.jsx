import { NetworkStatus } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { VUELOS_POR_DESTINO } from '../../services/graphql/queries'
import { useViajeStore } from '../../store/useViajeStore'
import SeccionOpciones from './SeccionOpciones'
import TarjetaVuelo from './TarjetaVuelo'
import BotonSeleccion from '../viaje/BotonSeleccion'
import ConfirmarCambioDestino from '../viaje/ConfirmarCambioDestino'
import { useConfirmarCambioDestino } from '../../hooks/useConfirmarCambioDestino'

// Consulta GraphQL de los vuelos del destino seleccionado
function OpcionesVuelos({ destino }) {
    const { data, error, networkStatus, refetch } = useQuery(VUELOS_POR_DESTINO, {
        variables: { destinoId: destino.id },
        notifyOnNetworkStatusChange: true, // muestra "cargando" también al actualizar
    })

    // Estado global con Zustand
    const vueloElegido = useViajeStore((estado) => estado.vuelo)
    const elegirVuelo = useViajeStore((estado) => estado.elegirVuelo)
    const quitarVuelo = useViajeStore((estado) => estado.quitarVuelo)
    const { ejecutarOConfirmar, confirmacion } = useConfirmarCambioDestino(destino)

    const cargando = networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch
    // refetch devuelve una promesa, el error ya se muestra en la vista
    const actualizar = () => refetch().catch(() => { })

    return (
        <>
            <SeccionOpciones
                titulo="Vuelos"
                icono="✈️"
                cargando={cargando}
                error={error}
                elementos={data?.vuelos ?? []}
                onActualizar={actualizar}
                textoVacio="No hay vuelos disponibles para este destino"
                renderElemento={(vuelo) => (
                    <TarjetaVuelo
                        vuelo={vuelo}
                        accion={
                            <BotonSeleccion
                                seleccionado={vueloElegido?.id === vuelo.id}
                                disponible={vuelo.asientosDisponibles > 0}
                                onAgregar={() => ejecutarOConfirmar(() => elegirVuelo(destino, vuelo))}
                                onQuitar={quitarVuelo}
                            />
                        }
                    />
                )}
            />
            <ConfirmarCambioDestino {...confirmacion} />
        </>
    )
}

export default OpcionesVuelos