import { formatoPrecio } from '../../utils/formato'

// Resumen del costo estimado del viaje
function ResumenCostos({ vuelo, hotel, pasajeros, noches, subtotalVuelo, subtotalHotel, total }) {
    return (
        <section aria-labelledby="titulo-resumen" className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 id="titulo-resumen" className="text-lg font-bold text-slate-800">Costo estimado</h2>
            <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                    <dt className="text-slate-600">
                        Vuelo {vuelo ? `(${formatoPrecio(vuelo.precio)} × ${pasajeros} ${pasajeros === 1 ? 'pasajero' : 'pasajeros'})` : '(sin elegir)'}
                    </dt>
                    <dd className="font-medium">{formatoPrecio(subtotalVuelo)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                    <dt className="text-slate-600">
                        Hotel {hotel ? `(${formatoPrecio(hotel.precioNoche)} × ${noches} ${noches === 1 ? 'noche' : 'noches'})` : '(sin elegir)'}
                    </dt>
                    <dd className="font-medium">{formatoPrecio(subtotalHotel)}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-slate-200 pt-2 text-base">
                    <dt className="font-bold text-slate-800">Total</dt>
                    <dd className="font-bold text-sky-700">{formatoPrecio(total)}</dd>
                </div>
            </dl>
            <p className="mt-3 text-xs text-slate-500">
                Precios referenciales en CLP, guardados al momento de agregar cada opción.
            </p>
        </section>
    )
}

export default ResumenCostos