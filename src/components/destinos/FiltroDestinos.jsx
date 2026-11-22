// Filtros de la vista Destinos: búsqueda por texto y por país
function FiltroDestinos({ busqueda, onBusquedaChange, pais, onPaisChange, paises }) {
    return (
        <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-end">
            <div className="flex-1">
                <label htmlFor="busqueda-destino" className="block text-sm font-medium text-slate-700">
                    Buscar destino o actividad
                </label>
                <input
                    id="busqueda-destino"
                    type="search"
                    value={busqueda}
                    onChange={(e) => onBusquedaChange(e.target.value)}
                    placeholder="Ej: playa, Roma, Machu Picchu..."
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                />
            </div>

            <div className="sm:w-56">
                <label htmlFor="filtro-pais" className="block text-sm font-medium text-slate-700">
                    País
                </label>
                <select
                    id="filtro-pais"
                    value={pais}
                    onChange={(e) => onPaisChange(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                >
                    <option value="">Todos los países</option>
                    {paises.map((p) => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default FiltroDestinos