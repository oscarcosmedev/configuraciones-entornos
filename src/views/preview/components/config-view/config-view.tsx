import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faCheck, 
    faCopy, 
    faTriangleExclamation 
} from '@fortawesome/free-solid-svg-icons'
import { useConfigStore } from '../../../../store/config-store'
import Spinner from '../../../../components/spinner/spinner'
import { toast } from 'sonner'
import ActionButton from '../../../../components/buttons/button-clean/button'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import './config-view.scss'
import Error from '../../../../components/error/error'



export default function ConfigView() {
    
    /** 1. Llamada por campo */
    const data      = useConfigStore(state => state.data)
    const loading   = useConfigStore(state => state.loading)
    const error     = useConfigStore(state => state.error)

    /** 2. Validación */
    useEffect(() => {
        if (error) {
            toast.error('No se encontraron resultados.', {
                icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
            })
        }
    }, [error])


    /** 3. Copiar al portapapeles */
    const _handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2))
        toast('¡Copia lista!', {
            icon: <FontAwesomeIcon icon ={faCheck} />
        })
    }

    return (
        <>
            {loading && <Spinner />}
            
            {!loading && error && (
                <div className="config-view">
                    <Error 
                        message="No se encontraron resultados."
                        className="error full-width-error"
                    />
                </div>
            )}

            {!loading && !error && data && (
                <div className="config-view">
                    <h3>Configuración</h3>
                    <SyntaxHighlighter
                        language="json"
                        showLineNumbers
                        wrapLongLines
                        className="syntax-highlighter"
                    >
                        {JSON.stringify(data, null, 2)}
                    </SyntaxHighlighter>
                    <ActionButton 
                        label="Copiar"
                        icon={faCopy}
                        onClick={_handleCopy}
                    />
                </div>
            )}
        </>
    )
}
