import { useEffect, useState, useMemo, useRef } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    type SortingState,
    type ColumnDef,
} from '@tanstack/react-table'
import { useEdicionStore, type ConfigResult } from '../../../../store/edicion-store'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'sonner'
import Spinner from '../../../../components/spinner/spinner'
import { dataColumns } from '../../../../helpers/helpers'
import { RowActions } from '../row-actions/row-actions'
import './edicion-config-results.scss'
import Error from '../../../../components/error/error'




export default function EdicionConfigResults() {
    // 1. Selectores del store: loading, error y resultados crudos
    const loading       = useEdicionStore((state) => state.loading)
    const error         = useEdicionStore((state) => state.error)
    const rowResults    = useEdicionStore((state) => state.results)

    // 2. Memoizar resultados para evitar recreación de array en cada render
    const results = useMemo<ConfigResult[]>(() => rowResults ?? [], [rowResults])

    // 3. Estados locales para ordenamiento y filtro global
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    // 4. Asegurar tipo de columnas para la Tabla
    const columns = useMemo((): ColumnDef<ConfigResult, unknown>[] => [
        ...dataColumns,
        {
            id: 'acciones',
            header: 'Acciones',
            cell: ({ row }) => <RowActions row={row.original} />,
        },
    ], [])

    // 5. Instanciar TanStack Table
    const table = useReactTable<ConfigResult>({
        data: results,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    // selector para cerrar dropdown
    const setOpenDropdownId = useEdicionStore(state => state.setOpenDropdownId)

    // Listener global para clicks fuera de .actions
    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            const tgt = e.target as HTMLElement
            
            if (!tgt.closest('.actions')) {
                setOpenDropdownId(null)
            }
        }

        document.addEventListener('mousedown', handleGlobalClick)

        return () => {
            document.removeEventListener('mousedown', handleGlobalClick)
        }
    }, [setOpenDropdownId])

    // 6. Effect para mostrar toasts según estado de error o datos
    useEffect(() => {
        if (error) {
            toast.error('Error', {
                description: 'Verificá tu configuración',
                icon: <FontAwesomeIcon icon={faExclamation} />,
            })
        }
    }, [error])

    useEffect(() => {
        if (rowResults && rowResults.length === 0) {
            toast.success('No se encontraron registros', {
                description: 'Intenta con otros filtros',
                icon: <FontAwesomeIcon icon={faExclamation} />,
            })
        }
    }, [rowResults])

    // Ref para desplazamiento hacia la tabla
    const tableSectionRef = useRef<HTMLDivElement | null>(null)

    function scrollToTableSection() {
        if (window.innerWidth < 768) {

            const section = tableSectionRef.current

            if (section) {
                
                const headerOffset = 100
                const elementPosition = section.getBoundingClientRect().top + window.scrollY - headerOffset
                const startPosition = window.scrollY
                const distance = elementPosition - startPosition
                const duration = 800
                let start: number | null = null

                function step(timestamp: number) {
                    if (!start) start = timestamp
                    const progress = timestamp - start
                    const percent = Math.min(progress / duration, 1)
                    window.scrollTo(0, startPosition + distance * percent)
                    if (progress < duration) {
                        window.requestAnimationFrame(step)
                    }
                }

                window.requestAnimationFrame(step)
            }
        }
    }

    useEffect(() => {
        scrollToTableSection()
    }, [results])


    // 7. Render de la tabla con sorting
    return (
        <>
            {loading && <Spinner />}

            {!loading && error && (
                <Error 
                    message='No se encontraron resultados con los filtros actuales.'
                />
            )}
            
            {!loading && !error && results && results.length > 0 && (
                <div ref={tableSectionRef}className="edicion-config-results">
                    <div className="table-container">
                        <table>
                            <colgroup>
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                            </colgroup>
                            <thead>
                                {table.getHeaderGroups().map(hg => (
                                    <tr key={hg.id}>
                                        {hg.headers.map(header => (
                                            <th
                                                key={header.id}
                                                onClick={
                                                    header.column.getCanSort()
                                                        ? header.column.getToggleSortingHandler()
                                                        : undefined
                                                }
                                                className={header.column.getCanSort() ? 'sortable' : ''}
                                            >
                                                <div>
                                                    <span>
                                                        {flexRender(
                                                            header.column.columnDef.header, 
                                                            header.getContext()
                                                        )}
                                                    </span>
                                                    {header.column.getCanSort() && (
                                                        (() => {
                                                            const sorted = header.column.getIsSorted() as string | false
                                                            if (sorted === 'asc') return <FontAwesomeIcon icon={faCaretUp} />
                                                            if (sorted === 'desc') return <FontAwesomeIcon icon={faCaretDown} />
                                                            return <FontAwesomeIcon icon={faCaretDown} style={{ opacity: 0.6 }} />
                                                        })()
                                                    )}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <td 
                                                key={cell.id}
                                                data-label={cell.column.columnDef.header}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell, 
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}
