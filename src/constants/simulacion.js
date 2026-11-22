// Opciones del panel de demostración para simular errores.
export const OPCIONES_SIMULACION = [
    { valor: '404', texto: '404' },
    { valor: '500', texto: '500' },
    { valor: 'red', texto: 'Sin conexión' },
    { valor: 'lento', texto: 'Respuesta lenta' },
    { valor: 'json', texto: 'JSON inválido' },
    { valor: 'graphql', texto: 'Error GraphQL' },
]

export const OPCIONES_API = [
    { valor: '', texto: 'Ambas APIs' },
    { valor: 'rest', texto: 'Solo REST' },
    { valor: 'graphql', texto: 'Solo GraphQL' },
]