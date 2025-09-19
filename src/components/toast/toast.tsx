import { Toaster } from "sonner";
import './toast.scss';

export default function Toast() {
    
    return (
        <>
            <Toaster
                className="toast-custom"
                position='bottom-right'
                visibleToasts={1}
                toastOptions={{
                    style: {
                        background: 'var(--toast-bg)',
                        color: 'var(--toast-text-default)'
                    }
                }}
            />
        </>
    )
}
