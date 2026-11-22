import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { API_GRAPHQL_URL } from '../../constants/config'
import { fetchConTiempoLimite } from '../fetchConTiempoLimite'

// Cliente de Apollo: objeto que envía las consultas GraphQL a través de un HttpLink
// (usando fetch con tiempo límite) y guarda sus resultados en un caché en memoria (InMemoryCache).
export const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: API_GRAPHQL_URL,
        fetch: (url, opciones) => fetchConTiempoLimite(url, opciones),
    }),
    cache: new InMemoryCache(),
})