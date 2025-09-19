import { useUiStore } from "../store/ui-store"
import { createColumnHelper } from '@tanstack/react-table'
import type { ConfigResult } from "../store/edicion-store"

export const openModal = (content: React.ReactNode) =>
    useUiStore.getState().openModal(content)

export const closeModal = () =>
    useUiStore.getState().closeModal()


/** Tablas */
const columnHelper = createColumnHelper<ConfigResult>()
export const dataColumns = [
    columnHelper.accessor('clusterName', { header: 'ClusterName' }),
    columnHelper.accessor('artefacto', { header: 'Artefacto' }),
    columnHelper.accessor('key', { header: 'Key' }),
    columnHelper.accessor('value', { header: 'Value' }),
]


// Devuelve el array si lo es, o un array vacío en caso contrario
export function safeArray<Tipo = unknown>(input: unknown): Tipo[] {
    return Array.isArray(input) ? input : []
}