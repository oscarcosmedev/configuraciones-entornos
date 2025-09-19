
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { Entry } from '../../../../types'
import './new-entry-modal.scss'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import ActionButton from '../../../../components/buttons/button-clean/button'
import { closeModal } from '../../../../helpers/helpers'
import { useEdicionStore } from '../../../../store/edicion-store'
import { toast } from 'sonner'

export default function NewEntryModal() {

    const addConfig = useEdicionStore(state => state.addConfig)

    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid, isSubmitting },
    } = useForm<Entry>({ 
        mode: 'onChange' 
    })

    const onSubmit = async (data: Entry) => {
        try {
            await addConfig(data)
            console.log('✅ addConfig OK — voy a toast.success');
            toast.success('¡Configuración creada!')
            reset()
            closeModal()
        } catch (err){
            console.log('❌ addConfig ERROR:', err);
            toast.error('Error al crear configuración')
        }
    }

    return (
        <form className="new-entry-modal" onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header">
                <h3><FontAwesomeIcon icon={faPlus} /> Nueva entrada</h3>
                <ActionButton 
                    isIcon
                    icon={faXmark}
                    onClick={closeModal}
                    aria-label="Cerrar"
                />
            </div>

            <div className="modal-body">
                <fieldset>
                    <label>ClusterName</label>
                    <input
                        placeholder="eg. PoC-DEV"
                        {...register('clusterName', { required: true })}
                    />
                </fieldset>
                
                <fieldset>
                    <label>ApplicationName</label>
                    <input
                        placeholder="eg. PoC.ApiGateway"
                        {...register('applicationName', { required: true })}
                    />
                </fieldset>

                <fieldset>
                    <label>Key</label>
                    <input
                        placeholder="eg. Logging:LogLevel"
                        {...register('key', { required: true })}
                    />
                </fieldset>

                <fieldset>
                    <label>Value</label>
                    <input
                        placeholder="eg. Default"
                        {...register('value', { required: true })}
                    />
                </fieldset>
            </div>

            <div className="modal-footer">
                <ActionButton
                    type='button'
                    label='Cancelar'
                    icon={faXmark} 
                    onClick={closeModal}
                />

                <ActionButton
                    type='submit'
                    label='Guardar'
                    variant='submit'
                    icon={faPlus}
                    disabled={!isValid || isSubmitting}
                />
            </div>
        </form>
    )
}