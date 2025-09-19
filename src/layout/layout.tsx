import { Outlet } from "react-router-dom"
import Header from "../components/header/header"
import Sidebar from "../components/sidebar/sidebar"
import Toast from "../components/toast/toast"
// import { Toaster } from 'sonner'
import '../style/_variables.scss'
import './layout.scss'

export const Layout = () => {
	return (
		<>
			<Header />
			<div className="layout">
				<div className="container">
					<Sidebar />
					<Outlet />
					<Toast />
				</div>
			</div>
		</>
	)
}