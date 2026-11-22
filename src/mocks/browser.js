import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Crea el Service Worker de MSW con los handlers definidos.
// Se inicia desde main.jsx solo si VITE_USAR_MOCK está activo (true).
export const worker = setupWorker(...handlers)