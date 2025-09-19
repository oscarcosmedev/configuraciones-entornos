import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../layout/layout'
import { lazy, Suspense } from 'react'
import Spinner from '../components/spinner/spinner'
import ModalRoot from '../components/modal/modal'

const Preview = lazy(() => import('../views/preview/preview'))
const Edicion = lazy(() => import('../views/edicion/edicion'))
const Traspaso = lazy(() => import('../views/traspaso/traspaso'))


export default function Router() {

    return (
        <BrowserRouter>
            <ModalRoot />
            <Suspense fallback={<Spinner />}>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path='/' element={<Preview />} />
                        <Route path='/edicion' element={<Edicion />} />
                        <Route path='/traspaso' element={<Traspaso />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
