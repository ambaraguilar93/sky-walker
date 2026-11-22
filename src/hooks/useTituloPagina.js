import { useEffect } from 'react'

// Actualiza el título de la pestaña del navegador según la vista
export function useTituloPagina(titulo) {
    useEffect(() => {
        document.title = titulo ? `${titulo} | Sky Walker` : 'Sky Walker – Agencia de viajes'
    }, [titulo])
}