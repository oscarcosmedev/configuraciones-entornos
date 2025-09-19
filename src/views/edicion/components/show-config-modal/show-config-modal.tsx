import { useUiStore } from '../../../../store/ui-store'
import { useEdicionStore, type ConfigResult } from '../../../../store/edicion-store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ActionButton from '../../../../components/buttons/button-clean/button'
import { faClose, faGears } from '@fortawesome/free-solid-svg-icons'
import './show-config-modal.scss'

type PropsShowConfigModal = {
    row: ConfigResult
}

export default function ShowConfigModal({ row } : PropsShowConfigModal) {
    
    const closeModal = useUiStore(state => state.closeModal)
    const results = useEdicionStore(state => state.results)

    if (!results) return null

    return (
        <div className="show-config-modal">
            <div className="modal-header">
                <h3><FontAwesomeIcon icon={faGears} />Entrada</h3>
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
                    <input type="text" value={row.value} disabled />
                </fieldset>
            </div>

            <div className="modal-footer">
                <ActionButton
                    type='button'
                    label='Cerrar'
                    icon={faClose} 
                    className='cancelar'
                    onClick={closeModal}
                />
            </div>
        </div>
    )
}
