import { z } from 'zod'

// Schema para un solo registro (update config)
export const ConfigResultSchema = z.object({
    id: z.number(),
    clusterName: z.string(),
    applicationName: z.string(),
    artefacto: z.string(),
    key: z.string(),
    value: z.string(),
})

// Schema para la lista completa (update config)
export const ConfigResultsSchema = z.array(ConfigResultSchema)

// Schema para las opciones de filtro en edición
export const EditOptionsSchema = z.object({
    campos: z.array(z.string()),
    operadores: z.array(z.string()),
    valores: z.record(z.string(), z.array(z.string()))
})

// Schema para las opciones de configuración (preview)
export const ConfigOptionsSchema = z.object({
    clusterName: z.array(z.string()),
    appName: z.array(z.string())
})

// Schema para los datos de configuración (preview)
export const ConfigDataSchema = z.object({
    clusterName: z.string(),
    appName: z.string(),
    key: z.string(),
    value: z.string()
})

// Schema para las opciones de transferencia
export const TransferOptionsSchema = z.object({
    clusters: z.array(z.string()),
    apps: z.array(z.string())
})

// Tipos TypeScript inferidos
export type ConfigResults = z.infer<typeof ConfigResultsSchema>
export type EditOptions = z.infer<typeof EditOptionsSchema>
export type ConfigOptions = z.infer<typeof ConfigOptionsSchema>
export type ConfigData = z.infer<typeof ConfigDataSchema>
export type TransferOptionsConfig = z.infer<typeof TransferOptionsSchema>
