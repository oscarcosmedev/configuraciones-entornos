import { ZodError } from 'zod'
import { api } from '../lib/axios'
import { ConfigOptionsSchema, ConfigDataSchema } from '../schemas/config'
import type { ConfigData } from '../types'

export const ConfigAPI = {

    fetchOptions: async () => {
        const [clusterName, appName] = await Promise.all([
            api.get<string[]>('/preview/clusterName'),
            api.get<string[]>('/preview/appName'),
        ])

        try {
            return ConfigOptionsSchema.parse({
                clusterName: clusterName.data,
                appName: appName.data
            })
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(`Respuesta inválida del servidor (opciones): ${error.message}`)
            }
            throw error
        }
    },

    fetchConfigResults: async (clusterName: string, appName: string): Promise<ConfigData> => {
        
        // Validación especial para testing
        if (appName === 'ER-Test') {
            throw new Error('No se encontraron resultados.')
        }
        
        const response = await api.get<ConfigData>('/preview/config', {
            params: { clusterName, appName }
        })
        
        try {
            const data = ConfigDataSchema.parse(response.data)
            
            // Validar si la respuesta está vacía
            if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
                throw new Error('No se encontraron resultados.')
            }
            
            return data
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(`Respuesta inválida del servidor (configuración): ${error.message}`)
            }
            throw error
        }
    }
}