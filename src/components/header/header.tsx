import { faBars, faBlog } from '@fortawesome/free-solid-svg-icons'
import ActionButton from '../buttons/button-clean/button'
import './header.css'
import { useUiStore } from '../../store/ui-store'

export default function Header() {

    const toggleSidebar = useUiStore(state => state.toggleSidebar)

    return (
        <header>
            <div className="container">
                <ActionButton
                    isIcon
                    icon={faBars}
                    className='icon-burger'
                    onClick={toggleSidebar} 
                />
                <div>
                    <a className='logo' href="/">
                        <ActionButton 
                            isIcon
                            icon={faBlog}
                        />
                    </a>
                </div>
            </div>
        </header>
    )
}
