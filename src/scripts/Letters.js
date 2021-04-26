import { fetchLettersWithTopics, getIt } from "./provider.js"

export const Letters = () => {
    const letters = getIt("letters")
    const pals = getIt("pals")
    const topics = getIt("topics")

    let html = `
        ${
            letters
                .sort( (c,p) => p.id - c.id )
                .map(
                (letter) => {
                    const author = pals.find(p => p.id === letter.sender)
                    const recipient = pals.find(p => p.id === letter.recipient)
                    return `
                        <div class="letter" id="letter--${letter.id}">
                            <header class="letter__header">
                                Dear ${recipient.name} (${recipient.email}),
                            </header>

                            <div>
                                ${letter.content}
                            </div>

                            <footer>
                                <p>Sincerely, ${author.name} (${author.email})</p>
                                <p class="letter__delivered">Sent on ${new Date(letter.dateCreated).toLocaleDateString('en-US')}</p>

                                <div class="tags">
                                    ${
                                        letter.lettertopics
                                            .map(
                                                r => `<span class="letter__tag">
                                                    ${topics.find(t => r.topicId === t.id).label}</span>` || ""
                                            ).join("")
                                    }
                                </div>
                            </footer>
                        </div>
                    `
                }
            ).join("")
        }
    `

    return html
}
