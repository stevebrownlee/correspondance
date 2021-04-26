import { PenPals } from "./PenPals.js"
import { fetchIt, fetchLettersWithTopics } from "./provider.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchIt("pals")
        .then(() => fetchIt("topics"))
        .then(() => fetchLettersWithTopics())
        .then(() => mainContainer.innerHTML = PenPals())
}

render()

mainContainer.addEventListener("stateChanged", customEvent => {
    render()
})
