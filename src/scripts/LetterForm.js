import { getIt, getLastLetter, sendIt } from "./provider.js"
import { stateChanged } from "./util.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "send") {
        const author = document.querySelector("#author").value
        const body = document.querySelector("#body").value
        const recipient = document.querySelector("#recipient").value

        const topics = Array.from(document.getElementsByClassName("letterTopic"))
        const chosenTopics = topics.reduce(
            (group, current) => {
                if (current.checked) {
                    const [,topicId] = current.id.split("--")
                    group.push(parseInt(topicId))
                }
                return group
            },
            []
        )

        const letter = {
            sender: parseInt(author),
            recipient: parseInt(recipient),
            content: body,
            dateCreated: Date.now()
        }

        sendIt("letters", letter, false)
            .then(
                () => {
                    const lastLetter = getLastLetter()
                    for (const topic of chosenTopics) {
                        sendIt("lettertopics", {
                            letterId: lastLetter.id,
                            topicId: topic
                        }, false)
                    }
                }
            )
            .then(stateChanged)
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
                        topic => `<input type="checkbox" class="letterTopic" id="topic--${topic.id}" />${topic.label}`
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

