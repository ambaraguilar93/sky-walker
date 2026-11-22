import { Outlet, ScrollRestoration } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import BarraDestinos from '../components/destinos/BarraDestinos'
import AvisoSimulacion from '../components/demo/AvisoSimulacion'

// Estructura común a todas las vistas
function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800">
            <Header />
            <AvisoSimulacion />
            <BarraDestinos />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
                <Outlet />
            </main>
            <Footer />
            {/* Vuelve al inicio de la página al cambiar de vista */}
            <ScrollRestoration />
        </div>
    )
}

export default Layout