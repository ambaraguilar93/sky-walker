// Mensaje para cuando una consulta responde bien, pero sin resultados
function EstadoVacio({ icono = '🔎', titulo, descripcion, children }) {
    return (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center">
            <p className="text-4xl">{icono}</p>
            <p className="mt-2 font-semibold text-slate-700">{titulo}</p>
            {descripcion && <p className="mt-1 text-sm text-slate-500">{descripcion}</p>}
            {children && <div className="mt-4">{children}</div>}
        </div>
    )
}

export default EstadoVacio