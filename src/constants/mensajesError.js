// Tipos de error que la aplicación distingue
export const TIPOS_ERROR = {
    RED: 'RED',
    TIEMPO: 'TIEMPO',
    HTTP: 'HTTP',
    DATOS: 'DATOS',
    GRAPHQL: 'GRAPHQL',
    DESCONOCIDO: 'DESCONOCIDO',
}

// Mensajes comprensibles para el usuario
export const MENSAJES_ERROR = {
    RED: 'No pudimos conectarnos. Revisa tu conexión a internet e inténtalo de nuevo.',
    TIEMPO: 'El servidor está tardando demasiado en responder. Inténtalo nuevamente.',
    HTTP_404: 'No encontramos la información que buscas.',
    HTTP_500: 'El servidor tuvo un problema. Inténtalo en unos minutos.',
    HTTP: 'El servidor respondió con un error inesperado.',
    DATOS: 'No se pudieron leer los datos recibidos.',
    GRAPHQL: 'No pudimos obtener las opciones de viaje solicitadas.',
    DESCONOCIDO: 'Ocurrió un error inesperado.',
}