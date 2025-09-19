import { useEffect } from 'react'
import { useConfigStore } from '../../store/config-store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import ConfigView from './components/config-view/config-view'
import SearchForm from './components/search-form/search-form'
import './preview.scss'


export default function Preview() {

    const resetConfigStore = useConfigStore(state => state.reset)

    useEffect(() => {
        resetConfigStore()
    }, [resetConfigStore])

    return (
        <div className="content__page">
            <div className="page-title">
                <h2>
                    <FontAwesomeIcon icon={faEye} /> Preview
                </h2>
            </div>
            <SearchForm />
            <ConfigView />
        </div>
    )
}
