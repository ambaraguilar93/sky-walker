import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client/react'
import { apolloClient } from './services/graphql/apolloClient'
import './index.css'
import App from './App.jsx'

// Activa el mock según la variable de entorno
async function iniciarMock() {
  if (import.meta.env.VITE_USAR_MOCK !== 'true') return

  const { worker } = await import('./mocks/browser')

  return worker.start({
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledFrame: 'bypass',
  })
}

const raiz = document.getElementById('root')

// Se renderiza recién cuando el worker está listo (intercepta la primera consulta)
iniciarMock()
  .then(() => {
    createRoot(raiz).render(
      <StrictMode>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </StrictMode>
    )
  })
  // Si el mock no puede iniciar (por ejemplo, una ventana privada que bloquea
  // los Service Workers), se informa en pantalla en vez de dejarla en blanco
  .catch((error) => {
    console.error('No se pudo iniciar la aplicación:', error)
    raiz.className = 'flex min-h-screen items-center justify-center p-6 text-center text-slate-700'
    raiz.textContent =
      'No se pudo iniciar Sky Walker. Si estás en una ventana privada, ábrelo en una ventana normal. ' +
      'Si el problema continúa, revisa la consola del navegador.'
  })