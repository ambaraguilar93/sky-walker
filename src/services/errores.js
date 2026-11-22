import { CombinedGraphQLErrors, ServerError, ServerParseError } from '@apollo/client/errors'
import { TIPOS_ERROR, MENSAJES_ERROR } from '../constants/mensajesError'

// Clase de error personalizada. Hereda de Error, la clase de errores nativa 
// de JavaScript, y le agrega información propia de la app
export class ErrorApi extends Error {
    constructor(tipo, mensajeTecnico, status = null) {
        super(mensajeTecnico)
        this.name = 'ErrorApi'
        this.tipo = tipo
        this.status = status
    }
}

// Convierte cualquier error (REST, Apollo o desconocido) en { tipo, status }
export function clasificarError(error) {
    if (error instanceof ErrorApi) return { tipo: error.tipo, status: error.status }

    // Errores de Apollo Client 4
    if (CombinedGraphQLErrors.is(error)) return { tipo: TIPOS_ERROR.GRAPHQL, status: null }
    if (ServerParseError.is(error)) return { tipo: TIPOS_ERROR.DATOS, status: error.statusCode }
    if (ServerError.is(error)) return { tipo: TIPOS_ERROR.HTTP, status: error.statusCode }
    if (error instanceof TypeError) return { tipo: TIPOS_ERROR.RED, status: null }

    return { tipo: TIPOS_ERROR.DESCONOCIDO, status: null }
}

// Devuelve un mensaje entendible para mostrar en la interfaz
export function mensajeDeError(error) {
    const { tipo, status } = clasificarError(error)

    if (tipo === TIPOS_ERROR.HTTP) {
        if (status === 404) return MENSAJES_ERROR.HTTP_404
        if (status >= 500) return MENSAJES_ERROR.HTTP_500
    }
    return MENSAJES_ERROR[tipo] ?? MENSAJES_ERROR.DESCONOCIDO
}