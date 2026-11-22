import PanelSimulacion from '../components/demo/PanelSimulacion'

const ANIO_ACTUAL = new Date().getFullYear()

function Footer() {
    return (
        <footer className="mt-auto border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-slate-500">
                <p>© {ANIO_ACTUAL} Sky Walker · Agencia de viajes · Proyecto académico</p>
                <PanelSimulacion />
            </div>
        </footer>
    )
}

export default Footer