// Indicador de carga reutilizable
function Cargando({ texto = 'Cargando...', compacto = false }) {
    return (
        <div
            role="status"
            aria-live="polite"
            className={`flex items-center gap-3 text-slate-500 ${compacto ? 'py-1 text-sm' : 'justify-center py-10'}`}
        >
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-sky-200 border-t-sky-600" />
            <span>{texto}</span>
        </div>
    )
}

export default Cargando