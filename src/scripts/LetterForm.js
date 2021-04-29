import { getIt, sendIt } from "./provider.js"
import { stateChanged } from "./util.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "send") {
        const author = document.querySelector("#author").value
        const body = document.querySelector("#body").value
        const recipient = document.querySelector("#recipient").value
        const selectedTopic = document.querySelectorAll("input[name='topic']:checked")

        const letter = {
            sender: parseInt(author),
            recipient: parseInt(recipient),
            content: body,
            dateCreated: Date.now(),
            topicId: parseInt(selectedTopic[0].value)
        }

        sendIt("letters", letter)
    }
})

export const Letter = () => {
    const pals = getIt("pals")
    const topics = getIt("topics")

    let html = `
        <div class="field">
            <label class="label" for="author">Author</label>
            <select name="author" id="author">
                <option>Choose author...</option>
                ${
                    pals.map(
                        author => `<option value="${author.id}">${author.name}</option>`
                    ).join("")
                }
            </select>
        </div>
        <div class="field">
            <label class="label" for="body">Letter</label>
            <textarea id="body" class="letterBody"></textarea>
        </div>
        <div class="field">
            <label class="label" for="topic">Topics</label>
            <div class="fieldGroup">
                ${
                    topics.map(
                        topic => `<input type="radio" name="topic" class="letterTopic" value="${topic.id}" />${topic.label}`
                    ).join("")
                }
            </div>
        </div>
        <div class="field">
            <label class="label" for="recipient">Recipient</label>
            <select name="recipient" id="recipient">
                <option>Choose recipient...</option>
                ${
                    pals.map(
                        recipient => `<option value="${recipient.id}">${recipient.name}</option>`
                    ).join("")
                }
            </select>
        </div>

        <button class="button" id="send">Send Letter</button>
    `

    return html
}

