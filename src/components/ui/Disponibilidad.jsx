// Etiqueta de disponibilidad (agotado, últimos, disponibles)
function Disponibilidad({ cantidad, unidad }) {
    let estilo = 'bg-emerald-100 text-emerald-800'
    let texto = `${cantidad} ${unidad} disponibles`

    if (cantidad === 0) {
        estilo = 'bg-slate-200 text-slate-600'
        texto = 'Agotado'
    } else if (cantidad <= 3) {
        estilo = 'bg-amber-100 text-amber-800'
        texto = `¡Últimos ${cantidad}!`
    }

    return <span className={`inline-block shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${estilo}`}>{texto}</span>
}

export default Disponibilidad