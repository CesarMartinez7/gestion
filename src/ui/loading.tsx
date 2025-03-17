import { Icon } from "@iconify/react/dist/iconify.js"

export default function Loading(){
    return(
        <main className="w-full h-[90vh] grid place-content-center ">
            <Icon icon="svg-spinners:blocks-shuffle-3" width="34" height="34" />
        </main>
    )
}