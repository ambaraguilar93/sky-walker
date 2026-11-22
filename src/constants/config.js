// Configuración general de la comunicación con las APIs (mock)
export const API_REST_URL = '/api'
export const API_GRAPHQL_URL = '/graphql'

// Tiempo máximo de espera de una petición antes de darla por fallida
export const TIEMPO_LIMITE_MS = 8000

// Caché de peticiones REST
export const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutos de vigencia
export const CACHE_MAX_ENTRADAS = 20      // máximo de respuestas guardadas