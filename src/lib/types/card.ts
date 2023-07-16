export const SUITS = ['C', 'D', 'H', 'S']
export const PIPS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const SUITED = 's'
const OFFSUIT = 'o'

export type Card = {
    suit: typeof SUITS[number],
    pip: typeof PIPS[number]
}

export function getCardString({
    suit,
    pip
}: Card) {
    return pip+suit;
}

export function getHoldemCardQuality(cards: Card[]): string {
    const cardOne = cards[0]
    const cardTwo = cards[1]

    const pips = cardOne.pip + cardTwo.pip

    let quality = OFFSUIT

    if (cardOne.suit === cardTwo.suit) {
        quality = SUITED
    }

    if (cardOne.pip === cardTwo.pip) {
        quality = ''
    }

    return pips + quality
}