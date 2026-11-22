import TarjetaDestino from './TarjetaDestino'

// Grilla responsiva de destinos
function ListaDestinos({ destinos }) {
    return (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinos.map((destino) => (
                <li key={destino.id} className="flex">
                    <TarjetaDestino destino={destino} />
                </li>
            ))}
        </ul>
    )
}

export default ListaDestinos