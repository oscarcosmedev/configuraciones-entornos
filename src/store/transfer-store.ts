import { create } from 'zustand'
import axios from 'axios'
import { TransferAPI } from '../services/transfer'
import type { TransferConfig } from '../types'

type ApiResponse = {
    success: boolean
    message: string
}

type TransferStore = {
    clusters: string[]
    apps: string[]
    loading: boolean
    error: string | null
    isTransferring: boolean

    // Acciones
    fetchOptions: () => Promise<void>
    clearOptions: () => void
    startTransfer: (data: TransferConfig) => Promise<ApiResponse>

    // Reset State
    reset: () => void
}

export const useTransferStore = create<TransferStore>((set) => ({
    clusters: [],
    apps: [],
    loading: false,
    error: null,
    isTransferring: false,

    // Acción: obtener clusters y apps
    fetchOptions: async () => {
        set({ 
            loading: true, 
            error: null 
        })

        try {
            const options = await TransferAPI.fetchOptions()

            set({
                clusters: options.clusters,
                apps: options.apps,
                loading: false,
            })

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido'
            set({ 
                error: message, 
                loading: false,
                clusters: [],
                apps: []
            })
        }
    },

    // Acción: limpiar datos del store
    clearOptions: () => {
        set({
            clusters: [],
            apps: [],
            error: null,
            loading: false,
        })
    },
    
    // Acción: envío del formulario
    startTransfer: async (data) => {
        set({ 
            isTransferring: true,
            error: null
        })

        try {
            // Llamada real al endpoint configurado en MSW
            const response = await axios.post<ApiResponse>(
                '/api/transfer',
                data
            )
            // Asumimos { success: true, message: "..." }
            set({ 
                isTransferring: false 
            })

            return response.data

        } catch (err) {
            // Extraemos mensaje de error
            let message = 'Error en el traspaso'
            
            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message ?? err.message
            } else if (err instanceof Error) {
                message = err.message
            }

            set({ 
                isTransferring: false, 
                error: message 
            })
            
            throw new Error(message)
        }
    },

    reset: () => set({
        clusters: [],
        apps: [],
        loading: false,
        error: null,
        isTransferring: false
    })
}))
