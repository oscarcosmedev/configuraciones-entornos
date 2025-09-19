import { ZodError } from 'zod'
import { api } from '../lib/axios'
import { ConfigResultsSchema, EditOptionsSchema } from '../schemas/config'
import type { ConfigResult } from '../store/edicion-store'
import type { EditConfigFilter, Entry } from '../types'

// export const EdicionAPI = {
//     updateConfigValue: (id: number, value: string) =>
//         api.post<ConfigResult[]>('edit-config', { id, value }),

//     deleteConfig: (id: number) =>
//         api.post<ConfigResult[]>('delete-config', { id }),
// }

export const EdicionAPI = {

    fetchEditOptions: async () => {
        const [campos, operadores, valores] = await Promise.all([
            api.get('options/campos'),
            api.get('options/operadores'),
            api.get('options/valores'),
        ])

        try {            
            return EditOptionsSchema.parse({
                campos: campos.data,
                operadores: operadores.data,
                valores: valores.data
            })
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(`Respuesta inválida del servidor (opciones): ${error.message}`)
            }
            throw error
        }
    },

    fetchConfigResults: async (filters: EditConfigFilter): Promise<ConfigResult[]> => {

        const response = await api.post('config', { filters })
        
        try {
            return ConfigResultsSchema.parse(response.data)
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(`Respuesta inválida del servidor (búsqueda): ${error.message}`)
            }
            throw error
        }
    },

    updateConfigValue: async (id: number, value: string): Promise<ConfigResult[]> => {

        const response = await api.post('edit-config', { id, value })

        try {
            return ConfigResultsSchema.parse(response.data)
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(`Respuesta inválida del servidor (update): ${error.message}`)
            }
            throw error
        }
    },

    addConfig: async (entry: Entry): Promise<ConfigResult[]> => {

        const response = await api.post('add-config', entry)

        try {
            return ConfigResultsSchema.parse(response.data)
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(`Respuesta inválida del servidor (add): ${error.message}`)
            }
            throw error
        }
    },

    deleteConfig: async (id: number): Promise<ConfigResult[]> => {

        const response = await api.post('delete-config', { id })

        try {
            return ConfigResultsSchema.parse(response.data)
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(`Respuesta inválida del servidor (delete): ${error.message}`)
            }
            throw error
        }
    },
}