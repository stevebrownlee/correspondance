const mainContainer = document.querySelector("#container")
export const stateChanged = () => mainContainer.dispatchEvent(new CustomEvent("stateChanged"))