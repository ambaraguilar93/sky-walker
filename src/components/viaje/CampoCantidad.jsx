// Campo numérico con botones − / + y límites
function CampoCantidad({ id, etiqueta, valor, minimo = 1, maximo = 30, onCambiar }) {
    const ajustar = (nuevo) => onCambiar(Math.min(maximo, Math.max(minimo, nuevo)))

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-700">{etiqueta}</label>
            <div className="mt-1 flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => ajustar(valor - 1)}
                    disabled={valor <= minimo}
                    aria-label={`Disminuir ${etiqueta.toLowerCase()}`}
                    className="h-9 w-9 rounded-lg bg-slate-100 text-lg font-bold hover:bg-slate-200 disabled:opacity-40"
                >
                    −
                </button>
                <input
                    id={id}
                    type="number"
                    min={minimo}
                    max={maximo}
                    value={valor}
                    onChange={(e) => {
                        const numero = Number(e.target.value)
                        if (!Number.isNaN(numero)) ajustar(numero)
                    }}
                    className="h-9 w-16 rounded-lg border border-slate-300 text-center"
                />
                <button
                    type="button"
                    onClick={() => ajustar(valor + 1)}
                    disabled={valor >= maximo}
                    aria-label={`Aumentar ${etiqueta.toLowerCase()}`}
                    className="h-9 w-9 rounded-lg bg-slate-100 text-lg font-bold hover:bg-slate-200 disabled:opacity-40"
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default CampoCantidad