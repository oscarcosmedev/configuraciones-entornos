import { ZodError } from 'zod'
import { api } from '../lib/axios'
import { TransferOptionsSchema } from '../schemas/config'

export const TransferAPI = {

    fetchOptions: async () => {
        const [clusters, apps] = await Promise.all([
            api.get<string[]>('/transfer/clusterName'),
            api.get<string[]>('/transfer/appName'),
        ])

        try {
            return TransferOptionsSchema.parse({
                clusters: clusters.data,
                apps: apps.data
            })
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(`Respuesta inválida del servidor (opciones): ${error.message}`)
            }
            throw error
        }
    }
}