import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormFromTo from "./components/form-from-to/form-from-to";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { useTransferStore } from "../../store/transfer-store";
import { useEffect } from "react";

export default function Traspaso() {

    const reset = useTransferStore(state => state.reset)

    useEffect(() => {
        reset()
    }, [reset])

    return (
        <div className="content__page">
            <div className="page-title">
                <h2>
                    <FontAwesomeIcon icon={faRightLeft} />
                    Traspaso de ambiente
                </h2>
            </div>
            <FormFromTo />
        </div>
    )
}
