import { faXmark, faPlus, faClose } from "@fortawesome/free-solid-svg-icons"
import ActionButton from "../../../../components/buttons/button-clean/button"
import { closeModal } from "../../../../helpers/helpers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './warning-modal.scss'




export default function WarningModal() {

    return (
        <>
            <div className="modal-header">
                <h3><FontAwesomeIcon icon={faPlus} /> Atención</h3>
                <ActionButton 
                    isIcon
                    icon={faXmark}
                    onClick={closeModal}
                    aria-label="Cerrar"
                />
            </div>

            <div className="modal-body">
                <p>¿Está seguro que desea eliminar el registro?</p>
            </div>

            <div className="modal-footer">
                <ActionButton
                    type='button'
                    label='Cancelar'
                    icon={faClose} 
                    onClick={closeModal}
                />

                <ActionButton
                    type='submit'
                    label='Guardar'
                    variant='submit'
                    icon={faPlus}
                />
            </div>
        </>
    )
}
