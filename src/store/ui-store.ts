import { create } from 'zustand'
import type { ReactNode } from 'react'

type UiState = {
    isModalOpen: boolean
    modalContent: ReactNode | null

    openModal: (content: ReactNode) => void
    closeModal: () => void

    // mobile
    isSidebarOpen: boolean
    openSidebar: () => void
    closeSidebar: () => void
    toggleSidebar: () => void
}

export const useUiStore = create<UiState>((set) => ({
    isModalOpen: false,
    modalContent: null,
    
    isSidebarOpen: false, // Estado inicial: sidebar cerrado

    openModal: (content) => {
        set({ 
            isModalOpen: true, 
            modalContent: content 
        })
    },

    closeModal: () => {
        set({ 
            isModalOpen: false, 
            modalContent: null 
        })
    },

    // Acciones para sidebar mobile
    openSidebar: () => set({ isSidebarOpen: true }),
    closeSidebar: () => set({ isSidebarOpen: false }),
    toggleSidebar: () => {
        set((state) => ({ 
            isSidebarOpen: !state.isSidebarOpen
        }))
    }
}))