import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ActionButton from '../../../../components/buttons/button-clean/button'
import { useUiStore } from '../../../../store/ui-store'
import { faPlus, faTriangleExclamation, faClose } from '@fortawesome/free-solid-svg-icons'
import './delete-confirm-modal.scss'
import { useState } from 'react'
import { toast } from 'sonner'
import Spinner from '../../../../components/spinner/spinner'


type DeleteConfirmModalProps = {
    message: string
    onConfirm: () => void
}

export default function DeleteConfirmModal({ message, onConfirm }: DeleteConfirmModalProps) {

    const closeModal = useUiStore(state => state.closeModal)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {

        setIsDeleting(true)

        try {

            await onConfirm()
            toast.success('Registro eliminado con éxito')

        } catch (error: unknown) {
            const msg =
                        error instanceof Error
                        ? error.message
                        : 'Ocurrió un error al eliminar el registro'

            toast.error(msg)

        } finally {
            setIsDeleting(false)
            closeModal()
        }
    }

    return (
        <div className="delete-confirm-modal">
            <div className="modal-header">
                <h3><FontAwesomeIcon icon={faTriangleExclamation} />Atención</h3>
                <ActionButton 
                    isIcon
                    icon={faClose}
                    onClick={closeModal}
                    aria-label="Cerrar"
                />
            </div>

            <div className="modal-body">
                <p>{message}</p>
                {isDeleting && (
                    <Spinner />
                )}
            </div>

            <div className="modal-footer">
                <ActionButton
                    type='button'
                    label='Cancelar'
                    icon={faClose} 
                    onClick={closeModal}
                    disabled={isDeleting}
                />

                <ActionButton
                    type='submit'
                    label='Eliminar'
                    variant='submit'
                    icon={faPlus}
                    onClick={handleDelete}
                    disabled={isDeleting}
                />
            </div>
        </div>
    )
}
