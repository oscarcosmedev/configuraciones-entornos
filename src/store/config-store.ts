import { create } from 'zustand'
import { ConfigAPI } from '../services/config'
import type { ConfigState } from '../types'


export const useConfigStore = create<ConfigState>((set) => ({

    appName: [],
    clusterName: [],
    data: null,
    loading: false,
    error: null,
    fetched: false,

    fetchOptions: async () => {

        set({ 
            loading: true, 
            error: null,
            fetched: false,
        })

        try {
            
            const options = await ConfigAPI.fetchOptions()

            set({
                clusterName: options.clusterName,
                appName: options.appName,
                loading: false,
            })

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido'
            set({ 
                clusterName: [],
                appName: [],
                error: message, 
                loading: false 
            })
        }
    },

    fetchConfigResults: async (clusterName: string, appName: string) => {
        
        set({ 
            loading: true, 
            error: null,
            fetched: false,
        })

        try {
            
            const data = await ConfigAPI.fetchConfigResults(clusterName, appName)
            
            set({
                data,
                loading: false,
                fetched: true
            })
             
                
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido'
            set({ 
                data: null,
                error: message, 
                loading: false,
                fetched: true
            })
        }
    },

    reset: () => {
        set({
            clusterName: [],
            appName: [],
            data: null,
            loading: false,
            error: null,
            fetched: false,
        })
    },

    simulateError: () => {
        set({
            error: 'No se encontraron coincidencias',
            loading: false
        })
    }
}))
