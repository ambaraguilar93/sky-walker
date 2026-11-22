// Formatea montos en pesos chilenos
const formateadorPrecio = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
})

export function formatoPrecio(monto) {
    return formateadorPrecio.format(monto)
}

// Formatea fechas
const formateadorFecha = new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
})

export function formatoFecha(textoFecha) {
    const [anio, mes, dia] = textoFecha.split('-').map(Number)
    return formateadorFecha.format(new Date(anio, mes - 1, dia))
}