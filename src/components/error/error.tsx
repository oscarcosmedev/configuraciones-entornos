import type { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import './error.scss'


type ErrorProps = {
    message?: string | null
    icon?: ReactNode
    className?: string
}

export default function Error({
    message,
    icon,
    className = '',
}: ErrorProps) {
    
    if (!message) return null

    const defaultIcon = <FontAwesomeIcon icon={faTriangleExclamation} />

    return (
        <div
            className={`error-container ${className}`}
            role="alert"
            aria-live="assertive"
        >
            <div className="error-icon">{icon || defaultIcon}</div>
            <p className="error-message">{message}</p>
        </div>
    )
}