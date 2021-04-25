import { Letter } from "./LetterForm.js"
import { Letters } from "./Letters.js"

export const PenPals = () => {
    return `
        <nav class="nav">
            <h1 class="nav__title">Pen Pal Society</h1>
        </nav>

        <section class="letterForm">
            ${ Letter() }
        </section>

        <section class="letters">
            <h2>Letters</h2>
            ${ Letters() }
        </section>
    `
}