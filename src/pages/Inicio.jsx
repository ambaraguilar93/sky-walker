import { Link } from 'react-router'
import { useDestinos } from '../hooks/useDestinos'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { RUTAS } from '../constants/rutas'
import ListaDestinos from '../components/destinos/ListaDestinos'
import Cargando from '../components/ui/Cargando'
import MensajeError from '../components/ui/MensajeError'

const PASOS = [
    { icono: '🌎', titulo: 'Elige un destino', texto: 'Explora destinos con su país y actividades populares.' },
    { icono: '✈️', titulo: 'Compara opciones', texto: 'Revisa vuelos y hoteles con precios, fechas y disponibilidad.' },
    { icono: '🧳', titulo: 'Arma tu viaje', texto: 'Guarda tu vuelo y hotel favoritos en "Mi viaje".' },
]

function Inicio() {
    useTituloPagina('')
    const { destinos, cargando, error, reintentar } = useDestinos()
    const destacados = destinos.filter((destino) => destino.destacado)

    return (
        <div className="space-y-12">
            {/* Portada */}
            <section className="rounded-3xl bg-gradient-to-br from-sky-600 to-sky-400 px-6 py-12 text-center text-white shadow sm:px-12">
                <h1 className="text-3xl font-extrabold sm:text-5xl">Tu próximo viaje empieza aquí</h1>
                <p className="mx-auto mt-4 max-w-2xl text-sky-50 sm:text-lg">
                    En Sky Walker encuentras destinos, vuelos y hoteles en un solo lugar para planificar tu viaje paso a paso.
                </p>
                <Link
                    to={RUTAS.DESTINOS}
                    className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-sky-700 shadow hover:bg-sky-50"
                >
                    Explorar destinos
                </Link>
            </section>

            {/* Cómo funciona */}
            <section aria-labelledby="titulo-como-funciona">
                <h2 id="titulo-como-funciona" className="text-2xl font-bold text-slate-800">¿Cómo funciona?</h2>
                <ol className="mt-4 grid gap-4 sm:grid-cols-3">
                    {PASOS.map((paso, indice) => (
                        <li key={paso.titulo} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                            <p className="text-3xl">{paso.icono}</p>
                            <p className="mt-2 font-semibold text-slate-800">{indice + 1}. {paso.titulo}</p>
                            <p className="mt-1 text-sm text-slate-600">{paso.texto}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Destinos destacados (REST) */}
            <section aria-labelledby="titulo-destacados">
                <h2 id="titulo-destacados" className="mb-4 text-2xl font-bold text-slate-800">Destinos destacados</h2>
                {cargando && <Cargando texto="Cargando destinos destacados..." />}
                {error && (
                    <MensajeError
                        error={error}
                        titulo="No pudimos cargar los destinos"
                        acciones={[{ texto: 'Reintentar', onClick: reintentar }]}
                    />
                )}
                {!cargando && !error && <ListaDestinos destinos={destacados} />}
            </section>
        </div>
    )
}

export default Inicio