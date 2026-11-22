import { NetworkStatus } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import { HOTELES_POR_DESTINO } from '../../services/graphql/queries'
import { useViajeStore } from '../../store/useViajeStore'
import SeccionOpciones from './SeccionOpciones'
import TarjetaHotel from './TarjetaHotel'
import BotonSeleccion from '../viaje/BotonSeleccion'
import ConfirmarCambioDestino from '../viaje/ConfirmarCambioDestino'
import { useConfirmarCambioDestino } from '../../hooks/useConfirmarCambioDestino'

// Consulta GraphQL de los hoteles del destino seleccionado
function OpcionesHoteles({ destino }) {
    const { data, error, networkStatus, refetch } = useQuery(HOTELES_POR_DESTINO, {
        variables: { destinoId: destino.id },
        // muestra "cargando" también al actualizar
        notifyOnNetworkStatusChange: true,
    })

    // Estado global con Zustand
    const hotelElegido = useViajeStore((estado) => estado.hotel)
    const elegirHotel = useViajeStore((estado) => estado.elegirHotel)
    const quitarHotel = useViajeStore((estado) => estado.quitarHotel)
    const { ejecutarOConfirmar, confirmacion } = useConfirmarCambioDestino(destino)

    const cargando = networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch
    // refetch devuelve una promesa, el error ya se muestra en la vista
    const actualizar = () => refetch().catch(() => { })

    return (
        <>
            <SeccionOpciones
                titulo="Hoteles"
                icono="🏨"
                cargando={cargando}
                error={error}
                elementos={data?.hoteles ?? []}
                onActualizar={actualizar}
                textoVacio="No hay hoteles disponibles para este destino"
                renderElemento={(hotel) => (
                    <TarjetaHotel
                        hotel={hotel}
                        accion={
                            <BotonSeleccion
                                seleccionado={hotelElegido?.id === hotel.id}
                                disponible={hotel.habitacionesDisponibles > 0}
                                onAgregar={() => ejecutarOConfirmar(() => elegirHotel(destino, hotel))}
                                onQuitar={quitarHotel}
                            />
                        }
                    />
                )}
            />
            <ConfirmarCambioDestino {...confirmacion} />
        </>
    )
}

export default OpcionesHoteles