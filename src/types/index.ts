export type Cluster = {
    id: number
    clusterName: string
    appName: string
}

export type SearchConfig = {
    clusterName: string
    appName: string
}

/** Preview */
export type PreviewConfig = {
    clusterName: string
    appName: string
}

export type ConfigData = {
    clusterName: string
    appName: string
    key:string
    value: string
}

/** -- Store   */
export type ConfigState = {
    appName: string[]
    clusterName: string[]
    data: ConfigData | null
    loading: boolean
    error: string | null
    fetched: boolean
    fetchOptions: () => Promise<void>
    fetchConfigResults: (clusterName: string, appName: string) => Promise<void>
    // fetch: (clusterName: string, appName: string) => Promise<void>
    reset: () => void
    simulateError: () => void
}

/** Traslado */
export type TransferConfig = {
    originClusterName: string
    originAppName: string
    destinyClusterName: string
    destinyAppName: string
}
/** */

export type EditConfig = {
    fieldName: string
    fieldOperator: string
    fieldValue: string
}


/** Entry */
export type Entry = {
    clusterName: string
    applicationName: string
    key: string
    value: string
}

export type EntryState = {
    clusterName: string
    applicationName: string
    key: string;
    value: string;
}

/** Una sola fila de filtro */
export type Filter = {
    fieldName: string
    fieldOperator: string
    fieldValue: string
}

/** Forma final del formulario (array de filtros) */
export type EditConfigFilter = {
    filters: Filter[]
}