import { createRoot } from 'react-dom/client'
import './style/index.css'
import Router from './router/router.tsx'

async function enableMSW() {
    if (import.meta.env.DEV) {
        const { worker } = await import('./mocks/browser')
        await worker.start({
            serviceWorker: {
                url: '/mockServiceWorker.js',
            },
            onUnhandledRequest: 'bypass',
        })
        console.log('MSW ready!')
    }
}

enableMSW().then(() => {
    createRoot(document.getElementById('root')!).render(
        <Router />
    )
})
