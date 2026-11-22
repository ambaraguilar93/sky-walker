# Sky Walker ✈️ – Agencia de viajes

SPA en React para planificar un viaje: explorar destinos, comparar vuelos y hoteles, y armar un resumen en **Mi viaje** con costo estimado.

Proyecto académico · Desarrollo Frontend II · Duoc UC · Semana 5

🔗 **Sitio publicado:** https://ambaraguilar93.github.io/sky-walker/

## Funcionalidades

- Listado de destinos con búsqueda por texto y filtro por país (API **REST**).
- Detalle de cada destino con sus vuelos y hoteles disponibles (API **GraphQL**).
- **Mi viaje**: vuelo y hotel elegidos, pasajeros, noches y total estimado. Se mantiene al recargar la página.
- Confirmación al cambiar de destino, estados de carga, vacío y error con opción de reintentar.
- Panel de demostración para simular errores de las APIs.
- Diseño responsive con menú móvil.

## Tecnologías

| Uso | Herramienta |
|---|---|
| Interfaz | React + Vite |
| Rutas | React Router (`createHashRouter`) |
| API REST | `fetch` con tiempo límite y caché propio |
| API GraphQL | Apollo Client |
| Estado global | Zustand + `persist` (localStorage) |
| Estilos | Tailwind CSS |
| APIs simuladas | MSW (Mock Service Worker) |
| Publicación | gh-pages |

## Cómo ejecutarlo

Requisitos: Node.js 20.19+ o 22.12+.

```bash
npm install
npm run dev
```

El mock se activa con la variable `VITE_USAR_MOCK=true` del archivo `.env`.

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | Revisión de código con Oxlint |
| `npm run deploy` | Genera el build y lo publica en GitHub Pages |

## Flujo entre REST y GraphQL

1. La vista **Destinos** obtiene la lista desde la API REST (`GET /api/destinos`).
2. Al elegir un destino, su `id` pasa a la URL (`#/destinos/:id`).
3. **DetalleDestino** lee el `id` con `useParams`, carga el destino por REST (`GET /api/destinos/:id`) y usa ese mismo `id` como variable `destinoId` en las queries GraphQL `VuelosPorDestino` y `HotelesPorDestino`.

## Manejo de estado

| Herramienta | Dónde se usa | Para qué |
|---|---|---|
| `useState` | `usePeticion` | Datos, carga, error e intento de las consultas REST |
| `useState` | `Destinos`, `Header`, `PanelSimulacion`, `useConfirmarCambioDestino` | Búsqueda y filtro por país, menú móvil, API elegida y acción pendiente de confirmar |
| `useEffect` | `usePeticion` | Lanza la consulta REST al montar y cuando cambia el `id` o se reintenta |
| `useEffect` | `ModalConfirmacion`, `useTituloPagina` | Abre o cierra el `<dialog>` y actualiza el título de la pestaña |
| `useMemo` | `Destinos` | Calcula los destinos filtrados y la lista de países |
| `useQuery` (Apollo) | `OpcionesVuelos`, `OpcionesHoteles` | Estado de carga, error y datos de las consultas GraphQL |
| Zustand + `persist` | `useViajeStore` | Estado global de Mi viaje (destino, vuelo, hotel, pasajeros y noches), guardado en localStorage |

## Componentes según Atomic Design

Los componentes se agrupan por funcionalidad (`destinos/`, `opciones/`, `viaje/`, `ui/`, `demo/`), y cada uno cumple un nivel de Atomic Design:

| Nivel | Componentes |
|---|---|
| Átomos | `Boton`, `Disponibilidad`, `Cargando`, `ContadorViaje` |
| Moléculas | `TarjetaDestino`, `TarjetaVuelo`, `TarjetaHotel`, `FiltroDestinos`, `CampoCantidad`, `BotonSeleccion`, `MensajeError`, `EstadoVacio`, `AvisoCambioDestino` |
| Organismos | `Header`, `Footer`, `BarraDestinos`, `ListaDestinos`, `SeccionOpciones`, `OpcionesVuelos`, `OpcionesHoteles`, `ResumenCostos`, `ModalConfirmacion`, `ConfirmarCambioDestino`, `PanelSimulacion`, `AvisoSimulacion` |
| Plantilla | `Layout` |
| Páginas | `Inicio`, `Destinos`, `DetalleDestino`, `MiViaje`, `NoEncontrada` |

## Simular errores

Desde el footer, en **Simular errores (demo)**, se elige la API afectada y el tipo de error. Mientras una simulación está activa, se muestra un aviso bajo el header con el botón **Desactivar**.

También se puede activar escribiendo `?simular=` en la URL, **antes** del `#`:

| Parámetro | Resultado |
|---|---|
| `?simular=404` | Recurso no encontrado |
| `?simular=500` | Error del servidor |
| `?simular=red` | Falla de conexión |
| `?simular=lento` | Supera el tiempo límite (8 s) |
| `?simular=json` | Respuesta ilegible |
| `?simular=graphql` | Error de GraphQL |

