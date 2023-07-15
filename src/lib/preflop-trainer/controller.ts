import { Card, PIPS, SUITS } from "./card"

const NUMBER_OF_HOLE_CARDS = 2

export function getVillanCards(
    numberOfHands: number,
    heroCards: Card[]
): Card[][] {
    const villanCards: Card[][] = []

    let deck = SUITS.flatMap(suit =>
        PIPS.map(pip => ({
            suit,
            pip
        } as Card))
    )

    heroCards.forEach(heroCard => {
        deck = deck.filter(deckCard => deckCard !== heroCard)
    })

    for (let i = 0; i < numberOfHands; i++) {
        villanCards.push([])
        for (let j = 0; j < NUMBER_OF_HOLE_CARDS; j++) {
            const cardIndex = Math.floor(Math.random() * deck.length)

            villanCards[i].push(deck[cardIndex])

            deck.splice(cardIndex, 1)
        }
    }

    return villanCards
}