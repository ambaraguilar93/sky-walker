import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { RUTAS, ENLACES_MENU } from '../constants/rutas'
import ContadorViaje from '../components/viaje/ContadorViaje'

const claseEnlace = ({ isActive }) =>
    `block rounded-lg px-3 py-2 font-medium transition ${isActive ? 'bg-white/20 text-white' : 'text-sky-100 hover:bg-white/10 hover:text-white'
    }`

// Encabezado con el menú principal y menú desplegable en móvil
function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false)
    const cerrarMenu = () => setMenuAbierto(false)

    return (
        <header className="bg-gradient-to-r from-sky-700 to-sky-500 text-white shadow">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link to={RUTAS.INICIO} onClick={cerrarMenu} className="text-2xl font-extrabold tracking-tight">
                    Sky Walker ✈️
                </Link>

                {/* Botón hamburguesa (solo móvil) */}
                <button
                    type="button"
                    className="flex items-center rounded-lg p-2 hover:bg-white/10 md:hidden"
                    aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={menuAbierto}
                    aria-controls="menu-principal"
                    onClick={() => setMenuAbierto((abierto) => !abierto)}
                >
                    <span className="text-2xl leading-none">{menuAbierto ? '✕' : '☰'}</span>
                    {!menuAbierto && <ContadorViaje />}
                </button>

                {/* Menú en escritorio */}
                <nav aria-label="Menú principal" className="hidden md:block">
                    <ul className="flex gap-1">
                        {ENLACES_MENU.map((enlace) => (
                            <li key={enlace.ruta}>
                                <NavLink to={enlace.ruta} end={enlace.ruta === RUTAS.INICIO} className={claseEnlace}>
                                    {enlace.texto}
                                    {enlace.ruta === RUTAS.MI_VIAJE && <ContadorViaje />}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Menú en móvil */}
            {menuAbierto && (
                <nav id="menu-principal" aria-label="Menú principal móvil" className="border-t border-white/20 md:hidden">
                    <ul className="mx-auto max-w-6xl space-y-1 px-4 py-3">
                        {ENLACES_MENU.map((enlace) => (
                            <li key={enlace.ruta}>
                                <NavLink
                                    to={enlace.ruta}
                                    end={enlace.ruta === RUTAS.INICIO}
                                    className={claseEnlace}
                                    onClick={cerrarMenu}
                                >
                                    {enlace.texto}
                                    {enlace.ruta === RUTAS.MI_VIAJE && <ContadorViaje />}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    )
}

export default Header