import { Link, useLocation } from 'react-router'
import { RUTAS } from '../constants/rutas'
import { useTituloPagina } from '../hooks/useTituloPagina'

// Página 404 para rutas que no existen
function NoEncontrada() {
    useTituloPagina('Página no encontrada')
    const { pathname } = useLocation()

    return (
        <section className="py-16 text-center">
            <p className="text-6xl">🧭</p>
            <h1 className="mt-4 text-3xl font-bold text-sky-800">Página no encontrada</h1>
            <p className="mt-2 text-slate-600">
                La ruta <code className="rounded bg-slate-200 px-1">{pathname}</code> no existe en Sky Walker.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to={RUTAS.INICIO} className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700">
                    Ir al inicio
                </Link>
                <Link to={RUTAS.DESTINOS} className="rounded-lg px-4 py-2 font-medium text-sky-700 ring-1 ring-sky-300 hover:bg-sky-50">
                    Ver destinos
                </Link>
            </div>
        </section>
    )
}

export default NoEncontrada