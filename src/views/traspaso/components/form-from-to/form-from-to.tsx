import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { SubmitHandler, FieldErrors } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'sonner'
import { safeArray } from '../../../../helpers/helpers'
import './form-from-to.scss'
import { faChevronDown, faEraser, faRightLeft } from '@fortawesome/free-solid-svg-icons'
import type { TransferConfig } from '../../../../types'
import { useTransferStore } from '../../../../store/transfer-store'
import Spinner from '../../../../components/spinner/spinner'


export default function FormFromTo() {

    /* 1. RHF setup */
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        reset,
        watch,
        formState: { isValid, isSubmitting },
    } = useForm<TransferConfig>({
        defaultValues: {
            originClusterName: '',
            originAppName: '',
            destinyClusterName: '',
            destinyAppName: '',
        },
        mode: 'onChange',
        criteriaMode: 'all',
    });

    /* 1.1 Mock */
    const { 
        clusters: CLUSTERS, 
        apps: APPS, 
        fetchOptions, 
        loading,
        isTransferring,
        startTransfer,
        clearOptions
    } = useTransferStore((state) => state)


    useEffect(() => {
        if (CLUSTERS.length === 0) fetchOptions()
    }, [CLUSTERS.length, fetchOptions])


    /* 2. Observamos los valores para habilitar/deshabilitar */
    const originClusterName  = watch('originClusterName')
    const originAppName      = watch('originAppName')
    const destinyClusterName = watch('destinyClusterName')

    useEffect(() => {
        if(!originAppName || !destinyClusterName) {
            setValue('destinyAppName', '')
        }

        if(!originClusterName) {
            setValue('destinyClusterName', '')
            setValue('originAppName', '')
        }
    }, [originAppName, originClusterName, destinyClusterName, setValue])

    if (loading && CLUSTERS.length === 0) return <Spinner />


    /* 3.A ---------- Validar que destino !== origen ---------- */
    const destClusterDiff = (value: string) => {
        if (!originClusterName) return true // aún sin cluster de origen
        return value && value !== originClusterName
        ? true
        : 'El cluster destino debe ser diferente del origen'
    }

    /* 3-B. Destino/App es obligatorio solo si hay origin/app */
    const destAppRequiredIfOrigin = (value: string) => {
        const { originAppName } = getValues()
        // Si NO se eligió app de origen, destino sigue siendo opcional
        if (!originAppName) return true

        // Si se eligió app de origen, destino es obligatorio
        return value ? true : 'Debes seleccionar una app de destino'
    }


    /* 4. ---------- Envío ---------- */
    const onSubmit: SubmitHandler<TransferConfig> = async (data) => {
        
        try {
            const { message } = await startTransfer(data)
            toast.success(message || 'Traspaso exitoso')
            reset()
            clearOptions()
        } catch (error) {
            toast.error((error as Error).message)
        }

    };

    /* 4.1 ---------- Envío con errores ---------- */
    const onError = (errors: FieldErrors<TransferConfig>) => {
        const firstErrorMsg = Object.values(errors)
            .filter(Boolean)
            .map(err => err!.message)
            .find(Boolean)
            ?? 'Formulario inválido'

        toast.error(firstErrorMsg)
    }

    /* 5. ----------  Reset ---------- */
    const handleClear = () => reset()

    /* 6. Listas filtradas */
    const destinyClusterOptions = safeArray<string>(CLUSTERS).filter((cluster) => cluster !== originClusterName)


    return (
        <div className="form-from-to">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                {/* ------------------- ORIGEN ------------------- */}
                <div className='field-group'>
                    <h3>Origen</h3>
                    <fieldset>
                        {/* Origen/cluster */}
                        <div className="field-select">
                            <select
                                id="originClusterName"
                                {...register('originClusterName', { 
                                    required: true
                                })}
                            >
                                <option value="">ClusterName</option>
                                {
                                    safeArray<string>(CLUSTERS).map( cluster => (
                                        <option key={cluster} value={cluster}>{cluster}</option>
                                    ))
                                }
                            </select>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>

                        {/* Origen/app (opcional) */}
                        <div className="field-select">
                            <select
                                id="originAppName"
                                disabled={!originClusterName}
                                {...register('originAppName')}
                            >
                                <option value="">ApplicationName</option>
                                {
                                    safeArray<string>(APPS).map( app => (
                                        <option key={app} value={app}>{app}</option>
                                    ))
                                }
                            </select>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                    </fieldset>
                </div>

                {/* ------------------- DESTINO ------------------- */}
                <div className='field-group'>
                    <h3>Destino</h3>
                    <fieldset>
                        {/* Destino/cluster (≠ origen) */}
                        <div className="field-select">
                            <select
                                id="destinyClusterName"
                                disabled={!originClusterName}
                                {...register('destinyClusterName', { 
                                    required: true,
                                    validate: destClusterDiff,
                                })}
                            >
                                <option value="">ClusterName</option>
                                {destinyClusterOptions.map((cluster) => (
                                    <option key={cluster} value={cluster}>{cluster}</option>
                                ))}
                            </select>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>

                        {/* Destino/app (obligatoria solo si hay origin/app) */}
                        <div className="field-select">
                            <select
                                id="destinyAppName"
                                disabled={
                                    !originAppName || 
                                    !originClusterName ||
                                    !destinyClusterName
                                }
                                {...register('destinyAppName', { 
                                    validate: destAppRequiredIfOrigin,
                                })}
                            >
                                <option value="">ApplicationName</option>
                                {safeArray<string>(APPS).map((app) => (
                                    <option key={app} value={app}>{app}</option>
                                ))}
                            </select>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                    </fieldset>
                </div>

                {/* ------------------- ACCIONES ------------------- */}
                <div className="button-actions">
                    <button
                        type="button"
                        className="button-default button-secondary"
                        disabled={!originClusterName}
                        onClick={handleClear}
                    >
                        <FontAwesomeIcon icon={faEraser} /> Limpiar
                    </button>

                    <button
                        type="submit"
                        className="button-default button-submit"
                        disabled={!isValid || isSubmitting || isTransferring}
                    >
                        <FontAwesomeIcon icon={faRightLeft} /> Traspasar
                    </button>
                </div>
            </form>
        </div>
    )
}
