import { useEffect } from "react"
import { useEdicionStore } from "../../store/edicion-store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import EdicionConfigResults from "./components/edicion-config-results/edicion-config-results"
import EdicionSearchForm from "./components/edicion-search-form/edicion-search-form"

export default function Edicion() {
    const reset = useEdicionStore(state => state.reset)

    useEffect(() => {
        reset()
    }, [reset])

    return (
        <div className="content__page">
            <div className="page-title">
                <h2>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Edición
                </h2>
            </div>
            <EdicionSearchForm />
            <EdicionConfigResults />
        </div>
    )
}
