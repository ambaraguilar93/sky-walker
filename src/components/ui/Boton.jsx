// Botón reutilizable con variantes visuales y tamaños.
const BASE = 'rounded-lg font-medium transition disabled:cursor-not-allowed'

const VARIANTES = {
    primario: 'bg-sky-600 text-white hover:bg-sky-700 disabled:bg-slate-300',
    secundario: 'text-sky-700 ring-1 ring-sky-200 hover:bg-sky-50 disabled:opacity-50',
    neutro: 'text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50 disabled:opacity-50',
    peligro: 'bg-white text-red-700 ring-1 ring-red-300 hover:bg-red-50 disabled:opacity-50',
    exito: 'bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50',
}

const TAMANOS = {
    md: 'px-4 py-2',
    sm: 'px-3 py-1.5 text-sm',
}

function Boton({ variante = 'primario', tamano = 'md', type = 'button', className = '', children, ...props }) {
    return (
        <button
            type={type}
            className={`${BASE} ${VARIANTES[variante]} ${TAMANOS[tamano]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Boton