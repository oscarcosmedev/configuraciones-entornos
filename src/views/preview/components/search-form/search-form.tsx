import { useForm, type SubmitHandler } from 'react-hook-form'
import { useConfigStore } from '../../../../store/config-store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser, faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import type { PreviewConfig } from '../../../../types'
import ActionButton from '../../../../components/buttons/button-clean/button'
import './search-form.scss'
import { useEffect } from 'react'
import { safeArray } from '../../../../helpers/helpers'




export default function SearchForm() {

    /** Mock */
    const {
        appName: APPNAME, 
        clusterName: CLUSTERNAME,
        fetchOptions
    } = useConfigStore(state => state)

    useEffect(() => {
        if(APPNAME.length === 0) fetchOptions()
    }, [APPNAME.length, fetchOptions])

    /** 1. RHF setup */
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { isValid, isSubmitting },
    } = useForm<PreviewConfig>({
        defaultValues: {
            clusterName: '',
            appName: '',
        },
        mode: 'onChange',
        criteriaMode: 'all'
    })

    const clusterName   = watch('clusterName')
    const appName       = watch('appName')

    useEffect(() => {
        if(!clusterName) {
            setValue('appName', '')
        }
    }, [clusterName, setValue])


    /** 1.1 Obtengo acción del store */
    // const fetchConfig           = useConfigStore((state) => state.fetch)
    const fetchConfigResults    = useConfigStore(state => state.fetchConfigResults)
    const resetStore            = useConfigStore(state => state.reset)
    
    /** 2. Envìo */
    const onSubmit: SubmitHandler<PreviewConfig> = async ({ clusterName, appName }) => {
        await fetchConfigResults(clusterName, appName)
    }

    /** 3. Reset */
    const handleClear = () => {
        reset({ 
            clusterName: '', 
            appName: '' 
        })
        resetStore()
    }

    /** 3.1 Validaciòn boton Buscar */
    const isSearchDisabled = !isValid || isSubmitting

    /** 4. Render */
    return (
        <>
            <div className="search-form">
                <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <div>
                            <select
                                id="clusterName"
                                className='field-select'
                                {...register('clusterName', {
                                    required: true
                                })}

                            >
                                <option value=""> Seleccionar ClusterName </option>
                                {
                                    safeArray<string>(CLUSTERNAME).map(cluster => (
                                        <option key={cluster} value={cluster}>{cluster}</option>
                                    ))
                                }
                            </select>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>

                        <div>
                            <select
                                id='appName'
                                className='field-select'
                                disabled={!clusterName}
                                {...register('appName', {
                                    required: true
                                })}
                            >
                                <option value=""> Seleccionar ApplicationName </option>
                                {
                                    safeArray<string>(APPNAME).map( app => (
                                        <option key={app} value={app}>{app}</option>
                                    ))
                                }
                            </select>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>

                        <div className='button-actions'>
                            <ActionButton 
                                label="Limpiar"
                                icon={faEraser}
                                disabled={(!clusterName && !appName) || !clusterName}
                                onClick={handleClear}
                            />

                            <ActionButton
                                type='submit'
                                label='Buscar'
                                icon={faMagnifyingGlass}
                                variant='submit'
                                disabled={isSearchDisabled}
                            />
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    )
}
