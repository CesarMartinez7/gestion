import GatoCacorro from "../assets/gatocacorro.svg"

export default function NotData() {
    return (
        <div className="w-full h-[60vh] grid place-content-center gap-2">
            <div>
                <img src={GatoCacorro} alt="Imagen de no data" className="w-62" />
            </div>
            <p className="text-lg">No tienes registros disponibles ahora.</p>
        </div>
    )
}