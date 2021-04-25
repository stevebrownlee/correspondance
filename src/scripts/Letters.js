import { getIt } from "./provider.js"

export const Letters = () => {
    const letters = getIt("letters")
    const pals = getIt("pals")

    let html = `
        ${
            letters.map(
                (letter) => {
                    const author = pals.find(p => p.id === letter.sender)
                    const recipient = pals.find(p => p.id === letter.recipient)
                    return `
                        <div class="letter" id="letter--${letter.id}">
                            Dear ${recipient.name},

                            <div>
                                ${letter.content}
                            </div>

                            <div>
                                Sincerely, ${author.name}
                            </div>
                        </div>
                    `
                }
            ).join("")
        }
    `

    return html
}
