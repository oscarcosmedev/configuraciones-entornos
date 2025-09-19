import { useState } from 'react'
import { useUiStore } from '../../../../store/ui-store'
import type { ConfigResult } from '../../../../store/edicion-store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ActionButton from '../../../../components/buttons/button-clean/button'
import { faClose, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

type PropsEditValueModal = {
    row: ConfigResult
    onSave: (value: string) => void
}

export default function EditValueModal({ row, onSave }: PropsEditValueModal) {
    
    // 1. Hook para cerrar el modal
    const closeModal = useUiStore(state => state.closeModal)
    
    // 2. Estado local para el nuevo valor
    const [value, setValue] = useState(row.value)

    // 3. Validación: desactivamos el boton "Guardar" si está vacío
    const isSaveDisabled = value.trim() === '' || value === row.value

    return (
        <div className="edit-value-modal">
            <div className="modal-header">
                <h3><FontAwesomeIcon icon={faPenToSquare} />Edición entrada</h3>
                <ActionButton 
                    isIcon
                    icon={faClose}
                    onClick={closeModal}
                    aria-label="Cerrar"
                />
            </div>

            <div className="modal-body">
                <fieldset>
                    <label>ClusterName</label>
                    <input type="text" value={row.clusterName} disabled />
                </fieldset>

                <fieldset>
                    <label>ApplicationName</label>
                    <input type="text" value={row.applicationName} disabled />
                </fieldset>

                <fieldset>
                    <label>Key</label>
                    <input type="text" value={row.key} disabled />
                </fieldset>

                <fieldset>
                    <label>Value</label>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </fieldset>
            </div>

            <div className="modal-footer">
                <ActionButton
                    type='button'
                    label='Cancelar'
                    icon={faClose} 
                    className='cancelar'
                    onClick={closeModal}
                />

                <ActionButton
                    type='submit'
                    label='Guardar'
                    variant='submit'
                    className='guardar'
                    icon={faPlus}
                    onClick={() => {
                        onSave(value)
                        closeModal()
                    }}
                    disabled={isSaveDisabled}
                />
            </div>
        </div>
    )
}
