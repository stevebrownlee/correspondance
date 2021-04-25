import { stateChanged } from "./util.js"

const API = "http://localhost:8088"

const state = {
    pals: [],
    letters: [],
    topics: [],
    lettertopics: [],
    lastLetterCreated: null
}


export const fetchIt = (resource) => {
    return fetch(`${API}/${resource}`)
        .then(response => response.json())
        .then( data => state[resource] = data )
}

export const deleteIt = (resource, id) => {
    return fetch(
        `${API}/${resource}/${id}`,
        { method: "DELETE" }
    )
        .then(stateChanged)
}

export const sendIt = (resource, newState, broadcast=true) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newState)
    }

    return fetch(`${API}/${resource}`, fetchOptions)
        .then(response => response.json())
        .then(data => {
            state.lastLetterCreated = data
        })
        .then(() => {
            if (broadcast) {
                stateChanged()
            }
        })
}

export const getLastLetter = () => {
    return state.lastLetterCreated
}

export const getIt = (resource) => {
    return [...state[resource]]
}
