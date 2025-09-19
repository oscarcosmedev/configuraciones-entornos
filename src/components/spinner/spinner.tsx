import './spinner.scss'

export default function Spinner() {
    return (
        <>
            <div className='spinner-container'>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </div>
        </>
    )
}
