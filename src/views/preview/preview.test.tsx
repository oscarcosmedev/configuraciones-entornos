import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, vi, beforeEach, expect } from 'vitest'

import Preview from '../../views/preview/preview'

// 1) Mockear el store de Zustand para capturar reset()
const mockReset = vi.fn()
vi.mock('../../store/config-store', () => ({
  useConfigStore: (selector: (store: { reset: () => void }) => unknown) => selector({ reset: mockReset }),
}))

// 2) Mockear componentes hijos para aislar el test
vi.mock(
  '../components/search-form/search-form',
  () => ({ default: () => <div data-testid="search-form">SearchForm</div> })
)
vi.mock(
  '../components/config-view/config-view',
  () => ({ default: () => <div data-testid="config-view">ConfigView</div> })
)

// Ahora importamos Preview, tras los mocks

describe('Preview Component', () => {
  beforeEach(() => {
    mockReset.mockClear() // Limpiar historial de llamadas
  })

  it('se renderiza correctamente y llama a resetConfigStore', async () => {
    render(<Preview />) // Renderizar el componente

    // 3) Comprobaciones básicas de renderizado
    expect(screen.getByRole('heading', { name: /preview/i })).toBeInTheDocument()
    expect(screen.getByTestId('search-form')).toBeInTheDocument()
    expect(screen.getByTestId('config-view')).toBeInTheDocument()

    // 4) Esperar a que useEffect ejecute mockReset()
    await waitFor(() => {
      expect(mockReset).toHaveBeenCalledTimes(1)
    })
  })
})


// describe('Preview', () => {

//     test('Deberia sumar dos number', () => {
//         expect(1+1).toBe(3)
//     })
// })