import { PenPals } from "./PenPals.js"
import { fetchIt } from "./provider.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchIt("pals")
        .then(() => fetchIt("topics"))
        .then(() => fetchIt("letters"))
        .then(() => mainContainer.innerHTML = PenPals())
}

render()

mainContainer.addEventListener("stateChanged", customEvent => {
    render()
})
