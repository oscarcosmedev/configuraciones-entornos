import { useFieldArray, useForm, FormProvider, useWatch } from "react-hook-form"
import { faEraser, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useEdicionStore } from "../../../../store/edicion-store"
import { openModal } from "../../../../helpers/helpers"
import ActionButton from "../../../../components/buttons/button-clean/button"
import NewEntryModal from "../new-entry-modal/new-entry-modal"
import FilterRow from "../filter-row/filter-row"
import type { EditConfigFilter } from "../../../../types"
import './edicion-search-form.scss'



export default function EdicionSearchForm() {


    /* 1. Creo 'methods' y desestructuramos de RHF */
    const methods = useForm<EditConfigFilter>({
        defaultValues: {
            filters: [{ 
                fieldName: '', 
                fieldOperator: '', 
                fieldValue: '' 
            }],
        },
        mode: 'onChange',
        criteriaMode: 'all',
    })

    const {
        handleSubmit,
        control,
        reset,
        formState: { isValid, isSubmitting },
        getValues
    } = methods

    /* 2. useWatch para detectar cambios en filters */
    const watchedFilters = useWatch({
        control,
        name: "filters",
    })
    
    /* 3. Flag: al menos un filtro con algo escrito */
    const hasAnyFilter = watchedFilters.some(
        (filter) => filter.fieldName || filter.fieldOperator || filter.fieldValue
    )
    
    const hasMultipleFilters = watchedFilters.length > 1
    

    /* 4. Flag: ¿todos los filtros son únicos? */
    const uniqueFilters =
        new Set(
        watchedFilters.map(f =>
            `${f.fieldName}|${f.fieldOperator}|${f.fieldValue}`
        )
    ).size === watchedFilters.length

    /* 5. Obtengo la acción del store */
    const fetchConfigResults = useEdicionStore((state) => state.fetchConfigResults)
    const clearConfigResults = useEdicionStore((state) => state.clearConfigResults)

    /* 6. useFieldArray con insert */
    const { fields, append, remove, insert } = useFieldArray({
        control,
        name: 'filters',
    })

    /* 7. Función para duplicar fila en posición index+1 */
    const duplicateRow = (index: number) => {

        const current = getValues(`filters.${index}`)

        if (
            !current.fieldName && 
            !current.fieldOperator && 
            !current.fieldValue
        ) {
            insert(index + 1, current)
        } else {
            insert(index + 1, {
                fieldName: '',
                fieldOperator: '',
                fieldValue: ''
            })
        }
        
    }

    /* 8. Submit + limpiar */
    const onSubmit = async (filters: EditConfigFilter) => {
        await fetchConfigResults(filters)
    }

    const _handleClear = () => {
        clearConfigResults()
        reset()
    }

    /* 9. Render */
    return (
        <>
            <div className="edicion-search-form">
                <div className="new-entry">
                    <ActionButton 
                        label="Nueva Entrada"
                        icon={faPlus}
                        onClick={() => openModal(<NewEntryModal />)}
                    />
                </div>
                <div className="field-title">
                    <div></div>
                    <h4>Campo</h4>
                    <h4>Operador</h4>
                    <h4>Valor</h4>
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {fields.map((field, index) => (
                            <FilterRow
                                key={field.id}
                                index={index}
                                remove={remove}
                                isRemovable={fields.length > 1}
                                duplicateRow={duplicateRow}
                            />
                        ))}

                        <div className="button-actions">
                            <ActionButton
                                className="button--add-filter"
                                label="Agregar filtro"
                                icon={faPlus}
                                onClick={() => append({ 
                                    fieldName: '', 
                                    fieldOperator: '', 
                                    fieldValue: '' 
                                })}
                            />
                        </div>
                        <div className="button-actions">
                            <ActionButton
                                label="Limpiar"
                                variant="secondary"
                                icon={faEraser}
                                onClick={_handleClear}
                                disabled={!hasAnyFilter && !hasMultipleFilters}
                            />

                            <ActionButton
                                type='submit'
                                label='Buscar'
                                variant='submit'
                                icon={faMagnifyingGlass}
                                disabled={!isValid || isSubmitting || !uniqueFilters}
                            />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    )
}
