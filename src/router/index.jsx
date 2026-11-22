import { createHashRouter } from 'react-router'
import Layout from '../layouts/Layout'
import Inicio from '../pages/Inicio'
import Destinos from '../pages/Destinos'
import DetalleDestino from '../pages/DetalleDestino'
import MiViaje from '../pages/MiViaje'
import NoEncontrada from '../pages/NoEncontrada'

// Objeto router que define todas las rutas de la app y qué componente muestra cada una.
export const router = createHashRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Inicio /> },
            { path: 'destinos', element: <Destinos /> },
            { path: 'destinos/:id', element: <DetalleDestino /> },
            { path: 'mi-viaje', element: <MiViaje /> },
            { path: '*', element: <NoEncontrada /> },
        ],
    },
])