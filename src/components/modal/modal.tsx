import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useUiStore } from '../../store/ui-store'
import './modal.scss'


export default function ModalRoot() {
    
    const isModalOpen   = useUiStore(state => state.isModalOpen)
    const modalContent  = useUiStore(state => state.modalContent)
    const closeModal    = useUiStore(state => state.closeModal)

    useEffect(() => {
        
        if (!isModalOpen) return
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal()

        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
        
    }, [isModalOpen, closeModal])

    if (!isModalOpen || !modalContent) return null

    return createPortal(
        <div className="modal-backdrop">
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                {modalContent}
            </div>
        </div>,
        document.getElementById('modal-root') as HTMLElement,
    )
}