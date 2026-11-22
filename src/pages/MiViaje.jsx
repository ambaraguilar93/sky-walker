import { Link } from 'react-router'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { useViajeStore, calcularTotales } from '../store/useViajeStore'
import { RUTAS, rutaDetalleDestino } from '../constants/rutas'
import EstadoVacio from '../components/ui/EstadoVacio'
import TarjetaVuelo from '../components/opciones/TarjetaVuelo'
import TarjetaHotel from '../components/opciones/TarjetaHotel'
import CampoCantidad from '../components/viaje/CampoCantidad'
import ResumenCostos from '../components/viaje/ResumenCostos'
import Boton from '../components/ui/Boton'

// Bloque que se muestra cuando falta elegir vuelo u hotel
function OpcionPendiente({ texto, destinoId }) {
    return (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
            {texto}{' '}
            <Link to={rutaDetalleDestino(destinoId)} className="font-semibold text-sky-700 underline">
                Ver opciones
            </Link>
        </div>
    )
}

function MiViaje() {
    useTituloPagina('Mi viaje')

    // Estado global (Zustand + persist)
    const destino = useViajeStore((estado) => estado.destino)
    const vuelo = useViajeStore((estado) => estado.vuelo)
    const hotel = useViajeStore((estado) => estado.hotel)
    const pasajeros = useViajeStore((estado) => estado.pasajeros)
    const noches = useViajeStore((estado) => estado.noches)
    const quitarVuelo = useViajeStore((estado) => estado.quitarVuelo)
    const quitarHotel = useViajeStore((estado) => estado.quitarHotel)
    const cambiarPasajeros = useViajeStore((estado) => estado.cambiarPasajeros)
    const cambiarNoches = useViajeStore((estado) => estado.cambiarNoches)
    const vaciarViaje = useViajeStore((estado) => estado.vaciarViaje)

    if (!destino) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-sky-800">Mi viaje</h1>
                <EstadoVacio
                    icono="🧳"
                    titulo="Aún no has armado tu viaje"
                    descripcion="Elige un destino y agrega un vuelo y un hotel para verlos aquí."
                >
                    <Link to={RUTAS.DESTINOS} className="inline-block rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700">
                        Explorar destinos
                    </Link>
                </EstadoVacio>
            </div>
        )
    }

    const totales = calcularTotales({ vuelo, hotel, pasajeros, noches })

    return (
        <div className="space-y-6">
            <header className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-3xl font-bold text-sky-800">Mi viaje</h1>
                    <p className="mt-1 text-slate-600">
                        Destino: <strong>{destino.emoji} {destino.nombre}</strong>, {destino.pais}
                    </p>
                </div>
                <Boton variante="peligro" tamano="sm" onClick={vaciarViaje}>
                    Vaciar viaje
                </Boton>
            </header>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Opciones elegidas */}
                <div className="space-y-6 lg:col-span-2">
                    <section aria-labelledby="titulo-mi-vuelo" className="space-y-3">
                        <h2 id="titulo-mi-vuelo" className="text-xl font-bold text-slate-800">✈️ Vuelo</h2>
                        {vuelo ? (
                            <TarjetaVuelo
                                vuelo={vuelo}
                                accion={<Boton variante="peligro" tamano="sm" onClick={quitarVuelo}>Quitar</Boton>}
                            />
                        ) : (
                            <OpcionPendiente texto="Aún no eliges un vuelo." destinoId={destino.id} />
                        )}
                    </section>

                    <section aria-labelledby="titulo-mi-hotel" className="space-y-3">
                        <h2 id="titulo-mi-hotel" className="text-xl font-bold text-slate-800">🏨 Hotel</h2>
                        {hotel ? (
                            <TarjetaHotel
                                hotel={hotel}
                                accion={<Boton variante="peligro" tamano="sm" onClick={quitarHotel}>Quitar</Boton>}
                            />
                        ) : (
                            <OpcionPendiente texto="Aún no eliges un hotel." destinoId={destino.id} />
                        )}
                    </section>
                </div>

                {/* Ajustes y costos */}
                <aside className="space-y-4">
                    <section aria-labelledby="titulo-detalles" className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                        <h2 id="titulo-detalles" className="text-lg font-bold text-slate-800">Detalles</h2>
                        <CampoCantidad id="pasajeros" etiqueta="Pasajeros" valor={pasajeros} maximo={9} onCambiar={cambiarPasajeros} />
                        <CampoCantidad id="noches" etiqueta="Noches de hotel" valor={noches} maximo={30} onCambiar={cambiarNoches} />
                    </section>

                    <ResumenCostos vuelo={vuelo} hotel={hotel} pasajeros={pasajeros} noches={noches} {...totales} />
                </aside>
            </div>
        </div>
    )
}

export default MiViaje