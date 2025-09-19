import { useRef, useState, useEffect } from 'react'
import { faClose, faEllipsisVertical, faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { openModal } from '../../../../helpers/helpers'
import DeleteConfirmModal from '../delete-confirm-modal/delete-confirm-modal'
import EditValueModal from '../edit-config-modal/edit-config-modal'
import ShowConfigModal from '../show-config-modal/show-config-modal'
import { useEdicionStore, type ConfigResult } from '../../../../store/edicion-store'
import ActionButton from '../../../../components/buttons/button-clean/button'

export function RowActions({ row }: { row: ConfigResult }) {

    // 1. Selectores del store para abrir/cerra dropdown global
    const openDropdownId        = useEdicionStore(state => state.openDropdownId)
    const setOpenDropdownId     = useEdicionStore(state => state.setOpenDropdownId)

    // 2. Acciones
    const updateConfigValue     = useEdicionStore(state => state.updateConfigValue)
    const deleteConfig          = useEdicionStore(state => state.deleteConfig)

    // Estado local para saber si el menú va hacia arriba o abajo
    const [dropUp, setDropUp] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const menuRef = useRef<HTMLUListElement>(null)

    // 3. Determinar si este dropdown está abierto
    const isOpen = openDropdownId === row.id

    // 4. Handler toggle: cierra cualquier otro y abre este (o cierra si ya estaba)
    const toggleMenu = () => {
        setOpenDropdownId(isOpen ? null : row.id)
    }

    // Efecto: decide dirección del menú cuando se abre
    useEffect(() => {
        if (isOpen && dropdownRef.current && menuRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect()
            const menuHeight = menuRef.current.offsetHeight
            const espacioAbajo = window.innerHeight - rect.bottom
            const espacioArriba = rect.top

            if (espacioAbajo < menuHeight && espacioArriba > espacioAbajo) {
                setDropUp(true)
            } else {
                setDropUp(false)
            }
        }
    }, [isOpen])

    // Recalcula dirección cuando se hace resize mientras está abierto
    useEffect(() => {
        if (!isOpen) return

        const handler = () => {
            if (dropdownRef.current && menuRef.current) {
                const rect = dropdownRef.current.getBoundingClientRect()
                const menuHeight = menuRef.current.offsetHeight
                const espacioAbajo = window.innerHeight - rect.bottom
                const espacioArriba = rect.top

                if (espacioAbajo < menuHeight && espacioArriba > espacioAbajo) {
                    setDropUp(true)
                } else {
                    setDropUp(false)
                }
            }
        }

        window.addEventListener('resize', handler)
        window.addEventListener('scroll', handler, true)
        return () => {
            window.removeEventListener('resize', handler)
            window.removeEventListener('scroll', handler, true)
        }
    }, [isOpen])

    return (
        <div className="actions">
            {/* Desktop: iconos siempre visibles */}
            <div className="action-icons">
                <ActionButton 
                    isIcon
                    icon={faEye}
                    className='clickable'
                    onClick={() => openModal(<ShowConfigModal row={row} />)}
                />
                
                <ActionButton 
                    isIcon
                    icon={faPenToSquare}
                    className="clickable"
                    onClick={() =>
                        openModal(
                            <EditValueModal
                                row={row}
                                onSave={newVal => updateConfigValue(row.id, newVal)}
                            />
                        )
                    }
                />


                <input id="filter-delete" type="checkbox" />
                
                <ActionButton
                    isIcon
                    icon={faClose}
                    className="clickable"
                    onClick={() =>
                        openModal(
                            <DeleteConfirmModal
                                message="¿Estás seguro que deseas eliminar?"
                                onConfirm={() => deleteConfig(row.id)}
                            />
                        )
                    }
                />
            </div>

            {/* --- Mobile: dropdown --- */}
            <div className="dropdown" ref={dropdownRef}>
                <div className="dropdown-toggle" onClick={toggleMenu}>
                    <ActionButton
                        isIcon
                        icon={faEllipsisVertical}
                    />
                </div>
                {isOpen && (
                    <ul 
                        className={`dropdown-menu${dropUp ? ' drop-up' : ''}`}
                        ref={menuRef}
                    >
                        <li onClick={() => openModal(<ShowConfigModal row={row} />)}>
                            <ActionButton isIcon icon={faEye} />
                            <span>Ver</span>
                        </li>
                        <li
                            onClick={() =>
                                openModal(
                                    <EditValueModal
                                        row={row}
                                        onSave={newVal => updateConfigValue(row.id, newVal)}
                                    />
                                )
                            }
                        >
                            <ActionButton isIcon icon={faPenToSquare} />
                            <span>Editar</span>
                        </li>
                        <li>
                            <label>
                                <input type="checkbox" />
                                <span>Seleccionar</span>
                            </label>
                        </li>
                        <li
                            onClick={() =>
                                openModal(
                                    <DeleteConfirmModal
                                        message="¿Estás seguro que deseas eliminar?"
                                        onConfirm={() => deleteConfig(row.id)}
                                    />
                                )
                            }
                        >
                            <ActionButton isIcon icon={faClose} />
                            <span>Eliminar</span>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}
