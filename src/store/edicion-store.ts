import { create } from 'zustand'
import type { EditConfigFilter, Entry } from '../types'
import { EdicionAPI } from '../services/edicion'


export type ConfigResult = {
    id: number
    clusterName: string
    applicationName: string
    artefacto: string
    key: string
    value: string
}


type EdicionState = {
    campo: string[]
    operador: string[]
    valor: string[]

    valorOptions: Record<string, string[]>

    loading: boolean
    error: string | null

    results: ConfigResult[] | null

    // Acciones
    fetchEditOptions: () => Promise<void>

    getValoresByCampo: (campo: string) => string[] | null

    fetchConfigResults: (filters: EditConfigFilter) => Promise<void>
    clearConfigResults: () => void

    addConfig: (entry: Entry) => Promise<void>
    updateConfigValue: (id: number, newValue: string) => Promise<void>
    deleteConfig: (id: number) => Promise<void>

    // Acciones dropdown
    openDropdownId: number | null
    setOpenDropdownId: (id: number | null) => void

    // Reset State
    reset: () => void
}

export const useEdicionStore = create<EdicionState>((set, get) => ({

    campo: [],
    operador: [],
    valor: [],
    valorOptions: {},

    loading: false,
    error: null,
    results: null,
    // Estado para controlar qué dropdown está abierto
    openDropdownId: null,
    setOpenDropdownId: (id: number | null) => set({ openDropdownId: id }),

    fetchEditOptions: async () => {

        set({
            loading: true,
            error: null
        })

        try {
            const validatedData = await EdicionAPI.fetchEditOptions()
            
            set({
                campo: validatedData.campos,
                operador: validatedData.operadores,
                valorOptions: validatedData.valores,
                loading: false,
            })
        } catch (error) {

            const message = error instanceof Error ? error.message : 'Error desconocido'

            set({
                campo: [],
                operador: [],
                valor: [],
                valorOptions: {},
                error: message,
                loading: false
            })
        }
    },

    getValoresByCampo: (campo) => {
        if (campo === 'Value') return null
        const { valorOptions } = get()
        return valorOptions[campo] || []
    },

    fetchConfigResults: async (filters) => {
        set({
            loading: true,
            error: null
        })

        try {
            const validatedData = await EdicionAPI.fetchConfigResults(filters)
            
            if (validatedData.length === 0) {
                set({
                    results: [],
                    loading: false,
                    error: 'No se encontraron registros con los filtros seleccionados.'
                })
                return
            }
            
            set({
                results: validatedData,
                loading: false,
            })
            
        } catch (error) {
            
            const message = error instanceof Error ? error.message : 'Error desconocido'
            
            set({
                campo: [],
                operador: [],
                valor: [],
                valorOptions: {},
                error: message,
                loading: false,
                results: null
            })
        }
    },

    clearConfigResults: () => {
        set({
            results: null,
            error: null,
            loading: false,
        })
    },

    addConfig: async (entry) => {

        set({
            loading: true,
            error: null
        })

        try {

            const updatedList = await EdicionAPI.addConfig(entry)

            set({
                results: updatedList,
                loading: false
            })

        } catch (error) {
            
            const message = error instanceof Error ? error.message : 'Error desconocido'
           
            set({
                error: message,
                loading: false
            })
        }
    },

    updateConfigValue: async (id, newValue) => {

        set({
            loading: true,
            error: null
        })

        try {

            const updatedList = await EdicionAPI.updateConfigValue(id, newValue)

            set({
                results: updatedList,
                loading: false
            })

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error desconocido'
            set({
                error: message,
                loading: false
            })
        }
    },

    // Acción para ELIMINAR un registro
    deleteConfig: async (id) => {

        set({
            loading: true,
            error: null
        })

        try {
            const newList = await EdicionAPI.deleteConfig(id)

            set({
                results: newList,
                loading: false
            })

        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al eliminar configuración'
            set({ 
                error: message, 
                loading: false 
            })
        }
    },

    reset: () => set({
        campo: [],
        operador: [],
        valor: [],
        valorOptions: {},
        loading: false,
        error: null,
        results: null,
        openDropdownId: null
    })

}))