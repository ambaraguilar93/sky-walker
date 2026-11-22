import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const ESTADO_INICIAL = {
    destino: null, // { id, nombre, pais, emoji }
    vuelo: null,
    hotel: null,
    pasajeros: 1,
    noches: 7,
}

// Solo se guardan los datos necesarios del destino
const resumirDestino = ({ id, nombre, pais, emoji }) => ({ id, nombre, pais, emoji })

// Estado global de Mi viaje con Zustand.
// persist lo guarda en localStorage para que no se pierda al recargar.
export const useViajeStore = create(
    persist(
        (set) => ({
            ...ESTADO_INICIAL,

            // Si se elige una opción de otro destino, el viaje se reinicia con el nuevo destino
            elegirVuelo: (destino, vuelo) =>
                set((estado) =>
                    estado.destino?.id === destino.id
                        ? { vuelo }
                        : { destino: resumirDestino(destino), vuelo, hotel: null }
                ),

            elegirHotel: (destino, hotel) =>
                set((estado) =>
                    estado.destino?.id === destino.id
                        ? { hotel }
                        : { destino: resumirDestino(destino), hotel, vuelo: null }
                ),

            quitarVuelo: () =>
                set((estado) => ({ vuelo: null, destino: estado.hotel ? estado.destino : null })),

            quitarHotel: () =>
                set((estado) => ({ hotel: null, destino: estado.vuelo ? estado.destino : null })),

            cambiarPasajeros: (cantidad) => set({ pasajeros: cantidad }),
            cambiarNoches: (cantidad) => set({ noches: cantidad }),

            vaciarViaje: () => set(ESTADO_INICIAL),
        }),
        {
            name: 'sky-walker-mi-viaje', // clave en localStorage
            storage: createJSONStorage(() => localStorage),
            version: 1,
            // Solo se guardan los datos, no las funciones
            partialize: ({ destino, vuelo, hotel, pasajeros, noches }) => ({ destino, vuelo, hotel, pasajeros, noches }),
        }
    )
)

// Cálculos derivados 
export const contarElementos = (vuelo, hotel) => (vuelo ? 1 : 0) + (hotel ? 1 : 0)

export function calcularTotales({ vuelo, hotel, pasajeros, noches }) {
    const subtotalVuelo = vuelo ? vuelo.precio * pasajeros : 0
    const subtotalHotel = hotel ? hotel.precioNoche * noches : 0
    return { subtotalVuelo, subtotalHotel, total: subtotalVuelo + subtotalHotel }
}