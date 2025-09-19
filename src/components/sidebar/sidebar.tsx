import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faEye, faRightLeft, faShield } from "@fortawesome/free-solid-svg-icons"
import './sidebar.scss'
import { useUiStore } from "../../store/ui-store"



export default function Sidebar() {

    const isSidebarOpen = useUiStore(state => state.isSidebarOpen)
    const closeSidebar = useUiStore(state => state.closeSidebar)
    
    return (
        <>
            <aside className={`sidebar ${isSidebarOpen ? 'sidebar--open' : ''}`}>
                <h3><FontAwesomeIcon icon={faShield} /> Configuración central</h3>
                <nav>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? 'bg-primary' : 'bg-secondary'}
                        onClick={closeSidebar}
                    >
                        <FontAwesomeIcon icon={faEye} /> Preview
                    </NavLink>
                    <NavLink
                        to="/edicion"
                        className={({ isActive }) => isActive ? 'bg-primary' : 'bg-secondary'}
                        onClick={closeSidebar}
                    >
                        <FontAwesomeIcon icon={faEdit} /> Edición
                    </NavLink>
                    <NavLink
                        to="/traspaso"
                        className={({ isActive }) => isActive ? 'bg-primary' : 'bg-secondary'}
                        onClick={closeSidebar}
                    >
                        <FontAwesomeIcon icon={faRightLeft} />
                        Traspaso de ambiente
                    </NavLink>
                </nav>
            </aside>
            <div 
                className={`sidebar-overlay ${isSidebarOpen ? 'active' : '' }`}
                onClick={closeSidebar}
            >
            </div>
        </>
    )
}
