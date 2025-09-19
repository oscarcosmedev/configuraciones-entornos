import { useFormContext, useWatch } from "react-hook-form"
import { useEffect } from 'react'
import { faChevronDown, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { EditConfigFilter } from "../../../../types"
import './filter-row.scss'
import ActionButton from "../../../../components/buttons/button-clean/button"
import clsx from "clsx"
import { useEdicionStore } from "../../../../store/edicion-store"
import { safeArray } from "../../../../helpers/helpers"

type RowProps = {
    index: number
    remove: (idx: number) => void
    isRemovable: boolean
    duplicateRow: (idx: number) => void
}

export default function FilterRow({
    index, 
    remove, 
    isRemovable,
    duplicateRow
}: RowProps) {

    /* Mock */
    const fetchEditOptions = useEdicionStore(state => state.fetchEditOptions)
    const getValoresByCampo = useEdicionStore(state => state.getValoresByCampo)
    
    useEffect(() => {
        fetchEditOptions()
    }, [fetchEditOptions])

    /* Obtengo las listas mockeadas para los <select> */
    const { 
        campo: CAMPO, 
        operador: OPERATORS, 
        // valor: VALORS 
    } = useEdicionStore((state) => state)

    /* 1. Obtenemos utilidades de RHF desde el contexto */
    const { register, control, setValue } = useFormContext<EditConfigFilter>()

    /* 2. Validamos si esta fila debe usar <input> o <select> para “Valor” */
    const fieldName: string = useWatch({
        control,
        name: `filters.${index}.fieldName`,
    })

    /* 3. Obtenemos los valores correspondientes al campo seleccionado */
    const VALORS = getValoresByCampo(fieldName)
    const isTextValue = fieldName === 'Value'

    /* 4. Limpia fieldValue cuando cambia el tipo de control */
    useEffect(() => {
        setValue(`filters.${index}.fieldValue`, '')
    }, [fieldName,isTextValue, control, setValue, index])

    /* 5. Render */
    return (
        <fieldset>
            {/* --- Columna de acciones --- */}
            <div className="less-more">
                <ActionButton
                    isIcon
                    icon={faPlus}
                    className="duplicate"
                    onClick={() => duplicateRow(index)}
                />
                <ActionButton
                    isIcon
                    icon={faXmark}
                    className={clsx(
                        'delete', 
                        `${isRemovable ? 'clickable' : 'disabled'}`
                    )}
                    onClick={() => isRemovable && remove(index)}
                />
            </div>

            {/* --- Campo --- */}
            <div className="field-select">
                <label htmlFor={`filters.${index}.fieldName`}>Campo</label>
                <select 
                    id={`filters.${index}.fieldName`}
                    {...register(`filters.${index}.fieldName`, { 
                        required: true 
                    })}
                >
                    <option value="">Seleccionar</option>
                    {
                        safeArray<string>(CAMPO).map((campo) => (
                            <option key={campo} value={campo}>
                                {campo}
                            </option>
                        ))
                    }
                </select>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>

            {/* --- Operador --- */}
            <div className="field-select">
                <label
                    htmlFor={`filters.${index}.fieldOperator`}
                >Operador</label>
                <select
                    id={`filters.${index}.fieldOperator`}
                    disabled={!fieldName}
                    {...register(`filters.${index}.fieldOperator`, { 
                        required: true 
                    })}
                >
                    <option value="">Seleccionar</option>
                    {
                        safeArray<string>(OPERATORS).map((operator) => (
                            <option key={operator} value={operator}>
                                {operator}
                            </option>
                        ))
                    }
                </select>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>

            {/* --- Valor --- */}
            <div className="field-select">
                {isTextValue ? (
                    <>
                        <label
                            htmlFor={`filters.${index}.fieldValue`}
                        >Valor</label>
                        <input
                            id={`filters.${index}.fieldValue`}
                            type="text"
                            placeholder="Escribe el valor…"
                            disabled={!fieldName}
                            {...register(`filters.${index}.fieldValue`, {
                                required: true 
                            })}
                        />
                    </>
                ) : (
                    <>
                        <label 
                            htmlFor={`filters.${index}.fieldValue`}
                        >Valor</label>
                        <select
                            id={`filters.${index}.fieldValue`}
                            disabled={!fieldName}
                            {...register(`filters.${index}.fieldValue`, {
                                required: true 
                            })}
                        >
                            <option value="">Seleccionar</option>
                            {
                                safeArray<string>(VALORS).map((valor) => (
                                    <option key={valor} value={valor}>
                                        {valor}
                                    </option>
                                ))
                            }
                        </select>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </>
                )}
            </div>
        </fieldset>
    )
}