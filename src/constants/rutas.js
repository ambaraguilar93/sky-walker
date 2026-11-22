// Rutas de la aplicación (router y enlaces)
export const RUTAS = {
    INICIO: '/',
    DESTINOS: '/destinos',
    DETALLE_DESTINO: '/destinos/:id',
    MI_VIAJE: '/mi-viaje',
}

// Construye la ruta al detalle de un destino
export const rutaDetalleDestino = (id) => `${RUTAS.DESTINOS}/${id}`

// Enlaces del menú principal
export const ENLACES_MENU = [
    { ruta: RUTAS.INICIO, texto: 'Inicio' },
    { ruta: RUTAS.DESTINOS, texto: 'Destinos' },
    { ruta: RUTAS.MI_VIAJE, texto: 'Mi viaje' },
]