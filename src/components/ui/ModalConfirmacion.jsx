import { useEffect, useId, useRef } from 'react'
import Boton from './Boton'

// Ventana de confirmación reutilizable.
function ModalConfirmacion({
    abierto,
    titulo,
    children,
    textoConfirmar = 'Confirmar',
    textoCancelar = 'Cancelar',
    onConfirmar,
    onCancelar,
}) {
    const dialogoRef = useRef(null)
    const idTitulo = useId()

    // Sincroniza el estado de React con el <dialog> del navegador
    useEffect(() => {
        const dialogo = dialogoRef.current
        if (!dialogo) return
        if (abierto && !dialogo.open) dialogo.showModal()
        if (!abierto && dialogo.open) dialogo.close()
    }, [abierto])

    return (
        <dialog
            ref={dialogoRef}
            aria-labelledby={idTitulo}
            onCancel={(evento) => {
                evento.preventDefault()
                onCancelar()
            }}
            onClick={(evento) => {
                // clic fuera del contenido
                if (evento.target === dialogoRef.current) onCancelar()
            }}
            className="m-auto w-[min(28rem,calc(100%-2rem))] rounded-2xl p-0 shadow-xl backdrop:bg-slate-900/50"
        >
            <div className="p-6">
                <h2 id={idTitulo} className="text-lg font-bold text-slate-800">{titulo}</h2>
                <div className="mt-2 text-slate-600">{children}</div>
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                    <Boton variante="neutro" onClick={onCancelar}>
                        {textoCancelar}
                    </Boton>
                    <Boton onClick={onConfirmar}>
                        {textoConfirmar}
                    </Boton>
                </div>
            </div>
        </dialog>
    )
}

export default ModalConfirmacion