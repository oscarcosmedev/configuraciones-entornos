import { faCheck, faClose, faExclamation, faEye, faPenToSquare } from "@fortawesome/pro-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import './edicion-config-results.scss'
import { useEdicionStore, type ConfigResult } from "../../../../store/edicion-store"
import { openModal } from "../../../../helpers/helpers"
import DeleteConfirmModal from "../delete-confirm-modal/delete-confirm-modal"
import EditValueModal from "../edit-config-modal/edit-config-modal"
import ShowConfigModal from "../show-config-modal/show-config-modal"
import { useEffect } from "react"
import { toast } from "sonner"
import Spinner from "../../../../components/spinner/spinner"


export default function EdicionConfigResults() {

    const loading = useEdicionStore(state => state.loading)
    const error   = useEdicionStore(state => state.error)
    const results = useEdicionStore(state => state.results)

    const updateConfigValue = useEdicionStore(state => state.updateConfigValue)
    const deleteConfig = useEdicionStore(state => state.deleteConfig)

    /** Validaciones */

    // Mostrar toast de error
    useEffect( () => {
        if(error) {
            toast.error('Error', {
                description: 'Verificá tu configuración',
                icon: <FontAwesomeIcon icon={faExclamation} />,
            })
        }  
    }, [error] )

    // Mostrar toast de "no hay registros"
    useEffect(() => {
        if (results && results.length === 0) {
            toast.success('No se encontraron registros', {
                description: 'Intenta con otros filtros',
                icon: <FontAwesomeIcon icon={faExclamation} />,
            })
        }
    }, [results])

    // Toast de éxito
    useEffect(() => {
        if (results && results.length > 0) {
            toast.success('Datos cargados correctamente', {
                icon: <FontAwesomeIcon icon={faCheck} />,
            })
        }
    }, [results]);
    
    /** 1. Mientras carga, mostramos loader */
    if (loading) return <Spinner />

    /** 2. Si hay error, no renderizo nada (solo el toast ya se mostró) */
    if (error) return null;

    /** 3. Si aún no ha buscado (results === null), no renderizamos nada */
    if (results === null) return null

    // A estas alturas, results es un array (vacío o con datos)
    
    /** 4. Renderizamos */
    return (
        <>
            <div className="edicion-config-results">
                <table>
                    <thead>
                        <tr>
                            <th>ClusterName</th>
                            <th>Artefacto</th>
                            <th>Key</th>
                            <th>Value</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((row: ConfigResult) => (
                            <tr key={row.id}>
                                <td>{row.clusterName}</td>
                                <td>{row.artefacto}</td>
                                <td>{row.key}</td>
                                <td>{row.value}</td>
                                <td>
                                    <div className="actions">
                                        <FontAwesomeIcon 
                                            icon={faEye}
                                            className="clickable"
                                            onClick={() => {
                                                openModal(
                                                    <ShowConfigModal 
                                                        row={row}
                                                    />
                                                )
                                            }}
                                        />
                                        <FontAwesomeIcon 
                                            icon={faPenToSquare}
                                            className="clickable"
                                            onClick={() => {
                                                openModal(
                                                    <EditValueModal 
                                                        row={row}
                                                        onSave={(newVal) => updateConfigValue(row.id, newVal)}
                                                    />
                                                )
                                            }}
                                        />
                                        <input type="checkbox" />
                                        <FontAwesomeIcon 
                                            icon={faClose}
                                            className="clickable"
                                            onClick={() => {
                                                openModal(
                                                    <DeleteConfirmModal
                                                        message="¿Estás seguro que desea eliminar el registro?" 
                                                        onConfirm={ () => deleteConfig(row.id)}
                                                    />
                                                )
                                            }} 
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