Con `&api=rest` o `&api=graphql` el error afecta solo a esa API.
Ejemplo: `http://localhost:5173/sky-walker/?simular=500&api=graphql#/destinos/paris`

## Estructura

```
src/
├── components/   # Componentes reutilizables (destinos, opciones, viaje, ui, demo)
├── constants/    # Rutas, configuración, mensajes de error y opciones de simulación
├── hooks/        # Lógica reutilizable (peticiones, confirmaciones, simulación, título)
├── layouts/      # Layout, Header y Footer
├── mocks/        # Handlers y datos de MSW
├── pages/        # Vistas de la aplicación
├── router/       # Definición de rutas
├── services/     # REST, GraphQL, caché y manejo de errores
├── store/        # Estado global "Mi viaje" (Zustand)
└── utils/        # Formato de precios y fechas
```

## Publicación en GitHub Pages

```bash
npm run deploy
```

El script genera el build y lo sube a la rama `gh-pages`. En GitHub, en **Settings → Pages**, se selecciona esa rama como origen. Se usa `HashRouter` para que las rutas internas funcionen al recargar en GitHub Pages.

## Pruebas en navegadores

Pruebas realizadas sobre el build de producción (`npm run build` + `npm run preview`). Cada ✅ enlaza a su captura.

| Prueba | Chrome | Edge | Firefox |
|---|---|---|---|
| Carga inicial y destinos destacados | [✅](evidencias/01.%20Carga%20Inicial/prueba_vistaChrome.png) | [✅](evidencias/01.%20Carga%20Inicial/prueba_vistaEdge.png) | [✅](evidencias/01.%20Carga%20Inicial/prueba_vistaFirefox.png) |
| Listado REST, búsqueda y filtro por país | [✅](evidencias/02.%20REST%20-%20Listado%20y%20filtros/prueba_Chrome.png) | [✅](evidencias/02.%20REST%20-%20Listado%20y%20filtros/prueba_Edge.png) | [✅](evidencias/02.%20REST%20-%20Listado%20y%20filtros/prueba_Firefox.png) |
| Detalle GraphQL: vuelos y hoteles | [✅](evidencias/03.%20GraphQL%20-%20Detalle/prueba_Chrome.png) | [✅](evidencias/03.%20GraphQL%20-%20Detalle/prueba_Edge.png) | [✅](evidencias/03.%20GraphQL%20-%20Detalle/prueba_Firefox.png) |
| Navegación entre destinos (parámetro `:id`) | [✅](evidencias/04.%20Rutas%20y%20parametros/prueba_Chrome.png) | [✅](evidencias/04.%20Rutas%20y%20parametros/prueba_Edge.png) | [✅](evidencias/04.%20Rutas%20y%20parametros/prueba_Firefox.png) |
| Página 404 (ruta inexistente) | [✅](evidencias/05.%20Ruta%20inexistente/prueba_noencontrada_Chrome.png) | [✅](evidencias/05.%20Ruta%20inexistente/prueba_noencontrada_Edge.png) | [✅](evidencias/05.%20Ruta%20inexistente/prueba_noencontrada_Firefox.png) |
| Destino inexistente | [✅](evidencias/05.%20Ruta%20inexistente/prueba_destino_Chrome.png) | [✅](evidencias/05.%20Ruta%20inexistente/prueba_destino_Edge.png) | [✅](evidencias/05.%20Ruta%20inexistente/prueba_destino_Firefox.png) |
| Mi viaje: agregar, quitar y recalcular total | [✅](evidencias/06.%20Mi%20viaje/prueba_Chrome.png) | [✅](evidencias/06.%20Mi%20viaje/prueba_Edge.png) | [✅](evidencias/06.%20Mi%20viaje/prueba_Firefox.png) |
| Modal de cambio de destino | [✅](evidencias/07.%20Otro%20destino/prueba_cambiardestino_Chrome.png) | [✅](evidencias/07.%20Otro%20destino/prueba_cambiardestino_Edge.png) | [✅](evidencias/07.%20Otro%20destino/prueba_cambiardestino_Firefox.png) |
| Persistencia al recargar | [✅](evidencias/08.%20Persistencia/prueba_Chrome.png) | [✅](evidencias/08.%20Persistencia/prueba_Edge.png) | [✅](evidencias/08.%20Persistencia/prueba_Firefox.png) |
| Panel de errores simulados | [✅](evidencias/09.%20Errores%20simulados/prueba_panelsimulacion_Chrome.png) | [✅](evidencias/09.%20Errores%20simulados/prueba_panelsimulacion_Edge.png) | [✅](evidencias/09.%20Errores%20simulados/prueba_panelsimulacion_Firefox.png) |
| Vista móvil (modo responsive de DevTools) | [✅](evidencias/01.%20Carga%20Inicial/prueba_vistamovil.png) | — | — |

Navegadores probados: Chrome · Edge · Firefox

Todas las capturas están en la carpeta [evidencias](evidencias/), organizadas por número de prueba y navegador.

